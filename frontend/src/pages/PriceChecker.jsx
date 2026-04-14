import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, MapPin, Wrench } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

export default function PriceChecker() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkPrice = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate AI Call
    setTimeout(() => {
      setResult({
        fairPriceRange: '₹400 - ₹550',
        explanation: 'Based on 42 verified Plumbers in your region and historical data. The provider quote is slightly high for this area.',
        badge: 'Overpriced',
        confidence: 'High'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> AI Powered
        </motion.div>
        <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
          Is that quote fair? <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">Let AI check.</span>
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Instantly compare against thousands of verified local bookings.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.form initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={checkPrice} className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Service Type</label>
            <div className="relative">
              <Wrench className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input required className="pl-10 h-11" placeholder="e.g. Plumber, Electrician" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">City / Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input required className="pl-10 h-11" placeholder="e.g. Bangalore, Mumbai" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Quoted Price (₹)</label>
            <div className="relative">
              <Calculator className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input required type="number" className="pl-10 h-11" placeholder="600" />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 text-lg shadow-primary-500/25">
            {loading ? <span className="animate-pulse">Checking Market Data...</span> : 'Analyze Quote'}
          </Button>
        </motion.form>

        <AnimatePresence mode="wait">
          {result && !loading && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="h-full">
              <Card className="h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${result.badge === 'Overpriced' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' : 'bg-green-100 text-green-700'}`}>
                    {result.badge}
                  </span>
                </div>
                <CardContent className="p-8 pt-12 flex flex-col justify-center h-full">
                  <h3 className="text-gray-500 font-semibold text-sm mb-1 uppercase tracking-wider">Fair Market Range</h3>
                  <div className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                    {result.fairPriceRange}
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-3">
                      <Sparkles className="w-6 h-6 text-primary-500 shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {result.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Negotiation Tips</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc pl-4">
                      <li>Ask for a breakdown of materials vs labor.</li>
                      <li>Mention the area average is closer to ₹500.</li>
                      <li>Check if multiple smaller tasks can be grouped.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
