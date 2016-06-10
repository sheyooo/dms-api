(() => {
  'use strict';

  let DocumentController = require('./../controllers/documents-controller.js'),
    UserController = require('./../controllers/users-controller.js'),
    jwtMiddleware = require('./../middleware/jwt.js').requireAuth;

  module.exports = router => {    
    router.post('/documents', jwtMiddleware, DocumentController.create);

    router.get('/documents', DocumentController.getAllDocs);

    router.get('/documents/:id', DocumentController.getDoc);

    router.put('/documents/:id', jwtMiddleware, DocumentController.update);

    router.delete('/documents/:id', jwtMiddleware, DocumentController.delete);

    router.get('/users/:id/documents', UserController.getUserDocuments);
  }; 
})();