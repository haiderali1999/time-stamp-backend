const express = require("express")
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const port = process.env.port || 5500

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "index.html")
  res.sendFile(filePath)
})

app.listen(port, () => {
  console.log(`server is listing on ${port} port`)
})

const isInValid = (date) => date.toUTCString() === "Invalid Date"

app.get("/api/:date", (req, res) => {
  debugger
  let { date } = req.params
  date = new Date(date)
  if (isInValid(date)) {
    date = new Date(+req.params.date)
  }

  if (isInValid(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({unix:date.getTime(),utc:date.toUTCString()})

})

app.get("/api", (req, res) => {
  const date = new Date()
  res.json({ unix: new Date().getTime(), utc: date.toUTCString() }).status(304)
})

app.get("/alive", (req, res) => {
  res.send("server alive hellow world")
})
