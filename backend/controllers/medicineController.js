const Medicine = require("../models/Medicine");

async function fetchMedicine(req, res) {
  try {
    const searchQuery = req.query.q;
    let medicines;
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // case-insensitive search
      medicines = await Medicine.find({
        $or: [
          { name: regex },
          { price: regex },
          { quantity: regex },
          { description: regex },
        ],
      });
    } else {
      medicines = await Medicine.find({});
    }
    res.status(200).send(medicines);
  } catch (err) {
    console.log(err + " ( Error in fetching this medicine from database)");
    res.status(500).send(err);
  }
}

async function addMedicine(req, res) {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchMedicine,
  addMedicine,
};
