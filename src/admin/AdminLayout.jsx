// AdminLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <Sidebar onCollapseChange={setSidebarCollapsed} />
      </div>
      
      {/* Main Content - Scrollable */}
      <div className={`
        flex-1 min-h-screen overflow-y-auto
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
        w-full
      `}>
        {/* Content Container */}
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;