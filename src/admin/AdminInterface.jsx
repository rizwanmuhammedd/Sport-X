// // src/admin/AdminInterface.jsx
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar'; // Adjust the path if needed

// const AdminInterface = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminInterface;




// src/admin/AdminInterface.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust the path if needed

const AdminInterface = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar onCollapseChange={handleSidebarCollapse} />
      <div className={`flex-1 min-h-screen transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;







