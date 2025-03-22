const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Donor
exports.registerDonor = async (req, res) => {
  try {
    const { name, status, email, password,phone,pincode ,bloodGroup, state,adharnumber,upiID, city,price } = req.body;

    // Validate required fields
    if (!bloodGroup || !status) {
      return res.status(400).json({ msg: 'Blood group and status are required for donors.' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Donor account
    user = new User({
      name,
      email,
      password: hashedPassword,
      bloodGroup,
      state,
      city,
      pincode,
      role: 'donor', // Set role as donor
      aadharNumber:adharnumber,
      phoneNumber:phone,
      upi:upiID,
      price,
      status
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register Recipient
exports.registerRecipient = async (req, res) => {
  try {
    const { name, email, password, state, city,phone,pincode,adharnumber } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Recipient account (No Blood Group or Status needed)
    user = new User({
      name,
      email,
      password: hashedPassword,
      state,
      pincode,
      phoneNumber:phone,
      city,
     
      aadharNumber:adharnumber,
      role: 'recipient' // Set role as recipient
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User (Same for both Donor and Recipient)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
