const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true, // No two doctors can have same CNIC number
    minLength: 13,
    maxLength: 13,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true, // No two doctors can have same phone number
    minLength: 10,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two doctors can have same email
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
