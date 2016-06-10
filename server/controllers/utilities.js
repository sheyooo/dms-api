(() => {
  'use strict';

  var moment = require('moment'),
    jwt = require('jsonwebtoken'),
    config = require('./../config.js');

  module.exports = {
    createJWT: user => {
      return jwt.sign({sub: user._id}, config.jwtKey);
    },

    paginate: (params, model) => {

      if (params.after) {
        model = model.where('createdAt').gt(params.after);
      } else if (params.before) {
        model = model.where('createdAt').lt(params.before);
      }

      if (params.limit && (params.limit <= 15 && params.limit >= 0)) {
        model = model.limit(parseInt(params.limit));
      } else {
        model = model.limit(15);
      }

      if (params.role) {
        model = model.where('role', params.role);
      }

      if (params.type) {
        model = model.where('type', params.type);
      }

      if (params.date) {
        var date = moment(params.date).toISOString(),
          nextDay = moment(params.date).add(1, 'd').toISOString();

        model = model.find({createdAt: {$gt: date, $lt: nextDay} });
      }

      return model;
    },

    checkDocAccessRight: (user, doc) => {
      if(user && (doc.role === user.role ||
        doc.ownerId.toString() === user._id.toString() ||
        user.role === 'admin')) 
      {
        return true;
      } else if (doc.role === 'viewer') {
        return true;
      }

      return false;
    },

    mergeObjects: (obj1, obj2) => {
      for (var i in obj2) {
        if (obj2.hasOwnProperty(i)) {
          obj1[i] = obj2[i];
        }
      }

      return obj1;
    }
  };
})();