const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./users/user.router')

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(
  cors({
    origin: ['*'],
  })
)
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
