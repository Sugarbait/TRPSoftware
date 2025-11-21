import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IssueLog: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
       {/* Breadcrumb */}
       <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="hover:text-primary cursor-pointer">TRP Software</span>
        <span>/</span>
        <span className="hover:text-primary cursor-pointer">Issues</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Log New Issue</span>
      </div>

      <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Log a New Maintenance Issue</h1>
          <p className="text-gray-500 dark:text-gray-400">Follow the steps below to quickly report a new issue for a property.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8">
         <div className="mb-8">
             <div className="flex justify-between items-center mb-2">
                 <span className="font-bold text-gray-900 dark:text-white">Step 1 of 3: Property & Issue</span>
             </div>
             <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-1/3"></div>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Which property has the issue?</h2>
                 
                 <div className="space-y-4">
                     <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Property Address</label>
                         <div className="relative">
                             <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">search</span>
                             <input type="text" placeholder="Search for a property..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                         </div>
                     </div>
                     <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit Number (Optional)</label>
                         <input type="text" placeholder="e.g., Apt 4B" className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary" />
                     </div>
                 </div>

                 <h2 className="text-xl font-bold text-gray-900 dark:text-white pt-4">What kind of issue is it?</h2>
                 <div className="grid grid-cols-2 gap-3">
                     {[
                         { icon: 'plumbing', label: 'Plumbing', active: true },
                         { icon: 'electrical_services', label: 'Electrical' },
                         { icon: 'hvac', label: 'HVAC' },
                         { icon: 'handyman', label: 'General' },
                         { icon: 'pest_control', label: 'Pests' },
                         { icon: 'more_horiz', label: 'Other' }
                     ].map((type) => (
                         <button 
                            key={type.label}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${type.active ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 text-gray-600 dark:text-gray-300'}`}
                         >
                             <span className="material-symbols-outlined text-3xl">{type.icon}</span>
                             <span className="text-sm font-semibold">{type.label}</span>
                         </button>
                     ))}
                 </div>
                 
                 <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                     <div className="grid grid-cols-3 gap-2">
                         <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">Low</button>
                         <button className="px-4 py-2.5 border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-bold">Medium</button>
                         <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">High</button>
                     </div>
                 </div>
             </div>

             <div className="space-y-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Provide more details</h2>
                 <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                     <textarea rows={5} placeholder="Describe the issue..." className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"></textarea>
                 </div>

                 <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photos & Videos</label>
                     <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                         <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                         <p className="text-sm text-gray-500"><span className="font-bold text-primary">Click to upload</span> or drag and drop</p>
                     </div>
                 </div>

                 <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Voice Note</label>
                     <div className="flex items-center gap-4 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                         <button className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm">
                             <span className="material-symbols-outlined">mic</span>
                         </button>
                         <div>
                             <p className="text-sm font-bold text-gray-900 dark:text-white">Record a voice note</p>
                             <p className="text-xs text-gray-500">00:00</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
             <button onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
             <button onClick={() => navigate('/issue/I-1024')} className="px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-primary/90">Continue to Details</button>
         </div>
      </div>
    </div>
  );
};

export default IssueLog;