





// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Heart, ShoppingCart, User, LogOut } from "lucide-react"; 
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

//   // Scroll listener for home page sections
//   useEffect(() => {
//     if (location.pathname !== "/") return;

//     const handleScroll = () => {
//       const about = document.getElementById("about");
//       const contact = document.getElementById("contact");
//       const scrollY = window.scrollY + 150; 

//       if (contact && scrollY >= contact.offsetTop) {
//         setActiveSection("contact");
//       } else if (about && scrollY >= about.offsetTop) {
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
//   };

//   const handleUserClick = () => {
//     if (!user) navigate("/login");
//     else setShowDropdown(!showDropdown);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     if (onSearch) onSearch(e.target.value);
//   };

//   const scrollToSection = (id) => {
//     if (location.pathname === "/") {
//       const section = document.getElementById(id);
//       section?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById(id);
//         section?.scrollIntoView({ behavior: "smooth" });
//       }, 200);
//     }
//   };

//   const handleHomeClick = () => {
//     if (location.pathname === "/") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       navigate("/");
//     }
//   };

//   const getLinkClass = (section) =>
//     `relative px-4 py-2 font-medium text-sm transition-all duration-300 ${
//       activeSection === section
//         ? "text-slate-900"
//         : "text-slate-600 hover:text-slate-900"
//     }`;

//   const getActiveBorder = (section) =>
//     activeSection === section ? (
//       <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300"></span>
//     ) : null;

//   return (
//     <nav 
//       className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-xl px-6 py-3 flex justify-between items-center transition-all duration-500 ${
//         isScrolled 
//           ? "bg-white/95 backdrop-blur-xl shadow-lg border border-slate-200" 
//           : "bg-white/90 backdrop-blur-md shadow-md border border-slate-100"
//       }`}
//     >
//       {/* Logo */}
//       <div 
//         className="flex items-center gap-3 cursor-pointer group" 
//         onClick={handleHomeClick}
//       >
//         <img
//           src="/images/nav-removebg-preview.png"
//           alt="Logo"
//           className="w-10 h-10 object-cover rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-all duration-300"
//         />
//         <span className="text-2xl font-serif font-light text-slate-900 group-hover:text-slate-600 transition-all duration-300">
//           Sport-X
//         </span>
//       </div>

//       {/* Menu */}
//       <div className="hidden md:flex items-center space-x-1">
//         <button onClick={handleHomeClick} className={getLinkClass("home")}>
//           Home
//           {getActiveBorder("home")}
//         </button>
//         <button onClick={() => navigate("/more-products")} className={getLinkClass("shop")}>
//           Shop
//           {getActiveBorder("shop")}
//         </button>
//         <button onClick={() => scrollToSection("about")} className={getLinkClass("about")}>
//           About
//           {getActiveBorder("about")}
//         </button>
//         <button onClick={() => scrollToSection("contact")} className={getLinkClass("contact")}>
//           Contact
//           {getActiveBorder("contact")}
//         </button>
//       </div>

//       {/* Right icons */}
//       <div className="flex items-center space-x-3">
//         {location.pathname === "/more-products" && (
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="w-32 h-9 pl-4 pr-3 rounded-lg bg-slate-50 text-slate-900 text-sm
//                        focus:w-52 transition-all duration-500 ease-in-out
//                        focus:outline-none focus:ring-2 focus:ring-slate-900
//                        placeholder:text-slate-400 border border-slate-200"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         )}

//         {/* Wishlist */}
//         <button
//           onClick={handleWishlistClick}
//           className="relative p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300"
//         >
//           <Heart 
//             size={20} 
//             className="text-slate-600 hover:text-slate-900 transition-all duration-300" 
//           />
//           {user && wishlist && wishlist.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
//               {wishlist.length}
//             </span>
//           )}
//         </button>

//         {/* Cart */}
//         <button
//           onClick={() => (user ? navigate("/cart") : navigate("/login"))}
//           className="relative p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300"
//         >
//           <ShoppingCart 
//             size={20} 
//             className="text-slate-600 hover:text-slate-900 transition-colors duration-300" 
//           />
//           {user && cart.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
//               {cart.reduce((total, item) => total + item.quantity, 0)}
//             </span>
//           )}
//         </button>

//         {/* User / Login / Logout */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={handleUserClick}
//               className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300"
//             >
//               <User 
//                 size={20} 
//                 className="text-slate-600 hover:text-slate-900 transition-colors duration-300" 
//               />
//             </button>

//             {/* Refined Dropdown */}
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
//                 <button
//                   onClick={() => { navigate("/profile"); setShowDropdown(false); }}
//                   className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={() => { navigate("/orders"); setShowDropdown(false); }}
//                   className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm border-t border-slate-100"
//                 >
//                   Orders
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm border-t border-slate-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="px-5 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 text-sm"
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }
















// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Heart, ShoppingCart, User, LogOut, Menu, X, Search } from "lucide-react"; 
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

//   // Scroll listener for home page sections
//   useEffect(() => {
//     if (location.pathname !== "/") return;

//     const handleScroll = () => {
//       const about = document.getElementById("about");
//       const contact = document.getElementById("contact");
//       const scrollY = window.scrollY + 150; 

//       if (contact && scrollY >= contact.offsetTop) {
//         setActiveSection("contact");
//       } else if (about && scrollY >= about.offsetTop) {
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
//     setSearchTerm(e.target.value);
//     if (onSearch) onSearch(e.target.value);
//   };

//   const scrollToSection = (id) => {
//     if (location.pathname === "/") {
//       const section = document.getElementById(id);
//       section?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById(id);
//         section?.scrollIntoView({ behavior: "smooth" });
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
//     `relative px-4 py-2 font-medium text-sm transition-all duration-300 group ${
//       activeSection === section
//         ? "text-slate-900"
//         : "text-slate-600 hover:text-slate-900"
//     }`;

//   const getMobileLinkClass = (section) =>
//     `block w-full text-left px-6 py-4 font-medium transition-all duration-300 border-l-4 ${
//       activeSection === section
//         ? "text-slate-900 bg-slate-50 border-slate-900"
//         : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50"
//     }`;

//   const getActiveBorder = (section) =>
//     activeSection === section ? (
//       <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300"></span>
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
//       <nav 
//         className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-2xl px-6 py-3 flex justify-between items-center transition-all duration-500 ${
//           isScrolled 
//             ? "bg-white/95 backdrop-blur-xl shadow-2xl border border-slate-200/80" 
//             : "bg-white/90 backdrop-blur-md shadow-lg border border-slate-100"
//         }`}
//       >
//         {/* Logo */}
//         <div 
//           className="flex items-center gap-3 cursor-pointer group" 
//           onClick={handleHomeClick}
//         >
//           <div className="relative">
//             <img
//               src="/images/nav-removebg-preview.png"
//               alt="Logo"
//               className="w-12 h-12 object-cover rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-all duration-300 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-900/10 to-slate-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </div>
//           <span className="text-2xl font-serif font-light text-slate-900 group-hover:text-slate-700 transition-all duration-300 tracking-wide">
//             Sport-X
//           </span>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center space-x-1">
//           <button onClick={handleHomeClick} className={getLinkClass("home")}>
//             <span className="relative z-10">Home</span>
//             {getActiveBorder("home")}
//             <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
//           </button>
//           <button onClick={() => navigate("/more-products")} className={getLinkClass("shop")}>
//             <span className="relative z-10">Shop</span>
//             {getActiveBorder("shop")}
//             <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
//           </button>
//           <button onClick={() => scrollToSection("about")} className={getLinkClass("about")}>
//             <span className="relative z-10">About</span>
//             {getActiveBorder("about")}
//             <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
//           </button>
//           <button onClick={() => scrollToSection("contact")} className={getLinkClass("contact")}>
//             <span className="relative z-10">Contact</span>
//             {getActiveBorder("contact")}
//             <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
//           </button>
//         </div>

//         {/* Right icons */}
//         <div className="flex items-center space-x-3">
//           {/* Search - Desktop */}
//           {location.pathname === "/more-products" && (
//             <div className="hidden md:flex items-center relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className={`h-10 pl-11 pr-4 rounded-xl bg-slate-50 text-slate-900 text-sm transition-all duration-500 ease-out border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 placeholder:text-slate-400 ${
//                   isSearchExpanded ? "w-64 opacity-100" : "w-10 opacity-0"
//                 }`}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               <button
//                 onClick={toggleSearch}
//                 className="absolute left-3 p-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
//               >
//                 <Search size={16} className="text-slate-600" />
//               </button>
//             </div>
//           )}

//           {/* Search - Mobile */}
//           {location.pathname === "/more-products" && (
//             <div className="md:hidden flex items-center relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className={`h-10 pl-11 pr-4 rounded-xl bg-slate-50 text-slate-900 text-sm transition-all duration-500 ease-out border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 placeholder:text-slate-400 ${
//                   isSearchExpanded ? "w-48 opacity-100" : "w-0 opacity-0"
//                 }`}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//               <button
//                 onClick={toggleSearch}
//                 className="absolute left-3 p-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
//               >
//                 <Search size={16} className="text-slate-600" />
//               </button>
//             </div>
//           )}

