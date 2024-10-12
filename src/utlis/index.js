const query=require('./query')
const deleteImage=require('./deleteImage')
const createJSONWebToken=require('./jsonWebToken')
const emailWithNodeMail=require('./email')
const verifyToken=require('./verifyToken')
const decodeToken=require('./decodeToken')
module.exports={query,deleteImage,createJSONWebToken,emailWithNodeMail,verifyToken,decodeToken}