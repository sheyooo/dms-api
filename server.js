(function () {
  'use strict';

  var express = require('express');
  var app = express();
  var router = express.Router();
  var bodyParser = require('body-parser');
  var morgan = require('morgan');
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/dms');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
  });

  // use body parser so we can get info from POST and/or URL parameters
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // use morgan to log requests to the console
  app.use(morgan('dev'));

  // Require and load up all routes in the Routes.js file
  require('./server/routes/routes.js')(router);
  app.use('/api/v1', router);

  app.use(express.static('public'));

  app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
  });
})();