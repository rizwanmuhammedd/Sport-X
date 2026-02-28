


// import { useEffect, useState, useCallback } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../Api/Axios_Instance";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { Heart, Star, Package, Grid3X3, List, Filter, X, ShoppingCart, Sparkles, TrendingUp, Zap, ChevronDown, ChevronUp, Search, SlidersHorizontal, ArrowUp, Tag, Clock, Eye, ChevronLeft, ChevronRight, Flame, Trophy, Shield } from "lucide-react";
// import { useWishlist } from "../context/WishlistContext";
// import { toast } from "sonner";


// export default function MoreProducts({ searchTerm }) {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [searchParams] = useSearchParams();
//   const [searchBase, setSearchBase] = useState([]);

//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addToCart, cart } = useCart();
//   const { wishlist = [], toggleWishlist } = useWishlist();


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
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const itemsPerPage = 9;

//   // Animation states
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [addedToCart, setAddedToCart] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [imageLoadStates, setImageLoadStates] = useState({});

//   // Advanced filter states
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   // Statistics
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     avgPrice: 0,
//     avgRating: 0
//   });

//   // Categories from backend
//   const [categories, setCategories] = useState(["All"]);

//   // Generate random rating between 3.0 and 5.0
//   const generateRandomRating = () => {
//     return parseFloat((Math.random() * 2 + 3).toFixed(1));
//   };

//   // Scroll handler
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Fetch categories from backend - FIXED: remove duplicate "All"
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("/Products/categories-list");
//         if (res.data.data) {
//           // Remove any duplicates and ensure "All" is only once
//           const backendCategories = res.data.data.filter(cat => cat !== "All");
//           setCategories(["All", ...backendCategories]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//         // Fallback to extracting from products
//         if (products.length > 0) {
//           const uniqueCategories = [...new Set(products.map(p => p.category))].filter(cat => cat !== "All");
//           setCategories(["All", ...uniqueCategories]);
//         }
//       }
//     };
    
//     fetchCategories();
//   }, []);

//   // Fetch stats from backend
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get("/Products/stats");
//         if (res.data.data) {
//           const statsData = res.data.data;
//           setStats({
//             totalProducts: statsData.totalProducts || 0,
//             avgPrice: statsData.averagePrice ? parseFloat(statsData.averagePrice.toFixed(2)) : 0,
//             avgRating: 4.5 // Default rating
//           });
//         }
//       } catch (error) {
//         console.error("Failed to fetch stats:", error);
//         setStats({
//           totalProducts: 0,
//           avgPrice: 0,
//           avgRating: 4.5
//         });
//       }
//     };
    
//     fetchStats();
//   }, []);

//   // MAIN FETCH FUNCTION - Fixed to handle errors better
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const allProductsRes = await api.get("/Products/User/GetAll");
//         const allProducts = allProductsRes.data.data || [];
        
//         // Apply frontend filtering
// const productsWithRating = allProducts.map(product => ({
//   id: product.id,
//   name: product.name,
//   price: product.price,
//   category: product.category,
//   image: product.imageUrl || "/placeholder.png",
//   stock: product.stockQuantity ?? 0,
//   rating: generateRandomRating(),
//   views: Math.floor(Math.random() * 1000) + 100,
//   trending: Math.random() > 0.7
// }));

// let filtered = [...productsWithRating];
        
//         // Category filter
//         if (selectedCategory && selectedCategory !== "All") {
//           filtered = filtered.filter(p => p.category === selectedCategory);
//         }
        
//         // Price filters
//         if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
//         if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
        
//         // Search filter
//         if (searchTerm && searchTerm.trim()) {
//           filtered = filtered.filter(p => 
//             p.name.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//         }
//         // ⭐ Rating filter
// if (minRating > 0) {
//   filtered = filtered.filter(p => p.rating >= minRating);
// }

        
//         // Apply sorting
//         if (sortOption === "price-low") filtered.sort((a,b) => a.price - b.price);
//         if (sortOption === "price-high") filtered.sort((a,b) => b.price - a.price);
//         if (sortOption === "newest") filtered.sort((a,b) => b.id - a.id);
//         if (sortOption === "trending") {
//           filtered = filtered.sort((a,b) => Math.random() - 0.5);
//         }
//         if (sortOption === "popular") {
//           filtered = filtered.sort((a,b) => b.id - a.id);
//         }
        
//         // Transform data to match frontend structure
        
        

//         // setProducts(productsWithRating);
//         // setFilteredProducts(productsWithRating);
        
//         // // Paginate locally
//         // const startIndex = (currentPage - 1) * itemsPerPage;
//         // const endIndex = startIndex + itemsPerPage;
//         // setDisplayedProducts(productsWithRating.slice(startIndex, endIndex));
//         // setTotalPages(Math.ceil(productsWithRating.length / itemsPerPage));
//         // setTotalCount(productsWithRating.length);




//         setProducts(productsWithRating);
// setFilteredProducts(filtered);

// const startIndex = (currentPage - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;

// setDisplayedProducts(filtered.slice(startIndex, endIndex));
// setTotalPages(Math.ceil(filtered.length / itemsPerPage));
// setTotalCount(filtered.length);


//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setProducts([]);
//         setFilteredProducts([]);
//         setDisplayedProducts([]);
//         setTotalPages(1);
//         setTotalCount(0);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
// }, [
//   currentPage,
//   selectedCategory,
//   minPrice,
//   maxPrice,
//   minRating,
//   sortOption,
//   searchTerm
// ]);

//   // Calculate pagination info
//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalCount);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;
    
//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) pages.push(i);
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//       } else {
//         pages.push(1);
//         pages.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }
    
//     return pages;
//   };

//   const handleProductClick = (item) => navigate(`/Product/${item.id}`, { state: item });

//   const isItemInCart = (productId) =>
//     cart.some(c => c.productId === productId);

//   const handleAddToCart = (item, e) => {
//   e.stopPropagation();

