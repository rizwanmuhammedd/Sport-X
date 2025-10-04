



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
//   const [showDropdown, setShowDropdown] = useState(false); // for profile dropdown

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
//     `hover:text-sky-500 transition font-medium ${
//       activeSection === section
//         ? "text-sky-600 underline underline-offset-8 decoration-4"
//         : "text-gray-700"
//     }`;

//   return (
//     <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 bg-white/90 backdrop-blur-md rounded-full px-8 py-3 flex justify-between items-center shadow-lg shadow-sky-400/30 transition-all duration-500">
//       {/* Logo */}
//       <div className="flex items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
//         <img
//           src="/images/nav-removebg-preview.png"
//           alt="Logo"
//           className="w-10 h-10 object-cover rounded-full shadow-md"
//         />
//         <span className="text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text">
//           Sport-X
//         </span>
//       </div>

//       {/* Menu */}
//       <div className="hidden md:flex space-x-10">
//         <button onClick={handleHomeClick} className={getLinkClass("home")}>Home</button>
//         <button onClick={() => navigate("/more-products")} className={getLinkClass("shop")}>Shop</button>
//         <button onClick={() => scrollToSection("about")} className={getLinkClass("about")}>About</button>
//         <button onClick={() => scrollToSection("contact")} className={getLinkClass("contact")}>Contact</button>
//       </div>

//       {/* Right icons */}
//       <div className="flex items-center space-x-4">
//         {location.pathname === "/more-products" && (
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="w-32 h-8 px-3 rounded-full bg-gray-100 text-gray-700 text-sm
//                              focus:w-48 transition-all duration-500 ease-in-out
//                              focus:outline-none focus:ring-2 focus:ring-sky-400"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         )}

//         {/* Wishlist */}
//         <button
//           onClick={handleWishlistClick}
//           className="relative p-2 bg-white rounded-full shadow hover:shadow-md transition-colors"
//         >
//           <Heart size={24} className="text-gray-700 hover:text-red-500 transition-colors" />
//           {user && wishlist && wishlist.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//               {wishlist.length}
//             </span>
//           )}
//         </button>

//         {/* Cart */}
//         <button
//           onClick={() => (user ? navigate("/cart") : navigate("/login"))}
//           className="relative p-2 bg-white rounded-full shadow hover:shadow-md transition-colors"
//         >
//           <ShoppingCart size={24} className="text-gray-700 hover:text-sky-500 transition-colors" />
//           {user && cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//               {cart.reduce((total, item) => total + item.quantity, 0)}
//             </span>
//           )}
//         </button>

//         {/* User / Login / Logout */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={handleUserClick}
//               className="p-2 bg-white rounded-full shadow hover:shadow-md transition-colors"
//             >
//               <User size={24} className="text-gray-700 hover:text-sky-500 transition-colors" />
//             </button>

//             {/* Dropdown */}
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border">
//                 <button
//                   onClick={() => { navigate("/profile"); setShowDropdown(false); }}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={() => { navigate("/orders"); setShowDropdown(false); }}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Orders
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }
















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
//     `relative px-4 py-2 font-semibold text-base transition-all duration-300 ${
//       activeSection === section
//         ? "text-cyan-600"
//         : "text-gray-700 hover:text-cyan-500"
//     }`;

//   const getActiveBorder = (section) =>
//     activeSection === section ? (
//       <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300"></span>
//     ) : null;

//   return (
//     <nav 
//       className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-2xl px-6 py-3 flex justify-between items-center shadow-2xl transition-all duration-500 ${
//         isScrolled 
//           ? "bg-white/95 backdrop-blur-xl shadow-cyan-500/20" 
//           : "bg-white/90 backdrop-blur-md shadow-cyan-400/30"
//       }`}
//     >
//       {/* Gradient Border Effect */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 -z-10 blur-sm"></div>

//       {/* Logo */}
//       <div 
//         className="flex items-center gap-3 cursor-pointer group" 
//         onClick={handleHomeClick}
//       >
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
//           <img
//             src="/images/nav-removebg-preview.png"
//             alt="Logo"
//             className="relative w-11 h-11 object-cover rounded-full shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-300"
//           />
//         </div>
//         <span className="text-3xl font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-transparent bg-clip-text group-hover:from-cyan-600 group-hover:via-blue-700 group-hover:to-cyan-600 transition-all duration-300">
//           Sport-X
//         </span>
//       </div>

//       {/* Menu */}
//       <div className="hidden md:flex items-center space-x-2">
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
//           <div className="relative group">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-32 h-10 pl-4 pr-3 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm font-medium
//                          focus:w-52 transition-all duration-500 ease-in-out
//                          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-lg focus:shadow-cyan-400/30
//                          placeholder:text-gray-400"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-focus-within:from-cyan-500/10 group-focus-within:to-blue-500/10 -z-10 transition-all duration-300"></div>
//           </div>
//         )}

