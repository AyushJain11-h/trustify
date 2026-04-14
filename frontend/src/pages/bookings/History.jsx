import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Download, RefreshCw, Star } from 'lucide-react';

export default function BookingHistory() {
  const history = [
    { id: 'BK-1001', service: 'AC Repair', provider: 'Rahul A/C Services', date: 'Oct 12, 2026', status: 'Completed', amount: '₹1200' },
    { id: 'BK-1002', service: 'Plumbing', provider: 'Sanjay Plumbing', date: 'Sep 28, 2026', status: 'Completed', amount: '₹450' },
    { id: 'BK-1003', service: 'Electrical', provider: 'QuickFix Electrics', date: 'Sep 15, 2026', status: 'Cancelled', amount: '₹0' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Booking History</h1>
      
      <div className="space-y-4">
        {history.map((item) => (
          <Card key={item.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="hidden sm:flex bg-gray-100 dark:bg-gray-800 rounded-full h-14 w-14 items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <div className="flex gap-3 items-center mb-1">
                  <h3 className="font-bold text-lg">{item.service}</h3>
                  <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>{item.status}</Badge>
                </div>
                <p className="text-gray-500 text-sm">{item.provider} &bull; {item.date}</p>
                <div className="text-sm font-medium mt-1 text-gray-900 dark:text-gray-100">Total: {item.amount}</div>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-wrap gap-2 justify-start md:justify-end">
              {item.status === 'Completed' && (
                <>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" /> Invoice
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Star className="w-4 h-4 text-yellow-500" /> Rate
                  </Button>
                </>
              )}
              <Button size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" /> Rebook
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
