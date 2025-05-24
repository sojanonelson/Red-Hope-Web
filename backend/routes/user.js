const express = require('express');
const { getUserById, getUsersByRole,updateUserData } = require('../controllers/userController');
const router = express.Router();

// Route to get user by ID
router.get('/:id', getUserById);
router.put('/:id', updateUserData);
router.get('/account/:role', getUsersByRole);

module.exports = router;
