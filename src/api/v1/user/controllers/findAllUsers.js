const User = require("../../../../models/User");
const userServices = require("../../../../services/user");
const services = require("../../../../services");
const { query } = require("../../../../utlis");
const defaults = require("../../../../config/defaults");

const findAllUsers = async (req, res, next) => {
  try {
    const page = +req.query.page || defaults.page;
    const limit = +req.query.limit || defaults.limit;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;
    const search = req.query.search || defaults.search;

    const searchReqExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      role: { $ne: "admin" },
      $or: [
        { name: { $regex: searchReqExp } },
        { email: { $regex: searchReqExp } },
        { phone: { $regex: searchReqExp } },
      ],
    };

    const users = await userServices.findAll({
      sortBy,
      sortType,
      limit,
      page,
      filter,
    });

    // generate response
    //transform items
    const data = query.getTransformedItems({
      items: users,
      selection: [
        "_id",
        "name",
        "email",
        "phone",
        "address",
        "role",
        "createdAt",
        "updatedAt",
        "isBanned",
        "image",
      ],
      path: "/users",
    });

    //total items
    const totalItems = await services.countDocuments({
      Model: User,
      search: filter,
    });

    // pagination
    const pagination = query.getPagination({
      totalItems: totalItems,
      page: page,
      limit: limit,
    });

    //HATEOASLINKS
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    const response = { data, pagination, links };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findAllUsers;
