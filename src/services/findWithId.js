const { default: mongoose } = require("mongoose");
const createError = require("http-errors");
const { notFound } = require(".././utlis/error");

const findWithId = async ({ Model, id, options = {} }) => {
  
    const item = await Model.findById(id, options);

    if (!item) {
      throw createError(404,`Requested resource ${Model.modelName} not found with this id`)
      // createError(404,'Requested resource
    }

    return item;
};

module.exports = findWithId;
