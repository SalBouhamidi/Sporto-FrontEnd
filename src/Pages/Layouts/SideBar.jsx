import React from 'react';
import { Trophy } from 'lucide-react';
import SidebarLink from './SidebarLink';
import ProfileSection from './ProfilSection';

function Sidebar({ tabs, activeTab, setActiveTab }) {
  const handleTabClick = (tabId) => (e) => {
    e.preventDefault();
    setActiveTab(tabId);
  };


  return (
    <aside className="fixed left-0 top-0 h-full w-64 text-white shadow-xl flex flex-col" style={{ background: "#fcf3e4" }}>
      <div className="px-6 py-8">
        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">
            Sporto
          </span>
        </div>
      </div>
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <SidebarLink
              key={tab.id}
              title={tab.title}
              isActive={activeTab === tab.id}
              onClick={handleTabClick(tab.id)}
            />
          ))}
        </ul>
      </nav>
      <ProfileSection />
    </aside>
  );
}

export default Sidebar;
