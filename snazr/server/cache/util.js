var promise = require('bluebird')

const getAllNearByLocation = () => {
    console.log('hello')
    
}

const addNew = (data) => new Promise( (resolve, reject) =>{
    const xRange = [ data.longitude + 0.02, data.longitude + 0.01, data.longitude - 0.01, 
    data.longitude -0.02]
    const yRange = [ data.latitude + 0.01, data.latitude + 0.02, data.latitude - 0.01, 
    data.latitude - 0.02]
    client.hkeys(data.longitude, function(err, allLatitutdeInThisLongitude){
        if(allLatitutdeInThisLongitude){
            // should be a list of all latitude coordinates
            // hash: 128.11, key: 50.33, value: [ userid:1235, userid:56789]
            if(allLatitutdeInThisLongitude.includes())
        }
    })

})

const util = {
    get : getAllNearByLocation,
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