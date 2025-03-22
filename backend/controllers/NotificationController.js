// controllers/notificationController.js
const Notification = require('../models/Notification');
const User = require('../models/User');

exports.requestBlood = async (req, res) => {
  const { donorId, selectedDate } = req.body;
  const requesterId = req.user._id; // Assuming user is authenticated and ID is available in req.user

  try {
    // Create a new notification
    const notification = new Notification({
      donorId,
      requesterId,
      selectedDate,
    });
    await notification.save();

    // Add notification ID to the donor's notifications array
    await User.findByIdAndUpdate(donorId, { $push: { notifications: notification._id } });

    res.status(201).json({ message: 'Blood request sent successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error sending blood request', error: error.message });
  }
};