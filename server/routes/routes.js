(function () {
  'use strict';
    // All API routes
  module.exports = function (app) {    
    require('./users.js')(app);
  }; 
})();