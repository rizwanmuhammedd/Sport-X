
// import { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import { AuthProvider } from "./context/AuthContext";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";

// import Register from "./Pages/Register";
// import Login from "./Pages/Login";
// import Home from "./Pages/Home";
// import Navbar from "./components/Navbar";
// import MoreProducts from "./Pages/MoreProducts";
// import Cart from "./Pages/Cart";
// import ProductDetails from "./Pages/ProductDetails";
// import Wishlist from "./Pages/Wishlist";
// import Profile from "./Pages/Profile";
// import About from "./Pages/About";
// import Checkout from "./Pages/Checkout";
// import PaymentSuccess from "./Pages/PaymentSuccess";
// import Orders from "./Pages/Orders";

// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// // Admin imports
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminProducts from "./admin/AdminProducts";
// import AdminOrders from "./admin/AdminOrders";
// import AdminUsers from "./admin/AdminUsers";
// import AdminInterface from "./admin/AdminInterface";
// import AdminSettings from "./admin/AdminSettings";

// export default function App() {
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <AuthProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <Toaster position="top-right" reverseOrder={false} />

//           <div className="flex flex-col min-h-screen">
//             {/* Routes and Navbar */}
//             <RoutesWrapper searchTerm={searchTerm} onSearch={setSearchTerm} />

//             {/* Footer (user side only) */}
//             <Footer />
//           </div>
//         </WishlistProvider>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// // Wrapper to safely use useLocation
// function RoutesWrapper({ searchTerm, onSearch }) {
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   const isAdmin = location.pathname.startsWith("/admin");

//   return (
//     // FIX: Apply padding only if it's NOT the home page AND NOT an admin page.
//     <main className={isHome || isAdmin ? "pt-0 flex-grow" : "pt-28 flex-grow"}>
//       {!isAdmin && <Navbar onSearch={onSearch} />}
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/more-products" element={<MoreProducts searchTerm={searchTerm} />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/about" element={<About />} />

//         {/* User-Only Protected Routes (admins blocked) */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
//           <Route path="/orders" element={<Orders />} />
//         </Route>

//         {/* Admin-Only Protected Routes (users blocked) */}
//         <Route element={<ProtectedRoute adminOnly={true} />}>
//           <Route path="/admin/*" element={<AdminInterface />}>
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="orders" element={<AdminOrders />} />
//             <Route path="products" element={<AdminProducts />} />
//             <Route path="settings" element={<AdminSettings />} />
//           </Route>
//         </Route>
//       </Routes>
//     </main>
//   );
// }









import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import MoreProducts from "./Pages/MoreProducts";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Checkout from "./Pages/Checkout";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Orders from "./Pages/Orders";

import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin imports
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminInterface from "./admin/AdminInterface";
import AdminSettings from "./admin/AdminSettings";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster position="top-right" reverseOrder={false} />

          <div className="flex flex-col min-h-screen">
            {/* Routes and Navbar */}
            <RoutesWrapper searchTerm={searchTerm} onSearch={setSearchTerm} />

            {/* Footer (user side only) */}
            <FooterWrapper />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// Wrapper to safely use useLocation
function RoutesWrapper({ searchTerm, onSearch }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    // FIX: Apply padding only if it's NOT the home page AND NOT an admin page.
    <main className={isHome || isAdmin ? "pt-0 flex-grow" : "pt-28 flex-grow"}>
      {!isAdmin && <Navbar onSearch={onSearch} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/more-products" element={<MoreProducts searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />

        {/* User-Only Protected Routes (admins blocked) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        {/* Admin-Only Protected Routes (users blocked) */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin/*" element={<AdminInterface />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

// Wrapper to conditionally render Footer
function FooterWrapper() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return !isAdmin ? <Footer /> : null;
}