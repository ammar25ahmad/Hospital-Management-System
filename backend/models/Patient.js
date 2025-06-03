const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    bloodGroup:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        minLength: 11,
        maxLength: 11,
    },
    cnic:{
        type: Number,
        required: true,
    },
})