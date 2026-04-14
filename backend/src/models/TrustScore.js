import mongoose from 'mongoose';

const trustScoreSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  score: { type: Number, required: true },
  factors: {
    ratingImpact: { type: Number },
    jobsImpact: { type: Number },
    cancellationImpact: { type: Number },
    responseTimeImpact: { type: Number }
  },
  aiReasoning: { type: String }
}, { timestamps: true });

export default mongoose.model('TrustScore', trustScoreSchema);
