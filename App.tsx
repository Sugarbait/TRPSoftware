import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import UnitDetails from './pages/UnitDetails';
import IssueLog from './pages/IssueLog';
import IssueDetails from './pages/IssueDetails';
import Contacts from './pages/Contacts';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Search from './pages/Search';
import BuildingProfile from './pages/BuildingProfile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AIAssistant from './components/AIAssistant';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search page handles its own layout structure for sidebar
  const isSearchPage = location.pathname === '/search';
  // Login page hides sidebar and header
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      {!isSearchPage && !isLoginPage && (
        <>
          {/* Mobile Overlay */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
          <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
      )}
      
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {!isLoginPage && <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
          {children}
        </main>
        {!isLoginPage && <AIAssistant />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/units/:id" element={<UnitDetails />} />
          <Route path="/building/:id" element={<BuildingProfile />} />
          <Route path="/log-issue" element={<IssueLog />} />
          <Route path="/issue/:id" element={<IssueDetails />} />
          <Route path="/issues" element={<IssueLog />} /> 
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;