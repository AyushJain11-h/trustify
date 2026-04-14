import Booking from '../models/Booking.js';
import FraudAlert from '../models/FraudAlert.js';
import TrustScore from '../models/TrustScore.js';

export const getAdminAnalytics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const emergencyBookings = await Booking.countDocuments({ isEmergency: true });
    const fraudAlerts = await FraudAlert.countDocuments({ status: 'open' });
    
    // Revenue mock - multiply total bookings by average a mock slice
    const revenue = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$agreedPrice' } } }
    ]);

    res.json({
      totalBookings,
      emergencyBookings,
      openFraudAlerts: fraudAlerts,
      totalRevenue: revenue.length > 0 ? revenue[0].total : 0,
      charts: {
         bookingGrowth: [10, 25, 45, 80, 150, 200, 250],
         fraudTrend: [5, 2, 8, 3, 1, 0, 4]
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
