const ServiceHistory = require("../models/ServiceHistory");
const Notification = require("../models/Notification");
const Donor = require("../models/User");

exports.createServiceHistory = async (req, res) => {
    try {
      const { donorId, userId, paymentStatus, location, selectedDate } = req.body;
  
      // Validate required fields
      if (!donorId || !userId || !location || !selectedDate) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Fetch donor data
      const donorData = await Donor.findById(donorId);
      if (!donorData) {
        return res.status(404).json({ error: "Donor not found" });
      }
      const userData = await Donor.findById(userId);
      if (!userData) {
        return res.status(404).json({ error: "Donor not found" });
      }
  
      // Create service history
      const serviceHistory = new ServiceHistory({
        donorId,
        donorName: donorData.name, // Ensure donorData has a 'name' field
        userId,
        recipientName:userData.name,
        donorNumber:donorData.phoneNumber,
        recipientNumber:userData.phoneNumber,
        paymentStatus: paymentStatus || "No Need", // Default to "No Need" if not provided
        location,
        date:selectedDate,
      });
  
      await serviceHistory.save();
  
      // Create notification for the donor
      const notification = new Notification({
        donorId,
        userId,
        selectedDate,
        status: "pending", // Default status
      });
  
      await notification.save();
  
      // Update donor's notifications (if Donor schema supports it)
      await Donor.findByIdAndUpdate(donorId, {
        $push: { notifications: notification._id },
      });
  
      res.status(201).json({
        message: "Service history and notification created successfully",
        serviceHistory,
        notification,
      });
    } catch (error) {
      console.error("Error creating service history:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
exports.getAllSericeByDonorId = async (req, res) => {
   
  try {
    const { donorId } = req.params;

    if (!donorId) {
      return res.status(400).json({ error: "Donor ID is required" });
    }

    const donorServices = await ServiceHistory.find({ donorId });

    if (!donorServices.length) {
      return res.status(404).json({ message: "No services found for this donor" });
    }

    res.json(donorServices);
  } catch (error) {
    console.error("Error fetching service history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getAllSericeByRecipientId= async (req, res) => {
   
    try {
        
      const { recipientId } = req.params;
      const userId = recipientId
      console.log("R:",recipientId)
      if (!userId) {
        return res.status(400).json({ error: "Donor ID is required" });
      }
  
      const recipientServices = await ServiceHistory.find({ userId });
  
      if (!recipientServices.length) {
        return res.status(404).json({ message: "No services found for this donor" });
      }
  
      res.json(recipientServices);
    } catch (error) {
      console.error("Error fetching service history:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };