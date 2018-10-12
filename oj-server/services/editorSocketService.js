module.exports = function(io) {
  // collaboration sessions
  var collaborations = {};

  // Map from socketId to sessionId
  var socketIdToSessionId = {};

  io.on('connection', (socket) => {
    let sessionId = socket.handshake.query['sessionId'];

    socketIdToSessionId[socket.id] = sessionId;

    // Add current socket id to collaboration session participants
    if (!(sessionId in collaborations)) {
      collaborations[sessionId] = {
        'participants': []
      };
    }

    collaborations[sessionId]['participants'].push(socket.id);

    // socket event listeners
    socket.on('change', delta => {
      console.log('change ' + socketIdToSessionId[socket.id] + ': ' + delta);
      let sessionId = socketIdToSessionId[socket.id];
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
  })
}
