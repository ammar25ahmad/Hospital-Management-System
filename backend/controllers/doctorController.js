const Doctor = require('../models/Doctor');

// Adding new Doctor to database
async function addDoctor(req, res) {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save()
        res.status(200).send(newDoctor)
    }catch(err){
        console.log(err + " ( Error in saving doctor to database")
        res.status(500).send(error)
    }
}

module.exports = {
    addDoctor
}