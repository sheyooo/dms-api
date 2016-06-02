(function () {
  'use strict';

  let Role = require('./../models/Role.js').model;

  module.exports = {
    create: function(req, res) {
      let newRole = req.body,
        role = new Role(newRole);

      role.save(function(err) {
        if (err) {
          res
            .status(409)
            .json({status: 'Duplicate role'});
        } else {
          res.json(role);
        }
      });
    },

    getAll: function(req, res) {
      Role.find()
        .exec(function(err, roles) {
          res.json(roles);
        });
    }
  };
})();