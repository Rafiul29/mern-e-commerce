require('dotenv').config()

const serverPort = process.env.SERVER_PORT || 5001

const MongodbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce"

const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.png'

const smtpUserName=process.env.SMTP_USERNAME || ""
const smtpPassword=process.env.SMTP_PASSWORD || ""

const clientURL=process.env.CLIENT_URL || ''

const jwtActivityKey=process.env.JWT_SECRET_KEY || "qwdqd@#@!DQ213213WW"

module.exports = {
  serverPort,
  MongodbUrl,
  defaultImagePath,
  smtpUserName,
  smtpPassword,
  clientURL,
  jwtActivityKey
}