import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';
import { Eye, TrendingUp, HandHelping } from 'lucide-react';

export default function ProviderInsights() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">Growth Insights</h1>
          <p className="text-gray-500 mt-1">AI-powered analytics and recommendations for your business.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:border-primary-500 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Profile Views (7d)</p>
            <h3 className="text-3xl font-bold mt-1">1,248</h3>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary-500 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">+4%</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Conversion Rate</p>
            <h3 className="text-3xl font-bold mt-1">8.4%</h3>
          </CardContent>
        </Card>

        <Card className="hover:border-primary-500 transition-colors bg-primary-600 text-white border-transparent">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <HandHelping className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-primary-100 text-sm font-medium">Trust Score Engine</p>
            <h3 className="text-3xl font-bold mt-1">Excellent</h3>
            <p className="text-sm mt-2 text-primary-100">You are ranking in the top 10%.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visibility Trend</CardTitle>
          </CardHeader>
          <CardContent>
             <LineChart data={[100, 120, 115, 140, 180, 170, 210]} width={400} height={150} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Upload recent work photos</h4>
              <p className="text-sm text-gray-500">Profiles with up-to-date portfolios convert 22% higher.</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Adjust weekend pricing</h4>
              <p className="text-sm text-gray-500">You're priced 15% below the market average for Saturday emergency calls.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
