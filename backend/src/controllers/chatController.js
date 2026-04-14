import ChatMessage from '../models/ChatMessage.js';

export const getChatHistory = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const messages = await ChatMessage.find({ booking: bookingId }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
