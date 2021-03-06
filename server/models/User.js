(() => {
  'use strict';
  var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),

    UserSchema = mongoose.Schema({
      username: {type: String, unique: true, required: true},
      name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
      },
      email: {type: String, unique: true, required: true},
      role: {type: String, required: true},
      password: {type: String, required: true}
    }, {
      timestamps: true
    });

  UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password);
    next();
  });

  var User = mongoose.model('User', UserSchema);

  module.exports = { model: User, schema: UserSchema };
})();