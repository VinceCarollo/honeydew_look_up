require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Lookup = require('./api/Lookup')

app.use('/lookup', Lookup)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
