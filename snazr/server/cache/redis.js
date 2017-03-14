// var redis = require("redis"),
//     client = redis.createClient();

// var { util } = require("./util.js")


// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

// client.on("error", function (err) {
//     console.log("Error " + err);
// });




// client.util = util
// module.exports.client = client

// data is in longitude, latitude format
//longitude is x axis, latitude is y axis
// get coordinates trim off to . 2 digit right of decimal precision  lat: 123.45, long: 65.32
// generate range keys [] 123.46, 123.47, 123.45, 123.44, 65.32, 65.31, 65.30, 65.33, 65.34
// retrieve all longitude keys, save to longiobjects variable
// for each longiobject variable, check if variable exist, if it does, then 
// check each key for results
// concate results


// user should only send location data once in a while, and when it does
// a worker should update the shit in memory