//           {/* Wishlist */}
//           <button
//             onClick={handleWishlistClick}
//             className="relative p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:scale-105 active:scale-95 group"
//           >
//             <Heart 
//               size={20} 
//               className="text-slate-600 group-hover:text-rose-500 transition-all duration-300" 
//             />
//             {user && wishlist && wishlist.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
//                 {wishlist.length}
//               </span>
//             )}
//           </button>

//           {/* Cart */}
//           <button
//             onClick={() => (user ? navigate("/cart") : navigate("/login"))}
//             className="relative p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:scale-105 active:scale-95 group"
//           >
//             <ShoppingCart 
//               size={20} 
//               className="text-slate-600 group-hover:text-slate-900 transition-colors duration-300" 
//             />
//             {user && cart.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
//                 {cart.reduce((total, item) => total + item.quantity, 0)}
//               </span>
//             )}
//           </button>

//           {/* User / Login / Logout */}
//           {user ? (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={handleUserClick}
//                 className="p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:scale-105 active:scale-95 group"
//               >
//                 <User 
//                   size={20} 
//                   className="text-slate-600 group-hover:text-slate-900 transition-colors duration-300" 
//                 />
//               </button>

//               {/* Enhanced Dropdown */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden backdrop-blur-lg">
//                   <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
//                     <p className="text-sm font-semibold text-slate-900">Welcome back!</p>
//                     <p className="text-xs text-slate-600 truncate">{user.email}</p>
//                   </div>
                  
//                   <button
//                     onClick={() => { navigate("/profile"); setShowDropdown(false); }}
//                     className="flex items-center w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm group"
//                   >
//                     <User size={16} className="mr-3 text-slate-400 group-hover:text-slate-600" />
//                     Profile
//                   </button>
                  
//                   <button
//                     onClick={() => { navigate("/orders"); setShowDropdown(false); }}
//                     className="flex items-center w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm border-t border-slate-100 group"
//                   >
//                     <ShoppingCart size={16} className="mr-3 text-slate-400 group-hover:text-slate-600" />
//                     Orders
//                   </button>
                  
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm border-t border-slate-100 group"
//                   >
//                     <LogOut size={16} className="mr-3 text-slate-400 group-hover:text-rose-500" />
//                     <span className="group-hover:text-rose-600">Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
//             >
//               Login
//             </button>
//           )}

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 border border-slate-200 ml-2"
//             aria-label="Menu"
//           >
//             {isMobileMenuOpen ? (
//               <X size={20} className="text-slate-600" />
//             ) : (
//               <Menu size={20} className="text-slate-600" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div
//         ref={mobileMenuRef}
//         className={`lg:hidden fixed top-24 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 transition-all duration-500 transform ${
//           isMobileMenuOpen
//             ? "translate-y-0 opacity-100 scale-100"
//             : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
//         }`}
//       >
//         <div className="p-2">
//           {/* Mobile Navigation */}
//           <nav className="space-y-1">
//             <button onClick={handleHomeClick} className={getMobileLinkClass("home")}>
//               Home
//             </button>
//             <button onClick={() => { navigate("/more-products"); setIsMobileMenuOpen(false); }} className={getMobileLinkClass("shop")}>
//               Shop
//             </button>
//             <button onClick={() => scrollToSection("about")} className={getMobileLinkClass("about")}>
//               About
//             </button>
//             <button onClick={() => scrollToSection("contact")} className={getMobileLinkClass("contact")}>
//               Contact
//             </button>
//           </nav>

//           {/* Mobile User Section */}
//           <div className="border-t border-slate-200 mt-4 pt-4">
//             {!user ? (
//               <button
//                 onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
//                 className="w-full mx-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-600 transition-all duration-300"
//               >
//                 Login
//               </button>
//             ) : (
//               <div className="space-y-2">
//                 <div className="px-6 py-3 bg-slate-50 rounded-xl mx-2">
//                   <p className="text-sm font-semibold text-slate-900">Welcome!</p>
//                   <p className="text-xs text-slate-600 truncate">{user.email}</p>
//                 </div>
//                 <button
//                   onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
//                   className="w-full text-left px-6 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={() => { navigate("/orders"); setIsMobileMenuOpen(false); }}
//                   className="w-full text-left px-6 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm"
//                 >
//                   Orders
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-6 py-3 text-rose-600 hover:bg-rose-50 transition-all duration-200 font-medium text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Backdrop for mobile menu */}
//       {isMobileMenuOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-all duration-500"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// }



















