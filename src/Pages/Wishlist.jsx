
import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { Star, Package, Heart, ShoppingCart, Trash2 } from "lucide-react";
import api from "../Api/Axios_Instance";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
  const [productsWithStock, setProductsWithStock] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch current stock for all wishlist items
useEffect(() => {
  const fetchStockData = async () => {
    if (!wishlist || wishlist.length === 0) {
      setProductsWithStock([]);
      setLoading(false);
      return;
    }

    try {
      const updatedProducts = await Promise.all(
        wishlist.map(async (item) => {
          try {
            const res = await api.get(`/Products/GetBy_${item.productId}`);
            const p = res.data.data || res.data;

            return {
              ...item,
              stock: p.stockQuantity ?? p.stock ?? 0,
              image: item.image || p.imageUrl || "/images/default.jpg"
            };
          } catch {
            return item;
          }
        })
      );

      setProductsWithStock(updatedProducts);
    } catch {
      setProductsWithStock(wishlist);
    } finally {
      setLoading(false);
    }
  };

  fetchStockData();
}, [wishlist]);


  const getStockStatus = (stock) => {
    if (!stock || stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50 border-red-200" };
    if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-50 border-orange-200" };
    if (stock <= 10) return { text: `${stock} in stock`, color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { text: "In Stock", color: "text-green-600 bg-green-50 border-green-200" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 xs:h-16 xs:w-16 border-4 border-slate-200 border-t-slate-900"></div>
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600 animate-pulse" size={20} xs:size={24} />
        </div>
      </div>
    );
  }

  if (!productsWithStock || productsWithStock.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 px-3 xs:px-4 sm:px-6">
        <div className="text-center p-6 xs:p-8 sm:p-12 bg-white rounded-xl xs:rounded-2xl shadow-lg border border-slate-200 w-full max-w-xs xs:max-w-sm sm:max-w-md">
          <div className="mb-4 xs:mb-6">
            <Heart className="text-slate-400 mx-auto" size={60} xs:size={70} sm:size={80} />
          </div>
          <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-2 xs:mb-3">
            Your Wishlist is Empty
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-4 xs:mb-6"></div>
          <p className="text-slate-600 text-sm xs:text-base">
            Start adding items you love
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12 xs:py-16 sm:py-20 px-3 xs:px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 xs:mb-10 sm:mb-12 text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif font-light text-slate-900 mb-2 xs:mb-3">
            Your Wishlist
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-3 xs:mb-4"></div>
          <p className="text-slate-600 text-sm xs:text-base">
            {productsWithStock.length} {productsWithStock.length === 1 ? 'item' : 'items'} you love
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
          {productsWithStock.map((item) => {
            const stockStatus = getStockStatus(item.stock);
            const isOutOfStock = !item.stock || item.stock <= 0;

            return (
              <div
                key={item.id}
                className={`group bg-white rounded-lg xs:rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col relative overflow-hidden hover:shadow-md ${
                  isOutOfStock ? "opacity-75" : ""
                }`}
              >
                {/* Stock Badge */}
                <div className={`absolute top-3 xs:top-4 left-3 xs:left-4 px-2 xs:px-3 py-1 xs:py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 xs:gap-1.5 z-10 border ${stockStatus.color}`}>
                  <Package size={12} xs:size={14} />
                  <span className="hidden xs:inline">{stockStatus.text}</span>
                  <span className="xs:hidden">
                    {stockStatus.text.includes("Only") ? `${item.stock} left` : 
                     stockStatus.text.includes("Out") ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative w-full h-40 xs:h-48 sm:h-56 bg-slate-50 rounded-t-lg xs:rounded-t-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 object-contain transform group-hover:scale-105 transition-transform duration-500 ${
                      isOutOfStock ? "grayscale" : ""
                    }`}
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 xs:p-4 sm:p-5 flex flex-col flex-1">
                  <h2 className="text-sm xs:text-base font-medium text-slate-900 mb-1 xs:mb-2 line-clamp-2 group-hover:text-slate-600 transition-colors duration-300">
                    {item.name}
                  </h2>
                  <p className="text-xl xs:text-2xl font-semibold text-slate-900 mb-2 xs:mb-3">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  {/* Ratings */}
                  {item.rating && (
                    <div className="flex items-center mb-2 xs:mb-3">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            xs:size={16}
                            className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-slate-600 text-xs xs:text-sm ml-1 xs:ml-2 font-medium">
                        ({item.reviews || 0})
                      </span>
                    </div>
                  )}

                  {/* "4★ & above" badge */}
                  {item.rating >= 4 && (
                    <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2 xs:px-3 py-1 rounded-lg mb-2 xs:mb-3 border border-green-200 w-fit">
                      4★ & above
                    </span>
                  )}

                  {/* Out of Stock Warning */}
                  {isOutOfStock && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 xs:p-3 mb-2 xs:mb-3">
                      <p className="text-red-600 text-xs xs:text-sm font-medium">
                        Currently Unavailable
                      </p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-auto flex flex-col gap-2 xs:gap-3">
                    <button
                  //  onClick={() => moveToCart(item.productId)}                    
onClick={() => moveToCart(item.productId)}

                   disabled={isOutOfStock}
                      className={`w-full py-2 xs:py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 xs:gap-2 text-sm xs:text-base ${
                        isOutOfStock
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                      }`}
                    >
                      {!isOutOfStock && (
                        <ShoppingCart size={16} xs:size={18} />
                      )}
                      <span>
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </span>
                    </button>
                    <button
                   onClick={() => removeFromWishlist(item.productId)}    
                  className="w-full bg-slate-50 text-slate-700 py-2 xs:py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-1 xs:gap-2 text-sm xs:text-base"
                    >
                      <Trash2 size={16} xs:size={18} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}