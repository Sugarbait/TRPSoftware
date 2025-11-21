import React from 'react';
import { useParams } from 'react-router-dom';

const UnitDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="hover:text-primary cursor-pointer">All Properties</span>
        <span>/</span>
        <span className="hover:text-primary cursor-pointer">The Grand Venetian</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Unit {id}</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Unit {id} - The Grand Venetian</h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Occupied</span>
            </div>
            <p className="text-gray-500">123 Canal St, Austin, TX 78701</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                View Lease
            </button>
            <button className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors">
                Save Changes
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Physical Specs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Physical Specifications</h2>
                        <p className="text-sm text-gray-500">Details about the unit's physical characteristics.</p>
                    </div>
                    <button className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20">Edit All</button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                        { label: 'Unit Number', value: id },
                        { label: 'Floor Level', value: '4' },
                        { label: 'Square Footage', value: '1,250 sqft' },
                        { label: 'Bed / Bath Count', value: '2 Bed / 2 Bath' },
                        { label: 'Layout Type', value: 'Corner Unit' },
                        { label: 'Special Features', value: 'Balcony, In-unit Laundry' }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 pb-2 border-b border-gray-100 dark:border-gray-700/50">
                            <label className="text-xs text-gray-500 font-medium">{item.label}</label>
                            <input type="text" defaultValue={item.value} className="bg-transparent border-none p-0 text-gray-900 dark:text-white font-medium focus:ring-0" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Systems Inventory */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Systems & Equipment Inventory</h2>
                </div>
                <div>
                     <details className="group border-b border-gray-200 dark:border-gray-700" open>
                        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30">
                            <span className="font-bold text-gray-800 dark:text-gray-200">HVAC</span>
                            <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">expand_more</span>
                        </summary>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 grid grid-cols-2 md:grid-cols-4 gap-4">
                             <div><p className="text-xs text-gray-500">Make</p><p className="font-medium dark:text-gray-200">Trane</p></div>
                             <div><p className="text-xs text-gray-500">Model</p><p className="font-medium dark:text-gray-200">XL18i</p></div>
                             <div><p className="text-xs text-gray-500">Install Date</p><p className="font-medium dark:text-gray-200">05/15/2021</p></div>
                             <div><p className="text-xs text-gray-500">Last Service</p><p className="font-medium dark:text-gray-200">04/20/2024</p></div>
                        </div>
                     </details>
                     <details className="group border-b border-gray-200 dark:border-gray-700">
                        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30">
                            <span className="font-bold text-gray-800 dark:text-gray-200">Appliances</span>
                            <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">expand_more</span>
                        </summary>
                     </details>
                </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
             {/* Occupancy Info */}
             <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-6">
                 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Occupancy Information</h2>
                 
                 <div className="flex items-center gap-4 mb-6">
                     <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWlQjPzGUWh6ffkhKQ4_FKvyBGVs6V3PYiWMnnb9eVEtWZwoZ6IJ-GW6JG1i6ZLVDHtvGUrsyOM5AUhjJjX4fzKoW8sXeFd8ABortg1AoGPkKHQSvPPKEzakgvLOYQFzkZG4766GfkltCR1WVcpb3TBchr87otHaeWoSKdtQBy_h7i6ukUF6tn6kpuD42J-dP0_Y3dFD5DaAT3dwwB-dmjantliag-gsa73VGm69x-R6uyKt6p9SDs-LdU3IMZBBBW4F5FxMueyIX2" className="size-16 rounded-full object-cover" alt="Tenant" />
                     <div>
                         <p className="font-bold text-gray-900 dark:text-white text-lg">Alex Rodriguez</p>
                         <p className="text-sm text-gray-500">alex.r@email.com</p>
                     </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                     <div>
                         <p className="text-gray-500">Lease Start</p>
                         <p className="font-medium dark:text-white">06/01/2023</p>
                     </div>
                     <div>
                         <p className="text-gray-500">Lease End</p>
                         <p className="font-medium dark:text-white">05/31/2025</p>
                     </div>
                     <div>
                         <p className="text-gray-500">Monthly Rent</p>
                         <p className="font-medium dark:text-white">$2,400.00</p>
                     </div>
                     <div>
                         <p className="text-gray-500">Deposit</p>
                         <p className="font-medium dark:text-white">$2,400.00</p>
                     </div>
                 </div>
                 
                 <div className="space-y-2">
                     <button className="flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                         <span className="material-symbols-outlined text-base">description</span> Lease Document
                     </button>
                     <button className="flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                         <span className="material-symbols-outlined text-base">checklist</span> Move-in Checklist
                     </button>
                 </div>
             </div>

             {/* Photos */}
             <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Photos</h2>
                    <span className="text-xs font-bold text-primary cursor-pointer">View All</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                     {[
                         "https://lh3.googleusercontent.com/aida-public/AB6AXuAdyVvp9zq6aeueb5oIVexLzmedDE7ucGBroDomW9mrPn9iFTrO18l5j6l9MH5uljmi_Wpnd-k6ZVh8F8BCQ8b-dbiWuCn83_9Q8A0UA2gJavC3cnGWTbHRnnk_LQCY4pISmLmkihXM9IJB5SaWz953t5lqP8rHbkweFrORPpnGEgZjcewG6r1t3p8WQ2hpRUtJKY7G9K-SgDxQZMBGjeZuGzmg7RYAfZbQVFq8lM4Fq0OfW_JyLPL_ClUTDNejRefqmpLbcnk8xpr1",
                         "https://lh3.googleusercontent.com/aida-public/AB6AXuD-meSdFHklmjxzUHjy3WP67f__lX_52BIyMeWbOxxioYlD9PUC9m1pkcZ2AtwpSnkYa1RQ5EsidtTQ8qcgPntHF5qQEipl-KKa4dtMPXpjKIA4bPFMUvSVj3vv-lV2TYDVKRi7qyvJ810YQvxsdHEOBgIPX0Q2nJy-oT8xP-ph0UhGQzxExZEOctfMlqJiNf_uw4ZEGSWuJ5YYYb2JW4VA4zkcGuPdapIXKrEt0TCgMpgNb9qLYm6r2QRwNNweuIHw55DmrwZYEUDW",
                         "https://lh3.googleusercontent.com/aida-public/AB6AXuDiUU2T_iq0657059I88uJnf4FHDeCXO3NtcZt5fcnl5UhExHSFvYPcDKN6HRaYpZCWW7RNIs8_jZ3YxCXhu-3o6X7kKxr1e95IwPNtK3a6KOSl4pZSmTDNBkhYGqtBUy7ondYoFrW2BFM_Kxc2ULca-0iVLGHKwWZKNAHIaZoR6Rbytx39w9myJkkELsSi2giW9rJOj_QsdIUC90zsqhx6UJBFE3VKHJjg1zBZbxTlUe8d0NDoKStJMhXZxd169zBevYNuay6fyP6R"
                     ].map((src, i) => (
                         <img key={i} src={src} className="aspect-square object-cover rounded-lg hover:opacity-80 cursor-pointer" alt="Unit" />
                     ))}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetails;