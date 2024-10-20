const createHttpError = require("http-errors");
const User = require("../../models/User");
const findWithId = require("../findWithId");
const handleUserAction = async ({ userId, action }) => {
  try {
    let update;
    if (action === "ban") {
      update = true;
    } else if (action === "unban") {
      update = false;
    } else {
      createHttpError(400, "Invalid action");
      return;
    }
    const options = { password: 0 };
    const user = await findWithId({
      Model: User,
      id: userId,
      options,
    });
    console.log(user);
    user.isBanned = update;
    user.save();
    return user;
  } catch (e) {
    throw createHttpError(404, e);
  }
};

module.exports = handleUserAction;
