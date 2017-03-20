const express = require('express');
const { client } = require('./cache/redis.js')
const mongoose = require('mongoose');
const User = require('./models/users');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// const FB = require('./config/fb');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const Pusher = require('pusher')
// const { pusher } = require('./pusher_secrets.js')
const _ = require('lodash');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');



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


// app.get('/test_socket', function(req, res){
//   io.on('connection', function(socket){
//     console.log('a new user connected: ', socket.id)
//     socket.on('hello', function(msg){
//       console.log('we got message: ', msg)
//       socket.emit('response', 'hello velix how are u')
//     })

//     socket.on('disconnect', function(){
//       console.log('weve disconnected')
//     })

//   })
// })


io.on('connection', function(socket){
  console.log('a new user connected: ', socket.id)
  socket.on('sending photo', function(msg){
    console.log('we got message1: ', msg)
    socket.emit('response', 'hello velix how are u')
  })

  socket.on('image', function(img){
    let name, buffer = { img }
    let myPath = path.join(__dirname, name)
    fs.writeFile(myPath, img, 'binary',  function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    }); 
  })

  socket.on('disconnect', function(){
    console.log('weve disconnected')
  })



})
// io.on('connection', function(socket){

//   socket.on('auth', function(userId){
//     let id = userId
//     console.log('id : ', id)
//     //check if we got stuff for this client
//     //then emit them
//     //store the stuff in our cache
//   })
//   console.log('a user connected', socket.id);
//   socket.on('chat message', function(msg){

//     console.log('message: ' + msg);
//   });

//   socket.on('request connection', data => {
//     let { userId, requestId } = data
//     let event = 'listen for:' + requestId
//     let msg = `${userId} requests ${requestId}`
//     // let msg = encrypt(msg)

//     socket.broadcast.emit('request connection', msg)
//     console.log(event, msg)
//   })


//   socket.on('disconnect', function(){
//     console.log('user disconnected', socket.id);
//   });
// });
      
app.post('/photos', function(req, res){
  let { userId, requestId, cloudStorageUrl } = req.body
  let model = new User({
    userId: requestId
  })
  User.find(mode, function(err, result){
    if(err) console.log('trying to save new photos, but cant find user: ', model.userId)
    console.log('weve retrieved from db: ', result)
    let flattenedResult = _.flattenDeep(result)
    let toSaveArray = [ cloudStorageUrl, ...flattenedResult ]
    let toSave = new User({
      userId: requestId,
      photos: toSaveArray
    })
    toSave.save()
      .then(function(res){
        console.log('saved photos successfully')
      })
      .catch(function(err){
        console.log('did not save photos successfully')
      })

  })
  //checks the database for the user see if the user exist,
  // if user exist then append to the photos array
  // otehrwise if the user does not exist
  // create new user with a new array and the cloudStorageUrl be the first entry
  // when user hits refresh on gallery page, it'll hit the get endpoint 
})

app.get('/photos', function(req, res){
  let { userId } = req.query 
  let model = new User({
    userId
  })
  User.find(model, function(err, result){
    if (err) console.log('could not find user from database: ', model.userId)
    res.send(result)
  })

})


// app.get('/joined', function(req, res){
//   pusher.trigger('my-channel', 'my-event', {
//     message: "hello world",
//     location : {
//       longitude: 123.11,
//       latitude: 64.33
//     }
//   });

//   pusher.trigger('4chan', 'my-event', {
//     message: 'YOU"VE SEEN SOMETHING YOU SHOULDN"T HAVE'
//   })
//   res.send('ok')
// })




server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

