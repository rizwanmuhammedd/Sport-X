

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

//   // Load wishlist
//   useEffect(() => {
//     if (!user) {
//       setWishlist([]);
//       setOrders([]);
//       return;
//     }

//     api.get("/Wishlist")
//       .then(res => setWishlist(res.data))
//       .catch(() => setWishlist([]));
//   }, [user]);

//   // Toggle Wishlist (matches backend toggle)
//   const toggleWishlist = async (product) => {
//     if (!user) return toast.error("Please login");

//     try {
//       await api.post(`/Wishlist/${product.id}`);

//       setWishlist(prev => {
//         const exists = prev.some(p => p.productId === product.id);

//         if (exists) {
//           toast("Removed from wishlist 💔");
//           return prev.filter(p => p.productId !== product.id);
//         } else {
//           toast.success("Added to wishlist ❤️");
//           return [...prev, {
//             productId: product.id,
//             productName: product.name,
//             imageUrl: product.imageUrl,
//             price: product.price
//           }];
//         }
//       });
//     } catch {
//       toast.error("Wishlist update failed");
//     }
//   };

//   // Manual remove
//   const removeFromWishlist = async (id) => {
//     try {
//       await api.delete(`/Wishlist/${id}`);
//       setWishlist(prev => prev.filter(p => p.productId !== id));
//       toast("Removed from wishlist");
//     } catch {
//       toast.error("Failed to remove");
//     }
//   };

//   // Move to cart
//   const moveToCart = async (product) => {
//     if (!user) return toast.error("Please login");

//     try {
//       const productRes = await api.get(`/products/${product.id}`);
//       const currentProduct = productRes.data;

//       if (!currentProduct.stock || currentProduct.stock <= 0) {
//         toast.error("Out of stock");
//         return;
//       }

//       addToCart({ ...product, stock: currentProduct.stock }, 1);
//       removeFromWishlist(product.id);
//     } catch {
//       toast.error("Failed to move to cart");
//     }
//   };

//   // Orders
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

//   // LOAD WISHLIST (hydrate with full product info)
//   // useEffect(() => {
//   //   if (!user) {
//   //     setWishlist([]);
//   //     return;
//   //   }

//   //   const loadWishlist = async () => {
//   //     try {
//   //       const res = await api.get("/Wishlist");
//   //       const wishlistRows = res.data.data || [];

//   //       const fullProducts = await Promise.all(
//   //         wishlistRows.map(w =>
//   //           api.get(`/products/${w.productId}`).then(r => r.data)
//   //         )
//   //       );

//   //       setWishlist(fullProducts);
//   //     } catch {
//   //       setWishlist([]);
//   //     }
//   //   };

//   //   loadWishlist();
//   // }, [user]);



//   useEffect(() => {
//   if (!user) {
//     setWishlist([]);
//     setOrders([]);
//     return;
//   }

//   const loadWishlist = async () => {
//     try {
//       const res = await api.get("/Wishlist");
//       const ids = res.data.data || [];

//       if (ids.length === 0) {
//         setWishlist([]);
//         return;
//       }

//       // Fetch product details
//       const productRes = await api.get("/Products/GetAll");

//       const products = productRes.data.data;

//       const fullWishlist = ids
//         .map(w => products.find(p => p.id === w.productId))
//         .filter(Boolean)
//         .map(p => ({
//           productId: p.id,
//           name: p.name,
//           price: p.price,
//           image: p.imageUrl,
//           stock: p.stockQuantity
//         }));

//       setWishlist(fullWishlist);
//     } catch {
//       setWishlist([]);
//     }
//   };

//   loadWishlist();
// }, [user]);


//   // TOGGLE WISHLIST
//  const toggleWishlist = async (product) => {
//   if (!user) return toast.error("Please login");

//   try {
//     const exists = wishlist.some(w => w.productId === product.id);

//     if (exists) {
//       await api.delete(`/Wishlist/${product.id}`);
//       setWishlist(prev => prev.filter(w => w.productId !== product.id));
//       toast("Removed from wishlist 💔");
//     } else {
//       await api.post(`/Wishlist/${product.id}`);

