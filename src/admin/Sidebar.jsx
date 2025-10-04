// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Home, Users, ShoppingCart, Package, Settings, LogOut, Moon, Sun } from "lucide-react";
// import { useAuth } from "../context/AuthContext"; // ✅ import auth

// const Sidebar = () => {
//   const [isDark, setDark] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const { logout } = useAuth(); // ✅ get logout
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: "Dashboard", icon: <Home />, path: "/admin/dashboard" },
//     { name: "Users", icon: <Users />, path: "/admin/users" },
//     { name: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
//     { name: "Products", icon: <Package />, path: "/admin/products" },
//     { name: "Settings", icon: <Settings />, path: "/admin/settings" },
//   ];

//   const handleLogout = () => {
//     logout();             // clear auth context
//     navigate("/login");   // redirect to login
//   };

//   return (
//     <div className={`flex flex-col ${collapsed ? "w-14" : "w-64"} h-screen bg-gray-900 border-r border-gray-800 shadow-xl transition-all duration-300 dark:bg-gray-950`}>
//       {/* User Info */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-800">
//         <div className="flex items-center gap-2">
//           <img src="/images/njan.jpg" className="rounded-full w-8 h-8 shadow" alt="User"/>
//           {!collapsed && <span className="text-gray-100 font-bold">Admin</span>}
//         </div>
//         <button
//           title="Collapse sidebar"
//           className="text-gray-400 hover:text-gray-100 focus:outline-none"
//           onClick={() => setCollapsed((v) => !v)}
//         >
//           {collapsed ? "»" : "«"}
//         </button>
//       </div>

//       {/* Dark Mode Toggle */}
//       <button
//         title={isDark ? "Switch to light mode" : "Switch to dark mode"}
//         className="m-3 text-gray-400 hover:text-yellow-400 focus:outline-none transition duration-300"
//         onClick={() => setDark((v) => !v)}
//       >
//         {isDark ? <Sun size={20}/> : <Moon size={20}/>}
//       </button>

//       {/* Navigation Links */}
//       <nav className="flex-1 mt-4 px-2 space-y-1">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             title={item.name}
//             className={({ isActive }) =>
//               `group flex items-center gap-4 p-3 rounded-lg text-gray-300 transition-all duration-200
//               ${isActive ? "bg-blue-800 text-blue-300 font-semibold" : "hover:bg-gray-800 hover:text-blue-400"}
//               ${collapsed ? "justify-center" : ""}`
//             }
//           >
//             <span className="text-xl group-hover:scale-125 transition">{item.icon}</span>
//             {!collapsed && <span className="text-base">{item.name}</span>}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Action Button */}
//       <div className="mt-auto py-4 px-2 border-t border-gray-800">
//         <button
//           onClick={handleLogout} // ✅ handle logout directly
//           title="Logout"
//           className="flex items-center gap-3 justify-center w-full p-3 rounded-lg text-gray-400 transition-all duration-200 hover:bg-red-900 hover:text-red-400"
//         >
//           <span className="text-xl"><LogOut /></span>
//           {!collapsed && <span className="text-base">Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;













import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Users, ShoppingCart, Package, Settings, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ import auth

const Sidebar = ({ onCollapseChange }) => {
  const [isDark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth(); // ✅ get logout
  const navigate = useNavigate();

  // Notify parent when collapse state changes
  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/admin/dashboard" },
    { name: "Users", icon: <Users />, path: "/admin/users" },
    { name: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
    { name: "Products", icon: <Package />, path: "/admin/products" },
    { name: "Settings", icon: <Settings />, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    logout();             // clear auth context
    navigate("/login");   // redirect to login
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 z-50 flex flex-col ${collapsed ? "w-16" : "w-72"} h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-in-out`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-4 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-2 w-24 h-24 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-2 w-20 h-20 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* User Info */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/images/njan.jpg" 
                className="rounded-full w-12 h-12 shadow-lg ring-2 ring-blue-500/30 hover:ring-blue-400/50 transition-all duration-300" 
                alt="User"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
            </div>
            {!collapsed && (
              <div className="space-y-1">
                <span className="text-white font-bold text-lg tracking-wide">Admin</span>
                <div className="text-slate-400 text-xs font-medium">Super Administrator</div>
              </div>
            )}
          </div>
          <button
            title="Collapse sidebar"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl focus:outline-none transition-all duration-300 hover:scale-110"
            onClick={handleToggleCollapse}
          >
            <div className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
              {collapsed ? "»" : "«"}
            </div>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="relative z-10 p-4">
          <button
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-3 w-full p-3 text-slate-400 hover:text-yellow-400 hover:bg-slate-700/30 rounded-xl focus:outline-none transition-all duration-300 group"
            onClick={() => setDark((v) => !v)}
          >
            <span className="text-xl group-hover:scale-110 transition-transform duration-300">
              {isDark ? <Sun size={20}/> : <Moon size={20}/>}
            </span>
            {!collapsed && (
              <span className="text-sm font-medium">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="relative z-10 flex-1 px-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.path}
              title={item.name}
              className={({ isActive }) =>
                `group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 transform hover:scale-105
                ${isActive 
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 font-semibold border border-blue-500/30 shadow-lg shadow-blue-500/20" 
                  : "text-slate-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/30 hover:text-white border border-transparent hover:border-slate-600/30"
                }
                ${collapsed ? "justify-center" : ""}`
              }
            >
              <span className="text-xl group-hover:scale-125 transition-all duration-300 drop-shadow-lg">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="text-base font-medium tracking-wide">
                  {item.name}
                </span>
              )}
              {!collapsed && (
                <div className="ml-auto w-2 h-2 bg-blue-500/30 rounded-full group-hover:bg-blue-400/50 transition-colors duration-300"></div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="relative z-10 mt-auto p-4 border-t border-slate-700/50 backdrop-blur-sm">
          <button
            onClick={handleLogout} // ✅ handle logout directly
            title="Logout"
            className="flex items-center gap-4 justify-center w-full p-4 rounded-xl text-slate-400 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-900/30 hover:to-red-800/20 hover:text-red-400 border border-transparent hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 transform hover:scale-105 group"
          >
            <span className="text-xl group-hover:scale-125 transition-all duration-300">
              <LogOut />
            </span>
            {!collapsed && (
              <span className="text-base font-medium tracking-wide">Logout</span>
            )}
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-50"></div>
      </div>

      {/* Spacer div to push content to the right */}
      <div className={`${collapsed ? "w-16" : "w-72"} transition-all duration-500 ease-in-out flex-shrink-0`}></div>
    </>
  );
};

export default Sidebar;