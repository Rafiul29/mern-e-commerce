const bcrypt = require("bcrypt");
const createError = require("http-errors");
const User = require("../../../../models/User");
const services = require("../../../../services");
const { createJSONWebToken } = require("../../../../utlis");
const { jwtAccessKey } = require("../../../../secret");

const login = async (req, res, next) => {
  try {
    //email, password req.body
    const { email, password } = req.body;

    // isExits
    const user = await services.findItem({ Model: User, email });

    if (!user) {
      throw createError(
        404,
        "User does not Exists with email. Please Register"
      );
    }

    // compare the password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw createError(404, "User email and password doesn't match");
    }

    // isbanned
    if (user.isBanned) {
      throw createError(404, "You are Banned. Please contact authority ");
    }
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      isBanned: user.isBanned,
      isAdmin: user.isAdmin,
    };

    // accessToken
    const accessToken = createJSONWebToken(userInfo, jwtAccessKey, "1m");
    15
    // token, cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 1 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // refreshToken
    const refreshToken = createJSONWebToken(userInfo, jwtAccessKey, "7d");

    // token, cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    //response generate
    res.status(200).json({
      message: "Login successfully",
      user: userInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
