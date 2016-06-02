(function () {
  'use strict';

  let UserController = require('./../controllers/users-controller.js');

  module.exports = function (router) {    
    router.post('/users/login', UserController.login);

    router.post('/users/logout', function(req, res) {
      res.json({status: 'Logged out!'});
    });

    router.post('/users', UserController.createUser);

    router.get('/users', UserController.getAllUsers);

    router.get('/users/:id', UserController.getUser);

    router.put('/users/:id', function() {

    });

    router.delete('/users/:id', function() {

    });
  }; 
})();