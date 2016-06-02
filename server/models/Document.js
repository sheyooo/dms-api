(() => {
  'use strict';
  
  let mongoose = require('mongoose');

  let DocumentSchema = mongoose.Schema({
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {type: String, unique: true},
    content: String,
    roles: [{type: String}],
    type: [{type: String}]
  }, {
    timestamps: true
  });

  DocumentSchema.pre('update', function() {
    this.update({},{ $set: { updatedAt: new Date() } });
  });

  module.exports = { 
    model: mongoose.model('Document', DocumentSchema),
    schema: DocumentSchema 
  };
})();