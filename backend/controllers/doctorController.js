const Doctor = require('../models/Doctor');

// Adding new Doctor to database
async function addDoctor(req, res) {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save()
        res.status(200).send(newDoctor)
    }catch(err){
        console.log(err + " ( Error in saving doctor to database")
        res.status(500).send(err)
    }
}


async function fetchDoctor(req, res) {
    try {
        const searchQuery = req.query.q;
        let doctors;
        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i'); // case-insensitive search
            doctors = await Doctor.find({
                $or: [
                    { name: regex },
                    { email: regex },
                    { department: regex },
                    { phone: regex },
                    { gender: regex }
                ]
            });
        } else {
            doctors = await Doctor.find({});
        }
        res.status(200).send(doctors);
    } catch (err) {
        console.log(err + " ( Error in fetching doctors from database)");
        res.status(500).send(err);
    }
}

module.exports = {
    addDoctor,
    fetchDoctor,
}
