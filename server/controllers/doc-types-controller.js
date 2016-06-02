(function () {
  'use strict';

  let Type = require('./../models/Type.js').model;

  module.exports = {
    create: function(data, callback) {
      let role = new Type(data);

      role.save(function(err) {
        if (err) {
          callback(false);
        } else {
          callback(role);
        }
      });
    },

    getAll: function(callback) {
      Type.find()
        .exec(function(types) {
          callback(types);
        });
    }
  };
})();