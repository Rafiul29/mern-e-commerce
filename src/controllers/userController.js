const createError = require("http-errors")
const User = require("../models/userModel")

const getUsers = async (req, res,next) => {
  try {
    const search = req.query.search || "";
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 1;

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

    if (!users) throw createError(404, 'no users found')
    res.status(200).send({
      message: "users were returned successfully",
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit: limit,
        nextPage: page < Math.ceil(count / limit)? page + 1 : null,
        previousPage: page > 1? page - 1 : null,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getUsers }