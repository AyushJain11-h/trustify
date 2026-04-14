import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Providers from './pages/Providers';
import PriceChecker from './pages/PriceChecker';
import TrustScoreDetail from './pages/TrustScoreDetail';
import CompareProviders from './pages/CompareProviders';
import FraudAlerts from './pages/admin/FraudAlerts';
import Insights from './pages/provider/Insights';
import History from './pages/bookings/History';
import EmergencySupport from './pages/EmergencySupport';
import DisputeCenter from './pages/DisputeCenter';
import RealTimeChat from './pages/chat/RealTimeChat';
import OnboardingWizard from './pages/provider/OnboardingWizard';
import Analytics from './pages/admin/Analytics';
import ReviewInsights from './pages/ReviewInsights';
import ChatbotWidget from './components/ChatbotWidget';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/price-check" element={<PriceChecker />} />
          <Route path="/trust-score/:providerId" element={<TrustScoreDetail />} />
          <Route path="/compare" element={<CompareProviders />} />
          <Route path="/admin/fraud-alerts" element={<FraudAlerts />} />
          <Route path="/provider/insights" element={<Insights />} />
          <Route path="/bookings/history" element={<History />} />
          <Route path="/emergency" element={<EmergencySupport />} />
          <Route path="/support/disputes" element={<DisputeCenter />} />
          <Route path="/chat/:bookingId" element={<RealTimeChat />} />
          <Route path="/provider/onboarding" element={<OnboardingWizard />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/reviews/insights/:providerId" element={<ReviewInsights />} />
        </Routes>
        <Footer />
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;
