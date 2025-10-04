
// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../Api/Axios_Instance";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { Heart, Star, Package, Grid3X3, List, Filter, X, ShoppingCart } from "lucide-react";
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

//   // Generate random rating between 3.0 and 5.0
//   const generateRandomRating = () => {
//     return parseFloat((Math.random() * 2 + 3).toFixed(1));
//   };

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await api.get("/products");
//         // Add random rating to each product
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
//     if (stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-100" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-100" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-100" };
//     return { text: `${stock} in stock`, color: "text-green-600 bg-green-100" };
//   };

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const displayedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
//       {/* Header with View Toggle */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <div>
//           <h2 className="text-4xl font-extrabold text-blue-900 mb-2">
//             {selectedCategory !== "All" ? `Shop ${selectedCategory}` : "All Products"}
//           </h2>
//           <p className="text-blue-700">Showing {displayedProducts.length} of {filteredProducts.length} products</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`p-2 rounded-lg transition ${
//               viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
//             }`}
//           >
//             <Grid3X3 size={20} />
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`p-2 rounded-lg transition ${
//               viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
//             }`}
//           >
//             <List size={20} />
//           </button>
//           <button
//             onClick={() => setShowFilterPanel(!showFilterPanel)}
//             className="p-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition"
//           >
//             <Filter size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Filter Panel */}
//       {showFilterPanel && (
//         <div className="mb-8 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
//           <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
//               <Filter size={18} />
//               Filter Products
//             </h3>
//           </div>
          
//           <div className="p-4">
//             <div className="flex flex-wrap items-center gap-4">
//               {/* Category Filter */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Category:</span>
//                 <div className="flex flex-wrap gap-1">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectedCategory(cat)}
//                       className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${
//                         selectedCategory === cat
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Filter */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Price:</span>
//                 <div className="flex gap-1 items-center">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={minPrice}
//                     onChange={(e) => setMinPrice(e.target.value)}
//                     className="w-20 p-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
//                   />
//                   <span className="text-gray-400 text-xs">-</span>
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(e.target.value)}
//                     className="w-20 p-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
//                   />
//                 </div>
//               </div>

//               {/* Rating Filter */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Rating:</span>
//                 <select
//                   value={minRating}
//                   onChange={(e) => setMinRating(Number(e.target.value))}
//                   className="p-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
//                 >
//                   {[0, 1, 2, 3, 4, 5].map((r) => (
//                     <option key={r} value={r}>{r === 0 ? "All" : `${r}+`}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Sort Filter */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort:</span>
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="p-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
//                 >
//                   <option value="">Default</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="popular">Most Popular</option>
//                   <option value="newest">Newest First</option>
//                 </select>
//               </div>

//               {/* Clear Filters Button */}
//               <button
//                 onClick={clearFilters}
//                 className="ml-auto px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md transition flex items-center gap-1"
//               >
//                 <X size={14} />
//                 Clear
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products Grid/List */}
//       <div className={viewMode === "grid" 
//         ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
//         : "flex flex-col gap-4"
//       }>
//         {displayedProducts.map((item) => {
//           const isInWishlist = wishlist.some((p) => p.id === item.id);
//           const stockStatus = getStockStatus(item.stock || 0);
//           const isOutOfStock = (item.stock || 0) <= 0;
          
//           if (viewMode === "list") {
//             return (
//               <div
//                 key={item.id}
//                 onClick={() => handleProductClick(item)}
//                 className={`bg-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-200 p-6 cursor-pointer transform hover:scale-[1.01] transition flex gap-6 ${
//                   isOutOfStock ? "opacity-75" : ""
//                 }`}
//               >
//                 <img 
//                   src={item.image} 
//                   alt={item.name} 
//                   className={`w-40 h-40 object-contain rounded-lg ${isOutOfStock ? "grayscale" : ""}`} 
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-bold text-blue-900 mb-2">{item.name}</h3>
//                   <p className="text-blue-600 font-bold text-2xl mb-3">${item.price}</p>
//                   <div className="flex items-center gap-1 mb-3">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} size={20} className={`${i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
//                     ))}
//                     <span className="ml-2 text-gray-600 text-sm">{item.rating}</span>
//                   </div>
//                   <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${stockStatus.color}`}>
//                     <Package size={16} />
//                     {stockStatus.text}
//                   </span>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <button onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
//                     <Heart size={22} className={isInWishlist ? "fill-current" : ""} />
//                   </button>
//                   <button onClick={(e) => handleQuickView(item, e)} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition whitespace-nowrap">
//                     Quick View
//                   </button>
//                   <button
//                     onClick={(e) => handleAddToCart(item, e)}
//                     disabled={isOutOfStock}
//                     className={`px-4 py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2 ${
//                       isOutOfStock ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
//                     }`}
//                   >
//                     <ShoppingCart size={18} />
//                     {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//                   </button>
//                 </div>
//               </div>
//             );
//           }
          
