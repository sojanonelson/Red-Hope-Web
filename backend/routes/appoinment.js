const express = require('express');
const appointment= require('../controllers/AppoinmentController');
const router = express.Router();

router.post('/book', appointment.bookAppointment);
router.put('/update/:id', appointment.updateAppointmentStatus);

module.exports = router;
