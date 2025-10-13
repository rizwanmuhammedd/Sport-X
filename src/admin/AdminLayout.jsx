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















  import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    // Set the entire flexible container to bg-gray-900 and min-h-screen
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 w-full">
      <Sidebar />
      <div className="flex-1 p-4 xs:p-5 sm:p-6 w-full lg:w-auto">
        {/* Adjusted header color to dark gray for contrast */}
        <header className="bg-gray-800 text-white shadow-lg rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-5 sm:mb-6">
          <h1 className="text-xl xs:text-2xl font-semibold">Admin Dashboard</h1>
        </header>
        <main className="w-full">
          <Outlet /> {/* Renders the current admin page (e.g., Orders, Users, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;