const data = require("../data");
const {User} = require("../models")

const seedUser=async(req, res, next) => {
  try{
    // delete all existing user
      await User.deleteMany({});
    // insert new users
    const users=await User.insertMany(data.users);
    return res.status(201).json(users)
  }catch(error){
    next(error)
  }
}




module.exports = seedUser