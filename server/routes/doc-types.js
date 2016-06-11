(() => {
  'use strict';

  var DocTypesController = require('./../controllers/doc-types-controller.js'),
    jwtMiddleware = require('./../middleware/jwt').requireAuth;

  module.exports = router => {    
    router.post('/doc-types', jwtMiddleware, DocTypesController.create);

    router.get('/doc-types', DocTypesController.getAll);
  }; 
})();