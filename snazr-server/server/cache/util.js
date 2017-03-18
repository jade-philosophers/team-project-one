const Promise = require('bluebird')
const _ = require('lodash')


const getAll = (data, client, range) => new Promise( (resolve, reject) => {

    //should make no assumptions about data from front end
    const [lngR, latR] = generateRange(data, range)
    console.log('lat range; ', latR)
    console.log('long range: ', lngR)
    // lat range;  [ '56.31', '56.32', '56.33', '56.34', '56.35' ]
    // long range:  [ '123.20', '123.21', '123.22', '123.23', '123.24' ]

    let promises = lngR.map( i => new Promise((resolve, reject) => {
        client.hmget([i, ...latR], function(err, res){
            if(err) reject(err)
            if(res === null){
                console.log('no entry so returning null')
                resolve([])
            }
            console.log('res from getAll cache query is: ', res)
            resolve(res)
        })
    }))
    Promise.all(promises)
    .then( results =>{ console.log('FINAL FINAL: ', results)
      let final = results.reduce((acc, i) => [...acc, ...i])
        .filter(i=> i !== null)
        .map(i=> {
            if(typeof i === 'string'){ 
                return JSON.parse(i)
            }
            else return i
        });
      let unpacked = _.flatten(final)
      resolve(unpacked)
    })
    .catch( err => {
        console.log(err)
        reject(err)
    })


    
})

const generateRange = (data, range) => {
    console.log('weve got data and range? ', data, range)
    let {lng, lat} = data
    let lngR = [], latR = []
    console.log('before for loop: ', lng, lat)
    for( let i = -range; i<= range; i+=0.01){
        let r1 = parseFloat(data.lng) + i
        let r2 = parseFloat(data.lat) + i
        let f = r1.toFixed(2)
        let f2 = r2.toFixed(2)
        lngR.push(f)
        latR.push(f2)
    }
    return [lngR, latR]

}

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

    // should make no assumptions about data on the server end,
    // need to format the data if there isn't data throw some kind of error and log it

    client.hget(data.lng, data.lat, function(err, peopleList){
        if(peopleList){
            console.log('what is peopleslist: ', typeof peopleList)
            let jsonObj = JSON.parse(peopleList)
            let combinedEntry = [data, ...jsonObj]
            let stringed = JSON.stringify(combinedEntry)
            console.log('entry to cache is1: ' , stringed)
            client.hset([data.lng+'', data.lat+'', stringed], function(err, res){
                if(err) { 
                    console.log('add New User Error1: ', err)
                    reject(err)
                }
                console.log('add new User result1', res)
                resolve('add new user in cache success')
            })
        } else {
            let entry = JSON.stringify([data])
            console.log('entry to cache is2: ', entry)
            client.hset([data.lng+'', data.lat+'', entry], function(err, res){
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


const remove = (data, client) => new Promise((resolve, reject) => {
    // expects data to be location and userid
    client.hget(data.lng, data.lat, function(err, peopleList){
        if(peopleList){
            let parsed = JSON.parse(peopleList)
            let filtered = parsed.filter( i=> i.userId !== data.userId)
            let stringed = JSON.stringify(filtered)
            client.hset([data.lng+'', data.lat+'', stringed], function(er, res){
                if(err){
                    console.log('couldnt remove user: ', data.userId)
                    reject(err)
                }
                console.log('removed user from discovery')
                resolve('successfuly removed user from active discovery list')
            })
            //go through the list to find the userid, and splice it
        } else {
            //you're good
            reject('the location data was wrong')
            console.log('could not find anyone in the location grid given these lng:lat', data.lng, data.lat)
        }
    })
})

const util = {
    get : getAll,
    add : addNew,
    del : remove
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