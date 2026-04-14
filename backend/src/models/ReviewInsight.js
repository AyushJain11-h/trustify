import mongoose from 'mongoose';

const reviewInsightSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  summary: { type: String, required: true }, // AI generated summary text
  sentimentRatio: {
    positive: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    negative: { type: Number, default: 0 }
  },
  commonGoodKeywords: [{ type: String }],
  commonBadKeywords: [{ type: String }],
  lastCalculated: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('ReviewInsight', reviewInsightSchema);
