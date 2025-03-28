const express = require("express");
const router = express.Router();
const { createServiceHistory, getService, getAllSericeByDonorId, getAllSericeByRecipientId } = require("../controllers/ServiceController");
const { updateBloodRequest } = require("../controllers/donorController");

router.post("/connect", createServiceHistory);
router.get("/donor/:donorId", getAllSericeByDonorId);
router.get("/recipient/:recipientId", getAllSericeByRecipientId);
router.put("/blood-request/:requestId", updateBloodRequest);


module.exports = router;
