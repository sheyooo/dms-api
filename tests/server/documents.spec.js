(function () {
  'use strict';
  let api = require('superagent'),
    faker = require('faker'),
    assert = require('chai').assert,
    config = require('./../../server/config.js'),
    apiUrl = 'http://localhost:'+ config.serverPort +'/api/v1/documents';

  describe('DOCUMENTS API ENDPOINT:', function () {
    let jwtToken,
      fakeUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName()
        },
        password: faker.internet.password(),
        role: 'viewer'
      },
      newDocument = {
        title: faker.lorem.sentence(),
        content: 'Some content'
      };

    before(function(done) {
      api
        .post('http://localhost:'+ config.serverPort +'/api/v1/users')
        .send(fakeUser)
        .end(function (err, res) {
          assert.equal(res.status, 201);
          jwtToken = res.body.token;
          done();
        });
    });

    let description = 'POST: should return documents with ' + 
      'defined published dates';
    it(description, function (done) {
      assert.isOk(jwtToken);
      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(newDocument)
        .end(function (err, res) {
          assert.equal(res.status, 201);
          assert(res.body.createdAt);
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

    it('GET: should return documents within paginated limits', function (done) {
      let count = 10,
        offset = 10;

      api
        .get(apiUrl + '?limit=' + count + '&after=' + offset)
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
        .end(function (err, res) {
          let documents = res.body.data,
            prevSortedDate = documents[0].createdAt,
            sorted  = true;

          assert.equal(res.status, 200);

          for (let i in documents) {
            if (i.createdAt < prevSortedDate) {
              sorted = false;
            }
          }

          done();
        });
    });
  });
})();