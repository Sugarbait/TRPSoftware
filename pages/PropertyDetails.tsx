import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data based on ID - simplified for demo
  const property = {
    name: 'The Grandview Apartments',
    address: '123 Main Street, Anytown, USA 12345',
    units: 84,
    occupancy: 95,
    avgRent: 2150,
    openIssues: 3,
    occupancyData: [
        { name: 'Occupied', value: 80 },
        { name: 'Vacant', value: 4 },
    ]
  };

  const COLORS = ['#10B981', '#E5E7EB'];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full">
        {/* Header Image */}
        <div className="h-64 md:h-80 w-full bg-cover bg-center relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDepV4YNT1rAg2jasg6yoMoDU9W5HBE9nNLUFtNLdGGMTSQd7XQ8fiqorRCEXov0J5xpZZhZWkal_Cfrhzr1jSLI_15gAAxM0nuG3OxFX0AIZxHRogy1ZPV6Bh8TaqXInfS2dEk4mIG4bf_71X17d_YSlEFe6UrISH4t6dNluTvW5iZZSqkQ23Qw4CgcyDguNWzwQien3pmA8loipZ6vqy8MoitlcJk-u86ozWVzEQDVqmnZSaof82rybSK6IP4RzVGHZUgRqY_DLu-")'}}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full flex flex-col md:flex-row justify-between items-end gap-4">
                <div className="text-white">
                    <h1 className="text-4xl font-black tracking-tight mb-2">{property.name}</h1>
                    <p className="text-lg opacity-90">{property.address}</p>
                </div>
                <button 
                    onClick={() => navigate('/building/123')} 
                    className="px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/50 text-white rounded-lg font-bold text-sm transition-colors"
                >
                    Edit Property Details
                </button>
            </div>
        </div>

        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Units', value: property.units },
                    { label: 'Occupancy', value: `${property.occupancy}%` },
                    { label: 'Average Rent', value: `$${property.avgRent.toLocaleString()}` },
                    { label: 'Open Issues', value: property.openIssues }
                ].map((stat, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex gap-8">
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        Management Dashboard
                    </button>
                    <button 
                        onClick={() => setActiveTab('units')}
                        className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'units' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        Units
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Occupancy Chart */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Occupancy</h3>
                        <div className="h-48 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={property.occupancyData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {property.occupancyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">95%</span>
                                <span className="text-xs text-gray-500">Occupied</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-6 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="size-3 rounded-full bg-green-500"></span>
                                <span className="text-gray-600 dark:text-gray-300">Occupied: 80</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="size-3 rounded-full bg-gray-200"></span>
                                <span className="text-gray-600 dark:text-gray-300">Vacant: 4</span>
                            </div>
                        </div>
                    </div>

                    {/* Financials */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Financial Summary</h3>
                        <div className="space-y-6 flex-1">
                            <div className="flex justify-between items-baseline border-b border-gray-100 dark:border-gray-700 pb-4">
                                <span className="text-gray-500 dark:text-gray-400">Gross Potential</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">$180,600</span>
                            </div>
                            <div className="flex justify-between items-baseline border-b border-gray-100 dark:border-gray-700 pb-4">
                                <span className="text-gray-500 dark:text-gray-400">Actual Billed</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">$172,000</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-gray-500 dark:text-gray-400">Delinquency</span>
                                <span className="text-xl font-bold text-orange-500">$3,450</span>
                            </div>
                        </div>
                        <button className="text-primary text-sm font-bold mt-6 text-left hover:underline">View Full Report →</button>
                    </div>

                    {/* Active Issues */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Active Issues</h3>
                        <div className="space-y-2 flex-1">
                             {[
                                 { icon: 'error', color: 'text-orange-500', title: 'Unit 305: Leaky Faucet', meta: 'Reported 2 days ago' },
                                 { icon: 'local_fire_department', color: 'text-red-500', title: 'Common Area: Smoke Detector', meta: 'Urgent - Reported 1 hr ago' },
                                 { icon: 'ac_unit', color: 'text-orange-500', title: 'Unit 112: A/C Not Cooling', meta: 'Reported 5 days ago' },
                             ].map((issue, i) => (
                                 <div key={i} className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors">
                                     <span className={`material-symbols-outlined ${issue.color}`}>{issue.icon}</span>
                                     <div>
                                         <p className="font-medium text-sm text-gray-900 dark:text-white">{issue.title}</p>
                                         <p className="text-xs text-gray-500">{issue.meta}</p>
                                     </div>
                                 </div>
                             ))}
                        </div>
                        <button className="text-primary text-sm font-bold mt-6 text-left hover:underline">View All Issues →</button>
                    </div>
                </div>
            )}

            {activeTab === 'units' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold mb-4">Unit List</h3>
                    <div className="space-y-2">
                        <div 
                            onClick={() => navigate('/units/402')}
                            className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                                    <span className="material-symbols-outlined">home</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Unit 402</p>
                                    <p className="text-sm text-gray-500">2 Bed / 2 Bath • 1,250 sqft</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded mb-1">Occupied</span>
                                <p className="text-sm font-medium">$2,400/mo</p>
                            </div>
                        </div>
                         {/* Mock other units */}
                         <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500">
                                    <span className="material-symbols-outlined">home</span>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Unit 105</p>
                                    <p className="text-sm text-gray-500">1 Bed / 1 Bath • 850 sqft</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded mb-1">Vacant</span>
                                <p className="text-sm font-medium">$1,800/mo</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default PropertyDetails;