const createError = require("http-errors");

const isAdmin = async (req, res, next) => {
  try {

    if(!req.user.isAdmin){
      next(createError(403, "Forbidden. You must be an admin to access this resource"))
      return
    }
    next();
  } catch (e) {
    next(e.message);
  }
};

module.exports = isAdmin;
