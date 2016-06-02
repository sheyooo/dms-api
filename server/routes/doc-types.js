(function () {
  'use strict';

  let DocTypesController = require('./../controllers/doc-types-controller.js');

  module.exports = function (router) {    
    router.post('/doc-types', function(req, res) {
      DocTypesController.create(req.body, function(response) {
        if (response) {
          res.json(response);
        } else {
          res
            .status(400)
            .json({status: 'Something went wrong'});
        }
      });
    });

    router.get('/doc-types', function(req, res) {
      DocTypesController.getAll(function (docTypes) {
        res.json(docTypes);
      });
    });
  }; 
})();