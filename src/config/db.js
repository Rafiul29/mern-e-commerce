const mongoose = require('mongoose');
const { MongodbUrl } = require('../secret');

const connectDatabase = async (options) => {
  try {
    await mongoose.connect(MongodbUrl, options)
      .then(() => {
        console.log("Database connected successfully")
      })
    mongoose.connection.on('error', (err) => {
      console.log("DB connection error: " + err)
    })
  } catch (error) {
    console.log("Could not connected to DB : " + error.message)
  }
}


module.exports = connectDatabase
