

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




import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Heart, Star, Package, Grid3X3, List, Filter, X,
  ShoppingCart, ChevronDown, Eye, ChevronLeft, ChevronRight,
  Flame, ArrowUp, LayoutGrid, Rows3
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";

/* ─────────────────────────────────────────────────────────────
   BREAKPOINT HOOK — fires on mount + every resize
───────────────────────────────────────────────────────────── */
function useBreakpoint() {
  const get = () => {
    if (typeof window === "undefined") return "lg";
    const w = window.innerWidth;
    if (w < 400) return "xs";   // tiny phones  (320–399)
    if (w < 640) return "sm";   // normal phones (400–639)
    if (w < 1024) return "md";  // tablets
    return "lg";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener("resize", fn);
    fn(); // run once on mount to ensure correct initial value
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}

const rng = () => parseFloat((Math.random() * 2 + 3).toFixed(1));

export default function MoreProducts({ searchTerm }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const { wishlist = [], toggleWishlist } = useWishlist();
  const bp = useBreakpoint();
  const isXs = bp === "xs";
  const isMobile = bp === "xs" || bp === "sm";
  const isTablet = bp === "md";

  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("");

  /* grid mode — default based on breakpoint */
  const defaultGrid = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (w < 400) return "1";
    if (w < 640) return "2";
    return "3";
  };
  const [gridCols, setGridCols] = useState(defaultGrid);

  /* sync grid to bp changes */
  useEffect(() => {
    if (isXs && (gridCols === "3" || gridCols === "2")) setGridCols("1");
    else if (bp === "sm" && gridCols === "3") setGridCols("2");
  }, [bp]);

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
  const [imgLoaded, setImgLoaded] = useState({});
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fn = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    api.get("/Products/categories-list")
      .then(r => { if (r.data.data) setCategories(["All", ...r.data.data.filter(c => c !== "All")]); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/Products/User/GetAll");
        const raw = res.data.data || [];
        const all = raw.map(p => ({
          id: p.id, name: p.name, price: p.price,
          category: p.category,
          image: p.imageUrl || "/placeholder.png",
          stock: p.stockQuantity ?? 0,
          rating: rng(),
          views: Math.floor(Math.random() * 1000) + 100,
          trending: Math.random() > 0.7,
        }));
        let f = [...all];
        if (selectedCategory !== "All") f = f.filter(p => p.category === selectedCategory);
        if (minPrice) f = f.filter(p => p.price >= +minPrice);
        if (maxPrice) f = f.filter(p => p.price <= +maxPrice);
        if (searchTerm?.trim()) f = f.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (minRating > 0) f = f.filter(p => p.rating >= minRating);
        if (sortOption === "price-low") f.sort((a, b) => a.price - b.price);
        if (sortOption === "price-high") f.sort((a, b) => b.price - a.price);
        if (sortOption === "newest") f.sort((a, b) => b.id - a.id);
        if (sortOption === "trending") f.sort(() => Math.random() - .5);
        if (sortOption === "popular") f.sort((a, b) => b.id - a.id);
        const s = (currentPage - 1) * itemsPerPage;
        setDisplayedProducts(f.slice(s, s + itemsPerPage));
        setTotalPages(Math.ceil(f.length / itemsPerPage));
        setTotalCount(f.length);
      } catch { setDisplayedProducts([]); setTotalPages(1); setTotalCount(0); }
      finally { setIsLoading(false); }
    })();
  }, [currentPage, selectedCategory, minPrice, maxPrice, minRating, sortOption, searchTerm]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNums = () => {
    const pages = [];
    if (totalPages <= 5) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else if (currentPage <= 3) pages.push(1, 2, 3, 4, "...", totalPages);
    else if (currentPage >= totalPages - 2) pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    return pages;
  };

  const isInCart = (id) => cart.some(c => c.productId === id);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    if (!user) { toast.warning("Please login to add items", { action: { label: "Login", onClick: () => navigate("/login") } }); return; }
    if (item.stock <= 0) { toast.error("Out of stock"); return; }
    if (isInCart(item.id)) { toast.info("Already in cart", { action: { label: "View Cart", onClick: () => navigate("/cart") } }); return; }
    addToCart(item, 1);
    toast.success("Added to cart 🛒");
    setAddedToCart(item.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleWishlist = (item, e) => {
    e?.stopPropagation();
    if (!user) { toast.warning("Please login to save items", { action: { label: "Login", onClick: () => navigate("/login") } }); return; }
    toggleWishlist(item);
  };

  const clearFilters = () => {
    setSelectedCategory("All"); setMinPrice(""); setMaxPrice("");
    setMinRating(0); setSortOption(""); setCurrentPage(1);
  };

  const getStock = (s) => {
    if (s <= 0) return { text: "Out of Stock", short: "OOS", cls: "sx-out", dot: "#ef4444" };
    if (s <= 5) return { text: `Only ${s} left`, short: "Low", cls: "sx-low", dot: "#f59e0b" };
    if (s <= 10) return { text: `${s} in stock`, short: `${s}`, cls: "sx-mid", dot: "#eab308" };
    return { text: `${s} in stock`, short: "✓", cls: "sx-ok", dot: "#22c55e" };
  };

  const hasFilters = selectedCategory !== "All" || minPrice || maxPrice || minRating > 0 || sortOption;
  const isListView = gridCols === "list";

  /* ── grid columns CSS ── */
  const gridCSS = isListView ? "1fr"
    : gridCols === "3" ? "repeat(3,1fr)"
    : gridCols === "2" ? "repeat(2,1fr)"
    : "1fr";

  /* ── card image height based on grid + bp ── */
  const imgH = (() => {
    if (isListView) return 0;
    if (isXs && gridCols === "1") return 220;
    if (isXs && gridCols === "2") return 140;
    if (bp === "sm" && gridCols === "1") return 240;
    if (bp === "sm" && gridCols === "2") return 160;
    if (isTablet && gridCols === "2") return 220;
    if (isTablet && gridCols === "3") return 200;
    if (gridCols === "2") return 280;
    return 260;
  })();

  /* ── outer padding ── */
  const outerPad = isXs ? "0 10px 48px" : isMobile ? "0 14px 48px" : "0 24px 60px";

  return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'Barlow',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sx-c { font-family: 'Barlow Condensed', sans-serif; }

        /* scrollbar hide */
        .sx-ns::-webkit-scrollbar { display: none; }
        .sx-ns { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── stock badges ── */
        .sx-badge {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 8px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase;
          padding: 3px 6px; display: inline-flex; align-items: center; gap: 4px;
          line-height: 1; white-space: nowrap; flex-shrink: 0;
        }
        .sx-out { background: rgba(239,68,68,.08); color: #ef4444; border: 1px solid rgba(239,68,68,.2); }
        .sx-low { background: rgba(245,158,11,.08); color: #f59e0b; border: 1px solid rgba(245,158,11,.2); }
        .sx-mid { background: rgba(234,179,8,.08);  color: #eab308; border: 1px solid rgba(234,179,8,.2); }
        .sx-ok  { background: rgba(34,197,94,.08);  color: #22c55e; border: 1px solid rgba(34,197,94,.2); }
        .sx-hot { background: #fff; color: #000; border: none; }

        /* ── icon button ── */
        .sx-ib {
          width: 34px; height: 34px; background: rgba(0,0,0,.7);
          border: 1px solid #2a2a2a; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #666;
          transition: all .15s; flex-shrink: 0; backdrop-filter: blur(4px);
        }
        .sx-ib:hover, .sx-ib.on { background: #fff; color: #000; border-color: #fff; }

        /* ── small icon button (mobile) ── */
        .sx-ib-sm {
          width: 28px; height: 28px; background: rgba(0,0,0,.75);
          border: 1px solid #2a2a2a; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #666;
          transition: all .15s; flex-shrink: 0; backdrop-filter: blur(4px);
        }
        .sx-ib-sm:hover, .sx-ib-sm.on { background: #fff; color: #000; border-color: #fff; }

        /* ── category pill ── */
        .sx-cp {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          padding: 11px 16px; background: transparent; border: none;
          border-right: 1px solid #1a1a1a; color: #444; cursor: pointer;
          white-space: nowrap; flex-shrink: 0; transition: all .15s;
        }
        .sx-cp:hover { color: #ccc; background: #0a0a0a; }
        .sx-cp.on { background: #fff; color: #000; }
        .sx-cp:last-child { border-right: none; }

        /* ── view toggle button ── */
        .sx-vb {
          width: 44px; height: 44px; background: transparent; border: none;
          border-left: 1px solid #1a1a1a; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #444; transition: all .15s; flex-shrink: 0;
        }
        .sx-vb:hover { color: #fff; background: #0d0d0d; }
        .sx-vb.on { background: #fff; color: #000; }

        /* ── inputs ── */
        .sx-inp {
          width: 100%; padding: 10px 12px; background: #080808;
          border: 1px solid #1e1e1e; color: #fff;
          font-family: 'Barlow', sans-serif; font-size: 13px;
          outline: none; transition: border-color .15s;
        }
        .sx-inp:focus { border-color: #444; }
        .sx-inp::placeholder { color: #282828; }

        /* ── select ── */
        .sx-sel {
          padding: 8px 30px 8px 12px; background: #080808; border: 1px solid #1e1e1e;
          color: #888; font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          outline: none; cursor: pointer; appearance: none; width: 100%;
        }
        .sx-sel option { background: #0d0d0d; color: #fff; }
        .sx-sel:focus { border-color: #444; }

        /* ── filter label ── */
        .sx-fl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase;
          color: #333; display: block; margin-bottom: 9px;
        }

        /* ── rating pill ── */
        .sx-rp {
          flex: 1; padding: 9px 4px; display: flex; align-items: center;
          justify-content: center; gap: 4px; background: #080808;
          border: 1px solid #1e1e1e; font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: #444; cursor: pointer; transition: all .15s;
        }
        .sx-rp:hover { border-color: #444; color: #ccc; }
        .sx-rp.on { background: #fff; color: #000; border-color: #fff; }

        /* ── buttons ── */
        .sx-btn-w {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
          background: #fff; color: #000; border: none; cursor: pointer; padding: 11px 16px;
          transition: background .15s; display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap; flex-shrink: 0;
        }
        .sx-btn-w:hover { background: #e5e5e5; }
        .sx-btn-w:disabled { opacity: .3; cursor: not-allowed; }

        .sx-btn-d {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
          background: #0d0d0d; color: #555; border: 1px solid #1e1e1e;
          cursor: pointer; padding: 11px 16px; transition: all .15s;
          display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
        }
        .sx-btn-d:hover { border-color: #444; color: #ccc; }

        .sx-btn-o {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
          background: transparent; color: #fff; border: 1px solid #2a2a2a;
          cursor: pointer; padding: 11px 16px; transition: all .15s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .sx-btn-o:hover { border-color: #666; background: #111; }
        .sx-btn-o:disabled { opacity: .25; cursor: not-allowed; }

        /* ── PRODUCT CARD ── */
        .sx-card {
          background: #000; border: 1px solid #141414;
          cursor: pointer; position: relative;
          transition: border-color .2s;
          display: flex; flex-direction: column;
          overflow: hidden; /* CRITICAL: clips overflowing content */
          min-width: 0;     /* CRITICAL: allows flex shrink inside grid */
        }
        .sx-card:hover { border-color: #2a2a2a; }

        .sx-card-img-wrap {
          position: relative; overflow: hidden; background: #070707;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; /* don't let image area shrink */
        }
        .sx-card-img {
          object-fit: contain; display: block;
          transition: transform .55s cubic-bezier(.25,.46,.45,.94);
          /* Prevent image from overflowing its container */
          max-width: 100%; max-height: 100%;
        }
        .sx-card:hover .sx-card-img { transform: scale(1.06); }

        /* card bottom CTA — always visible on mobile, hover on desktop */
        .sx-card-cta {
          padding: 8px 10px;
          display: flex; gap: 6px; align-items: center;
        }

        /* hover overlay */
        .sx-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 55%);
          opacity: 0; transition: opacity .3s; pointer-events: none;
        }
        .sx-card:hover .sx-overlay { opacity: 1; }

        /* wishlist + eye — top right, always visible on mobile */
        .sx-card-acts {
          position: absolute; top: 8px; right: 8px;
          display: flex; flex-direction: column; gap: 5px;
        }

        /* ── LIST ROW ── */
        .sx-row {
          background: #000; border: 1px solid #141414;
          display: flex; cursor: pointer;
          transition: border-color .2s; overflow: hidden; min-width: 0;
        }
        .sx-row:hover { border-color: #2a2a2a; }

        /* ── pagination btn ── */
        .sx-pg {
          font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 800;
          min-width: 36px; height: 36px; padding: 0 6px;
          background: #000; border: 1px solid #1e1e1e; color: #444;
          cursor: pointer; transition: all .15s;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .sx-pg:hover:not(:disabled) { border-color: #555; color: #fff; }
        .sx-pg.on { background: #fff; color: #000; border-color: #fff; }
        .sx-pg:disabled { opacity: .2; cursor: not-allowed; }

        /* ── modal ── */
        .sx-modal-bg {
          position: fixed; inset: 0; background: rgba(0,0,0,.97);
          display: flex; align-items: center; justify-content: center;
          z-index: 200; padding: 16px; animation: sxFade .18s ease;
        }
        .sx-modal {
          background: #000; border: 1px solid #222;
          max-width: 920px; width: 100%; max-height: 92vh; overflow-y: auto;
          position: relative; animation: sxScale .18s ease;
        }
        .sx-modal-grid { display: grid; grid-template-columns: 1fr 1fr; }
        @media(max-width: 600px) {
          .sx-modal-grid { grid-template-columns: 1fr; }
          .sx-modal-img { min-height: 220px !important; border-right: none !important; border-bottom: 1px solid #1a1a1a !important; }
        }

        /* ── drawer ── */
        .sx-drawer-bg {
          position: fixed; inset: 0; background: rgba(0,0,0,.93);
          z-index: 200; display: flex; flex-direction: column; justify-content: flex-end;
          animation: sxFade .18s ease;
        }
        .sx-drawer {
          background: #000; border-top: 1px solid #222;
          padding: 28px 20px 40px; max-height: 90vh; overflow-y: auto;
          animation: sxUp .28s ease;
        }

        /* ── scroll to top ── */
        .sx-stb {
          position: fixed; bottom: 20px; right: 16px; z-index: 100;
          width: 40px; height: 40px; background: #fff; color: #000;
          border: none; cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: background .15s; animation: sxFade .2s ease;
        }

        /* ── skeleton ── */
        @keyframes sxShim { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
        .sx-shim {
          background: linear-gradient(90deg, #090909 0%, #131313 50%, #090909 100%);
          background-size: 800px 100%; animation: sxShim 1.4s infinite;
        }

        /* ── chip (active filter) ── */
        .sx-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border: 1px solid #252525;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          color: #666; white-space: nowrap;
        }

        /* ── advanced filter panel (desktop) ── */
        .sx-adv {
          border: 1px solid #1a1a1a; border-top: none;
          background: #050505; padding: 16px 20px;
          display: grid; grid-template-columns: 1fr 1fr auto;
          gap: 16px; align-items: end;
          animation: sxDown .2s ease;
        }
        @media(max-width: 1024px) {
          .sx-adv { grid-template-columns: 1fr 1fr; }
          .sx-adv > *:last-child { grid-column: 1 / -1; }
        }

        @keyframes sxFade  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sxScale { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes sxUp    { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes sxDown  { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ maxWidth: 1340, margin: "0 auto", padding: outerPad }}>

        {/* ═══════════════════════════════
            HEADER
        ═══════════════════════════════ */}
        <div style={{ padding: isMobile ? "20px 0 16px" : "36px 0 28px", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p className="sx-c" style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".3em", textTransform: "uppercase", color: "#333", marginBottom: 5 }}>
                Sport-X · Collection
              </p>
              <h1 className="sx-c" style={{ fontSize: isXs ? 32 : isMobile ? 40 : "clamp(40px,6vw,68px)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: .88, letterSpacing: "-.01em" }}>
                All Products
              </h1>
            </div>
            {totalCount > 0 && !isLoading && (
              <p className="sx-c" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", color: "#333", flexShrink: 0 }}>
                {startItem}–{endItem}<span style={{ color: "#222" }}>/{totalCount}</span>
              </p>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════
            CATEGORY STRIP
        ═══════════════════════════════ */}
        <div className="sx-ns" style={{ display: "flex", overflowX: "auto", border: "1px solid #1a1a1a", borderTop: "none" }}>
          {categories.map(cat => (
            <button key={cat} className={`sx-cp${selectedCategory === cat ? " on" : ""}`}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════
            TOOLBAR
        ═══════════════════════════════ */}
        <div style={{ display: "flex", alignItems: "stretch", border: "1px solid #1a1a1a", borderTop: "none", height: 44, overflow: "hidden" }}>

          {/* Mobile: filter button */}
          {isMobile && (
            <button onClick={() => setIsMobileFilterOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 14px", height: "100%", background: "transparent", border: "none", borderRight: "1px solid #1a1a1a", cursor: "pointer", color: "#555", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", flexShrink: 0, transition: "color .15s" }}>
              <Filter size={12} />
              Filters
              {hasFilters && <span style={{ width: 5, height: 5, background: "#fff", borderRadius: "50%", flexShrink: 0 }} />}
            </button>
          )}

          {/* Desktop: Sort */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", borderRight: "1px solid #1a1a1a", flexShrink: 0 }}>
              <span className="sx-c" style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase", color: "#333" }}>Sort</span>
              <div style={{ position: "relative" }}>
                <select value={sortOption} onChange={e => { setSortOption(e.target.value); setCurrentPage(1); }}
                  style={{ padding: "4px 22px 4px 4px", background: "transparent", border: "none", color: "#888", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", outline: "none", cursor: "pointer", appearance: "none" }}>
                  <option value="">Featured</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="trending">Trending</option>
                </select>
                <ChevronDown size={10} style={{ position: "absolute", right: 2, top: "50%", transform: "translateY(-50%)", color: "#444", pointerEvents: "none" }} />
              </div>
            </div>
          )}

          {/* Desktop: active filter chips */}
          {!isMobile && hasFilters && (
            <div className="sx-ns" style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, padding: "0 12px", overflowX: "auto" }}>
              {selectedCategory !== "All" && (
                <span className="sx-chip">{selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} style={{ background: "none", border: "none", cursor: "pointer", color: "#444", display: "flex", padding: 0 }}><X size={9} /></button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="sx-chip">${minPrice || 0}–${maxPrice || "∞"}
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#444", display: "flex", padding: 0 }}><X size={9} /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="sx-chip">{minRating}+★
                  <button onClick={() => setMinRating(0)} style={{ background: "none", border: "none", cursor: "pointer", color: "#444", display: "flex", padding: 0 }}><X size={9} /></button>
                </span>
              )}
              <button onClick={clearFilters} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#333", transition: "color .15s", flexShrink: 0 }}
                onMouseOver={e => e.currentTarget.style.color = "#fff"} onMouseOut={e => e.currentTarget.style.color = "#333"}>
                Clear all
              </button>
            </div>
          )}

          <div style={{ flex: 1 }} />

          {/* VIEW TOGGLE */}
          <div style={{ display: "flex", alignItems: "stretch", borderLeft: "1px solid #1a1a1a" }}>
            {/* Desktop only: 3-col */}
            {!isMobile && (
              <button className={`sx-vb${gridCols === "3" ? " on" : ""}`} onClick={() => setGridCols("3")} title="3 columns">
                <Grid3X3 size={13} />
              </button>
            )}
            {/* 2-col: desktop + sm phones */}
            {!isXs && (
              <button className={`sx-vb${gridCols === "2" ? " on" : ""}`} onClick={() => setGridCols("2")} title="2 columns">
                <LayoutGrid size={13} />
              </button>
            )}
            {/* 1-col: always */}
            <button className={`sx-vb${gridCols === "1" ? " on" : ""}`} onClick={() => setGridCols("1")} title="1 column">
              <Grid3X3 size={13} style={{ transform: "scale(.7)" }} />
            </button>
            {/* List: always */}
            <button className={`sx-vb${isListView ? " on" : ""}`} onClick={() => setGridCols("list")} title="List view">
              <Rows3 size={13} />
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════
            ADVANCED FILTER (desktop only)
        ═══════════════════════════════ */}
        {!isMobile && (
          <div className="sx-adv">
            <div>
              <span className="sx-fl">Price Range ($)</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="number" placeholder="Min" value={minPrice} onChange={e => { setMinPrice(e.target.value); setCurrentPage(1); }} className="sx-inp" style={{ flex: 1 }} />
                <span style={{ color: "#2a2a2a", fontFamily: "'Barlow Condensed',sans-serif" }}>—</span>
                <input type="number" placeholder="Max" value={maxPrice} onChange={e => { setMaxPrice(e.target.value); setCurrentPage(1); }} className="sx-inp" style={{ flex: 1 }} />
              </div>
            </div>
            <div>
              <span className="sx-fl">Min Rating</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 3, 4, 5].map(r => (
                  <button key={r} onClick={() => { setMinRating(r); setCurrentPage(1); }} className={`sx-rp${minRating === r ? " on" : ""}`}>
                    {r === 0 ? "All" : `${r}+`}
                    {r > 0 && <Star size={10} fill={minRating === r ? "#000" : "none"} color={minRating === r ? "#000" : "#444"} />}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={clearFilters} disabled={!hasFilters} className="sx-btn-o" style={{ justifyContent: "center" }}>
              <X size={12} /> Clear All
            </button>
          </div>
        )}

        {/* hairline */}
        <div style={{ height: 1, background: "#111" }} />

        {/* ═══════════════════════════════
            SKELETON
        ═══════════════════════════════ */}
        {isLoading && (
          <div style={{ display: "grid", gridTemplateColumns: gridCSS, gap: 1, background: "#111" }}>
            {[...Array(isXs ? 4 : 6)].map((_, i) => (
              <div key={i} style={{ background: "#000" }}>
                <div className="sx-shim" style={{ height: imgH || 200 }} />
                <div style={{ padding: "12px 12px 16px" }}>
                  <div className="sx-shim" style={{ height: 11, width: "60%", marginBottom: 8 }} />
                  <div className="sx-shim" style={{ height: 20, width: "35%", marginBottom: 12 }} />
                  <div className="sx-shim" style={{ height: 34 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════
            PRODUCT GRID / LIST
        ═══════════════════════════════ */}
        {!isLoading && displayedProducts.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: gridCSS, gap: 1, background: "#111" }}>
            {displayedProducts.map(item => {
              const inWish = (wishlist || []).some(p => p.productId === item.id);
              const stock = getStock(item.stock || 0);
              const isOut = (item.stock || 0) <= 0;
              const wasAdded = addedToCart === item.id;
              const loaded = imgLoaded[item.id];

              /* ─── LIST ROW ─── */
              if (isListView) {
                const listImgW = isXs ? "100%" : isMobile ? "100%" : 180;
                const listImgH = isXs ? 180 : isMobile ? 180 : undefined;
                return (
                  <div key={item.id} className="sx-row" onClick={() => navigate(`/Product/${item.id}`, { state: item })}
                    style={{ flexDirection: isMobile ? "column" : "row", opacity: isOut ? .5 : 1 }}>
                    {/* image */}
                    <div style={{ width: listImgW, height: listImgH, flexShrink: 0, background: "#060606", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: isMobile ? 14 : 20, borderRight: isMobile ? "none" : "1px solid #141414", borderBottom: isMobile ? "1px solid #141414" : "none" }}>
                      {!loaded && <div className="sx-shim" style={{ position: "absolute", inset: 0 }} />}
                      <img src={item.image} alt={item.name} onLoad={() => setImgLoaded(p => ({ ...p, [item.id]: true }))}
                        style={{ maxHeight: isMobile ? 140 : 130, maxWidth: "100%", objectFit: "contain", opacity: loaded ? 1 : 0, filter: isOut ? "grayscale(1)" : "none" }} />
                      {item.trending && <span className="sx-badge sx-hot" style={{ position: "absolute", top: 8, left: 8 }}><Flame size={7} fill="currentColor" />Hot</span>}
                    </div>
                    {/* info */}
                    <div style={{ flex: 1, padding: isMobile ? "14px 14px" : "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 10, minWidth: 0 }}>
                      <div>
                        <p className="sx-c" style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#333", marginBottom: 4 }}>{item.category}</p>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                          <h3 className="sx-c" style={{ fontSize: isMobile ? 17 : 22, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".02em", color: "#fff", lineHeight: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.name}
                          </h3>
                          <button onClick={e => handleWishlist(item, e)} className={`sx-ib${inWish ? " on" : ""}`} style={{ flexShrink: 0 }}>
                            <Heart size={13} strokeWidth={1.5} fill={inWish ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                          <p className="sx-c" style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: "#fff", lineHeight: 1 }}>${item.price}</p>
                          <div style={{ display: "flex", gap: 2 }}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.floor(item.rating) ? "#fff" : "none"} color={i < Math.floor(item.rating) ? "#fff" : "#222"} />)}
                            <span className="sx-c" style={{ fontSize: 9, fontWeight: 700, color: "#444", marginLeft: 3 }}>{item.rating}</span>
                          </div>
                          <span className={`sx-badge ${stock.cls}`}><span style={{ width: 4, height: 4, background: stock.dot, borderRadius: "50%" }} />{stock.text}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {!isMobile && <button onClick={e => { e.stopPropagation(); setQuickViewProduct(item); }} className="sx-btn-d">Quick View</button>}
                        <button onClick={e => handleAddToCart(item, e)} disabled={isOut} className="sx-btn-w"
                          style={{ flex: 1, justifyContent: "center", opacity: isOut ? .35 : 1, cursor: isOut ? "not-allowed" : "pointer" }}>
                          <ShoppingCart size={12} />
                          {isOut ? "Out of Stock" : isInCart(item.id) ? "In Cart" : wasAdded ? "✓ Added" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              /* ─── GRID CARD ─── */
              /* font size scales with card size */
              const nameSz = (isXs && gridCols === "2") ? 11 : (isMobile && gridCols === "2") ? 12 : gridCols === "2" ? 14 : 14;
              const priceSz = (isXs && gridCols === "2") ? 16 : (isMobile && gridCols === "2") ? 18 : 22;
              const padSz = (isXs && gridCols === "2") ? "10px 10px 12px" : "12px 13px 14px";
              const tinyCard = isXs && gridCols === "2";

              return (
                <div key={item.id} className="sx-card" onClick={() => navigate(`/Product/${item.id}`, { state: item })}
                  onMouseEnter={() => setHoveredCard(item.id)} onMouseLeave={() => setHoveredCard(null)}
                  style={{ opacity: isOut ? .5 : 1 }}>

                  {/* IMAGE AREA */}
                  <div className="sx-card-img-wrap" style={{ height: imgH }}>
                    {!loaded && <div className="sx-shim" style={{ position: "absolute", inset: 0 }} />}
                    <img
                      src={item.image} alt={item.name}
                      className="sx-card-img"
                      onLoad={() => setImgLoaded(p => ({ ...p, [item.id]: true }))}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "contain",
                        padding: tinyCard ? "12px" : "16px",
                        opacity: loaded ? 1 : 0,
                        filter: isOut ? "grayscale(1)" : "none"
                      }}
                    />
                    <div className="sx-overlay" />

                    {/* WISHLIST + EYE — always visible on mobile, hover-reveal on desktop */}
                    <div className="sx-card-acts"
                      style={{ opacity: isMobile ? 1 : (hoveredCard === item.id ? 1 : 0), transition: "opacity .2s" }}>
                      <button onClick={e => handleWishlist(item, e)}
                        className={tinyCard ? `sx-ib-sm${inWish ? " on" : ""}` : `sx-ib${inWish ? " on" : ""}`}>
                        <Heart size={tinyCard ? 10 : 12} strokeWidth={1.5} fill={inWish ? "currentColor" : "none"} />
                      </button>
                      {!isMobile && (
                        <button onClick={e => { e.stopPropagation(); setQuickViewProduct(item); }}
                          className="sx-ib">
                          <Eye size={12} strokeWidth={1.5} />
                        </button>
                      )}
                    </div>

                    {/* STOCK + HOT badges — top left */}
                    <div style={{ position: "absolute", top: 7, left: 7, display: "flex", flexDirection: "column", gap: 3 }}>
                      <span className={`sx-badge ${stock.cls}`}>
                        <span style={{ width: 4, height: 4, background: stock.dot, borderRadius: "50%", flexShrink: 0 }} />
                        {tinyCard ? stock.short : stock.text}
                      </span>
                      {item.trending && (
                        <span className="sx-badge sx-hot">
                          <Flame size={7} fill="currentColor" />Hot
                        </span>
                      )}
                    </div>
                  </div>

                  {/* INFO AREA */}
                  <div style={{ padding: padSz, borderTop: "1px solid #0e0e0e", display: "flex", flexDirection: "column", gap: tinyCard ? 5 : 6, flex: 1 }}>
                    {/* name + rating */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 4 }}>
                      <h3 className="sx-c" style={{ fontSize: nameSz, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".03em", color: "#fff", lineHeight: 1.15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0 }}>
                        {item.name}
                      </h3>
                      {!tinyCard && (
                        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
                          <Star size={9} fill="#fff" color="#fff" />
                          <span className="sx-c" style={{ fontSize: 9, fontWeight: 700, color: "#444" }}>{item.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* category */}
                    {!tinyCard && (
                      <p className="sx-c" style={{ fontSize: 8, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#252525" }}>
                        {item.category}
                      </p>
                    )}

                    {/* price + CTA */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", gap: 6 }}>
                      <p className="sx-c" style={{ fontSize: priceSz, fontWeight: 900, color: "#fff", lineHeight: 1, flexShrink: 0 }}>
                        ${item.price}
                      </p>
                      {/* On mobile: compact add-to-cart button inline */}
                      {isMobile && (
                        <button
                          onClick={e => handleAddToCart(item, e)}
                          disabled={isOut}
                          style={{
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontSize: tinyCard ? 9 : 10,
                            fontWeight: 800,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            background: isOut ? "#111" : "#fff",
                            color: isOut ? "#333" : "#000",
                            border: isOut ? "1px solid #1e1e1e" : "none",
                            cursor: isOut ? "not-allowed" : "pointer",
                            padding: tinyCard ? "6px 8px" : "7px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                            opacity: isOut ? .5 : 1,
                          }}>
                          {isOut ? <X size={10} /> : isInCart(item.id) ? <ShoppingCart size={10} /> : wasAdded ? "✓" : <ShoppingCart size={10} />}
                          {tinyCard
                            ? (isOut ? "OOS" : isInCart(item.id) ? "Cart" : wasAdded ? "✓" : "Add")
                            : (isOut ? "OOS" : isInCart(item.id) ? "In Cart" : wasAdded ? "✓ Added" : "Add")}
                        </button>
                      )}
                    </div>

                    {/* Desktop: full-width add to cart button shown on hover via card-bar */}
                    {!isMobile && (
                      <button
                        onClick={e => handleAddToCart(item, e)}
                        disabled={isOut}
                        className="sx-btn-w"
                        style={{
                          width: "100%", justifyContent: "center",
                          opacity: isOut ? .35 : 1,
                          cursor: isOut ? "not-allowed" : "pointer",
                          marginTop: 4,
                        }}>
                        <ShoppingCart size={12} />
                        {isOut ? "Out of Stock" : isInCart(item.id) ? "In Cart" : wasAdded ? "✓ Added" : "Add to Cart"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════════════════════
            EMPTY STATE
        ═══════════════════════════════ */}
        {!isLoading && displayedProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "70px 20px", border: "1px solid #141414" }}>
            <div style={{ width: 48, height: 48, border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <Package size={18} color="#2a2a2a" />
            </div>
            <p className="sx-c" style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".06em", color: "#222", marginBottom: 8 }}>No Products Found</p>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "#333", marginBottom: 22 }}>Adjust your filters</p>
            <button onClick={clearFilters} className="sx-btn-w"><X size={12} /> Clear Filters</button>
          </div>
        )}

        {/* ═══════════════════════════════
            PAGINATION
        ═══════════════════════════════ */}
        {!isLoading && totalCount > 0 && (
          <div style={{ padding: "16px 0", borderTop: "1px solid #141414", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <p className="sx-c" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#333" }}>
              {startItem}–{endItem} of {totalCount}
            </p>
            <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="sx-pg"><ChevronLeft size={13} /></button>
              {getPageNums().map((page, i) =>
                page === "..." ? (
                  <span key={`e${i}`} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#2a2a2a", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12 }}>…</span>
                ) : (
                  <button key={page} onClick={() => handlePageChange(page)} className={`sx-pg${currentPage === page ? " on" : ""}`}>{page}</button>
                )
              )}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="sx-pg"><ChevronRight size={13} /></button>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════
          MOBILE FILTER DRAWER
      ═══════════════════════════════ */}
      {isMobileFilterOpen && (
        <div className="sx-drawer-bg" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="sx-drawer" onClick={e => e.stopPropagation()}>
            <div style={{ width: 32, height: 2, background: "#2a2a2a", margin: "0 auto 22px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
              <span className="sx-c" style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".04em", color: "#fff" }}>Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className="sx-ib"><X size={14} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <span className="sx-fl">Category</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {categories.map(cat => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                      style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "8px 14px", background: selectedCategory === cat ? "#fff" : "transparent", color: selectedCategory === cat ? "#000" : "#444", border: "1px solid " + (selectedCategory === cat ? "#fff" : "#222"), cursor: "pointer" }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="sx-fl">Sort By</span>
                <div style={{ position: "relative" }}>
                  <select value={sortOption} onChange={e => { setSortOption(e.target.value); setCurrentPage(1); }} className="sx-sel">
                    <option value="">Featured</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="trending">Trending</option>
                  </select>
                  <ChevronDown size={11} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#444", pointerEvents: "none" }} />
                </div>
              </div>
              <div>
                <span className="sx-fl">Price Range</span>
                <div style={{ display: "flex", gap: 10 }}>
                  <input type="number" placeholder="Min $0" value={minPrice} onChange={e => { setMinPrice(e.target.value); setCurrentPage(1); }} className="sx-inp" style={{ flex: 1 }} />
                  <input type="number" placeholder="Max" value={maxPrice} onChange={e => { setMaxPrice(e.target.value); setCurrentPage(1); }} className="sx-inp" style={{ flex: 1 }} />
                </div>
              </div>
              <div>
                <span className="sx-fl">Min Rating</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 3, 4, 5].map(r => (
                    <button key={r} onClick={() => { setMinRating(r); setCurrentPage(1); }} className={`sx-rp${minRating === r ? " on" : ""}`}>
                      {r === 0 ? "All" : `${r}+`}
                      {r > 0 && <Star size={10} fill={minRating === r ? "#000" : "none"} color={minRating === r ? "#000" : "#444"} />}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                <button onClick={() => { clearFilters(); setIsMobileFilterOpen(false); }} className="sx-btn-o" style={{ flex: 1, justifyContent: "center" }}>
                  <X size={12} /> Clear
                </button>
                <button onClick={() => setIsMobileFilterOpen(false)} className="sx-btn-w" style={{ flex: 1, justifyContent: "center" }}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════
          QUICK VIEW MODAL
      ═══════════════════════════════ */}
      {quickViewProduct && (
        <div className="sx-modal-bg" onClick={() => setQuickViewProduct(null)}>
          <div className="sx-modal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setQuickViewProduct(null)} className="sx-ib" style={{ position: "absolute", top: 14, right: 14, zIndex: 10 }}><X size={14} /></button>
            <div className="sx-modal-grid">
              <div className="sx-modal-img" style={{ background: "#060606", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, minHeight: 340, borderRight: "1px solid #1a1a1a", position: "relative" }}>
                <img src={quickViewProduct.image} alt={quickViewProduct.name}
                  style={{ maxHeight: 260, maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,.9))" }} />
                {quickViewProduct.trending && <span className="sx-badge sx-hot" style={{ position: "absolute", top: 14, left: 14 }}><Flame size={8} fill="currentColor" />Trending</span>}
              </div>
              <div style={{ padding: "36px 28px", display: "flex", flexDirection: "column" }}>
                <p className="sx-c" style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".28em", textTransform: "uppercase", color: "#333", marginBottom: 8 }}>{quickViewProduct.category}</p>
                <h3 className="sx-c" style={{ fontSize: "clamp(20px,3.5vw,34px)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: .9, letterSpacing: ".01em", marginBottom: 14 }}>{quickViewProduct.name}</h3>
                <p className="sx-c" style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 18 }}>${quickViewProduct.price}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.floor(quickViewProduct.rating) ? "#fff" : "none"} color={i < Math.floor(quickViewProduct.rating) ? "#fff" : "#2a2a2a"} />)}
                  </div>
                  <span className="sx-c" style={{ fontSize: 11, fontWeight: 700, color: "#444" }}>{quickViewProduct.rating}</span>
                </div>
                <div style={{ height: 1, background: "#141414", marginBottom: 18 }} />
                {(() => { const s = getStock(quickViewProduct.stock || 0); return <span className={`sx-badge ${s.cls}`} style={{ marginBottom: 22 }}><span style={{ width: 6, height: 6, background: s.dot, borderRadius: "50%" }} />{s.text}</span>; })()}
                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                  <button onClick={e => handleWishlist(quickViewProduct, e)}
                    className={`sx-ib${wishlist.some(p => p.productId === quickViewProduct.id) ? " on" : ""}`}
                    style={{ width: 46, height: 46, flexShrink: 0 }}>
                    <Heart size={16} strokeWidth={1.5} fill={wishlist.some(p => p.productId === quickViewProduct.id) ? "currentColor" : "none"} />
                  </button>
                  <button onClick={() => { navigate(`/Product/${quickViewProduct.id}`, { state: quickViewProduct }); setQuickViewProduct(null); }}
                    className="sx-btn-w" style={{ flex: 1, justifyContent: "center", padding: "13px 18px" }}>
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="sx-stb">
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}