//         {/* Wishlist */}
//         <button
//           onClick={handleWishlistClick}
//           className="relative group p-2.5 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-md hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300 hover:scale-110"
//         >
//           <Heart 
//             size={22} 
//             className="text-gray-600 group-hover:text-red-500 group-hover:fill-red-500 transition-all duration-300" 
//           />
//           {user && wishlist && wishlist.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
//               {wishlist.length}
//             </span>
//           )}
//           <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/0 to-pink-500/0 group-hover:from-red-500/20 group-hover:to-pink-500/20 transition-all duration-300 -z-10"></div>
//         </button>

//         {/* Cart */}
//         <button
//           onClick={() => (user ? navigate("/cart") : navigate("/login"))}
//           className="relative group p-2.5 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-md hover:shadow-lg hover:shadow-cyan-200/50 transition-all duration-300 hover:scale-110"
//         >
//           <ShoppingCart 
//             size={22} 
//             className="text-gray-600 group-hover:text-cyan-600 transition-colors duration-300" 
//           />
//           {user && cart.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
//               {cart.reduce((total, item) => total + item.quantity, 0)}
//             </span>
//           )}
//           <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300 -z-10"></div>
//         </button>

//         {/* User / Login / Logout */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={handleUserClick}
//               className="group p-2.5 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-md hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 hover:scale-110"
//             >
//               <User 
//                 size={22} 
//                 className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300" 
//               />
//               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-300 -z-10"></div>
//             </button>

//             {/* Enhanced Dropdown */}
//             {showDropdown && (
//               <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-dropdown">
//                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 -z-10"></div>
//                 <button
//                   onClick={() => { navigate("/profile"); setShowDropdown(false); }}
//                   className="group block w-full text-left px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200 font-medium"
//                 >
//                   <span className="group-hover:text-cyan-600 transition-colors duration-200">Profile</span>
//                 </button>
//                 <button
//                   onClick={() => { navigate("/orders"); setShowDropdown(false); }}
//                   className="group block w-full text-left px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200 font-medium border-t border-gray-100"
//                 >
//                   <span className="group-hover:text-cyan-600 transition-colors duration-200">Orders</span>
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="group block w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 font-medium border-t border-gray-100"
//                 >
//                   <span className="group-hover:text-red-700 transition-colors duration-200">Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="relative group px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 overflow-hidden"
//           >
//             <span className="relative z-10">Login</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </button>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes dropdown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-dropdown {
//           animation: dropdown 0.2s ease-out forwards;
//         }
//       `}</style>
//     </nav>
//   );
// } 












import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, User, LogOut } from "lucide-react"; 
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
  };

  const handleUserClick = () => {
    if (!user) navigate("/login");
    else setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
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
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const getLinkClass = (section) =>
    `relative px-4 py-2 font-medium text-sm transition-all duration-300 ${
      activeSection === section
        ? "text-slate-900"
        : "text-slate-600 hover:text-slate-900"
    }`;

  const getActiveBorder = (section) =>
    activeSection === section ? (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300"></span>
    ) : null;

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-xl px-6 py-3 flex justify-between items-center transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg border border-slate-200" 
          : "bg-white/90 backdrop-blur-md shadow-md border border-slate-100"
      }`}
    >
      {/* Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={handleHomeClick}
      >
        <img
          src="/images/nav-removebg-preview.png"
          alt="Logo"
          className="w-10 h-10 object-cover rounded-full border-2 border-slate-200 group-hover:border-slate-300 transition-all duration-300"
        />
        <span className="text-2xl font-serif font-light text-slate-900 group-hover:text-slate-600 transition-all duration-300">
          Sport-X
        </span>
      </div>

      {/* Menu */}
      <div className="hidden md:flex items-center space-x-1">
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

      {/* Right icons */}
      <div className="flex items-center space-x-3">
        {location.pathname === "/more-products" && (
          <input
            type="text"
            placeholder="Search products..."
            className="w-32 h-9 pl-4 pr-3 rounded-lg bg-slate-50 text-slate-900 text-sm
                       focus:w-52 transition-all duration-500 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-slate-900
                       placeholder:text-slate-400 border border-slate-200"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          className="relative p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300"
        >
          <Heart 
            size={20} 
            className="text-slate-600 hover:text-slate-900 transition-all duration-300" 
          />
          {user && wishlist && wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => (user ? navigate("/cart") : navigate("/login"))}
          className="relative p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300"
        >
          <ShoppingCart 
            size={20} 
            className="text-slate-600 hover:text-slate-900 transition-colors duration-300" 
          />
          {user && cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>

        {/* User / Login / Logout */}
        {user ? (
          <div className="relative">
            <button
              onClick={handleUserClick}
              className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300"
            >
              <User 
                size={20} 
                className="text-slate-600 hover:text-slate-900 transition-colors duration-300" 
              />
            </button>

            {/* Refined Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                  className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm"
                >
                  Profile
                </button>
                <button
                  onClick={() => { navigate("/orders"); setShowDropdown(false); }}
                  className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm border-t border-slate-100"
                >
                  Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium text-sm border-t border-slate-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 text-sm"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}