



// import { useState, useEffect } from "react";
// import { useWishlist } from "../context/WishlistContext";
// import { Star, Package } from "lucide-react";
// import api from "../Api/Axios_Instance";

// export default function Wishlist() {
//   const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
//   const [productsWithStock, setProductsWithStock] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch current stock for all wishlist items
//   useEffect(() => {
//     const fetchStockData = async () => {
//       if (!wishlist || wishlist.length === 0) {
//         setProductsWithStock([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const updatedProducts = await Promise.all(
//           wishlist.map(async (item) => {
//             try {
//               const response = await api.get(`/products/${item.id}`);
//               return { ...item, stock: response.data.stock };
//             } catch (error) {
//               console.error(`Failed to fetch stock for ${item.name}:`, error);
//               return { ...item, stock: 0 }; // Default to 0 if fetch fails
//             }
//           })
//         );
//         setProductsWithStock(updatedProducts);
//       } catch (error) {
//         console.error("Error fetching stock data:", error);
//         setProductsWithStock(wishlist);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockData();
//   }, [wishlist]);

//   const getStockStatus = (stock) => {
//     if (!stock || stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-100" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-100" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-100" };
//     return { text: "In Stock", color: "text-green-600 bg-green-100" };
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
//       </div>
//     );
//   }

//   if (!productsWithStock || productsWithStock.length === 0) {
//     return (
//       <h2 className="text-center text-gray-600 mt-10 text-xl">
//         Your wishlist is empty ❤️
//       </h2>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold mb-8 text-pink-600">Your Wishlist</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {productsWithStock.map((item) => {
//           const stockStatus = getStockStatus(item.stock);
//           const isOutOfStock = !item.stock || item.stock <= 0;

//           return (
//             <div
//               key={item.id}
//               className={`bg-white rounded-2xl shadow hover:shadow-lg transition border flex flex-col relative ${
//                 isOutOfStock ? "opacity-75" : ""
//               }`}
//             >
//               {/* Stock Badge */}
//               <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 ${stockStatus.color}`}>
//                 <Package size={12} />
//                 {stockStatus.text}
//               </div>

//               {/* Product Image */}
//               <div className="relative w-full h-52 bg-gray-100 rounded-t-2xl flex items-center justify-center">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className={`w-32 h-32 object-contain ${isOutOfStock ? "grayscale" : ""}`}
//                 />
//               </div>

//               {/* Product Info */}
//               <div className="p-4 flex flex-col flex-1">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
//                   {item.name}
//                 </h2>
//                 <p className="text-gray-700 font-bold text-lg mb-2">
//                   ${Number(item.price).toFixed(2)}
//                 </p>

//                 {/* Ratings */}
//                 {item.rating && (
//                   <div className="flex items-center mb-3">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <Star
//                         key={i}
//                         size={16}
//                         className={i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
//                       />
//                     ))}
//                     <span className="text-gray-600 text-sm ml-2">
//                       ({item.reviews || 0})
//                     </span>
//                   </div>
//                 )}

//                 {/* "4★ & above" badge */}
//                 {item.rating >= 4 && (
//                   <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
//                     4★ & above
//                   </span>
//                 )}

//                 {/* Out of Stock Warning */}
//                 {isOutOfStock && (
//                   <p className="text-red-600 text-sm font-medium mb-3">
//                     This item is currently unavailable
//                   </p>
//                 )}

//                 {/* Buttons */}
//                 <div className="mt-auto flex flex-col gap-3">
//                   <button
//                     onClick={() => moveToCart(item)}
//                     disabled={isOutOfStock}
//                     className={`w-full py-2 rounded-lg font-medium transition ${
//                       isOutOfStock
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-black text-white hover:bg-gray-900"
//                     }`}
//                   >
//                     {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//                   </button>
//                   <button
//                     onClick={() => removeFromWishlist(item.id)}
//                     className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-medium hover:bg-red-200 transition"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }















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
              const response = await api.get(`/products/${item.id}`);
              return { ...item, stock: response.data.stock };
            } catch (error) {
              console.error(`Failed to fetch stock for ${item.name}:`, error);
              return { ...item, stock: 0 };
            }
          })
        );
        setProductsWithStock(updatedProducts);
      } catch (error) {
        console.error("Error fetching stock data:", error);
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
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-900"></div>
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600 animate-pulse" size={24} />
        </div>
      </div>
    );
  }

  if (!productsWithStock || productsWithStock.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-md">
          <div className="mb-6">
            <Heart className="text-slate-400 mx-auto" size={80} />
          </div>
          <h2 className="text-3xl font-serif font-light text-slate-900 mb-3">
            Your Wishlist is Empty
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-6"></div>
          <p className="text-slate-600 text-base">
            Start adding items you love
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-3">
            Your Wishlist
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-md mx-auto mb-4"></div>
          <p className="text-slate-600 text-base">
            {productsWithStock.length} {productsWithStock.length === 1 ? 'item' : 'items'} you love
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsWithStock.map((item) => {
            const stockStatus = getStockStatus(item.stock);
            const isOutOfStock = !item.stock || item.stock <= 0;

            return (
              <div
                key={item.id}
                className={`group bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col relative overflow-hidden hover:shadow-md ${
                  isOutOfStock ? "opacity-75" : ""
                }`}
              >
                {/* Stock Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 z-10 border ${stockStatus.color}`}>
                  <Package size={14} />
                  {stockStatus.text}
                </div>

                {/* Product Image */}
                <div className="relative w-full h-56 bg-slate-50 rounded-t-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-36 h-36 object-contain transform group-hover:scale-105 transition-transform duration-500 ${
                      isOutOfStock ? "grayscale" : ""
                    }`}
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-base font-medium text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-600 transition-colors duration-300">
                    {item.name}
                  </h2>
                  <p className="text-2xl font-semibold text-slate-900 mb-3">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  {/* Ratings */}
                  {item.rating && (
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-slate-600 text-sm ml-2 font-medium">
                        ({item.reviews || 0})
                      </span>
                    </div>
                  )}

                  {/* "4★ & above" badge */}
                  {item.rating >= 4 && (
                    <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-lg mb-3 border border-green-200 w-fit">
                      4★ & above
                    </span>
                  )}

                  {/* Out of Stock Warning */}
                  {isOutOfStock && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                      <p className="text-red-600 text-sm font-medium">
                        Currently Unavailable
                      </p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-auto flex flex-col gap-3">
                    <button
                      onClick={() => moveToCart(item)}
                      disabled={isOutOfStock}
                      className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isOutOfStock
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                      }`}
                    >
                      {!isOutOfStock && (
                        <ShoppingCart size={18} />
                      )}
                      <span>
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full bg-slate-50 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
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