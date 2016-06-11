(() => {
  'use strict';

  var server = require('./../../server.js').app,
    api = require('supertest')(server),
    faker = require('faker'),
    assert = require('chai').assert,
    _ = require('lodash'),
    moment = require('moment'),
    apiUrl = '/api/v1/documents';

  describe('DOCUMENTS SEARCH API ENDPOINT:', () => {
    var jwtToken,
      userID;

    before(done => {
      var newUser = {
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
        .post('/api/v1/users')
        .send(newUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          userID = res.body.user._id;
          done();
        });
    });

    it('GET: should return documents with paginated limits', done => {
      var count = 10;
      api
        .get(apiUrl + '?limit=' + count)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body.data);
          assert.isAtMost(res.body.data.length, count);
          done();
        });
    });

    var description1 = 'GET: should return documents in ' +
      'descending order of published date';
    it(description1, done => {
      api
        .get(apiUrl)
        .end((err, res) => {

          var documents = res.body.data,
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

    var description2 = 'GET: should return documents that can be ' +
      'accessed by a specified role';
    it(description2, done => {
      var docs = [{
        title: faker.lorem.sentence(),
        content: 'Some content',
        role: 'viewer'
      }, {
        title: faker.lorem.sentence(),
        content: 'Another content',
        role: 'admin'
      }];

      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(docs[0])
        .send(docs[1])
        .end((err, res) => {
          assert.equal(res.status, 201);
        });

      // This api call happens with another user with editor role
      api
        .post('/api/v1/users/')
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
              role: 'viewer'
            })
            .end((err, res) => {
              assert.equal(res.status, 201);

              api
                .get(apiUrl + '?role=viewer')
                .end((err, res) => {
                  res.body.data.forEach(doc => {
                    assert(doc.role === 'viewer', 'found the role');
                  });
                  done();
                });
            });

        });
    });

    var description3 = 'GET: should return documents that can be ' +
      'accessed by a specified TYPE';
    it(description3, done => {
      var docs = [{
        title: faker.lorem.sentence(),
        content: 'Some content',
        role: 'viewer',
        type: 'finance'
      }, {
        title: faker.lorem.sentence(),
        content: 'Another content',
        role: 'admin',
        type: 'knowledge'
      }];

      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(docs[0])
        .send(docs[1])
        .end((err, res) => {
          assert.equal(res.status, 201);
        });

      // This api call happens with another user with editor role
      api
        .post('/api/v1/users/')
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
              role: 'viewer',
              type: 'finance'
            })
            .end((err, res) => {
              assert.equal(res.status, 201);

              api
                .get(apiUrl + '?type=finance')
                .end((err, res) => {
                  assert.isAtLeast(res.body.data.length, 1);
                  res.body.data.forEach(doc => {
                    assert(doc.type === 'finance', 'found the type');
                  });
                  done();
                });
            });

        });
    });

    var description4 = 'GET: should return documents created ' +
      'or published on a particular date';
    it(description4, done => {
      var doc = {
        title: faker.lorem.sentence(),
        content: 'Wizzy in London'
      };

      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(doc)
        .end((err, res) => {
          assert.equal(res.status, 201);

          var today = moment().format('YYYY-MM-DD');
          api
            .get(apiUrl + '?date=' + today)
            .end((err, res) => {
              assert.isAtLeast(res.body.data.length, 1);
              res.body.data.forEach(doc => {
                assert.equal(moment(doc.createdAt).format('YYYY-MM-DD'), today);
              });

              var tommorow = moment().add(1, 'day').format('YYYY-MM-DD');
              api
                .get(apiUrl + '?date=' + tommorow)
                .end((err, res) => {
                  assert(res.body.data.length === 0);
                  done();
                });
            });
        });
    });
  });
})();