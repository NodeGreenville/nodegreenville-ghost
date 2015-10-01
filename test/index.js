var ghost = require('../server.js');
var request = require('supertest');

describe('GET /', function(){
  it('should return a 200', function(done){
    request(ghost)
      .get('/')
      .expect(200, done);
  });
});
