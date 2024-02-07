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

app.get("/api/:id", (req, res) => {
  debugger
  const { url } = req
  const date = url.split("api/")
  const validDate = new Date(parseInt(date[1])).toUTCString()

  if (validDate === "Invalid Date") {
    res.json({ error: validDate })
  } else {
    if (url.includes("-")) {
      res
        .json({
          unix: Date.parse(validDate),
          utc: validDate,
        })
        .status(304)
    } else if (!url.includes("-")) {
      res
        .json({
          unix: parseInt(validDate),
          utc: validDate,
        })
        .status(304)
    }
  }
})

app.get("/api", (req, res) => {
  debugger
  const date = new Date().toUTCString()
  res.json({ unix: Date.parse(date), utc: date }).status(304)
})

app.get("/alive", (req, res) => {
  res.send("server alive hellow world")
})
