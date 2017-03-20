const { client } = require('./cache/redis.js')
const User = require('./models/users');
const mongoose = require('mongoose');
const Expo = require('exponent-server-sdk');

mongoose.connect('mongodb://localhost/snazr');

const token = {
    post: (req, res) => {
        let { token, userId } = req.body
        let searchFor = { userId }
        User.find(searchFor, function(err, result){
            if(err) console.log('trying to find user to save push tokens,user: ', searchFor.userId)
            if(result.length > 0 ){
                let newEntry = result[0]
                newEntry.pushToken = token
                newEntry.save()
                    .then(function(result){
                        console.log('saved token succesfully')
                        res.send('token saved')
                    })
            } else {
                let newEntry = new User({

                })

            }
        })

        res.send('hey thi sis get')
    },
    delete: (req, res) => {
        res.send('hello this is post')
    }
}

const toggle = {
    get: (req, res) => {
        // should send a list of all the users that have their discoverability toggled on
        // with x, y amount of range in terms of longitude & latitude
        // by retrieving the information from our cache
        // the information of location is sent through their locations
        // if there are no locations just give a generic guy called joe back
        let data = req.query 
        //specify range to do search here, 0.02 means within 2 kilometers
        client.util.get(data, client , 0.02) 
        .then(result => res.send(result))
    },
    post: (req, res) => {
        let user = req.body
        client.util.add(user, client);
        res.send('sent /api/toggled_users and adding')
    },
    delete: (req, res) => {
        let user = req.body
        client.util.del(user, client);
        res.send('deleting user from discovered list')
    }
}


const photo = {
    get: (req, res) => {
        let { userId } = req.query 
        let model = { userId }
        User.find(model, function(err, result){
            if (err) console.log('could not find user from database: ', model.userId)
            console.log('from our database we got: ', result)
            res.send(result)
        })
    },
    post: (req, res) => {
        let { userId, requestId, cloudStorageUrl } = req.body
        let model = {
            userId: requestId
        }
        User.find(model, function(err, result){
            if(err) console.log('trying to save new photos, but cant find user: ', model.userId)
            if(result.length > 0){
            console.log('weve retrieved from db: ', result)
            let toSave = result[0]
            let photos = [...toSave.photos]
            toSave.photos = [ cloudStorageUrl, ...photos ]

            toSave.save()
              .then(function(result){
                console.log('1: saved photos successfully')
                res.send('photo saved')
              })
              .catch(function(err){
                console.log('ERRROR IS: ', err)
                console.log('1: did not save photos successfully')
                res.send('photo did not save, err!')
                })
            } else {
                let photos = [ cloudStorageUrl ]
                let toSave = new User({
                    userId: requestId,
                    photos: photos
                })
                toSave.save()
                  .then(function(result){
                  console.log('2: saved photos successfully')
                  res.send('photo saved')
                })
                .catch(function(err){
                  console.log('2: did not save photos successfully')
                  res.send('photo did not save, err!')
                })
            }
            
        })
    }
}

const handlers = {
    token,
    toggle,
    photo 
}




module.exports.handlers = handlers