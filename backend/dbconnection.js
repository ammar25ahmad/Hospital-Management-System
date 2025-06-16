const mongoose = require("mongoose"); // For connecting to Database
require("dotenv").config(); // Package for importing variables from .env file

// MongoURL Variable from .env file
const Mongo_URL = process.env.MongoURL;

//  DataBase Connection
// async function to connect to the database
async function connectToDatabase() {
  // try to connect to the database
  try {
    // await the connection to the database
    await mongoose.connect(Mongo_URL);
    // log a message if the connection is successful
    console.log("Connected to MongoDB");
    // catch any errors that occur during the connection
  } catch (err) {
    // log the error message
    console.log(err + " (Error in Connecting to Database0");
  }
}

module.exports = connectToDatabase;
