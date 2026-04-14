import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderModel: { type: String, enum: ['User', 'ServiceProvider'], required: true },
  text: { type: String },
  imageUrl: { type: String },
  locationExt: {
    lat: { type: Number },
    lng: { type: Number }
  },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('ChatMessage', chatMessageSchema);
