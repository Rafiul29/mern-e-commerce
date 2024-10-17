const createError = require("http-errors");
const { notFound } = require("../utlis/error");

const findItem = async ({ Model, email }) => {
  
    const item = await Model.findOne({email});

    return item;
};

module.exports = findItem;
