import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function FraudAlerts() {
  const alerts = [
    { id: 'ALT-991', type: 'Fake Reviews Detected', provider: 'Sanjay Plumbing', severity: 'High', date: 'Just now' },
    { id: 'ALT-992', type: 'Suspicious Pricing Surge', provider: 'QuickFix Electrics', severity: 'Medium', date: '2 hrs ago' },
    { id: 'ALT-993', type: 'Identity Mismatch (IP check)', provider: 'Rahul A/C', severity: 'Critical', date: '1 day ago' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldAlert className="text-red-500 w-8 h-8" /> Fraud Command Center
          </h1>
          <p className="text-gray-500 mt-2">AI monitoring 24/7 for suspicious marketplace activity.</p>
        </div>
        <Badge variant="destructive" className="px-4 py-2 text-sm">3 Open Critical Alerts</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-red-500 max-w-sm">
           <AlertTriangle className="text-red-500 w-10 h-10 mb-4" />
           <h3 className="text-2xl font-black mb-1">High Risk Pool</h3>
           <p className="text-gray-500 text-sm">12 Providers currently flagged automatically by our system.</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800 shadow-sm">
              <th className="p-4 font-semibold text-gray-500">Alert ID</th>
              <th className="p-4 font-semibold text-gray-500">Provider</th>
              <th className="p-4 font-semibold text-gray-500">Trigger Type</th>
              <th className="p-4 font-semibold text-gray-500">Severity</th>
              <th className="p-4 font-semibold text-gray-500">Time</th>
              <th className="p-4 font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {alerts.map(a => (
              <tr key={a.id} className="hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-colors">
                <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{a.id}</td>
                <td className="p-4">{a.provider}</td>
                <td className="p-4 font-medium">{a.type}</td>
                <td className="p-4">
                  <Badge variant={a.severity === 'Critical' ? 'destructive' : a.severity === 'High' ? 'default' : 'secondary'}>
                    {a.severity}
                  </Badge>
                </td>
                <td className="p-4 text-gray-500">{a.date}</td>
                <td className="p-4 text-right space-x-2">
                  <Button variant="outline" size="sm">Review</Button>
                  <Button variant="destructive" size="sm">Suspend</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
