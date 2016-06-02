(function () {
  'use strict';

  let jwt = require('jsonwebtoken'),
    config = require('./../config.js');

  module.exports = {
    requireAuth: function(req, res, next) {
      let token = req.query.token || req.get('X-ACCESS-TOKEN');

      jwt.verify(token, config.jwtKey, function(err, decoded) {
        if (err) {
          res
            .status(401)
            .json({status: 'Unauthorized'});
        } else {
          req.decodedJWT = decoded;
          next();
        }
      });
    },

    optionalAuth: function(req, res, next) {
      let token = req.query.token || req.get('X-ACCESS-TOKEN');

      jwt.verify(token, config.jwtKey, function(err, decoded) {
        if (decoded) {
          req.decodedJWT = decoded;          
        } else {
          req.decodedJWT = false;          
        }

        next();
      });
    }

  };
})();