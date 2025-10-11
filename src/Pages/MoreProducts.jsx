




// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../Api/Axios_Instance";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { Heart, Star, Package, Grid3X3, List, Filter, X, ShoppingCart, Sparkles, TrendingUp, Zap } from "lucide-react";
// import { useWishlist } from "../context/WishlistContext";

// export default function MoreProducts({ searchTerm }) {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const { user } = useAuth();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   const categoryParam = searchParams.get("category");

//   // Filters
//   const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [minRating, setMinRating] = useState(0);
//   const [sortOption, setSortOption] = useState("");

//   // View modes and filters
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilterPanel, setShowFilterPanel] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   // Animation states
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [addedToCart, setAddedToCart] = useState(null);

//   // Generate random rating between 3.0 and 5.0
//   const generateRandomRating = () => {
//     return parseFloat((Math.random() * 2 + 3).toFixed(1));
//   };

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await api.get("/products");
//         const productsWithRating = data.map(product => ({
//           ...product,
//           rating: generateRandomRating()
//         }));
//         setProducts(productsWithRating);
//       } catch {
//         setProducts([]);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Apply filters & search
//   useEffect(() => {
//     let filtered = [...products];

//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(
//         (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
//       );
//     }

//     filtered = filtered.filter((item) => {
//       const price = Number(item.price) || 0;
//       return (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice));
//     });

//     filtered = filtered.filter((item) => (item.rating || 4) >= minRating);

//     if (searchTerm) {
//       filtered = filtered.filter((item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (sortOption === "price-low") filtered.sort((a, b) => a.price - b.price);
//     if (sortOption === "price-high") filtered.sort((a, b) => b.price - a.price);
//     if (sortOption === "newest") filtered.sort((a, b) => b.id - a.id);
//     if (sortOption === "popular") filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [products, selectedCategory, minPrice, maxPrice, minRating, searchTerm, sortOption]);

//   const handleProductClick = (item) => navigate(`/product/${item.id}`, { state: item });
  
//   const handleAddToCart = (item, e) => {
//     e.stopPropagation();
//     if (!user) return navigate("/login");
    
//     if (item.stock <= 0) {
//       alert("Sorry, this product is out of stock!");
//       return;
//     }
    
//     addToCart(item, 1);
//     setAddedToCart(item.id);
//     setTimeout(() => setAddedToCart(null), 2000);
//   };

//   const handleQuickView = (item, e) => {
//     e.stopPropagation();
//     setQuickViewProduct(item);
//   };

//   const clearFilters = () => {
//     setSelectedCategory("All");
//     setMinPrice("");
//     setMaxPrice("");
//     setMinRating(0);
//     setSortOption("");
//   };

//   const getStockStatus = (stock) => {
//     if (stock <= 0) return { text: "Out of Stock", color: "text-rose-600 bg-rose-50", border: "border-rose-200" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-amber-600 bg-amber-50", border: "border-amber-200" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-200" };
//     return { text: `${stock} in stock`, color: "text-emerald-600 bg-emerald-50", border: "border-emerald-200" };
//   };

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const displayedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Elegant Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
//           <div>
//             <h1 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-2 tracking-tight">
//               {selectedCategory !== "All" ? selectedCategory : "Our Collection"}
//             </h1>
//             <p className="text-slate-600 flex items-center gap-2 text-sm">
//               <TrendingUp size={16} className="text-slate-400" />
//               {displayedProducts.length} of {filteredProducts.length} items
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`p-2.5 rounded-lg transition-all duration-200 ${
//                 viewMode === "grid" 
//                   ? "bg-slate-900 text-white" 
//                   : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
//               }`}
//             >
//               <Grid3X3 size={18} />
//             </button>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`p-2.5 rounded-lg transition-all duration-200 ${
//                 viewMode === "list" 
//                   ? "bg-slate-900 text-white" 
//                   : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
//               }`}
//             >
//               <List size={18} />
//             </button>
//             <div className="h-6 w-px bg-slate-200 mx-1"></div>
//             <button
//               onClick={() => setShowFilterPanel(!showFilterPanel)}
//               className="p-2.5 rounded-lg bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all duration-200"
//             >
//               <Filter size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Refined Filter Panel */}
//         {showFilterPanel && (
//           <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//             <div className="p-6 border-b border-slate-100">
//               <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider mb-6">Filters</h3>
              
