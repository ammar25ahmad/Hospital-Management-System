// Require Package or Modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // For Parsing the JSON Data
const cors = require("cors"); // For Cross Origin Communications means to send & receive data from backend to frontend
const cookieParser = require("cookie-parser"); // For parsing cookies
const connectToDatabase = require("./dbconnection"); // Importing Database Connection
require("dotenv").config(); // Package for importing variables from .env file
const doctorRoute = require("./routes/doctorRoute");
const adminRoute = require("./routes/adminRoute"); // Import new admin routes

// PORT Variable from .env file
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
  process.exit(1); // Exit if JWT_SECRET is not set
}

//  Body Parser Middleware for passing data in JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// For receiving JSON data in correct format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

//  Defining Cors URL to pass data over cross origin means send or recieve data from frontend to backend
const corsOption = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOption));

// Connceting to Database
connectToDatabase();
//  Index Route
app.get("/", async (req, res) => {
  res.send("Server is running");
});

// Main Work

app.use("/adddoctor", doctorRoute);
app.use("/fetchDoctor", doctorRoute);

// Use Admin Routes - Prefixed with /api/admin
app.use("/api/admin", adminRoute);

// PORT LISTENING

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
