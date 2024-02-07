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

app.get("/api/:date", (req, res) => {
  debugger
  const { date } = req.params

  if (date.includes("-")) {
    // utc format
    const valid = new Date(date).toString()

    if (valid === "Invalid Date") {
      res.json({
        error: valid,
      })
    } else {
      const _date = new Date(date)
      res.json({
        unix: _date.valueOf(),
        utc: _date.toUTCString(),
      })
    }

  } else if (!date.includes("-")) {
    const valid = new Date(parseInt(date)).toString()
    if (valid === "Invalid Date") {
      res.json({
        error: valid,
      })
    } else {
      res.json({
        unix: parseInt(date),
        utc: new Date(parseInt(date)).toUTCString(),
      })
    }
  }
})

app.get("/api", (req, res) => {
  const date = new Date()
  res.json({ unix: date.valueOf(), utc: date.toUTCString() }).status(304)
})

app.get("/alive", (req, res) => {
  res.send("server alive hellow world")
})
