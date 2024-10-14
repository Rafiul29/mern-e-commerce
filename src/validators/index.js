const { validationResult } = require("express-validator");
const authValidator = require("./auth");

const runValidator = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mappedErrors = errors.mapped();
      // response the errors
      res.status(500).json({
        errors: mappedErrors,
      });
      return;
    }
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authValidator, runValidator };