//   // 🔒 Not logged in
//   if (!user) {
//     toast.warning("Please login to add items to your cart", {
//       action: {
//         label: "Login",
//         onClick: () => navigate("/login"),
//       },
//     });
//     return;
//   }

//   // 🚫 Out of stock
//   if (item.stock <= 0) {
//     toast.error("Sorry, this product is currently out of stock");
//     return;
//   }

//   // 🛒 Already in cart
//   if (isItemInCart(item.id)) {
//     toast.info("This item is already in your cart", {
//       action: {
//         label: "View Cart",
//         onClick: () => navigate("/cart"),
//       },
//     });
//     return;
//   }

//   // ✅ Success
//   addToCart(item, 1);

//   toast.success("Added to cart 🛒");

//   setAddedToCart(item.id);
//   setTimeout(() => setAddedToCart(null), 2000);
// };


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
//     setCurrentPage(1);
//   };

//   const getStockStatus = (stock) => {
//     if (stock <= 0) return { text: "Out of Stock", color: "text-rose-400 bg-rose-500/10", border: "border-rose-500/30", badge: "bg-rose-500" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-amber-400 bg-amber-500/10", border: "border-amber-500/30", badge: "bg-amber-500" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-400 bg-yellow-500/10", border: "border-yellow-500/30", badge: "bg-yellow-500" };
//     return { text: `${stock} in stock`, color: "text-emerald-400 bg-emerald-500/10", border: "border-emerald-500/30", badge: "bg-emerald-500" };
//   };

//   const handleImageLoad = (id) => {
//     setImageLoadStates(prev => ({ ...prev, [id]: true }));
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Filter component for reusability - DARK THEME
//   const FilterPanel = ({ isMobile = false }) => (
//     <div className={`bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-800 overflow-hidden ${isMobile ? 'mb-4' : ''}`}>
//       <div className="p-5 border-b border-gray-800">
//         <div className="flex items-center justify-between mb-5">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
//               <SlidersHorizontal size={18} className="text-white" />
//             </div>
//             <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>
//           </div>
//           {isMobile && (
//             <button 
//               onClick={() => setIsMobileFilterOpen(false)}
//               className="text-gray-400 hover:text-white lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-all"
//             >
//               <X size={20} />
//             </button>
//           )}
//         </div>
        
