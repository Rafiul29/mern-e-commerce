const User=require('../../models/User')

const findUserByEmail = async ( email ) => {
  
    const user = await User.findOne({email});

    return user;
};

module.exports = findUserByEmail;
