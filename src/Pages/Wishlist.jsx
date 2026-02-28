

// import { useNavigate } from "react-router-dom";


// import { useState, useEffect } from "react";
// import { useWishlist } from "../context/WishlistContext";
// import { Star, Package, Heart, ShoppingCart, Trash2, Sparkles, ChevronRight } from "lucide-react";
// import api from "../Api/Axios_Instance";

// export default function Wishlist() {
//   const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
//   const [productsWithStock, setProductsWithStock] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();


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
//               const res = await api.get(`/Products/GetBy_${item.productId}`);
//               const p = res.data.data || res.data;

//               return {
//                 ...item,
//                 stock: p.stockQuantity ?? p.stock ?? 0,
//                 image: item.image || p.imageUrl || "/images/default.jpg"
//               };
//             } catch {
//               return item;
//             }
//           })
//         );

//         setProductsWithStock(updatedProducts);
//       } catch {
//         setProductsWithStock(wishlist);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStockData();
//   }, [wishlist]);

//   const getStockStatus = (stock) => {
//     if (!stock || stock <= 0) return { 
//       text: "Out of Stock", 
//       color: "text-red-400 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30",
//       iconColor: "text-red-400 dark:text-red-300"
//     };
//     if (stock <= 5) return { 
//       text: `Only ${stock} left`, 
//       color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30",
//       iconColor: "text-amber-600 dark:text-amber-400"
//     };
//     if (stock <= 10) return { 
//       text: `${stock} in stock`, 
//       color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30",
//       iconColor: "text-emerald-600 dark:text-emerald-400"
//     };
//     return { 
//       text: "In Stock", 
//       color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30",
//       iconColor: "text-green-600 dark:text-green-400"
//     };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
//         <div className="flex items-center justify-center min-h-[70vh]">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-300"></div>
//             <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-300 animate-pulse" size={24} />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!productsWithStock || productsWithStock.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto pt-24 pb-32">
//           <div className="text-center">
//             <div className="relative inline-block mb-8">
//               <div className="absolute -inset-4 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full blur-xl"></div>
//               <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
//                 <Heart className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={80} strokeWidth={1.5} />
//                 <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-3 tracking-tight">
//                   Your Wishlist Awaits
//                 </h1>
//                 <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6"></div>
//                 <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
//                   Items you love will appear here. Start building your collection.
//                 </p>
//                 <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-medium">
//                   Start Exploring
//                   <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//         {/* Premium Header */}
//         <div className="text-center mb-12 lg:mb-16">
//           <div className="inline-flex items-center gap-3 mb-6">
//             <div className="p-2 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl">
//               <Heart className="text-gray-900 dark:text-white" size={28} strokeWidth={1.5} />
//             </div>
//             <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider">CURATED SELECTION</span>
//           </div>
          
//           <h1 className="text-5xl lg:text-6xl font-light text-gray-900 dark:text-white tracking-tight mb-4">
//             Saved For You
//           </h1>
          
//           <div className="relative w-48 h-px mx-auto mb-6">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 dark:via-white/20 to-transparent blur-sm"></div>
//           </div>
          
//           <p className="text-gray-600 dark:text-gray-400 text-lg">
//             <span className="font-medium text-gray-900 dark:text-white">{productsWithStock.length}</span> premium {productsWithStock.length === 1 ? 'item' : 'items'} in your collection
//           </p>
//         </div>

//         {/* Premium Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
//           {productsWithStock.map((item) => {
//             const stockStatus = getStockStatus(item.stock);
//             const isOutOfStock = !item.stock || item.stock <= 0;

//             return (
//               <div
// key={item.productId}
//                 className={`group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden ${
//                   isOutOfStock ? "opacity-70" : ""
//                 }`}
//               >
//                 {/* Premium background effect */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
//                 {/* Stock Status Badge - Premium */}
//                 <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 z-10 border backdrop-blur-sm ${stockStatus.color}`}>
//                   <Package size={14} className={stockStatus.iconColor} />
//                   <span className="font-semibold">{stockStatus.text}</span>
//                 </div>

//                 {/* Product Image with Premium Frame */}
//                 <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 dark:via-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <img
//   src={item.image || "/images/default.jpg"}
//   alt={item.name}
//   onError={(e) => {
//     e.target.onerror = null;
//     e.target.src = "/images/default.jpg";
//   }}
//   className={`relative w-48 h-48 object-contain transform group-hover:scale-110 transition-transform duration-700 ${
//     isOutOfStock ? "grayscale opacity-50" : ""
//   }`}
// />


