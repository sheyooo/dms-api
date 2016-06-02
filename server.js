(() => {
  'use strict';

  require('dotenv').load();

  let express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    jwtMiddleware = require('./server/middleware/jwt.js').optionalAuth;

  mongoose.connect(process.env.DATABASE || 'mongodb://localhost/dms');

  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // we're connected!
  });

  // use body parser so we can get info from POST and/or URL parameters
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // use morgan to log requests to the console
  app.use(morgan('dev'));

  app.use(express.static('public'));
 
  // Require and load up all routes in the Routes.js file
  require('./server/routes/routes.js')(router);
  // Make Router use JWT MiddleWare
  router.use(jwtMiddleware);

  app.use('/api/v1', router);

  let server = app.listen(process.env.PORT || 4000, () => {
    console.log('SERVER LISTENING ON PORT ' + process.env.PORT || 4000 + '!');
  });

  module.exports = {
    app,
    server,
    killServer: () => {
      server.close();
    }
  };
})();