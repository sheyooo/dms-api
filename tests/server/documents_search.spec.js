(function () {
  'use strict';
  let api = require('superagent'),
    faker = require('faker'),
    assert = require('chai').assert,
    _ = require('lodash'),
    moment = require('moment'),
    config = require('./../../server/config.js'),
    apiUrl = 'http://localhost:'+ config.serverPort +'/api/v1/documents';

  describe('DOCUMENTS API ENDPOINT:', function () {
    let jwtToken;

    before(done => {
      let newUser = {
            username: faker.internet.userName(),
            name: {
              first: faker.name.firstName(),
              last: faker.name.lastName()
            },
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'viewer'
          };

      api
        .post('http://localhost:'+ config.serverPort +'/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });

    it('GET: should return documents with paginated limits', function (done) {
      let count = 10;
      api
        .get(apiUrl + '?limit=' + count)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body.data);
          assert.isAtMost(res.body.data.length, count);
          done();
        });
    });

    let description1 = 'GET: should return documents in ' +
      'descending order of published date';
    it(description1, function (done) {
      api
        .get(apiUrl)
        .end((err, res) => {

          let documents = res.body.data,
            sortedDocuments = _.sortBy(res.body.data, doc => doc.createdAt);

          assert.equal(res.status, 200);
          assert.equal(documents.length, sortedDocuments.length);

          assert.deepEqual(documents[0], sortedDocuments[0]);
          assert.deepEqual(
            documents[documents.length-1],
            sortedDocuments[sortedDocuments.length-1]
          );

          done();
        });
    });

    let description2 = 'GET: should return documents that can be ' +
      'accessed by a specified role';
    it(description2, function (done) {
      let docs = [{
        title: faker.lorem.sentence(),
        content: 'Some content',
        roles: ['viewer']
      }, {
        title: faker.lorem.sentence(),
        content: 'Another content'
      }];

      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(docs[0])
        //.send(docs[1])
        .end((err, res) => {
          console.log(res.body.error);
          assert.equal(res.status, 201);
        });

      // This api call happens with another user with editor role
      api
        .post('http://localhost:'+ config.serverPort +'/api/v1/users/')
        .send({
          username: faker.internet.userName(),
          name: {
            first: faker.name.firstName(),
            last: faker.name.lastName()
          },
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: 'viewer'
        })
        .end((err, res) => {
          assert.equal(res.status, 201);

          api
            .post(apiUrl)
            .set('X-ACCESS-TOKEN', res.body.token)
            .send({
              title: faker.lorem.sentence(),
              content: 'Some content',
              roles: ['viewer', 'admin']
            })
            .end((err, res) => {
              assert.equal(res.status, 201);

              api
                .get(apiUrl + '?role=viewer')
                .end((err, res) => {
                  res.body.data.forEach((doc) => {
                    let index = doc.roles.indexOf('viewer');
                    assert(index > -1, 'found the role');
                  });
                  done();
                });
            });

        });
    });

    let description3 = 'GET: should return documents created ' +
      'or published on a particular date';
    it(description3, function (done) {
      let documents = [{
        title: faker.lorem.sentence(),
        content: 'Wizzy in London'
      }, {
        title: faker.lorem.sentence(),
        content: 'Live your life anyhow'
      }];

      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(documents[0])
        .end(function (err, res) {
          assert.equal(res.status, 201);
        });

      let today = moment().format('YYYY-MM-DD');
      api
        .get(apiUrl + '?date=' + today)
        .end(function (err, res) {
          res.body.data.forEach((doc) => {
            assert.equal(moment(doc.createdAt).format('YYYY-MM-DD'), today);
          });
          done();
        });

      let tommorow = moment().add(1, 'day').format('YYYY-MM-DD');
      api
        .get(apiUrl + '?date=' + tommorow)
        .end((err, res) => {
          assert(res.body.data.length === 0);
          done();
        });
    });
  });
})();