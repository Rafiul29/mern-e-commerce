const { default: mongoose } = require("mongoose");
const createError = require("http-errors");

const User = require("../../../../models/User");
const services = require("../../../../services");

const findSingleUser = async (req, res, next) => {
  const { id } = req.params;
  const options = { password: 0 };
  try {
    const user = await services.findWithId({ Model: User, id: id, options });

    // generate response
    const response = {
      data: {
        ...user._doc,
        link: req.url,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    if(e instanceof mongoose.Error){
      next(createError(400,"Invalid User Id"))
      return
    }
    next(e);
  }
};

module.exports = findSingleUser;