const express = require("express");

// controllers
const { controllers: authControllers } = require("../api/v1/auth");
const { controllers: userControllers } = require("../api/v1/user");

const { authValidator, runValidator } = require("../validators");

// middlewares
const { uploadFile } = require("../middleware/file");

const router = express.Router();

//middleware
const authMiddleWare = require("../middleware/auth");

// Upload for "users" directory
const uploadUserFile = uploadFile("users");

// auth routes
router.post(
  "/api/v1/auth/register-process",
  authMiddleWare.isLoggedOut,
  uploadUserFile.single("image"),
  authValidator.validateUserRegistration,
  runValidator,
  authControllers.registerProcess
);
router.post("/api/v1/auth/activate", authControllers.activatedAccount);
router.post(
  "/api/v1/auth/login",
  authMiddleWare.isLoggedOut,
  authControllers.login
);

router.post(
  "/api/v1/auth/logout",
  authMiddleWare.authenticate,
  authControllers.logout
);

//users routes
router
  .route("/api/v1/users")
  .get(authMiddleWare.authenticate, userControllers.findAllUsers);

router
  .route("/api/v1/users/:id")
  .get(userControllers.findSingleUser)
  .delete(userControllers.removeUser);

module.exports = router;
