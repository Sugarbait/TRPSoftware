import React, { useState, useRef } from 'react';

const BuildingProfile: React.FC = () => {
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full">
      {/* Hero Image Section */}
      <div className="h-64 md:h-80 w-full bg-cover bg-center relative" style={{backgroundImage: `url("${heroImage}")`}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute top-4 right-4 z-20">
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-lg text-sm font-bold transition-all shadow-lg"
            >
                <span className="material-symbols-outlined text-lg">add_a_photo</span>
                Change Cover
            </button>
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
        </div>

        <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-1 text-white drop-shadow-md">123 Main Street Plaza</h1>
                <p className="text-lg opacity-90 font-medium text-gray-100 drop-shadow-sm">Sunnyvale, CA 94086</p>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/50 text-white rounded-lg font-bold text-sm transition-colors">Share</button>
                <button className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors shadow-lg">Add Report</button>
            </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
                 {/* General Info */}
                 <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                     <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                         <h2 className="text-lg font-bold text-gray-900 dark:text-white">General Information</h2>
                         <button className="flex items-center gap-1 text-primary text-sm font-bold hover:bg-primary/10 px-4 py-2 rounded-lg">
                             <span className="material-symbols-outlined text-sm">edit</span> Edit All
                         </button>
                     </div>
                     <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                         {[
                             { label: 'Building Name', value: '123 Main Street Plaza' },
                             { label: 'Property Type', value: 'Commercial Office' },
                             { label: 'Year Built', value: '1985' },
                             { label: 'Square Footage', value: '15,000 sqft' },
                             { label: 'Zoning', value: 'C-2' },
                             { label: 'Parking', value: '50 spaces (underground)' }
                         ].map((item, i) => (
                             <div key={i} className="border-t border-gray-100 dark:border-gray-700 pt-2">
                                 <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                                 <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                             </div>
                         ))}
                     </div>
                 </section>

                 {/* Docs */}
                 <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                     <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                         <h2 className="text-lg font-bold text-gray-900 dark:text-white">Document Library</h2>
                         <button className="flex items-center gap-1 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/90">
                             <span className="material-symbols-outlined text-sm">upload_file</span> Upload
                         </button>
                     </div>
                     <div className="p-4 space-y-3">
                         {['Purchase_Agreement_Final.pdf', 'HVAC_Warranty.pdf', 'Main_Floor_Plan.dwg'].map((file, i) => (
                             <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group cursor-pointer">
                                 <div className="flex items-center gap-3">
                                     <span className="material-symbols-outlined text-primary text-3xl">description</span>
                                     <div>
                                         <p className="font-medium text-gray-900 dark:text-white">{file}</p>
                                         <p className="text-xs text-gray-500">Updated 2 days ago</p>
                                     </div>
                                 </div>
                                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"><span className="material-symbols-outlined text-lg">download</span></button>
                                     <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"><span className="material-symbols-outlined text-lg">visibility</span></button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </section>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-8">
                <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">Utilities & Services</h2>
                    <div className="space-y-4">
                         <div><p className="text-xs text-gray-500">Electricity</p><p className="font-medium dark:text-white">PG&E - #123456789</p></div>
                         <div><p className="text-xs text-gray-500">Water</p><p className="font-medium dark:text-white">City of Sunnyvale</p></div>
                         <div><p className="text-xs text-gray-500">Internet</p><p className="font-medium dark:text-white">Comcast Business</p></div>
                    </div>
                </section>
                
                <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">Financial History</h2>
                    <div className="space-y-4">
                         <div><p className="text-xs text-gray-500">Purchase Price</p><p className="font-medium dark:text-white">$2,500,000 (2018)</p></div>
                         <div><p className="text-xs text-gray-500">Last Appraisal</p><p className="font-medium dark:text-white">$3,100,000 (2023)</p></div>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingProfile;