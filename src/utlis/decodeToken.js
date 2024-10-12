const jwt=require('jsonwebtoken')
const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithm });
  } catch (e) {
    throw e;
  }
};

module.exports=decodeToken