const mongoose = require('mongoose');
// bcrypt is no longer needed here as hashing and comparison are removed/simplified.

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    role: {
        type: String,
        default: 'admin',
    }
}, { timestamps: true });

// The pre-save hook for hashing password has been REMOVED.
// Hashing will now be handled in controller functions before saving.

// The comparePassword method has been removed as passwords will be stored in plaintext.
// Direct comparison will be done in the controller if needed.

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;