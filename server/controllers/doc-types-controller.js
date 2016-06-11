(() => {
  'use strict';

  var DocType = require('./../models/Type.js').model;

  module.exports = {
    create: (req, res) => {
      var newRole = req.body,
        type = new DocType(newRole);

      type.save(err => {
        if (err) {
          res
            .status(409)
            .json({status: err.toString()});
        } else {
          res.json(type);
        }
      });
    },

    getAll: (req, res) => {
      DocType.find()
        .exec((err, roles) => {
          res.json(roles);
        });
    }
  };
})();