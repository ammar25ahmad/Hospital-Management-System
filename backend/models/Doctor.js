const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true  // No two doctors can have same phone number
    },
    email:{
        type: String,
        required: true,
        unique: true  // No two doctors can have same email
    },
    department:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor