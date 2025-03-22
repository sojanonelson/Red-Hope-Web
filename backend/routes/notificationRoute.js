// routes/notificationRoutes.js
const express = require('express');
const notificationController = require('../controllers/NotificationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request-blood', authMiddleware, notificationController.requestBlood);
// router.get('/notifications', authMiddleware, notificationController.getNotifications);
// router.post('/respond-to-request', authMiddleware, notificationController.respondToRequest);

module.exports = router;