const express = require('express');
const { client } = require('./cache/redis.js')
// const mongoose = require('mongoose');
// const User = require('./models/users');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const FB = require('./config/fb');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const Pusher = require('pusher')
const { pusher } = require('./pusher_secrets.js')

const server = require('http').Server(app);
const io = require('socket.io')(server);



const port = process.env.PORT || 8000;
// mongoose.connect('mongodb://localhost/snazr');

// passport.use( new FacebookStrategy( {
//   clientID: FB.FACEBOOK_APP_ID,
//   clientSecret: FB.FACEBOOK_APP_SECRET,
//   callbackUrl: FB.callbackUrl
// }, (accessToken, refreshToken, profile, done) => {
//   User.findOrCreate({id: profile.id }, (err, user) => {
//     if (err) {
//       return done(err);
//     } else {
//       done (null, user);
//     }
//   });
// }));

app.use(bodyParser.json());
//serve up public folder on endpoint '/'
app.use(express.static(path.join(__dirname, '../public')));
//serve up bundles folder on endpoint '/bundles'
app.use('/bundles', express.static(path.join(__dirname, '/../bundles')));

app.get('/api/test', function (req, res, next){
  res.send('what the fuck is up');
});

app.get('/api/toggled_users', function(req, res){
  //should send a list of all the users that have their discoverability toggled on
  //with x, y amount of range in terms of longitude & latitude
  //by retrieving the information from our cache
  // the information of location is sent through their locations
  // if there are no locations just give a generic guy called joe back
  // 
  
  let data = req.query 
  console.log('weve made a request', data)
  client.util.get(data, client , 0.02)  //specify range here, 0.02 means within 2kilometer
  .then(result => res.send(result))
})

app.post('/api/toggled_users', function(req, res){
  let user = req.body
  client.util.add(user, client);
  res.send('sent /api/toggled_users and adding')
})

app.post('/api/toggle_off', function(req, res){
  let user = req.body
  client.util.del(user, client);
  res.send('deleting user from discovered list')
})

io.on('connection', function(socket){

  socket.on('auth', function(userId){
    let id = userId
    console.log('id : ', id)
    //check if we got stuff for this client
    //then emit them
    //store the stuff in our cache
  })
  console.log('a user connected', socket.id);
  socket.on('chat message', function(msg){

    console.log('message: ' + msg);
  });

  socket.on('request connection', data => {
    let { userId, requestId } = data
    let event = 'listen for:' + requestId
    let msg = `${userId} requests ${requestId}`
    // let msg = encrypt(msg)

    socket.broadcast.emit('requestConn', msg)
    console.log(event, msg)
  })

  socket.on('send photos', data => {
    
  })

  socket.on('disconnect', function(){
    console.log('user disconnected', socket.id);
  });
});
      


app.get('/joined', function(req, res){
  pusher.trigger('my-channel', 'my-event', {
    message: "hello world",
    location : {
      longitude: 123.11,
      latitude: 64.33
    }
  });

  pusher.trigger('4chan', 'my-event', {
    message: 'YOU"VE SEEN SOMETHING YOU SHOULDN"T HAVE'
  })
  res.send('ok')
})




server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

