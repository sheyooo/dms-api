(function () {
  'use strict';
  var mongoose = require('mongoose');

  var DocumentSchema = mongoose.Schema({
    ownerId: Number,
    title: String,
    content: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}

  });

  var Document = mongoose.model('Document', DocumentSchema);

  module.exports = Document;
})();