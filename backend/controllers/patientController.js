const Patient = require('../models/Patient');

async function fetchPatient(req, res) {
    try {
        const searchQuery = req.query.q;
        let patients;
        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i'); // case-insensitive search
            patients = await Patient.find({
                $or: [
                    { name: regex },
                    { email: regex },
                    { doctor: regex },
                    { phone: regex },
                    { gender: regex }
                ]
            });
        } else {
            patients = await Patient.find({});
        }
        res.status(200).send(patients);
    } catch (err) {
        console.log(err + " ( Error in fetching doctors from database)");
        res.status(500).send(err);
    }
}


async function addPatient(req, res) {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json(newPatient);
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    fetchPatient,
    addPatient,
}

