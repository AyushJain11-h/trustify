import { Search, Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100 via-white to-white dark:from-primary-900/20 dark:via-gray-900 dark:to-gray-900 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium mb-8 border border-primary-100 dark:border-primary-800/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Local Services</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white"
            >
              Find professionals you can <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">actually trust.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Verified electricians, plumbers, and tutors. Ask our AI for recommendations, fair pricing, and background checks before you book.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 justify-center"
            >
              <div className="relative w-full md:w-2/3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Need a plumber near downtown..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                />
              </div>
              <Link to="/providers" className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Search
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-green-500" />}
              title="100% Verified Profiles"
              description="Every provider undergoes rigorous identity and background checks to ensure your safety."
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-primary-500" />}
              title="AI Price Estimator"
              description="Don't get overcharged. Our AI analyzes historical data to give you fair price estimates."
            />
            <FeatureCard 
              icon={<MapPin className="w-8 h-8 text-blue-500" />}
              title="Live Real-Time Tracking"
              description="Track your service provider in real-time as they arrive at your location."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default Home;
