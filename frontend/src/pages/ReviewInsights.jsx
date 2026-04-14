import { MessageSquare, ThumbsUp, ThumbsDown, BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function ReviewInsights() {
  const summary = {
    text: "Most customers praise Prakash for his punctuality and problem-solving skills, noting he quickly identifies electrical faults. However, a few customers mentioned his material costs are slightly higher than estimates.",
    positiveRatio: 85,
    commonGood: ['On time', 'Polite', 'Cleaned up', 'Expert'],
    commonBad: ['Pricy materials', 'Tardiness (rare)']
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600 mb-2 mt-4"><BrainCircuit className="w-8 h-8 text-primary-600" /> AI Review Intelligence</h1>
        <p className="text-gray-500">Semantic summarization of 142 reviews for Prakash E.</p>
      </div>

      <Card className="bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900 shadow-md">
         <CardContent className="p-8">
            <h3 className="text-xs uppercase font-bold tracking-widest text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4"/> AI Generated Summary</h3>
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">"{summary.text}"</p>
         </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
           <h3 className="font-semibold flex items-center gap-2 mb-6"><ThumbsUp className="w-5 h-5 text-green-500"/> Sentiments Analysis</h3>
           <div className="flex gap-4 items-center">
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-8 border-green-500 dark:border-green-500/50 shadow-inner">
                 <span className="text-xl font-bold text-green-600 dark:text-green-400">{summary.positiveRatio}%</span>
              </div>
              <div>
                 <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">Overwhelmingly Positive</p>
                 <p className="text-sm text-gray-500">Based on natural language processing of all text reviews.</p>
              </div>
           </div>
        </Card>

        <Card className="p-6">
           <h3 className="font-semibold mb-6">Extracted Keywords</h3>
           <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-3">Strengths</p>
              <div className="flex flex-wrap gap-2 mb-6">
                 {summary.commonGood.map(kw => <Badge key={kw} variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-transparent">{kw}</Badge>)}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-3">Concerns</p>
              <div className="flex flex-wrap gap-2">
                 {summary.commonBad.map(kw => <Badge key={kw} variant="outline" className="text-gray-600 border-gray-300 dark:border-gray-700">{kw}</Badge>)}
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
