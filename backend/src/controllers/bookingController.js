import Booking from '../models/Booking.js';
import ServiceProvider from '../models/ServiceProvider.js';
import User from '../models/User.js';

export const createBooking = async (req, res) => {
  try {
    const { providerId, serviceType, agreedPrice, estimatedDuration } = req.body;

    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    let customerId;
    if (req.user) {
      customerId = req.user._id;
    } else {
      // Mock fallback: find the first customer in the DB
      const fallbackUser = await User.findOne({ role: 'customer' });
      if (!fallbackUser) {
        return res.status(400).json({ message: 'No mock customer found in database.' });
      }
      customerId = fallbackUser._id;
    }

    const booking = await Booking.create({
      customer: customerId,
      provider: providerId,
      serviceType: serviceType || 'General Service',
      agreedPrice: agreedPrice || 250,
      estimatedDuration: estimatedDuration || '1 hour',
      isEmergency: req.body.isEmergency || false,
      otp,
      status: 'pending'
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('provider');
      
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status, otp } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status === 'in_progress') {
      if (booking.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      booking.startTime = new Date();
    } else if (status === 'completed') {
      booking.endTime = new Date();
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
