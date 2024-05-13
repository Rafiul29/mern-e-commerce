require('dotenv').config()

const serverPort = process.env.PORT || 5001

const MongodbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce"

const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.png'

module.exports = {
  serverPort,
  MongodbUrl,
  defaultImagePath
}