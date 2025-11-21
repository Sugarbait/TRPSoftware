import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 800);
  };

  const fillDemo = () => {
      setEmail('alex.miller@trpsoftware.com');
      setPassword('password123');
  };

  return (
    <div className="min-h-screen w-full flex bg-background-light dark:bg-background-dark">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          <div className="relative z-10 p-12 text-white max-w-lg">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl">
                    <span className="material-symbols-outlined text-4xl">real_estate_agent</span>
                 </div>
                 <h1 className="text-4xl font-black tracking-tight">TRP Software</h1>
              </div>
              <h2 className="text-3xl font-bold mb-4">Manage your portfolio with confidence.</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                  Streamline operations, track financials, and keep tenants happy with our all-in-one property management solution.
              </p>
              
              <div className="mt-12 grid grid-cols-2 gap-6">
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                      <span className="material-symbols-outlined text-3xl mb-2">apartment</span>
                      <p className="font-bold">Property Tracking</p>
                  </div>
                   <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                      <span className="material-symbols-outlined text-3xl mb-2">analytics</span>
                      <p className="font-bold">Financial Analytics</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
              <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome back</h2>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">Please sign in to your account</p>
              </div>

              {/* Demo Credentials Box */}
              <div 
                onClick={fillDemo}
                className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                  <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                      <div>
                          <p className="text-sm font-bold text-primary mb-1">Demo Credentials</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">Email: <span className="font-mono font-medium">alex.miller@trpsoftware.com</span></p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">Password: <span className="font-mono font-medium">password123</span></p>
                          <p className="text-xs text-primary mt-2 font-bold group-hover:underline">Click to autofill</p>
                      </div>
                  </div>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                  <div className="space-y-5">
                      <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                          <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required 
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 transition-colors" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      <div>
                          <div className="flex items-center justify-between mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <a href="#" className="text-sm font-medium text-primary hover:text-primary-light">Forgot password?</a>
                          </div>
                          <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            required 
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-800 transition-colors" 
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? (
                        <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        "Sign in"
                    )}
                  </button>
              </form>
              
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <a href="#" className="font-bold text-primary hover:text-primary-light">Start a 14-day free trial</a>
              </p>
          </div>
      </div>
    </div>
  );
};

export default Login;