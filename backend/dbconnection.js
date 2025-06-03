const mongoose = require('mongoose'); // For connecting to Database
require('dotenv').config()    // Package for importing variables from .env file

// MongoURL Variable from .env file
const Mongo_URL = process.env.MongoURL

//  DataBase Connection
async function connectToDatabase() {
    try {
        await mongoose.connect(Mongo_URL);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err + " (Error in Connecting to Database0")
    }
  }

  module.exports = connectToDatabase;