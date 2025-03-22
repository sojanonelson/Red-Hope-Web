const express = require('express');
const payment = require ('../controllers/paymentController');
const router = express.Router();
router.post('/donate', payment.processPayment);
module.exports = router;