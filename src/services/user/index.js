const createHttpError = require("http-errors");
const User = require("../../models/User");

const findAll = async ({ sortBy, sortType, limit, page, filter }) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const options = { password: 0 };

  const users = await User.find(filter, options)
    .sort(sortStr)
    .limit(limit)
    .skip((page - 1) * limit);

  return users;
};

const findSingleItem = async ({id,options={}}) => {
  if (!id) {
    throw new Error("Id is required");
  }

  const item = await User.findById( id, options )

  if (!item) {
    throw createHttpError(404, `Requested resource  not found with this id`);
    // createError(404,'Requested resource
  }

  return {
    ...item._doc,
  };
};

module.exports = { findAll, findSingleItem };
