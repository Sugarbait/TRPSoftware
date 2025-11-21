import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-1">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back, Alex. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
             <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Download Report
             </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Issues</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">12</h3>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-sm mr-0.5">arrow_upward</span> 5%
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Today's Tasks</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">5</h3>
            <span className="flex items-center text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-sm mr-0.5">arrow_downward</span> 2%
            </span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Rent Collected</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">85%</h3>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-sm mr-0.5">arrow_upward</span> 12%
            </span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Occupancy Rate</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">96%</h3>
            <span className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
              0%
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Priority Feed */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Smart Priority Feed</h2>
             <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-md">All</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">High Priority</button>
             </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/issue/I-1024')}>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="size-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">build</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">Overdue: Fix Leaky Faucet</h3>
                        <p className="text-sm text-gray-500">Maple Apartments, Unit 2B (Jane Doe)</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-md">Overdue</span>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Assign</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Details</button>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">person_add</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">New Tenant Application</h3>
                        <p className="text-sm text-gray-500">Oakwood Plaza, Unit 12A</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">New</span>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Review</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Details</button>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="size-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">description</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">Lease Renewal Due Soon</h3>
                        <p className="text-sm text-gray-500">Pinecrest Villas, Unit 5 (John Smith)</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-md">Urgent</span>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Send</button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">Details</button>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate('/log-issue')}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary text-white rounded-lg font-semibold shadow-sm hover:bg-primary/90 transition-colors"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        Log Maintenance Request
                    </button>
                    <button
                        onClick={() => navigate('/contacts')}
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        <span className="material-symbols-outlined">person_add</span>
                        Add New Tenant
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <span className="material-symbols-outlined">payments</span>
                        Record Payment
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <span className="material-symbols-outlined">campaign</span>
                        Send Announcement
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;