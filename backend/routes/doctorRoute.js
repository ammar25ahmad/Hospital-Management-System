const express = require('express');
const router = express.Router();
const {addDoctor} = require('../controllers/doctorController')
const {fetchDoctor} = require('../controllers/doctorController')

router.post("/", addDoctor)
router.get("/", fetchDoctor)

module.exports = router