//           return (
//             <div
//               key={item.id}
//               onClick={() => handleProductClick(item)}
//               className={`bg-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-200 p-6 cursor-pointer transform hover:scale-105 transition relative ${
//                 isOutOfStock ? "opacity-75" : ""
//               }`}
//             >
//               <button
//                 onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
//                 className="absolute top-4 right-4 text-red-500 z-10 hover:scale-110 transition"
//               >
//                <Heart size={24} className={isInWishlist ? "fill-current" : ""} />
//               </button>

//               {/* Stock Badge */}
//               <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${stockStatus.color}`}>
//                 <Package size={14} />
//                 {stockStatus.text}
//               </div>

//               <img 
//                 src={item.image} 
//                 alt={item.name} 
//                 className={`w-full h-48 object-contain mb-4 rounded-lg mt-8 ${isOutOfStock ? "grayscale" : ""}`} 
//               />
              
//               <h3 className="text-lg font-bold text-blue-900 mb-1">{item.name}</h3>
//               <p className="text-blue-600 font-bold text-xl mb-3">${item.price}</p>

//               <div className="flex items-center gap-1 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} size={18} className={`${i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
//                 ))}
//                 <span className="ml-2 text-gray-600 text-sm">{item.rating}</span>
//               </div>

//               <button
//                 onClick={(e) => handleQuickView(item, e)}
//                 className="w-full py-2 mb-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
//               >
//                 Quick View
//               </button>

//               <button
//                 onClick={(e) => handleAddToCart(item, e)}
//                 disabled={isOutOfStock}
//                 className={`w-full py-2 rounded-xl transition font-semibold shadow-md ${
//                   isOutOfStock
//                     ? "bg-gray-400 text-gray-600 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
//                 }`}
//               >
//                 {isOutOfStock ? "Out of Stock" : "Add to Cart"}
//               </button>
//             </div>
//           );
//         })}
//         {displayedProducts.length === 0 && (
//           <div className="col-span-full text-center py-20">
//             <p className="text-blue-700 text-lg mb-2">No products found matching your criteria.</p>
//             <button onClick={clearFilters} className="text-blue-600 font-semibold hover:underline">
//               Clear filters and try again
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Quick View Modal */}
//       {quickViewProduct && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setQuickViewProduct(null)}>
//           <div className="bg-white rounded-2xl p-8 max-w-3xl w-full mx-4 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
//             <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
//               <X size={28} />
//             </button>
//             <div className="grid md:grid-cols-2 gap-8">
//               <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-80 object-contain rounded-lg" />
//               <div>
//                 <h3 className="text-3xl font-bold text-blue-900 mb-3">{quickViewProduct.name}</h3>
//                 <p className="text-blue-600 text-3xl font-bold mb-4">${quickViewProduct.price}</p>
//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={22} className={`${i < Math.floor(quickViewProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
//                   ))}
//                   <span className="ml-2 text-gray-600 font-medium">({quickViewProduct.rating})</span>
//                 </div>
//                 <p className="text-gray-600 mb-3"><span className="font-semibold">Category:</span> {quickViewProduct.category}</p>
//                 <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6 font-semibold ${
//                   quickViewProduct.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                 }`}>
//                   <Package size={20} />
//                   {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} in stock` : "Out of Stock"}
//                 </div>
//                 <button
//                   onClick={() => handleProductClick(quickViewProduct)}
//                   className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition"
//                 >
//                   View Full Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-12 gap-2">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition font-semibold"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-4 py-2 rounded-lg font-semibold transition ${
//                 currentPage === page
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition font-semibold"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }











