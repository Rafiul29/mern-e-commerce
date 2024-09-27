const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const createError = require("http-errors")
const rateLimit=require("express-rate-limit")
const seedRouter = require("./routes/seed")
const routers = require("./routes")


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
// app.use(rateLimiter)

//by pass url
app.use("/api/seed",seedRouter)
app.use(routers)


app.get("/health", (req, res) => {
  res.status(200).send({ message: "Welcome to the server" })
})



//client error handling
app.use((req, res, next) => {
  next(createError(404,"route not found"))
})


// server error handling -> all errors
app.use((err, _req, res, next) => {
  console.log(err.message)
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});


module.exports = app