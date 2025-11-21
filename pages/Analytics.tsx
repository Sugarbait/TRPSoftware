import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics: React.FC = () => {
  const financialData = [
      { name: 'Jan', collected: 40000, billed: 42000, expense: 12000 },
      { name: 'Feb', collected: 38000, billed: 42000, expense: 15000 },
      { name: 'Mar', collected: 41000, billed: 42000, expense: 11000 },
      { name: 'Apr', collected: 39000, billed: 42000, expense: 13000 },
      { name: 'May', collected: 42000, billed: 42000, expense: 12500 },
      { name: 'Jun', collected: 42000, billed: 42000, expense: 14000 },
  ];

  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  const gridColor = isDark ? '#374151' : '#E5E7EB';
  const axisColor = isDark ? '#9CA3AF' : '#6B7280';

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Financial Performance</h1>
                <p className="text-gray-500 dark:text-gray-400">Revenue, expenses, and payment tracking.</p>
            </div>
            <div className="flex gap-2">
                <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm px-3 py-2 text-gray-700 dark:text-gray-200">
                    <option>Last 6 Months</option>
                    <option>Year to Date</option>
                    <option>Last Year</option>
                </select>
                <button className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">Export Report</button>
            </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Revenue (YTD)</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">$242,000</p>
                <p className="text-success dark:text-green-400 text-sm font-medium flex items-center gap-1 mt-2"><span className="material-symbols-outlined text-base">trending_up</span> +8.5% vs last year</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses (YTD)</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">$77,500</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-1 mt-2"><span className="material-symbols-outlined text-base">trending_flat</span> +1.2% vs last year</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Net Operating Income</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">$164,500</p>
                <p className="text-success dark:text-green-400 text-sm font-medium flex items-center gap-1 mt-2"><span className="material-symbols-outlined text-base">trending_up</span> +12.4% vs last year</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Revenue vs Billed</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Comparison of billed rent vs actual collected.</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={financialData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: axisColor, fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: axisColor, fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar dataKey="billed" name="Billed" fill="#DBEAFE" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="collected" name="Collected" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

             {/* Expenses Chart */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Expense Trend</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Monthly operating expenses.</p>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financialData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: axisColor, fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: axisColor, fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Line type="monotone" dataKey="expense" name="Expenses" stroke="#EF4444" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Overdue Payments Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white">Overdue Payments</h3>
                <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-3">Tenant</th>
                        <th className="px-6 py-3">Property</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Olivia Rhye</td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Unit 102, Maple Creek</td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">$1,250.00</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">5 Days Late</span></td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Phoenix Baker</td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Unit 305, Oakridge</td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">$875.50</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">12 Days Late</span></td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Lana Steiner</td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">Unit 12, Riverbend</td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">$2,100.00</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md">2 Days Late</span></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
  );
};

export default Analytics;