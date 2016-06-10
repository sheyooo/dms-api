(() => {
  'use strict';
  
  var mongoose = require('mongoose'),

    RoleSchema = mongoose.Schema({
      title: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
      }
    });

  module.exports = {
    model: mongoose.model('Role', RoleSchema), 
    schema: RoleSchema
  };
})();