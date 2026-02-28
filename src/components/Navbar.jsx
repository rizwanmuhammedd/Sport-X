




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Heart, ShoppingCart, User, LogOut, Menu, X, Search, Home, ShoppingBag, Info, Phone } from "lucide-react"; 
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

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (location.pathname === "/more-products") setActiveSection("shop");
//     else if (location.pathname === "/") setActiveSection("home");
//   }, [location.pathname]);

//   useEffect(() => {
//     if (location.pathname !== "/") return;
//     const handleScroll = () => {
//       const features = document.getElementById("features");
//       const stats = document.getElementById("stats");
//       const scrollY = window.scrollY + 150;
//       if (stats && scrollY >= stats.offsetTop) setActiveSection("contact");
//       else if (features && scrollY >= features.offsetTop) setActiveSection("about");
//       else setActiveSection("home");
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

//   const scrollToSection = (id) => {
//     let sectionId;
//     if (id === "about") sectionId = "features";
//     else if (id === "contact") sectionId = "stats";
//     else sectionId = id;

//     if (location.pathname === "/") {
//       const section = document.getElementById(sectionId);
//       if (section) section.scrollIntoView({ behavior: "smooth" });
//       else window.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById(sectionId);
//         if (section) section.scrollIntoView({ behavior: "smooth" });
//         else window.scrollTo({ top: 0, behavior: "smooth" });
//       }, 200);
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const handleHomeClick = () => {
//     if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
//     else navigate("/");
//     setIsMobileMenuOpen(false);
//   };

//   const toggleSearch = () => {
//     setIsSearchExpanded(!isSearchExpanded);
//     if (isSearchExpanded) {
//       setSearchTerm("");
//       if (onSearch) onSearch("");
//     }
//   };

//   const navLinks = [
//     { id: "home", label: "Home", icon: Home, action: handleHomeClick },
//     { id: "shop", label: "Shop", icon: ShoppingBag, action: () => { navigate("/more-products"); setIsMobileMenuOpen(false); } },
//     { id: "about", label: "About", icon: Info, action: () => scrollToSection("about") },
//     { id: "contact", label: "Contact", icon: Phone, action: () => scrollToSection("contact") },
//   ];

//   const cartCount = user ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
//   const wishlistCount = user && wishlist ? wishlist.length : 0;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        
//         .nav-font { font-family: 'Outfit', sans-serif; }
//         .brand-font { font-family: 'Bebas Neue', sans-serif; }
        
//         .nav-link-underline::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 50%;
//           right: 50%;
//           height: 2px;
//           background: linear-gradient(90deg, #a855f7, #06b6d4);
//           border-radius: 999px;
//           transition: left 0.3s ease, right 0.3s ease;
//         }
//         .nav-link-underline:hover::after,
//         .nav-link-active::after {
//           left: 0;
//           right: 0;
//         }
//         .nav-link-active::after {
//           left: 0 !important;
//           right: 0 !important;
//         }

//         .icon-btn {
//           position: relative;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 10px;
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.08);
//           transition: all 0.2s ease;
//           cursor: pointer;
//         }
//         .icon-btn:hover {
//           background: rgba(255,255,255,0.1);
//           border-color: rgba(255,255,255,0.15);
//           transform: translateY(-1px);
//         }
//         .icon-btn .badge {
//           position: absolute;
//           top: -5px;
//           right: -5px;
//           min-width: 18px;
//           height: 18px;
//           border-radius: 999px;
//           font-size: 10px;
//           font-weight: 700;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0 4px;
//           border: 2px solid #0f172a;
//         }

//         .logo-image-ring {
//           position: relative;
//           width: 42px;
//           height: 42px;
//           flex-shrink: 0;
//         }
//         .logo-image-ring::before {
//           content: '';
//           position: absolute;
//           inset: -2px;
//           border-radius: 12px;
//           background: linear-gradient(135deg, #a855f7, #06b6d4);
//           z-index: 0;
//           opacity: 0.7;
//           transition: opacity 0.3s;
//         }
//         .logo-image-ring:hover::before { opacity: 1; }
//         .logo-image-inner {
//           position: relative;
//           z-index: 1;
//           width: 100%;
//           height: 100%;
//           border-radius: 10px;
//           overflow: hidden;
//           background: linear-gradient(135deg, #7c3aed, #4f46e5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .logo-image-inner img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           border-radius: 10px;
//         }

//         .dropdown-enter {
//           animation: dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
//         }
//         @keyframes dropIn {
//           from { opacity: 0; transform: translateY(-8px) scale(0.97); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .mobile-slide {
//           transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         .search-input {
//           transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
//         }
//       `}</style>

