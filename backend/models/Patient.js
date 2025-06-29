const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
  },
  cnic: {
    type: String,
    required: true,
    minLength: 13,
    maxLength: 13,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
