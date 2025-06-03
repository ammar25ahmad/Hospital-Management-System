const express = require('express');
const router = express.Router();
const {addDoctor} = require('../controllers/doctorController')

router.post("/", addDoctor)

module.exports = router