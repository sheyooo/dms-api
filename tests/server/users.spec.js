(() => {
  'use strict';

  let server = require('./../../server.js').app,
    api = require('supertest')(server),
    faker = require('faker'),
    assert = require('chai').assert,
    apiUrl = '/api/v1/users';

  describe('USERS API ENDPOINT:', () => {
    let defaultUser,
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

    before(done => {
      api
        .post(apiUrl)
        .send(newUser)
        .end((err, res) => {
          defaultUser = res.body.user;
          
          done();
        });
    });

    it('GET: should return a user by ID', done => {
      api
        .get(apiUrl + '/' + defaultUser._id)
        .end((err, res) => {
          assert(res.body._id === defaultUser._id);
          done();
        });
    });

    it('POST: should only accept unique emails', done => {
      api
        .post(apiUrl)
        .send(newUser)
        .end((err, res) => {
          assert.equal(res.status, 409);
          done();
        });
    });

    it('POST: should only accept users with role defined', done => {
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
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });

    it('POST: should reject when no first or last name', done => {
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
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });

    it('PUT: should be able to edit a user', done => {
      let fName = faker.name.firstName(),
        lName = faker.name.lastName();

      api
        .put(apiUrl + '/' +defaultUser._id)
        .send({name: {first: fName, last: lName}})
        .end((err, res) => {

          api
            .get(apiUrl + '/' +defaultUser._id)
            .end((err, res) => {
              assert(res.body.name.first === fName);
              assert(res.body.name.last === lName);
            });
          done();
        });
    });

    it('GET: should return all users', done => {
      api
        .get(apiUrl)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
})();