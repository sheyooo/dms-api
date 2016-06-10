(() => {
  'use strict';

  let jwt = require('jsonwebtoken'),
    User = require('./../models/User.js').model,
    config = require('./../config.js');

  module.exports = {
    requireAuth: (req, res, next) => {
      let token = req.query.token || req.get('X-ACCESS-TOKEN');

      jwt.verify(token, config.jwtKey, (err, decoded) => {
        if (err) {
          res
            .status(401)
            .json({status: 'Unauthorized'});
        } else {
          req.decodedJWT = decoded;
          User.findById(decoded.sub, (err, user) => {
            req.jwtUser = user;
            next();
          });
        }
      });
    },

    optionalAuth: (req, res, next) => {
      let token = req.query.token || req.get('X-ACCESS-TOKEN');

      jwt.verify(token, config.jwtKey, (err, decoded) => {
        if (decoded) {

          req.decodedJWT = decoded;   
          User.findById(decoded.sub, (err, user) => {
            req.jwtUser = user;
            next();
          });       
        } else {
          req.decodedJWT = false;  
          next();        
        }
      });
    }
  };
})();