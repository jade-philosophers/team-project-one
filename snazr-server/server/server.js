const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const _ = require('lodash');

//dependencies written by us
const { client } = require('./cache/redis.js')
const User = require('./models/users');
const bodyParser = require('body-parser');
const app = express();
// const Pusher = require('pusher')
// const { pusher } = require('./pusher_secrets.js')

//server dependencies
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const morgan = require('morgan');
const Expo = require('exponent-server-sdk');
const { handlers } = require('./routeHandlers.js')


const port = process.env.PORT || 8000;
// mongoose.connect('mongodb://localhost/snazr');




app.use(morgan('combined'))

app.use(bodyParser.json());
//serve up public folder on endpoint '/'
app.use(express.static(path.join(__dirname, '../public')));
//serve up bundles folder on endpoint '/bundles'
app.use('/bundles', express.static(path.join(__dirname, '/../bundles')));



app.route('/api/push_token')
  .post(handlers.token.post)
  .delete(handlers.token.delete)

app.route('/api/toggled_users')
  .get(handlers.toggle.get)
  .post(handlers.toggle.post)
  .delete(handlers.toggle.delete)
  .put(handlers.toggle.put)

app.route('/api/photos')
  .get(handlers.photo.get)
  .post(handlers.photo.post)
  .delete(handlers.photo.delete)

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});





