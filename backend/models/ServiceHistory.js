const mongoose = require("mongoose");

const ServiceHistorySchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  donorName: {
    type: String,
    
  },
  recipientName:{
    type: String,
    
  },
  recipientNumber:{
    type: String,
    
  },donorNumber:{
    type: String,
    
  },
  date: { type: Date, required: true },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "No Need"],
    required: true,
  },
  donation: {
    type: String,
    enum: ["Done", "Cancelled", "Pending"],
    default: "Pending",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ServiceHistory", ServiceHistorySchema);