//                 </div>

//                 {/* Product Info */}
//                 <div className="p-6 relative">
//                   {/* Product Name */}
//                   <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
//                     {item.name}
//                   </h2>
                  
//                   {/* Price */}
//                   <div className="flex items-baseline gap-2 mb-4">
//                     <span className="text-2xl font-bold text-gray-900 dark:text-white">
//                       ${Number(item.price).toFixed(2)}
//                     </span>
//                     {item.originalPrice && (
//                       <span className="text-sm text-gray-400 line-through">
//                         ${Number(item.originalPrice).toFixed(2)}
//                       </span>
//                     )}
//                   </div>

//                   {/* Ratings */}
//                   {item.rating && (
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="flex">
//                         {Array.from({ length: 5 }, (_, i) => (
//                           <Star
//                             key={i}
//                             size={16}
//                             strokeWidth={1.5}
//                             className={i < Math.floor(item.rating) 
//                               ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
//                               : "text-gray-300 dark:text-gray-700"
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                         {item.rating.toFixed(1)}
//                       </span>
//                       <span className="text-sm text-gray-400 dark:text-gray-600">
//                         ({item.reviews || 0} reviews)
//                       </span>
//                     </div>
//                   )}

//                   {/* Premium Badge - Only show for in-stock items with high rating */}
//                   {!isOutOfStock && item.rating >= 4.5 && (
//                     <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-amber-200 dark:border-amber-800/30">
//                       <Sparkles size={12} />
//                       Premium Choice
//                     </div>
//                   )}

