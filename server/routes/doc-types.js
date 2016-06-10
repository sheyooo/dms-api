(() => {
  'use strict';

  var DocTypesController = require('./../controllers/doc-types-controller.js');

  module.exports = router => {    
    router.post('/doc-types', (req, res) => {
      DocTypesController.create(req.body, (response) => {
        if (response) {
          res.json(response);
        } else {
          res
            .status(400)
            .json({status: 'Something went wrong'});
        }
      });
    });

    router.get('/doc-types', (req, res) => {
      DocTypesController.getAll(docTypes => {
        res.json(docTypes);
      });
    });
  }; 
})();