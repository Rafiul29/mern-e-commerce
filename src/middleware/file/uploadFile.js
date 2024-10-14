const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const {
  UPLOAD_DIRECTORY,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
} = require("../../config/defaults");

const uploadFile = (subDir = "") => {

  const UPLOAD_DIR = `${UPLOAD_DIRECTORY}/${subDir}`;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      const filename =
        Date.now() + "-" + file.originalname.replace(extname, "")
        .toLowerCase()
        .split(" ")
        .join("-")
      cb(null, filename+extname);
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
  });
  return upload;
};

const fileFilter = (req, file, cb) => {
  // const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(createError(400, `${file.mimetype} file type not allowed`));
  }
  cb(null, true);
};

module.exports = uploadFile;
