
import React, { useState } from 'react';

interface Contractor {
  id: string;
  name: string;
  company: string;
  specialty: string;
  rating: number;
  recommended?: boolean;
}

const IssueDetails: React.FC = () => {
  const [aiDraft, setAiDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assignedContractor, setAssignedContractor] = useState<Contractor | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const contractors: Contractor[] = [
    { id: '1', name: 'Chloe Decker', company: 'Decker Plumbing & Heating', specialty: 'Plumbing', rating: 4.9, recommended: true },
    { id: '2', name: 'Ben Carter', company: 'Sparklight Electrical', specialty: 'Electrical', rating: 4.7 },
    { id: '3', name: 'Sam Wilson', company: 'FixIt Fast Repairs', specialty: 'General', rating: 4.5 },
  ];

  const generateResponse = () => {
    setIsGenerating(true);
    setTimeout(() => {
        setAiDraft(`Dear John,\n\nThank you for reporting the leaking faucet in Unit 5B. We have marked this as a critical priority to prevent water damage.\n\nI have assigned our plumbing contractor, ${assignedContractor ? assignedContractor.company : 'Decker Plumbing'}, to this issue. They will be contacting you shortly to schedule a time for repair.\n\nBest regards,\nEleanor Vance`);
        setIsGenerating(false);
    }, 1000);
  };

  const handleAssign = (contractor: Contractor) => {
    setAssignedContractor(contractor);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto relative">
       <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
           <div>
               <div className="flex items-center gap-3 mb-1">
                   <h1 className="text-3xl font-black text-gray-900 dark:text-white">#I-1024: Leaking Faucet in Unit 5B</h1>
                   <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                       <span className="size-2 bg-green-500 rounded-full"></span> Open
                   </span>
                   <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full">Critical</span>
               </div>
               <p className="text-gray-500">Grand Central Apartments • Reported by John Doe</p>
           </div>
           <div className="flex gap-3">
               <button 
                   onClick={() => setIsAssignModalOpen(true)}
                   className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
               >
                   <span className="material-symbols-outlined text-lg">person_add</span> 
                   {assignedContractor ? 'Reassign Contractor' : 'Assign Contractor'}
               </button>
               <button className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                   <span className="material-symbols-outlined text-lg">update</span> Update Status
               </button>
           </div>
       </header>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 flex flex-col gap-8">
               {/* AI Insights Card */}
               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                        <span className="material-symbols-outlined text-9xl text-primary">auto_awesome</span>
                    </div>
                    <div className="p-6 relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary fill">auto_awesome</span>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Issue Analysis</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Suggested Action</p>
                                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                                    <span className="material-symbols-outlined text-orange-500">plumbing</span>
                                    Assign Plumber
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Est. Cost</p>
                                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                                    <span className="material-symbols-outlined text-green-600">attach_money</span>
                                    $150 - $250
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Urgency Score</p>
                                <div className="flex items-center gap-2 text-red-600 font-bold whitespace-nowrap">
                                    <span className="material-symbols-outlined">priority_high</span>
                                    High (Water Damage Risk)
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800/30">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-bold">Summary:</span> Tenant reports active leak in bathroom vanity. Potential for cabinet rot if not addressed within 24 hours. Recommended contractor: <span className="underline decoration-dotted cursor-pointer" onClick={() => setIsAssignModalOpen(true)}>Decker Plumbing & Heating</span>.
                            </p>
                        </div>
                    </div>
               </div>

               {/* Main Info Card */}
               <div className="bg-white dark:bg-gray-800 rounded-xl border-l-4 border-red-500 shadow-sm border-y border-r border-gray-200 dark:border-gray-700">
                   <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div><p className="text-sm text-gray-500">Property</p><p className="font-medium dark:text-white">Grand Central Apartments</p></div>
                       <div><p className="text-sm text-gray-500">Unit</p><p className="font-medium dark:text-white">Unit 5B</p></div>
                       <div><p className="text-sm text-gray-500">Reported By</p><p className="font-medium dark:text-white">John Doe (Tenant)</p></div>
                       <div><p className="text-sm text-gray-500">Date Created</p><p className="font-medium dark:text-white">Oct 26, 2023, 09:15 AM</p></div>
                       <div className="md:col-span-2">
                           <p className="text-sm text-gray-500">Assigned To</p>
                           {assignedContractor ? (
                               <div className="flex items-center gap-2 mt-1">
                                   <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                       {assignedContractor.name.charAt(0)}
                                   </div>
                                   <div>
                                       <p className="font-medium text-gray-900 dark:text-white">{assignedContractor.name}</p>
                                       <p className="text-xs text-gray-500">{assignedContractor.company}</p>
                                   </div>
                               </div>
                           ) : (
                               <p className="font-medium text-gray-400 italic">Unassigned</p>
                           )}
                       </div>
                   </div>
               </div>

               {/* Description */}
               <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                   <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                       <h2 className="text-lg font-bold text-gray-900 dark:text-white">Description</h2>
                   </div>
                   <div className="p-6">
                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                       The faucet in the main bathroom sink is continuously dripping, even when fully turned off. The dripping has been getting progressively worse over the last 24 hours. The cabinet under the sink is starting to show signs of water damage. Please address this urgently as water bills are a concern and potential damage to the vanity is likely.
                       </p>
                   </div>
               </div>

               {/* Visuals */}
               <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                   <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                       <h2 className="text-lg font-bold text-gray-900 dark:text-white">Visuals</h2>
                   </div>
                   <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                       <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsp7G9uKdqkZOErAfThyZNg-jQOmB41ZqTTTLmlOlLMkkBRAGYg4uqPyz3CpHROH8_2mOAaZ6DGQLrvBXMT6hA8vwNyE-G7R6ia-DMlUZcIcuf9CUqgq8_OldjKEUh_1D67vnHgjt5wF086n6Qn3QOaEkhTZmQ2FF5STtieZvbszwfmso81hwfTR7RgcJRyqI_KsFRThUnl35b1P-gXUoHbWcrcIOogH5J7RbobZrXIrWs__8Oe-KHFXgfIyonuFTUCH0rh3F3k6W9" className="aspect-square rounded-lg object-cover hover:opacity-90 cursor-pointer" alt="Leak" />
                       <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDah-Ls6yqe7g876Of2ywceokRTbpySdQ3df6NcFPTTWCgBiAIGK-OZFaFpv_Z4y7ixiJPgXsfnMPe-IxXLfpBLx8BdNyPsH9QpC2b1jPuvADNuV1Ornvb3IXb2kU9I-qG1hkap1Zqi9vulJ30uPw_WBzuts-5IkeS-Ih9N2k0KnOW5W6PngRK-HU5ArT5YfOFSJ_XDN8giEMv33zG6hNuj30KKMPgoA89McQmg9w5MZz5bEeGJ_yFlFetqxH9_9YvVPe9C4qGx-Qqp" className="aspect-square rounded-lg object-cover hover:opacity-90 cursor-pointer" alt="Damage" />
                       <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                           <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                           <span className="text-xs mt-1">Add Visuals</span>
                       </div>
                   </div>
               </div>
           </div>

           <div className="lg:col-span-1 flex flex-col gap-8">
               {/* Timeline */}
               <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                   <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                       <h2 className="text-lg font-bold text-gray-900 dark:text-white">Smart Timeline</h2>
                   </div>
                   <div className="p-6">
                       <ul className="space-y-6 relative">
                           {/* Line */}
                           <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700"></div>
                           
                           <li className="relative flex gap-4">
                               <div className="z-10 size-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                                   <span className="material-symbols-outlined text-sm">add</span>
                               </div>
                               <div>
                                   <p className="text-sm font-bold text-gray-900 dark:text-white">Issue Created</p>
                                   <p className="text-xs text-gray-500">by John Doe • Oct 26, 09:15 AM</p>
                               </div>
                           </li>
                           <li className="relative flex gap-4">
                               <div className="z-10 size-8 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
                                   <span className="material-symbols-outlined text-sm">priority_high</span>
                               </div>
                               <div>
                                   <p className="text-sm font-bold text-gray-900 dark:text-white">Priority changed to <span className="text-red-500">Critical</span></p>
                                   <p className="text-xs text-gray-500">by Eleanor Vance • Oct 26, 09:18 AM</p>
                               </div>
                           </li>
                           
                           {assignedContractor && (
                               <li className="relative flex gap-4 animate-fade-in">
                                   <div className="z-10 size-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                       <span className="material-symbols-outlined text-sm">person</span>
                                   </div>
                                   <div>
                                       <p className="text-sm font-bold text-gray-900 dark:text-white">Contractor Assigned</p>
                                       <p className="text-xs text-gray-500">Assigned to {assignedContractor.name}</p>
                                   </div>
                               </li>
                           )}

                           <li className="relative flex gap-4">
                               <div className={`z-10 size-8 rounded-full flex items-center justify-center shrink-0 ${assignedContractor ? 'bg-gray-200 dark:bg-gray-700 text-gray-500' : 'bg-blue-500 text-white'}`}>
                                   <span className="material-symbols-outlined text-sm">{assignedContractor ? 'pending' : 'sync'}</span>
                               </div>
                               <div>
                                   <p className="text-sm font-bold text-gray-900 dark:text-white">{assignedContractor ? 'Awaiting contractor acceptance' : 'Awaiting contractor assignment'}</p>
                                   <p className="text-xs text-gray-500">Current Status</p>
                               </div>
                           </li>
                       </ul>
                   </div>
               </div>

               {/* Chat */}
               <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-[500px]">
                   <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                       <h2 className="text-lg font-bold text-gray-900 dark:text-white">Communication</h2>
                   </div>
                   <div className="flex-1 p-4 overflow-y-auto space-y-4">
                       <div className="flex gap-3">
                           <div className="size-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                           <div>
                               <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none text-sm text-gray-800 dark:text-gray-200">
                                   Hi John, thanks for reporting this. I've marked it as critical and am looking for a plumber right now.
                               </div>
                               <p className="text-xs text-gray-400 mt-1">Eleanor Vance • 09:19 AM</p>
                           </div>
                       </div>
                       <div className="flex gap-3 flex-row-reverse">
                           <div className="size-8 rounded-full bg-blue-300 flex-shrink-0"></div>
                           <div className="flex flex-col items-end">
                               <div className="bg-primary text-white p-3 rounded-lg rounded-br-none text-sm">
                                   Thank you, Eleanor! Appreciate the quick response.
                               </div>
                               <p className="text-xs text-gray-400 mt-1">John Doe • 09:21 AM</p>
                           </div>
                       </div>
                       {assignedContractor && (
                           <div className="flex gap-3 animate-fade-in">
                                <div className="size-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                <div>
                                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none text-sm text-gray-800 dark:text-gray-200">
                                        Update: I have assigned <strong>{assignedContractor.company}</strong> to handle this issue. They should reach out shortly.
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">System • Just now</p>
                                </div>
                            </div>
                       )}
                   </div>
                   <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                       
                       {/* AI Reply Suggestion */}
                       <div className="mb-3">
                            {!aiDraft && (
                                <button 
                                    onClick={generateResponse}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <span className={`material-symbols-outlined text-sm ${isGenerating ? 'animate-spin' : 'fill'}`}>
                                        {isGenerating ? 'refresh' : 'auto_awesome'}
                                    </span>
                                    {isGenerating ? 'Generating response...' : 'Generate AI Response'}
                                </button>
                            )}
                            {aiDraft && (
                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 mb-2 animate-fade-in">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm fill">auto_awesome</span> AI Draft
                                        </span>
                                        <button onClick={() => setAiDraft('')} className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined text-sm">close</span></button>
                                    </div>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap italic">{aiDraft}</p>
                                    <button 
                                        onClick={() => setAiDraft('')} // In a real app, this would copy to clipboard or fill input
                                        className="mt-2 text-xs font-bold text-primary hover:underline"
                                    >
                                        Use this draft
                                    </button>
                                </div>
                            )}
                       </div>

                       <div className="relative">
                           <input type="text" placeholder="Add a comment..." defaultValue={aiDraft ? "See AI Draft above..." : ""} className="w-full pl-4 pr-24 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm focus:ring-primary focus:border-primary" />
                           <button className="absolute right-1 top-1 bottom-1 px-4 bg-primary text-white rounded-md text-xs font-bold hover:bg-primary/90">Send</button>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       {/* Assign Contractor Modal */}
       {isAssignModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Select Contractor</h3>
                        <button onClick={() => setIsAssignModalOpen(false)} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" title="Close">
                            <span className="material-symbols-outlined text-gray-500">close</span>
                        </button>
                    </div>
                    <div className="p-4 space-y-3">
                        <p className="text-sm text-gray-500 mb-2">Recommended for Plumbing issues:</p>
                        {contractors.map(contractor => (
                            <div 
                                key={contractor.id} 
                                onClick={() => handleAssign(contractor)}
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
                                        {contractor.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-gray-900 dark:text-white">{contractor.name}</p>
                                            {contractor.recommended && (
                                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">Recommended</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">{contractor.company} • ⭐ {contractor.rating}</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">chevron_right</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button onClick={() => setIsAssignModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">Cancel</button>
                    </div>
                </div>
            </div>
       )}
    </div>
  );
};

export default IssueDetails;
