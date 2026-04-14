import mongoose from 'mongoose';

const fraudAlertSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  type: { type: String, enum: ['suspicious_pricing', 'fake_review', 'identity_mismatch', 'high_cancellation'], required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  description: { type: String },
  relatedEntities: {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
  },
  status: { type: String, enum: ['open', 'investigating', 'resolved', 'dismissed'], default: 'open' }
}, { timestamps: true });

export default mongoose.model('FraudAlert', fraudAlertSchema);
