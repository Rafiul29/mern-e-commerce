const { default: mongoose } = require("mongoose");
const createError = require("http-errors");
const { deleteImage } = require("../../../../utlis");
const User = require("../../../../models/User");
const services = require("../../../../services");

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const options = { password: 0 };
  try {
    const user = await services.findWithId({ Model: User, id: id, options });

    if (user.role === "admin") {
      throw createError(404, "admin delete not permission application");
    }

    const deleteUser = await User.findByIdAndDelete({ _id: id, role: "user" });

    const userImagePath = await deleteImage(user.image);
    console.log(deleteUser);
    res.status(204).json({
      message: "User delete successfully",
    });
  } catch (e) {
    if (e instanceof mongoose.Error) {
      next(createError(400, "Invalid User Id"));
      return;
    }
    next(e);
  }
};

module.exports = deleteUser;
