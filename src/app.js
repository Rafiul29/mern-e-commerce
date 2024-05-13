const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()

// built in middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the server" })
})

app.get("/test", (req, res) => {
  res.status(200).send({ message: "test api works fine" })
})

app.get("/api/user", (req, res) => {
  res.status(200).send({ message: " user login api works fine" })
})


module.exports = app