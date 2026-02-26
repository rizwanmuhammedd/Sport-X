

// import { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import { useCart } from "./CartContext";
// import toast from "react-hot-toast";
// import api from "../Api/Axios_Instance";

// const WishlistContext = createContext();
// export const useWishlist = () => useContext(WishlistContext);

// export const WishlistProvider = ({ children }) => {
//   const { user } = useAuth();
//   const { addToCart } = useCart();
//   const [wishlist, setWishlist] = useState([]);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user || user.role === "Admin") {
//       setWishlist([]);
//       setOrders([]);
//       return;
//     }

//     const loadWishlist = async () => {
//       try {
//         const res = await api.get("/Wishlist");
//         console.log(res.data.data);

//         const wishlistData = res.data.data || [];

//  const fullWishlist = wishlistData.map(w => ({
//   productId: w.productId,
//   id: w.id,
//   name: w.productName,
//   price: w.price,
//   image:
//     w.imageUrl && w.imageUrl !== "string"
//       ? `https://localhost:5206/${w.imageUrl}`
//       : "/images/default.jpg",
//   stock: w.stockQuantity,
//   category: w.category
// }));



//         setWishlist(fullWishlist);
//       } catch (err) {
//         toast.error("Failed to load wishlist");
//       }
//     };

//     loadWishlist();
//   }, [user]);

//   const toggleWishlist = async (product) => {
//     if (!user) return toast.error("Please login");

//     const pid = product.id || product.productId;
//     if (!pid) return toast.error("Invalid product");

//     try {
//       const exists = wishlist.some(w => w.productId === pid);

//       if (exists) {
//         await api.delete(`/Wishlist/${pid}`);
//         setWishlist(prev => prev.filter(w => w.productId !== pid));
//         toast.success("Removed from wishlist 💔");
//       } else {
//         await api.post(`/Wishlist/${pid}`);

//         setWishlist(prev => [
//           ...prev,
//           {
//             productId: pid,
//             name: product.name,
//             price: product.price,
//             image: product.imageUrl || product.image,
//             stock: product.stockQuantity ?? product.stock ?? 0,
//             category: product.category
//           }
//         ]);

//         toast.success("Added to wishlist ❤️");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Wishlist update failed");
//     }
//   };

//   const removeFromWishlist = async (productId, silent = false) => {
//     try {
//       await api.delete(`/Wishlist/${productId}`);
//       setWishlist(prev => prev.filter(w => w.productId !== productId));
      
//       // Only show toast if not silent mode (called directly by user)
//       if (!silent) {
//         toast.success("Removed from wishlist");
//       }
//     } catch (error) {
//       console.error("Remove error:", error);
//       if (!silent) {
//         toast.error("Failed to remove");
//       }
//     }
//   };

// // In your WishlistContext.js
// const moveToCart = async (productId) => {
//   if (!user) {
//     toast.error("Please login");
//     return false;
//   }

//   try {
//     // JUST SEND ID + QUANTITY (what backend expects)
//     const result = await addToCart(
//       { productId }, // 👈 ONLY THIS
//       1,
//       true // silent
//     );

//     if (result?.success) {
//       await removeFromWishlist(productId, true); // silent remove
//       toast.success("Moved to cart 🛒");
//       return true;
//     }

//     toast.error("Failed to move to cart");
//     return false;
//   } catch (error) {
//     console.error("Move to cart error:", error);
//     toast.error("Failed to move to cart");
//     return false;
//   }
// };



//   const addOrder = async (order) => {
//     if (!user) return;

//     try {
//       const updatedOrders = [...orders, order];
//       setOrders(updatedOrders);
//       await api.patch(`/users/${user.id}`, { orders: updatedOrders });
//       toast.success("Order saved");
//     } catch {
//       toast.error("Failed to save order");
//     }
//   };

//   return (
//     <WishlistContext.Provider value={{
//       wishlist,
//       orders,
//       toggleWishlist,
//       removeFromWishlist,
//       moveToCart,
//       addOrder,
//     }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };








