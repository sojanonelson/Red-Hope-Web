// services/notificationService.js
const {
  sendDonationRequestEmail,
  sendDonationConfirmationEmail,
  sendDonorMatchNotification,
  
} = require('../utils/mailer');
const Notification = require('../models/Notification');
const User = require('../models/User');


const sendDonationRequest = async (donorEmail, recipientName, donorName, bloodGroup, location, date) => {
  try {
    const contactLink = `https://your-blood-site.org/donate-response`; // Update with your actual link
    
    await sendDonationRequestEmail(
      donorEmail,
      recipientName,
      donorName,
      bloodGroup,
      location,
      date,
      contactLink
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error sending donation request:', error);
    throw error;
  }
};

const sendDonationConfirmation = async (recipientEmail, donorName, recipientName, date, location) => {
  try {
    await sendDonationConfirmationEmail(
      recipientEmail,
      donorName,
      date,
      location
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation:', error);
    throw error;
  }
};

module.exports = {
  sendDonationRequest,
  sendDonationConfirmation
};