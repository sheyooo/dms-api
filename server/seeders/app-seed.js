(() => {
  'use strict';

  let mongoose = require('mongoose'),
    Role = require('./../models/Role.js').model,
    User = require('./../models/User.js').model;

  mongoose.connect('mongodb://localhost/dms');

  Role.create([
    {title: 'viewer'},
    {title: 'editor'},
    {title: 'admin'}
  ],
    (err, roles) => {

      User.create({
        username: 'sheyooo',
        name: { first: 'Seyi', last: 'Adekoya'},
        email: 'sheyiadekoya@gmail.com',
        role: roles[1]._id,
        password: 'password'
      }, (err, user) => {
        if (user) {
          console.log('Success');
        }
        process.exit(0);
      });
    });
})();