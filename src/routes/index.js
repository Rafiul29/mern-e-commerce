const express = require("express");

const { controllers: userControllers } = require("../api/v1/user");

const router = express.Router();


// auth routes
router.post('/api/v1/auth/register')
router.post('/api/v1/auth/login')
router.post('/api/v1/auth/verify')


//users routes
router
  .route('/api/v1/users')
    .get(userControllers.findAllUsers)
    
router
  .route('/api/v1/users/:id')
    .get(userControllers.findAllUsers)
    .get(userControllers.findSingleUser)
    .delete(userControllers.removeUser)

module.exports = router;
