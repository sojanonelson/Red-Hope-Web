const express = require('express');
const blood =  require('../controllers/bloodController');
const router = express.Router();
router.get('/donors', blood.getAllDonors);
router.get('/search', blood.searchBlood);
module.exports = router;