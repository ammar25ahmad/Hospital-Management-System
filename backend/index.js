const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')  //? For Cross Origin Communications means to send & receive data from backend to frontend
require('dotenv').config()    //? Package for importing variables from .env file
const PORT = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//? PORT LISTENING

app.listen(PORT, () => {
    console.log("Server Running on PORT 3000")
})