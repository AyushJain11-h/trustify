import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  isAIAnalyzed: { type: Boolean, default: false },
  isFakeFlagged: { type: Boolean, default: false },
  sentimentScore: { type: Number } // 0-1 score from AI analysis
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
