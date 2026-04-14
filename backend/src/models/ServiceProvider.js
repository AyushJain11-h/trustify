import mongoose from 'mongoose';

const serviceProviderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  serviceType: { type: String, required: true, index: true }, // e.g. Electrician, Plumber
  skills: [{ type: String }],
  experienceYears: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  priceUnit: { type: String, default: 'per hour' },
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationDocUrl: { type: String }, // mock document url
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isFraudFlagged: { type: Boolean, default: false },
  availabilityStatus: { type: Boolean, default: true },
  trustScore: { type: Number, default: 50, min: 0, max: 100 },
  visibilityScore: { type: Number, default: 50 },
  cancellationRate: { type: Number, default: 0 }, // percentage
  repeatCustomers: { type: Number, default: 0 },
  responseTimeMins: { type: Number, default: 60 } // average response time in minutes
}, { timestamps: true });

export default mongoose.model('ServiceProvider', serviceProviderSchema);
