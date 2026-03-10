

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

//   const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [minRating, setMinRating] = useState(0);
//   const [sortOption, setSortOption] = useState("");

//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilterPanel, setShowFilterPanel] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const itemsPerPage = 9;

//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [addedToCart, setAddedToCart] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [imageLoadStates, setImageLoadStates] = useState({});

//   const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

//   const [stats, setStats] = useState({ totalProducts: 0, avgPrice: 0, avgRating: 0 });

//   const [categories, setCategories] = useState(["All"]);

//   const generateRandomRating = () => parseFloat((Math.random() * 2 + 3).toFixed(1));

//   useEffect(() => {
//     const handleScroll = () => setShowScrollTop(window.scrollY > 500);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("/Products/categories-list");
//         if (res.data.data) {
//           const backendCategories = res.data.data.filter(cat => cat !== "All");
//           setCategories(["All", ...backendCategories]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//         if (products.length > 0) {
//           const uniqueCategories = [...new Set(products.map(p => p.category))].filter(cat => cat !== "All");
//           setCategories(["All", ...uniqueCategories]);
//         }
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get("/Products/stats");
//         if (res.data.data) {
//           const statsData = res.data.data;
//           setStats({
//             totalProducts: statsData.totalProducts || 0,
//             avgPrice: statsData.averagePrice ? parseFloat(statsData.averagePrice.toFixed(2)) : 0,
//             avgRating: 4.5
//           });
//         }
//       } catch (error) {
//         console.error("Failed to fetch stats:", error);
//         setStats({ totalProducts: 0, avgPrice: 0, avgRating: 4.5 });
//       }
//     };
//     fetchStats();
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const allProductsRes = await api.get("/Products/User/GetAll");
//         const allProducts = allProductsRes.data.data || [];
//         const productsWithRating = allProducts.map(product => ({
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           category: product.category,
//           image: product.imageUrl || "/placeholder.png",
//           stock: product.stockQuantity ?? 0,
//           rating: generateRandomRating(),
//           views: Math.floor(Math.random() * 1000) + 100,
//           trending: Math.random() > 0.7
//         }));

//         let filtered = [...productsWithRating];
//         if (selectedCategory && selectedCategory !== "All") filtered = filtered.filter(p => p.category === selectedCategory);
//         if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
//         if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
//         if (searchTerm && searchTerm.trim()) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
//         if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);
//         if (sortOption === "price-low") filtered.sort((a,b) => a.price - b.price);
//         if (sortOption === "price-high") filtered.sort((a,b) => b.price - a.price);
//         if (sortOption === "newest") filtered.sort((a,b) => b.id - a.id);
//         if (sortOption === "trending") filtered = filtered.sort((a,b) => Math.random() - 0.5);
//         if (sortOption === "popular") filtered = filtered.sort((a,b) => b.id - a.id);

//         setProducts(productsWithRating);
//         setFilteredProducts(filtered);
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         setDisplayedProducts(filtered.slice(startIndex, endIndex));
//         setTotalPages(Math.ceil(filtered.length / itemsPerPage));
//         setTotalCount(filtered.length);
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
//   }, [currentPage, selectedCategory, minPrice, maxPrice, minRating, sortOption, searchTerm]);

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
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
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

//   const isItemInCart = (productId) => cart.some(c => c.productId === productId);

//   const handleAddToCart = (item, e) => {
//     e.stopPropagation();
//     if (!user) {
//       toast.warning("Please login to add items to your cart", { action: { label: "Login", onClick: () => navigate("/login") } });
//       return;
//     }
//     if (item.stock <= 0) { toast.error("Sorry, this product is currently out of stock"); return; }
//     if (isItemInCart(item.id)) {
//       toast.info("This item is already in your cart", { action: { label: "View Cart", onClick: () => navigate("/cart") } });
//       return;
//     }
//     addToCart(item, 1);
//     toast.success("Added to cart 🛒");
//     setAddedToCart(item.id);
//     setTimeout(() => setAddedToCart(null), 2000);
//   };

//   const handleQuickView = (item, e) => { e.stopPropagation(); setQuickViewProduct(item); };

//   const clearFilters = () => {
//     setSelectedCategory("All");
//     setMinPrice("");
//     setMaxPrice("");
//     setMinRating(0);
//     setSortOption("");
//     setCurrentPage(1);
//   };

//   const getStockStatus = (stock) => {
//     if (stock <= 0) return { text: "Out of Stock", color: "ilu-stock-out", badge: "#ef4444" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "ilu-stock-low", badge: "#f59e0b" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "ilu-stock-mid", badge: "#eab308" };
//     return { text: `${stock} in stock`, color: "ilu-stock-ok", badge: "#22c55e" };
//   };

//   const handleImageLoad = (id) => setImageLoadStates(prev => ({ ...prev, [id]: true }));
//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
//   const hasActiveFilters = selectedCategory !== "All" || minPrice !== "" || maxPrice !== "" || minRating > 0 || sortOption !== "";

//   return (
//     <div style={{ minHeight: '100vh', background: '#000', fontFamily: "'Barlow', sans-serif", position: 'relative' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; }
//         .ilu-condensed { font-family: 'Barlow Condensed', sans-serif; }
//         .ilu-body      { font-family: 'Barlow', sans-serif; }

//         /* ── Buttons ── */
//         .ilu-btn-white {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
//           background: #fff; color: #000; border: none; cursor: pointer;
//           padding: 10px 20px; transition: background .15s;
//           display: inline-flex; align-items: center; gap: 7px; white-space: nowrap;
//         }
//         .ilu-btn-white:hover { background: #e8e8e8; }

//         .ilu-btn-outline {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
//           background: transparent; color: #fff; border: 1px solid #333; cursor: pointer;
//           padding: 10px 20px; transition: border-color .15s, background .15s;
//           display: inline-flex; align-items: center; gap: 7px; white-space: nowrap;
//         }
//         .ilu-btn-outline:hover { border-color: #666; background: #111; }

//         .ilu-btn-ghost {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 11px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase;
//           background: #111; color: #666; border: 1px solid #222; cursor: pointer;
//           padding: 10px 16px; transition: all .15s;
//           display: inline-flex; align-items: center; gap: 7px;
//         }
//         .ilu-btn-ghost:hover { border-color: #444; color: #fff; background: #1a1a1a; }
//         .ilu-btn-ghost.active { background: #fff; color: #000; border-color: #fff; }
//         .ilu-btn-ghost:disabled { opacity: .3; cursor: not-allowed; }

//         /* ── Filter bar ── */
//         .ilu-filter-bar { border: 1px solid #222; background: #000; }
//         .ilu-filter-top { padding: 16px 20px; border-bottom: 1px solid #1a1a1a; }
//         .ilu-filter-bottom { padding: 16px 20px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }

//         .ilu-label {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 9px; font-weight: 700; letter-spacing: .25em; text-transform: uppercase;
//           color: #444; display: block; margin-bottom: 8px;
//         }

//         .ilu-input {
//           width: 100%; padding: 8px 10px;
//           background: #0d0d0d; border: 1px solid #222; color: #fff;
//           font-family: 'Barlow', sans-serif; font-size: 13px;
//           outline: none; transition: border-color .15s;
//         }
//         .ilu-input:focus { border-color: #444; }
//         .ilu-input::placeholder { color: #333; }

//         .ilu-select {
//           padding: 8px 28px 8px 10px;
//           background: #0d0d0d; border: 1px solid #222; color: #fff;
//           font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
//           font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
//           outline: none; cursor: pointer; appearance: none;
//           transition: border-color .15s;
//         }
//         .ilu-select:focus { border-color: #444; }

//         /* ── Category pills ── */
//         .ilu-cat-pill {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
//           padding: 7px 14px; border: 1px solid #222; background: #000; color: #555;
//           cursor: pointer; white-space: nowrap; flex-shrink: 0;
//           transition: all .15s;
//         }
//         .ilu-cat-pill:hover { border-color: #444; color: #fff; }
//         .ilu-cat-pill.active { background: #fff; color: #000; border-color: #fff; }

//         /* ── Rating pills ── */
//         .ilu-rate-pill {
//           flex: 1; padding: 7px 4px;
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
//           background: #0d0d0d; border: 1px solid #222; color: #555;
//           cursor: pointer; transition: all .15s;
//           display: flex; align-items: center; justify-content: center; gap: 4px;
//         }
//         .ilu-rate-pill:hover { border-color: #444; color: #fff; }
//         .ilu-rate-pill.active { background: #fff; color: #000; border-color: #fff; }

//         /* ── Product card ── */
//         .ilu-card {
//           background: #000; border: 1px solid #1a1a1a; position: relative;
//           cursor: pointer; transition: border-color .2s;
//         }
//         .ilu-card:hover { border-color: #333; }
//         .ilu-card:hover .ilu-card-img { transform: scale(1.05); }
//         .ilu-card-img { transition: transform .5s ease; }

//         .ilu-card-actions {
//           position: absolute; top: 10px; right: 10px;
//           display: flex; flex-direction: column; gap: 5px;
//           opacity: 0; transition: opacity .2s;
//         }
//         .ilu-card:hover .ilu-card-actions { opacity: 1; }

//         .ilu-icon-btn {
//           width: 32px; height: 32px; background: #000; border: 1px solid #222;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; color: #666; transition: all .15s;
//         }
//         .ilu-icon-btn:hover, .ilu-icon-btn.active { background: #fff; color: #000; border-color: #fff; }

