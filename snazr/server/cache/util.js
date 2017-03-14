var promise = require('bluebird')


const getAll = (data) => {
    // console.log('hello')
    // const xRange = [ data.longitude + 0.02, data.longitude + 0.01, data.longitude - 0.01, 
    // data.longitude -0.02]
    // const yRange = [ data.latitude + 0.01, data.latitude + 0.02, data.latitude - 0.01, 
    // data.latitude - 0.02]
    
}

const addNew = (data) => new Promise( (resolve, reject) =>{
    // expect data to be { lng:123.22, lat:56.33, id } with 2 digit precision
    // client.hkeys(data.lng, function(err, lats){
    //     console.log('all lats are: ', lats)
    //     if(lats){
    //         // should be a list of all latitude coordinates
    //         // hash: 128.11, key: 50.33, value: [ userid:1235, userid:56789]
    //         lats[data.lat] = [...lats[data.lat], data]
    //     }
    // })
    client.hmget(data.lng, data.lat, function(err, peopleList){
        if(peopleList){
            let jsonObj = JSON.parse(peopleList)
            let combinedEntry = [data, ...jsonObj]
            let stringed = JSON.stringify(combinedEntry)
            client.hmset(data.lng, data.lat, stringed, function(err, res){
                if(err) console.log('addNewFunction Error: ', err)
                console.log('addNewFunction result', res)
            })
        } else {
            let entry = [JSON.stringify(data)]
            client.hmset(data.lng, data.lat, entry, function(err, res){
                if(err) console.log('addNewFunction Error: ', err)
                console.log('addNewFunction result', res)
            })
        }
    })
})

const util = {
    get : getAll,
    add : addNew
}

module.exports.util = util



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