(function (){
  'use strict';

  var User = require('./../models/User.js');

  module.exports = {
    createUser: function(newUser) {
      var user = new User(newUser);
      user.save();
    }
  };
})();