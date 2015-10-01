var ghost = require('ghost');
var request = require('supertest');
var config = require('../config');
var path = require('path');

describe('GET /', function(){
  beforeEach(function(done) {
    ghost({ config: path.join(__dirname, '/../config.js') }).then(function(ghostServer) {
      ghostServer.start();
      done()
    });
  });

  afterEach(function(done) {
    ghost().then(function(ghostServer) {
      ghostServer.stop();
      done();
    });
  });

  it('should return a 200', function(done){
    request(config.development.url)
      .get('/')
      .expect(200, done);
  });
});
