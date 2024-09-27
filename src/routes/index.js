const express = require("express");

const { controllers: userControllers } = require("../api/v1/user");

const router = express.Router();


router.get("/api/v1/users", userControllers.findAllUsers);

module.exports = router;
