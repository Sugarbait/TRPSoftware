import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types';

const Properties: React.FC = () => {
  const navigate = useNavigate();

  const properties: Property[] = [
    {
      id: 'grandview',
      name: 'The Grandview Apartments',
      address: '123 Main Street, Anytown, USA',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2KbeAtEJ1SKQ7Tjaz7NirvR0CpWN5hIj0F7IYj_1dWCEXnbnal_qN96oSLyHc_0BF3NfODYj1JrhyZmGA7yX-CTBD0SwBcEqLx69fXiqiueypVUQho8Fj7dTTTM9n5CLT51dR0D0uqn65FEZstpL6RvF4uvoS7qSCLOHugDyXoXcvz44ZVRTblOHuivRNklO2iJ-g-F_PA0w7Vq2aRheVAn19rj7db9SHLHTOhVz2JN7csk46M8-jWcj7iitZRi0UouwPq8MH7SgE',
      occupancy: 100,
      revenue: 125000,
      activeIssues: 0,
      totalUnits: 50,
      occupiedUnits: 50,
      status: 'Fully Occupied'
    },
    {
      id: 'oakwood',
      name: 'Oakwood Plaza',
      address: '456 Oak Ave, Anytown, USA',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZN4j0W-b13sl1CwU-iseoTOiYU8SUa-MoiJ8_ApzkZmxlmoYT3tV0mYOZE-a827_PIH08piZG0mEDmG_xuVss5dR9WjjhelYvPg67AwoUxajULkfqyjQIkG6hdH-5Jr_qK4NMyaiNV65spGuSz3YcjTzMYwnKxc2SBIVfJAoJaYtBToT6wqjumuThytzh8ppyPyPVWA03vCdus0zONMmuw_vWnCLbkm43mIyFYiQHIWecsa4FSxQxYINs0WLghNOsaY-Q7TC3QW6t',
      occupancy: 96,
      revenue: 210500,
      activeIssues: 3,
      totalUnits: 75,
      occupiedUnits: 72,
      status: 'Urgent Issues'
    },
    {
      id: 'pinecrest',
      name: 'Pinecrest Residences',
      address: '789 Pine Ln, Anytown, USA',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7ol143qhyk94UBSSd5dkl-SrkfDPouUJ1VaQSMYBQdwILYAPxVJBNFvZYzFWgqUOQhlo2QhF8Dke1AQYw1Cdrw53HQ5gz1pxB3SHVJwCVQLCMcQ7FMAFNKNAzXO9jWQCluqlymGTfHHYkbCeLqsxMiKht1Qb_csc4AOJPdy83CsDxYx5WkNL5bWMiQAQuUPJgoLu37QSkj8wD0IxuIAydpxNNKNvd0gA4zfgrIUsLILX-AHhLfK9yym1CZNZRE9QF_9mMzEXSEBgN',
      occupancy: 82,
      revenue: 78300,
      activeIssues: 1,
      totalUnits: 35,
      occupiedUnits: 29,
      status: 'High Vacancy'
    },
    {
      id: 'main-street-plaza',
      name: '123 Main Street Plaza',
      address: 'Sunnyvale, CA 94086',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      occupancy: 90,
      revenue: 95000,
      activeIssues: 0,
      totalUnits: 20,
      occupiedUnits: 18,
      status: 'Stable'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'Fully Occupied': return 'bg-green-500';
        case 'Urgent Issues': return 'bg-red-500';
        case 'High Vacancy': return 'bg-amber-500';
        default: return 'bg-blue-500';
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Properties</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-colors">
            <span className="material-symbols-outlined">add</span>
            Add New Property
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6 py-2 border-y border-gray-200 dark:border-gray-800">
         <div className="flex gap-2">
            {['Sort by Name', 'Sort by Value', 'Sort by Occupancy'].map(label => (
                <button key={label} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                    <span className="material-symbols-outlined text-lg">arrow_drop_down</span>
                </button>
            ))}
         </div>
         <div className="ml-auto flex gap-2">
            <button className="p-2 bg-primary text-white rounded-md">
                <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                <span className="material-symbols-outlined">list</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold">
                <span className="material-symbols-outlined fill text-lg">filter_list</span>
                Filter
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
            <div 
                key={property.id}
                onClick={() => {
                    if (property.id === 'main-street-plaza') {
                        navigate(`/building/${property.id}`);
                    } else {
                        navigate(`/properties/${property.id}`);
                    }
                }}
                className="group relative flex flex-col justify-between rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/5] cursor-pointer"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${property.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                
                <div className="relative p-4 flex justify-between items-start">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ${getStatusColor(property.status)}/90 shadow-sm`}>
                        {property.status}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity size-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">
                        <span className="material-symbols-outlined text-xl">more_vert</span>
                    </button>
                </div>

                <div className="relative p-5 text-white">
                    <h3 className="text-xl font-bold leading-tight mb-1 drop-shadow-md">{property.name}</h3>
                    <p className="text-sm text-gray-200 mb-4 drop-shadow-sm">{property.address}</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                        <div>
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold drop-shadow-sm">Occupancy</p>
                            <p className={`text-lg font-bold drop-shadow-sm ${property.occupancy < 90 ? 'text-amber-400' : 'text-white'}`}>{property.occupancy}%</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold drop-shadow-sm">Monthly Revenue</p>
                            <p className="text-lg font-bold drop-shadow-sm text-white">${property.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold drop-shadow-sm">Active Issues</p>
                            <p className={`text-lg font-bold drop-shadow-sm ${property.activeIssues > 0 ? 'text-red-400' : 'text-white'}`}>{property.activeIssues}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold drop-shadow-sm">Units</p>
                            <p className="text-lg font-bold text-white drop-shadow-sm">{property.occupiedUnits}/{property.totalUnits}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;