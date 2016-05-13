(function () {
  'use strict';
  var mongoose = require('mongoose');
  var bcrypt = require('bcrypt-nodejs');

  var UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    name: {
      first: {type: String, required: true},
      last: {type: String, required: true}
    },
    email: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true}
  }, {
    timestamp: {createdAt: 'created_at'}
  });

  UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password);
    next();
  });

  var User = mongoose.model('User', UserSchema);

  module.exports = User;
})();