//       <nav
//         className={`nav-font fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled
//             ? "bg-slate-950/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/[0.06]"
//             : "bg-slate-950/80 backdrop-blur-md"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
//           <div className="flex items-center justify-between h-16">

//             {/* ── Logo ── */}
//             <div
//               className="flex items-center cursor-pointer group flex-shrink-0"
//               onClick={handleHomeClick}
//             >
//               <div className="flex flex-col leading-none">
//                 <span
//                   className="brand-font text-2xl sm:text-3xl tracking-wider bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent"
//                   style={{ lineHeight: 1 }}
//                 >
//                   SPORT-X
//                 </span>
//                 <span className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase hidden sm:block mt-0.5">
//                   Premium Football Gear
//                 </span>
//               </div>
//             </div>

//             {/* ── Desktop Nav ── */}
//             <div className="hidden lg:flex items-center gap-1">
//               {navLinks.map(({ id, label, icon: Icon, action }) => (
//                 <button
//                   key={id}
//                   onClick={action}
//                   className={`relative nav-link-underline px-4 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 rounded-lg ${
//                     activeSection === id
//                       ? "nav-link-active text-white"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   <Icon size={14} strokeWidth={2} />
//                   {label}
//                 </button>
//               ))}
//             </div>

//             {/* ── Right Actions ── */}
//             <div className="flex items-center gap-2">

//               {/* Search — only on shop page */}
//               {location.pathname === "/more-products" && (
//                 <div className="flex items-center">
//                   <div className="relative flex items-center">
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       className={`search-input h-9 bg-white/5 border border-white/10 rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 ${
//                         isSearchExpanded ? "w-44 sm:w-56 opacity-100" : "w-0 opacity-0 pointer-events-none"
//                       }`}
//                       value={searchTerm}
//                       onChange={handleSearchChange}
//                     />
//                     <button
//                       onClick={toggleSearch}
//                       className={`icon-btn absolute left-0 ${isSearchExpanded ? "bg-purple-600/80 border-purple-500/50" : ""}`}
//                     >
//                       <Search size={16} className={isSearchExpanded ? "text-white" : "text-gray-400"} />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Wishlist */}
//               <button onClick={handleWishlistClick} className="icon-btn">
//                 <Heart size={18} className="text-gray-400 hover:text-rose-400 transition-colors" />
//                 {wishlistCount > 0 && (
//                   <span className="badge bg-gradient-to-r from-rose-500 to-pink-500 text-white">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </button>

//               {/* Cart */}
//               <button onClick={() => user ? navigate("/cart") : navigate("/login")} className="icon-btn">
//                 <ShoppingCart size={18} className="text-gray-400 hover:text-cyan-400 transition-colors" />
//                 {cartCount > 0 && (
//                   <span className="badge bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>

//               {/* User — Desktop */}
//               {user ? (
//                 <div className="hidden sm:block relative" ref={dropdownRef}>
//                   <button
//                     onClick={handleUserClick}
//                     className="icon-btn"
//                   >
//                     <User size={18} className="text-gray-400 hover:text-white transition-colors" />
//                   </button>

//                   {showDropdown && (
//                     <div className="dropdown-enter absolute right-0 mt-2.5 w-56 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden">
//                       <div className="px-4 py-3.5 border-b border-white/[0.06] bg-gradient-to-r from-purple-900/30 to-slate-900/30">
//                         <p className="text-xs font-semibold text-white">Welcome back</p>
//                         <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
//                       </div>
//                       {[
//                         { label: "Profile", icon: User, path: "/profile" },
//                         { label: "Orders", icon: ShoppingCart, path: "/orders" },
//                       ].map(({ label, icon: Icon, path }) => (
//                         <button
//                           key={path}
//                           onClick={() => { navigate(path); setShowDropdown(false); }}
//                           className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm border-b border-white/[0.04] gap-3"
//                         >
//                           <Icon size={14} className="text-gray-500" />
//                           {label}
//                         </button>
//                       ))}
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full px-4 py-3 text-rose-400 hover:bg-white/5 transition-all text-sm gap-3"
//                       >
//                         <LogOut size={14} className="text-rose-400" />
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30"
//                 >
//                   Login
//                 </button>
//               )}

//               {/* Mobile menu toggle */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="icon-btn lg:hidden"
//                 aria-label="Menu"
//               >
//                 {isMobileMenuOpen
//                   ? <X size={18} className="text-gray-400" />
//                   : <Menu size={18} className="text-gray-400" />
//                 }
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* ── Mobile Menu ── */}
//       <div
//         ref={mobileMenuRef}
//         className={`mobile-slide lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-[320px] ${
//           isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-full flex flex-col bg-slate-950 border-l border-white/[0.07] shadow-2xl nav-font">
          