import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Heart, Star, Package, Grid3X3, List, Filter, X, ShoppingCart, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function MoreProducts({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Animation states
  const [hoveredCard, setHoveredCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);

  // Generate random rating between 3.0 and 5.0
  const generateRandomRating = () => {
    return parseFloat((Math.random() * 2 + 3).toFixed(1));
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        const productsWithRating = data.map(product => ({
          ...product,
          rating: generateRandomRating()
        }));
        setProducts(productsWithRating);
      } catch {
        setProducts([]);
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

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, minPrice, maxPrice, minRating, searchTerm, sortOption]);

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
    if (stock <= 0) return { text: "Out of Stock", color: "text-rose-600 bg-rose-50", border: "border-rose-200" };
    if (stock <= 5) return { text: `Only ${stock} left`, color: "text-amber-600 bg-amber-50", border: "border-amber-200" };
    if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-200" };
    return { text: `${stock} in stock`, color: "text-emerald-600 bg-emerald-50", border: "border-emerald-200" };
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Elegant Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-2 tracking-tight">
              {selectedCategory !== "All" ? selectedCategory : "Our Collection"}
            </h1>
            <p className="text-slate-600 flex items-center gap-2 text-sm">
              <TrendingUp size={16} className="text-slate-400" />
              {displayedProducts.length} of {filteredProducts.length} items
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === "grid" 
                  ? "bg-slate-900 text-white" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                viewMode === "list" 
                  ? "bg-slate-900 text-white" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <List size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="p-2.5 rounded-lg bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all duration-200"
            >
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Refined Filter Panel */}
        {showFilterPanel && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider mb-6">Filters</h3>
              
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          selectedCategory === cat
                            ? "bg-slate-900 text-white"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Filter */}
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Price Range</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                      <span className="text-slate-400">—</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Minimum Rating</label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    >
                      {[0, 1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r === 0 ? "All Ratings" : `${r}+ Stars`}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">Sort By</label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    >
                      <option value="">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
                  >
                    <X size={16} />
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "flex flex-col gap-4"
        }>
          {displayedProducts.map((item) => {
            const isInWishlist = wishlist.some((p) => p.id === item.id);
            const stockStatus = getStockStatus(item.stock || 0);
            const isOutOfStock = (item.stock || 0) <= 0;
            const isHovered = hoveredCard === item.id;
            const wasAdded = addedToCart === item.id;
          
            if (viewMode === "list") {
              return (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item)}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-6 cursor-pointer transition-all duration-300 flex gap-6 ${
                    isOutOfStock ? "opacity-60" : ""
                  } ${isHovered ? "shadow-lg" : "shadow-sm"}`}
                >
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className={`w-32 h-32 object-contain rounded-lg ${isOutOfStock ? "grayscale" : ""}`} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-slate-900 mb-2 truncate">{item.name}</h3>
                    <p className="text-2xl font-semibold text-slate-900 mb-3">${item.price}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-slate-200"} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-slate-600">{item.rating}</span>
                    </div>
                    
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium border ${stockStatus.color} ${stockStatus.border}`}>
                      <Package size={14} />
                      {stockStatus.text}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }} 
                      className={`p-2 rounded-lg transition-all ${
                        isInWishlist ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                      }`}
                    >
                      <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
                    </button>
                    <button 
                      onClick={(e) => handleQuickView(item, e)} 
                      className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all whitespace-nowrap"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      disabled={isOutOfStock}
                      className={`px-4 py-2 rounded-lg transition-all font-medium flex items-center justify-center gap-2 text-sm ${
                        isOutOfStock 
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                          : wasAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {isOutOfStock ? "Unavailable" : wasAdded ? "Added" : "Add"}
                    </button>
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
                className={`group bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-6 cursor-pointer transition-all duration-300 ${
                  isOutOfStock ? "opacity-60" : ""
                } ${isHovered ? "shadow-lg -translate-y-1" : "shadow-sm"}`}
              >
                <div className="relative mb-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(item); }}
                    className={`absolute top-0 right-0 p-2 rounded-lg transition-all ${
                      isInWishlist ? "bg-rose-50 text-rose-600" : "bg-white text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
                  </button>

                  <span className={`absolute top-0 left-0 px-3 py-1 rounded-lg text-xs font-medium border ${stockStatus.color} ${stockStatus.border}`}>
                    {stockStatus.text}
                  </span>

                  <div className="mt-10">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className={`w-full h-48 object-contain ${isOutOfStock ? "grayscale" : ""}`} 
                    />
                  </div>
                </div>
              
                <h3 className="text-base font-medium text-slate-900 mb-2 line-clamp-2">{item.name}</h3>
                <p className="text-xl font-semibold text-slate-900 mb-3">${item.price}</p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(item.rating) ? "text-amber-400 fill-current" : "text-slate-200"} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-slate-600">{item.rating}</span>
                </div>

                <button
                  onClick={(e) => handleQuickView(item, e)}
                  className="w-full py-2.5 mb-3 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all"
                >
                  Quick View
                </button>

                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  disabled={isOutOfStock}
                  className={`w-full py-2.5 rounded-lg transition-all font-medium text-sm ${
                    isOutOfStock
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : wasAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : wasAdded ? "✓ Added" : "Add to Cart"}
                </button>
              </div>
            );
          })}
          
          {displayedProducts.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-8 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-600 text-lg mb-4">No products found</p>
                <button 
                  onClick={clearFilters} 
                  className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Elegant Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setQuickViewProduct(null)}>
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setQuickViewProduct(null)} 
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-slate-50 rounded-xl p-8 flex items-center justify-center">
                  <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-80 object-contain" />
                </div>
                
                <div>
                  <h3 className="text-3xl font-serif font-light text-slate-900 mb-4">{quickViewProduct.name}</h3>
                  <p className="text-3xl font-semibold text-slate-900 mb-4">${quickViewProduct.price}</p>
                  
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < Math.floor(quickViewProduct.rating) ? "text-amber-400 fill-current" : "text-slate-200"} />
                    ))}
                    <span className="ml-2 text-slate-600">({quickViewProduct.rating})</span>
                  </div>
                  
                  <p className="text-slate-600 mb-3">
                    <span className="font-medium text-slate-900">Category:</span> {quickViewProduct.category}
                  </p>
                  
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8 font-medium border ${
                    quickViewProduct.stock > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}>
                    <Package size={18} />
                    {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} in stock` : "Out of Stock"}
                  </div>
                  
                  <button
                    onClick={() => handleProductClick(quickViewProduct)}
                    className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Refined Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white text-slate-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all font-medium text-sm border border-slate-200"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  currentPage === page
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white text-slate-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all font-medium text-sm border border-slate-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}