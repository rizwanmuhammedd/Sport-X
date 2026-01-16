import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Users, ShoppingCart, Package, Settings, LogOut, Moon, Sun, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onCollapseChange }) => {
  const [isDark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      const isCollapsed = JSON.parse(savedState);
      setCollapsed(isCollapsed);
      if (onCollapseChange) {
        onCollapseChange(isCollapsed);
      }
    }
  }, [onCollapseChange]);

  // Notify parent when collapse state changes
  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsed));
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/admin/dashboard" },
    { name: "Users", icon: <Users />, path: "/admin/users" },
    { name: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
    { name: "Products", icon: <Package />, path: "/admin/products" },
    { name: "Settings", icon: <Settings />, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={handleMobileToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 border border-slate-700 rounded-xl text-white shadow-2xl backdrop-blur-xl"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative z-50 flex flex-col 
        ${collapsed ? "w-16" : "w-64"} 
        h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
        border-r border-slate-700/50 shadow-2xl backdrop-blur-xl 
        transition-all duration-300 ease-in-out
        ${mobileOpen ? "left-0" : "-left-full lg:left-0"}
      `}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-4 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-2 w-24 h-24 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-2 w-20 h-20 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* User Info */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/images/njan.jpg" 
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg ring-2 ring-blue-500/30 hover:ring-blue-400/50 transition-all duration-300" 
                alt="User"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
            </div>
            {!collapsed && (
              <div className="space-y-1">
                <span className="text-white font-bold text-base sm:text-lg tracking-wide">Admin</span>
                <div className="text-slate-400 text-xs font-medium">Super Administrator</div>
              </div>
            )}
          </div>
          <button
            title="Collapse sidebar"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl focus:outline-none transition-all duration-300 hover:scale-110 hidden lg:block"
            onClick={handleToggleCollapse}
          >
            <div className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
              {collapsed ? "»" : "«"}
            </div>
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl focus:outline-none transition-all duration-300 hover:scale-110 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="relative z-10 p-3 sm:p-4">
          <button
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-3 w-full p-2 sm:p-3 text-slate-400 hover:text-yellow-400 hover:bg-slate-700/30 rounded-xl focus:outline-none transition-all duration-300 group"
            onClick={() => setDark((v) => !v)}
          >
            <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </span>
            {!collapsed && (
              <span className="text-sm font-medium">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="relative z-10 flex-1 px-2 sm:px-4 space-y-1 sm:space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              title={item.name}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 transform hover:scale-105
                ${isActive 
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 font-semibold border border-blue-500/30 shadow-lg shadow-blue-500/20" 
                  : "text-slate-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/30 hover:text-white border border-transparent hover:border-slate-600/30"
                }
                ${collapsed ? "justify-center" : ""}`
              }
            >
              <span className="text-lg sm:text-xl group-hover:scale-125 transition-all duration-300 drop-shadow-lg">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="text-sm sm:text-base font-medium tracking-wide">
                  {item.name}
                </span>
              )}
              {!collapsed && (
                <div className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500/30 rounded-full group-hover:bg-blue-400/50 transition-colors duration-300"></div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="relative z-10 mt-auto p-3 sm:p-4 border-t border-slate-700/50 backdrop-blur-sm">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-3 sm:gap-4 justify-center w-full p-3 sm:p-4 rounded-xl text-slate-400 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-900/30 hover:to-red-800/20 hover:text-red-400 border border-transparent hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 transform hover:scale-105 group"
          >
            <span className="text-lg sm:text-xl group-hover:scale-125 transition-all duration-300">
              <LogOut size={18} />
            </span>
            {!collapsed && (
              <span className="text-sm sm:text-base font-medium tracking-wide">Logout</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;