//           {/* Header */}
//           <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
//             <span className="brand-font text-2xl tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//               SPORT-X
//             </span>
//             <button onClick={() => setIsMobileMenuOpen(false)} className="icon-btn" style={{width:34,height:34}}>
//               <X size={16} className="text-gray-400" />
//             </button>
//           </div>

//           {/* User section */}
//           <div className="px-5 py-4 border-b border-white/[0.06]">
//             {user ? (
//               <div className="flex items-center gap-3">
//                 <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
//                   <User size={18} className="text-white" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-white">Welcome back!</p>
//                   <p className="text-xs text-gray-400 truncate">{user.email}</p>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
//                 className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-purple-500 hover:to-indigo-500 transition-all"
//               >
//                 Login to Continue
//               </button>
//             )}
//           </div>

//           {/* Nav links */}
//           <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
//             {navLinks.map(({ id, label, icon: Icon, action }) => (
//               <button
//                 key={id}
//                 onClick={action}
//                 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm font-medium transition-all ${
//                   activeSection === id
//                     ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-white border border-purple-500/20"
//                     : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
//                 }`}
//               >
//                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                   activeSection === id ? "bg-gradient-to-br from-purple-600 to-indigo-600" : "bg-white/5"
//                 }`}>
//                   <Icon size={15} className={activeSection === id ? "text-white" : "text-gray-400"} />
//                 </div>
//                 {label}
//                 {activeSection === id && (
//                   <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
//                 )}
//               </button>
//             ))}

//             {/* Quick actions */}
//             {user && (
//               <>
//                 <div className="pt-3 pb-1">
//                   <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.15em] px-4">Account</p>
//                 </div>
//                 {[
//                   { label: "Profile", icon: User, path: "/profile" },
//                   { label: "Orders", icon: ShoppingCart, path: "/orders" },
//                 ].map(({ label, icon: Icon, path }) => (
//                   <button
//                     key={path}
//                     onClick={() => { navigate(path); setIsMobileMenuOpen(false); }}
//                     className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-transparent transition-all"
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
//                       <Icon size={15} className="text-gray-400" />
//                     </div>
//                     {label}
//                   </button>
//                 ))}
//               </>
//             )}
//           </nav>

//           {/* Bottom actions */}
//           <div className="px-4 py-4 border-t border-white/[0.06] space-y-2">
//             <div className="grid grid-cols-2 gap-2">
//               <button
//                 onClick={handleWishlistClick}
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/[0.07] text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
//               >
//                 <div className="relative">
//                   <Heart size={16} />
//                   {wishlistCount > 0 && (
//                     <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </div>
//                 Wishlist
//               </button>
//               <button
//                 onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }}
//                 className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/[0.07] text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
//               >
//                 <div className="relative">
//                   <ShoppingCart size={16} />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   )}
//                 </div>
//                 Cart
//               </button>
//             </div>

