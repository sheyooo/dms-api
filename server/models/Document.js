(() => {
  'use strict';
  
  var mongoose = require('mongoose'),
    DocumentSchema = mongoose.Schema({
      ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      title: {type: String, unique: true, required: true},
      content: {type: String, required: true},
      role: {type: String, required: true},
      type: {type: String}
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