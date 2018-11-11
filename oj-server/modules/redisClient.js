var redis = require('redis').createClient();

if (process.env.REDISTOGO_URL) {
    // TODO: redistogo connection
} else {
    var redis = require("redis").createClient();
}

// inside if statement
var rtg   = require("url").parse(process.env.REDISCLOUD_URL);
var redis = require("redis").createClient(rtg.port, rtg.hostname, {no_ready_check: true});

redis.auth(rtg.auth.split(":")[1]);

function set(key, value, callback) {
  client.set(key, value, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    callback(res);
  });
}

function get(key, callback) {
  client.get(key, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    callback(res);
  });
}

function expire(key, timeInSeconds) {
  client.expire(key, timeInSeconds);
}

function quit() {
  client.quit();
}

module.exports = {
  get: get,
  set: set,
  expire: expire,
  quit: quit,
  redisPrint: redis.print
}
