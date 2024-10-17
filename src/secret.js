require("dotenv").config();
const defaults = require("./config/defaults");

const serverPort = process.env.PORT || defaults.PORT;
const mongodbUrl = process.env.MONGODB_URI || defaults.MONGODB_URI;
const defaultImagePath =
  process.env.DEFAULT_IMAGE_PATH || defaults.defaultImagePath;
const smtpUserName = process.env.SMTP_USERNAME || defaults.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD || defaults.SMTP_PASSWORD;
const clientURL = process.env.CLIENT_URL || defaults.CLIENT_URL;
const jwtActivityKey = process.env.JWT_SECRET_KEY || defaults.JWT_SECRET_KEY;
const Client_URL = process.env.CLIENT_URL || "";
const jwtAccessKey=process.env.JWT_ACCESS_KEY || defaults.JWT_ACCESS_KEY
// const uploadDir = process.env.UPLOAD_DIRECTORY || "public/images";
// const maxFileSize = Number(process.env.MAX_FILE_SIZE) || 2097152;
// const allowFileType = process.env.ALLOWED_FILE_TYPES || ["jpg", "jpeg", "png"];

module.exports = {
  serverPort,
  mongodbUrl,
  defaultImagePath,
  smtpUserName,
  smtpPassword,
  clientURL,
  jwtActivityKey,
  Client_URL,
  jwtAccessKey
};
