const { default: mongoose } = require("mongoose");
const createError = require("http-errors");
const User = require("../../../../models/User");
const services = require("../../../../services");

const unBanUser = async (req, res, next) => {
  try {
    const userId=req.params.id
    const options = { password: 0 };
    const user = await services.findWithId({ Model: User, id: userId,options });
    user.isBanned=false;
    user.save()
    
    res.status(200).json({
      message: "User was unban successfully",
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

module.exports = unBanUser;
