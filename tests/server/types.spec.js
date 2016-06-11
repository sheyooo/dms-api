(() => {
  'use strict';

  var server = require('./../../server.js').app,
    api = require('supertest')(server),
    faker = require('faker'),
    assert = require('chai').assert,
    apiUrl = '/api/v1/doc-types';

  describe('DOC TYPES API ENDPOINT:', () => {
    var jwtToken,
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
      newType = {
        title: faker.lorem.word()
      };

    before(done => {
      api
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });

    it('POST: should create new doc type', done => {
      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(newType)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    it('POST: should only accept unique doc types', done => {
      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ title: 'finance' })
        .end((err, res) => {
          assert.equal(res.status, 409);
          done();
        });
    });

    it('POST: should not accept doc types with lacking title', done => {
      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ title: '' })
        .end((err, res) => {
          assert.equal(
            res.body.status, 
            'ValidationError: Path `title` is required.'
          );
          done();
        });
    });

    it('GET: should return all doc types', done => {
      api
        .get(apiUrl)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
})();