//         <div className="space-y-6">
//           {/* Category Filter */}
//           <div>
//             <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
//               Category
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => {
//                     setSelectedCategory(cat);
//                     setCurrentPage(1);
//                     if (isMobile) setIsMobileFilterOpen(false);
//                   }}
//                   className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
//                     selectedCategory === cat
//                       ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
//                       : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-gray-600"
//                   }`}
//                 >
//                   {cat}
//                   {selectedCategory === cat && (
//                     <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Statistics Box */}
//           <div className="grid grid-cols-3 gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
//             <div className="text-center">
//               <div className="text-xl font-bold text-white">{totalCount}</div>
//               <div className="text-xs text-gray-400 mt-1">Products</div>
//             </div>
//             <div className="text-center">
//               <div className="text-xl font-bold text-white">${stats.avgPrice}</div>
//               <div className="text-xs text-gray-400 mt-1">Avg Price</div>
//             </div>
//             <div className="text-center">
//               <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
//                 {stats.avgRating}
//                 <Star size={12} className="text-amber-400 fill-current" />
//               </div>
//               <div className="text-xs text-gray-400 mt-1">Avg Rating</div>
//             </div>
//           </div>

//           {/* Advanced Filters Section */}
//           <div className="border-t border-gray-800 pt-4">
//             <button
//               onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
//               className="flex items-center justify-between w-full p-3 text-sm text-gray-300 hover:text-white font-medium bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border border-gray-700"
//             >
//               <span className="flex items-center gap-2">
//                 <SlidersHorizontal size={16} className="text-purple-400" />
//                 Advanced Filters
//               </span>
//               {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//             </button>

//             {showAdvancedFilters && (
//               <div className="grid grid-cols-1 gap-5 pt-4 animate-fadeIn">
//                 {/* Price Filter */}
//                 <div className="space-y-3">
//                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Price Range
//                   </label>
//                   <div className="flex gap-3 items-center">
//                     <div className="flex-1">
//                       <input
//                         type="number"
//                         placeholder={`Min $${priceRange.min}`}
//                         value={minPrice}
//                         onChange={(e) => {
//                           setMinPrice(e.target.value);
//                           setCurrentPage(1);
//                         }}
//                         className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
//                       />
//                     </div>
//                     <div className="w-6 h-px bg-gray-700"></div>
//                     <div className="flex-1">
//                       <input
//                         type="number"
//                         placeholder={`Max $${priceRange.max}`}
//                         value={maxPrice}
//                         onChange={(e) => {
//                           setMaxPrice(e.target.value);
//                           setCurrentPage(1);
//                         }}
//                         className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rating Filter */}
//                 <div className="space-y-3">
//                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Minimum Rating
//                   </label>
//                   <div className="grid grid-cols-4 gap-2">
//                     {[0, 3, 4, 5].map((r) => (
//                       <button
//                         key={r}
//                         onClick={() => {
//                           setMinRating(r);
//                           setCurrentPage(1);
//                         }}
//                         className={`px-3 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
//                           minRating === r
//                             ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
//                             : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-amber-500 hover:bg-gray-700"
//                         }`}
//                       >
//                         {r === 0 ? "All" : `${r}+`}
//                         {r > 0 && <Star size={10} className={minRating === r ? "fill-current" : "text-amber-400"} />}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Sort Filter */}
//                 <div className="space-y-3">
//                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Sort By
//                   </label>
//                   <select
//                     value={sortOption}
//                     onChange={(e) => {
//                       setSortOption(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                   >
//                     <option value="" className="bg-gray-800">Featured</option>
//                     <option value="price-low" className="bg-gray-800">Price: Low to High</option>
//                     <option value="price-high" className="bg-gray-800">Price: High to Low</option>
//                     <option value="popular" className="bg-gray-800">Most Popular</option>
//                     <option value="newest" className="bg-gray-800">Newest First</option>
//                     <option value="trending" className="bg-gray-800">Trending</option>
//                   </select>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="pt-4 border-t border-gray-800">
//             <button
//               onClick={() => {
//                 clearFilters();
//                 if (isMobile) setIsMobileFilterOpen(false);
//               }}
//               className="w-full text-sm text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/30"
//             >
//               <X size={16} />
//               Clear all filters
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">
//         {/* HEADER - Clean and Minimal */}
//         <div className="mb-8">
//           <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
//             Discover Premium Football Gear
//           </h1>
//           <p className="text-gray-400">
//             Showing {startItem}-{endItem} of {totalCount} products
//           </p>
//         </div>

//         {/* FILTER SECTION AT THE TOP */}
//         <div className="mb-8">
//           <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-800 p-5">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//               {/* Category Filter Pills */}
//               <div className="flex-1">
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => {
//                         setSelectedCategory(cat);
//                         setCurrentPage(1);
//                       }}
//                       className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
//                         selectedCategory === cat
//                           ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
//                           : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-gray-600"
//                       }`}
//                     >
//                       {cat}
//                       {selectedCategory === cat && (
//                         <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Sort and View Controls */}
//               <div className="flex items-center gap-4">
//                 {/* Sort Dropdown */}
//                 <div className="relative">
//                   <select
//                     value={sortOption}
//                     onChange={(e) => {
//                       setSortOption(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="px-4 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none pr-10"
//                   >
//                     <option value="" className="bg-gray-800">Sort: Featured</option>
//                     <option value="price-low" className="bg-gray-800">Price: Low to High</option>
//                     <option value="price-high" className="bg-gray-800">Price: High to Low</option>
//                     <option value="popular" className="bg-gray-800">Most Popular</option>
//                     <option value="newest" className="bg-gray-800">Newest First</option>
//                     <option value="trending" className="bg-gray-800">Trending</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//                 </div>

//                 {/* View Mode Toggle */}
//                 <div className="flex items-center gap-1 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 border border-gray-700">
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`p-2 rounded-md transition-all duration-300 ${
//                       viewMode === "grid" 
//                         ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg" 
//                         : "text-gray-400 hover:text-white hover:bg-gray-700/50"
//                     }`}
//                     aria-label="Grid view"
//                   >
//                     <Grid3X3 size={18} />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`p-2 rounded-md transition-all duration-300 ${
//                       viewMode === "list" 
//                         ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg" 
//                         : "text-gray-400 hover:text-white hover:bg-gray-700/50"
//                     }`}
//                     aria-label="List view"
//                   >
//                     <List size={18} />
//                   </button>
//                 </div>

//                 {/* Mobile Filter Toggle */}
//                 <button
//                   onClick={() => setIsMobileFilterOpen(true)}
//                   className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg font-medium"
//                 >
//                   <Filter size={18} />
//                   <span>Filters</span>
//                 </button>
//               </div>
//             </div>

//             {/* Advanced Filters Row */}
//             <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Price Filter */}
//               <div>
//                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
//                   Price Range
//                 </label>
//                 <div className="flex gap-3 items-center">
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       placeholder={`Min $${priceRange.min}`}
//                       value={minPrice}
//                       onChange={(e) => {
//                         setMinPrice(e.target.value);
//                         setCurrentPage(1);
//                       }}
//                       className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
//                     />
//                   </div>
//                   <div className="text-gray-500">-</div>
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       placeholder={`Max $${priceRange.max}`}
//                       value={maxPrice}
//                       onChange={(e) => {
//                         setMaxPrice(e.target.value);
//                         setCurrentPage(1);
//                       }}
//                       className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Rating Filter */}
//               <div>
//                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
//                   Minimum Rating
//                 </label>
//                 <div className="flex gap-2">
//                   {[0, 3, 4, 5].map((r) => (
//                     <button
//                       key={r}
//                       onClick={() => {
//                         setMinRating(r);
//                         setCurrentPage(1);
//                       }}
//                       className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
//                         minRating === r
//                           ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
//                           : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-amber-500 hover:bg-gray-700"
//                       }`}
//                     >
//                       {r === 0 ? "All" : `${r}+`}
//                       {r > 0 && <Star size={10} className={minRating === r ? "fill-current" : "text-amber-400"} />}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Clear Filters Button */}
//               <div className="flex items-end">
//                 <button
//                   onClick={clearFilters}
//                   className="w-full px-4 py-2.5 text-sm text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 font-medium rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/30"
//                 >
//                   <X size={16} />
//                   Clear all filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Filter Overlay */}
//         {isMobileFilterOpen && (
//           <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 lg:hidden animate-fadeIn" onClick={() => setIsMobileFilterOpen(false)}>
//             <div 
//               className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl overflow-y-auto animate-slideInRight"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5 flex items-center justify-between z-20 shadow-xl">
//                 <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                   <SlidersHorizontal size={24} />
//                   Filters
//                 </h2>
//                 <button 
//                   onClick={() => setIsMobileFilterOpen(false)}
//                   className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//               <div className="p-4">
//                 <FilterPanel isMobile={true} />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Loading Skeleton */}
//         {isLoading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6 animate-pulse">
//                 <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-48 rounded-lg mb-4"></div>
//                 <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-4 rounded-full mb-2 w-3/4"></div>
//                 <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-6 rounded-full w-1/2 mb-3"></div>
//                 <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-10 rounded-lg"></div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Products Grid/List */}
//         {!isLoading && displayedProducts.length > 0 && (
//           <div className={viewMode === "grid" 
//             ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
//             : "flex flex-col gap-4"
//           }>
//             {displayedProducts.map((item, index) => {
//               const isInWishlist = (wishlist || []).some(p => p.productId === item.id);
//               const stockStatus = getStockStatus(item.stock || 0);
//               const isOutOfStock = (item.stock || 0) <= 0;
//               const isHovered = hoveredCard === item.id;
//               const wasAdded = addedToCart === item.id;
//               const isImageLoaded = imageLoadStates[item.id];
            
//               if (viewMode === "list") {
//                 return (
//                   <div
//                     key={item.id}
//                     onClick={() => handleProductClick(item)}
//                     onMouseEnter={() => setHoveredCard(item.id)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                     style={{ animationDelay: `${index * 50}ms` }}
//                     className={`group bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700 hover:border-purple-500/50 p-6 cursor-pointer transition-all duration-300 flex flex-col sm:flex-row gap-6 animate-fadeInUp ${
//                       isOutOfStock ? "opacity-60" : ""
//                     } ${isHovered ? "shadow-2xl shadow-purple-500/10 scale-[1.01]" : "shadow-lg"}`}
//                   >
//                     {/* Trending Badge */}
//                     {item.trending && (
//                       <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg animate-pulse">
//                         <Flame size={12} className="fill-current" />
//                         TRENDING
//                       </div>
//                     )}

//                     <div className="flex-shrink-0 mx-auto sm:mx-0 relative group">
//                       <div className="relative w-full sm:w-40 h-40 sm:h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
//                         {!isImageLoaded && (
//                           <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-shimmer"></div>
//                         )}
//                         <img 
//                           src={item.image} 
//                           alt={item.name}
//                           onLoad={() => handleImageLoad(item.id)}
//                           className={`w-full h-full object-contain p-4 transition-all duration-300 ${isOutOfStock ? "grayscale" : ""} ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-105' : 'scale-100'}`} 
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="flex-1 min-w-0 flex flex-col">
//                       <div className="flex items-start justify-between gap-3 mb-3">
//                         <div className="flex-1">
//                           <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{item.name}</h3>
//                           <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">${item.price}</p>
//                         </div>
//                         <button 
//                           onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
//                           className={`p-2.5 rounded-lg transition-all transform hover:scale-110 ${
//                             isInWishlist ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30" : "bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white"
//                           }`}
//                           aria-label="Add to wishlist"
//                         >
//                           <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
//                         </button>
//                       </div>
                      
//                       <div className="flex items-center gap-2 mb-3">
//                         <div className="flex items-center gap-1">
//                           {[...Array(5)].map((_, i) => (
//                             <Star 
//                               key={i} 
//                               size={16} 
//                               className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-gray-600"} 
//                             />
//                           ))}
//                         </div>
//                         <span className="text-sm font-semibold text-white">{item.rating}</span>
//                         <span className="text-xs text-gray-500">•</span>
//                         <span className="text-xs text-gray-500 flex items-center gap-1">
//                           <Eye size={12} />
//                           {item.views} views
//                         </span>
//                       </div>
                      
//                       <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border self-start mb-4 ${stockStatus.color} ${stockStatus.border}`}>
//                         <div className={`w-2 h-2 rounded-full ${stockStatus.badge} animate-pulse`}></div>
//                         {stockStatus.text}
//                       </span>

//                       <div className="flex gap-2 mt-auto">
//                         <button 
//                           onClick={(e) => handleQuickView(item, e)} 
//                           className="flex-1 px-4 py-2.5 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-600/50 hover:text-white transition-all backdrop-blur-sm"
//                         >
//                           Quick View
//                         </button>
//                         <button
//                           onClick={(e) => handleAddToCart(item, e)}
//                           disabled={isOutOfStock}
//                           className={`flex-1 px-4 py-2.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-2 text-sm ${
//                             isOutOfStock 
//                               ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
//                               : isItemInCart(item.id)
//                               ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
//                               : wasAdded
//                               ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
//                               : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30"
//                           }`}
//                         >
//                           <ShoppingCart size={16} />
//                           {isOutOfStock
//                             ? "Unavailable"
//                             : isItemInCart(item.id)
//                             ? "Go to Cart"
//                             : wasAdded
//                             ? "Added!"
//                             : "Add to Cart"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               }
            
//               return (
//                 <div
//                   key={item.id}
//                   onClick={() => handleProductClick(item)}
//                   onMouseEnter={() => setHoveredCard(item.id)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   style={{ animationDelay: `${index * 50}ms` }}
//                   className={`group bg-gray-800/30 backdrop-blur-xl rounded-xl border-2 border-gray-700 hover:border-purple-500/50 p-4 sm:p-6 cursor-pointer transition-all duration-300 animate-fadeInUp ${
//                     isOutOfStock ? "opacity-60" : ""
//                   } ${isHovered ? "shadow-2xl shadow-purple-500/10 -translate-y-1" : "shadow-lg"}`}
//                 >
//                   <div className="relative mb-4">
//                     {/* Wishlist Button */}
//                     <button
//                       onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
//                       className={`absolute top-2 right-2 p-2 rounded-lg transition-all z-20 transform hover:scale-110 backdrop-blur-sm ${
//                         isInWishlist ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
//                                   : "bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
//                       }`}
//                     >
//                       <Heart size={16} className={isInWishlist ? "fill-current" : ""} />
//                     </button>

//                     {/* Stock Badge */}
//                     <span className={`absolute top-2 left-2 px-3 py-1.5 rounded-lg text-xs font-bold border backdrop-blur-sm z-20 flex items-center gap-1.5 ${stockStatus.color} ${stockStatus.border}`}>
//                       <div className={`w-1.5 h-1.5 rounded-full ${stockStatus.badge} animate-pulse`}></div>
//                       {stockStatus.text}
//                     </span>

//                     {/* Trending Badge */}
//                     {item.trending && (
//                       <div className="absolute top-12 left-2 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded flex items-center gap-1 shadow-lg z-20 animate-pulse">
//                         <Flame size={10} className="fill-current" />
//                         HOT
//                       </div>
//                     )}

//                     {/* Product Image */}
//                     <div className="mt-12 relative h-48 sm:h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
//                       {!isImageLoaded && (
//                         <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-shimmer"></div>
//                       )}
//                       <img 
//                         src={item.image} 
//                         alt={item.name}
//                         onLoad={() => handleImageLoad(item.id)}
//                         className={`w-full h-full object-contain p-4 transition-all duration-300 ${isOutOfStock ? "grayscale" : ""} ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-105' : 'scale-100'}`} 
//                       />
//                     </div>
//                   </div>
                
//                   <h3 className="text-sm sm:text-base font-semibold text-white mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-gray-200 transition-colors">{item.name}</h3>
//                   <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">${item.price}</p>

//                   <div className="flex items-center justify-between gap-2 mb-4">
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star 
//                           key={i} 
//                           size={14} 
//                           className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-gray-600"} 
//                         />
//                       ))}
//                       <span className="ml-1 text-sm font-semibold text-white">{item.rating}</span>
//                     </div>
//                     <span className="text-xs text-gray-500 flex items-center gap-1">
//                       <Eye size={12} />
//                       {item.views}
//                     </span>
//                   </div>

//                   <button
//                     onClick={(e) => handleQuickView(item, e)}
//                     className="w-full py-2.5 mb-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-600/50 hover:text-white transition-all backdrop-blur-sm"
//                   >
//                     Quick View
//                   </button>

//                   <button
//                     onClick={(e) => handleAddToCart(item, e)}
//                     disabled={isOutOfStock}
//                     className={`w-full py-2.5 rounded-lg transition-all font-semibold text-sm flex items-center justify-center gap-2 ${
//                       isOutOfStock
//                         ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
//                         : isItemInCart(item.id)
//                         ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
//                         : wasAdded
//                         ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
//                         : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30 transform hover:scale-105"
//                     }`}
//                   >
//                     <ShoppingCart size={16} />
//                     {isOutOfStock
//                       ? "Out of Stock"
//                       : isItemInCart(item.id)
//                       ? "Go to Cart"
//                       : wasAdded
//                       ? "✓ Added!"
//                       : "Add to Cart"}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Pagination Controls */}
//         {!isLoading && totalCount > 0 && (
//           <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-800/30 backdrop-blur-xl rounded-xl p-6 border border-gray-700 shadow-lg">
//             <div className="text-sm text-gray-400">
//               Showing <span className="font-semibold text-white">{startItem}</span> to <span className="font-semibold text-white">{endItem}</span> of <span className="font-semibold text-white">{totalCount}</span> products
//             </div>
            
//             <div className="flex items-center gap-2 flex-wrap justify-center">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`p-2.5 rounded-lg transition-all ${
//                   currentPage === 1
//                     ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
//                     : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-105"
//                 }`}
//                 aria-label="Previous page"
//               >
//                 <ChevronLeft size={20} />
//               </button>

//               {getPageNumbers().map((page, index) => (
//                 page === '...' ? (
//                   <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
//                 ) : (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`min-w-[40px] px-4 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 ${
//                       currentPage === page
//                         ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
//                         : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 )
//               ))}

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`p-2.5 rounded-lg transition-all ${
//                   currentPage === totalPages
//                     ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
//                     : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-105"
//                 }`}
//                 aria-label="Next page"
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* No Products Found */}
//         {!isLoading && displayedProducts.length === 0 && (
//           <div className="col-span-full text-center py-20 animate-fadeIn">
//             <div className="inline-block p-12 bg-gray-800/30 backdrop-blur-xl rounded-2xl border-2 border-gray-700 shadow-2xl">
//               <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
//                 <Package size={48} className="text-gray-500" />
//               </div>
//               <p className="text-gray-400 text-xl mb-6 font-medium">No products found</p>
//               <button 
//                 onClick={clearFilters} 
//                 className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 transform hover:scale-105"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Quick View Modal */}
//         {quickViewProduct && (
//           <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setQuickViewProduct(null)}>
//             <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 max-w-5xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto animate-scaleIn border border-gray-700" onClick={(e) => e.stopPropagation()}>
//               <button 
//                 onClick={() => setQuickViewProduct(null)} 
//                 className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white transition-all z-10 p-2 hover:bg-gray-800 rounded-lg"
//                 aria-label="Close quick view"
//               >
//                 <X size={24} />
//               </button>
              
