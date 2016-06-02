(function () {
  'use strict';
  let mongoose = require('mongoose');

  let TypeSchema = mongoose.Schema({
    title: {type: String, unique: true, required: true}
  });

  let Type = mongoose.model('Type', TypeSchema);

  module.exports = { model: Type, schema: TypeSchema };
})();