var Promise = require('bluebird')

const generateRange = (data, range) => {
    console.log('weve got data and range? ', data, range)
    let {lng, lat} = data
    let lngR = [], latR = []
    console.log('before for loop: ', lng, lat)
    for( let i = -range; i< range; i+=0.01){
        lngR.push(data.lng + i)
        latR.push(data.lat + i)
    }
    console.log('we returning', [lngR, latR] )
    return [lngR, latR]

}


const getAll = (data, client, range) => new Promise( (resolve, reject) => {
    const [lngR, latR] = generateRange(data, range)
    console.log('lat range; ', latR)
    console.log('long range: ', lngR)
    // const xRange = [ data.lng + 0.02, data.lng + 0.01, data.lng - 0.01, 
    // data.lng -0.02]
    // const yRange = [ data.lat + 0.01, data.lat + 0.02, data.lat - 0.01, 
    // data.lat - 0.02]
    // create 4 promises that gets each lat long combo
    // then promise.all the result1
    //resolve the result
    resolve([1,2,3,4])
    return 3
    
})

const addNew = (data, client) => new Promise( (resolve, reject) =>{
    // expect data to be { lng:123.22, lat:56.33, id:12345 } with 2 digit precision
    // client.hkeys(data.lng, function(err, lats){
    //     console.log('all lats are: ', lats)
    //     if(lats){
    //         // should be a list of all latitude coordinates
    //         // hash: 128.11, key: 50.33, value: [ userid:1235, userid:56789]
    //         lats[data.lat] = [...lats[data.lat], data]
    //     }
    // })



    client.HGET(data.lng, data.lat, function(err, peopleList){
        if(peopleList){
            console.log('what is peopleslist: ', typeof peopleList)
            let jsonObj = JSON.parse(peopleList)
            let combinedEntry = [data, ...jsonObj]
            let stringed = JSON.stringify(combinedEntry)
            console.log(stringed)
            client.HSET([data.lng+'', data.lat+'', stringed], function(err, res){
                if(err) { 
                    console.log('add New User Error1: ', err)
                    reject(err)
                }
                console.log('add new User result1', res)
                resolve('add new user in cache success')
            })
        } else {
            let entry = JSON.stringify([data])
            client.HSET([data.lng+'', data.lat+'', entry], function(err, res){
                if(err) { 
                    console.log('add New User Error2: ', err)
                    reject(err)
                }
                console.log('add New User result2', res)
                resolve('add new user in cache success')
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