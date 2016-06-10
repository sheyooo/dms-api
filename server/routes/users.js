(() => {
  'use strict';

  let UserController = require('./../controllers/users-controller.js');

  module.exports = router => {    
    router.post('/users/login', UserController.login);

    router.post('/users/logout', (req, res) => {
      res.json({status: 'Logged out!'});
    });

    router.post('/users', UserController.createUser);

    router.get('/users', UserController.getAllUsers);

    router.get('/users/:id', UserController.getUser);

    router.put('/users/:id', UserController.updateUser);

    router.delete('/users/:id', () => {

    });
  }; 
})();