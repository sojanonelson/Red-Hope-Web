const Appointment = require('../models/Appoinment');

exports.processPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.paymentStatus = 'Paid';
    appointment.status = 'Completed';
    await appointment.save();

    res.json({ message: 'Payment successful, appointment confirmed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
