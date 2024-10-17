const createError = require("http-errors");
const { jwtActivityKey, Client_URL } = require("../../../../secret");
const { verifyToken, decodeToken } = require("../../../../utlis");
const User = require("../../../../models/User");
const services = require("../../../../services");

const activatedAccount = async (req, res, next) => {
  const { token } = req.body;

  try {
    if (!token) {
      throw createError(404, "Token not found");
    }

    // token verify
    const decoded = verifyToken({ token, secret: jwtActivityKey });

    if (!decoded) {
      throw createError(401, "User was not able to verified");
    }

    const newUser = {
      name: decoded.name,
      email: decoded.email,
      phone: decoded.phone,
      address: decoded.address,
      password: decoded.password,
      status: "approved",
      image:decoded.image
    };

    const userExits = await services.findItem({
      Model: User,
      email: decoded.email,
    });

    if (userExits) {
      throw createError(
        409,
        "User with this email already exists. Please sign in"
      );
    }

    const user = new User(newUser);
    user.save();

    res.status(201).json({
      messaage: `User was registerd successfully`,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = activatedAccount;
