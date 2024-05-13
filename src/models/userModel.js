const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const { defaultImagePath } = require('../secret')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minLength: [3, "User name max length 31 characters"],
    maxLength: [31, "User name max length 31 characters"]
  },
  email: {
    type: String,
    required: [true, 'Email name is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    minLength: [6, "The length of user password can be minimum 6  characters"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
  },
  image: {
    type: String,
    default:defaultImagePath 
  },
  phone: {
    type: String,
    required: [true, 'User phone number is required'],
  },
  address: {
    type: String,
    required: [true, 'User address is required'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true })


module.exports = model('Users', userSchema)