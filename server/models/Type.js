(() => {
  'use strict';
  
  var mongoose = require('mongoose'),

    TypeSchema = mongoose.Schema({
      title: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
      }
    });

  module.exports = {
    model: mongoose.model('Type', TypeSchema), 
    schema: TypeSchema
  };
})();