// controllers/bloodController.js
const User = require('../models/User');



exports.searchBlood = async (req, res) => {
    console.log("hel")
    try {
        const { bloodGroup, city, state } = req.query;
        console.log("Blood:", bloodGroup)

        if (!bloodGroup || !city || !state) {
            return res.status(400).json({ message: "Please provide blood group, city, and state." });
        }

        const donors = await User.find({
            bloodGroup,
            city,
            state,
             status: "available"
        }, '-password');

        if (donors.length === 0) {
            return res.status(404).json({ message: "No donors found for the requested blood group in your location." });
        }

        res.status(200).json({ donors });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.getAllDonors = async (req, res) => {
    try {
        const donors = await User.find({}, '-password');
        res.status(200).json({ donors });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};