//         /* ── Stock badge ── */
//         .ilu-stock-tag {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 9px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase;
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 3px 8px;
//         }
//         .ilu-stock-out { background: rgba(239,68,68,.08); color: #ef4444; border: 1px solid rgba(239,68,68,.2); }
//         .ilu-stock-low { background: rgba(245,158,11,.08); color: #f59e0b; border: 1px solid rgba(245,158,11,.2); }
//         .ilu-stock-mid { background: rgba(234,179,8,.08); color: #eab308; border: 1px solid rgba(234,179,8,.2); }
//         .ilu-stock-ok  { background: rgba(34,197,94,.08); color: #22c55e; border: 1px solid rgba(34,197,94,.2); }

//         /* ── List card ── */
//         .ilu-list-card {
//           background: #000; border: 1px solid #1a1a1a;
//           display: flex; gap: 0; cursor: pointer; transition: border-color .2s;
//           position: relative;
//         }
//         .ilu-list-card:hover { border-color: #333; }

//         /* ── Trending badge ── */
//         .ilu-trending-badge {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 9px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
//           background: #fff; color: #000; padding: 3px 8px;
//           display: inline-flex; align-items: center; gap: 5px;
//         }

//         /* ── Pagination ── */
//         .ilu-page-btn {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 12px; font-weight: 800; letter-spacing: .1em;
//           min-width: 36px; height: 36px; padding: 0 10px;
//           background: #000; border: 1px solid #222; color: #555;
//           cursor: pointer; transition: all .15s;
//           display: inline-flex; align-items: center; justify-content: center;
//         }
//         .ilu-page-btn:hover:not(:disabled) { border-color: #555; color: #fff; }
//         .ilu-page-btn.active { background: #fff; color: #000; border-color: #fff; }
//         .ilu-page-btn:disabled { opacity: .25; cursor: not-allowed; }

//         /* ── Quick view modal ── */
//         .ilu-modal-bg {
//           position: fixed; inset: 0; background: rgba(0,0,0,.95);
//           display: flex; align-items: center; justify-content: center;
//           z-index: 50; padding: 20px; animation: iluFadeIn .2s ease;
//         }
//         .ilu-modal {
//           background: #000; border: 1px solid #222;
//           max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto;
//           animation: iluScaleIn .2s ease; position: relative;
//         }

//         /* ── Mobile filter drawer ── */
//         .ilu-drawer-bg {
//           position: fixed; inset: 0; background: rgba(0,0,0,.9);
//           z-index: 50; display: flex; flex-direction: column; justify-content: flex-end;
//           animation: iluFadeIn .2s ease;
//         }
//         .ilu-drawer {
//           background: #000; border-top: 1px solid #222;
//           padding: 24px 20px; max-height: 85vh; overflow-y: auto;
//           animation: iluSlideUp .3s ease;
//         }

//         /* ── Scroll to top ── */
//         .ilu-scroll-top {
//           position: fixed; bottom: 24px; right: 24px; z-index: 40;
//           width: 44px; height: 44px;
//           background: #fff; color: #000; border: none; cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           transition: background .15s; animation: iluFadeIn .2s ease;
//         }
//         .ilu-scroll-top:hover { background: #e8e8e8; }

//         /* ── Skeleton ── */
//         .ilu-skeleton { background: #0d0d0d; border: 1px solid #1a1a1a; animation: iluPulse 1.5s ease infinite; }
//         @keyframes iluPulse { 0%,100%{opacity:.4} 50%{opacity:.8} }

//         /* ── Animations ── */
//         @keyframes iluFadeIn  { from{opacity:0} to{opacity:1} }
//         @keyframes iluScaleIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
//         @keyframes iluSlideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
//         @keyframes iluShimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }

//         .ilu-shimmer {
//           background: linear-gradient(90deg,#0d0d0d 0%,#1a1a1a 50%,#0d0d0d 100%);
//           background-size: 800px 100%;
//           animation: iluShimmer 1.5s infinite;
//         }

//         /* ── Divider ── */
//         .ilu-hr { border: none; border-top: 1px solid #1a1a1a; margin: 0; }

//         /* ── Grids ── */
//         .ilu-product-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: #1a1a1a; }
//         .ilu-product-list  { display: flex; flex-direction: column; gap: 1px; background: #1a1a1a; }
//         .ilu-skeleton-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: #1a1a1a; }

//         /* ── Responsive ── */
//         @media(max-width:1024px){
//           .ilu-product-grid  { grid-template-columns: repeat(2,1fr); }
//           .ilu-skeleton-grid { grid-template-columns: repeat(2,1fr); }
//           .ilu-filter-bottom { grid-template-columns: 1fr 1fr; }
//         }
//         @media(max-width:640px){
//           .ilu-product-grid  { grid-template-columns: 1fr; }
//           .ilu-skeleton-grid { grid-template-columns: 1fr; }
//           .ilu-filter-bottom { display: none; }
//           .ilu-desktop-sort  { display: none; }
//         }

//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px' }}>

//         {/* ── HEADER ── */}
//         <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #1a1a1a' }}>
//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
//             <div>
//               <p className="ilu-condensed" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: '#444', marginBottom: 6 }}>
//                 Sport-X Collection
//               </p>
//               <h1 className="ilu-condensed" style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.02em', color: '#fff', lineHeight: 1 }}>
//                 All Products
//               </h1>
//             </div>
//             {totalCount > 0 && (
//               <p className="ilu-condensed" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#444' }}>
//                 {startItem}–{endItem} of {totalCount} items
//               </p>
//             )}
//           </div>
//         </div>

//         {/* ── FILTER BAR ── */}
//         <div className="ilu-filter-bar" style={{ marginBottom: 24 }}>

//           {/* Top row */}
//           <div className="ilu-filter-top">
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>

//               {/* Category pills — scrollable */}
//               <div className="scrollbar-hide" style={{ display: 'flex', gap: 6, overflowX: 'auto', flex: 1, minWidth: 0, paddingBottom: 2 }}>
//                 {categories.map((cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
//                     className={`ilu-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>

//               {/* Right controls */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//                 {/* Sort */}
//                 <div className="ilu-desktop-sort" style={{ position: 'relative' }}>
//                   <select
//                     value={sortOption}
//                     onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
//                     className="ilu-select"
//                   >
//                     <option value="">Featured</option>
//                     <option value="price-low">Price ↑</option>
//                     <option value="price-high">Price ↓</option>
//                     <option value="popular">Popular</option>
//                     <option value="newest">Newest</option>
//                     <option value="trending">Trending</option>
//                   </select>
//                   <ChevronDown size={12} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#555', pointerEvents: 'none' }} />
//                 </div>

//                 {/* View toggle */}
//                 <div style={{ display: 'flex', gap: 1 }}>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`ilu-icon-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                     style={{ width: 36, height: 36 }}
//                     aria-label="Grid view"
//                   >
//                     <Grid3X3 size={14} />
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`ilu-icon-btn ${viewMode === 'list' ? 'active' : ''}`}
//                     style={{ width: 36, height: 36 }}
//                     aria-label="List view"
//                   >
//                     <List size={14} />
//                   </button>
//                 </div>

//                 {/* Mobile filter open */}
//                 <button
//                   onClick={() => setIsMobileFilterOpen(true)}
//                   className="ilu-btn-ghost"
//                   style={{ display: 'none', padding: '8px 14px' }}
//                   id="mobile-filter-btn"
//                 >
//                   <Filter size={13} />
//                   Filters
//                   {hasActiveFilters && <span style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%' }} />}
//                 </button>

//                 {/* Active indicator */}
//                 {hasActiveFilters && (
//                   <button onClick={clearFilters} className="ilu-icon-btn" style={{ width: 36, height: 36 }} title="Clear filters">
//                     <X size={13} />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Bottom: advanced filters — hidden on mobile via CSS */}
//           <div className="ilu-filter-bottom">
//             {/* Price */}
//             <div>
//               <span className="ilu-label">Price Range</span>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                 <input
//                   type="number" placeholder="Min" value={minPrice}
//                   onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
//                   className="ilu-input" style={{ flex: 1 }}
//                 />
//                 <span style={{ color: '#333', fontFamily: "'Barlow Condensed'", fontSize: 12 }}>—</span>
//                 <input
//                   type="number" placeholder="Max" value={maxPrice}
//                   onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
//                   className="ilu-input" style={{ flex: 1 }}
//                 />
//               </div>
//             </div>

//             {/* Rating */}
//             <div>
//               <span className="ilu-label">Min Rating</span>
//               <div style={{ display: 'flex', gap: 4 }}>
//                 {[0, 3, 4, 5].map((r) => (
//                   <button
//                     key={r}
//                     onClick={() => { setMinRating(r); setCurrentPage(1); }}
//                     className={`ilu-rate-pill ${minRating === r ? 'active' : ''}`}
//                   >
//                     {r === 0 ? "All" : `${r}+`}
//                     {r > 0 && <Star size={10} fill={minRating === r ? '#000' : 'none'} color={minRating === r ? '#000' : '#555'} />}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Clear */}
//             <div style={{ display: 'flex', alignItems: 'flex-end' }}>
//               <button
//                 onClick={clearFilters}
//                 disabled={!hasActiveFilters}
//                 className="ilu-btn-outline"
//                 style={{ width: '100%', justifyContent: 'center', opacity: hasActiveFilters ? 1 : .3 }}
//               >
//                 <X size={13} /> Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── MOBILE FILTER BUTTON (shown via inline style on small screens) ── */}
//         <style>{`
//           @media(max-width:640px){
//             #mobile-filter-btn { display: inline-flex !important; }
//           }
//         `}</style>

