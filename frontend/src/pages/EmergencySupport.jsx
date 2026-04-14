import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, MapPin, Navigation, Phone, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function EmergencySupport() {
  const [dispatching, setDispatching] = useState(false);

  return (
    <div className="min-h-[85vh] bg-red-50 dark:bg-red-950/20 flex flex-col pt-12 items-center">
      <div className="max-w-2xl w-full px-4 text-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="inline-flex justify-center items-center bg-red-100 dark:bg-red-900/50 p-6 rounded-full mb-6"
        >
          <ShieldAlert className="w-16 h-16 text-red-600" />
        </motion.div>
        
        <h1 className="text-4xl font-extrabold text-red-600 dark:text-red-500 mb-4">Emergency Dispatch</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Need immediate help? We bypass the standard booking queue and ping the highest-rated available professionals within a 5km radius directly.
        </p>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-red-100 dark:border-red-900">
          <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2 mb-2"><Navigation className="w-3 h-3" /> Auto-Detected Location</label>
              <div className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">Koramangala, 5th Block</div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2 mb-2"><AlertCircle className="w-3 h-3" /> Average ETA</label>
              <div className="font-medium text-red-600 dark:text-red-500">&lt; 15 Minutes</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!dispatching ? (
              <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button 
                  onClick={() => setDispatching(true)}
                  variant="destructive" 
                  className="w-full h-16 text-xl font-bold uppercase tracking-wider rounded-2xl shadow-xl shadow-red-500/30 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">Find Nearest Pro <MapPin className="w-5 h-5" /></span>
                </Button>
              </motion.div>
            ) : (
              <motion.div key="loader" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-4">
                <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mx-auto"></div>
                <p className="text-red-600 font-medium animate-pulse">Contacting strict-verified professionals nearby...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Phone className="w-4 h-4" /> Or call our 24/7 hotline: <a href="tel:1800123456" className="font-semibold hover:text-gray-900 dark:hover:text-white transition-colors">1800-TRUST-ME</a>
        </div>
      </div>
    </div>
  );
}
