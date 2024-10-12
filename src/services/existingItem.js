const createError = require("http-errors");
const { notFound } = require(".././utlis/error");

const existingItem = async ({ Model, email }) => {
  
    const item = await Model.exists({email});

    return item;
};

module.exports = existingItem;
