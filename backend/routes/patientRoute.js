const express = require('express')
const router = express.Router()
const { fetchPatient } = require('../controllers/patientController')
const { addPatient } = require('../controllers/patientController')

router.get("/", fetchPatient)
router.post("/", addPatient)

module.exports = router