//               <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//                 <div className="relative">
//                   <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 lg:p-10 flex items-center justify-center border border-gray-700">
//                     <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-64 sm:h-80 lg:h-96 object-contain transform hover:scale-110 transition-transform duration-500" />
//                   </div>
//                   {quickViewProduct.trending && (
//                     <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-lg animate-pulse">
//                       <Flame size={16} className="fill-current" />
//                       TRENDING NOW
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex flex-col">
//                   <div className="mb-6">
//                     <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{quickViewProduct.name}</h3>
//                     <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">${quickViewProduct.price}</p>
                    
//                     <div className="flex items-center gap-3 mb-6">
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star key={i} size={20} className={i < Math.floor(quickViewProduct.rating) ? "text-amber-400 fill-current" : "text-gray-600"} />
//                         ))}
//                       </div>
//                       <span className="text-lg font-bold text-white">({quickViewProduct.rating})</span>
//                       <span className="text-gray-600">•</span>
//                       <span className="text-gray-500 flex items-center gap-1">
//                         <Eye size={16} />
//                         {quickViewProduct.views} views
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4 mb-8">
//                     <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
//                       <Tag size={20} className="text-purple-400" />
//                       <div>
//                         <span className="text-sm text-gray-400 block">Category</span>
//                         <span className="font-semibold text-white">{quickViewProduct.category}</span>
//                       </div>
//                     </div>
                    
