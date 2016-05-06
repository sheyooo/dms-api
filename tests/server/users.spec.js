(function () {
  'use strict';
  var api = require('superagent'),
    assert = require('chai').assert,
    // expect = require('chai').expect,
    apiUrl = 'http://localhost:3000/api/v1/users';

  describe('USERS API ENDPOINT:', function () {
    var beforeAllTestResult,
      newUser = {
        username: 'sheyooo',
        name: {
          first: 'Seyi',
          last: 'Adekoya'
        },
        email: 'sheyi@gmail.com',
        password: 'password',
        role: 'let\'s see'
      };

    before(function (done) {
      api
        .post(apiUrl)
        .send(newUser)
        .end(function (err, res) {
          beforeAllTestResult = res;
          done();
        });
    });

    it('POST: should only accept unique emails', function (done) {
      api
        .post(apiUrl)
        .send(newUser)
        .end(function (err, res) {
          assert.equal(res.status, 409);
          done();
        });
    });

    it('POST: should only accept users with role defined', function (done) {
      var userWithNoRole = {
        username: 'sheyooo',
        name: {
          first: 'Seyi',
          last: 'Adekoya'
        },
        email: 'sheyi@gmail.com',
        password: 'password'
      };

      api
        .post(apiUrl)
        .send(userWithNoRole)
        .end(function (err, res) {
          assert.equal(res.status, 400);
          done();
        });
    });

    it('POST: should reject when no first or last name', function (done) {
      var userWithNoRole = {
        username: 'sheyooo',
        name: {
          first: '',
          last: ''
        },
        email: 'sheyi@gmail.com',
        password: 'password'
      };

      api
        .post(apiUrl)
        .send(userWithNoRole)
        .end(function (err, res) {
          assert.equal(res.status, 400);
          done();
        });
    });

    it('GET: should return all users', function (done) {
      api
        .get(apiUrl)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
})();