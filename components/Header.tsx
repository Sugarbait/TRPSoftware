import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('profileImage') || 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=200&q=80';
  });
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showProfileMenu]);

  useEffect(() => {
    const handleProfileImageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setProfileImage(customEvent.detail.image);
    };

    window.addEventListener('profileImageChanged', handleProfileImageChange);
    return () => window.removeEventListener('profileImageChanged', handleProfileImageChange);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('profileImageChanged', { detail: { image: result } }));
        setShowProfileMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setShowProfileMenu(false);
    navigate('/settings');
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSignOut = () => {
    setShowProfileMenu(false);
    navigate('/login');
  };

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 sm:px-6 py-3">
      <div className="flex items-center gap-4 lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          title="Menu"
        >
             <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Back button - visible on desktop only, when not on home */}
      {!isHome && (
        <button
          onClick={() => navigate(-1)}
          className="hidden lg:flex items-center justify-center p-2.5 mr-4 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full transition-colors"
          title="Go Back"
        >
           <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}

      <div className="flex-1 flex justify-center max-w-2xl mx-auto px-4 lg:px-0">
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
            </div>
            <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all duration-200" 
                placeholder="Search properties, contacts, issues..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none hidden sm:flex">
                <kbd className="inline-flex items-center border border-gray-200 dark:border-gray-700 rounded px-2 text-xs font-sans font-medium text-gray-400">↵</kbd>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4">
        <button className="p-2.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative" title="Notifications">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
            onClick={() => navigate('/settings')}
            className="p-2.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
            title="Settings"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        {/* Profile Picture with Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="rounded-full ring-2 ring-gray-100 dark:ring-gray-700 ml-2 hover:ring-primary dark:hover:ring-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 sm:size-10"
              style={{backgroundImage: `url("${profileImage}")`}}
            ></div>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
              <button
                onClick={handleEditProfile}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="material-symbols-outlined text-base">person</span>
                Edit Profile
              </button>
              <button
                onClick={handleChangePhoto}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
                Change Photo
              </button>
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </header>
  );
};

export default Header;