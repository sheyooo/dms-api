(() => {
  'use strict';

  var Type = require('./../models/Type.js').model;

  module.exports = {
    create: (data, callback) => {
      var role = new Type(data);

      role.save(err => {
        if (err) {
          callback(false);
        } else {
          callback(role);
        }
      });
    },

    getAll: callback => {
      Type.find()
        .exec(types => {
          callback(types);
        });
    }
  };
})();