import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    const id = import.meta.env.VITE_WORKOS_CLIENT_ID;
    setClientId(id);
  }, []);

  const handleSignIn = () => {
    if (clientId) {
      // Redirect to WorkOS's hosted sign-in page
      const redirectUri = encodeURIComponent(window.location.origin + '/#/');
      window.location.href = `https://api.workos.com/user_sessions/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    }
  };

  const handleOAuthDemo = () => {
    // For demo purposes, skip OAuth and go directly to the app
    window.location.href = window.location.origin + '/#/';
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background-light dark:bg-background-dark">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
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

      {/* Right Side - WorkOS SignIn */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen lg:min-h-auto">
          <div className="w-full max-w-md space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome back</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Sign in to your account</p>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />

                <button
                  onClick={handleSignIn}
                  className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background-light dark:bg-background-dark text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleOAuthDemo}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Google</span>
                </button>
                <button
                  onClick={handleOAuthDemo}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Microsoft</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/sign-up')}
                  className="font-bold text-primary hover:text-primary-light"
                >
                  Sign up
                </button>
              </p>
          </div>
      </div>
    </div>
  );
};

export default Login;