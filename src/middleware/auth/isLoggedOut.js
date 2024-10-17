const createError = require("http-errors");

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req?.cookies.accessToken;

    if (token) {
      next(createError(401, "User is Already loggedIn"));
      return
    }
    next();
  } catch (e) {
    next(e.message)
  }
};

module.exports = isLoggedOut;
