






// import { useState } from "react";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
// import AdminLayout from "./admin/AdminLayout";
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminProducts from "./admin/AdminProducts";
// import AdminOrders from "./admin/AdminOrders";
// import AdminUsers from "./admin/AdminUsers";
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
//             <FooterWrapper />
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

//   function MoreProductsPage({ searchTerm }) {
//   return <MoreProducts searchTerm={searchTerm} />;
// }


//   return (
//     <main className={isHome || isAdmin ? "pt-0 flex-grow" : "pt-28 flex-grow"}>
//       {!isAdmin && <Navbar onSearch={onSearch} />}
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         {/* <Route path="/more-products" element={<MoreProducts searchTerm={searchTerm} />} /> */}

//         <Route path="/more-products" element={<MoreProductsPage searchTerm={searchTerm} />} />

//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/about" element={<About />} />

//         {/* User-Only Protected Routes (admins blocked) */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/checkout" element={<Checkout />} />
//           {/* <Route path="/order-success" element={<PaymentSuccess />} /> */}

//           <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
//           <Route path="/orders" element={<Orders />} />
//         </Route>

//         {/* Admin-Only Protected Routes (users blocked) */}
//         {/* Fix: AdminLayout should wrap the ProtectedRoute, not the other way around */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Navigate to="/admin/dashboard" replace />} />
//           {/* Nested routes inside AdminLayout with ProtectedRoute */}
//           <Route element={<ProtectedRoute adminOnly={true} />}>
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

// // Wrapper to conditionally render Footer
// function FooterWrapper() {
//   const location = useLocation();
//   const isAdmin = location.pathname.startsWith("/admin");

//   return !isAdmin ? <Footer /> : null;
// }






// import { useState } from "react";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
// import AdminLayout from "./admin/AdminLayout";
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminProducts from "./admin/AdminProducts";
// import AdminOrders from "./admin/AdminOrders";
// import AdminUsers from "./admin/AdminUsers";
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
//             <FooterWrapper />
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
//     <main className={isHome || isAdmin ? "pt-0 flex-grow" : "pt-16 flex-grow"}>
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
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Navigate to="/admin/dashboard" replace />} />
//           {/* Nested routes inside AdminLayout with ProtectedRoute */}
//           <Route element={<ProtectedRoute adminOnly={true} />}>
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

// // Wrapper to conditionally render Footer
// function FooterWrapper() {
//   const location = useLocation();
//   const isAdmin = location.pathname.startsWith("/admin");

//   return !isAdmin ? <Footer /> : null;
// }








import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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
import { toast } from "sonner";

import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin imports
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminSettings from "./admin/AdminSettings";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthErrorListener />

            <div className="flex flex-col min-h-screen">
              <RoutesWrapper
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
              />
              <FooterWrapper />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>

      
    </>
  );
}


/* 🔥 GLOBAL AUTH ERROR HANDLER (BLOCKED / EXPIRED) */
function AuthErrorListener() {
  useEffect(() => {
    const handler = (event) => {
      const reason = event.detail.reason;

      toast.error(
        reason === "BLOCKED"
          ? "Your account has been blocked by admin"
          : "Session expired. Please login again",
        {
          action: {
            label: "Login",
            onClick: () => {
              localStorage.clear();
              window.location.href = "/login";
            },
          },
        }
      );
    };

    window.addEventListener("auth-error", handler);
    return () => window.removeEventListener("auth-error", handler);
  }, []);

  return null;
}


// Wrapper to safely use useLocation
function RoutesWrapper({ searchTerm, onSearch }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <main className={ isAdmin ? "pt-0 flex-grow" : "pt-16 flex-grow"}>
      {!isAdmin && <Navbar onSearch={onSearch} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/more-products"
          element={<MoreProducts searchTerm={searchTerm} />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />

        {/* User-Only Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment-success/:orderId"
            element={<PaymentSuccess />}
          />
          <Route path="/orders" element={<Orders />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route element={<ProtectedRoute adminOnly={true} />}>
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

// Footer (hidden for admin)
function FooterWrapper() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return !isAdmin ? <Footer /> : null;
}
