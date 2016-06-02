(() => {
  'use strict';
  let api = require('superagent'),
    faker = require('faker'),
    assert = require('chai').assert,
    config = require('./../../server/config.js'),
    apiUrl = 'http://localhost:'+ config.serverPort +'/api/v1/roles';

  describe('ROLES API ENDPOINT:', () => {
    let jwtToken,
      newUser = {
        username: faker.internet.userName(),
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName()
        },
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'viewer'
      },
      newRole = {
        title: faker.lorem.word()
      };

    before(done => {
      api
        .post('http://localhost:'+ config.serverPort +'/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });

    it('POST: should create new Role', done => {
      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(newRole)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    it('POST: should only accept unique roles', done => {
      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ title: 'admin' })
        .end((err, res) => {
          assert.equal(res.status, 409);
          done();
        });
    });

    it('GET: should return all roles', done => {
      api
        .get(apiUrl)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
})();