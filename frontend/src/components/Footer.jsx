import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ShieldAlert } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
              <ShieldAlert className="h-8 w-8" />
              <span className="text-xl font-bold font-heading">Trustify</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your trusted AI-powered local services marketplace. Ensuring trust, safety, and price transparency.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Main Sections</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/providers" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Find Providers</Link></li>
              <li><Link to="/price-check" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Price Checker</Link></li>
              <li><Link to="/compare" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Compare Providers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/support/disputes" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Dispute Center</Link></li>
              <li><Link to="/emergency" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Emergency Support</Link></li>
              <li><Link to="/admin/fraud-alerts" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Fraud Alerts</Link></li>
              <li><Link to="/provider/onboarding" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Join as Provider</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider text-sm">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/AyushJain11-h" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/ayush-jain-9768ab3b2/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:ayushjain54320@gmail.com" className="text-gray-400 hover:text-[#EA4335] dark:hover:text-[#EA4335] transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drop us a line at: <br/>
              <a href="mailto:ayushjain54320@gmail.com" className="hover:text-primary-600 dark:hover:text-primary-400">ayushjain54320@gmail.com</a>
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Trustify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
