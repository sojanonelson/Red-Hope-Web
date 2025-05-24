// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();
// console.log("Email setup with user:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendMail = async ({ to, subject, text, html }) => {
  console.log("Email sended sucessfulyy")
  const mailOptions = {
    from: `"Red Hope Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent ✔");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    return { success: true, messageId: info.messageId, response: info.response };
  } catch (error) {
    console.error("Email Send Failed ❌");
    console.error("Error:", error);
    return { success: false, error };
  }
};

const sendDonationRequestEmail = (to, recipientName, donorName, bloodGroup, hospital, date, contactLink) => {
 
  
  const content = `
    <h1>🩸 Blood Donation Request</h1>
    <p>Dear ${donorName},</p>
    <p>Your blood type <strong>${bloodGroup}</strong> is needed to help ${recipientName} at ${hospital} on ${date}.</p>
    <a href="${contactLink}">Click here to respond</a>
    <p>Blood Donation Team</p>
  `;
  
  return sendMail({
    to, // Use the parameter instead of hardcoded email
    subject: `🩸 Blood Donation Request (${bloodGroup})`,
    html: content
  });
};

const sendDonationConfirmationEmail = (to, donorName, donationDate, location) => {
  const content = `
    <h1>✅ Donation Confirmed</h1>
    <p>Dear ${to},</p>
    <p>${donorName} has confirmed their donation scheduled for ${donationDate} at ${location}.</p>
    <p>Thank you for using our service!</p>
    <p>Blood Donation Team</p>
  `;
  
  return sendMail({
    to,
    subject: '✅ Donation Confirmation',
    html: content
  });
};
module.exports = {

  sendDonationRequestEmail,
  sendDonationConfirmationEmail
};