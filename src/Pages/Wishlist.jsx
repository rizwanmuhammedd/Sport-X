
// import { useState, useEffect } from "react";
// import { useWishlist } from "../context/WishlistContext";
// import { Star, Package, Heart, ShoppingCart, Trash2 } from "lucide-react";
// import api from "../Api/Axios_Instance";

// export default function Wishlist() {
//   const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
//   const [productsWithStock, setProductsWithStock] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch current stock for all wishlist items
// useEffect(() => {
//   const fetchStockData = async () => {
//     if (!wishlist || wishlist.length === 0) {
//       setProductsWithStock([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const updatedProducts = await Promise.all(
//         wishlist.map(async (item) => {
//           try {
//             const res = await api.get(`/Products/GetBy_${item.productId}`);
//             const p = res.data.data || res.data;

//             return {
//               ...item,
//               stock: p.stockQuantity ?? p.stock ?? 0,
//               image: item.image || p.imageUrl || "/images/default.jpg"
//             };
//           } catch {
//             return item;
//           }
//         })
//       );

//       setProductsWithStock(updatedProducts);
//     } catch {
//       setProductsWithStock(wishlist);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchStockData();
// }, [wishlist]);


//   const getStockStatus = (stock) => {
//     if (!stock || stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50 border-red-200" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-50 border-orange-200" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-amber-600 bg-amber-50 border-amber-200" };
//     return { text: "In Stock", color: "text-green-600 bg-green-50 border-green-200" };
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-12 w-12 xs:h-16 xs:w-16 border-4 border-slate-200 border-t-slate-900"></div>
//           <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600 animate-pulse" size={20} xs:size={24} />
//         </div>
//       </div>
//     );
//   }

//   if (!productsWithStock || productsWithStock.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 px-3 xs:px-4 sm:px-6">
//         <div className="text-center p-6 xs:p-8 sm:p-12 bg-white rounded-xl xs:rounded-2xl shadow-lg border border-slate-200 w-full max-w-xs xs:max-w-sm sm:max-w-md">
//           <div className="mb-4 xs:mb-6">
//             <Heart className="text-slate-400 mx-auto" size={60} xs:size={70} sm:size={80} />
//           </div>
//           <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-2 xs:mb-3">
//             Your Wishlist is Empty
//           </h2>
//           <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-4 xs:mb-6"></div>
//           <p className="text-slate-600 text-sm xs:text-base">
//             Start adding items you love
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12 xs:py-16 sm:py-20 px-3 xs:px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 xs:mb-10 sm:mb-12 text-center">
//           <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif font-light text-slate-900 mb-2 xs:mb-3">
//             Your Wishlist
//           </h1>
//           <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-3 xs:mb-4"></div>
//           <p className="text-slate-600 text-sm xs:text-base">
//             {productsWithStock.length} {productsWithStock.length === 1 ? 'item' : 'items'} you love
//           </p>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
//           {productsWithStock.map((item) => {
//             const stockStatus = getStockStatus(item.stock);
//             const isOutOfStock = !item.stock || item.stock <= 0;

//             return (
//               <div
//                 key={item.id}
//                 className={`group bg-white rounded-lg xs:rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col relative overflow-hidden hover:shadow-md ${
//                   isOutOfStock ? "opacity-75" : ""
//                 }`}
//               >
//                 {/* Stock Badge */}
//                 <div className={`absolute top-3 xs:top-4 left-3 xs:left-4 px-2 xs:px-3 py-1 xs:py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 xs:gap-1.5 z-10 border ${stockStatus.color}`}>
//                   <Package size={12} xs:size={14} />
//                   <span className="hidden xs:inline">{stockStatus.text}</span>
//                   <span className="xs:hidden">
//                     {stockStatus.text.includes("Only") ? `${item.stock} left` : 
//                      stockStatus.text.includes("Out") ? "Out of Stock" : "In Stock"}
//                   </span>
//                 </div>

//                 {/* Product Image */}
//                 <div className="relative w-full h-40 xs:h-48 sm:h-56 bg-slate-50 rounded-t-lg xs:rounded-t-xl flex items-center justify-center overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className={`w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 object-contain transform group-hover:scale-105 transition-transform duration-500 ${
//                       isOutOfStock ? "grayscale" : ""
//                     }`}
//                   />
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-3 xs:p-4 sm:p-5 flex flex-col flex-1">
//                   <h2 className="text-sm xs:text-base font-medium text-slate-900 mb-1 xs:mb-2 line-clamp-2 group-hover:text-slate-600 transition-colors duration-300">
//                     {item.name}
//                   </h2>
//                   <p className="text-xl xs:text-2xl font-semibold text-slate-900 mb-2 xs:mb-3">
//                     ${Number(item.price).toFixed(2)}
//                   </p>

//                   {/* Ratings */}
//                   {item.rating && (
//                     <div className="flex items-center mb-2 xs:mb-3">
//                       <div className="flex">
//                         {Array.from({ length: 5 }, (_, i) => (
//                           <Star
//                             key={i}
//                             size={14}
//                             xs:size={16}
//                             className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-slate-600 text-xs xs:text-sm ml-1 xs:ml-2 font-medium">
//                         ({item.reviews || 0})
//                       </span>
//                     </div>
//                   )}

//                   {/* "4★ & above" badge */}
//                   {item.rating >= 4 && (
//                     <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2 xs:px-3 py-1 rounded-lg mb-2 xs:mb-3 border border-green-200 w-fit">
//                       4★ & above
//                     </span>
//                   )}

