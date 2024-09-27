const mongoose = require("mongoose");
const { mongodbUrl } = require("../secret");

const connectDB = async (options) => {
  try {
    await mongoose.connect(mongodbUrl, options).then(() => {
      console.log("Database connected successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("DB connection error: " + err);
    });
  } catch (error) {
    console.log("Could not connected to DB : " + error.message);
  }
};

module.exports = connectDB;