//         {/* ── MOBILE FILTER DRAWER ── */}
//         {isMobileFilterOpen && (
//           <div className="ilu-drawer-bg" onClick={() => setIsMobileFilterOpen(false)}>
//             <div className="ilu-drawer" onClick={(e) => e.stopPropagation()}>
              
//               <div style={{ width: 32, height: 2, background: '#333', margin: '0 auto 20px' }} />

//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
//                 <span className="ilu-condensed" style={{ fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.05em', color: '#fff' }}>
//                   Filters
//                 </span>
//                 <button onClick={() => setIsMobileFilterOpen(false)} className="ilu-icon-btn" style={{ width: 36, height: 36 }}>
//                   <X size={15} />
//                 </button>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
//                 {/* Category */}
//                 <div>
//                   <span className="ilu-label">Category</span>
//                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
//                     {categories.map((cat) => (
//                       <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
//                         className={`ilu-cat-pill ${selectedCategory === cat ? 'active' : ''}`}>
//                         {cat}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Sort */}
//                 <div>
//                   <span className="ilu-label">Sort By</span>
//                   <div style={{ position: 'relative' }}>
//                     <select value={sortOption} onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
//                       className="ilu-select" style={{ width: '100%' }}>
//                       <option value="">Featured</option>
//                       <option value="price-low">Price: Low → High</option>
//                       <option value="price-high">Price: High → Low</option>
//                       <option value="popular">Most Popular</option>
//                       <option value="newest">Newest First</option>
//                       <option value="trending">Trending</option>
//                     </select>
//                     <ChevronDown size={12} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#555', pointerEvents: 'none' }} />
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div>
//                   <span className="ilu-label">Price Range</span>
//                   <div style={{ display: 'flex', gap: 10 }}>
//                     <input type="number" placeholder="Min $0" value={minPrice}
//                       onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
//                       className="ilu-input" style={{ flex: 1 }} />
//                     <input type="number" placeholder="Max $10000" value={maxPrice}
//                       onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
//                       className="ilu-input" style={{ flex: 1 }} />
//                   </div>
//                 </div>

//                 {/* Rating */}
//                 <div>
//                   <span className="ilu-label">Min Rating</span>
//                   <div style={{ display: 'flex', gap: 6 }}>
//                     {[0, 3, 4, 5].map((r) => (
//                       <button key={r} onClick={() => { setMinRating(r); setCurrentPage(1); }}
//                         className={`ilu-rate-pill ${minRating === r ? 'active' : ''}`}>
//                         {r === 0 ? "All" : `${r}+`}
//                         {r > 0 && <Star size={10} fill={minRating === r ? '#000' : 'none'} color={minRating === r ? '#000' : '#555'} />}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div style={{ display: 'flex', gap: 10 }}>
//                   <button onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }}
//                     className="ilu-btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
//                     <X size={13} /> Clear
//                   </button>
//                   <button onClick={() => setIsMobileFilterOpen(false)}
//                     className="ilu-btn-white" style={{ flex: 1, justifyContent: 'center' }}>
//                     Apply
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── LOADING SKELETON ── */}
//         {isLoading && (
//           <div className="ilu-skeleton-grid">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="ilu-skeleton" style={{ padding: 0 }}>
//                 <div className="ilu-shimmer" style={{ height: 240 }} />
//                 <div style={{ padding: '14px 16px 18px' }}>
//                   <div className="ilu-shimmer" style={{ height: 14, width: '70%', marginBottom: 10 }} />
//                   <div className="ilu-shimmer" style={{ height: 20, width: '40%', marginBottom: 14 }} />
//                   <div className="ilu-shimmer" style={{ height: 36 }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── PRODUCT GRID ── */}
//         {!isLoading && displayedProducts.length > 0 && viewMode === "grid" && (
//           <div className="ilu-product-grid">
//             {displayedProducts.map((item, index) => {
//               const isInWishlist = (wishlist || []).some(p => p.productId === item.id);
//               const stockStatus = getStockStatus(item.stock || 0);
//               const isOutOfStock = (item.stock || 0) <= 0;
//               const wasAdded = addedToCart === item.id;
//               const isImageLoaded = imageLoadStates[item.id];

//               return (
//                 <div
//                   key={item.id}
//                   className="ilu-card"
//                   onClick={() => handleProductClick(item)}
//                   onMouseEnter={() => setHoveredCard(item.id)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   style={{ opacity: isOutOfStock ? .55 : 1 }}
//                 >
//                   {/* Image area */}
//                   <div style={{ position: 'relative', height: 240, background: '#080808', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     {!isImageLoaded && <div className="ilu-shimmer" style={{ position: 'absolute', inset: 0 }} />}
//                     <img
//                       src={item.image} alt={item.name}
//                       onLoad={() => handleImageLoad(item.id)}
//                       className="ilu-card-img"
//                       style={{ maxHeight: 190, maxWidth: '85%', objectFit: 'contain', opacity: isImageLoaded ? 1 : 0, filter: isOutOfStock ? 'grayscale(1)' : 'none' }}
//                     />

//                     {/* Hover actions */}
//                     <div className="ilu-card-actions">
// <button onClick={(e) => { 
//   e.stopPropagation(); 
//   if (!user) { toast.warning("Please login to save items", { action: { label: "Login", onClick: () => navigate("/login") } }); return; }
//   toggleWishlist(item); 
// }}                        className={`ilu-icon-btn ${isInWishlist ? 'active' : ''}`}>
//                         <Heart size={13} strokeWidth={1.5} fill={isInWishlist ? 'currentColor' : 'none'} />
//                       </button>
//                       <button onClick={(e) => handleQuickView(item, e)} className="ilu-icon-btn">
//                         <Eye size={13} strokeWidth={1.5} />
//                       </button>
//                     </div>

//                     {/* Top-left badges */}
//                     <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
//                       <span className={`ilu-stock-tag ${stockStatus.color}`}>
//                         <span style={{ width: 5, height: 5, background: stockStatus.badge, borderRadius: '50%', flexShrink: 0 }} />
//                         {stockStatus.text}
//                       </span>
//                       {item.trending && (
//                         <span className="ilu-trending-badge">
//                           <Flame size={9} fill="currentColor" /> Hot
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Info area */}
//                   <div style={{ padding: '14px 16px 18px', borderTop: '1px solid #111' }}>
//                     <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}>
//                       <h3 className="ilu-condensed" style={{ fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.04em', color: '#fff', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
//                         {item.name}
//                       </h3>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
//                         <Star size={10} fill="#fff" color="#fff" />
//                         <span className="ilu-condensed" style={{ fontSize: 10, fontWeight: 700, color: '#555' }}>{item.rating}</span>
//                       </div>
//                     </div>

//                     <p className="ilu-condensed" style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 14 }}>
//                       ${item.price}
//                     </p>

//                     {/* Quick view + cart */}
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//                       <button onClick={(e) => handleQuickView(item, e)} className="ilu-btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
//                         Quick View
//                       </button>
//                       <button
//                         onClick={(e) => handleAddToCart(item, e)}
//                         disabled={isOutOfStock}
//                         className={isOutOfStock ? "ilu-btn-ghost" : isItemInCart(item.id) || wasAdded ? "ilu-btn-white" : "ilu-btn-white"}
//                         style={{ width: '100%', justifyContent: 'center', opacity: isOutOfStock ? .35 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
//                       >
//                         <ShoppingCart size={13} />
//                         {isOutOfStock ? "Out of Stock" : isItemInCart(item.id) ? "Go to Cart" : wasAdded ? "✓ Added" : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* ── PRODUCT LIST ── */}
//         {!isLoading && displayedProducts.length > 0 && viewMode === "list" && (
//           <div className="ilu-product-list">
//             {displayedProducts.map((item) => {
//               const isInWishlist = (wishlist || []).some(p => p.productId === item.id);
//               const stockStatus = getStockStatus(item.stock || 0);
//               const isOutOfStock = (item.stock || 0) <= 0;
//               const wasAdded = addedToCart === item.id;
//               const isImageLoaded = imageLoadStates[item.id];

//               return (
//                 <div
//                   key={item.id}
//                   className="ilu-list-card"
//                   onClick={() => handleProductClick(item)}
//                   onMouseEnter={() => setHoveredCard(item.id)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   style={{ opacity: isOutOfStock ? .55 : 1 }}
//                 >
//                   {/* Image */}
//                   <div style={{ width: 160, flexShrink: 0, background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: 16, borderRight: '1px solid #111' }}>
//                     {!isImageLoaded && <div className="ilu-shimmer" style={{ position: 'absolute', inset: 0 }} />}
//                     <img
//                       src={item.image} alt={item.name}
//                       onLoad={() => handleImageLoad(item.id)}
//                       style={{ maxHeight: 120, maxWidth: '100%', objectFit: 'contain', opacity: isImageLoaded ? 1 : 0, filter: isOutOfStock ? 'grayscale(1)' : 'none', transition: 'transform .4s', transform: hoveredCard === item.id ? 'scale(1.05)' : 'scale(1)' }}
//                     />
//                   </div>

