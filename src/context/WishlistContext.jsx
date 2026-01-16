

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
  if (!user || user.role === "Admin") {
    setWishlist([]);
    setOrders([]);
    return;
  }


   const loadWishlist = async () => {
  try {
    const res = await api.get("/Wishlist");

    console.log(res.data.data);

    const wishlistData = res.data.data || [];

    const fullWishlist = wishlistData.map(w => ({
      productId: w.productId,
      id: w.id,
      name: w.productName,
      price: w.price,
      image: w.imageUrl,
      stock: w.stockQuantity,
      category: w.category
    }));

    setWishlist(fullWishlist);
  } catch (err) {
    toast.error("Failed to load wishlist");
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
      toast.success("Removed from wishlist 💔");
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

      toast.success("Added to wishlist ❤️");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Wishlist update failed");
  }
};



  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/Wishlist/${productId}`);
      setWishlist(prev => prev.filter(w => w.productId !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove");
    }
  };
const moveToCart = async (productId) => {
  if (!user) return toast.error("Please login");

  const product = wishlist.find(w => w.productId === productId);
  if (!product) return toast.error("Product not found");

  const cartProduct = {
    id: product.productId,
    name: product.name,
    price: product.price,
    image: product.image,
    stockQuantity: product.stock,
    category: product.category
  };

  addToCart(cartProduct, 1);
  await removeFromWishlist(productId);
  toast.success("Moved to cart");
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