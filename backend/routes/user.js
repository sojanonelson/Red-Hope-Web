const express = require('express');
const { getUserById, getUsersByRole } = require('../controllers/userController');
const router = express.Router();

// Route to get user by ID
router.get('/:id', getUserById);
router.get('/account/:role', getUsersByRole);

module.exports = router;
