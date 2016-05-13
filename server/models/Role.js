(function () {
  'use strict';
  var mongoose = require('mongoose');

  var RoleSchema = mongoose.Schema({
    title: String
  });

  var Role = mongoose.model('Role', RoleSchema);

  module.exports = Role;
})();