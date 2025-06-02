// ? Require Package or Modules

const express = require('express')
const app = express()
const bodyParser = require('body-parser')   //? For Parsing the JSON Data
const cors = require('cors')  //? For Cross Origin Communications means to send & receive data from backend to frontend
require('dotenv').config()    //? Package for importing variables from .env file
const PORT = process.env.PORT  //? PORT Variable from .env file

// ? Body Parer Middleware for passing data in JSON format 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ? Defining Cors URL to pass data over cross origin means send or recieve data from frontend to backend
const corsOption = {
    origin: ['http://localhost:5173']
}
app.use(cors(corsOption))

// ? Index Route
app.get('/', (req, res) => {
  res.send('Server is running')
})

//? PORT LISTENING

app.listen(PORT, () => {
    console.log("Server Running on PORT 3000")
})