import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  serviceType: { type: String, required: true },
  agreedPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  estimatedDuration: { type: String },
  otp: { type: String }, // OTP for start verification
  startTime: { type: Date },
  endTime: { type: Date },
  isEmergency: { type: Boolean, default: false },
  invoiceUrl: { type: String },
  disputeStatus: { type: String, enum: ['none', 'open', 'resolved'], default: 'none' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
