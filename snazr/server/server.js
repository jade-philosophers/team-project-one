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
  let loc = req.body //should hold the data

  res.send('GET RID OF THIS LINE')
})

app.post('/api/toggled_users', function(req, res){
  //when a user clicks toggle button on the front end view
  //send their userid to us, so we can add him to the cache of toggled users
  let user = req.body
  client.util.addNew(user);

  res.send('GET RID OF THIS LINE')
})

app.get('/api/add_connection', function(req, res){

})



app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

