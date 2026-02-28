




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Heart, ShoppingCart, User, LogOut, Menu, X, Search, ChevronDown, Home, ShoppingBag, Info, Phone } from "lucide-react"; 
// import { useAuth } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";

// export default function Navbar({ onSearch }) {
//   const { user, logout } = useAuth();
//   const { wishlist } = useWishlist();
//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeSection, setActiveSection] = useState("home");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Menu"]')) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Track scroll for navbar styling
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Update active section based on path
//   useEffect(() => {
//     if (location.pathname === "/more-products") setActiveSection("shop");
//     else if (location.pathname === "/") setActiveSection("home");
//   }, [location.pathname]);

//   // Scroll listener for home page sections - UPDATED
//   useEffect(() => {
//     if (location.pathname !== "/") return;

//     const handleScroll = () => {
//       const features = document.getElementById("features"); // Using features as "about"
//       const stats = document.getElementById("stats"); // Using stats as "contact"
//       const scrollY = window.scrollY + 150; 

//       if (stats && scrollY >= stats.offsetTop) {
//         setActiveSection("contact");
//       } else if (features && scrollY >= features.offsetTop) {
//         setActiveSection("about");
//       } else {
//         setActiveSection("home");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [location.pathname]);

//   const handleWishlistClick = () => {
//     if (!user) navigate("/login");
//     else navigate("/wishlist");
//     setIsMobileMenuOpen(false);
//   };

//   const handleUserClick = () => {
//     if (!user) navigate("/login");
//     else setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//     setShowDropdown(false);
//     setIsMobileMenuOpen(false);
//   };

//   const handleSearchChange = (e) => {
//     const val = e.target.value;
//     setSearchTerm(val);
//     if (onSearch) onSearch(val);
//   };

//   // UPDATED scrollToSection function
//   const scrollToSection = (id) => {
//     // Map the nav IDs to your actual section IDs in Home page
//     let sectionId;
//     if (id === "about") {
//       sectionId = "features"; // Your Home page has "features" section
//     } else if (id === "contact") {
//       sectionId = "stats"; // Your Home page has "stats" section
//     } else {
//       sectionId = id;
//     }

