import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Properties', icon: 'apartment', path: '/properties' },
    { name: 'Issues', icon: 'build', path: '/issues' },
    { name: 'Contacts', icon: 'groups', path: '/contacts' },
    { name: 'Financials', icon: 'payments', path: '/analytics' },
    { name: 'Reports', icon: 'bar_chart', path: '/reports' },
  ];

  return (
    <>
      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
          transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:flex-col lg:h-full
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between px-2 mb-8">
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => handleNavigation('/')}
                title="Go to Dashboard"
              >
                <div className="p-2 bg-primary rounded-lg text-white group-hover:bg-primary-light transition-colors">
                  <span className="material-symbols-outlined !text-2xl">real_estate_agent</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">TRP Software</h1>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                title="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 w-full text-left ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive(item.path) ? 'fill' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-1 mb-4">
              <button 
                onClick={() => handleNavigation('/settings')}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
                    isActive('/settings') 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-medium">Settings</span>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left">
                <span className="material-symbols-outlined">help</span>
                <span className="text-sm font-medium">Help</span>
              </button>
              <button 
                onClick={() => handleNavigation('/login')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors w-full text-left mt-2"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;