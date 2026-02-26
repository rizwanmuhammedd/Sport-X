
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import { AuthProvider } from "./context/AuthContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { CartProvider } from "./context/CartContext"; // ✅ add CartProvider

// import "./index.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
 
//   <BrowserRouter>
//     <AuthProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <App />
//         </WishlistProvider>
//       </CartProvider>
//     </AuthProvider>
//   </BrowserRouter>


// );





import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

import { Toaster } from "sonner";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            {/* 🔔 GLOBAL TOAST */}
            <Toaster position="top-right" richColors />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
