import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(query);

  // Sync local state with URL param
  useEffect(() => {
    setLocalSearch(query);
  }, [query]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        setSearchParams(prev => {
            prev.set('q', localSearch);
            return prev;
        });
    }
  };

  const filterContent = (
    <div className="space-y-2">
        <details className="group" open>
            <summary className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer select-none">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className="material-symbols-outlined text-primary">apartment</span> Property
                </span>
                <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
            </summary>
            <div className="pl-9 pr-2 pb-2 space-y-2 mt-1">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked /> Status: Vacant
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /> Status: Occupied
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked /> Bedrooms: 2
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked /> City: Brooklyn
                </label>
            </div>
        </details>
        
        <details className="group">
            <summary className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer select-none">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className="material-symbols-outlined text-gray-500">build</span> Issue/Work Order
                </span>
                <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
            </summary>
        </details>

        <details className="group">
            <summary className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer select-none">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className="material-symbols-outlined text-gray-500">group</span> Contact
                </span>
                <span className="material-symbols-outlined text-gray-400 transition-transform group-open:rotate-180">expand_more</span>
            </summary>
        </details>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
            <button className="w-full py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90">Apply Filters</button>
            <button className="w-full py-2 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Clear All</button>
        </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col lg:flex-row">
        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
                <div className="absolute inset-y-0 right-0 w-full max-w-80 bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-lg text-gray-900 dark:text-white">Filters</h2>
                        <button onClick={() => setShowMobileFilters(false)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    {filterContent}
                </div>
            </div>
        )}

        {/* Desktop Filter Sidebar */}
        <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex-shrink-0 hidden lg:block overflow-y-auto h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 text-primary rounded-full">
                    <span className="material-symbols-outlined text-xl">filter_alt</span>
                </div>
                <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">Filter Builder</h2>
                    <p className="text-xs text-gray-500">Build your query</p>
                </div>
            </div>
            {filterContent}
        </aside>

        {/* Results Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
            {/* Mobile Filter Toggle & Search */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400 ml-3">search</span>
                    <input 
                        type="text" 
                        placeholder="Search properties..." 
                        className="flex-1 border-none bg-transparent focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 h-10" 
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <button 
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mr-1"
                        onClick={() => setShowMobileFilters(true)}
                    >
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                </div>

                {/* Active Filters Chips */}
                <div className="flex flex-wrap gap-2 items-center">
                    {['Status: Vacant', 'Bedrooms: 2', 'City: Brooklyn'].map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
                            {tag} <span className="material-symbols-outlined text-base cursor-pointer hover:text-primary/70">close</span>
                        </span>
                    ))}
                    {query && (
                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium">
                            Query: {query} <span className="material-symbols-outlined text-base cursor-pointer hover:text-gray-900" onClick={() => {
                                setSearchParams(p => { p.delete('q'); return p; });
                                setLocalSearch('');
                            }}>close</span>
                        </span>
                    )}
                    <button className="text-sm text-primary font-medium hover:underline whitespace-nowrap">Clear all</button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Showing <span className="text-gray-900 dark:text-white font-bold">42</span> Results</p>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none justify-center flex items-center gap-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                        <span className="material-symbols-outlined text-lg">swap_vert</span> Sort
                    </button>
                    <button className="flex-1 sm:flex-none justify-center flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90">
                        <span className="material-symbols-outlined text-lg">add</span> <span className="hidden sm:inline">Create New</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {[
                    { name: '123 Maple Street', address: 'Brooklyn, NY 11201', price: '$3,200', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-rlA3Ov6XUnRYNaTsBhPshUPUI4upKwXIkBNUGGF0UfWAWuRgDi0z1OEV5ZZoZWVPjc6ue6YrZbhHCvcuPN8T4vF4b_xwvYABmMNIVRgnCn5nPf76vaIP26y859L4kBvV9VowAtBCTynetdNoey2Wmr1Lf-R0oGcvWxryTMUS5mw2glaJjlGQAW69IOLttd52cqJka3CVUcFXkmfk-aaAzxSZAQOpru62SLSdCGurIYJbZUNvgd8GfxBFtmExNRD0Lr8yegBmgFRx', specs: '2 Bed • 2 Bath • 1,200 sqft' },
                    { name: '456 Oak Avenue', address: 'Brooklyn, NY 11238', price: '$2,850', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWXu47tc5W-j6I2fPNSsH-EI-3AKpmPIdmZQhmukAHhj2OX8XDQyWDMdg1mLaurjVOnFkHG-Oz5w0tzZkZCVrDvDC6Q_ywZzKh6HYRtD6sozJt5t66ogkatU4eog1bFO2rjnxuLXNy8eEJ5JA42GKjNiMv_89KVcbYiKEJdfCun7ctVxs3XzJBHiYjd9qUpkpP0MLtz2pB6IB-yr_vxEcLHwreLUGsFREXNz7O2jSc8X7xDFBTptFqGvHyUWcCbl3LPoxwPrv9yT35', specs: '2 Bed • 1 Bath • 950 sqft' },
                    { name: '789 Pine Lane', address: 'Brooklyn, NY 11215', price: '$3,500', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW_Xh2rCfeJcUnHp778CU57KS150p5Fn4z38T8Mb8_kk1kK9PJP3h9XxTkpIqyHs_poCMos7Ufa3ffBEFYBH3oYMWG8TqAiUHSfrZUQGxeXqfe5jjugS3wxedgS86W1Tt8fIe1zGYzVvbGdqNq35vWWQpERL0yxjX4cGQeQ2qs8fBG8rt_ew_G3okdOmBXwJ8MB2uxaVORBt2jaACyyZxUvy-SeJ1lGRfkk6sd0iUjhzbQZVaLW_0MyWUbZv3v0h87CwOFia2F0MPv', specs: '2 Bed • 2.5 Bath • 1,400 sqft' },
                    { name: '101 Elm Court', address: 'Brooklyn, NY 11217', price: '$3,000', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8jjzVDniAzmMw7ujLkNGifRisIO-H5nXjMD8q60yH8tjKRSKr3Pk4aI6Nt7L6KPFhG5USK011_AwV19L2GkLnywx4zCAf05VXSygobMBebsMkV6O2mb3vvdxgAxgDuhA0P1DCeCq0drvYju8ALZTJ5xqQbO2LVsaLVVKOVJEnnrJWBht45RDWTd__KeuqAkCT6GRIpt-ah4TSRoPW0yd3XjLV2YaeunAmEoBjlUrI655ehANPP7r4SLS8B7EzGXjq6tgruDW1EtlD', specs: '2 Bed • 1 Bath • 1,050 sqft' },
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group cursor-pointer flex flex-col">
                        <div className="aspect-video bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: `url(${item.image})`}}></div>
                        <div className="p-4 relative bg-white dark:bg-gray-800 flex flex-col flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">{item.address}</p>
                            <p className="text-xs text-gray-400 mb-4">{item.specs}</p>
                            <div className="mt-auto flex justify-between items-center">
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{item.price}<span className="text-xs font-normal text-gray-500">/mo</span></p>
                                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-bold rounded">Vacant</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Search;