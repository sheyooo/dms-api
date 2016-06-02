(function () {
  'use strict';
    // All API routes
  module.exports = function (app) {    
    require('./users.js')(app);
    require('./documents.js')(app);
    require('./roles.js')(app);
    require('./doc-types.js')(app);
  }; 
})();