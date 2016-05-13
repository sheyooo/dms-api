(function () {
  'use strict';

  var UserController = require('./../controllers/user-controller.js');

  module.exports = function (router) {    
    router.post('/users/login', function(req, res) {
      
    });

    router.post('/users/logout', function(req, res) {

    });

    router.post('/users', function(req, res) {
      UserController.createUser(req.body);

      res.json(req.body);
    });

    router.get('/users', function() {

    });

    router.get('/users/:id', function(req, res) {
      res.send(req.params.id);
    });

    router.put('/users/:id', function() {

    });

    router.delete('/users/:id', function() {

    });
  }; 
})();