//               <div className="space-y-6">
//                 {/* Category Filter */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Category</label>
//                   <div className="flex flex-wrap gap-2">
//                     {categories.map((cat) => (
//                       <button
//                         key={cat}
//                         onClick={() => setSelectedCategory(cat)}
//                         className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
//                           selectedCategory === cat
//                             ? "bg-slate-900 text-white"
//                             : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
//                         }`}
//                       >
//                         {cat}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {/* Price Filter */}
//                   <div>
//                     <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Price Range</label>
//                     <div className="flex gap-3 items-center">
//                       <input
//                         type="number"
//                         placeholder="Min"
//                         value={minPrice}
//                         onChange={(e) => setMinPrice(e.target.value)}
//                         className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
//                       />
//                       <span className="text-slate-400">—</span>
//                       <input
//                         type="number"
//                         placeholder="Max"
//                         value={maxPrice}
//                         onChange={(e) => setMaxPrice(e.target.value)}
//                         className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
//                       />
//                     </div>
//                   </div>

//                   {/* Rating Filter */}
//                   <div>
//                     <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Minimum Rating</label>
//                     <select
//                       value={minRating}
//                       onChange={(e) => setMinRating(Number(e.target.value))}
//                       className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
//                     >
//                       {[0, 1, 2, 3, 4, 5].map((r) => (
//                         <option key={r} value={r}>{r === 0 ? "All Ratings" : `${r}+ Stars`}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Sort Filter */}
//                   <div>
//                     <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Sort By</label>
//                     <select
//                       value={sortOption}
//                       onChange={(e) => setSortOption(e.target.value)}
//                       className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
//                     >
//                       <option value="">Featured</option>
//                       <option value="price-low">Price: Low to High</option>
//                       <option value="price-high">Price: High to Low</option>
//                       <option value="popular">Most Popular</option>
//                       <option value="newest">Newest First</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="pt-4 border-t border-slate-100">
//                   <button
//                     onClick={clearFilters}
//                     className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
//                   >
//                     <X size={16} />
//                     Clear all filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Products Grid/List */}
//         <div className={viewMode === "grid" 
//           ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
//           : "flex flex-col gap-4"
//         }>
//           {displayedProducts.map((item) => {
//             const isInWishlist = wishlist.some((p) => p.id === item.id);
//             const stockStatus = getStockStatus(item.stock || 0);
//             const isOutOfStock = (item.stock || 0) <= 0;
//             const isHovered = hoveredCard === item.id;
//             const wasAdded = addedToCart === item.id;
          
//             if (viewMode === "list") {
//               return (
//                 <div
//                   key={item.id}
//                   onClick={() => handleProductClick(item)}
//                   onMouseEnter={() => setHoveredCard(item.id)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   className={`group bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-6 cursor-pointer transition-all duration-300 flex gap-6 ${
//                     isOutOfStock ? "opacity-60" : ""
//                   } ${isHovered ? "shadow-lg" : "shadow-sm"}`}
//                 >
//                   <div className="flex-shrink-0">
//                     <img 
//                       src={item.image} 
//                       alt={item.name} 
//                       className={`w-32 h-32 object-contain rounded-lg ${isOutOfStock ? "grayscale" : ""}`} 
//                     />
//                   </div>
                  
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-medium text-slate-900 mb-2 truncate">{item.name}</h3>
//                     <p className="text-2xl font-semibold text-slate-900 mb-3">${item.price}</p>
                    
//                     <div className="flex items-center gap-1 mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <Star 
//                           key={i} 
//                           size={16} 
//                           className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-slate-200"} 
//                         />
//                       ))}
//                       <span className="ml-2 text-sm text-slate-600">{item.rating}</span>
//                     </div>
                    
//                     <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium border ${stockStatus.color} ${stockStatus.border}`}>
//                       <Package size={14} />
//                       {stockStatus.text}
//                     </span>
//                   </div>
                  
//                   <div className="flex flex-col gap-2">
//                     <button 
//                       onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
//                       className={`p-2 rounded-lg transition-all ${
//                         isInWishlist ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
//                       }`}
//                     >
//                       <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
//                     </button>
//                     <button 
//                       onClick={(e) => handleQuickView(item, e)} 
//                       className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all whitespace-nowrap"
//                     >
//                       Quick View
//                     </button>
//                     <button
//                       onClick={(e) => handleAddToCart(item, e)}
//                       disabled={isOutOfStock}
//                       className={`px-4 py-2 rounded-lg transition-all font-medium flex items-center justify-center gap-2 text-sm ${
//                         isOutOfStock 
//                           ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
//                           : wasAdded
//                           ? "bg-emerald-600 text-white"
//                           : "bg-slate-900 text-white hover:bg-slate-800"
//                       }`}
//                     >
//                       <ShoppingCart size={16} />
//                       {isOutOfStock ? "Unavailable" : wasAdded ? "Added" : "Add"}
//                     </button>
//                   </div>
//                 </div>
//               );
//             }
          
//             return (
//               <div
//                 key={item.id}
//                 onClick={() => handleProductClick(item)}
//                 onMouseEnter={() => setHoveredCard(item.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 className={`group bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-6 cursor-pointer transition-all duration-300 ${
//                   isOutOfStock ? "opacity-60" : ""
//                 } ${isHovered ? "shadow-lg -translate-y-1" : "shadow-sm"}`}
//               >
//                 <div className="relative mb-4">
//                   <button
//                     onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
//                     className={`absolute top-0 right-0 p-2 rounded-lg transition-all ${
//                       isInWishlist ? "bg-rose-50 text-rose-600" : "bg-white text-slate-400 hover:bg-slate-50"
//                     }`}
//                   >
//                     <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
//                   </button>

//                   <span className={`absolute top-0 left-0 px-3 py-1 rounded-lg text-xs font-medium border ${stockStatus.color} ${stockStatus.border}`}>
//                     {stockStatus.text}
//                   </span>

//                   <div className="mt-10">
//                     <img 
//                       src={item.image} 
//                       alt={item.name} 
//                       className={`w-full h-48 object-contain ${isOutOfStock ? "grayscale" : ""}`} 
//                     />
//                   </div>
//                 </div>
              
//                 <h3 className="text-base font-medium text-slate-900 mb-2 line-clamp-2">{item.name}</h3>
//                 <p className="text-xl font-semibold text-slate-900 mb-3">${item.price}</p>

//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star 
//                       key={i} 
//                       size={14} 
//                       className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-slate-200"} 
//                     />
//                   ))}
//                   <span className="ml-2 text-sm text-slate-600">{item.rating}</span>
//                 </div>

//                 <button
//                   onClick={(e) => handleQuickView(item, e)}
//                   className="w-full py-2.5 mb-3 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all"
//                 >
//                   Quick View
//                 </button>

//                 <button
//                   onClick={(e) => handleAddToCart(item, e)}
//                   disabled={isOutOfStock}
//                   className={`w-full py-2.5 rounded-lg transition-all font-medium text-sm ${
//                     isOutOfStock
//                       ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                       : wasAdded
//                       ? "bg-emerald-600 text-white"
//                       : "bg-slate-900 text-white hover:bg-slate-800"
//                   }`}
//                 >
//                   {isOutOfStock ? "Out of Stock" : wasAdded ? "✓ Added" : "Add to Cart"}
//                 </button>
//               </div>
//             );
//           })}
          
//           {displayedProducts.length === 0 && (
//             <div className="col-span-full text-center py-20">
//               <div className="inline-block p-8 bg-white rounded-xl border border-slate-200">
//                 <p className="text-slate-600 text-lg mb-4">No products found</p>
//                 <button 
//                   onClick={clearFilters} 
//                   className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all"
//                 >
//                   Clear filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Elegant Quick View Modal */}
//         {quickViewProduct && (
//           <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setQuickViewProduct(null)}>
//             <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
//               <button 
//                 onClick={() => setQuickViewProduct(null)} 
//                 className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
//               >
//                 <X size={24} />
//               </button>
              
//               <div className="grid md:grid-cols-2 gap-10">
//                 <div className="bg-slate-50 rounded-xl p-8 flex items-center justify-center">
//                   <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-80 object-contain" />
//                 </div>
                
//                 <div>
//                   <h3 className="text-3xl font-serif font-light text-slate-900 mb-4">{quickViewProduct.name}</h3>
//                   <p className="text-3xl font-semibold text-slate-900 mb-4">${quickViewProduct.price}</p>
                  
//                   <div className="flex items-center gap-1 mb-6">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} size={18} className={i < Math.floor(quickViewProduct.rating) ? "text-amber-400 fill-current" : "text-slate-200"} />
//                     ))}
//                     <span className="ml-2 text-slate-600">({quickViewProduct.rating})</span>
//                   </div>
                  
//                   <p className="text-slate-600 mb-3">
//                     <span className="font-medium text-slate-900">Category:</span> {quickViewProduct.category}
//                   </p>
                  
//                   <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8 font-medium border ${
//                     quickViewProduct.stock > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
//                   }`}>
//                     <Package size={18} />
//                     {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} in stock` : "Out of Stock"}
//                   </div>
                  
//                   <button
//                     onClick={() => handleProductClick(quickViewProduct)}
//                     className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all"
//                   >
//                     View Full Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Refined Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-12 gap-2">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-white text-slate-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all font-medium text-sm border border-slate-200"
//             >
//               Previous
//             </button>
            
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
//                   currentPage === page
//                     ? "bg-slate-900 text-white"
//                     : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
            
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-white text-slate-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all font-medium text-sm border border-slate-200"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Heart, Star, Package, Grid3X3, List, Filter, X, ShoppingCart, Sparkles, TrendingUp, Zap, ChevronDown, ChevronUp, Search, SlidersHorizontal, ArrowUp, Tag, Clock, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function MoreProducts({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const categoryParam = searchParams.get("category");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("");

  // View modes and filters
  const [viewMode, setViewMode] = useState("grid");
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Animation states
  const [hoveredCard, setHoveredCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState({});

  // Advanced filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    totalProducts: 0,
    avgPrice: 0,
    avgRating: 0
  });

  // Generate random rating between 3.0 and 5.0
  const generateRandomRating = () => {
    return parseFloat((Math.random() * 2 + 3).toFixed(1));
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get("/products");
        const productsWithRating = data.map(product => ({
          ...product,
          rating: generateRandomRating(),
          views: Math.floor(Math.random() * 1000) + 100,
          trending: Math.random() > 0.7
        }));
        setProducts(productsWithRating);
        
        // Calculate price range and stats
        const prices = productsWithRating.map(p => Number(p.price) || 0);
        const ratings = productsWithRating.map(p => p.rating || 0);
        setPriceRange({
          min: Math.floor(Math.min(...prices)),
          max: Math.ceil(Math.max(...prices))
        });
        setStats({
          totalProducts: productsWithRating.length,
          avgPrice: (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2),
          avgRating: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        });
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters & search
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    filtered = filtered.filter((item) => {
      const price = Number(item.price) || 0;
      return (!minPrice || price >= Number(minPrice)) && (!maxPrice || price <= Number(maxPrice));
    });

    filtered = filtered.filter((item) => (item.rating || 4) >= minRating);

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortOption === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sortOption === "newest") filtered.sort((a, b) => b.id - a.id);
    if (sortOption === "popular") filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortOption === "trending") filtered.sort((a, b) => (b.views || 0) - (a.views || 0));

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, minPrice, maxPrice, minRating, searchTerm, sortOption]);

  // Update displayed products based on current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, filteredProducts]);

  // Calculate pagination info
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredProducts.length);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleProductClick = (item) => navigate(`/product/${item.id}`, { state: item });
  
  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    if (!user) return navigate("/login");
    
    if (item.stock <= 0) {
      alert("Sorry, this product is out of stock!");
      return;
    }
    
    addToCart(item, 1);
    setAddedToCart(item.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleQuickView = (item, e) => {
    e.stopPropagation();
    setQuickViewProduct(item);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setSortOption("");
  };

  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: "Out of Stock", color: "text-rose-600 bg-rose-50", border: "border-rose-200", badge: "bg-rose-500" };
    if (stock <= 5) return { text: `Only ${stock} left`, color: "text-amber-600 bg-amber-50", border: "border-amber-200", badge: "bg-amber-500" };
    if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-200", badge: "bg-yellow-500" };
    return { text: `${stock} in stock`, color: "text-emerald-600 bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-500" };
  };

  const handleImageLoad = (id) => {
    setImageLoadStates(prev => ({ ...prev, [id]: true }));
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter component for reusability
  const FilterPanel = ({ isMobile = false }) => (
    <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden ${isMobile ? 'mb-4' : ''}`}>
      <div className="p-4 sm:p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg">
              <SlidersHorizontal size={18} className="text-white" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider">Filters</h3>
          </div>
          {isMobile && (
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-slate-400 hover:text-slate-600 lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Category Filter with Pills */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3 block flex items-center gap-2">
              <Tag size={14} className="text-slate-400" />
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (isMobile) setIsMobileFilterOpen(false);
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-900/30"
                      : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.totalProducts}</div>
              <div className="text-xs text-slate-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">${stats.avgPrice}</div>
              <div className="text-xs text-slate-600">Avg Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-1">
                {stats.avgRating}
                <Star size={14} className="text-amber-400 fill-current" />
              </div>
              <div className="text-xs text-slate-600">Avg Rating</div>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center justify-between w-full p-3 text-sm text-slate-700 hover:text-slate-900 font-medium bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-slate-400" />
              Advanced Filters
            </span>
            {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAdvancedFilters && (
            <div className="grid grid-cols-1 gap-5 pt-4 border-t border-slate-200 animate-fadeIn">
              {/* Price Filter with Range Display */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp size={14} className="text-slate-400" />
                  Price Range
                </label>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder={`$${priceRange.min}`}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="w-8 h-px bg-slate-300"></div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder={`$${priceRange.max}`}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 px-1">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>

              {/* Rating Filter with Stars */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Star size={14} className="text-amber-400" />
                  Minimum Rating
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`px-3 py-2.5 text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1 ${
                        minRating === r
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                          : "bg-white border-2 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50"
                      }`}
                    >
                      {r === 0 ? "All" : `${r}+`}
                      {r > 0 && <Star size={12} className={minRating === r ? "fill-current" : "text-amber-400"} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter with Icons */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Zap size={14} className="text-slate-400" />
                  Sort By
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white transition-all"
                >
                  <option value="">✨ Featured</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="popular">⭐ Most Popular</option>
                  <option value="newest">🆕 Newest First</option>
                  <option value="trending">🔥 Trending</option>
                </select>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                clearFilters();
                if (isMobile) setIsMobileFilterOpen(false);
              }}
              className="w-full text-sm text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/30 transform hover:scale-105"
            >
              <X size={16} />
              Clear all filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        {/* Premium Header */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl shadow-xl shadow-slate-900/20">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-slate-900 tracking-tight bg-clip-text">
                  {selectedCategory !== "All" ? selectedCategory : "Discover"}
                </h1>
              </div>
              <p className="text-slate-600 flex items-center flex-wrap gap-3 text-sm sm:text-base">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                  <TrendingUp size={14} className="text-emerald-500" />
                  <span className="font-medium text-slate-900">{startItem}-{endItem}</span>
                  <span className="text-slate-500">of {filteredProducts.length}</span>
                </span>
                {isLoading && (
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-200 animate-pulse">
                    <Clock size={14} />
                    Loading...
                  </span>
                )}
              </p>
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-lg border border-slate-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                    viewMode === "grid" 
                      ? "bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                    viewMode === "list" 
                      ? "bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
              
              {/* Desktop Filter Toggle */}
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all shadow-lg font-medium"
              >
                <Filter size={18} />
                <span>{showFilterPanel ? 'Hide' : 'Show'} Filters</span>
              </button>
              
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg font-medium"
              >
                <Filter size={18} />
                <span>Filters</span>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">{filteredProducts.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 lg:hidden animate-fadeIn" onClick={() => setIsMobileFilterOpen(false)}>
            <div 
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-white to-slate-50 shadow-2xl overflow-y-auto animate-slideInRight"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 flex items-center justify-between z-20 shadow-xl">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal size={24} />
                  Filters
                </h2>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                <FilterPanel isMobile={true} />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Filter Panel */}
        {showFilterPanel && (
          <div className="hidden lg:block mb-8 animate-fadeIn">
            <FilterPanel />
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 animate-pulse">
                <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-48 rounded-xl mb-4"></div>
                <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-4 rounded-full mb-2 w-3/4"></div>
                <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-6 rounded-full w-1/2 mb-3"></div>
                <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-10 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid/List */}
        {!isLoading && (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
            : "flex flex-col gap-4"
          }>
            {displayedProducts.map((item, index) => {
              const isInWishlist = wishlist.some((p) => p.id === item.id);
              const stockStatus = getStockStatus(item.stock || 0);
              const isOutOfStock = (item.stock || 0) <= 0;
              const isHovered = hoveredCard === item.id;
              const wasAdded = addedToCart === item.id;
              const isImageLoaded = imageLoadStates[item.id];
            
              if (viewMode === "list") {
                return (
                  <div
                    key={item.id}
                    onClick={() => handleProductClick(item)}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`group bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 hover:border-slate-300 p-4 sm:p-6 cursor-pointer transition-all duration-500 flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fadeInUp ${
                      isOutOfStock ? "opacity-60" : ""
                    } ${isHovered ? "shadow-2xl shadow-slate-900/10 scale-[1.02]" : "shadow-lg"}`}
                  >
                    {/* Trending Badge */}
                    {item.trending && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                        <Zap size={12} className="fill-current" />
                        TRENDING
                      </div>
                    )}

                    <div className="flex-shrink-0 mx-auto sm:mx-0 relative group">
                      <div className="relative w-full sm:w-32 md:w-40 h-40 sm:h-32 md:h-40 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden">
                        {!isImageLoaded && (
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-shimmer"></div>
                        )}
                        <img 
                          src={item.image} 
                          alt={item.name}
                          onLoad={() => handleImageLoad(item.id)}
                          className={`w-full h-full object-contain p-4 transition-all duration-500 ${isOutOfStock ? "grayscale" : ""} ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-110' : 'scale-100'}`} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors">{item.name}</h3>
                          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">${item.price}</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
                          className={`p-2.5 rounded-xl transition-all transform hover:scale-110 ${
                            isInWishlist ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-slate-200"} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{item.rating}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Eye size={12} />
                          {item.views} views
                        </span>
                      </div>
                      
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border self-start mb-4 ${stockStatus.color} ${stockStatus.border}`}>
                        <div className={`w-2 h-2 rounded-full ${stockStatus.badge} animate-pulse`}></div>
                        {stockStatus.text}
                      </span>

                      <div className="flex gap-2 mt-auto">
                        <button 
                          onClick={(e) => handleQuickView(item, e)} 
                          className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(item, e)}
                          disabled={isOutOfStock}
                          className={`flex-1 px-4 py-2.5 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 text-sm ${
                            isOutOfStock 
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                              : wasAdded
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                              : "bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 shadow-lg shadow-slate-900/30"
                          }`}
                        >
                          <ShoppingCart size={16} />
                          {isOutOfStock ? "Unavailable" : wasAdded ? "Added!" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            
              return (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`group bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-slate-200 hover:border-slate-300 p-4 sm:p-6 cursor-pointer transition-all duration-500 animate-fadeInUp ${
                    isOutOfStock ? "opacity-60" : ""
                  } ${isHovered ? "shadow-2xl shadow-slate-900/10 -translate-y-2" : "shadow-lg"}`}
                >
                  <div className="relative mb-4">
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                      className={`absolute top-0 right-0 p-2 rounded-xl transition-all z-20 transform hover:scale-110 ${
                        isInWishlist ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30" : "bg-white/90 backdrop-blur-sm text-slate-400 hover:bg-white"
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={18} className={isInWishlist ? "fill-current" : ""} />
                    </button>

                    {/* Stock Badge */}
                    <span className={`absolute top-0 left-0 px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-sm z-20 flex items-center gap-1.5 ${stockStatus.color} ${stockStatus.border}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${stockStatus.badge} animate-pulse`}></div>
                      {stockStatus.text}
                    </span>

                    {/* Trending Badge */}
                    {item.trending && (
                      <div className="absolute top-12 left-0 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg z-20 animate-pulse">
                        <Zap size={10} className="fill-current" />
                        HOT
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="mt-14 relative h-48 sm:h-56 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden">
                      {!isImageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-shimmer"></div>
                      )}
                      <img 
                        src={item.image} 
                        alt={item.name}
                        onLoad={() => handleImageLoad(item.id)}
                        className={`w-full h-full object-contain p-4 transition-all duration-500 ${isOutOfStock ? "grayscale" : ""} ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}`} 
                      />
                    </div>
                  </div>
                
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-slate-700 transition-colors">{item.name}</h3>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-3">${item.price}</p>

                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-slate-200"} 
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold text-slate-900">{item.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Eye size={12} />
                      {item.views}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleQuickView(item, e)}
                    className="w-full py-2.5 mb-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
                  >
                    Quick View
                  </button>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    disabled={isOutOfStock}
                    className={`w-full py-2.5 rounded-xl transition-all font-semibold text-sm flex items-center justify-center gap-2 ${
                      isOutOfStock
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : wasAdded
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 shadow-lg shadow-slate-900/30 transform hover:scale-105"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {isOutOfStock ? "Out of Stock" : wasAdded ? "✓ Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{startItem}</span> to <span className="font-semibold text-slate-900">{endItem}</span> of <span className="font-semibold text-slate-900">{filteredProducts.length}</span> products
            </div>
            
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2.5 rounded-xl transition-all ${
                  currentPage === 1
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 shadow-lg transform hover:scale-105"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>

              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] px-4 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-900/30"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2.5 rounded-xl transition-all ${
                  currentPage === totalPages
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 shadow-lg transform hover:scale-105"
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* No Products Found */}
        {displayedProducts.length === 0 && !isLoading && (
          <div className="col-span-full text-center py-20 animate-fadeIn">
            <div className="inline-block p-12 bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-slate-200 shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <Package size={48} className="text-slate-400" />
              </div>
              <p className="text-slate-600 text-xl mb-6 font-medium">No products found</p>
              <button 
                onClick={clearFilters} 
                className="px-8 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg shadow-slate-900/30 transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setQuickViewProduct(null)}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 max-w-5xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setQuickViewProduct(null)} 
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-900 transition-all z-10 p-2 hover:bg-slate-100 rounded-xl"
                aria-label="Close quick view"
              >
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 lg:p-10 flex items-center justify-center sticky top-0">
                    <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-64 sm:h-80 lg:h-96 object-contain transform hover:scale-110 transition-transform duration-500" />
                  </div>
                  {quickViewProduct.trending && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg animate-pulse">
                      <Zap size={16} className="fill-current" />
                      TRENDING NOW
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-slate-900 mb-4 leading-tight">{quickViewProduct.name}</h3>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-4">${quickViewProduct.price}</p>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className={i < Math.floor(quickViewProduct.rating) ? "text-amber-400 fill-current" : "text-slate-200"} />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-slate-900">({quickViewProduct.rating})</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 flex items-center gap-1">
                        <Eye size={16} />
                        {quickViewProduct.views} views
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <Tag size={20} className="text-slate-400" />
                      <div>
                        <span className="text-sm text-slate-500 block">Category</span>
                        <span className="font-semibold text-slate-900">{quickViewProduct.category}</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-3 p-4 rounded-xl ${
                      quickViewProduct.stock > 0 ? "bg-emerald-50" : "bg-rose-50"
                    }`}>
                      <Package size={20} className={quickViewProduct.stock > 0 ? "text-emerald-600" : "text-rose-600"} />
                      <div>
                        <span className="text-sm text-slate-500 block">Availability</span>
                        <span className={`font-bold ${quickViewProduct.stock > 0 ? "text-emerald-700" : "text-rose-700"}`}>
                          {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} in stock` : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(quickViewProduct);
                      }}
                      className={`p-4 rounded-xl transition-all transform hover:scale-110 ${
                        wishlist.some((p) => p.id === quickViewProduct.id)
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
                          : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      <Heart size={24} className={wishlist.some((p) => p.id === quickViewProduct.id) ? "fill-current" : ""} />
                    </button>
                    <button
                      onClick={() => handleProductClick(quickViewProduct)}
                      className="flex-1 py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl font-bold hover:from-slate-800 hover:to-slate-600 transition-all shadow-lg shadow-slate-900/30 transform hover:scale-105 text-lg"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-full shadow-2xl hover:from-slate-800 hover:to-slate-600 transition-all z-40 transform hover:scale-110 animate-fadeIn"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