import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, LogOut, Menu, X, Search, ChevronDown } from "lucide-react"; 
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

  // Close dropdown when clicking outside
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

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active section based on path
  useEffect(() => {
    if (location.pathname === "/more-products") setActiveSection("shop");
    else if (location.pathname === "/") setActiveSection("home");
  }, [location.pathname]);

  // Scroll listener for home page sections
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const about = document.getElementById("about");
      const contact = document.getElementById("contact");
      const scrollY = window.scrollY + 150; 

      if (contact && scrollY >= contact.offsetTop) {
        setActiveSection("contact");
      } else if (about && scrollY >= about.offsetTop) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
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
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setIsMobileMenuOpen(false);
  };

  const getLinkClass = (section) =>
    `relative px-4 py-2 font-medium text-sm transition-all duration-300 ${
      activeSection === section
        ? "text-slate-900"
        : "text-slate-600 hover:text-slate-900"
    }`;

  const getActiveBorder = (section) =>
    activeSection === section ? (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full"></span>
    ) : null;

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchTerm("");
      if (onSearch) onSearch("");
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200" 
            : "bg-white/90 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0" 
              onClick={handleHomeClick}
            >
              <img
                src="/images/nav-removebg-preview.png"
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-all duration-300"
              />
              <span className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-all duration-300">
                Sport-X
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <button onClick={handleHomeClick} className={getLinkClass("home")}>
                Home
                {getActiveBorder("home")}
              </button>
              <button onClick={() => navigate("/more-products")} className={getLinkClass("shop")}>
                Shop
                {getActiveBorder("shop")}
              </button>
              <button onClick={() => scrollToSection("about")} className={getLinkClass("about")}>
                About
                {getActiveBorder("about")}
              </button>
              <button onClick={() => scrollToSection("contact")} className={getLinkClass("contact")}>
                Contact
                {getActiveBorder("contact")}
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              {location.pathname === "/more-products" && (
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className={`h-10 pl-10 pr-4 rounded-lg bg-slate-50 text-slate-900 text-sm transition-all duration-300 border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 placeholder:text-slate-400 ${
                        isSearchExpanded ? "w-48 sm:w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
                      }`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      onClick={toggleSearch}
                      className={`absolute left-0 top-0 h-10 w-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                        isSearchExpanded ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      <Search size={18} className={isSearchExpanded ? "text-white" : "text-slate-600"} />
                    </button>
                  </div>
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={handleWishlistClick}
                className="relative p-2 sm:p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
              >
                <Heart size={20} className="text-slate-600" />
                {user && wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => (user ? navigate("/cart") : navigate("/login"))}
                className="relative p-2 sm:p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
              >
                <ShoppingCart size={20} className="text-slate-600" />
                {user && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* User Dropdown - Desktop */}
              {user ? (
                <div className="hidden sm:block relative" ref={dropdownRef}>
                  <button
                    onClick={handleUserClick}
                    className="p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
                  >
                    <User size={20} className="text-slate-600" />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <p className="text-sm font-semibold text-slate-900">Welcome back!</p>
                        <p className="text-xs text-slate-600 truncate">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                        className="flex items-center w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 text-sm"
                      >
                        <User size={16} className="mr-3 text-slate-400" />
                        Profile
                      </button>
                      
                      <button
                        onClick={() => { navigate("/orders"); setShowDropdown(false); }}
                        className="flex items-center w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 text-sm border-t border-slate-100"
                      >
                        <ShoppingCart size={16} className="mr-3 text-slate-400" />
                        Orders
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-rose-600 hover:bg-rose-50 transition-all duration-200 text-sm border-t border-slate-100"
                      >
                        <LogOut size={16} className="mr-3 text-rose-400" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 text-sm"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-slate-600" />
                ) : (
                  <Menu size={20} className="text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <img
                src="/images/nav-removebg-preview.png"
                alt="Logo"
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="text-xl font-bold text-slate-900">Sport-X</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            {user ? (
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Welcome!</p>
                    <p className="text-xs text-slate-600 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
                    className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all border border-slate-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => { navigate("/orders"); setIsMobileMenuOpen(false); }}
                    className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all border border-slate-200"
                  >
                    Orders
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <button
                  onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                  className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all"
                >
                  Login to Continue
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="p-4">
              <div className="space-y-1">
                <button
                  onClick={handleHomeClick}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeSection === "home"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>Home</span>
                  {activeSection === "home" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>

                <button
                  onClick={() => { navigate("/more-products"); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeSection === "shop"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>Shop</span>
                  {activeSection === "shop" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeSection === "about"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>About</span>
                  {activeSection === "about" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeSection === "contact"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>Contact</span>
                  {activeSection === "contact" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              </div>
            </nav>

            {/* Quick Actions */}
            <div className="p-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWishlistClick}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all"
                >
                  <div className="relative">
                    <Heart size={24} className="text-slate-600" />
                    {user && wishlist && wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700">Wishlist</span>
                </button>

                <button
                  onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all"
                >
                  <div className="relative">
                    <ShoppingCart size={24} className="text-slate-600" />
                    {user && cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700">Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          {user && (
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-lg font-semibold hover:bg-rose-100 transition-all"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}