(function () {
  'use strict';
  var api = require('superagent'),
    assert = require('chai').assert,
    // expect = require('chai').expect,
    apiUrl = 'http://localhost:3000/api/v1/documents';

  describe('DOCUMENTS API ENDPOINT:', function () {
    var newDocument = {
        title: 'I need to do X',
        content: 'Some content'
      };

    var description = 'POST: should return documents with ' + 
      'defined published dates';
    it(description, function (done) {
      api
        .post(apiUrl)
        .send(newDocument)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert(res.body.document.createdAt);
          done();
        });
    });

    it('GET: should return documents with paginated limits', function (done) {
      var count = 10;
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
      var count = 10,
        offset = 10;

      api
        .get(apiUrl + '?limit=' + count + '&after=' + offset)
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body.data);
          assert.isAtMost(res.body.data.length, count);
          assert.equal(res.body.data[0].id, offset + 1);
          done();
        });
    });

    var description1 = 'GET: should return documents in ' +
      'descending order of published date';
    it(description1, function (done) {
      api
        .get(apiUrl)
        .end(function (err, res) {
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
  });
})();