import mongoose from 'mongoose';

const disputeSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  reason: { type: String, required: true },
  description: { type: String, required: true },
  evidenceUrls: [{ type: String }],
  aiCategorization: { type: String },
  status: { type: String, enum: ['pending', 'reviewing', 'resolved_refund', 'resolved_dismissed'], default: 'pending' },
  adminNotes: { type: String }
}, { timestamps: true });

export default mongoose.model('Dispute', disputeSchema);
