import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Reports: React.FC = () => {
  const maintenanceData = [
      { name: 'Open', value: 8 },
      { name: 'In Progress', value: 5 },
      { name: 'Completed', value: 2 },
  ];
  const PIE_COLORS = ['#F59E0B', '#3B82F6', '#10B981'];

  const generatedReports = [
      { name: 'October 2023 - Monthly Owner Statement', type: 'PDF', size: '2.4 MB', date: 'Nov 1, 2023' },
      { name: 'Q3 2023 Financial Summary', type: 'PDF', size: '5.1 MB', date: 'Oct 15, 2023' },
      { name: 'Property Inspection Report - Oakwood Plaza', type: 'PDF', size: '18.2 MB', date: 'Oct 10, 2023' },
      { name: 'September 2023 - Rent Roll', type: 'CSV', size: '450 KB', date: 'Oct 1, 2023' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Reports Center</h1>
                <p className="text-gray-500 dark:text-gray-400">Operational metrics and generated documents.</p>
            </div>
            <div className="flex gap-2">
                <button className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">add</span> Generate New Report
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Maintenance Chart */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Maintenance Status</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Current work order distribution</p>
                <div className="h-48 relative flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={maintenanceData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {maintenanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-black text-gray-900 dark:text-white">15</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-4 text-xs">
                    {maintenanceData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-1">
                            <span className="size-2 rounded-full" style={{backgroundColor: PIE_COLORS[index]}}></span>
                            <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Downloadable Reports */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white">Recent Generated Reports</h3>
                    <button className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="space-y-3">
                        {generatedReports.map((report, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${report.type === 'PDF' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                                        <span className="material-symbols-outlined text-xl">description</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-gray-900 dark:text-white">{report.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{report.date} • {report.size}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full transition-colors" title="Download">
                                    <span className="material-symbols-outlined text-xl">download</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Lease Expirations Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                 <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white">Upcoming Lease Expirations</h3>
                    <button className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-3">Tenant</th>
                            <th className="px-6 py-3">Property</th>
                            <th className="px-6 py-3">Contract End</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Expires In</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Candice Wu</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Unit 210, Maple Creek</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Nov 30, 2023</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Pending Renewal</span></td>
                            <td className="px-6 py-4 text-orange-500 dark:text-orange-400 font-medium">15 Days</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">James Reid</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Unit 18, Pineview</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Dec 15, 2023</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Not Started</span></td>
                            <td className="px-6 py-4 text-orange-500 dark:text-orange-400 font-medium">28 Days</td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Demi Wilkinson</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Unit 401, Oakridge</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Jan 01, 2024</td>
                            <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Discussing</span></td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-medium">45 Days</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
    </div>
  );
};

export default Reports;