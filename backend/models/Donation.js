import mongoose from 'mongoose';
const DonationSchema = new mongoose.Schema({
  donorId: mongoose.Schema.Types.ObjectId,
  recipientId: mongoose.Schema.Types.ObjectId,
  bloodGroup: String,
  status: { type: String, default: 'Pending' },
});
export default mongoose.model('Donation', DonationSchema);
