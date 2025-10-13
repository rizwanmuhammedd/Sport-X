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
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust the path if needed

const AdminInterface = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 w-full lg:w-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminInterface;