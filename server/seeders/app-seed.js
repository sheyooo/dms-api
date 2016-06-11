(() => {
  'use strict';

  var mongoose = require('mongoose'),
    Role = require('./../models/Role.js').model,
    Type = require('./../models/Type.js').model,
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
        role: roles[1].title,
        password: 'password'
      }, (err, user) => {

        Type.create([
          {title: 'finance'},
          {title: 'confidential'}
        ],
          (err, types) => {
            if (types && user) {
              console.log('Success');
            }
            process.exit(0);
        });
        
      });
    });
})();