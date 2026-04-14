import { MessageSquareWarning, UploadCloud } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function DisputeCenter() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
         <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
           <MessageSquareWarning className="w-8 h-8 text-primary-600" /> Resolution Center
         </h1>
         <p className="text-gray-600 dark:text-gray-400">If something went wrong, we're here to help. Our team and AI review disputes within 24 hours.</p>
      </div>

      <Card className="p-8">
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Booking Reference ID</label>
              <Input placeholder="e.g. BK-1002" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Issue Category</label>
              <select className="w-full h-9 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm dark:border-gray-800 dark:bg-gray-950">
                <option>Select an issue...</option>
                <option>Overcharged / Pricing Issue</option>
                <option>Professional Unresponsive</option>
                <option>Poor Quality of Work</option>
                <option>Identity Mismatch</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              rows={5}
              className="w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-primary-600"
              placeholder="Please provide specific details about what happened. Note: This creates an official dispute record."
            ></textarea>
          </div>

          <div>
             <label className="block text-sm font-medium mb-2">Evidence (Photos/Invoices)</label>
             <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer">
               <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
               <p className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide">Click or drag images here to upload</p>
               <p className="text-xs text-gray-400 mt-2">Max limit: 5MB per file (JPG, PNG)</p>
             </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
             <Button variant="ghost">Cancel</Button>
             <Button type="submit">Submit Dispute</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
