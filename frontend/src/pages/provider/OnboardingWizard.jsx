import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ClipboardList, Package, Fingerprint, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const steps = [
  { id: 1, name: 'Basic Info', icon: ClipboardList },
  { id: 2, name: 'Skills & Price', icon: Package },
  { id: 3, name: 'Verification', icon: Fingerprint },
  { id: 4, name: 'Approval', icon: ShieldCheck }
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-center mb-8">Join Trustify as a Professional</h1>
        
        {/* Stepper Header */}
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10"></div>
          {steps.map((step) => {
             const active = step.id === currentStep;
             const past = step.id < currentStep;
             return (
               <div key={step.id} className="flex flex-col items-center gap-2 bg-white dark:bg-gray-900 px-2 relative z-10 transition-colors">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    past ? 'border-primary-500 bg-primary-500 text-white' : 
                    active ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400'
                  }`}>
                     {past ? <Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-semibold ${active ? 'text-primary-600' : 'text-gray-500'}`}>{step.name}</span>
               </div>
             )
          })}
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 min-h-[300px] flex flex-col justify-between"
      >
        <div>
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">1. Tell us about yourself</h2>
              <div className="grid md:grid-cols-2 gap-4">
                 <div><label className="text-sm font-medium">Business Name</label><input type="text" className="w-full mt-1 border input-field p-2 rounded-md" /></div>
                 <div><label className="text-sm font-medium">Years Active</label><input type="number" className="w-full mt-1 border input-field p-2 rounded-md" /></div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">2. Skills and Base Pricing</h2>
              <div><label className="text-sm font-medium">Primary Category</label><select className="w-full mt-1 border p-2 rounded-md"><option>Plumber</option><option>Electrician</option></select></div>
              <div><label className="text-sm font-medium">Base Hourly Rate (₹)</label><input type="number" defaultValue="400" className="w-full mt-1 border input-field p-2 rounded-md" /></div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">3. Identity Verification</h2>
              <p className="text-gray-500 text-sm mb-4">Trustify requires a valid government ID to ensure platform safety. This information is securely encrypted.</p>
              <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl text-center text-gray-500 cursor-pointer hover:bg-gray-50">
                 Upload Government ID (Aadhaar/PAN)
              </div>
            </div>
          )}
          {currentStep === 4 && (
            <div className="space-y-4 text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold">You're almost there!</h2>
              <p className="text-gray-500">Submit your profile for AI and Admin verification. You'll hear back within 2 hours.</p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
           <Button variant="ghost" onClick={prev} disabled={currentStep === 1}>Back</Button>
           {currentStep < steps.length ? (
             <Button onClick={next}>Continue</Button>
           ) : (
             <Button onClick={() => alert('Profile Submitted!')}>Submit Profile</Button>
           )}
        </div>
      </motion.div>
    </div>
  );
}
