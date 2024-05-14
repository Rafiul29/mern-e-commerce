const { default: mongoose } = require("mongoose")
const User = require("../models/userModel")
const createError = require("http-errors")

const findWithId = async (id,options={}) => {
  try {
    
    const item = await User.findById(id, options)

    if (!item) {
      throw createError(404, "item does not exits with this id")
    }

    return item

  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid item id")
    }
    throw error
  }
}

module.exports = { findWithId };