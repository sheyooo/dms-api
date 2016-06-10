(() => {
  'use strict';

  let Role = require('./../models/Role.js').model;

  module.exports = {
    create: (req, res) => {
      let newRole = req.body,
        role = new Role(newRole);

      role.save(err => {
        if (err) {
          res
            .status(409)
            .json({status: 'Duplicate role'});
        } else {
          res.json(role);
        }
      });
    },

    getAll: (req, res) => {
      Role.find()
        .exec((err, roles) => {
          res.json(roles);
        });
    }
  };
})();