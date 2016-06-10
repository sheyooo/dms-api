(() => {
  'use strict';
  
  // Load Up all API routes
  module.exports = app => {    
    require('./users.js')(app);
    require('./documents.js')(app);
    require('./roles.js')(app);
    require('./doc-types.js')(app);
  }; 
})();