import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { toast } from "sonner";
import api from "../Api/Axios_Instance";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || user.role === "Admin") {
      setWishlist([]);
      setOrders([]);
      return;
    }

    const loadWishlist = async () => {
      try {
        const res = await api.get("/Wishlist");
        const wishlistData = res.data.data || [];

        const fullWishlist = wishlistData.map(w => ({
          productId: w.productId,
          id: w.id,
          name: w.productName,
          price: w.price,
          image: w.imageUrl && w.imageUrl !== "string"
            ? `https://localhost:5206/${w.imageUrl}`
            : "/images/default.jpg",
          stock: w.stockQuantity,
          category: w.category
        }));

        setWishlist(fullWishlist);
      }catch (err) {
  if (err.response?.status === 401) {
    setWishlist([]); // silently reset
    return;
  }

  console.error("Failed to load wishlist:", err);
}

    };

    loadWishlist();
  }, [user]);

  const toggleWishlist = async (product) => {
    if (!user) return toast.error("Please login");

    const pid = product.id || product.productId;
    if (!pid) return toast.error("Invalid product");

    try {
      const exists = wishlist.some(w => w.productId === pid);

      if (exists) {
        await api.delete(`/Wishlist/${pid}`);
        setWishlist(prev => prev.filter(w => w.productId !== pid));
        toast.success("Removed from wishlist ");
      } else {
        await api.post(`/Wishlist/${pid}`);

        setWishlist(prev => [
          ...prev,
          {
            productId: pid,
            name: product.name,
            price: product.price,
            image: product.imageUrl || product.image,
            stock: product.stockQuantity ?? product.stock ?? 0,
            category: product.category
          }
        ]);

        toast.success("Added to wishlist ");
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error(err.response?.data?.message || "Wishlist update failed");
    }
  };

  const removeFromWishlist = async (productId, silent = false) => {
    try {
      await api.delete(`/Wishlist/${productId}`);
      setWishlist(prev => prev.filter(w => w.productId !== productId));
      
      // Only show toast if not silent mode (called directly by user)
      if (!silent) {
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      if (!silent) {
        toast.error("Failed to remove");
      }
    }
  };

  // ✅ OPTIMIZED moveToCart function
  const moveToCart = async (productId) => {
    if (!user) {
      toast.error("Please login");
      return false;
    }

    // Find the product in wishlist
    const product = wishlist.find(w => w.productId === productId);
    if (!product) {
      toast.error("Product not found in wishlist");
      return false;
    }

    // Check stock before moving to cart
    if (product.stock <= 0) {
      toast.error("This item is out of stock");
      return false;
    }

    try {
      // Use addToCart with silent mode to prevent duplicate toast
      const result = await addToCart(
        { productId }, // Only productId needed
        1, // Quantity to add
        true // Silent mode - no toast from CartContext
      );

      if (result?.success) {
        // Remove from wishlist silently
        await removeFromWishlist(productId, true);
        
        // Show only ONE toast message
        toast.success("Moved to cart 🛒");
        return true;
      } else {
        // If addToCart failed but didn't throw
        toast.error("Failed to move to cart");
        return false;
      }
    } catch (error) {
      console.error("Move to cart error:", error);
      
      // Check if error is from CartContext or wishlist removal
      const errorMsg = error.response?.data?.message || "Failed to move to cart";
      
      // If the error is about stock or similar, show specific message
      if (errorMsg.includes("stock") || errorMsg.includes("Stock")) {
        toast.error(errorMsg);
      } else {
        toast.error("Failed to move to cart");
      }
      
      return false;
    }
  };

  const addOrder = async (order) => {
    if (!user) return;

    try {
      const updatedOrders = [...orders, order];
      setOrders(updatedOrders);
      await api.patch(`/users/${user.id}`, { orders: updatedOrders });
      toast.success("Order saved");
    } catch (error) {
      console.error("Save order error:", error);
      toast.error("Failed to save order");
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      orders,
      toggleWishlist,
      removeFromWishlist,
      moveToCart,
      addOrder,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};