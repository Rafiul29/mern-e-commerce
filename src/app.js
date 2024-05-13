
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const createError = require("http-errors")
const rateLimit=require("express-rate-limit")

const app = express()

const rateLimiter=rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later"
})

// built in middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimiter)



app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the server" })
})

app.get("/test", (req, res) => {
  res.status(200).send({ message: "test api works fine" })
})

app.get("/api/user", (req, res) => {
  res.status(200).send({ message: " user login api works fine" })
})

//client error handling
app.use((req, res, next) => {
  next(createError(404,"route not found"))
})


// server error handling -> all errors
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})


module.exports = app