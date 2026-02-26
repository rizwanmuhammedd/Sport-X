

// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";
// import toast from "react-hot-toast";
// import api from "../Api/Axios_Instance";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cart, setCart] = useState([]);

//   // LOAD CART  — UPDATED (Admin-safe)
//   // useEffect(() => {
//   //   if (!user) {
//   //     setCart([]);
//   //     return;
//   //   }

//   //   // 🚫 Skip cart API for Admin
//   //   if (user.role === "Admin") {
//   //     setCart([]);
//   //     return;
//   //   }

//   //   api.get("/cart")
//   //     .then(res => setCart(res.data.data || []))     
//   //     .catch(() => setCart([]));
//   // }, [user]);



//   useEffect(() => {
//   if (!user || user.role === "Admin") {
//     setCart([]);
//     return;
//   }

//  api.get("/cart")
//   .then(res => {
//     const data = (res.data.data || []).map(item => ({
//   ...item,
//   productId: item.productId || item.id, // 👈 IMPORTANT
//   image: item.imageUrl && item.imageUrl.startsWith("http")
//     ? item.imageUrl
//     : "/images/default.jpg"
// }));
// setCart(data);

//   })

//     .catch(() => setCart([]));
// }, [user]);


// const addToCart = async (product, quantity = 1, silent = false) => {
//   if (!user) {
//     toast.error("Please login");
//     return { success: false };
//   }

//   try {
//     const productId = product.productId || product.id;

//     await api.post("/cart/add", {
//       productId,
//       quantity
//     });

//     // Refresh cart
//     const updated = await api.get("/cart");
// const normalized = (updated.data.data || []).map(item => ({
//   ...item,
//   productId: item.productId || item.id,
//   image: item.imageUrl && item.imageUrl.startsWith("http")
//     ? item.imageUrl
//     : "/images/default.jpg"
// }));

// setCart(normalized);



//     if (!silent) {
//       if (quantity > 0) toast.success("Added to cart 🛒");
//       else toast.success("Updated cart 🛒");
//     }

//     return { success: true };
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Failed to update cart");
//     return { success: false };
//   }
// };
// ;


//   // REMOVE
//   const removeFromCart = async (cartItemId) => {
//     try {
//       const res = await api.delete(`/cart/${cartItemId}`);
//       setCart(res.data.data || []);                  
//       toast("Removed from cart");
//     } catch {
//       toast.error("Failed to remove");
//     }
//   };

//   // CLEAR
//  const clearCart = async () => {
//   try {
//     await api.delete("/cart/clear");
//     setCart([]);
//     toast("Cart cleared");
//     return true;
//   } catch {
//     toast.error("Failed to clear cart");
//     return false;
//   }
// };
// const updateQuantity = async (cartItemId, newQuantity) => {
//   if (newQuantity < 1) return;

//   try {
//     await api.post("/cart/add", {
//       productId: cart.find(item => item.id === cartItemId)?.productId,
//       quantity: newQuantity
//     });

//     const res = await api.get("/cart");
//     setCart(res.data.data || []);
//   } catch (err) {
//     toast.error("Failed to update cart");
//   }
// };


//   const getTotal = () =>
//     cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{
//       cart,
//       addToCart,
//       removeFromCart,
//       clearCart,
//       getTotal,
//       updateQuantity   
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import api from "../Api/Axios_Instance";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user || user.role === "Admin") {
      setCart([]);
      return;
    }

    api.get("/cart")
      .then(res => {
        const data = (res.data.data || []).map(item => ({
          ...item,
          productId: item.productId || item.id,
          image: item.imageUrl && item.imageUrl.startsWith("http")
            ? item.imageUrl
            : "/images/default.jpg",
          stock: item.stock || item.stockQuantity
        }));
        setCart(data);
      })
      .catch(() => setCart([]));
  }, [user]);

  // ✅ ADD TO CART - For adding new items
  const addToCart = async (product, quantity = 1, silent = false) => {
    if (!user) {
      if (!silent) toast.error("Please login");
      return { success: false };
    }

    try {
      const productId = product.productId || product.id;
      
      await api.post("/cart/add", {
        productId,
        quantity
      });

      // Refresh cart
      const updated = await api.get("/cart");
      const normalized = (updated.data.data || []).map(item => ({
        ...item,
        productId: item.productId || item.id,
        image: item.imageUrl && item.imageUrl.startsWith("http")
          ? item.imageUrl
          : "/images/default.jpg",
        stock: item.stock || item.stockQuantity
      }));

      setCart(normalized);

      // Only show toast for new items
      if (!silent && quantity > 0) {
        const currentItem = cart.find(item => item.productId === productId);
        if (!currentItem) {
          toast.success("Added to cart 🛒");
        }
      }

      return { success: true };
    } catch (err) {
      console.error("Cart update error:", err);
      if (!silent) {
        const errorMsg = err.response?.data?.message || "Failed to update cart";
        toast.error(errorMsg);
      }
      return { success: false };
    }
  };

  // ✅ NEW: Update quantity using the new endpoint
  const updateQuantity = async (productId, change) => {
    if (!user) return false;

    try {
      // Use the new update-quantity endpoint
      await api.post("/cart/update-quantity", {
        productId,
        quantityChange: change // +1 or -1
      });

      // Refresh cart
      const updated = await api.get("/cart");
      const normalized = (updated.data.data || []).map(item => ({
        ...item,
        productId: item.productId || item.id,
        image: item.imageUrl && item.imageUrl.startsWith("http")
          ? item.imageUrl
          : "/images/default.jpg",
        stock: item.stock || item.stockQuantity
      }));

      setCart(normalized);
      return true;
    } catch (error) {
      console.error("Quantity update error:", error);
      const errorMsg = error.response?.data?.message || "Failed to update quantity";
      toast.error(errorMsg);
      return false;
    }
  };

  // ✅ SIMPLE QUANTITY FUNCTIONS
  const increaseQuantity = async (productId) => {
    return await updateQuantity(productId, 1);
  };

  const decreaseQuantity = async (productId) => {
    return await updateQuantity(productId, -1);
  };

  // REMOVE - shows toast
  const removeFromCart = async (cartItemId) => {
    try {
      const res = await api.delete(`/cart/${cartItemId}`);
      setCart(res.data.data || []);
      toast.success("Removed from cart");
    } catch {
      toast.error("Failed to remove");
    }
  };

  // CLEAR - shows toast
  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setCart([]);
      toast.success("Cart cleared");
      return true;
    } catch {
      toast.error("Failed to clear cart");
      return false;
    }
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};