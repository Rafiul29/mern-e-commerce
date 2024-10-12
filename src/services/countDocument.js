const { default: mongoose } = require("mongoose");
const createError = require("http-errors");

const countDocuments = async ({ Model, search = "" }) => {
  const item = await Model.find(search).countDocuments();
  if (!item) {
    throw createError(400, `Item not found`);
  }
  return item;
};

module.exports = countDocuments;
