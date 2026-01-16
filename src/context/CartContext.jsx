

// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";
// import toast from "react-hot-toast";
// import api from "../Api/Axios_Instance";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   // LOAD CART
//   useEffect(() => {
//     if (!user) return setCart([]);

//     api.get("/cart")
//       .then(res => setCart(res.data.data || []))     // 🔥 FIXED
//       .catch(() => setCart([]));
//   }, [user]);

//   // ADD
//   const addToCart = async (product, quantity = 1) => {
//     if (!user) return toast.error("Please login");

//     try {
//       const res = await api.post("/cart/add", {
//         productId: product.id,
//         quantity
//       });

//       setCart(res.data.data || []);                  // 🔥 FIXED
//       toast.success("Added to cart 🛒");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to add to cart");
//     }
//   };

//   // REMOVE
//   const removeFromCart = async (cartItemId) => {
//     try {
//       const res = await api.delete(`/cart/${cartItemId}`);
//       setCart(res.data.data || []);                  // 🔥 FIXED
//       toast("Removed from cart");
//     } catch {
//       toast.error("Failed to remove");
//     }
//   };

//   // CLEAR
//   const clearCart = async () => {
//     try {
//       await api.delete("/cart/clear");
//       setCart([]);
//       toast("Cart cleared");
//     } catch {
//       toast.error("Failed to clear cart");
//     }
//   };

//   const getTotal = () =>
//     cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{
//       cart,
//       addToCart,
//       removeFromCart,
//       clearCart,
//       getTotal
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };







import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // LOAD CART  — UPDATED (Admin-safe)
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    // 🚫 Skip cart API for Admin
    if (user.role === "Admin") {
      setCart([]);
      return;
    }

    api.get("/cart")
      .then(res => setCart(res.data.data || []))     
      .catch(() => setCart([]));
  }, [user]);

  // ADD
  const addToCart = async (product, quantity = 1) => {
    if (!user) return toast.error("Please login");

    try {
      const res = await api.post("/cart/add", {
        productId: product.id,
        quantity
      });

      setCart(res.data.data || []);                  
      toast.success("Added to cart 🛒");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  // REMOVE
  const removeFromCart = async (cartItemId) => {
    try {
      const res = await api.delete(`/cart/${cartItemId}`);
      setCart(res.data.data || []);                  
      toast("Removed from cart");
    } catch {
      toast.error("Failed to remove");
    }
  };

  // CLEAR
  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setCart([]);
      toast("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
