const { body } = require("express-validator");

const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at leat 3 to 31 characters long"),
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
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .withMessage(
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Address should be 3 characters long"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("image").optional().isString().withMessage("Image is required"),
];

module.exports = { validateUserRegistration };