//                   {/* Out of Stock Warning */}
//                   {isOutOfStock && (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-2 xs:p-3 mb-2 xs:mb-3">
//                       <p className="text-red-600 text-xs xs:text-sm font-medium">
//                         Currently Unavailable
//                       </p>
//                     </div>
//                   )}

//                   {/* Buttons */}
//                   <div className="mt-auto flex flex-col gap-2 xs:gap-3">
//                     <button
//                   //  onClick={() => moveToCart(item.productId)}                    
// onClick={() => moveToCart(item.productId)}

//                    disabled={isOutOfStock}
//                       className={`w-full py-2 xs:py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1 xs:gap-2 text-sm xs:text-base ${
//                         isOutOfStock
//                           ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                           : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
//                       }`}
//                     >
//                       {!isOutOfStock && (
//                         <ShoppingCart size={16} xs:size={18} />
//                       )}
//                       <span>
//                         {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//                       </span>
//                     </button>
//                     <button
//                    onClick={() => removeFromWishlist(item.productId)}    
//                   className="w-full bg-slate-50 text-slate-700 py-2 xs:py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-1 xs:gap-2 text-sm xs:text-base"
//                     >
//                       <Trash2 size={16} xs:size={18} />
//                       <span>Remove</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useNavigate } from "react-router-dom";


import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";
import { Star, Package, Heart, ShoppingCart, Trash2, Sparkles, ChevronRight } from "lucide-react";
import api from "../Api/Axios_Instance";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
  const [productsWithStock, setProductsWithStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


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
    if (!stock || stock <= 0) return { 
      text: "Out of Stock", 
      color: "text-red-400 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30",
      iconColor: "text-red-400 dark:text-red-300"
    };
    if (stock <= 5) return { 
      text: `Only ${stock} left`, 
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30",
      iconColor: "text-amber-600 dark:text-amber-400"
    };
    if (stock <= 10) return { 
      text: `${stock} in stock`, 
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    };
    return { 
      text: "In Stock", 
      color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30",
      iconColor: "text-green-600 dark:text-green-400"
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-300"></div>
            <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-300 animate-pulse" size={24} />
          </div>
        </div>
      </div>
    );
  }

  if (!productsWithStock || productsWithStock.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pt-24 pb-32">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full blur-xl"></div>
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <Heart className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={80} strokeWidth={1.5} />
                <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-3 tracking-tight">
                  Your Wishlist Awaits
                </h1>
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6"></div>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
                  Items you love will appear here. Start building your collection.
                </p>
                <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
                  Start Exploring
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Premium Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl">
              <Heart className="text-gray-900 dark:text-white" size={28} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider">CURATED SELECTION</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
            Saved For You
          </h1>
          
          <div className="relative w-48 h-px mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 dark:via-white/20 to-transparent blur-sm"></div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            <span className="font-medium text-gray-900 dark:text-white">{productsWithStock.length}</span> premium {productsWithStock.length === 1 ? 'item' : 'items'} in your collection
          </p>
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {productsWithStock.map((item) => {
            const stockStatus = getStockStatus(item.stock);
            const isOutOfStock = !item.stock || item.stock <= 0;

            return (
              <div
key={item.productId}
                className={`group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden ${
                  isOutOfStock ? "opacity-70" : ""
                }`}
              >
                {/* Premium background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Stock Status Badge - Premium */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 z-10 border backdrop-blur-sm ${stockStatus.color}`}>
                  <Package size={14} className={stockStatus.iconColor} />
                  <span className="font-semibold">{stockStatus.text}</span>
                </div>

                {/* Product Image with Premium Frame */}
                <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 dark:via-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
  src={item.image || "/images/default.jpg"}
  alt={item.name}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/images/default.jpg";
  }}
  className={`relative w-48 h-48 object-contain transform group-hover:scale-110 transition-transform duration-700 ${
    isOutOfStock ? "grayscale opacity-50" : ""
  }`}
/>


                </div>

                {/* Product Info */}
                <div className="p-6 relative">
                  {/* Product Name */}
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {item.name}
                  </h2>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${Number(item.price).toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${Number(item.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Ratings */}
                  {item.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={16}
                            strokeWidth={1.5}
                            className={i < Math.floor(item.rating) 
                              ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
                              : "text-gray-300 dark:text-gray-700"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-400 dark:text-gray-600">
                        ({item.reviews || 0} reviews)
                      </span>
                    </div>
                  )}

                  {/* Premium Badge - Only show for in-stock items with high rating */}
                  {!isOutOfStock && item.rating >= 4.5 && (
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-amber-200 dark:border-amber-800/30">
                      <Sparkles size={12} />
                      Premium Choice
                    </div>
                  )}

                  {/* Action Buttons - Premium Style */}
                  <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                 <button
  onClick={async () => {
    const ok = await moveToCart(item.productId);
    if (ok) navigate("/cart");
  }}
  disabled={isOutOfStock}
   className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 text-sm ${
                        isOutOfStock
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                          : "bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      }`}
>
  {!isOutOfStock && <ShoppingCart size={18} />}
  <span className="font-semibold">
    {isOutOfStock ? "Out of Stock" : "Move to Cart"}
  </span>
</button>

                    
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="group relative w-full bg-transparent text-gray-600 dark:text-gray-400 py-3 rounded-xl font-medium hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800/30 flex items-center justify-center gap-3 text-sm hover:bg-red-50/50 dark:hover:bg-red-900/10"
                    >
                      <Trash2 size={18} />
                      <span className="font-semibold">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Footer Note */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-600">
            Your wishlist is synced across all devices. Items are automatically updated for stock and price changes.
          </p>
        </div>
      </div>
    </div>
  );
}









 