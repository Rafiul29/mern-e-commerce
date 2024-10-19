const { body } = require("express-validator");

const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage("Password should be at least 8 characters long")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .withMessage(
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

module.exports = { validateUserLogin };