//                     <div className={`flex items-center gap-3 p-4 rounded-xl border ${
//                       quickViewProduct.stock > 0 ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30"
//                     }`}>
//                       <Package size={20} className={quickViewProduct.stock > 0 ? "text-emerald-400" : "text-rose-400"} />
//                       <div>
//                         <span className="text-sm text-gray-400 block">Availability</span>
//                         <span className={`font-bold ${quickViewProduct.stock > 0 ? "text-emerald-400" : "text-rose-400"}`}>
//                           {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} in stock` : "Out of Stock"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex gap-3 mt-auto">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleWishlist(quickViewProduct);
//                       }}
//                       className={`p-4 rounded-xl transition-all transform hover:scale-110 ${
//                         wishlist.some((p) => p.productId === quickViewProduct.id)
//                           ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
//                           : "bg-gray-700/50 text-gray-400 hover:bg-gray-600 hover:text-white"
//                       }`}
//                     >
//                       <Heart size={24} className={wishlist.some((p) => p.productId === quickViewProduct.id) ? "fill-current" : ""} />
//                     </button>
//                     <button
//                       onClick={() => handleProductClick(quickViewProduct)}
//                       className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 transform hover:scale-105 text-lg"
//                     >
//                       View Full Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Floating Scroll to Top Button */}
//         {showScrollTop && (
//           <button
//             onClick={scrollToTop}
//             className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:from-purple-700 hover:to-indigo-700 transition-all z-40 transform hover:scale-110 animate-fadeIn"
//             aria-label="Scroll to top"
//           >
//             <ArrowUp size={24} />
//           </button>
//         )}
//       </div>

