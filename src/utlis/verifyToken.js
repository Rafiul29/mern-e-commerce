const jwt=require('jsonwebtoken')
const verifyToken = ({
  token,
  algorithm = "HS256",
  secret
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (e) {
    throw e
  }
};

module.exports=verifyToken