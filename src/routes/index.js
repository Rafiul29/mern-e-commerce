const express = require("express");

const { controllers: authControllers } = require("../api/v1/auth");
const { controllers: userControllers } = require("../api/v1/user");

const router = express.Router();


// auth routes
router.post('/api/v1/auth/register-process',authControllers.registerProcess)
router.post('/api/v1/auth/activate',authControllers.activatedAccount)
router.post('/api/v1/auth/login')


//users routes
router
  .route('/api/v1/users')
    .get(userControllers.findAllUsers)
    
router
  .route('/api/v1/users/:id')
    .get(userControllers.findSingleUser)
    .delete(userControllers.removeUser)

module.exports = router;
