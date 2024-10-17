const config = {
  totoalItems: 0,
  limit: 10,
  page: 1,
  sortType: "dsc",
  sortBy: "updatedAt",
  search: "",
  PORT: 500,
  DEFAULT_IMAGE_PATH: "public/images/users/default.png",
  MONGODB_URI: "mongodb://localhost:27017/e-commerce",
  SMTP_USERNAME: "",
  SMTP_PASSWORD: "",
  CLIENT_URL: "",
  JWT_SECRET_KEY: "qwdqdqefqfqeWDQ@!#@!#$!#$",
  JWT_ACCESS_KEY:"qwdqdqefqfqeWDQ@!#@!#$!#$",
  UPLOAD_DIRECTORY: "public/images",
  MAX_FILE_SIZE: 2097152,
  ALLOWED_FILE_TYPES: ['image/jpg','image/jpeg','image/png'],
};

module.exports = Object.freeze(config);
