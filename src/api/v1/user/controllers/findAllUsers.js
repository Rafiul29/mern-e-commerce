const createError = require("http-errors");
const User = require("../../../../models/User");

const findAllUsers = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const sortType = req.query.sort_type || "dsc";
    const sortBy = req.query.sort_by || "updatedAt";
    const search = req.query.search || "";

    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
    const searchReqExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      role: { $ne: "admin" },
      $or: [
        { name: { $regex: searchReqExp } },
        { email: { $regex: searchReqExp } },
        { phone: { $regex: searchReqExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .sort(sortStr)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (users.length === 0) {
      throw createError(404, "no users found");
    }

    res.status(200).json({
      message: "users were returned successfully",
      data: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          limit: limit,
          nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
          previousPage: page > 1 ? page - 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = findAllUsers;


// get single user
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      message: "user were returned successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid user id"));
      return;
    }
    next(error);
  }
};

// delete user
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;

    deleteImage(userImagePath);

    await User.findByIdAndDelete({ _id: id, idAdmin: false });

    return successResponse(res, {
      statusCode: 200,
      message: "user was delete successfully",
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid user id"));
      return;
    }
    next(error);
  }
};

// process register
const processRegister = async (req, res, next) => {
  try {
    const { name, email, phone, address, password } = req.body;

    const newUser = {
      name,
      email,
      phone,
      address,
      password,
    };
    
    const userExits = await User.exists({ email });

    if (userExits) {
      throw createError(
        409,
        "user with this email already exists. please login"
      );
    }

    // crete jwt token
    const token = createJSONWebToken(
      { name, email, phone, address, password },
      jwtActivityKey,
      "10m"
    );

    //prepre email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h1>Hello ${name}</h1>
      <p>Please click on the link below to <a href="${clientURL}/api/users/activate/${token}" target="_blank">activate your account </a> </p>
      `,
    };

    // send email with nodemailer
    try {
      await emailWithNodeMail(emailData);
    } catch (error) {
      next(createError(500, "Failed to send verification email"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `please go to your ${email} for completing your registration process`,
      payload: {
        token,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid user id"));
      return;
    }
    next(error);
  }
};
