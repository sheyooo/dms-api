(function () {
  'use strict';
  
  let api = require('superagent'),
    faker = require('faker'),
    assert = require('chai').assert,
    config = require('./../../server/config.js'),
    // expect = require('chai').expect,
    apiUrl = 'http://localhost:'+ config.serverPort +'/api/v1/users';

  describe('USERS API ENDPOINT:', function () {
    let beforeAllTestResult,
      newUser = {
        username: faker.internet.userName(),
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName()
        },
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'viewer'
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
      let userWithNoRole = {
        username: faker.internet.userName(),
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName()
        },
        email: faker.internet.email(),
        password: faker.internet.password()
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
      let userWithNoRole = {
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