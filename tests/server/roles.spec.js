(function () {
  'use strict';
  var api = require('superagent'),
    assert = require('chai').assert,
    // expect = require('chai').expect,
    apiUrl = 'http://localhost:3000/api/v1/roles';

  describe('ROLES API ENDPOINT:', function () {
    var beforeAllTestResult,
      newRole = {
        title: 'viewer'
      };

    before(function (done) {
      api
        .post(apiUrl)
        .send(newRole)
        .end(function (err, res) {
          beforeAllTestResult = res;
          done();
        });
    });

    it('POST: should only accept unique roles', function (done) {
      api
        .post(apiUrl)
        .send(newRole)
        .end(function (err, res) {
          assert.equal(res.status, 409);
          done();
        });
    });

    it('GET: should return all roles', function (done) {
      api
        .get(apiUrl)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
})();