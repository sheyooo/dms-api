(function () {
  'use strict';

  module.exports = function (router) {    
    router.post('/documents', function(req, res, next) {
      res.send('respond with a resource');
    });

    router.get('/documents', function(req, res, next) {

    });

    router.get('/documents/:id', function() {

    });

    router.put('/documents/:id', function() {

    });

    router.delete('/documents/:id', function(req, res) {
      res.send(req.params.id);
    });

    router.get('/users/:id/documents', function(req, res) {
      
    });
  }; 
})();