const jwt=require('jsonwebtoken');

const createJSONWebToken=(payload,secretKey, expiresIn)=>{
  const  token =jwt.sign({fo:payload},secretKey,{expiresIn})
  return token;
}

module.exports = createJSONWebToken