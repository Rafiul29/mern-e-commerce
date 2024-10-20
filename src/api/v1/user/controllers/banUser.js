const { default: mongoose } = require("mongoose");
const createError = require("http-errors");
const User = require("../../../../models/User");
const services = require("../../../../services");

const banUser = async (req, res, next) => {
  try {
    const userId=req.params.id
    const options = { password: 0 };
    const user = await services.findWithId({ Model: User, id: userId,options });
    user.isBanned=true;
    user.save()
    
    res.status(200).json({
      message: "User was ban successfully",
      data:user
    });

  } catch (e) {
    if (e instanceof mongoose.Error) {
      next(createError(400, "Invalid User Id"));
      return;
    }
    next(e);
  }
};

module.exports = banUser;
