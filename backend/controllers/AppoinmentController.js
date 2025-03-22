const Appointment = require('../models/Appoinment');
const User = require('../models/User');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { donorId, recipientId, bloodGroup, location, date } = req.body;

    const appointment = new Appointment({
      donorId,
      recipientId,
      bloodGroup,
      location,
      date,
      status: 'Pending',
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update appointment status (accept/reject)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: `Appointment ${status}`, appointment });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
