const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/users');
const app = express();
const FB = require('./config/fb');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const port = process.env.PORT || 8000;
mongoose.connect('mongodb://localhost/snazr');

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




app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

