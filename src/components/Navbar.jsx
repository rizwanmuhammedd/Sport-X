




// import { searchProducts } from "../Api/productApi";
// import SearchResults from "./SearchResults";


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Heart, ShoppingCart, User, LogOut, Menu, X, Search, ChevronDown } from "lucide-react"; 
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

// const handleSearchChange = (e) => {
//   const val = e.target.value;
//   setSearchTerm(val);
//   onSearch(val);          // <-- THIS WAS MISSING (MOST IMPORTANT)
// };



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
//     `relative px-4 py-2 font-medium text-sm transition-all duration-300 ${
//       activeSection === section
//         ? "text-slate-900"
//         : "text-slate-600 hover:text-slate-900"
//     }`;

//   const getActiveBorder = (section) =>
//     activeSection === section ? (
//       <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full"></span>
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
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled 
//             ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200" 
//             : "bg-white/90 backdrop-blur-md shadow-sm"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div 
//               className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0" 
//               onClick={handleHomeClick}
//             >
//               <img
//                 src="/images/nav-removebg-preview.png"
//                 alt="Logo"
//                 className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-all duration-300"
//               />
//               <span className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-all duration-300">
//                 Sport-X
//               </span>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex items-center space-x-1">
//               <button onClick={handleHomeClick} className={getLinkClass("home")}>
//                 Home
//                 {getActiveBorder("home")}
//               </button>
//               <button onClick={() => navigate("/more-products")} className={getLinkClass("shop")}>
//                 Shop
//                 {getActiveBorder("shop")}
//               </button>
//               <button onClick={() => scrollToSection("about")} className={getLinkClass("about")}>
//                 About
//                 {getActiveBorder("about")}
//               </button>
//               <button onClick={() => scrollToSection("contact")} className={getLinkClass("contact")}>
//                 Contact
//                 {getActiveBorder("contact")}
//               </button>
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-2 sm:gap-3">
//               {/* Search */}
//               {location.pathname === "/more-products" && (
//   <div className="flex items-center relative">
//     <div className="relative w-full">

//       <input
//         type="text"
//         placeholder="Search products..."
//         className={`h-10 pl-10 pr-4 rounded-lg bg-slate-50 text-slate-900 text-sm transition-all duration-300 border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 placeholder:text-slate-400 ${
//           isSearchExpanded
//             ? "w-48 sm:w-64 opacity-100"
//             : "w-0 opacity-0 pointer-events-none"
//         }`}
//         value={searchTerm}
//         onChange={handleSearchChange}
//         onFocus={() => searchTerm && setShowResults(true)}
//       />

//       <button
//         onClick={toggleSearch}
//         className={`absolute left-0 top-0 h-10 w-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
//           isSearchExpanded
//             ? "bg-slate-900 hover:bg-slate-800"
//             : "bg-slate-100 hover:bg-slate-200"
//         }`}
//       >
//         <Search size={18} className={isSearchExpanded ? "text-white" : "text-slate-600"} />
//       </button>

   

//     </div>
//   </div>
// )}


//               {/* Wishlist */}
//               <button
//                 onClick={handleWishlistClick}
//                 className="relative p-2 sm:p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
//               >
//                 <Heart size={20} className="text-slate-600" />
//                 {user && wishlist && wishlist.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                     {wishlist.length}
//                   </span>
//                 )}
//               </button>

//               {/* Cart */}
//               <button
//                 onClick={() => (user ? navigate("/cart") : navigate("/login"))}
//                 className="relative p-2 sm:p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
//               >
//                 <ShoppingCart size={20} className="text-slate-600" />
//                 {user && cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                     {cart.reduce((total, item) => total + item.quantity, 0)}
//                   </span>
//                 )}
//               </button>

//               {/* User Dropdown - Desktop */}
//               {user ? (
//                 <div className="hidden sm:block relative" ref={dropdownRef}>
//                   <button
//                     onClick={handleUserClick}
//                     className="p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
//                   >
//                     <User size={20} className="text-slate-600" />
//                   </button>

