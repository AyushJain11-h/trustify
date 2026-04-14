import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import providerRoutes from './src/routes/providerRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import metricsRoutes from './src/routes/metricsRoutes.js';
import chatRoutes from './src/routes/chatRoutes.js';
import insightRoutes from './src/routes/insightRoutes.js';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/insights', insightRoutes);

// Main socket io events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_booking', (bookingId) => {
    socket.join(bookingId);
    console.log(`User ${socket.id} joined booking room ${bookingId}`);
  });

  socket.on('send_message', (data) => {
    // data: { bookingId, senderId, text, ... }
    io.to(data.bookingId).emit('receive_message', data);
  });
  
  socket.on('typing', ({ bookingId, isTyping }) => {
    socket.to(bookingId).emit('typing_status', { isTyping, id: socket.id });
  });

  socket.on('location_share', ({ bookingId, location }) => {
    io.to(bookingId).emit('location_update', location);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/health', (req, res) => res.json({ status: 'ok', message: 'Trustify API is running' }));

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
