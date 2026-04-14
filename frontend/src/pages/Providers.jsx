import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, ShieldCheck, MapPin, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/providers');
        setProviders(res.data);
      } catch (error) {
        console.error('Error fetching providers', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Available Professionals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Verified experts ready to help you.</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search provider, skill, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
          />
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 dark:from-primary-900/20 dark:to-blue-900/20 dark:border-primary-800/50 flex flex-col md:flex-row gap-4 items-start md:items-center"
      >
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-primary-100 dark:border-gray-700">
          <Sparkles className="w-6 h-6 text-primary-500" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            AI Top Pick: Prakash Sharma
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full dark:bg-primary-900/50 dark:text-primary-300">Highest Rated</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Based on your recent searches, Prakash offers the most competitive rate (₹200/hr) with excellent punctuality reviews.</p>
        </div>
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.filter(provider => {
            const query = searchQuery.toLowerCase();
            const byName = provider.user?.name?.toLowerCase().includes(query);
            const byService = provider.serviceType?.toLowerCase().includes(query);
            const bySkill = provider.skills?.some(skill => skill.toLowerCase().includes(query));
            return byName || byService || bySkill;
          }).length > 0 ? (
            providers.filter(provider => {
              const query = searchQuery.toLowerCase();
              const byName = provider.user?.name?.toLowerCase().includes(query);
              const byService = provider.serviceType?.toLowerCase().includes(query);
              const bySkill = provider.skills?.some(skill => skill.toLowerCase().includes(query));
              return byName || byService || bySkill;
            }).map((provider) => (
              <ProviderCard key={provider._id} provider={provider} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
               No providers found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ProviderCard = ({ provider }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center text-xl font-bold font-serif text-primary-700 dark:text-primary-300">
          {provider.user?.name?.charAt(0) || 'P'}
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-sm font-semibold bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{provider.rating}</span>
            <span className="text-gray-400 font-normal">({provider.numReviews})</span>
          </div>
          {provider.isVerified && (
             <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-600 dark:text-green-400">
               <ShieldCheck className="w-4 h-4" /> Verified
             </div>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{provider.user?.name || 'Unknown'}</h3>
      <p className="text-primary-600 dark:text-primary-400 font-medium text-sm mb-3">{provider.serviceType}</p>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
        {provider.bio || 'Experienced professional offering high quality services.'}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {provider.skills?.slice(0,3).map(skill => (
          <span key={skill} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{provider.basePrice}</span>
          <span className="text-gray-500 text-sm tracking-tight">/hr</span>
        </div>
        <Link to={`/trust-score/${provider._id}`} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-colors">
          View Profile
        </Link>
      </div>
    </div>
  </motion.div>
);

export default Providers;