//                   {showDropdown && (
//                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
//                       <div className="p-4 border-b border-slate-100 bg-slate-50">
//                         <p className="text-sm font-semibold text-slate-900">Welcome back!</p>
//                         <p className="text-xs text-slate-600 truncate">{user.email}</p>
//                       </div>
                      
//                       <button
//                         onClick={() => { navigate("/profile"); setShowDropdown(false); }}
//                         className="flex items-center w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 text-sm"
//                       >
//                         <User size={16} className="mr-3 text-slate-400" />
//                         Profile
//                       </button>
                      
//                       <button
//                         onClick={() => { navigate("/orders"); setShowDropdown(false); }}
//                         className="flex items-center w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 transition-all duration-200 text-sm border-t border-slate-100"
//                       >
//                         <ShoppingCart size={16} className="mr-3 text-slate-400" />
//                         Orders
//                       </button>
                      
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full text-left px-4 py-3 text-rose-600 hover:bg-rose-50 transition-all duration-200 text-sm border-t border-slate-100"
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
//                   className="hidden sm:block px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 text-sm"
//                 >
//                   Login
//                 </button>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="lg:hidden p-2 sm:p-2.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-300"
//                 aria-label="Menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <X size={20} className="text-slate-600" />
//                 ) : (
//                   <Menu size={20} className="text-slate-600" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Slide Menu */}
//       <div
//         className={`lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
//           isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           {/* Mobile Menu Header */}
//           <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
//             <div className="flex items-center gap-2">
//               <img
//                 src="/images/nav-removebg-preview.png"
//                 alt="Logo"
//                 className="w-10 h-10 object-cover rounded-full"
//               />
//               <span className="text-xl font-bold text-slate-900">Sport-X</span>
//             </div>
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all"
//             >
//               <X size={20} className="text-slate-600" />
//             </button>
//           </div>

//           {/* Mobile Menu Content */}
//           <div className="flex-1 overflow-y-auto">
//             {/* User Section */}
//             {user ? (
//               <div className="p-4 bg-slate-50 border-b border-slate-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
//                     <User size={24} className="text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-semibold text-slate-900">Welcome!</p>
//                     <p className="text-xs text-slate-600 truncate">{user.email}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
//                     className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all border border-slate-200"
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => { navigate("/orders"); setIsMobileMenuOpen(false); }}
//                     className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all border border-slate-200"
//                   >
//                     Orders
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-4 bg-slate-50 border-b border-slate-200">
//                 <button
//                   onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
//                   className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all"
//                 >
//                   Login to Continue
//                 </button>
//               </div>
//             )}

//             {/* Navigation Links */}
//             <nav className="p-4">
//               <div className="space-y-1">
//                 <button
//                   onClick={handleHomeClick}
//                   className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
//                     activeSection === "home"
//                       ? "bg-slate-900 text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}
//                 >
//                   <span>Home</span>
//                   {activeSection === "home" && (
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   )}
//                 </button>

//                 <button
//                   onClick={() => { navigate("/more-products"); setIsMobileMenuOpen(false); }}
//                   className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
//                     activeSection === "shop"
//                       ? "bg-slate-900 text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}
//                 >
//                   <span>Shop</span>
//                   {activeSection === "shop" && (
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   )}
//                 </button>

//                 <button
//                   onClick={() => scrollToSection("about")}
//                   className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
//                     activeSection === "about"
//                       ? "bg-slate-900 text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}
//                 >
//                   <span>About</span>
//                   {activeSection === "about" && (
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   )}
//                 </button>

//                 <button
//                   onClick={() => scrollToSection("contact")}
//                   className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all ${
//                     activeSection === "contact"
//                       ? "bg-slate-900 text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}
//                 >
//                   <span>Contact</span>
//                   {activeSection === "contact" && (
//                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                   )}
//                 </button>
//               </div>
//             </nav>

