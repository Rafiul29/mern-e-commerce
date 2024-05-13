require('dotenv').config()

const serverPort = process.env.PORT || 5001
const MongodbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce"

module.exports ={
  serverPort,
  MongodbUrl
}