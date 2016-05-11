(function () {
  'use strict';
  var api = require('superagent'),
    assert = require('chai').assert,
    _ = require('lodash'),
    moment = require('moment'),
    // expect = require('chai').expect,
    apiUrl = 'http://localhost:3000/api/v1/documents';

  describe('DOCUMENTS API ENDPOINT:', function () {
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
            sortedDocuments = _.sortBy(res.body.data, function (doc) { 
              return doc.createdAt; 
            });

          assert.equal(res.status, 200);
          assert.equal(documents, sortedDocuments);

          done();
        });
    });

    var description2 = 'GET: should return documents that can be  ' +
      'accessed by a specified role';
    it(description2, function (done) {
      var docs = [{
        title: 'I need to do X',
        content: 'Some content'
      }, {
        title: 'I need to do another X',
        content: 'Another content'
      }];

      api
        .post(apiUrl)
        .send(docs)
        .end(function (err, res) {
          assert.equal(res.status, 201);
        });

      // This api call happens with another user with editor role
      api
        .post(apiUrl)
        .send({
          title: 'I need to do X',
          content: 'Some content'
        })
        .end();

      api
        .get(apiUrl + '?role=viewer')
        .end(function (err, res) {
          
          assert.equal(res.body.data, docs);

          done();
        });
    });

    var description3 = 'GET: should return documents created ' +
      'or published on a particular date';
    it(description3, function (done) {
      var documents = [{
        title: 'Baba nla',
        content: 'Wizzy in London'
      }, {
        title: 'Vvida la vvida',
        content: 'Live your life anyhow'
      }];

      api
        .post(apiUrl)
        .send(documents)
        .end(function (err, res) {
          assert.equal(res.status, 201);
        });

      var today = moment().format('YYYY-MM-DD');
      api
        .get(apiUrl + '?date=' + today)
        .end(function (err, res) {
          assert.equal(res.body.data, documents);
          done();
        });

      var tommorow = moment().add(1, 'day').format('YYYY-MM-DD');
      api
        .get(apiUrl + '?date=' + tommorow)
        .end(function (err, res) {
          assert.equal(res.body.data, []);
          done();
        });
    });
  });
})();