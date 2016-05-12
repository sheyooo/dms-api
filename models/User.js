(function () {
  'use strict';
  var mongoose = require('mongoose');

  var UserSchema = mongoose.Schema({
    username: String,
    name: {
      first: String,
      last: String
    },
    email: String,
    password: String
  });

  var User = mongoose.model('User', UserSchema);

  module.exports = User;
})();