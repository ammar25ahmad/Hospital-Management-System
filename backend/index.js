// ? Require Package or Modules

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')  //? For Cross Origin Communications means to send & receive data from backend to frontend
require('dotenv').config()    //? Package for importing variables from .env file
const PORT = process.env.PORT  //? PORT Variable from .env file



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOption = {
    origin: ['http://localhost:5173']
}
app.use(cors(corsOption))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//? PORT LISTENING

app.listen(PORT, () => {
    console.log("Server Running on PORT 3000")
})