//       {/* Custom Animations */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }
//         @keyframes shimmer {
//           0% {
//             background-position: -1000px 0;
//           }
//           100% {
//             background-position: 1000px 0;
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.5s ease-out forwards;
//         }
//         .animate-scaleIn {
//           animation: scaleIn 0.3s ease-out;
//         }
//         .animate-slideInRight {
//           animation: slideInRight 0.3s ease-out;
//         }
//         .animate-shimmer {
//           background: linear-gradient(90deg, #374151 0%, #4b5563 50%, #374151 100%);
//           background-size: 1000px 100%;
//           animation: shimmer 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// }








import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Heart, Star, Package, Grid3X3, List, Filter, X, ShoppingCart, Sparkles, TrendingUp, Zap, ChevronDown, ChevronUp, Search, SlidersHorizontal, ArrowUp, Tag, Clock, Eye, ChevronLeft, ChevronRight, Flame, Trophy, Shield } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";


export default function MoreProducts({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchBase, setSearchBase] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const { wishlist = [], toggleWishlist } = useWishlist();


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
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 9;

  // Animation states
  const [hoveredCard, setHoveredCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState({});

  // Advanced filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  // Statistics
  const [stats, setStats] = useState({
    totalProducts: 0,
    avgPrice: 0,
    avgRating: 0
  });

  // Categories from backend
  const [categories, setCategories] = useState(["All"]);

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

  // Fetch categories from backend - FIXED: remove duplicate "All"
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/Products/categories-list");
        if (res.data.data) {
          const backendCategories = res.data.data.filter(cat => cat !== "All");
          setCategories(["All", ...backendCategories]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        if (products.length > 0) {
          const uniqueCategories = [...new Set(products.map(p => p.category))].filter(cat => cat !== "All");
          setCategories(["All", ...uniqueCategories]);
        }
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/Products/stats");
        if (res.data.data) {
          const statsData = res.data.data;
          setStats({
            totalProducts: statsData.totalProducts || 0,
            avgPrice: statsData.averagePrice ? parseFloat(statsData.averagePrice.toFixed(2)) : 0,
            avgRating: 4.5
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats({
          totalProducts: 0,
          avgPrice: 0,
          avgRating: 4.5
        });
      }
    };
    
    fetchStats();
  }, []);

  // MAIN FETCH FUNCTION
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProductsRes = await api.get("/Products/User/GetAll");
        const allProducts = allProductsRes.data.data || [];
        
        const productsWithRating = allProducts.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.imageUrl || "/placeholder.png",
          stock: product.stockQuantity ?? 0,
          rating: generateRandomRating(),
          views: Math.floor(Math.random() * 1000) + 100,
          trending: Math.random() > 0.7
        }));

        let filtered = [...productsWithRating];
        
        if (selectedCategory && selectedCategory !== "All") {
          filtered = filtered.filter(p => p.category === selectedCategory);
        }
        
        if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
        if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
        
        if (searchTerm && searchTerm.trim()) {
          filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (minRating > 0) {
          filtered = filtered.filter(p => p.rating >= minRating);
        }

        if (sortOption === "price-low") filtered.sort((a,b) => a.price - b.price);
        if (sortOption === "price-high") filtered.sort((a,b) => b.price - a.price);
        if (sortOption === "newest") filtered.sort((a,b) => b.id - a.id);
        if (sortOption === "trending") {
          filtered = filtered.sort((a,b) => Math.random() - 0.5);
        }
        if (sortOption === "popular") {
          filtered = filtered.sort((a,b) => b.id - a.id);
        }

        setProducts(productsWithRating);
        setFilteredProducts(filtered);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        setDisplayedProducts(filtered.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setTotalCount(filtered.length);

      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setFilteredProducts([]);
        setDisplayedProducts([]);
        setTotalPages(1);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    currentPage,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    sortOption,
    searchTerm
  ]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleProductClick = (item) => navigate(`/Product/${item.id}`, { state: item });

  const isItemInCart = (productId) =>
    cart.some(c => c.productId === productId);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();

    if (!user) {
      toast.warning("Please login to add items to your cart", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }

    if (item.stock <= 0) {
      toast.error("Sorry, this product is currently out of stock");
      return;
    }

    if (isItemInCart(item.id)) {
      toast.info("This item is already in your cart", {
        action: {
          label: "View Cart",
          onClick: () => navigate("/cart"),
        },
      });
      return;
    }

    addToCart(item, 1);
    toast.success("Added to cart 🛒");
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
    setCurrentPage(1);
  };

  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: "Out of Stock", color: "text-rose-400 bg-rose-500/10", border: "border-rose-500/30", badge: "bg-rose-500" };
    if (stock <= 5) return { text: `Only ${stock} left`, color: "text-amber-400 bg-amber-500/10", border: "border-amber-500/30", badge: "bg-amber-500" };
    if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-400 bg-yellow-500/10", border: "border-yellow-500/30", badge: "bg-yellow-500" };
    return { text: `${stock} in stock`, color: "text-emerald-400 bg-emerald-500/10", border: "border-emerald-500/30", badge: "bg-emerald-500" };
  };

  const handleImageLoad = (id) => {
    setImageLoadStates(prev => ({ ...prev, [id]: true }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = selectedCategory !== "All" || minPrice !== "" || maxPrice !== "" || minRating > 0 || sortOption !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
            Discover Premium Football Gear
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {totalCount > 0 ? `Showing ${startItem}–${endItem} of ${totalCount} products` : "Loading products..."}
          </p>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="mb-8 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">

          {/* Row 1: Categories + Controls */}
          <div className="p-4 sm:p-5">
            <div className="flex flex-col gap-4">

              {/* Top row: sort + view + mobile filter button */}
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:block">
                  Filter &amp; Sort
                </p>

                <div className="flex items-center gap-2 ml-auto">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
                      className="pl-3 pr-8 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="">Sort: Featured</option>
                      <option value="price-low">Price: Low → High</option>
                      <option value="price-high">Price: High → Low</option>
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest First</option>
                      <option value="trending">Trending</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center gap-0.5 bg-gray-800 rounded-lg p-1 border border-gray-700">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded transition-all ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded transition-all ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                      aria-label="List view"
                    >
                      <List size={16} />
                    </button>
                  </div>

                  {/* Mobile: open filter drawer */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium"
                  >
                    <Filter size={15} />
                    Filters
                    {hasActiveFilters && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                  </button>
                </div>
              </div>

              {/* Category Pills — scrollable on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                    className={`flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Advanced Filters — hidden on mobile (shown in drawer) */}
          <div className="hidden sm:block border-t border-gray-800 px-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

              {/* Price Range */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min $0"
                    value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
                  />
                  <span className="text-gray-600 flex-shrink-0">–</span>
                  <input
                    type="number"
                    placeholder="Max $10000"
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                  Minimum Rating
                </label>
                <div className="flex gap-2">
                  {[0, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => { setMinRating(r); setCurrentPage(1); }}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
                        minRating === r
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                          : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-amber-500 hover:bg-gray-700"
                      }`}
                    >
                      {r === 0 ? "All" : `${r}+`}
                      {r > 0 && <Star size={10} className={minRating === r ? "fill-current" : "text-amber-400"} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              <div>
                <button
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                    hasActiveFilters
                      ? "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg shadow-rose-500/30"
                      : "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                  }`}
                >
                  <X size={15} />
                  Clear All Filters
                  {hasActiveFilters && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE FILTER DRAWER ── */}
        {isMobileFilterOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 sm:hidden animate-fadeIn"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl border-t border-gray-700 p-5 animate-slideUp max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal size={20} className="text-purple-400" />
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          selectedCategory === cat
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                            : "bg-gray-800 text-gray-300 border border-gray-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Price Range</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min $0"
                      value={minPrice}
                      onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
                      className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
                    />
                    <span className="text-gray-600">–</span>
                    <input
                      type="number"
                      placeholder="Max $10000"
                      value={maxPrice}
                      onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                      className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Minimum Rating</label>
                  <div className="flex gap-2">
                    {[0, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        onClick={() => { setMinRating(r); setCurrentPage(1); }}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
                          minRating === r
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                            : "bg-gray-800 border border-gray-700 text-gray-300"
                        }`}
                      >
                        {r === 0 ? "All" : `${r}+`}
                        {r > 0 && <Star size={11} className={minRating === r ? "fill-current" : "text-amber-400"} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Sort By</label>
                  <select
                    value={sortOption}
                    onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
                    className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Featured</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }}
                    className="flex-1 py-3 bg-gray-800 border border-gray-700 text-gray-300 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <X size={15} /> Clear
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-semibold"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6 animate-pulse">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-48 rounded-lg mb-4"></div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-4 rounded-full mb-2 w-3/4"></div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-6 rounded-full w-1/2 mb-3"></div>
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-10 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid/List */}
        {!isLoading && displayedProducts.length > 0 && (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {displayedProducts.map((item, index) => {
              const isInWishlist = (wishlist || []).some(p => p.productId === item.id);
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
                    className={`group bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700 hover:border-purple-500/50 p-6 cursor-pointer transition-all duration-300 flex flex-col sm:flex-row gap-6 animate-fadeInUp ${
                      isOutOfStock ? "opacity-60" : ""
                    } ${isHovered ? "shadow-2xl shadow-purple-500/10 scale-[1.01]" : "shadow-lg"}`}
                  >
                    {item.trending && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                        <Flame size={12} className="fill-current" />
                        TRENDING
                      </div>
                    )}

                    <div className="flex-shrink-0 mx-auto sm:mx-0 relative group">
                      <div className="relative w-full sm:w-40 h-40 sm:h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                        {!isImageLoaded && (
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-shimmer"></div>
                        )}
                        <img 
                          src={item.image} 
                          alt={item.name}
                          onLoad={() => handleImageLoad(item.id)}
                          className={`w-full h-full object-contain p-4 transition-all duration-300 ${isOutOfStock ? "grayscale" : ""} ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-105' : 'scale-100'}`} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-gray-200 transition-colors">{item.name}</h3>
                          <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">${item.price}</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
                          className={`p-2.5 rounded-lg transition-all transform hover:scale-110 ${
                            isInWishlist ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30" : "bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-white"
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
                              className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-gray-600"} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-white">{item.rating}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
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
                          className="flex-1 px-4 py-2.5 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-600/50 hover:text-white transition-all backdrop-blur-sm"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(item, e)}
                          disabled={isOutOfStock}
                          className={`flex-1 px-4 py-2.5 rounded-lg transition-all font-semibold flex items-center justify-center gap-2 text-sm ${
                            isOutOfStock 
                              ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                              : isItemInCart(item.id)
                              ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                              : wasAdded
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30"
                          }`}
                        >
                          <ShoppingCart size={16} />
                          {isOutOfStock
                            ? "Unavailable"
                            : isItemInCart(item.id)
                            ? "Go to Cart"
                            : wasAdded
                            ? "Added!"
                            : "Add to Cart"}
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
                  className={`group bg-gray-800/30 backdrop-blur-xl rounded-xl border-2 border-gray-700 hover:border-purple-500/50 p-4 sm:p-6 cursor-pointer transition-all duration-300 animate-fadeInUp ${
                    isOutOfStock ? "opacity-60" : ""
                  } ${isHovered ? "shadow-2xl shadow-purple-500/10 -translate-y-1" : "shadow-lg"}`}
                >
                  <div className="relative mb-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                      className={`absolute top-2 right-2 p-2 rounded-lg transition-all z-20 transform hover:scale-110 backdrop-blur-sm ${
                        isInWishlist ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
                                  : "bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
                      }`}
                    >
                      <Heart size={16} className={isInWishlist ? "fill-current" : ""} />
                    </button>

                    <span className={`absolute top-2 left-2 px-3 py-1.5 rounded-lg text-xs font-bold border backdrop-blur-sm z-20 flex items-center gap-1.5 ${stockStatus.color} ${stockStatus.border}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${stockStatus.badge} animate-pulse`}></div>
                      {stockStatus.text}
                    </span>

                    {item.trending && (
                      <div className="absolute top-12 left-2 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold rounded flex items-center gap-1 shadow-lg z-20 animate-pulse">
                        <Flame size={10} className="fill-current" />
                        HOT
                      </div>
                    )}

                    <div className="mt-12 relative h-48 sm:h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                      {!isImageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 animate-shimmer"></div>
                      )}
                      <img 
                        src={item.image} 
                        alt={item.name}
                        onLoad={() => handleImageLoad(item.id)}
                        className={`w-full h-full object-contain p-4 transition-all duration-300 ${isOutOfStock ? "grayscale" : ""} ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-105' : 'scale-100'}`} 
                      />
                    </div>
                  </div>
                
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-gray-200 transition-colors">{item.name}</h3>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">${item.price}</p>

                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-gray-600"} 
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold text-white">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Eye size={12} />
                      {item.views}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleQuickView(item, e)}
                    className="w-full py-2.5 mb-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-600/50 hover:text-white transition-all backdrop-blur-sm"
                  >
                    Quick View
                  </button>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    disabled={isOutOfStock}
                    className={`w-full py-2.5 rounded-lg transition-all font-semibold text-sm flex items-center justify-center gap-2 ${
                      isOutOfStock
                        ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                        : isItemInCart(item.id)
                        ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                        : wasAdded
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/30 transform hover:scale-105"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {isOutOfStock
                      ? "Out of Stock"
                      : isItemInCart(item.id)
                      ? "Go to Cart"
                      : wasAdded
                      ? "✓ Added!"
                      : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalCount > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-800/30 backdrop-blur-xl rounded-xl p-6 border border-gray-700 shadow-lg">
            <div className="text-sm text-gray-400">
              Showing <span className="font-semibold text-white">{startItem}</span> to <span className="font-semibold text-white">{endItem}</span> of <span className="font-semibold text-white">{totalCount}</span> products
            </div>
            
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2.5 rounded-lg transition-all ${
                  currentPage === 1
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-105"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>

              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`min-w-[40px] px-4 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2.5 rounded-lg transition-all ${
                  currentPage === totalPages
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-105"
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* No Products Found */}
        {!isLoading && displayedProducts.length === 0 && (
          <div className="col-span-full text-center py-20 animate-fadeIn">
            <div className="inline-block p-12 bg-gray-800/30 backdrop-blur-xl rounded-2xl border-2 border-gray-700 shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                <Package size={48} className="text-gray-500" />
              </div>
              <p className="text-gray-400 text-xl mb-6 font-medium">No products found</p>
              <button 
                onClick={clearFilters} 
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setQuickViewProduct(null)}>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 max-w-5xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto animate-scaleIn border border-gray-700" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setQuickViewProduct(null)} 
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white transition-all z-10 p-2 hover:bg-gray-800 rounded-lg"
                aria-label="Close quick view"
              >
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 lg:p-10 flex items-center justify-center border border-gray-700">
                    <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-64 sm:h-80 lg:h-96 object-contain transform hover:scale-110 transition-transform duration-500" />
                  </div>
                  {quickViewProduct.trending && (
                    <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-lg animate-pulse">
                      <Flame size={16} className="fill-current" />
                      TRENDING NOW
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{quickViewProduct.name}</h3>
                    <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">${quickViewProduct.price}</p>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className={i < Math.floor(quickViewProduct.rating) ? "text-amber-400 fill-current" : "text-gray-600"} />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-white">({quickViewProduct.rating})</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Eye size={16} />
                        {quickViewProduct.views} views
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                      <Tag size={20} className="text-purple-400" />
                      <div>
                        <span className="text-sm text-gray-400 block">Category</span>
                        <span className="font-semibold text-white">{quickViewProduct.category}</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                      quickViewProduct.stock > 0 ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30"
                    }`}>
                      <Package size={20} className={quickViewProduct.stock > 0 ? "text-emerald-400" : "text-rose-400"} />
                      <div>
                        <span className="text-sm text-gray-400 block">Availability</span>
                        <span className={`font-bold ${quickViewProduct.stock > 0 ? "text-emerald-400" : "text-rose-400"}`}>
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
                        wishlist.some((p) => p.productId === quickViewProduct.id)
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
                          : "bg-gray-700/50 text-gray-400 hover:bg-gray-600 hover:text-white"
                      }`}
                    >
                      <Heart size={24} className={wishlist.some((p) => p.productId === quickViewProduct.id) ? "fill-current" : ""} />
                    </button>
                    <button
                      onClick={() => handleProductClick(quickViewProduct)}
                      className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 transform hover:scale-105 text-lg"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:from-purple-700 hover:to-indigo-700 transition-all z-40 transform hover:scale-110 animate-fadeIn"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.35s ease-out; }
        .animate-shimmer {
          background: linear-gradient(90deg, #374151 0%, #4b5563 50%, #374151 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}