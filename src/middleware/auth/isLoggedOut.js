const createError = require("http-errors");
const { jwtAccessKey } = require("../../secret");
const { verifyToken } = require("../../utlis");

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req?.cookies.accessToken;

    if (token) {
      try {
        const decoded = verifyToken({ token, secret: jwtAccessKey });
        if (decoded) {
          next(createError(401, "User is Already loggedIn"));
          return;
        }
      } catch (error) {
       
        next(error)
      }
    }
    next();
  } catch (e) {
    next(e.message);
  }
};

module.exports = isLoggedOut;
