import { Check, X, Loader2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CompareProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/providers');
        // Let's get the top 3 rated providers for comparison
        const topProviders = res.data.sort((a, b) => b.trustScore - a.trustScore).slice(0, 3);
        setProviders(topProviders);
      } catch (error) {
        console.error('Error fetching providers', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-32 flex justify-center flex-col items-center">
         <Loader2 className="w-12 h-12 animate-spin text-primary-500 mb-4" />
         <span className="text-gray-500 font-medium">Analyzing marketplace providers...</span>
      </div>
    );
  }

  const [p1, p2, p3] = providers;

  if (!p1) return <div className="text-center py-20">Not enough providers available to compare.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Compare Providers</h1>
      
      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="p-6 text-gray-500 font-medium w-1/4">Feature</th>
              <th className="p-6 font-bold text-lg">{p1.user?.name || 'TBD'} <Badge variant="secondary" className="ml-2 text-xs bg-primary-100 text-primary-800 border-transparent dark:bg-primary-900/40 dark:text-primary-300 pointer-events-none">Best Match</Badge></th>
              <th className="p-6 font-bold text-lg">{p2?.user?.name || '---'}</th>
              <th className="p-6 font-bold text-lg">{p3?.user?.name || '---'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-900 dark:text-gray-100">
            <tr>
              <td className="p-6 text-gray-500 font-medium">Hourly Rate</td>
              <td className="p-6 font-semibold text-green-600 dark:text-green-500">₹{p1.basePrice}/hr</td>
              <td className="p-6 font-semibold">{p2 ? `₹${p2.basePrice}/hr` : '-'}</td>
              <td className="p-6 font-semibold">{p3 ? `₹${p3.basePrice}/hr` : '-'}</td>
            </tr>
            <tr>
              <td className="p-6 text-gray-500 font-medium">Trust Score</td>
              <td className="p-6">
                 <span className={`font-bold px-3 py-1 rounded-full ${p1.trustScore > 80 ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'}`}>
                    {p1.trustScore?.toFixed(0) || 0}
                 </span>
              </td>
              <td className="p-6">
                 {p2 && <span className={`font-bold px-3 py-1 rounded-full ${p2.trustScore > 80 ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'}`}>
                    {p2.trustScore?.toFixed(0) || 0}
                 </span>}
              </td>
              <td className="p-6">
                 {p3 && <span className={`font-bold px-3 py-1 rounded-full ${p3.trustScore > 80 ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'}`}>
                    {p3.trustScore?.toFixed(0) || 0}
                 </span>}
              </td>
            </tr>
            <tr>
              <td className="p-6 text-gray-500 font-medium">Identity Verified</td>
              <td className="p-6">{p1.isVerified ? <Check className="text-green-500 w-5 h-5" /> : <X className="text-red-500 w-5 h-5" />}</td>
              <td className="p-6">{p2 && (p2.isVerified ? <Check className="text-green-500 w-5 h-5" /> : <X className="text-red-500 w-5 h-5" />)}</td>
              <td className="p-6">{p3 && (p3.isVerified ? <Check className="text-green-500 w-5 h-5" /> : <X className="text-red-500 w-5 h-5" />)}</td>
            </tr>
            <tr>
              <td className="p-6 text-gray-500 font-medium">Customer Metric (Cancellation Rate)</td>
              <td className="p-6">{p1.cancellationRate ? p1.cancellationRate.toFixed(1) + '%' : '< 1%'}</td>
              <td className="p-6">{p2 && (p2.cancellationRate ? p2.cancellationRate.toFixed(1) + '%' : '< 1%')}</td>
              <td className="p-6">{p3 && (p3.cancellationRate ? p3.cancellationRate.toFixed(1) + '%' : '< 1%')}</td>
            </tr>
            <tr>
              <td className="p-6 text-gray-500 font-medium">Total Reviews</td>
              <td className="p-6 font-medium text-gray-900 dark:text-gray-100">{p1.numReviews} ratings</td>
              <td className="p-6 text-gray-600 dark:text-gray-400">{p2 ? `${p2.numReviews} ratings` : ''}</td>
              <td className="p-6 text-gray-600 dark:text-gray-400">{p3 ? `${p3.numReviews} ratings` : ''}</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/20">
              <td className="p-6"></td>
              <td className="p-6"><Button className="w-full shadow-lg shadow-primary-500/20" onClick={() => navigate(`/trust-score/${p1._id}`)}>View Profile</Button></td>
              <td className="p-6">{p2 && <Button variant="outline" className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" onClick={() => navigate(`/trust-score/${p2._id}`)}>View Profile</Button>}</td>
              <td className="p-6">{p3 && <Button variant="outline" className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" onClick={() => navigate(`/trust-score/${p3._id}`)}>View Profile</Button>}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
