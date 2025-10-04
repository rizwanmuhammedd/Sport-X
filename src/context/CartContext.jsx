


// import { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import toast from "react-hot-toast";
// import api from "../Api/Axios_Instance";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   // Load cart from localStorage per user
//   useEffect(() => {
//     if (!user) {
//       setCart([]);
//       return;
//     }

//     const key = `cart_${user.email}`;
//     const stored = localStorage.getItem(key);
//     let parsedCart = [];

//     try {
//       parsedCart = stored ? JSON.parse(stored) : [];
//     } catch (err) {
//       console.warn("Failed to parse cart from localStorage:", err);
//       parsedCart = [];
//     }

//     setCart(parsedCart);
//   }, [user]);

//   // Add to Cart
//   const addToCart = async (product, quantity = 1) => {
//     if (!user) {
//       toast.error("Please login to add items to cart 🛒");
//       return;
//     }

//     let updatedCart;
//     const existing = cart.find((p) => p.id === product.id);

//     if (existing) {
//       toast(`${product.name} quantity updated 🛒`);
//       updatedCart = cart.map((p) =>
//         p.id === product.id
//           ? { ...p, quantity: p.quantity + quantity }
//           : p
//       );
//     } else {
//       toast.success(`${product.name} added to cart 🛒`);
//       updatedCart = [...cart, { ...product, quantity }];
//     }

//     setCart(updatedCart);
//     localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));

//     try {
//       // Sync with API
//       const userRes = await api.get(`/users/${user.id}`);
//       const userData = userRes.data;
//       const userUpdated = { ...userData, cart: updatedCart };
//       await api.put(`/users/${user.id}`, userUpdated);
//     } catch (error) {
//       console.error("Error updating cart:", error);
//       toast.error("Failed to update cart on server ❌");
//     }
//   };

//   const removeFromCart = async (id) => {
//     const updatedCart = cart.filter((p) => p.id !== id);
//     setCart(updatedCart);
//     toast.error("Removed from cart ❌");

//     if (user) {
//       localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
//       try {
//         const userRes = await api.get(`/users/${user.id}`);
//         const userData = userRes.data;
//         const userUpdated = { ...userData, cart: updatedCart };
//         await api.put(`/users/${user.id}`, userUpdated);
//       } catch (error) {
//         console.error("Error updating cart:", error);
//       }
//     }
//   };

//   const updateQuantity = async (id, quantity) => {
//     const updatedCart = cart.map((p) =>
//       p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
//     );
//     setCart(updatedCart);

//     if (user) {
//       localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
//       try {
//         const userRes = await api.get(`/users/${user.id}`);
//         const userData = userRes.data;
//         const userUpdated = { ...userData, cart: updatedCart };
//         await api.put(`/users/${user.id}`, userUpdated);
//       } catch (error) {
//         console.error("Error updating cart:", error);
//       }
//     }
//   };

//  const clearCart = async () => {
//   setCart([]); // Clear immediately
  
//   if (user) {
//     try {
//       localStorage.setItem(`cart_${user.email}`, JSON.stringify([]));
//       const userRes = await api.get(`/users/${user.id}`);
//       const userData = userRes.data;
//       const userUpdated = { ...userData, cart: [] };
//       await api.put(`/users/${user.id}`, userUpdated);
//       toast("Cart cleared");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//       // Even if API fails, keep local state cleared
//     }
//   }
// };

//   const getTotal = () => {
//     return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         getTotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };










import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage per user
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const key = `cart_${user.email}`;
    const stored = localStorage.getItem(key);
    let parsedCart = [];

    try {
      parsedCart = stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn("Failed to parse cart from localStorage:", err);
      parsedCart = [];
    }

    setCart(parsedCart);
  }, [user]);

  // Add to Cart
  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart 🛒");
      return;
    }

    let updatedCart;
    const existing = cart.find((p) => p.id === product.id);
    const stock = product.stock || 1;

    if (existing) {
      // ✅ Prevent exceeding stock
      if (existing.quantity >= stock) {
        toast.error(`Only ${stock} in stock ❌`);
        return cart;
      }
      toast(`${product.name} quantity updated 🛒`);
      updatedCart = cart.map((p) =>
        p.id === product.id
          ? { ...p, quantity: Math.min(p.quantity + quantity, stock) }
          : p
      );
    } else {
      toast.success(`${product.name} added to cart 🛒`);
      updatedCart = [...cart, { ...product, quantity: Math.min(quantity, stock) }];
    }

    setCart(updatedCart);
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));

    try {
      // Sync with API
      const userRes = await api.get(`/users/${user.id}`);
      const userData = userRes.data;
      const userUpdated = { ...userData, cart: updatedCart };
      await api.put(`/users/${user.id}`, userUpdated);
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart on server ❌");
    }
  };

  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((p) => p.id !== id);
    setCart(updatedCart);
    toast.error("Removed from cart ❌");

    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
      try {
        const userRes = await api.get(`/users/${user.id}`);
        const userData = userRes.data;
        const userUpdated = { ...userData, cart: updatedCart };
        await api.put(`/users/${user.id}`, userUpdated);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const updateQuantity = async (id, quantity) => {
    const product = cart.find((p) => p.id === id);
    const stock = product?.stock || 1;

    const updatedCart = cart.map((p) =>
      p.id === id
        ? { ...p, quantity: Math.max(1, Math.min(quantity, stock)) }
        : p
    );
    setCart(updatedCart);

    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
      try {
        const userRes = await api.get(`/users/${user.id}`);
        const userData = userRes.data;
        const userUpdated = { ...userData, cart: updatedCart };
        await api.put(`/users/${user.id}`, userUpdated);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };

  const clearCart = async () => {
    setCart([]); // Clear immediately

    if (user) {
      try {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify([]));
        const userRes = await api.get(`/users/${user.id}`);
        const userData = userRes.data;
        const userUpdated = { ...userData, cart: [] };
        await api.put(`/users/${user.id}`, userUpdated);
        toast("Cart cleared");
      } catch (error) {
        console.error("Error clearing cart:", error);
        // Even if API fails, keep local state cleared
      }
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
