var assert = require('assert');
var chai = require('chai');
var redis = require("redis-mock"),
    client = redis.createClient();


let expect = chai.expect;
let should = chai.should()


describe('should test mock version of redis', function() {
  it('simple test to verify mocha is working', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });

  client.hset('test1', 'field1', 'hello', redis.print)
  client.hset('test1', 'field2', 'world', redis.print)
  client.hset('test2', 'fieldA', 'yo', redis.print)
  client.hset('test2', 'fieldB', 'yoyo', redis.print)
  client.hset('test2', 'fieldC', 'yoyoyo', redis.print)


  it('should test functionality of redis hashes', function(done){
    client.hkeys('test1', function(err, result){
        expect(result.length).to.equal(2)
        done() 
    })
  })

  it('should get us test2 fieldB value correctly', function(done){
      client.hget('test2', 'fieldB', function(err, result){
          expect(result).to.equal('yoyo')
          done()
      })
  })

  it('should get us test1 field2 value correctly', function(done){
      client.hget('test1', 'field2', function(err, result){
          expect(result).to.equal('world')
          done()
      })
  })


});




//test should set up a server and send a get request to /api/test

//test should set up cache object matrix

//test should go inside cache and set a list of new mock users

//hit api to add a new user toggle

//

  // client.set("string key", "string val", redis.print);
  // client.hset("hash key", "hashtest 1", "some value", redis.print);
  // client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
  // client.hkeys("hash key", function (err, replies) {
  //     console.log(replies.length + " replies:");
  //     replies.forEach(function (reply, i) {
  //         console.log("    " + i + ": " + reply);
  //         it('should get first hashkey and equal to the value set', function(){
  //           expect(reply)
  //         })
  //     });
  //     client.quit();
  // });