//                   {/* Action Buttons - Premium Style */}
//                   <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
//                  <button
//   onClick={async () => {
//     const ok = await moveToCart(item.productId);
//     if (ok) navigate("/cart");
//   }}
//   disabled={isOutOfStock}
//    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 text-sm ${
//                         isOutOfStock
//                           ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
//                           : "bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
//                       }`}
// >
//   {!isOutOfStock && <ShoppingCart size={18} />}
//   <span className="font-semibold">
//     {isOutOfStock ? "Out of Stock" : "Move to Cart"}
//   </span>
// </button>

                    
//                     <button
//                       onClick={() => removeFromWishlist(item.productId)}
//                       className="group relative w-full bg-transparent text-gray-600 dark:text-gray-400 py-3 rounded-xl font-medium hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800/30 flex items-center justify-center gap-3 text-sm hover:bg-red-50/50 dark:hover:bg-red-900/10"
//                     >
//                       <Trash2 size={18} />
//                       <span className="font-semibold">Remove</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Premium Footer Note */}
//         <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
//           <p className="text-sm text-gray-500 dark:text-gray-600">
//             Your wishlist is synced across all devices. Items are automatically updated for stock and price changes.
//           </p>
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
              return { ...item, stock: p.stockQuantity ?? p.stock ?? 0, image: item.image || p.imageUrl || "/images/default.jpg" };
            } catch { return item; }
          })
        );
        setProductsWithStock(updatedProducts);
      } catch { setProductsWithStock(wishlist); }
      finally { setLoading(false); }
    };
    fetchStockData();
  }, [wishlist]);

  const getStockStatus = (stock) => {
    if (!stock || stock <= 0) return { text: "Out of Stock", color: "text-red-400 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30", iconColor: "text-red-400 dark:text-red-300" };
    if (stock <= 5) return { text: `Only ${stock} left`, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30", iconColor: "text-amber-600 dark:text-amber-400" };
    if (stock <= 10) return { text: `${stock} in stock`, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30", iconColor: "text-emerald-600 dark:text-emerald-400" };
    return { text: "In Stock", color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30", iconColor: "text-green-600 dark:text-green-400" };
  };

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="w-page">
          <div className="w-center">
            <div className="w-spin-wrap">
              <div className="w-spinner" />
              <Heart size={18} color="#fff" className="w-spin-icon" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!productsWithStock || productsWithStock.length === 0) {
    return (
      <>
        <style>{css}</style>
        <div className="w-page">
          <div className="w-center">
            <Heart size={60} color="#1a1a1a" strokeWidth={1} style={{ marginBottom: 24 }} />
            <p className="w-eyebrow">CURATED SELECTION</p>
            <h1 className="w-hero-title">YOUR WISHLIST AWAITS</h1>
            <div className="w-rule-h" />
            <p className="w-muted-body">Items you save will appear here.</p>
            <button className="w-btn-white" onClick={() => navigate("/")}>
              START EXPLORING <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="w-page">

        {/* HEADER */}
        <header className="w-page-header">
          <p className="w-eyebrow">CURATED SELECTION</p>
          <h1 className="w-hero-title">SAVED FOR YOU</h1>
          <div className="w-rule-h" />
          <p className="w-header-sub">
            {productsWithStock.length} PREMIUM {productsWithStock.length === 1 ? "ITEM" : "ITEMS"}
          </p>
        </header>

        {/* GRID */}
        <div className="w-container">
          <div className="w-grid">
            {productsWithStock.map((item) => {
              const stockStatus = getStockStatus(item.stock);
              const isOutOfStock = !item.stock || item.stock <= 0;

              return (
                <div key={item.productId} className="w-card">

                  {/* Stock badge */}
                  <div className="w-stock-badge" style={{
                    color: isOutOfStock ? "#ef4444" : item.stock <= 5 ? "#f59e0b" : "#4ade80",
                    borderColor: isOutOfStock ? "#7f1d1d" : item.stock <= 5 ? "#92400e" : "#14532d",
                  }}>
                    <Package size={9} /> {stockStatus.text.toUpperCase()}
                  </div>

                  {/* Image */}
                  <div className="w-img-wrap">
                    <img
                      src={item.image || "/images/default.jpg"}
                      alt={item.name}
                      className="w-img"
                      style={{ filter: isOutOfStock ? "grayscale(1) opacity(0.3)" : "none" }}
                      onError={e => { e.target.onerror = null; e.target.src = "/images/default.jpg"; }}
                    />
                    {!isOutOfStock && item.rating >= 4.5 && (
                      <div className="w-premium-tag">
                        <Sparkles size={9} /> PREMIUM PICK
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="w-info">
                    <h2 className="w-name">{item.name}</h2>
                    <p className="w-price">${Number(item.price).toFixed(2)}</p>

                    {item.rating && (
                      <div className="w-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} size={12} strokeWidth={1.5}
                            color={i < Math.floor(item.rating) ? "#f59e0b" : "#1e1e1e"}
                            fill={i < Math.floor(item.rating) ? "#f59e0b" : "none"}
                          />
                        ))}
                        <span className="w-rating-val">{item.rating.toFixed(1)}</span>
                        <span className="w-review-ct">({item.reviews || 0})</span>
                      </div>
                    )}

                    <div className="w-actions">
                      <button
                        className="w-btn-cart"
                        onClick={async () => { const ok = await moveToCart(item.productId); if (ok) navigate("/cart"); }}
                        disabled={isOutOfStock}
                        style={{ opacity: isOutOfStock ? 0.3 : 1, cursor: isOutOfStock ? "not-allowed" : "pointer" }}
                      >
                        {!isOutOfStock && <ShoppingCart size={14} />}
                        {isOutOfStock ? "SOLD OUT" : "MOVE TO CART"}
                      </button>
                      <button className="w-btn-remove" onClick={() => removeFromWishlist(item.productId)}>
                        <Trash2 size={13} /> REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-footer-note">
            <div className="w-divider" />
            <p className="w-footer-text">YOUR WISHLIST SYNCS ACROSS ALL DEVICES — STOCK &amp; PRICE UPDATES AUTOMATICALLY.</p>
          </div>
        </div>

        <div className="w-watermark" aria-hidden>SPORT-X</div>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.w-page{min-height:100vh;background:#000;color:#fff;font-family:'Barlow Condensed',sans-serif;padding-bottom:120px;position:relative;overflow:hidden;}

/* atoms */
.w-eyebrow{font-size:10px;letter-spacing:.28em;color:#2a2a2a;text-transform:uppercase;font-family:'Barlow Condensed',sans-serif;}
.w-rule-h{width:36px;height:1px;background:#1a1a1a;margin:16px auto;}
.w-divider{height:1px;background:#0f0f0f;}
.w-center{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;padding:0 24px;text-align:center;}
.w-muted-body{font-family:'Barlow',sans-serif;color:#333;font-size:13px;letter-spacing:.04em;margin-bottom:28px;}

/* buttons */
.w-btn-white{display:inline-flex;align-items:center;gap:10px;background:#fff;color:#000;border:none;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;letter-spacing:.2em;padding:13px 32px;cursor:pointer;transition:background .18s;}
.w-btn-white:hover{background:#e0e0e0;}

/* header */
.w-page-header{text-align:center;padding:clamp(48px,8vw,96px) 24px 36px;border-bottom:1px solid #0f0f0f;}
.w-hero-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(32px,7vw,68px);font-weight:900;letter-spacing:.08em;color:#fff;line-height:1;}
.w-header-sub{font-size:11px;letter-spacing:.22em;color:#2a2a2a;margin-top:6px;}

/* container + grid */
.w-container{max-width:1280px;margin:0 auto;padding:48px 24px 0;}
.w-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#0f0f0f;}

/* card */
.w-card{background:#000;position:relative;overflow:hidden;border:1px solid #111;transition:border-color .2s;}
.w-card:hover{border-color:#222;}
.w-card:hover .w-img{transform:scale(1.05);}

/* stock badge */
.w-stock-badge{position:absolute;top:12px;left:12px;z-index:10;display:inline-flex;align-items:center;gap:5px;background:#000;border:1px solid;font-family:'Barlow Condensed',sans-serif;font-size:8px;font-weight:700;letter-spacing:.14em;padding:3px 7px;}

/* image */
.w-img-wrap{width:100%;height:220px;background:#060606;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;border-bottom:1px solid #0f0f0f;}
.w-img{width:62%;height:62%;object-fit:contain;transition:transform .5s ease;}
.w-premium-tag{position:absolute;bottom:10px;right:10px;background:#fff;color:#000;font-family:'Barlow Condensed',sans-serif;font-size:8px;font-weight:800;letter-spacing:.14em;padding:4px 8px;display:flex;align-items:center;gap:4px;}

/* info */
.w-info{padding:18px 16px 20px;}
.w-name{font-size:15px;font-weight:600;letter-spacing:.04em;color:#e0e0e0;margin-bottom:8px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.w-price{font-size:22px;font-weight:800;color:#fff;margin-bottom:10px;letter-spacing:.02em;}
.w-rating{display:flex;align-items:center;gap:3px;margin-bottom:16px;}
.w-rating-val{font-size:12px;font-weight:600;color:#555;margin-left:4px;}
.w-review-ct{font-size:10px;color:#222;}

/* actions */
.w-actions{display:flex;flex-direction:column;gap:8px;padding-top:14px;border-top:1px solid #0f0f0f;}
.w-btn-cart{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:11px 0;background:#fff;color:#000;border:none;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;letter-spacing:.2em;transition:background .18s;cursor:pointer;}
.w-btn-cart:hover:not(:disabled){background:#e0e0e0;}
.w-btn-remove{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:9px 0;background:transparent;color:#2e2e2e;border:1px solid #111;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:600;letter-spacing:.18em;cursor:pointer;transition:all .18s;}
.w-btn-remove:hover{color:#ef4444;border-color:#7f1d1d;}

/* footer note */
.w-footer-note{margin-top:64px;text-align:center;}
.w-footer-text{font-size:9px;letter-spacing:.2em;color:#1a1a1a;margin-top:20px;}

/* spinner */
.w-spin-wrap{position:relative;width:52px;height:52px;}
.w-spinner{width:52px;height:52px;border-radius:50%;border:2px solid #111;border-top:2px solid #fff;animation:w-spin .8s linear infinite;}
.w-spin-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
@keyframes w-spin{to{transform:rotate(360deg);}}

/* watermark */
.w-watermark{position:absolute;bottom:0;left:50%;transform:translateX(-50%);font-family:'Barlow Condensed',sans-serif;font-size:clamp(80px,18vw,180px);font-weight:900;letter-spacing:.06em;color:transparent;-webkit-text-stroke:1px #0b0b0b;user-select:none;pointer-events:none;white-space:nowrap;line-height:1;}

/* responsive */
@media(max-width:1200px){.w-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:860px){.w-grid{grid-template-columns:repeat(2,1fr);}.w-img-wrap{height:200px;}}
@media(max-width:480px){
  .w-grid{grid-template-columns:1fr;}
  .w-container{padding:32px 16px 0;}
  .w-img-wrap{height:240px;}
  .w-btn-white{width:100%;justify-content:center;}
}
`;