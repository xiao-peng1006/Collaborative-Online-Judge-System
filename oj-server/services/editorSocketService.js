module.exports = function(io) {
  // collaboration sessions
  var collaborations = {};

  // Map from socketId to sessionId
  var socketIdToSessionId = {};

  // Waiting for connection from client
  io.on('connection', (socket) => {
    // Get session id which is the problem id
    let sessionId = socket.handshake.query['sessionId'];

    // Get current working problem with given a socket id
    socketIdToSessionId[socket.id] = sessionId;

    // Add current socket id to collaboration session participants
    if (!(sessionId in collaborations)) {
      collaborations[sessionId] = {
        'participants': []
      };
    }

    // Get all participants with given problem id
    collaborations[sessionId]['participants'].push(socket.id);

    // socket event listeners
    socket.on('change', delta => {
      console.log('change ' + socketIdToSessionId[socket.id] + ': ' + delta);
      let sessionId = socketIdToSessionId[socket.id];

      // Forward to all participants, except the originating one
      if (sessionId in collaborations) {
        let participants = collaborations[sessionId]['participants'];
        for (let i = 0; i < participants.length; i++) {
          if (socket.id != participants[i]) {
            io.to(participants[i]).emit('change', delta);
          }
        }
      } else {
        console.log('warning: could not find socket id in collaborations');
      }
    })

    let participants = collaborations[sessionId]['participants'];
    for (let i = 0; i < participants.length; i++) {
      io.to(participants[i]).emit('connectedUser', participants);
    }

    socket.on('disconnect', (socket) => {
      let i = participants.indexOf(socket)
      participants.splice(i, 1);
      for (let j = 0; j < participants.length; j++) {
        io.to(participants[j]).emit('disconnectedUser', participants);
      }
    })
  })
}
