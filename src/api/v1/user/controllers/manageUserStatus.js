const { default: mongoose } = require("mongoose");
const createError = require("http-errors");
const services = require("../../../../services");

const manageUserStatus = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const action = req.body.action;

    const user = await services.handleUserAction({ userId, action });

    res.status(200).json({
      message: `User was ${action} successfully`,
      data: user,
    });
  } catch (e) {
    if (e instanceof mongoose.Error) {
      next(createError(400, "Invalid User Id"));
      return;
    }
    next(e);
  }
};

module.exports = manageUserStatus;
