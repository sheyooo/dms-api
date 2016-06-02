(function () {
  'use strict';

  let jwt = require('jsonwebtoken'),
    config = require('./../config.js');

  module.exports = {
    createJWT: function(user) {
      return jwt.sign({sub: user._id}, config.jwtKey);
    },

    paginate: function(req, model) {

      if (req.after) {
        model = model.where('createdAt').gt(req.after);
      } else if (req.before) {
        model = model.where('createdAt').lt(req.before);
      }

      if (req.limit && (req.limit <= 15 && req.limit >= 0)) {
        model = model.limit(parseInt(req.limit));
      } else {
        model = model.limit(15);
      }

      if (req.role) {
        model = model.$where('this.roles.indexOf("' + req.role + '") > -1');
      }

      return model;
    },

    mergeObjects: function(obj1, obj2) {
      for (let i in obj2) {
        if (obj2.hasOwnProperty(i)) {
          obj1[i] = obj2[i];
        }
      }

      return obj1;
    }
  };
})();