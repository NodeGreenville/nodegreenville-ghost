var ghost = require('../server.js');
var request = require('supertest');
var config = require('../config');

describe('GET /', function(){
  it('should return a 200', function(done){
    request(config.development.url)
      .get('/')
      .expect(200, done);
  });
});