//     if (location.pathname === "/") {
//       const section = document.getElementById(sectionId);
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth" });
//       } else {
//         // If section doesn't exist, scroll to top
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }
//     } else {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById(sectionId);
//         if (section) {
//           section.scrollIntoView({ behavior: "smooth" });
//         } else {
//           window.scrollTo({ top: 0, behavior: "smooth" });
//         }
//       }, 200);
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const handleHomeClick = () => {
//     if (location.pathname === "/") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       navigate("/");
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const getLinkClass = (section) =>
//     `relative px-4 py-2 font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
//       activeSection === section
//         ? "text-white"
//         : "text-gray-400 hover:text-white"
//     }`;

//   const getActiveBorder = (section) =>
//     activeSection === section ? (
//       <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></span>
//     ) : null;

//   const toggleSearch = () => {
//     setIsSearchExpanded(!isSearchExpanded);
//     if (isSearchExpanded) {
//       setSearchTerm("");
//       if (onSearch) onSearch("");
//     }
//   };

//   return (
//     <>
//       {/* Main Navbar */}
//       <nav 
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           isScrolled 
//             ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800" 
//             : "bg-gray-900/90 backdrop-blur-md"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div 
//               className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0" 
//               onClick={handleHomeClick}
//             >
//               <div className="relative">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
//                   <span className="text-white font-bold text-lg">SX</span>
//                 </div>
//                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
//                   Sport-X
//                 </span>
//                 <span className="text-xs text-gray-400 hidden sm:block">Premium Football Gear</span>
//               </div>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center space-x-1">
//               <button onClick={handleHomeClick} className={getLinkClass("home")}>
//                 <Home size={16} />
//                 Home
//                 {getActiveBorder("home")}
//               </button>
//               <button onClick={() => navigate("/more-products")} className={getLinkClass("shop")}>
//                 <ShoppingBag size={16} />
//                 Shop
//                 {getActiveBorder("shop")}
//               </button>
//               <button onClick={() => scrollToSection("about")} className={getLinkClass("about")}>
//                 <Info size={16} />
//                 About
//                 {getActiveBorder("about")}
//               </button>
//               <button onClick={() => scrollToSection("contact")} className={getLinkClass("contact")}>
//                 <Phone size={16} />
//                 Contact
//                 {getActiveBorder("contact")}
//               </button>
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-2 sm:gap-3">
//               {/* Search */}
//               {location.pathname === "/more-products" && (
//                 <div className="flex items-center relative">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       className={`h-10 pl-10 pr-4 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white text-sm transition-all duration-300 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-500 ${
//                         isSearchExpanded
//                           ? "w-48 sm:w-64 opacity-100"
//                           : "w-0 opacity-0 pointer-events-none"
//                       }`}
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                     />
//                     <button
//                       onClick={toggleSearch}
//                       className={`absolute left-0 top-0 h-10 w-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
//                         isSearchExpanded
//                           ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
//                           : "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
//                       }`}
//                     >
//                       <Search size={18} className={isSearchExpanded ? "text-white" : "text-gray-400"} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Wishlist */}
//               <button
//                 onClick={handleWishlistClick}
//                 className="relative p-2 sm:p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
//               >
//                 <Heart size={20} className="text-gray-400 group-hover:text-rose-400 transition-colors" />
//                 {user && wishlist && wishlist.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
//                     {wishlist.length}
//                   </span>
//                 )}
//               </button>

//               {/* Cart */}
//               <button
//                 onClick={() => (user ? navigate("/cart") : navigate("/login"))}
//                 className="relative p-2 sm:p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
//               >
//                 <ShoppingCart size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
//                 {user && cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
//                     {cart.reduce((total, item) => total + item.quantity, 0)}
//                   </span>
//                 )}
//               </button>

//               {/* User Dropdown - Desktop */}
//               {user ? (
//                 <div className="hidden sm:block relative" ref={dropdownRef}>
//                   <button
//                     onClick={handleUserClick}
//                     className="p-2.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
//                   >
//                     <User size={20} className="text-gray-400 group-hover:text-white transition-colors" />
//                   </button>

//                   {showDropdown && (
//                     <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
//                       <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
//                         <p className="text-sm font-semibold text-white">Welcome back!</p>
//                         <p className="text-xs text-gray-400 truncate">{user.email}</p>
//                       </div>
                      
//                       <button
//                         onClick={() => { navigate("/profile"); setShowDropdown(false); }}
//                         className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-200 text-sm border-b border-gray-700"
//                       >
//                         <User size={16} className="mr-3 text-gray-400" />
//                         Profile
//                       </button>
                      
//                       <button
//                         onClick={() => { navigate("/orders"); setShowDropdown(false); }}
//                         className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-200 text-sm border-b border-gray-700"
//                       >
//                         <ShoppingCart size={16} className="mr-3 text-gray-400" />
//                         Orders
//                       </button>
                      
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full text-left px-4 py-3 text-rose-400 hover:bg-gray-700/50 transition-all duration-200 text-sm"
//                       >
//                         <LogOut size={16} className="mr-3 text-rose-400" />
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="hidden sm:block px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm shadow-lg hover:shadow-purple-500/20"
//                 >
//                   Login
//                 </button>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden p-2 sm:p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all duration-300"
//                 aria-label="Menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <X size={20} className="text-gray-400" />
//                 ) : (
//                   <Menu size={20} className="text-gray-400" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Slide Menu */}
//       <div
//         ref={mobileMenuRef}
//         className={`lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm transform transition-transform duration-300 ease-in-out ${
//           isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-l border-gray-700">
//           {/* Mobile Menu Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-xl">SX</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//                   Sport-X
//                 </span>
//                 <span className="text-xs text-gray-400">Premium Football Gear</span>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
//             >
//               <X size={20} className="text-gray-400" />
//             </button>
//           </div>

//           {/* Mobile Menu Content */}
//           <div className="flex-1 overflow-y-auto">
//             {/* User Section */}
//             {user ? (
//               <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                     <User size={24} className="text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-semibold text-white">Welcome!</p>
//                     <p className="text-xs text-gray-400 truncate">{user.email}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
//                     className="px-4 py-3 bg-gray-800/50 text-white rounded-lg text-sm font-medium hover:bg-gray-700/50 transition-all border border-gray-700 backdrop-blur-sm"
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => { navigate("/orders"); setIsMobileMenuOpen(false); }}
//                     className="px-4 py-3 bg-gray-800/50 text-white rounded-lg text-sm font-medium hover:bg-gray-700/50 transition-all border border-gray-700 backdrop-blur-sm"
//                   >
//                     Orders
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
//                 <button
//                   onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
//                   className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
//                 >
//                   Login to Continue
//                 </button>
//               </div>
//             )}

