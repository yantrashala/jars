var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

var jars = require('../index');

describe('index.js', function () {

  describe('jars check', function () {
    var options = {};
    options.hostname = "localhost";
    options.port = 8088;
    options.path = '/artifactory/api/npm/npm-release/auth/scope';
    options.auth = "admin:password";
      it('should do the setup correctly', function (done) {
          jars.httpRequestCall(options, function(err, data){
            //console.log(data);
            expect(data).to.equal('DONE');
            done();
          });
      });

      it('shouldnt do the setup correctly as credentials are incorrect', function (done) {
        options.auth = "admin:password123";
          jars.httpRequestCall(options, function(err, data){
            //console.log(data);
            expect(data).to.equal(null);
            done();
          });
      });
  });
});
