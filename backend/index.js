// Require Package or Modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')   // For Parsing the JSON Data
const cors = require('cors')  // For Cross Origin Communications means to send & receive data from backend to frontend
const mongoose = require('mongoose'); // For connecting to Database
require('dotenv').config()    // Package for importing variables from .env file


// Importing Models
const Doctor = require('./models/Doctor')

// PORT Variable from .env file
const PORT = process.env.PORT  
// MongoURL Variable from .env file
const Mongo_URL = process.env.MongoURL


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

//  DataBase Connection
async function connectToDatabase() {
  try {
      await mongoose.connect(Mongo_URL);
      console.log('Connected to MongoDB');
  }catch(err){
      console.log(err + " (Error in Connecting to Database0")
  }
}

connectToDatabase();

//  Index Route
app.get('/', async(req, res) => {
  res.send('Server is running')
})

// PORT LISTENING

app.listen(PORT, () => {
    console.log("Server Running on PORT 3000")
})