  // import React from 'react';
  // import { Outlet } from 'react-router-dom';
  // import Sidebar from './Sidebar';

  // const AdminLayout = () => {
  //   return (
  //     // Set the entire flexible container to bg-gray-900 and min-h-screen
  //     <div className="flex min-h-screen bg-gray-900 w-full">
  //       <Sidebar />
  //       <div className="flex-1 p-6">
  //         {/* Adjusted header color to dark gray for contrast */}
  //         <header className="bg-gray-800 text-white shadow-lg rounded-lg p-4 mb-6">
  //           <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
  //         </header>
  //         <main>
  //           <Outlet /> {/* Renders the current admin page (e.g., Orders, Users, etc.) */}
  //         </main>
  //       </div>
  //     </div>
  //   );
  // };

  // export default AdminLayout;










  import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    // Set the entire flexible container to bg-gray-900 and min-h-screen
    <div className="flex min-h-screen bg-gray-900 w-full">
      <Sidebar onCollapseChange={handleSidebarCollapse} />
      <div className={`flex-1 transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <div className="p-4 sm:p-6">
          {/* Adjusted header color to dark gray for contrast */}
          <header className="bg-gray-800 text-white shadow-lg rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold">Admin Dashboard</h1>
          </header>
          <main>
            <Outlet /> {/* Renders the current admin page (e.g., Orders, Users, etc.) */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;










