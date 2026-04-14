import { BarChart3, TrendingUp, Users, AlertOctagon } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { LineChart } from '../../components/charts/LineChart';

export default function AnalyticsDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
        <p className="text-gray-500">High-level insights into marketplace liquidity, revenue, and security.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-center mb-4 text-gray-500 text-sm font-medium">Total Bookings <BarChart3 className="w-4 h-4" /></div>
             <div className="text-3xl font-bold">14,239</div>
             <div className="text-xs text-green-500 font-bold mt-2">+12% from last month</div>
           </CardContent>
        </Card>
        <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-center mb-4 text-gray-500 text-sm font-medium">Platform Revenue <TrendingUp className="w-4 h-4" /></div>
             <div className="text-3xl font-bold">₹1.8M</div>
             <div className="text-xs text-green-500 font-bold mt-2">+8% from last month</div>
           </CardContent>
        </Card>
        <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-center mb-4 text-gray-500 text-sm font-medium">Active Providers <Users className="w-4 h-4" /></div>
             <div className="text-3xl font-bold">842</div>
             <div className="text-xs text-green-500 font-bold mt-2">+22 new this week</div>
           </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-900/50">
           <CardContent className="p-6">
             <div className="flex justify-between items-center mb-4 text-red-500 text-sm font-medium">Fraud Blocked <AlertOctagon className="w-4 h-4" /></div>
             <div className="text-3xl font-bold text-red-600 dark:text-red-500">128</div>
             <div className="text-xs text-gray-500 mt-2">Suspicious accounts suspended</div>
           </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-6">Booking Volume (30 days)</h3>
            <div className="h-48 w-full p-4 pl-0">
               <LineChart data={[40, 50, 45, 60, 80, 95, 110]} width={500} height={150} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-6">Top Service Categories</h3>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-sm mb-1"><span>Cleaning</span> <span className="font-bold">45%</span></div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full w-[45%]"></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-sm mb-1"><span>Plumbing</span> <span className="font-bold">25%</span></div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full w-[25%]"></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-sm mb-1"><span>Electrician</span> <span className="font-bold">20%</span></div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full w-[20%]"></div></div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
