(function () {
  'use strict';

  let RolesController = require('./../controllers/roles-controller.js'),
    jwtMiddleware = require('./../middleware/jwt').requireAuth;

  module.exports = function (router) {    
    router.post('/roles', jwtMiddleware, RolesController.create);

    router.get('/roles', RolesController.getAll);
  }; 
})();