import mongoose from 'mongoose';

const aiLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  query: { type: String, required: true },
  response: { type: String, required: true },
  type: { type: String, enum: ['chatbot', 'price_estimator', 'fraud_detection', 'recommendation'], required: true },
  contextUsed: { type: Object }
}, { timestamps: true });

export default mongoose.model('AILog', aiLogSchema);
