(function (){
  'use strict';

  let User = require('./../models/User.js').model,
    Role = require('./../models/Role.js').model,
    bcrypt = require('bcrypt-nodejs'),
    util = require('./utilities.js');

  module.exports = {
    createUser: function(req, res) {
      let newUser = req.body;
      let userRole = newUser.role;
      newUser.role = [];

      Role.findOne({title: userRole}, function(err, role) {

        if (role) {
          newUser.role = role._id;
          User.create(newUser, (err, user) => {

            if (err) {
              console.log(err);
              if (err.name === 'ValidationError') {
                res
                  .status(400)
                  .json({status: 'Please check your ' + err.message});
                  return;
              }
              res
                .status(409)
                .json({status: 'User conflict'});
            } else {
              res
                .status(201)
                .json({token: util.createJWT(user)});
            }
          });
        } else {
          res
            .status(400)
            .json({status: 'No such role defined!'});
        }
      });
    },

    login: function(req, res) {
      let loginDetails = {
        username: req.body.username,
        password: req.body.password
      };

      User.findOne({username: loginDetails.username}, function(err, user) {
        if (user && bcrypt.compareSync(loginDetails.password, user.password)) {
          res.json({token: util.createJWT(user)});          
        } else {
          res.status(401)
            .json({status: 'Failed'});
        }
      });
    },

    getUser: function(req, res) {
      let id = req.params.id;

      User.findById(id, function (err, user) {
        if (err) {
          res
            .status(404)
            .json({status: 'User not found'});
        } else {
          res.json(user);
        }
      });
    },

    getAllUsers: function(req, res) {
      User.find()
        .limit(10)
        .exec(function (err, users) {
          if (users){
            res.json(users);
          } else {
            res.json([]);
          }
        });
    },

    getUserDocuments: function(req, res) {
      let id = req.params.id;

      User.findById(id, function(err, user) {
        if (user) {
          Document
            .find()
            .where('ownerId')
            .equals(id)
            .exec(function(err, docs) {
              if (docs) {
                res.json(docs);
              } else {
                res.json(['no doc err part of it']);
              }
            });
        } else {
          res
            .status(404)
            .json({status: 'User not found'});
        }
      });
    }
  };
})();