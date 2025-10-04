
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart, ShoppingCart, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  // Function to handle Buy Now click
  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to proceed to checkout.");
      navigate("/login");
      return;
    }
    // Navigate to checkout with a single-item array for consistency
    navigate("/checkout", { state: [{ ...product, quantity: 1 }] });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add to cart.");
      navigate("/login");
      return;
    }
    addToCart({ ...product, quantity: 1 });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleClickProduct = () => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div
      onClick={handleClickProduct}
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between cursor-pointer transform hover:scale-105 transition-transform duration-300 relative"
    >
      <div className="absolute top-2 right-2">
        <button
          onClick={handleToggleWishlist}
          className={`p-2 rounded-full transition-colors ${
            isInWishlist
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-red-500 hover:bg-gray-300"
          }`}
        >
          <Heart size={20} className={`${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex justify-center items-center h-48">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 text-xl font-semibold text-blue-600">${product.price}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-sky-500 transition-all duration-300"
        >
          <ShoppingBag size={18} /> Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
