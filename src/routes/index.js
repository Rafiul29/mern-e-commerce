const express = require("express");

const { controllers: userControllers } = require("../api/v1/user");

const router = express.Router();


router.get("/api/v1/users", userControllers.findAllUsers);
router.get("/api/v1/users/:id",userControllers.findSingleUser);
module.exports = router;
