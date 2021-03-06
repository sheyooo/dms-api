(() => {
  'use strict';
  var server = require('./../../server.js').app,
    api = require('supertest')(server),
    faker = require('faker'),
    assert = require('chai').assert,
    apiUrl = '/api/v1/documents';

  describe('DOCUMENTS API ENDPOINT:', () => {
    var jwtToken,
      userID,
      docID,
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

    before(done => {
      api
        .post('/api/v1/users')
        .send(fakeUser)
        .end((err, res) => {
          assert.equal(res.status, 201);
          jwtToken = res.body.token;
          userID = res.body.user._id;
          done();
        });
    });

    var description = 'POST: should return documents with ' + 
      'defined published dates';
    it(description, done => {
      assert.isOk(jwtToken);
      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(newDocument)
        .end((err, res) => {
          assert.equal(res.status, 201);
          assert(res.body.createdAt);
          docID = res.body._id;
          done();
        });
    });

    it('POST: only authenticated users can create documents', done => {
      api
        .post(apiUrl)
        .send(newDocument)
        .end((err, res) => {
          assert.equal(res.status, 401);
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

    it('GET: should return documents within paginated limits', done => {
      var count = 10,
        offset = 10;

      api
        .get(apiUrl + '?limit=' + count + '&after=' + offset)
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
            prevSortedDate = documents[0].createdAt,
            sorted  = true;

          assert.equal(res.status, 200);

          for (var i in documents) {
            if (i.createdAt < prevSortedDate) {
              sorted = false;
            }
          }

          done();
        });
    });

    it('PUT: should be able to edit a document', done => {
      var newContent = faker.lorem.sentence();

      api
        .put(apiUrl + '/' + docID)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({content: newContent})
        .end((err, res) => {
          assert.equal(res.status, 200);
          api
            .get(apiUrl + '/' + docID)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert(res.body.content === newContent);
            });
          done();
        });
    });

    var description2 = 'GET: should return documents created ' +
      'by a particular user';
    it(description2, done => {

      api
        .get('/api/v1/users/' + 
          userID + '/documents')
        .set('X-ACCESS-TOKEN', jwtToken)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isAtLeast(res.body.data.length, 1);

          res.body.data.forEach((docs) => {
            assert(docs.ownerId === userID);
          });

          done();
        });
    });

    var description3 = 'GET: should not return documents with higher ' +
      'role access';
    it(description3, done => {
      newDocument.title = faker.lorem.sentence();
      newDocument.role = 'admin';

      api
        .post(apiUrl)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(newDocument)
        .end((err, res) => {
          var viewerDocId = res.body._id;
          assert.equal(res.status, 201);

          // It should return 401
          api
            .get(apiUrl + '/' + viewerDocId)
            .end((err, res) => {
              assert.equal(res.status, 401);
              assert.equal(res.body.status, 'You cant touch that');
              
              // Now it should return 200
              api
                .get(apiUrl + '/' + viewerDocId)
                .set('X-ACCESS-TOKEN', jwtToken)
                .end((err, res) => {
                  assert.equal(res.status, 200);
                  done();
                });
            });


        });
    });

    it('POST: un-authenticated users cant delete documents', done => {
      api
        .delete(apiUrl + '/' + docID)
        .send(newDocument)
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.status, 'Unauthorized');

          done();
        });
    });

    it('POST: only authenticated users can delete documents', done => {
      api
        .delete(apiUrl + '/' + docID)
        .set('X-ACCESS-TOKEN', jwtToken)
        .send(newDocument)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.status, 'Successfuly deleted');

          done();
        });
    });
  });
})();