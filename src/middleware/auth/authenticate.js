const { findUserByEmail } = require("../../services");
const { verifyToken } = require("../../utlis");
const createError = require("http-errors");
const { jwtAccessKey } = require("../../secret");

const authenticate = async (req, res, next) => {
  try {
    const token = req?.cookies.accessToken;

    if (!token) {
      next(createError(401, "Access token not found. Please login"));
      return
    }

    const decoded = verifyToken({ token, secret: jwtAccessKey });

    if (!decoded) {
      next(createError(401, "Invalid Access token. Please login again"));
      return
    }

    const user = await findUserByEmail(decoded.email);

    if (!user) {
      next(createError(401, "User not found"));
      return
    }
    req.user = user;
  
    next();
  } catch (e) {
    next(e.message)
  }
};

module.exports = authenticate;