//                   {/* Info */}
//                   <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
//                     <div>
//                       <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
//                         <h3 className="ilu-condensed" style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.04em', color: '#fff', lineHeight: 1.1 }}>
//                           {item.name}
//                         </h3>
//                         <button onClick={(e) => { 
//   e.stopPropagation(); 
//   if (!user) { toast.warning("Please login to save items", { action: { label: "Login", onClick: () => navigate("/login") } }); return; }
//   toggleWishlist(item); 
// }} className={`ilu-icon-btn ${isInWishlist ? 'active' : ''}`} style={{ flexShrink: 0 }}>
//                           <Heart size={14} strokeWidth={1.5} fill={isInWishlist ? 'currentColor' : 'none'} />
//                         </button>
//                       </div>

//                       <p className="ilu-condensed" style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 10 }}>
//                         ${item.price}
//                       </p>

//                       <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                           {[...Array(5)].map((_, i) => (
//                             <Star key={i} size={12} fill={i < Math.floor(item.rating) ? '#fff' : 'none'} color={i < Math.floor(item.rating) ? '#fff' : '#333'} />
//                           ))}
//                           <span className="ilu-condensed" style={{ fontSize: 11, fontWeight: 700, color: '#555', marginLeft: 4 }}>{item.rating}</span>
//                         </div>
//                         <span className="ilu-condensed" style={{ fontSize: 10, color: '#333', display: 'flex', alignItems: 'center', gap: 4 }}>
//                           <Eye size={10} /> {item.views}
//                         </span>
//                         <span className={`ilu-stock-tag ${stockStatus.color}`}>
//                           <span style={{ width: 5, height: 5, background: stockStatus.badge, borderRadius: '50%' }} />
//                           {stockStatus.text}
//                         </span>
//                         {item.trending && <span className="ilu-trending-badge"><Flame size={9} fill="currentColor"/> Hot</span>}
//                       </div>
//                     </div>

//                     <div style={{ display: 'flex', gap: 8 }}>
//                       <button onClick={(e) => handleQuickView(item, e)} className="ilu-btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
//                         Quick View
//                       </button>
//                       <button
//                         onClick={(e) => handleAddToCart(item, e)}
//                         disabled={isOutOfStock}
//                         className={isOutOfStock ? "ilu-btn-ghost" : "ilu-btn-white"}
//                         style={{ flex: 2, justifyContent: 'center', opacity: isOutOfStock ? .35 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
//                       >
//                         <ShoppingCart size={13} />
//                         {isOutOfStock ? "Out of Stock" : isItemInCart(item.id) ? "Go to Cart" : wasAdded ? "✓ Added" : "Add to Cart"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* ── PAGINATION ── */}
//         {!isLoading && totalCount > 0 && (
//           <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
//             <p className="ilu-condensed" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#444' }}>
//               {startItem}–{endItem} of {totalCount}
//             </p>
//             <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="ilu-page-btn" aria-label="Previous">
//                 <ChevronLeft size={16} />
//               </button>
//               {getPageNumbers().map((page, index) =>
//                 page === '...' ? (
//                   <span key={`e-${index}`} className="ilu-condensed" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 12 }}>…</span>
//                 ) : (
//                   <button key={page} onClick={() => handlePageChange(page)} className={`ilu-page-btn ${currentPage === page ? 'active' : ''}`}>
//                     {page}
//                   </button>
//                 )
//               )}
//               <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="ilu-page-btn" aria-label="Next">
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ── EMPTY STATE ── */}
//         {!isLoading && displayedProducts.length === 0 && (
//           <div style={{ textAlign: 'center', padding: '80px 20px', border: '1px solid #1a1a1a', background: '#000' }}>
//             <Package size={40} style={{ color: '#222', marginBottom: 20 }} />
//             <p className="ilu-condensed" style={{ fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#333', marginBottom: 20 }}>
//               No Products Found
//             </p>
//             <button onClick={clearFilters} className="ilu-btn-white">
//               <X size={13} /> Clear Filters
//             </button>
//           </div>
//         )}

//         {/* ── QUICK VIEW MODAL ── */}
//         {quickViewProduct && (
//           <div className="ilu-modal-bg" onClick={() => setQuickViewProduct(null)}>
//             <div className="ilu-modal" onClick={(e) => e.stopPropagation()}>
//               <button onClick={() => setQuickViewProduct(null)}
//                 className="ilu-icon-btn"
//                 style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
//                 <X size={16} />
//               </button>

//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
//                 {/* Image */}
//                 <div style={{ background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, minHeight: 360, borderRight: '1px solid #1a1a1a', position: 'relative' }}>
//                   <img src={quickViewProduct.image} alt={quickViewProduct.name}
//                     style={{ maxHeight: 280, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.8))' }}
//                   />
//                   {quickViewProduct.trending && (
//                     <span className="ilu-trending-badge" style={{ position: 'absolute', top: 16, left: 16 }}>
//                       <Flame size={10} fill="currentColor" /> Trending
//                     </span>
//                   )}
//                 </div>

//                 {/* Details */}
//                 <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
//                   <p className="ilu-condensed" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: '#444', marginBottom: 10 }}>
//                     {quickViewProduct.category}
//                   </p>
//                   <h3 className="ilu-condensed" style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.02em', color: '#fff', lineHeight: 1, marginBottom: 12 }}>
//                     {quickViewProduct.name}
//                   </h3>
//                   <p className="ilu-condensed" style={{ fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 20 }}>
//                     ${quickViewProduct.price}
//                   </p>

//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
//                     <div style={{ display: 'flex', gap: 2 }}>
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} size={14} fill={i < Math.floor(quickViewProduct.rating) ? '#fff' : 'none'} color={i < Math.floor(quickViewProduct.rating) ? '#fff' : '#333'} />
//                       ))}
//                     </div>
//                     <span className="ilu-condensed" style={{ fontSize: 11, fontWeight: 700, color: '#555' }}>{quickViewProduct.rating}</span>
//                     <span className="ilu-condensed" style={{ fontSize: 10, color: '#333', display: 'flex', alignItems: 'center', gap: 4 }}>
//                       <Eye size={10} /> {quickViewProduct.views}
//                     </span>
//                   </div>

//                   <hr className="ilu-hr" style={{ marginBottom: 20 }} />

//                   <div style={{ marginBottom: 24 }}>
//                     <span className={`ilu-stock-tag ${getStockStatus(quickViewProduct.stock || 0).color}`}>
//                       <span style={{ width: 6, height: 6, background: getStockStatus(quickViewProduct.stock || 0).badge, borderRadius: '50%' }} />
//                       {getStockStatus(quickViewProduct.stock || 0).text}
//                     </span>
//                   </div>

//                   <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
// <button onClick={(e) => { 
//   e.stopPropagation(); 
//   if (!user) { toast.warning("Please login to save items", { action: { label: "Login", onClick: () => navigate("/login") } }); return; }
//   toggleWishlist(quickViewProduct); 
// }}                      className={`ilu-icon-btn ${wishlist.some(p => p.productId === quickViewProduct.id) ? 'active' : ''}`}
//                       style={{ width: 44, height: 44 }}>
//                       <Heart size={16} strokeWidth={1.5} fill={wishlist.some(p => p.productId === quickViewProduct.id) ? 'currentColor' : 'none'} />
//                     </button>
//                     <button onClick={() => handleProductClick(quickViewProduct)} className="ilu-btn-white" style={{ flex: 1, justifyContent: 'center', padding: '12px 20px' }}>
//                       View Full Details
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Mobile modal override */}
//               <style>{`
//                 @media(max-width:640px){
//                   .ilu-modal > div { grid-template-columns: 1fr !important; }
//                   .ilu-modal > div > div:first-child { min-height: 220px !important; border-right: none !important; border-bottom: 1px solid #1a1a1a; }
//                 }
//               `}</style>
//             </div>
//           </div>
//         )}

//         {/* ── SCROLL TO TOP ── */}
//         {showScrollTop && (
//           <button onClick={scrollToTop} className="ilu-scroll-top" aria-label="Scroll to top">
//             <ArrowUp size={18} />
//           </button>
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
import { Heart, Star, Package, Grid3X3, List, Filter, X, ShoppingCart, ChevronDown, Eye, ChevronLeft, ChevronRight, Flame, ArrowUp } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";

