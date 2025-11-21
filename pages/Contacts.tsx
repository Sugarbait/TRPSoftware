import React, { useState } from 'react';

interface Contact {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  color: string;
  lastContact: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
  status?: string;
}

const Contacts: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState<Contact | null>(null);
  const [isAddingNewContact, setIsAddingNewContact] = useState(false);
  const [contactsList, setContactsList] = useState<Contact[]>([
    { id: 1, name: 'Eleanor Vance', role: 'Property Owner', company: 'Vance Properties, LLC', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqSbbURpvhRoZvjjzSRTJJQ4Twb9dV6gaN58Zqapc6T7lSKxAV9pKBk-0Q1CKBsCBQdy_rkMvYMmDfwuT78dKh52ChNFDFIeXBq6MhOYCUab-Dflnk_oDBFl901K6vRpk-nf1vuVHrYaCXjLwxn1EeEvG6cNuAgdozkxY4EbXP46hN2DDv6RdcuddHtW1JI1nOryBM28f0L-Y9uBaQnKDYJoRYOSfv4E4GE6ua-NanibSgsf2r7lLz-FZynkJEav2L6EdS8mMKlEn9', color: 'bg-blue-100 text-blue-700', lastContact: '3d ago', email: 'eleanor.vance@vanceprop.com', phone: '(555) 123-4567', address: '789 Executive Blvd', city: 'Portland', state: 'OR', zipCode: '97201', status: 'Active', notes: 'Owns 3 properties in the Portland area' },
    { id: 2, name: 'Marcus Holloway', role: 'Tenant', company: '123 Maple St, Unit 4B', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjOcQMNdD0ZdS86bTWrbetPHnJrqSXxW0ZqRKmzME1KFuPbdjjKycSO89-jTNCqy1Liu5La8tkm53_DCPPM_YZKHQtHP4-zQiJULzIr8T0O95113XMFRxZN7fQtndLNvGjHQfvE9XW374Q02t-ZDp1ZKO4VQmtdAP7gbnQhyVmfFzGolOrcYRcKjxP2A1Ivs1ZKAab3rycpAPYpSAIutmKQZV7S9ZXE01uDvwnJnr_RyUTYG9i_CGagnkIY8SmHGv24JyJCMMWfsOX', color: 'bg-green-100 text-green-700', lastContact: '1w ago', email: 'marcus.holloway@email.com', phone: '(555) 234-5678', address: '123 Maple St, Unit 4B', city: 'Portland', state: 'OR', zipCode: '97210', status: 'Active', notes: 'Tenant since January 2023. Pays rent on time.' },
    { id: 3, name: 'Chloe Decker', role: 'Contractor', company: 'Decker Plumbing & Heating', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR1q_Tb6bB9Xnw1_e5L66ephcKoJhfCCh1Fbs3Gayh6pPcHGu7hnD5vJEGJVP7uFyb4RjEf8ZOdvGpEeR5ULQ_URbzdyJCfsBHjgxYPe2VAu2PjiNNg9K2nO_LCplIbdrhpn5AH4_7f-EKo0dWfWyF43ry6BMpDDF8HOCWCFl0r70XMrRAk9qu8GnzGQ1uh2hKT9jDCGm4aOokJcNS6--6-tp7u9PrgN34D7-Xf_H4-2OeRe1eHwpONSG8cGydde06LnppGp3clnWh', color: 'bg-orange-100 text-orange-700', lastContact: '2d ago', email: 'chloe@deckerplumbing.com', phone: '(555) 345-6789', address: '456 Industrial Way', city: 'Portland', state: 'OR', zipCode: '97214', status: 'Active', notes: 'Licensed plumber. Preferred contractor for maintenance.' },
    { id: 4, name: 'Ben Carter', role: 'Contractor', company: 'Sparklight Electrical', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHH4PhRIIj0OUaA_kmXrZuF4zIyNQgYIF19lBLACMs1JByqW8gfqx-3yFZKfsGOt0RG-XRGhtq1WU_GJgzYoKiMUrsPtV6Ye713OUVekbrk2Q4aG9-vs8fwmUuVETqb4wWFqSDb8F5mBgZgOM8yhczkkbAU4IfeR-HA-C6IBn_S_E0hGNp-Hp1J1qG3BIFgvQq2USe-KvSLDRFML_OUfyixDD-hWg9oAh965rUgYyVWU6vqTLB0KSCUKk1c3D1QTxeW0OKX3ZtGUqh', color: 'bg-orange-100 text-orange-700', lastContact: '1mo ago', email: 'ben@sparklight.com', phone: '(555) 456-7890', address: '789 Tech Drive', city: 'Beaverton', state: 'OR', zipCode: '97005', status: 'Inactive', notes: 'Licensed electrician. Last job was emergency repair.' },
    { id: 5, name: 'Olivia Chen', role: 'Tenant', company: '456 Oak Ave, Unit 12', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhoicfvxVeRYc-9vpp7udd3W6YgSKFN8g54AVlwJIpZ5joYqaNMPWuHKJtUekL-hMcTd4wqjdoMGWoNBaGj1b68Nipc0rg7QNG0WUDecLAXlVBxlBDS4ugatJE3ZBF0KkqgFOTRscsQAL8s9OZjazJc71uF8nnlrTMpPVTl3JacbeTh5VckJz_im1imEm3hd0tiwHHEbcc5Rz-yj-qahThXQguT2Tdt0cdXzhn6vgT9iwq1V2iJT4XdPGRfZUPzvoRSJh1xJIEuU13', color: 'bg-green-100 text-green-700', lastContact: '5d ago', email: 'olivia.chen@email.com', phone: '(555) 567-8901', address: '456 Oak Ave, Unit 12', city: 'Portland', state: 'OR', zipCode: '97215', status: 'Active', notes: 'Tenant since May 2022. Very responsive to requests.' },
    { id: 6, name: 'James Rodriguez', role: 'Property Owner', company: 'Oak Ave Holdings', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEX2viwh2hsqmU_PbthaFn--9gTcESsvbotiFcz6rBx-s72FV2pqZZnvSEoM5SCmVy75bJkNrThihrf5W4nYelEf2hKj1ZeqXMwvr6GTxIOS7QucTFNgYzAEHco3oEFuw5cdusQb2mdd4-g1ZQledYIJm_uEBwYnTI5VHg6eXzGD5YRXWTScza7DscJnGSh05x9FGrFpOu0yHtctFH56OoZo1ERnoJ4fhjxRNwzx4AQBLsWYzW4wbVpNP6dukOzFVBe_FjeWkUUyL2', color: 'bg-blue-100 text-blue-700', lastContact: '2w ago', email: 'james@oakaveholdings.com', phone: '(555) 678-9012', address: '321 Investment Blvd', city: 'Lake Oswego', state: 'OR', zipCode: '97034', status: 'Active', notes: 'Large property portfolio. Requires quarterly reports.' }
  ]);

  const filteredContacts = filter === 'All' ? contactsList : contactsList.filter(c => c.role.includes(filter.replace(/s$/, '')));

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setEditFormData({ ...contact });
    setIsEditMode(false);
  };

  const handleEditContact = () => {
    setIsEditMode(true);
  };

  const handleSaveContact = () => {
    if (editFormData) {
      if (isAddingNewContact) {
        setContactsList([...contactsList, editFormData]);
        setIsAddingNewContact(false);
      } else {
        setContactsList(contactsList.map(c => c.id === editFormData.id ? editFormData : c));
      }
      setSelectedContact(editFormData);
      setIsEditMode(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setIsEditMode(false);
    setEditFormData(null);
  };

  const handleAddNewContact = () => {
    const ids = contactsList.map(c => c.id);
    const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    const newContact: Contact = {
      id: newId,
      name: 'New Contact',
      role: 'Tenant',
      company: '',
      avatar: 'https://via.placeholder.com/100?text=New',
      color: 'bg-gray-100 text-gray-700',
      lastContact: 'Today',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      notes: '',
      status: 'Active'
    };
    setSelectedContact(newContact);
    setEditFormData(newContact);
    setIsEditMode(true);
    setIsAddingNewContact(true);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Filters Panel */}
      <aside className="w-72 bg-white dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 p-6 flex-shrink-0 hidden xl:block overflow-y-auto">
        <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Filters</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Filter by Property</label>
            <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm">
              <option>Any Property</option>
              <option>123 Maple St</option>
              <option>456 Oak Ave</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Filter by Specialty</label>
            <div className="space-y-2">
              {['Plumber', 'Electrician', 'HVAC'].map(s => (
                <label key={s} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">Contacts</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage all your property owners, tenants, and contractors.</p>
          </div>
          <button onClick={handleAddNewContact} className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span> Add New Contact
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl self-start">
            {['All', 'Property Owners', 'Tenants', 'Contractors'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === tab ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
              <input type="text" placeholder="Search by name, company, email..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
            </div>
            <select className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-primary focus:border-primary">
              <option>Sort by: Alphabetical (A-Z)</option>
              <option>Sort by: Most Recent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => handleViewContact(contact)}
              className="group relative flex flex-col gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer text-left w-full"
            >
              <div className="flex items-center gap-4">
                <img src={contact.avatar} alt={contact.name} className="size-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{contact.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[160px]">{contact.company}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mt-auto">
                <span className="px-2 py-1 rounded-md text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  {contact.role}
                </span>
                <span className="text-gray-400 dark:text-gray-500 text-xs">Last: {contact.lastContact}</span>
              </div>
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-900 p-1 rounded-lg shadow-sm">
                <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Call"><span className="material-symbols-outlined text-lg">phone</span></button>
                <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Email"><span className="material-symbols-outlined text-lg">mail</span></button>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Styles */}
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        select option {
          background-color: white;
          color: black;
        }
        @media (prefers-color-scheme: dark) {
          select option {
            background-color: #374151;
            color: white;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      {/* Contact Details Modal */}
      {selectedContact && editFormData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full my-auto max-h-[90vh] animate-slideUp shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary to-primary/80 dark:from-primary dark:via-primary/90 dark:to-primary/70 p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <span className="material-symbols-outlined text-white text-2xl">person</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isEditMode ? 'Edit Contact' : 'Contact Details'}
                  </h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2.5 hover:bg-white/20 rounded-lg text-white transition-colors"
                  title="Close"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto hide-scrollbar">
              {/* Profile Avatar */}
              <div className="flex flex-col items-center gap-4 py-4 px-4 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 rounded-xl">
                <div className="relative">
                  <img
                    src={editFormData.avatar}
                    alt={editFormData.name}
                    className="size-28 rounded-full object-cover ring-4 ring-primary/20 shadow-lg"
                  />
                  <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    selectedContact.role === 'Property Owner' ? 'bg-blue-500' :
                    selectedContact.role === 'Tenant' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`}>
                    {selectedContact.role}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedContact.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedContact.company}</p>
                  {selectedContact.lastContact && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Last contact: {selectedContact.lastContact}
                    </p>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-4">
                  <span className="material-symbols-outlined text-base">info</span> Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Name</label>
                    {isEditMode ? (
                      <input type="text" value={editFormData.name || ''} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{selectedContact.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Role</label>
                    {isEditMode ? (
                      <select value={editFormData.role || ''} onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm">
                        <option>Property Owner</option><option>Tenant</option><option>Contractor</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{selectedContact.role}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Status</label>
                    {isEditMode ? (
                      <select value={editFormData.status || ''} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm">
                        <option>Active</option><option>Inactive</option><option>Pending</option>
                      </select>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${editFormData.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : editFormData.status === 'Inactive' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {selectedContact.status}
                      </span>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Company</label>
                    {isEditMode ? (
                      <input type="text" value={editFormData.company || ''} onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{selectedContact.company}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-4">
                  <span className="material-symbols-outlined text-base text-blue-600 dark:text-blue-400">contact_phone</span> Contact Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Email</label>
                    {isEditMode ? (
                      <input type="email" value={editFormData.email || ''} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <a href={`mailto:${selectedContact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">{selectedContact.email}</a>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Phone</label>
                    {isEditMode ? (
                      <input type="tel" value={editFormData.phone || ''} onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <a href={`tel:${selectedContact.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">{selectedContact.phone}</a>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-4">
                  <span className="material-symbols-outlined text-base text-amber-600 dark:text-amber-400">location_on</span> Address
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Street Address</label>
                    {isEditMode ? (
                      <input type="text" value={editFormData.address || ''} onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{selectedContact.address}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">City</label>
                    {isEditMode ? (
                      <input type="text" value={editFormData.city || ''} onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{selectedContact.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">State</label>
                    {isEditMode ? (
                      <input type="text" value={editFormData.state || ''} onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{selectedContact.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Zip Code</label>
                    {isEditMode ? (
                      <input type="text" value={editFormData.zipCode || ''} onChange={(e) => setEditFormData({ ...editFormData, zipCode: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-sm" />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm">{selectedContact.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-4">
                  <span className="material-symbols-outlined text-base">notes</span> Additional Info
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">Notes</label>
                  {isEditMode ? (
                    <textarea value={editFormData.notes || ''} onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary resize-none text-sm" />
                  ) : (
                    <p className="text-gray-900 dark:text-white text-sm">{selectedContact.notes}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 flex gap-3">
              {!isEditMode ? (
                <>
                  <button
                    onClick={handleEditContact}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-bold rounded-xl hover:shadow-lg hover:from-primary/90 hover:to-primary/80 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">edit</span>
                    Edit Contact
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveContact}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">check_circle</span>
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditMode(false);
                      setEditFormData(selectedContact);
                    }}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
