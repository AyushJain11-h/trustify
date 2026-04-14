import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, User as UserIcon, Moon, Sun, Github, Mail, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Auth Form State
  const [authData, setAuthData] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Check dark mode
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Check logged in user
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, authData);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setIsSignModalOpen(false);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Providers', path: '/providers' },
    { name: 'Price Check AI', path: '/price-check' },
    { name: 'Compare', path: '/compare' },
    { name: 'Dashboard', path: '/provider/insights' },
    { name: 'Admin', path: '/admin/analytics' }
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <ShieldCheck className="h-8 w-8 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex flex-col">
                 <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-400 leading-none">
                   Trustify
                 </span>
                 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-0.5">Trust Engine AI</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === link.path ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={toggleDarkMode}
              className="p-2 mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
               <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                  <div className="font-semibold text-sm">{user.name.split(' ')[0]}</div>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500"><LogOut className="w-4 h-4" /></button>
               </div>
            ) : (
               <button 
                 onClick={() => setIsSignModalOpen(true)}
                 className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary-500/30"
               >
                 <UserIcon className="w-4 h-4" />
                 Sign In
               </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b border-gray-200 dark:border-gray-800">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
      <Modal isOpen={isSignModalOpen} onClose={() => setIsSignModalOpen(false)} title={authMode === 'login' ? "Sign into Trustify" : "Create Account"}>
        <div className="space-y-6 pt-2">
          {authError && <div className="p-3 bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-800">{authError}</div>}
          
          <Button type="button" variant="outline" className="w-full justify-center gap-3 h-12" onClick={() => alert('Mock Google Sign-In')}>
             <Github className="w-5 h-5" /> Continue with Google
          </Button>
          
          <div className="relative">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-gray-800" /></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with email</span></div>
          </div>
          
          <form className="space-y-4 pt-2" onSubmit={handleAuth}>
            {authMode === 'register' && (
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <Input required type="text" value={authData.name} onChange={e => setAuthData({...authData, name: e.target.value})} placeholder="John Doe" className="pl-9 h-11" />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <Input required type="email" value={authData.email} onChange={e => setAuthData({...authData, email: e.target.value})} placeholder="you@example.com" className="pl-9 h-11" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <Input required type="password" value={authData.password} onChange={e => setAuthData({...authData, password: e.target.value})} placeholder="••••••••" className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11" disabled={authLoading}>
              {authLoading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
             {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
             <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-primary-600 font-semibold hover:underline">
               {authMode === 'login' ? 'Sign Up' : 'Sign In'}
             </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
