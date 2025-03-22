const express = require('express');
const auth = require('../controllers/authController');

const router = express.Router();
router.post('/login', auth.login);

router.post('/register/donor', auth.registerDonor);
router.post('/register/recipient', auth.registerRecipient);

module.exports = router;
