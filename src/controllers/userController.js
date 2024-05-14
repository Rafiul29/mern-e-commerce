const createError = require("http-errors")
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findUserById } = require("../services/findById");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;

    const searchReqExp = new RegExp(".*" + search + ".*", 'i')

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchReqExp } },
        { email: { $regex: searchReqExp } },
        { phone: { $regex: searchReqExp } }
      ]
    }

    const options = { password: 0 }

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit)

    const count = await User.find(filter).countDocuments()

    if (users.length === 0) {
      throw createError(404, 'no users found')
    }


    // Set Cache-Control header
    res.header("Cache-Control", "public,max-age=60");

    return successResponse(res, {
      statusCode: 200,
      message: "users were returned successfully",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          limit: limit,
          nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
          previousPage: page > 1 ? page - 1 : null,
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

// get single user
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    const user= await findUserById(id)

    return successResponse(res, {
      statusCode: 200,
      message: "user were returned successfully",
      payload: {
        user
      }
    })
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid user id"))
      return
    }
    next(error)
  }
}

module.exports = { getUsers, getUser }