redis> HMSET myhash field1 "Hello" field2 "World"
HGET myhash field1
HGETALL 123.22

HMSET "123.22" "56.31" '["joe", "anne"]' "56.32" '["janis"]' "56.34" '[]' "56.35" '["pat", "rick"]'

hget -122.40 37.79

clear cache: FLUSHALL



 [ [ null, null, null, null, null ],
  [ null, null, null, null, null ],
  [ '[33, 69]',
    '[\'janis\']',
    '[{"lng":123.22,"lat":56.33,"id":12345},{"lng":123.22,"lat":56.33,"id":12345}]',
    '[]',
    '[\'pat\', \'rick\']' ],
  [ null, null, null, null, null ],
  [ null, null, null, null, null ] ]



  [ '[33, 69]',
  '[\'janis\']',
  '[{"lng":123.22,"lat":56.33,"id":12345},{"lng":123.22,"lat":56.33,"id":12345}]',
  '[]',
  '[\'pat\', \'rick\']' ]

  if(n > 4) console.log(n)
  else console.log(3)



zombie people when moving, loging in logging out, toggle on and off

also multiple entries are not being removed.

[ "https://snazr.s3.amazonaws.com/uploads%2Ff-l-i-x-+-t-r-n-03eb0f40-0df3-11e7-9259-813294877ff5", "https://snazr.s3.amazonaws.com/uploads%2Ff-l-i-x-+-t-r-n-f325d8c0-0df2-11e7-9259-813294877ff5", "https://snazr.s3.amazonaws.com/uploads%2Ff-l-i-x-+-t-r-n-ed66bf30-0df2-11e7-9259-813294877ff5", "https://snazr.s3.amazonaws.com/uploads%2Ff-l-i-x-+-t-r-n-e6f01570-0df2-11e7-9259-813294877ff5" ]


[ 
  "https://snazr.s3.amazonaws.com/uploads%2Ff-l-i-x-+-t-r-n-03eb0f40-0df3-11e7-9259-813294877ff5", "https://snazr.s3.amazonaws.com/uploads%2Ff-l-i-x-+-t-r-n-ed66bf30-0df2-11e7-9259-813294877ff5", "https://snazr.s3.amazonaws.com/uploads%2Ff-l-i-x-+-t-r-n-e6f01570-0df2-11e7-9259-813294877ff5" ]







// app.get('/api/toggled_users', function(req, res){
//   let data = req.query 
//   client.util.get(data, client , 0.02) 
//   .then(result => res.send(result))
// })

// app.post('/api/toggled_users', function(req, res){
//   let user = req.body
//   client.util.add(user, client);
//   res.send('sent /api/toggled_users and adding')
// })

// app.post('/api/toggle_off', function(req, res){
//   let user = req.body
//   client.util.del(user, client);
//   res.send('deleting user from discovered list')
// })



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


// io.on('connection', function(socket){
//   console.log('a new user connected: ', socket.id)
//   socket.on('sending photo', function(msg){
//     console.log('we got message1: ', msg)
//     socket.emit('response', 'hello velix how are u')
//   })

//   socket.on('image', function(img){
//     let name, buffer = { img }
//     let myPath = path.join(__dirname, name)
//     fs.writeFile(myPath, img, 'binary',  function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
//     }); 
//   })

//   socket.on('disconnect', function(){
//     console.log('weve disconnected')
//   })

// })

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
      
// app.post('/photos', function(req, res){
//   let { userId, requestId, cloudStorageUrl } = req.body
//   let model = {
//     userId: requestId
//   }
//   User.find(model, function(err, result){
//     if(err) console.log('trying to save new photos, but cant find user: ', model.userId)
//     if(result.length > 0){
//       console.log('weve retrieved from db: ', result)
//       let toSave = result[0]
//       let photos = [...toSave.photos]
//       toSave.photos = [ cloudStorageUrl, ...photos ]

//       toSave.save()
//         .then(function(result){
//           console.log('1: saved photos successfully')
//           res.send('photo saved')
//         })
//         .catch(function(err){
//           console.log('ERRROR IS: ', err)
//           console.log('1: did not save photos successfully')
//           res.send('photo did not save, err!')
//         })
//     } else {
//         let photos = [ cloudStorageUrl ]
//         let toSave = new User({
//           userId: requestId,
//           photos: photos
//         })
//         toSave.save()
//         .then(function(result){
//           console.log('2: saved photos successfully')
//           res.send('photo saved')
//         })
//         .catch(function(err){
//           console.log('2: did not save photos successfully')
//           res.send('photo did not save, err!')
//         })
//     }
    
//   })
// })

// app.get('/photos', function(req, res){
//   let { userId } = req.query 
//   let model = { userId }
//   User.find(model, function(err, result){
//     if (err) console.log('could not find user from database: ', model.userId)
//     console.log('from our database we got: ', result)
//     res.send(result)
//   })

// })





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