//             {user && (
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-all"
//               >
//                 <LogOut size={15} />
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Backdrop */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
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
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

        :root {
          --black: #000000;
          --white: #ffffff;
          --off-white: #e8e8e8;
          --mid-grey: #999999;
          --dark-grey: #1a1a1a;
          --border: #222222;
          --border-light: #2e2e2e;
          --accent: #ffffff;
        }

        .iLU-nav { font-family: 'Barlow', sans-serif; }
        .iLU-brand { font-family: 'Barlow Condensed', sans-serif; }

        /* Announcement bar */
        .announcement-bar {
          background: var(--white);
          color: var(--black);
          text-align: center;
          padding: 8px 16px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        /* Nav link style */
        .iLU-navlink {
          position: relative;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--mid-grey);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.15s ease;
        }
        .iLU-navlink::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--white);
          transition: width 0.2s ease;
        }
        .iLU-navlink:hover { color: var(--white); }
        .iLU-navlink:hover::after { width: 100%; }
        .iLU-navlink.active { color: var(--white); }
        .iLU-navlink.active::after { width: 100%; }

        /* Icon buttons */
        .iLU-iconbtn {
          position: relative;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--mid-grey);
          transition: color 0.15s ease;
        }
        .iLU-iconbtn:hover { color: var(--white); }

        .iLU-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          min-width: 16px;
          height: 16px;
          border-radius: 0;
          font-size: 9px;
          font-weight: 800;
          font-family: 'Barlow Condensed', sans-serif;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          background: var(--white);
          color: var(--black);
        }

        /* Dropdown */
        .iLU-dropdown {
          animation: iLUdropIn 0.18s ease;
          position: absolute;
          right: 0;
          top: calc(100% + 12px);
          width: 220px;
          background: var(--black);
          border: 1px solid var(--border-light);
        }
        @keyframes iLUdropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .iLU-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--mid-grey);
          border-bottom: 1px solid var(--border);
          transition: color 0.15s, background 0.15s;
          text-align: left;
        }
        .iLU-dropdown-item:last-child { border-bottom: none; }
        .iLU-dropdown-item:hover { color: var(--white); background: var(--dark-grey); }
        .iLU-dropdown-item.logout { color: #888; }
        .iLU-dropdown-item.logout:hover { color: #ff4444; }

        /* Login button */
        .iLU-loginbtn {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--black);
          background: var(--white);
          border: none;
          cursor: pointer;
          padding: 8px 18px;
          transition: background 0.15s, color 0.15s;
        }
        .iLU-loginbtn:hover { background: var(--off-white); }

        /* Search */
        .iLU-search {
          height: 36px;
          background: var(--dark-grey);
          border: 1px solid var(--border-light);
          border-radius: 0;
          color: var(--white);
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          letter-spacing: 0.05em;
          padding: 0 12px 0 36px;
          outline: none;
          transition: width 0.3s ease, opacity 0.2s ease;
        }
        .iLU-search::placeholder { color: #555; }
        .iLU-search:focus { border-color: #444; }

        /* Mobile slide */
        .iLU-mobile-slide {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Mobile nav link */
        .iLU-mobile-navlink {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 14px 20px;
          background: none;
          border: none;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: left;
          transition: background 0.15s, color 0.15s;
        }
        .iLU-mobile-navlink:hover { background: var(--dark-grey); color: var(--white); }
        .iLU-mobile-navlink.active { color: var(--white); background: var(--dark-grey); }
        .iLU-mobile-navlink.inactive { color: var(--mid-grey); }

        /* Divider label */
        .iLU-section-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #444;
          padding: 12px 20px 6px;
        }

        /* Mobile action btn */
        .iLU-mobile-action {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px;
          background: none;
          border: 1px solid var(--border-light);
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--mid-grey);
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .iLU-mobile-action:hover { color: var(--white); border-color: #444; background: var(--dark-grey); }
      `}</style>

      {/* Announcement Bar */}
      <div className="announcement-bar">
        Free shipping on orders over $150 &nbsp;·&nbsp; New season drop now live
      </div>

      <nav
        className={`iLU-nav fixed left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-black border-b border-[#222] shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
            : "bg-black border-b border-[#1a1a1a]"
        }`}
        style={{ top: 0 }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* ── Logo ── */}
            <div
              className="flex items-center cursor-pointer flex-shrink-0"
              onClick={handleHomeClick}
            >
              <div className="flex flex-col leading-none">
                <span
                  className="iLU-brand text-[26px] sm:text-[30px] font-900 tracking-[0.08em] text-white uppercase"
                  style={{ lineHeight: 1 }}
                >
                  SPORT-X
                </span>
                <span
                  className="iLU-brand text-[9px] tracking-[0.3em] uppercase hidden sm:block mt-0.5"
                  style={{ color: '#555', lineHeight: 1 }}
                >
                  Premium Football Gear
                </span>
              </div>
            </div>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(({ id, label, action }) => (
                <button
                  key={id}
                  onClick={action}
                  className={`iLU-navlink ${activeSection === id ? "active" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1">

              {/* Search — only on shop page */}
              {location.pathname === "/more-products" && (
                <div className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search..."
                      className={`iLU-search ${
                        isSearchExpanded ? "w-40 sm:w-52 opacity-100" : "w-0 opacity-0 pointer-events-none"
                      }`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      onClick={toggleSearch}
                      className="iLU-iconbtn absolute left-0"
                      style={isSearchExpanded ? { color: '#fff' } : {}}
                    >
                      <Search size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )}

              {/* Search icon when NOT on shop page */}
              {location.pathname !== "/more-products" && (
                <button className="iLU-iconbtn hidden lg:flex" onClick={() => navigate("/more-products")}>
                  <Search size={16} strokeWidth={1.5} />
                </button>
              )}

              {/* Wishlist */}
              <button onClick={handleWishlistClick} className="iLU-iconbtn">
                <Heart size={17} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="iLU-badge">{wishlistCount}</span>
                )}
              </button>

              {/* Cart */}
              <button onClick={() => user ? navigate("/cart") : navigate("/login")} className="iLU-iconbtn">
                <ShoppingCart size={17} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="iLU-badge">{cartCount}</span>
                )}
              </button>

              {/* User — Desktop */}
              {user ? (
                <div className="hidden sm:block relative" ref={dropdownRef}>
                  <button onClick={handleUserClick} className="iLU-iconbtn">
                    <User size={17} strokeWidth={1.5} />
                  </button>

                  {showDropdown && (
                    <div className="iLU-dropdown">
                      <div style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #222',
                        background: '#0d0d0d'
                      }}>
                        <p style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#555',
                          marginBottom: 2
                        }}>Signed in as</p>
                        <p style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: 12,
                          color: '#999',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{user.email}</p>
                      </div>
                      {[
                        { label: "Profile", icon: User, path: "/profile" },
                        { label: "My Orders", icon: ShoppingCart, path: "/orders" },
                      ].map(({ label, icon: Icon, path }) => (
                        <button
                          key={path}
                          onClick={() => { navigate(path); setShowDropdown(false); }}
                          className="iLU-dropdown-item"
                        >
                          <Icon size={13} strokeWidth={1.5} />
                          {label}
                        </button>
                      ))}
                      <button onClick={handleLogout} className="iLU-dropdown-item logout">
                        <LogOut size={13} strokeWidth={1.5} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="iLU-loginbtn hidden sm:flex items-center"
                >
                  Login
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="iLU-iconbtn lg:hidden"
                aria-label="Menu"
              >
                {isMobileMenuOpen
                  ? <X size={18} strokeWidth={1.5} />
                  : <Menu size={18} strokeWidth={1.5} />
                }
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to push content below fixed nav + announcement bar */}
      <div style={{ height: '92px' }} />

      {/* ── Mobile Menu ── */}
      <div
        ref={mobileMenuRef}
        className={`iLU-mobile-slide lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-[300px] ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col iLU-nav" style={{ background: '#000', borderLeft: '1px solid #222' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #222' }}>
            <span className="iLU-brand text-[22px] font-900 tracking-[0.08em] text-white uppercase">
              SPORT-X
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="iLU-iconbtn" style={{ width: 32, height: 32 }}>
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* User section */}
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #222' }}>
            {user ? (
              <div className="flex items-center gap-3">
                <div style={{
                  width: 36,
                  height: 36,
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <User size={16} strokeWidth={1.5} color="#999" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    marginBottom: 2
                  }}>Welcome back</p>
                  <p style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 11,
                    color: '#555',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>{user.email}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                className="iLU-loginbtn w-full"
                style={{ width: '100%', padding: '11px 18px' }}
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto">
            {navLinks.map(({ id, label, icon: Icon, action }) => (
              <button
                key={id}
                onClick={action}
                className={`iLU-mobile-navlink ${activeSection === id ? "active" : "inactive"}`}
              >
                <Icon size={14} strokeWidth={1.5} />
                {label}
                {activeSection === id && (
                  <div style={{ marginLeft: 'auto', width: 4, height: 4, background: '#fff' }} />
                )}
              </button>
            ))}

            {/* Account section */}
            {user && (
              <>
                <div className="iLU-section-label">Account</div>
                {[
                  { label: "Profile", icon: User, path: "/profile" },
                  { label: "My Orders", icon: ShoppingCart, path: "/orders" },
                ].map(({ label, icon: Icon, path }) => (
                  <button
                    key={path}
                    onClick={() => { navigate(path); setIsMobileMenuOpen(false); }}
                    className="iLU-mobile-navlink inactive"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {label}
                  </button>
                ))}
              </>
            )}
          </nav>

          {/* Bottom actions */}
          <div className="px-4 py-4" style={{ borderTop: '1px solid #222' }}>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button onClick={handleWishlistClick} className="iLU-mobile-action">
                <div className="relative">
                  <Heart size={15} strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 14, height: 14,
                      background: '#fff', color: '#000',
                      fontSize: 8, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Barlow Condensed', sans-serif"
                    }}>{wishlistCount}</span>
                  )}
                </div>
                Wishlist
              </button>
              <button
                onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }}
                className="iLU-mobile-action"
              >
                <div className="relative">
                  <ShoppingCart size={15} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 14, height: 14,
                      background: '#fff', color: '#000',
                      fontSize: 8, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Barlow Condensed', sans-serif"
                    }}>{cartCount}</span>
                  )}
                </div>
                Cart
              </button>
            </div>

            {user && (
              <button
                onClick={handleLogout}
                className="iLU-mobile-action w-full"
                style={{ width: '100%', color: '#666', borderColor: '#2a2a2a' }}
              >
                <LogOut size={14} strokeWidth={1.5} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}