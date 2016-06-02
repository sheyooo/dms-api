(() => {
  'use strict';
  let mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),

    UserSchema = mongoose.Schema({
      username: {type: String, unique: true, required: true},
      name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
      },
      email: {type: String, unique: true, required: true},
      role: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Role'},
      password: {type: String, required: true}
    }, {
      timestamps: true
    });

  UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password);
    next();
  });

  let User = mongoose.model('User', UserSchema);

  module.exports = { model: User, schema: UserSchema };
})();