//             {/* Quick Actions */}
//             <div className="p-4 border-t border-slate-200">
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</p>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   onClick={handleWishlistClick}
//                   className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all"
//                 >
//                   <div className="relative">
//                     <Heart size={24} className="text-slate-600" />
//                     {user && wishlist && wishlist.length > 0 && (
//                       <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                         {wishlist.length}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-sm font-medium text-slate-700">Wishlist</span>
//                 </button>

//                 <button
//                   onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }}
//                   className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all"
//                 >
//                   <div className="relative">
//                     <ShoppingCart size={24} className="text-slate-600" />
//                     {user && cart.length > 0 && (
//                       <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                         {cart.reduce((total, item) => total + item.quantity, 0)}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-sm font-medium text-slate-700">Cart</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           {user && (
//             <div className="p-4 border-t border-slate-200">
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-lg font-semibold hover:bg-rose-100 transition-all"
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
//           className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// }





import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, LogOut, Menu, X, Search, ChevronDown, Home, ShoppingBag, Info, Phone } from "lucide-react"; 
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

  // Scroll listener for home page sections - UPDATED
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const features = document.getElementById("features"); // Using features as "about"
      const stats = document.getElementById("stats"); // Using stats as "contact"
      const scrollY = window.scrollY + 150; 

      if (stats && scrollY >= stats.offsetTop) {
        setActiveSection("contact");
      } else if (features && scrollY >= features.offsetTop) {
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
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) onSearch(val);
  };

  // UPDATED scrollToSection function
  const scrollToSection = (id) => {
    // Map the nav IDs to your actual section IDs in Home page
    let sectionId;
    if (id === "about") {
      sectionId = "features"; // Your Home page has "features" section
    } else if (id === "contact") {
      sectionId = "stats"; // Your Home page has "stats" section
    } else {
      sectionId = id;
    }

    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        // If section doesn't exist, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
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
    `relative px-4 py-2 font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
      activeSection === section
        ? "text-white"
        : "text-gray-400 hover:text-white"
    }`;

  const getActiveBorder = (section) =>
    activeSection === section ? (
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></span>
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800" 
            : "bg-gray-900/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0" 
              onClick={handleHomeClick}
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                  <span className="text-white font-bold text-lg">SX</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
                  Sport-X
                </span>
                <span className="text-xs text-gray-400 hidden sm:block">Premium Football Gear</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <button onClick={handleHomeClick} className={getLinkClass("home")}>
                <Home size={16} />
                Home
                {getActiveBorder("home")}
              </button>
              <button onClick={() => navigate("/more-products")} className={getLinkClass("shop")}>
                <ShoppingBag size={16} />
                Shop
                {getActiveBorder("shop")}
              </button>
              <button onClick={() => scrollToSection("about")} className={getLinkClass("about")}>
                <Info size={16} />
                About
                {getActiveBorder("about")}
              </button>
              <button onClick={() => scrollToSection("contact")} className={getLinkClass("contact")}>
                <Phone size={16} />
                Contact
                {getActiveBorder("contact")}
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              {location.pathname === "/more-products" && (
                <div className="flex items-center relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className={`h-10 pl-10 pr-4 rounded-lg bg-gray-800/50 backdrop-blur-sm text-white text-sm transition-all duration-300 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-gray-500 ${
                        isSearchExpanded
                          ? "w-48 sm:w-64 opacity-100"
                          : "w-0 opacity-0 pointer-events-none"
                      }`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button
                      onClick={toggleSearch}
                      className={`absolute left-0 top-0 h-10 w-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                        isSearchExpanded
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                          : "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
                      }`}
                    >
                      <Search size={18} className={isSearchExpanded ? "text-white" : "text-gray-400"} />
                    </button>
                  </div>
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={handleWishlistClick}
                className="relative p-2 sm:p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
              >
                <Heart size={20} className="text-gray-400 group-hover:text-rose-400 transition-colors" />
                {user && wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => (user ? navigate("/cart") : navigate("/login"))}
                className="relative p-2 sm:p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
              >
                <ShoppingCart size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                {user && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* User Dropdown - Desktop */}
              {user ? (
                <div className="hidden sm:block relative" ref={dropdownRef}>
                  <button
                    onClick={handleUserClick}
                    className="p-2.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
                  >
                    <User size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                      <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
                        <p className="text-sm font-semibold text-white">Welcome back!</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                        className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-200 text-sm border-b border-gray-700"
                      >
                        <User size={16} className="mr-3 text-gray-400" />
                        Profile
                      </button>
                      
                      <button
                        onClick={() => { navigate("/orders"); setShowDropdown(false); }}
                        className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-200 text-sm border-b border-gray-700"
                      >
                        <ShoppingCart size={16} className="mr-3 text-gray-400" />
                        Orders
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-rose-400 hover:bg-gray-700/50 transition-all duration-200 text-sm"
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
                  className="hidden sm:block px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm shadow-lg hover:shadow-purple-500/20"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-gray-400" />
                ) : (
                  <Menu size={20} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-l border-gray-700">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SX</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Sport-X
                </span>
                <span className="text-xs text-gray-400">Premium Football Gear</span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            {user ? (
              <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Welcome!</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
                    className="px-4 py-3 bg-gray-800/50 text-white rounded-lg text-sm font-medium hover:bg-gray-700/50 transition-all border border-gray-700 backdrop-blur-sm"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => { navigate("/orders"); setIsMobileMenuOpen(false); }}
                    className="px-4 py-3 bg-gray-800/50 text-white rounded-lg text-sm font-medium hover:bg-gray-700/50 transition-all border border-gray-700 backdrop-blur-sm"
                  >
                    Orders
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                <button
                  onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  Login to Continue
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="p-6">
              <div className="space-y-2">
                <button
                  onClick={handleHomeClick}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
                    activeSection === "home"
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeSection === "home" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
                      <Home size={18} className={activeSection === "home" ? "text-white" : "text-gray-400"} />
                    </div>
                    <span>Home</span>
                  </div>
                  {activeSection === "home" && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  )}
                </button>

                <button
                  onClick={() => { navigate("/more-products"); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
                    activeSection === "shop"
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeSection === "shop" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
                      <ShoppingBag size={18} className={activeSection === "shop" ? "text-white" : "text-gray-400"} />
                    </div>
                    <span>Shop</span>
                  </div>
                  {activeSection === "shop" && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  )}
                </button>

                <button
                  onClick={() => scrollToSection("about")}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
                    activeSection === "about"
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeSection === "about" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
                      <Info size={18} className={activeSection === "about" ? "text-white" : "text-gray-400"} />
                    </div>
                    <span>About</span>
                  </div>
                  {activeSection === "about" && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  )}
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left font-medium transition-all ${
                    activeSection === "contact"
                      ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${activeSection === "contact" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-800"}`}>
                      <Phone size={18} className={activeSection === "contact" ? "text-white" : "text-gray-400"} />
                    </div>
                    <span>Contact</span>
                  </div>
                  {activeSection === "contact" && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                  )}
                </button>
              </div>
            </nav>

            {/* Quick Actions */}
            <div className="p-6 border-t border-gray-700">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWishlistClick}
                  className="flex flex-col items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700"
                >
                  <div className="relative">
                    <Heart size={24} className="text-gray-400" />
                    {user && wishlist && wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-300">Wishlist</span>
                </button>

                <button
                  onClick={() => { user ? navigate("/cart") : navigate("/login"); setIsMobileMenuOpen(false); }}
                  className="flex flex-col items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all border border-gray-700"
                >
                  <div className="relative">
                    <ShoppingCart size={24} className="text-gray-400" />
                    {user && cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                        {cart.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-300">Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          {user && (
            <div className="p-6 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-rose-400 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all border border-gray-700"
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
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}