const express = require('express')
const router = express.Router()
const { fetchPatient } = require('../controllers/patientController')

router.get("/", fetchPatient)

module.exports = router