//       setWishlist(prev => [
//         ...prev,
//         {
//           productId: product.id,
//           name: product.name,
//           price: product.price,
//           image: product.image,
//           stock: product.stock
//         }
//       ]);

//       toast.success("Added to wishlist ❤️");
//     }
//   } catch {
//     toast.error("Wishlist update failed");
//   }
// };


//   // REMOVE
//   const removeFromWishlist = async (id) => {
//     try {
//       await api.delete(`/Wishlist/${id}`);
//    setWishlist(prev => prev.filter(w => w.productId !== id));
//       toast("Removed from wishlist");
//     } catch {
//       toast.error("Failed to remove");
//     }
//   };

//   // MOVE TO CART
//   const moveToCart = async (product) => {
//     if (!user) return toast.error("Please login");

//     try {
//       const res = await api.get(`/products/${product.id}`);
//       const currentProduct = res.data;

//       if (!currentProduct.stock || currentProduct.stock <= 0) {
//         toast.error("Out of stock");
//         return;
//       }

//       addToCart(product, 1);
//       removeFromWishlist(product.id);
//     } catch {
//       toast.error("Failed to move to cart");
//     }
//   };

//   // ORDERS
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
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      setOrders([]);
      return;
    }

    const loadWishlist = async () => {
      try {
        const res = await api.get("/Wishlist");
        // const ids = res.data.data || [];

        // if (ids.length === 0) return;

        // const productRes = await api.get("/Products/GetAll");
        // const products = productRes.data.data;

        // const fullWishlist = ids
        //   .map(w => products.find(p => p.id === w.productId))
        //   .filter(Boolean)
        //   .map(p => ({
        //     productId: p.id,
        //     name: p.name,
        //     price: p.price,
        //     image: p.imageUrl,
        //     stock: p.stockQuantity
        //   }));

        // setWishlist(fullWishlist);



        const rows = res.data.data || [];

const fullWishlist = rows.map(w => ({
  productId: w.productId,
  name: w.productName,
  price: w.price,
  image: w.imageUrl,
  stock: w.stockQuantity        // 🔥 REAL DB STOCK
}));

setWishlist(fullWishlist);

      } catch {
        console.log("Wishlist load failed");
      }
    };

    loadWishlist();
  }, [user]);

  const toggleWishlist = async (product) => {
    if (!user) return toast.error("Please login");

    try {
      const exists = wishlist.some(w => w.productId === product.id);

      if (exists) {
        await api.delete(`/Wishlist/${product.id}`);
        setWishlist(prev => prev.filter(w => w.productId !== product.id));
        toast("Removed from wishlist 💔");
      } else {
        await api.post(`/Wishlist/${product.id}`);
      setWishlist(prev => [
  ...prev,
  {
    productId: product.id || product.productId,
    name: product.name,
    price: product.price,
    image: product.imageUrl || product.image,
    stock: product.stockQuantity ?? product.stock ?? 0   // ✅ FIXED
  }
]);

        toast.success("Added to wishlist ❤️");
      }
    } catch {
      toast.error("Wishlist update failed");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await api.delete(`/Wishlist/${id}`);
      setWishlist(prev => prev.filter(w => w.productId !== id));   // 🔥 FIXED
      toast("Removed from wishlist");
    } catch {
      toast.error("Failed to remove");
    }
  };

  const moveToCart = async (product) => {
    if (!user) return toast.error("Please login");

    try {
      addToCart({ id: product.productId }, 1);

      removeFromWishlist(product.productId || product.id);
    } catch {
      toast.error("Failed to move to cart");
    }
  };

  const addOrder = async (order) => {
    if (!user) return;

    try {
      const updatedOrders = [...orders, order];
      setOrders(updatedOrders);
      await api.patch(`/users/${user.id}`, { orders: updatedOrders });
      toast.success("Order saved");
    } catch {
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
