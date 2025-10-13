




import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance.jsx";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]); // State for orders

  // Fetch initial wishlist and orders from the database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setWishlist([]);
        setOrders([]);
        return;
      }
      
      try {
        const userRes = await api.get(`/users/${user.id}`);
        const userData = userRes.data;
        setWishlist(userData.wishlist || []);
        setOrders(userData.orders || []);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to load your data from the server");
        setWishlist([]);
        setOrders([]);
      }
    };
    fetchUserData();
  }, [user]);

  // Add to Wishlist
  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    // Prevent duplicates
    if (wishlist.find((item) => item.id === product.id)) {
      toast("Already in wishlist", { icon: "⚠️" });
      return;
    }

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    // toast.success(`${product.name} added to wishlist`);

    try {
      // Use PATCH to update only the wishlist property
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist on server");
    }
  };

  const removeFromWishlist = async (id) => {
    if (!user) return;
    
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    toast("Removed from wishlist");

    try {
      // Use PATCH to update only the wishlist property
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist on server");
    }
  };

  const toggleWishlist = (product) => {
    if (wishlist.find((p) => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Move to cart with stock validation
  const moveToCart = async (product) => {
    if (!user) {
      toast.error("Please login to move items to cart");
      return;
    }
    
    try {
      // Fetch current product data to check stock
      const productRes = await api.get(`/products/${product.id}`);
      const currentProduct = productRes.data;
      
      // Check if product is out of stock
      if (!currentProduct.stock || currentProduct.stock <= 0) {
        toast.error("Sorry, this product is out of stock!");
        return;
      }
      
      // Call the original addToCart function from CartContext
      if (addToCart) {
        addToCart({ ...product, stock: currentProduct.stock }, 1);
        removeFromWishlist(product.id); // Remove silently
      }
    } catch (error) {
      console.error("Error checking product stock:", error);
      toast.error("Failed to add to cart. Please try again.");
    }
  };
  
  // This is a placeholder for adding new orders to the user's orders list
  const addOrder = async (order) => {
    if (!user) return;
    
    try {
      const updatedOrders = [...orders, order];
      setOrders(updatedOrders);
      
      // PATCH to update just the orders array on the user object
      await api.patch(`/users/${user.id}`, { orders: updatedOrders });
      toast.success("Order saved to profile!");
    } catch (error) {
      console.error("Failed to add order to user profile:", error);
      toast.error("Failed to save order to profile");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        orders,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        moveToCart,
        addOrder, // Now available for other components to use
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};