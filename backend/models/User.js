const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  
  profilePicture: { type: String, default: 'https://st.depositphotos.com/1008939/2240/i/450/depositphotos_22408839-stock-photo-serious.jpg' },
  phoneNumber: { type: String, required: true },
  alternatePhoneNumber: { type: String },
  aadharNumber: { type: String},
  pincode: { type: String, required: true },

  state: { type: String, required: true },
  city: { type: String, required: true },
  upi: { type: String, },

  role: { type: String, enum: ['donor', 'recipient'], required: true },
  bloodGroup: { type: String, },
  price: { type: String, },

  status: { 
    type: String, 
    enum: ['available', 'not available'], 
    default: 'not available' 
  },

  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