export default function MoreProducts({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const { wishlist = [], toggleWishlist } = useWishlist();

  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("");

  const [viewMode, setViewMode] = useState("grid");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 9;

  const [hoveredCard, setHoveredCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState({});

  const [stats, setStats] = useState({ totalProducts: 0, avgPrice: 0, avgRating: 0 });
  const [categories, setCategories] = useState(["All"]);

  const generateRandomRating = () => parseFloat((Math.random() * 2 + 3).toFixed(1));

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        setStats({ totalProducts: 0, avgPrice: 0, avgRating: 4.5 });
      }
    };
    fetchStats();
  }, []);

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
        if (selectedCategory && selectedCategory !== "All") filtered = filtered.filter(p => p.category === selectedCategory);
        if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
        if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
        if (searchTerm && searchTerm.trim()) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (minRating > 0) filtered = filtered.filter(p => p.rating >= minRating);
        if (sortOption === "price-low") filtered.sort((a,b) => a.price - b.price);
        if (sortOption === "price-high") filtered.sort((a,b) => b.price - a.price);
        if (sortOption === "newest") filtered.sort((a,b) => b.id - a.id);
        if (sortOption === "trending") filtered = filtered.sort((a,b) => Math.random() - 0.5);
        if (sortOption === "popular") filtered = filtered.sort((a,b) => b.id - a.id);

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
  }, [currentPage, selectedCategory, minPrice, maxPrice, minRating, sortOption, searchTerm]);

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
      for (let i = 1; i <= totalPages; i++) pages.push(i);
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
  const isItemInCart = (productId) => cart.some(c => c.productId === productId);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    if (!user) {
      toast.warning("Please login to add items to your cart", { action: { label: "Login", onClick: () => navigate("/login") } });
      return;
    }
    if (item.stock <= 0) { toast.error("Sorry, this product is currently out of stock"); return; }
    if (isItemInCart(item.id)) {
      toast.info("This item is already in your cart", { action: { label: "View Cart", onClick: () => navigate("/cart") } });
      return;
    }
    addToCart(item, 1);
    toast.success("Added to cart 🛒");
    setAddedToCart(item.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleQuickView = (item, e) => { e.stopPropagation(); setQuickViewProduct(item); };

  const clearFilters = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
    setSortOption("");
    setCurrentPage(1);
  };

  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: "Out of Stock", color: "sx-stock-out", badge: "#ef4444" };
    if (stock <= 5) return { text: `Only ${stock} left`, color: "sx-stock-low", badge: "#f59e0b" };
    if (stock <= 10) return { text: `${stock} in stock`, color: "sx-stock-mid", badge: "#eab308" };
    return { text: `${stock} in stock`, color: "sx-stock-ok", badge: "#22c55e" };
  };

  const handleImageLoad = (id) => setImageLoadStates(prev => ({ ...prev, [id]: true }));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const hasActiveFilters = selectedCategory !== "All" || minPrice !== "" || maxPrice !== "" || minRating > 0 || sortOption !== "";

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: "'Barlow', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ─── Typography helpers ─── */
        .sx-c { font-family: 'Barlow Condensed', sans-serif; }
        .sx-b { font-family: 'Barlow', sans-serif; }

        /* ─── Scrollbar hide ─── */
        .sx-no-scroll::-webkit-scrollbar { display:none; }
        .sx-no-scroll { -ms-overflow-style:none; scrollbar-width:none; }

        /* ─── PAGE HEADER ─── */
        .sx-page-header {
          border-bottom: 1px solid #1a1a1a;
          padding: 32px 0 24px;
        }

        /* ─── TOOLBAR ─── */
        .sx-toolbar {
          display: flex; align-items: center;
          gap: 0; border: 1px solid #1a1a1a;
          background: #000; overflow: hidden;
          margin-bottom: 1px;
        }
        .sx-toolbar-section {
          display: flex; align-items: center;
          padding: 0 16px; height: 48px;
          border-right: 1px solid #1a1a1a;
          gap: 8px; flex-shrink: 0;
        }
        .sx-toolbar-section:last-child { border-right: none; }
        .sx-toolbar-label {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing:.25em;
          text-transform: uppercase; color: #333; white-space: nowrap;
        }

        /* ─── CAT PILLS ─── */
        .sx-cat-pill {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing:.12em;
          text-transform: uppercase; padding: 5px 14px;
          background: transparent; border: 1px solid #222;
          color: #444; cursor: pointer; white-space: nowrap;
          flex-shrink: 0; transition: all .15s;
        }
        .sx-cat-pill:hover { border-color: #555; color: #ccc; }
        .sx-cat-pill.active { background: #fff; color: #000; border-color: #fff; }

        /* ─── ICON BUTTONS ─── */
        .sx-icon-btn {
          width: 32px; height: 32px; background: transparent;
          border: 1px solid #222; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #555;
          transition: all .15s; flex-shrink: 0;
        }
        .sx-icon-btn:hover, .sx-icon-btn.on { background:#fff; color:#000; border-color:#fff; }

        /* ─── SELECT ─── */
        .sx-select {
          padding: 6px 28px 6px 10px;
          background: transparent; border: none;
          color: #888; font-family:'Barlow Condensed',sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing:.12em;
          text-transform: uppercase; outline: none; cursor: pointer;
          appearance: none; min-width: 120px;
        }
        .sx-select option { background: #0d0d0d; color: #fff; }

        /* ─── INPUTS ─── */
        .sx-input {
          width: 100%; padding: 9px 12px;
          background: #0a0a0a; border: 1px solid #1e1e1e;
          color: #fff; font-family:'Barlow',sans-serif;
          font-size: 13px; outline: none;
          transition: border-color .15s;
        }
        .sx-input:focus { border-color: #444; }
        .sx-input::placeholder { color: #2a2a2a; }

        /* ─── FILTER PANEL ─── */
        .sx-filter-panel {
          border: 1px solid #1a1a1a; border-top: none;
          background: #050505; padding: 20px 24px;
          display: grid; grid-template-columns: 1fr 1fr auto;
          gap: 20px; align-items: end;
          animation: sxSlideDown .2s ease;
        }
        @keyframes sxSlideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        .sx-filter-label {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing:.28em;
          text-transform: uppercase; color: #333; display: block; margin-bottom: 8px;
        }

        /* ─── RATING PILLS ─── */
        .sx-rate-pill {
          flex: 1; padding: 8px 4px; display: flex; align-items: center;
          justify-content: center; gap: 4px;
          background: #0a0a0a; border: 1px solid #1e1e1e;
          font-family:'Barlow Condensed',sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing:.1em;
          text-transform: uppercase; color: #444; cursor: pointer; transition: all .15s;
        }
        .sx-rate-pill:hover { border-color: #444; color: #ccc; }
        .sx-rate-pill.on { background: #fff; color: #000; border-color: #fff; }

        /* ─── PRODUCT CARD ─── */
        .sx-card {
          background: #000; border: 1px solid #141414;
          cursor: pointer; position: relative;
          transition: border-color .2s;
          display: flex; flex-direction: column;
        }
        .sx-card:hover { border-color: #2a2a2a; }

        .sx-card-img-wrap {
          position: relative; overflow: hidden;
          background: #080808; height: 260px;
          display: flex; align-items: center; justify-content: center;
        }
        .sx-card-img {
          max-height: 200px; max-width: 80%;
          object-fit: contain;
          transition: transform .55s cubic-bezier(.25,.46,.45,.94);
        }
        .sx-card:hover .sx-card-img { transform: scale(1.07); }

        .sx-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 50%);
          opacity: 0; transition: opacity .3s;
        }
        .sx-card:hover .sx-card-overlay { opacity: 1; }

        .sx-card-actions {
          position: absolute; top: 10px; right: 10px;
          display: flex; flex-direction: column; gap: 5px;
          opacity: 0; transform: translateX(8px);
          transition: opacity .2s, transform .2s;
        }
        .sx-card:hover .sx-card-actions { opacity: 1; transform: translateX(0); }

        .sx-card-bottom-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 12px 14px; opacity: 0;
          transform: translateY(6px);
          transition: opacity .25s, transform .25s;
          display: flex; gap: 6px;
        }
        .sx-card:hover .sx-card-bottom-bar { opacity: 1; transform: translateY(0); }

        .sx-card-info {
          padding: 14px 16px 16px;
          border-top: 1px solid #111;
          flex: 1; display: flex; flex-direction: column;
        }

        /* ─── STOCK TAGS ─── */
        .sx-badge {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 9px; font-weight: 800; letter-spacing:.16em;
          text-transform: uppercase; padding: 3px 8px;
          display: inline-flex; align-items: center; gap: 5px;
        }
        .sx-stock-out { background:rgba(239,68,68,.07); color:#ef4444; border:1px solid rgba(239,68,68,.18); }
        .sx-stock-low { background:rgba(245,158,11,.07); color:#f59e0b; border:1px solid rgba(245,158,11,.18); }
        .sx-stock-mid { background:rgba(234,179,8,.07); color:#eab308; border:1px solid rgba(234,179,8,.18); }
        .sx-stock-ok  { background:rgba(34,197,94,.07); color:#22c55e; border:1px solid rgba(34,197,94,.18); }
        .sx-hot-badge { background:#fff; color:#000; }

        /* ─── BUTTONS ─── */
        .sx-btn-white {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing:.18em;
          text-transform: uppercase; background: #fff; color: #000;
          border: none; cursor: pointer; padding: 10px 18px;
          transition: background .15s;
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap;
        }
        .sx-btn-white:hover { background: #e5e5e5; }
        .sx-btn-white:disabled { opacity: .3; cursor: not-allowed; }

        .sx-btn-dark {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing:.18em;
          text-transform: uppercase; background: #111; color: #666;
          border: 1px solid #222; cursor: pointer; padding: 10px 18px;
          transition: all .15s;
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap;
        }
        .sx-btn-dark:hover { border-color: #555; color: #ccc; background: #1a1a1a; }

        .sx-btn-outline {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing:.18em;
          text-transform: uppercase; background: transparent; color: #fff;
          border: 1px solid #333; cursor: pointer; padding: 10px 18px;
          transition: all .15s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .sx-btn-outline:hover { border-color: #666; background: #111; }
        .sx-btn-outline:disabled { opacity:.25; cursor:not-allowed; }

        /* ─── LIST ROW ─── */
        .sx-list-row {
          background: #000; border: 1px solid #141414;
          display: flex; cursor: pointer; transition: border-color .2s;
          position: relative;
        }
        .sx-list-row:hover { border-color: #2a2a2a; }

        /* ─── GRIDS ─── */
        .sx-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: #141414; }
        .sx-list { display: flex; flex-direction: column; gap: 1px; background: #141414; }
        .sx-skel-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: #141414; }

        /* ─── SKELETON ─── */
        .sx-skel { background: #080808; }
        @keyframes sxShimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
        .sx-shimmer {
          background: linear-gradient(90deg,#0a0a0a 0%,#151515 50%,#0a0a0a 100%);
          background-size: 800px 100%;
          animation: sxShimmer 1.4s infinite;
        }

        /* ─── PAGINATION ─── */
        .sx-pg-btn {
          font-family:'Barlow Condensed',sans-serif;
          font-size: 12px; font-weight: 800; letter-spacing:.08em;
          min-width: 38px; height: 38px; padding: 0 10px;
          background: #000; border: 1px solid #1e1e1e; color: #444;
          cursor: pointer; transition: all .15s;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .sx-pg-btn:hover:not(:disabled) { border-color:#555; color:#fff; }
        .sx-pg-btn.on { background:#fff; color:#000; border-color:#fff; }
        .sx-pg-btn:disabled { opacity:.2; cursor:not-allowed; }

        /* ─── QUICK VIEW MODAL ─── */
        .sx-modal-bg {
          position: fixed; inset: 0; background: rgba(0,0,0,.96);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 20px;
          animation: sxFadeIn .2s ease;
        }
        .sx-modal {
          background: #000; border: 1px solid #222;
          max-width: 920px; width: 100%; max-height: 92vh; overflow-y: auto;
          position: relative; animation: sxScaleIn .2s ease;
        }
        @keyframes sxFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes sxScaleIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }

        /* ─── MOBILE DRAWER ─── */
        .sx-drawer-bg {
          position: fixed; inset: 0; background: rgba(0,0,0,.92);
          z-index: 100; display: flex; flex-direction: column; justify-content: flex-end;
          animation: sxFadeIn .2s ease;
        }
        .sx-drawer {
          background: #000; border-top: 1px solid #222;
          padding: 28px 20px; max-height: 88vh; overflow-y: auto;
          animation: sxSlideUp .3s ease;
        }
        @keyframes sxSlideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }

        /* ─── SCROLL TO TOP ─── */
        .sx-scroll-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 40;
          width: 46px; height: 46px; background: #fff; color: #000;
          border: none; cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: background .15s;
          animation: sxFadeIn .2s ease;
        }
        .sx-scroll-top:hover { background: #e5e5e5; }

        /* ─── RESPONSIVE ─── */
        @media(max-width:1024px){
          .sx-grid     { grid-template-columns: repeat(2,1fr); }
          .sx-skel-grid{ grid-template-columns: repeat(2,1fr); }
          .sx-filter-panel { grid-template-columns: 1fr 1fr; }
          .sx-filter-panel > div:last-child { grid-column: 1/-1; }
        }
        @media(max-width:640px){
          .sx-grid         { grid-template-columns: 1fr; }
          .sx-skel-grid    { grid-template-columns: 1fr; }
          .sx-filter-panel { display: none; }
          .sx-desktop-only { display: none !important; }
          .sx-mobile-only  { display: flex !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 24px 60px' }}>

        {/* ═══════════════════════════════════════
            PAGE HEADER
        ═══════════════════════════════════════ */}
        <div style={{ padding: '36px 0 28px', borderBottom: '1px solid #1a1a1a', marginBottom: 0 }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <p className="sx-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.32em', textTransform:'uppercase', color:'#333', marginBottom:8 }}>
                Sport-X · Collection
              </p>
              <h1 className="sx-c" style={{ fontSize:'clamp(36px,6vw,72px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-.01em', color:'#fff', lineHeight:.88, margin:0 }}>
                All Products
              </h1>
            </div>
            {totalCount > 0 && !isLoading && (
              <div style={{ textAlign:'right' }}>
                <p className="sx-c" style={{ fontSize:10, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#333', marginBottom:4 }}>
                  Showing
                </p>
                <p className="sx-c" style={{ fontSize:22, fontWeight:900, color:'#fff', lineHeight:1 }}>
                  {startItem}–{endItem} <span style={{ color:'#333' }}>/ {totalCount}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            CATEGORY STRIP
        ═══════════════════════════════════════ */}
        <div style={{ borderBottom:'1px solid #1a1a1a', borderLeft:'1px solid #1a1a1a', borderRight:'1px solid #1a1a1a' }}>
          <div className="sx-no-scroll" style={{ display:'flex', overflowX:'auto', gap:0 }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`sx-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                style={{ borderRadius:0, borderTop:'none', borderBottom:'none', borderLeft: i===0?'none':'1px solid #1a1a1a', borderRight:'none', padding:'14px 22px', height:50 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            TOOLBAR ROW
        ═══════════════════════════════════════ */}
        <div style={{ display:'flex', alignItems:'stretch', border:'1px solid #1a1a1a', borderTop:'none', marginBottom:1 }}>

          {/* Filter toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            style={{ display:'none', alignItems:'center', gap:8, padding:'0 18px', height:48, background:'transparent', border:'none', borderRight:'1px solid #1a1a1a', cursor:'pointer', color:'#555', fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', transition:'color .15s' }}
            className="sx-mobile-only"
            id="sx-mobile-filter"
          >
            <Filter size={13}/>
            Filters
            {hasActiveFilters && <span style={{ width:6, height:6, background:'#fff', borderRadius:'50%' }}/>}
          </button>
          <style>{`@media(max-width:640px){ #sx-mobile-filter{ display:flex !important; } }`}</style>

          {/* Sort — desktop */}
          <div className="sx-desktop-only" style={{ display:'flex', alignItems:'center', gap:8, padding:'0 16px', borderRight:'1px solid #1a1a1a', flexShrink:0 }}>
            <span className="sx-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.25em', textTransform:'uppercase', color:'#333' }}>Sort</span>
            <div style={{ position:'relative' }}>
              <select value={sortOption} onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }} className="sx-select">
                <option value="">Featured</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="trending">Trending</option>
              </select>
              <ChevronDown size={11} style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)', color:'#444', pointerEvents:'none' }}/>
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="sx-desktop-only sx-no-scroll" style={{ flex:1, display:'flex', alignItems:'center', gap:6, padding:'0 16px', overflowX:'auto' }}>
              {selectedCategory !== "All" && (
                <span style={{ display:'flex', alignItems:'center', gap:6, padding:'3px 10px', border:'1px solid #2a2a2a', fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} style={{ background:'none', border:'none', cursor:'pointer', color:'#555', padding:0, display:'flex' }}><X size={10}/></button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span style={{ display:'flex', alignItems:'center', gap:6, padding:'3px 10px', border:'1px solid #2a2a2a', fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>
                  ${minPrice||'0'} – ${maxPrice||'∞'}
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} style={{ background:'none', border:'none', cursor:'pointer', color:'#555', padding:0, display:'flex' }}><X size={10}/></button>
                </span>
              )}
              {minRating > 0 && (
                <span style={{ display:'flex', alignItems:'center', gap:6, padding:'3px 10px', border:'1px solid #2a2a2a', fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>
                  {minRating}+ ★
                  <button onClick={() => setMinRating(0)} style={{ background:'none', border:'none', cursor:'pointer', color:'#555', padding:0, display:'flex' }}><X size={10}/></button>
                </span>
              )}
            </div>
          )}

          <div style={{ flex:1 }} className="sx-desktop-only"/>

          {/* View toggle + clear */}
          <div style={{ display:'flex', alignItems:'center', gap:0, borderLeft:'1px solid #1a1a1a', flexShrink:0 }}>
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ height:48, padding:'0 14px', background:'transparent', border:'none', borderRight:'1px solid #1a1a1a', cursor:'pointer', color:'#444', display:'flex', alignItems:'center', gap:6, fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', transition:'color .15s' }}
                onMouseOver={e=>e.currentTarget.style.color='#fff'} onMouseOut={e=>e.currentTarget.style.color='#444'}>
                <X size={12}/> Clear
              </button>
            )}
            <button onClick={() => setViewMode("grid")} className={`sx-icon-btn${viewMode==='grid'?' on':''}`} style={{ width:48, height:48, borderRadius:0, border:'none', borderLeft: hasActiveFilters?'none':'none' }} aria-label="Grid view">
              <Grid3X3 size={14}/>
            </button>
            <button onClick={() => setViewMode("list")} className={`sx-icon-btn${viewMode==='list'?' on':''}`} style={{ width:48, height:48, borderRadius:0, border:'none', borderLeft:'1px solid #1a1a1a' }} aria-label="List view">
              <List size={14}/>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            ADVANCED FILTER PANEL (desktop)
        ═══════════════════════════════════════ */}
        <div className="sx-filter-panel sx-desktop-only" style={{ marginBottom:1 }}>
          {/* Price */}
          <div>
            <span className="sx-filter-label">Price Range ($)</span>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <input type="number" placeholder="Min" value={minPrice}
                onChange={(e)=>{ setMinPrice(e.target.value); setCurrentPage(1); }}
                className="sx-input" style={{ flex:1 }}/>
              <span style={{ color:'#333', fontFamily:"'Barlow Condensed',sans-serif", fontSize:13 }}>—</span>
              <input type="number" placeholder="Max" value={maxPrice}
                onChange={(e)=>{ setMaxPrice(e.target.value); setCurrentPage(1); }}
                className="sx-input" style={{ flex:1 }}/>
            </div>
          </div>

          {/* Rating */}
          <div>
            <span className="sx-filter-label">Min Rating</span>
            <div style={{ display:'flex', gap:4 }}>
              {[0,3,4,5].map((r) => (
                <button key={r} onClick={() => { setMinRating(r); setCurrentPage(1); }}
                  className={`sx-rate-pill${minRating===r?' on':''}`}>
                  {r===0 ? "All" : `${r}+`}
                  {r>0 && <Star size={10} fill={minRating===r?'#000':'none'} color={minRating===r?'#000':'#444'}/>}
                </button>
              ))}
            </div>
          </div>

          {/* Clear */}
          <div style={{ display:'flex', alignItems:'flex-end' }}>
            <button onClick={clearFilters} disabled={!hasActiveFilters} className="sx-btn-outline" style={{ width:'100%', justifyContent:'center' }}>
              <X size={12}/> Clear All
            </button>
          </div>
        </div>

        {/* thin line above grid */}
        <div style={{ height:1, background:'#141414', marginBottom:0 }}/>

        {/* ═══════════════════════════════════════
            SKELETON
        ═══════════════════════════════════════ */}
        {isLoading && (
          <div className="sx-skel-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="sx-skel">
                <div className="sx-shimmer" style={{ height:260 }}/>
                <div style={{ padding:'14px 16px 18px' }}>
                  <div className="sx-shimmer" style={{ height:13, width:'65%', marginBottom:10 }}/>
                  <div className="sx-shimmer" style={{ height:22, width:'35%', marginBottom:16 }}/>
                  <div className="sx-shimmer" style={{ height:38 }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════
            GRID VIEW
        ═══════════════════════════════════════ */}
        {!isLoading && displayedProducts.length > 0 && viewMode === "grid" && (
          <div className="sx-grid">
            {displayedProducts.map((item) => {
              const isInWishlist = (wishlist||[]).some(p => p.productId === item.id);
              const stockStatus = getStockStatus(item.stock||0);
              const isOut = (item.stock||0) <= 0;
              const wasAdded = addedToCart === item.id;
              const imgLoaded = imageLoadStates[item.id];

              return (
                <div key={item.id} className="sx-card" onClick={() => handleProductClick(item)}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ opacity: isOut ? .5 : 1 }}>

                  {/* Image */}
                  <div className="sx-card-img-wrap">
                    {!imgLoaded && <div className="sx-shimmer" style={{ position:'absolute', inset:0 }}/>}
                    <img src={item.image} alt={item.name} className="sx-card-img"
                      onLoad={() => handleImageLoad(item.id)}
                      style={{ opacity: imgLoaded?1:0, filter: isOut?'grayscale(1)':'none' }}/>
                    <div className="sx-card-overlay"/>

                    {/* Hover actions */}
                    <div className="sx-card-actions">
                      <button onClick={(e)=>{ e.stopPropagation(); if(!user){toast.warning("Please login to save items",{action:{label:"Login",onClick:()=>navigate("/login")}});return;} toggleWishlist(item); }}
                        className={`sx-icon-btn${isInWishlist?' on':''}`}>
                        <Heart size={13} strokeWidth={1.5} fill={isInWishlist?'currentColor':'none'}/>
                      </button>
                      <button onClick={(e)=>handleQuickView(item,e)} className="sx-icon-btn">
                        <Eye size={13} strokeWidth={1.5}/>
                      </button>
                    </div>

                    {/* Hover bottom bar */}
                    <div className="sx-card-bottom-bar">
                      <button onClick={(e)=>handleAddToCart(item,e)} disabled={isOut}
                        className="sx-btn-white" style={{ flex:1, justifyContent:'center', fontSize:10, padding:'9px 12px' }}>
                        <ShoppingCart size={12}/>
                        {isOut?"Out of Stock": isItemInCart(item.id)?"In Cart": wasAdded?"✓ Added":"Add to Cart"}
                      </button>
                    </div>

                    {/* Badges */}
                    <div style={{ position:'absolute', top:10, left:10, display:'flex', flexDirection:'column', gap:5 }}>
                      <span className={`sx-badge ${stockStatus.color}`}>
                        <span style={{ width:5, height:5, background:stockStatus.badge, borderRadius:'50%' }}/>
                        {stockStatus.text}
                      </span>
                      {item.trending && (
                        <span className="sx-badge sx-hot-badge">
                          <Flame size={8} fill="currentColor"/> Hot
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="sx-card-info">
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:4 }}>
                      <h3 className="sx-c" style={{ fontSize:14, fontWeight:800, textTransform:'uppercase', letterSpacing:'.04em', color:'#fff', lineHeight:1.1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>
                        {item.name}
                      </h3>
                      <div style={{ display:'flex', alignItems:'center', gap:3, flexShrink:0 }}>
                        <Star size={9} fill="#fff" color="#fff"/>
                        <span className="sx-c" style={{ fontSize:10, fontWeight:700, color:'#444' }}>{item.rating}</span>
                      </div>
                    </div>
                    <p className="sx-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#2a2a2a', marginBottom:10 }}>
                      {item.category}
                    </p>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
                      <p className="sx-c" style={{ fontSize:24, fontWeight:900, color:'#fff', lineHeight:1 }}>
                        ${item.price}
                      </p>
                      <button onClick={(e)=>handleQuickView(item,e)}
                        style={{ background:'none', border:'none', cursor:'pointer', fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#333', transition:'color .15s' }}
                        onMouseOver={e=>e.currentTarget.style.color='#888'}
                        onMouseOut={e=>e.currentTarget.style.color='#333'}>
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════════════════════════════
            LIST VIEW
        ═══════════════════════════════════════ */}
        {!isLoading && displayedProducts.length > 0 && viewMode === "list" && (
          <div className="sx-list">
            {displayedProducts.map((item) => {
              const isInWishlist = (wishlist||[]).some(p => p.productId === item.id);
              const stockStatus = getStockStatus(item.stock||0);
              const isOut = (item.stock||0) <= 0;
              const wasAdded = addedToCart === item.id;
              const imgLoaded = imageLoadStates[item.id];

              return (
                <div key={item.id} className="sx-list-row" onClick={() => handleProductClick(item)}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ opacity: isOut?.5:1 }}>

                  {/* Image column */}
                  <div style={{ width:180, flexShrink:0, background:'#080808', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', padding:20, borderRight:'1px solid #111' }}>
                    {!imgLoaded && <div className="sx-shimmer" style={{ position:'absolute', inset:0 }}/>}
                    <img src={item.image} alt={item.name} onLoad={() => handleImageLoad(item.id)}
                      style={{ maxHeight:130, maxWidth:'100%', objectFit:'contain', opacity:imgLoaded?1:0, filter:isOut?'grayscale(1)':'none', transition:'transform .4s', transform:hoveredCard===item.id?'scale(1.06)':'scale(1)' }}/>
                  </div>

                  {/* Content */}
                  <div style={{ flex:1, padding:'20px 24px', display:'flex', flexDirection:'column', justifyContent:'space-between', minWidth:0 }}>
                    <div>
                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:6 }}>
                        <div style={{ minWidth:0 }}>
                          <p className="sx-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.25em', textTransform:'uppercase', color:'#333', marginBottom:5 }}>
                            {item.category}
                          </p>
                          <h3 className="sx-c" style={{ fontSize:'clamp(18px,2.5vw,26px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>
                            {item.name}
                          </h3>
                        </div>
                        <button onClick={(e)=>{ e.stopPropagation(); if(!user){toast.warning("Please login",{action:{label:"Login",onClick:()=>navigate("/login")}});return;} toggleWishlist(item); }}
                          className={`sx-icon-btn${isInWishlist?' on':''}`} style={{ flexShrink:0, marginTop:4 }}>
                          <Heart size={14} strokeWidth={1.5} fill={isInWishlist?'currentColor':'none'}/>
                        </button>
                      </div>

                      <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:12, flexWrap:'wrap' }}>
                        <p className="sx-c" style={{ fontSize:30, fontWeight:900, color:'#fff', lineHeight:1 }}>${item.price}</p>
                        <div style={{ display:'flex', gap:2 }}>
                          {[...Array(5)].map((_,i) => (
                            <Star key={i} size={11} fill={i<Math.floor(item.rating)?'#fff':'none'} color={i<Math.floor(item.rating)?'#fff':'#222'}/>
                          ))}
                          <span className="sx-c" style={{ fontSize:10, fontWeight:700, color:'#444', marginLeft:5 }}>{item.rating}</span>
                        </div>
                        <span className={`sx-badge ${stockStatus.color}`}>
                          <span style={{ width:5, height:5, background:stockStatus.badge, borderRadius:'50%' }}/>
                          {stockStatus.text}
                        </span>
                        {item.trending && <span className="sx-badge sx-hot-badge"><Flame size={8} fill="currentColor"/> Hot</span>}
                        <span className="sx-c" style={{ fontSize:9, color:'#2a2a2a', display:'flex', alignItems:'center', gap:4 }}>
                          <Eye size={9}/> {item.views}
                        </span>
                      </div>
                    </div>

                    <div style={{ display:'flex', gap:8, marginTop:16 }}>
                      <button onClick={(e)=>handleQuickView(item,e)} className="sx-btn-dark" style={{ padding:'10px 20px' }}>
                        Quick View
                      </button>
                      <button onClick={(e)=>handleAddToCart(item,e)} disabled={isOut} className="sx-btn-white"
                        style={{ flex:1, justifyContent:'center', opacity:isOut?.35:1, cursor:isOut?'not-allowed':'pointer' }}>
                        <ShoppingCart size={13}/>
                        {isOut?"Out of Stock": isItemInCart(item.id)?"Go to Cart": wasAdded?"✓ Added":"Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════════════════════════════
            EMPTY STATE
        ═══════════════════════════════════════ */}
        {!isLoading && displayedProducts.length === 0 && (
          <div style={{ textAlign:'center', padding:'100px 20px', border:'1px solid #141414', background:'#000', marginTop:0 }}>
            <div style={{ width:60, height:60, border:'1px solid #1a1a1a', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
              <Package size={24} color="#2a2a2a"/>
            </div>
            <p className="sx-c" style={{ fontSize:24, fontWeight:900, textTransform:'uppercase', letterSpacing:'.06em', color:'#222', marginBottom:8 }}>
              No Products Found
            </p>
            <p className="sx-b" style={{ fontSize:13, color:'#333', marginBottom:28 }}>
              Try adjusting your filters
            </p>
            <button onClick={clearFilters} className="sx-btn-white">
              <X size={12}/> Clear Filters
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════
            PAGINATION
        ═══════════════════════════════════════ */}
        {!isLoading && totalCount > 0 && (
          <div style={{ marginTop:0, padding:'20px 0', borderTop:'1px solid #141414', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <p className="sx-c" style={{ fontSize:10, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#333' }}>
              {startItem}–{endItem} of {totalCount} products
            </p>
            <div style={{ display:'flex', gap:1, flexWrap:'wrap' }}>
              <button onClick={() => handlePageChange(currentPage-1)} disabled={currentPage===1} className="sx-pg-btn" aria-label="Previous">
                <ChevronLeft size={15}/>
              </button>
              {getPageNumbers().map((page,index) =>
                page==='...' ? (
                  <span key={`e-${index}`} className="sx-c" style={{ width:38, height:38, display:'flex', alignItems:'center', justifyContent:'center', color:'#2a2a2a', fontSize:13 }}>…</span>
                ) : (
                  <button key={page} onClick={() => handlePageChange(page)} className={`sx-pg-btn${currentPage===page?' on':''}`}>{page}</button>
                )
              )}
              <button onClick={() => handlePageChange(currentPage+1)} disabled={currentPage===totalPages} className="sx-pg-btn" aria-label="Next">
                <ChevronRight size={15}/>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════
          MOBILE FILTER DRAWER
      ═══════════════════════════════════════ */}
      {isMobileFilterOpen && (
        <div className="sx-drawer-bg" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="sx-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ width:32, height:2, background:'#2a2a2a', margin:'0 auto 24px' }}/>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
              <span className="sx-c" style={{ fontSize:24, fontWeight:900, textTransform:'uppercase', letterSpacing:'.04em', color:'#fff' }}>Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className="sx-icon-btn"><X size={15}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
              <div>
                <span className="sx-filter-label">Category</span>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                      className={`sx-cat-pill${selectedCategory===cat?' active':''}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <span className="sx-filter-label">Sort By</span>
                <div style={{ position:'relative' }}>
                  <select value={sortOption} onChange={(e)=>{ setSortOption(e.target.value); setCurrentPage(1); }}
                    style={{ width:'100%', padding:'10px 32px 10px 12px', background:'#0a0a0a', border:'1px solid #1e1e1e', color:'#fff', fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', outline:'none', appearance:'none', cursor:'pointer' }}>
                    <option value="">Featured</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="trending">Trending</option>
                  </select>
                  <ChevronDown size={12} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#444', pointerEvents:'none' }}/>
                </div>
              </div>
              <div>
                <span className="sx-filter-label">Price Range</span>
                <div style={{ display:'flex', gap:10 }}>
                  <input type="number" placeholder="Min $0" value={minPrice}
                    onChange={(e)=>{ setMinPrice(e.target.value); setCurrentPage(1); }}
                    className="sx-input" style={{ flex:1 }}/>
                  <input type="number" placeholder="Max" value={maxPrice}
                    onChange={(e)=>{ setMaxPrice(e.target.value); setCurrentPage(1); }}
                    className="sx-input" style={{ flex:1 }}/>
                </div>
              </div>
              <div>
                <span className="sx-filter-label">Min Rating</span>
                <div style={{ display:'flex', gap:6 }}>
                  {[0,3,4,5].map((r) => (
                    <button key={r} onClick={() => { setMinRating(r); setCurrentPage(1); }}
                      className={`sx-rate-pill${minRating===r?' on':''}`}>
                      {r===0?"All":`${r}+`}
                      {r>0 && <Star size={10} fill={minRating===r?'#000':'none'} color={minRating===r?'#000':'#444'}/>}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }} className="sx-btn-outline" style={{ flex:1, justifyContent:'center' }}>
                  <X size={12}/> Clear
                </button>
                <button onClick={() => setIsMobileFilterOpen(false)} className="sx-btn-white" style={{ flex:1, justifyContent:'center' }}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          QUICK VIEW MODAL
      ═══════════════════════════════════════ */}
      {quickViewProduct && (
        <div className="sx-modal-bg" onClick={() => setQuickViewProduct(null)}>
          <div className="sx-modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQuickViewProduct(null)}
              className="sx-icon-btn"
              style={{ position:'absolute', top:16, right:16, zIndex:10 }}>
              <X size={15}/>
            </button>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
              {/* Image */}
              <div style={{ background:'#060606', display:'flex', alignItems:'center', justifyContent:'center', padding:48, minHeight:380, borderRight:'1px solid #1a1a1a', position:'relative' }}>
                <img src={quickViewProduct.image} alt={quickViewProduct.name}
                  style={{ maxHeight:300, maxWidth:'100%', objectFit:'contain', filter:'drop-shadow(0 24px 48px rgba(0,0,0,.9))' }}/>
                {quickViewProduct.trending && (
                  <span className="sx-badge sx-hot-badge" style={{ position:'absolute', top:16, left:16 }}>
                    <Flame size={9} fill="currentColor"/> Trending
                  </span>
                )}
              </div>

              {/* Details */}
              <div style={{ padding:'40px 36px', display:'flex', flexDirection:'column' }}>
                <p className="sx-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#333', marginBottom:10 }}>
                  {quickViewProduct.category}
                </p>
                <h3 className="sx-c" style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.01em', color:'#fff', lineHeight:.9, marginBottom:16 }}>
                  {quickViewProduct.name}
                </h3>
                <p className="sx-c" style={{ fontSize:44, fontWeight:900, color:'#fff', lineHeight:1, marginBottom:20 }}>
                  ${quickViewProduct.price}
                </p>

                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
                  <div style={{ display:'flex', gap:2 }}>
                    {[...Array(5)].map((_,i) => (
                      <Star key={i} size={13} fill={i<Math.floor(quickViewProduct.rating)?'#fff':'none'} color={i<Math.floor(quickViewProduct.rating)?'#fff':'#2a2a2a'}/>
                    ))}
                  </div>
                  <span className="sx-c" style={{ fontSize:11, fontWeight:700, color:'#444' }}>{quickViewProduct.rating}</span>
                  <span className="sx-c" style={{ fontSize:9, color:'#2a2a2a', display:'flex', alignItems:'center', gap:4 }}>
                    <Eye size={9}/> {quickViewProduct.views}
                  </span>
                </div>

                <div style={{ height:1, background:'#141414', marginBottom:20 }}/>

                <div style={{ marginBottom:24 }}>
                  <span className={`sx-badge ${getStockStatus(quickViewProduct.stock||0).color}`}>
                    <span style={{ width:6, height:6, background:getStockStatus(quickViewProduct.stock||0).badge, borderRadius:'50%' }}/>
                    {getStockStatus(quickViewProduct.stock||0).text}
                  </span>
                </div>

                <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
                  <button onClick={(e)=>{ e.stopPropagation(); if(!user){toast.warning("Please login",{action:{label:"Login",onClick:()=>navigate("/login")}});return;} toggleWishlist(quickViewProduct); }}
                    className={`sx-icon-btn${wishlist.some(p=>p.productId===quickViewProduct.id)?' on':''}`}
                    style={{ width:48, height:48 }}>
                    <Heart size={16} strokeWidth={1.5} fill={wishlist.some(p=>p.productId===quickViewProduct.id)?'currentColor':'none'}/>
                  </button>
                  <button onClick={() => handleProductClick(quickViewProduct)} className="sx-btn-white" style={{ flex:1, justifyContent:'center', padding:'14px 20px' }}>
                    View Full Details
                  </button>
                </div>
              </div>
            </div>

            <style>{`
              @media(max-width:640px){
                .sx-modal > div:first-of-type { grid-template-columns:1fr !important; }
                .sx-modal > div:first-of-type > div:first-child { min-height:220px !important; border-right:none !important; border-bottom:1px solid #1a1a1a; }
              }
            `}</style>
          </div>
        </div>
      )}

      {/* Scroll to top */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="sx-scroll-top" aria-label="Scroll to top">
          <ArrowUp size={18}/>
        </button>
      )}
    </div>
  );
}