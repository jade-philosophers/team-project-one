var Pusher = require('pusher');
var { pusher } = require('./pusher_secrets.js')


pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});