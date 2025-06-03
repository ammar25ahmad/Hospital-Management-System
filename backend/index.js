// Require Package or Modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')   // For Parsing the JSON Data
const cors = require('cors')  // For Cross Origin Communications means to send & receive data from backend to frontend
const mongoose = require('mongoose'); // For connecting to Database
const connectToDatabase = require('./dbconnection')  // Importing Database Connection
require('dotenv').config()    // Package for importing variables from .env file
const doctorRoute = require('./routes/doctorRoute')

// PORT Variable from .env file
const PORT = process.env.PORT  

//  Body Parser Middleware for passing data in JSON format 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// For receiving JSON data in correct format
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//  Defining Cors URL to pass data over cross origin means send or recieve data from frontend to backend
const corsOption = {
    origin: ['http://localhost:5173']
}
app.use(cors(corsOption))

// Connceting to Database
connectToDatabase();
//  Index Route
app.get('/', async(req, res) => {
  res.send('Server is running')
})

// Main Work

app.use('/adddoctor', doctorRoute)


// PORT LISTENING

app.listen(PORT, () => {
    console.log("Server Running on PORT 3000")
})