//             {/* Navigation Links */}
//             <nav className="p-6">
//               <div className="space-y-2">
//                 <button
//                   onClick={handleHomeClick}
//                   className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
//                     activeSection === "home"
//                       ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
//                       : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg ${activeSection === "home" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
//                       <Home size={18} className={activeSection === "home" ? "text-white" : "text-gray-400"} />
//                     </div>
//                     <span>Home</span>
//                   </div>
//                   {activeSection === "home" && (
//                     <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
//                   )}
//                 </button>

//                 <button
//                   onClick={() => { navigate("/more-products"); setIsMobileMenuOpen(false); }}
//                   className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
//                     activeSection === "shop"
//                       ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
//                       : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg ${activeSection === "shop" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
//                       <ShoppingBag size={18} className={activeSection === "shop" ? "text-white" : "text-gray-400"} />
//                     </div>
//                     <span>Shop</span>
//                   </div>
//                   {activeSection === "shop" && (
//                     <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
//                   )}
//                 </button>

//                 <button
//                   onClick={() => scrollToSection("about")}
//                   className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
//                     activeSection === "about"
//                       ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
//                       : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg ${activeSection === "about" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
//                       <Info size={18} className={activeSection === "about" ? "text-white" : "text-gray-400"} />
//                     </div>
//                     <span>About</span>
//                   </div>
//                   {activeSection === "about" && (
//                     <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
//                   )}
//                 </button>

//                 <button
//                   onClick={() => scrollToSection("contact")}
//                   className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
//                     activeSection === "contact"
//                       ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
//                       : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg ${activeSection === "contact" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
//                       <Phone size={18} className={activeSection === "contact" ? "text-white" : "text-gray-400"} />
//                     </div>
//                     <span>Contact</span>
//                   </div>
//                   {activeSection === "contact" && (
//                     <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
//                   )}
//                 </button>
//               </div>
//             </nav>

//             {/* Quick Actions */}
//             <div className="p-6 border-t border-gray-700">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</p>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   onClick={handleWishlistClick}
//                   className="flex flex-col items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700"
//                 >
//                   <div className="relative">
//                     <Heart size={24} className="text-gray-400" />
//                     {user && wishlist && wishlist.length > 0 && (
//                       <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
//                         {wishlist.length}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-sm font-medium text-gray-300">Wishlist</span>
//                 </button>

//                 <button
//                   onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }}
//                   className="flex flex-col items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700"
//                 >
//                   <div className="relative">
//                     <ShoppingCart size={24} className="text-gray-400" />
//                     {user && cart.length > 0 && (
//                       <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
//                         {cart.reduce((total, item) => total + item.quantity, 0)}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-sm font-medium text-gray-300">Cart</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           {user && (
//             <div className="p-6 border-t border-gray-700">
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-rose-400 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all border border-gray-700"
//               >
//                 <LogOut size={20} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu Backdrop */}
//       {isMobileMenuOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-300"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// }








