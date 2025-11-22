import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEhJ7rG3iS3jD7iO7J6E6qN8kO9P0Q1R2S3T4U5V6W7X8Y9Z0a1b2c3d4e5f6g7h8i9j0k';
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('profileImageChanged', { detail: { image: result } }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleProfileImageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setProfileImage(customEvent.detail.image);
    };

    window.addEventListener('profileImageChanged', handleProfileImageChange);
    return () => window.removeEventListener('profileImageChanged', handleProfileImageChange);
  }, []);

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = async () => {
    // WorkOS handles logout through their API
    // Redirect to WorkOS logout endpoint
    window.location.href = 'https://api.workos.com/logout';
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: 'person' },
    { id: 'security', label: 'Security & MFA', icon: 'security' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
    { id: 'ai', label: 'AI & Automation', icon: 'auto_awesome' },
    { id: 'billing', label: 'Plan & Billing', icon: 'credit_card' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and workspace configurations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className={`material-symbols-outlined ${activeTab === tab.id ? 'fill' : ''}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative group cursor-pointer" onClick={handleChangePhoto}>
                      <div
                        className="size-32 rounded-full bg-cover bg-center ring-4 ring-gray-100 dark:ring-gray-700"
                        style={{backgroundImage: `url("${profileImage}")`}}
                      ></div>
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-white">edit</span>
                      </div>
                    </div>
                    <button className="text-sm font-bold text-primary hover:underline">Remove Photo</button>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                      <input type="text" defaultValue="Alex" className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                      <input type="text" defaultValue="Miller" className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input type="email" defaultValue="alex.miller@trpsoftware.com" className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                      <input type="text" defaultValue="Senior Property Manager" className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-red-600 font-bold hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    Sign Out
                  </button>
                  <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* Security & MFA Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              {/* MFA Configuration */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">vpn_key</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Multi-Factor Authentication (MFA)</h2>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Add an extra layer of security to your account. When enabled, you'll be required to provide a second form of verification when signing in.
                </p>

                <div className="space-y-4">
                  {/* TOTP Section */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg mt-0.5">
                          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">smartphone</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Authenticator App</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Use an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator to generate time-based codes.
                          </p>
                          <p className="text-xs text-gray-500">Status: <span className="text-gray-900 dark:text-gray-200 font-medium">Not Configured</span></p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
                        Set Up
                      </button>
                    </div>
                  </div>

                  {/* SMS Section */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg mt-0.5">
                          <span className="material-symbols-outlined text-green-600 dark:text-green-400">sms</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Text Message (SMS)</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Receive verification codes via SMS to your phone number.
                          </p>
                          <p className="text-xs text-gray-500">Status: <span className="text-gray-900 dark:text-gray-200 font-medium">Not Configured</span></p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
                        Set Up
                      </button>
                    </div>
                  </div>

                  {/* Backup Codes Section */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg mt-0.5">
                          <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">bookmark</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Backup Codes</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Save backup codes to access your account if you lose access to your MFA device. Keep them in a safe place.
                          </p>
                          <p className="text-xs text-gray-500">Status: <span className="text-gray-900 dark:text-gray-200 font-medium">Available after setting up TOTP or SMS</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Management */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Password Management</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Update your password regularly to maintain account security.
                    </p>
                    <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Session Management */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">devices</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Sessions</h2>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Manage your active sessions across different devices.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-400">desktop_mac</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Current Session</p>
                        <p className="text-sm text-gray-500">Last active: Just now</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
             <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
               
               <div className="space-y-6">
                 {[
                   { title: 'New Maintenance Issues', desc: 'Get notified when a tenant logs a new issue.', email: true, push: true },
                   { title: 'Urgency Score Updates', desc: 'Alerts when AI flags an issue as Critical.', email: false, push: true },
                   { title: 'Rent Payments', desc: 'Daily summary of collected rent.', email: true, push: false },
                   { title: 'Lease Expirations', desc: 'Reminders 90, 60, and 30 days before lease end.', email: true, push: true },
                   { title: 'System Announcements', desc: 'Feature updates and maintenance downtime.', email: false, push: false },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                     <div className="pr-8">
                       <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                       <p className="text-sm text-gray-500">{item.desc}</p>
                     </div>
                     <div className="flex items-center gap-4">
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" defaultChecked={item.email} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                         <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" defaultChecked={item.push} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                         <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Push</span>
                       </label>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="mt-8 flex justify-end">
                  <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">Save Preferences</button>
                </div>
             </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
               
               <div className="mb-8">
                 <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Interface Theme</h3>
                 <div className="grid grid-cols-3 gap-4">
                    <button 
                      onClick={() => darkMode && toggleDarkMode()}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col items-center gap-3 ${!darkMode ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                    >
                      <div className="w-full h-24 bg-[#f6f7f8] rounded-lg border border-gray-200 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-4 bg-white border-b border-gray-200"></div>
                         <div className="absolute top-4 left-0 w-6 h-full bg-white border-r border-gray-200"></div>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">Light Mode</span>
                    </button>
                    
                    <button 
                      onClick={() => !darkMode && toggleDarkMode()}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col items-center gap-3 ${darkMode ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                    >
                      <div className="w-full h-24 bg-[#13181f] rounded-lg border border-gray-700 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-4 bg-[#1F2937] border-b border-gray-700"></div>
                         <div className="absolute top-4 left-0 w-6 h-full bg-[#1F2937] border-r border-gray-700"></div>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">Dark Mode</span>
                    </button>

                    <button className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 text-left transition-all flex flex-col items-center gap-3 opacity-50 cursor-not-allowed">
                      <div className="w-full h-24 bg-gradient-to-br from-[#f6f7f8] to-[#13181f] rounded-lg border border-gray-200 relative"></div>
                      <span className="font-bold text-gray-900 dark:text-white">System Sync</span>
                    </button>
                 </div>
               </div>

               <div>
                 <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Regional Settings</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>UTC</option>
                      </select>
                   </div>
                 </div>
               </div>
            </div>
          )}

          {/* AI & Automation Settings */}
          {activeTab === 'ai' && (
             <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
               <div className="flex items-center gap-2 mb-6">
                 <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI & Automation Configuration</h2>
               </div>

               <div className="space-y-8">
                 <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className="font-bold text-gray-900 dark:text-white">Co-pilot Features</h3>
                     <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">Beta</span>
                   </div>
                   <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                     Configure how the AI assistant helps you manage properties and communicate with tenants.
                   </p>
                   
                   <div className="space-y-4 bg-white dark:bg-gray-900/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Auto-Draft Responses</p>
                          <p className="text-xs text-gray-500">AI will pre-write replies for maintenance issues.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Smart Urgency Detection</p>
                          <p className="text-xs text-gray-500">Automatically upgrade priority based on tenant descriptions.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                   </div>
                 </div>

                 <div>
                   <h3 className="font-bold text-gray-900 dark:text-white mb-4">Urgency Scoring Threshold</h3>
                   <div className="space-y-4">
                      <p className="text-sm text-gray-500">Adjust how sensitive the AI is when flagging issues as "Critical".</p>
                      <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" min="0" max="100" defaultValue="75" />
                      <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Conservative (Fewer alerts)</span>
                        <span>Balanced</span>
                        <span>Sensitive (More alerts)</span>
                      </div>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fade-in">
               <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Plan</h2>
                      <p className="text-gray-500 dark:text-gray-400">You are currently on the <span className="font-bold text-primary">Professional Plan</span>.</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">Active</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Billing Cycle</p>
                      <p className="font-bold text-gray-900 dark:text-white">$29.00 / month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Next Payment</p>
                      <p className="font-bold text-gray-900 dark:text-white">Nov 1, 2023</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Change Plan</button>
                    <button className="px-4 py-2 text-red-600 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">Cancel Subscription</button>
                  </div>
               </div>

               <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
                    <button className="text-sm font-bold text-primary hover:underline">+ Add New</button>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                       <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">credit_card</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/24</p>
                    </div>
                    <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">Default</span>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default Settings;