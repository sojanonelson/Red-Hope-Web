const express = require("express");
const router = express.Router();
const { createServiceHistory, getService, getAllSericeByDonorId, getAllSericeByRecipientId } = require("../controllers/ServiceController");

router.post("/connect", createServiceHistory);
router.get("/donor/:donorId", getAllSericeByDonorId);
router.get("/recipient/:recipientId", getAllSericeByRecipientId);


module.exports = router;