import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, LogOut, Menu, X, Search, Home, ShoppingBag, Info, Phone } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Menu"]')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/more-products") setActiveSection("shop");
    else if (location.pathname === "/") setActiveSection("home");
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleScroll = () => {
      const features = document.getElementById("features");
      const stats = document.getElementById("stats");
      const scrollY = window.scrollY + 150;
      if (stats && scrollY >= stats.offsetTop) setActiveSection("contact");
      else if (features && scrollY >= features.offsetTop) setActiveSection("about");
      else setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleWishlistClick = () => {
    if (!user) navigate("/login");
    else navigate("/wishlist");
    setIsMobileMenuOpen(false);
  };

  const handleUserClick = () => {
    if (!user) navigate("/login");
    else setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) onSearch(val);
  };

  const scrollToSection = (id) => {
    let sectionId;
    if (id === "about") sectionId = "features";
    else if (id === "contact") sectionId = "stats";
    else sectionId = id;

    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    }
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchTerm("");
      if (onSearch) onSearch("");
    }
  };

  const navLinks = [
    { id: "home", label: "Home", icon: Home, action: handleHomeClick },
    { id: "shop", label: "Shop", icon: ShoppingBag, action: () => { navigate("/more-products"); setIsMobileMenuOpen(false); } },
    { id: "about", label: "About", icon: Info, action: () => scrollToSection("about") },
    { id: "contact", label: "Contact", icon: Phone, action: () => scrollToSection("contact") },
  ];

  const cartCount = user ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const wishlistCount = user && wishlist ? wishlist.length : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .nav-font { font-family: 'Outfit', sans-serif; }
        .brand-font { font-family: 'Bebas Neue', sans-serif; }
        
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          right: 50%;
          height: 2px;
          background: linear-gradient(90deg, #a855f7, #06b6d4);
          border-radius: 999px;
          transition: left 0.3s ease, right 0.3s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-active::after {
          left: 0;
          right: 0;
        }
        .nav-link-active::after {
          left: 0 !important;
          right: 0 !important;
        }

        .icon-btn {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }
        .icon-btn .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          min-width: 18px;
          height: 18px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          border: 2px solid #0f172a;
        }

        .logo-image-ring {
          position: relative;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
        }
        .logo-image-ring::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 12px;
          background: linear-gradient(135deg, #a855f7, #06b6d4);
          z-index: 0;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .logo-image-ring:hover::before { opacity: 1; }
        .logo-image-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-image-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }

        .dropdown-enter {
          animation: dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .mobile-slide {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .search-input {
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
        }
      `}</style>

      <nav
        className={`nav-font fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/[0.06]"
            : "bg-slate-950/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <div
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
              onClick={handleHomeClick}
            >
              {/* Image slot — replace src with your logo */}
              <div className="logo-image-ring">
                <div className="logo-image-inner">
                  
                       <img src="/spot.png" alt="SportX" />
                </div>
              </div>

              {/* Brand text */}
              <div className="flex flex-col leading-none">
                <span
                  className="brand-font text-2xl sm:text-3xl tracking-wider bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent"
                  style={{ lineHeight: 1 }}
                >
                  SPORT-X
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase hidden sm:block mt-0.5">
                  Premium Football Gear
                </span>
              </div>
            </div>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ id, label, icon: Icon, action }) => (
                <button
                  key={id}
                  onClick={action}
                  className={`relative nav-link-underline px-4 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 rounded-lg ${
                    activeSection === id
                      ? "nav-link-active text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">

              {/* Search — only on shop page */}
              {location.pathname === "/more-products" && (
                <div className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className={`search-input h-9 bg-white/5 border border-white/10 rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 ${
                        isSearchExpanded ? "w-44 sm:w-56 opacity-100" : "w-0 opacity-0 pointer-events-none"
                      }`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      onClick={toggleSearch}
                      className={`icon-btn absolute left-0 ${isSearchExpanded ? "bg-purple-600/80 border-purple-500/50" : ""}`}
                    >
                      <Search size={16} className={isSearchExpanded ? "text-white" : "text-gray-400"} />
                    </button>
                  </div>
                </div>
              )}

              {/* Wishlist */}
              <button onClick={handleWishlistClick} className="icon-btn">
                <Heart size={18} className="text-gray-400 hover:text-rose-400 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="badge bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button onClick={() => user ? navigate("/cart") : navigate("/login")} className="icon-btn">
                <ShoppingCart size={18} className="text-gray-400 hover:text-cyan-400 transition-colors" />
                {cartCount > 0 && (
                  <span className="badge bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User — Desktop */}
              {user ? (
                <div className="hidden sm:block relative" ref={dropdownRef}>
                  <button
                    onClick={handleUserClick}
                    className="icon-btn"
                  >
                    <User size={18} className="text-gray-400 hover:text-white transition-colors" />
                  </button>

                  {showDropdown && (
                    <div className="dropdown-enter absolute right-0 mt-2.5 w-56 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden">
                      <div className="px-4 py-3.5 border-b border-white/[0.06] bg-gradient-to-r from-purple-900/30 to-slate-900/30">
                        <p className="text-xs font-semibold text-white">Welcome back</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                      </div>
                      {[
                        { label: "Profile", icon: User, path: "/profile" },
                        { label: "Orders", icon: ShoppingCart, path: "/orders" },
                      ].map(({ label, icon: Icon, path }) => (
                        <button
                          key={path}
                          onClick={() => { navigate(path); setShowDropdown(false); }}
                          className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm border-b border-white/[0.04] gap-3"
                        >
                          <Icon size={14} className="text-gray-500" />
                          {label}
                        </button>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-rose-400 hover:bg-white/5 transition-all text-sm gap-3"
                      >
                        <LogOut size={14} className="text-rose-400" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30"
                >
                  Login
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="icon-btn lg:hidden"
                aria-label="Menu"
              >
                {isMobileMenuOpen
                  ? <X size={18} className="text-gray-400" />
                  : <Menu size={18} className="text-gray-400" />
                }
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        ref={mobileMenuRef}
        className={`mobile-slide lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-[320px] ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col bg-slate-950 border-l border-white/[0.07] shadow-2xl nav-font">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="logo-image-ring" style={{width:36,height:36}}>
                <div className="logo-image-inner" style={{borderRadius:9}}>
                  <span className="text-white font-black text-base" style={{fontFamily:'Bebas Neue, sans-serif'}}>SX</span>
                </div>
              </div>
              <span className="brand-font text-2xl tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                SPORT-X
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="icon-btn" style={{width:34,height:34}}>
              <X size={16} className="text-gray-400" />
            </button>
          </div>

          {/* User section */}
          <div className="px-5 py-4 border-b border-white/[0.06]">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Welcome back!</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all"
              >
                Login to Continue
              </button>
            )}
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navLinks.map(({ id, label, icon: Icon, action }) => (
              <button
                key={id}
                onClick={action}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm font-medium transition-all ${
                  activeSection === id
                    ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-white border border-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeSection === id ? "bg-gradient-to-br from-purple-600 to-indigo-600" : "bg-white/5"
                }`}>
                  <Icon size={15} className={activeSection === id ? "text-white" : "text-gray-400"} />
                </div>
                {label}
                {activeSection === id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                )}
              </button>
            ))}

            {/* Quick actions */}
            {user && (
              <>
                <div className="pt-3 pb-1">
                  <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em] px-4">Account</p>
                </div>
                {[
                  { label: "Profile", icon: User, path: "/profile" },
                  { label: "Orders", icon: ShoppingCart, path: "/orders" },
                ].map(({ label, icon: Icon, path }) => (
                  <button
                    key={path}
                    onClick={() => { navigate(path); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-transparent transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-gray-400" />
                    </div>
                    {label}
                  </button>
                ))}
              </>
            )}
          </nav>

          {/* Bottom actions */}
          <div className="px-4 py-4 border-t border-white/[0.06] space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleWishlistClick}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/[0.07] text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <div className="relative">
                  <Heart size={16} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                Wishlist
              </button>
              <button
                onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/[0.07] text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <div className="relative">
                  <ShoppingCart size={16} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                Cart
              </button>
            </div>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-all"
              >
                <LogOut size={15} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}