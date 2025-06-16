const express = require("express");
const router = express.Router();
const { fetchMedicine } = require("../controllers/medicineController");
const { addMedicine } = require("../controllers/medicineController");

router.get("/", fetchMedicine);
router.post("/", addMedicine);

module.exports = router;
