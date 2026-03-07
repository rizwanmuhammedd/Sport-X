

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../Api/Axios_Instance";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { 
//   ShoppingBag, Award, Users, Package, 
//   Star, ArrowRight, ShieldCheck, Truck,
//   CreditCard, RefreshCw, Heart, Eye, 
//   ShoppingCart, Tag, Sparkles, Gift,
//   ChevronRight, Target, Trophy, Headphones,
//   Zap, ChevronLeft, ChevronRight as ChevronRightIcon
// } from "lucide-react";

// const useScrollFade = (id, threshold = 100) => {
//   const [visible, setVisible] = useState(false);
//   const timeoutRef = useRef(null);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (timeoutRef.current) clearTimeout(timeoutRef.current);
//         timeoutRef.current = setTimeout(() => { setVisible(entry.isIntersecting); }, 50);
//       },
//       { threshold: 0.1, rootMargin: `-${threshold}px` }
//     );
//     const element = document.getElementById(id);
//     if (element) observer.observe(element);
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       element && observer.unobserve(element);
//     };
//   }, [id, threshold]);
//   return visible;
// };

// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
//   };
// };

// export default function Home() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addToCart, cart } = useCart();
//   const { wishlist = [], toggleWishlist } = useWishlist();

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [recentlyAddedToCart, setRecentlyAddedToCart] = useState({});
//   const [slides, setSlides] = useState([]);
//   const slideIntervalRef = useRef(null);
//   const fetchTimeoutRef = useRef(null);

//   const debouncedSetSlide = useCallback(debounce((slideIndex) => { setCurrentSlide(slideIndex); }, 100), []);

//   const handleSlideChange = (index) => {
//     if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
//     debouncedSetSlide(index);
//     slideIntervalRef.current = setInterval(() => {
//       setCurrentSlide(prev => (prev + 1) % (slides.length || 4));
//     }, 4000);
//   };

//   useEffect(() => {
//     if (slides.length > 0) {
//       slideIntervalRef.current = setInterval(() => {
//         setCurrentSlide(prev => (prev + 1) % slides.length);
//       }, 4000);
//     }
//     return () => { if (slideIntervalRef.current) clearInterval(slideIntervalRef.current); };
//   }, [slides]);

//   const fetchProducts = useCallback(
//     debounce(async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/Products/featured");
//         const featuredProducts = res.data?.data || [];
//         setProducts(featuredProducts);
//         if (featuredProducts.length > 0) {
//           const slideProducts = featuredProducts.slice(0, 4);
//           const slideTags = ["BEST SELLER", "PREMIUM", "LIMITED", "NEW"];
//           setSlides(slideProducts.map((product, index) => ({
//             id: product.id, name: product.name, price: product.price,
//             image: product.imageUrl || "/placeholder.png",
//             tag: slideTags[index % slideTags.length],
//             description: product.description || "Premium quality product"
//           })));
//         } else {
//           setSlides([
//             { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png", tag: "BEST SELLER" },
//             { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png", tag: "PREMIUM" },
//             { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png", tag: "LIMITED" },
//             { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png", tag: "NEW" },
//           ]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch featured products:", err);
//         try {
//           const res = await api.get("/Products/User/GetAll");
//           const allProducts = res.data?.data || res.data || [];
//           setProducts(allProducts.slice(0, 6));
//           const slideProducts = allProducts.slice(0, 4);
//           const slideTags = ["BEST SELLER", "PREMIUM", "LIMITED", "NEW"];
//           setSlides(slideProducts.map((product, index) => ({
//             id: product.id, name: product.name, price: product.price,
//             image: product.imageUrl || product.image || "/placeholder.png",
//             tag: slideTags[index % slideTags.length],
//             description: product.description || "Premium quality product"
//           })));
//         } catch (fallbackErr) {
//           console.error("Fallback fetch also failed:", fallbackErr);
//           setProducts([]);
//           setSlides([
//             { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png", tag: "BEST SELLER" },
//             { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png", tag: "PREMIUM" },
//             { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png", tag: "LIMITED" },
//             { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png", tag: "NEW" },
//           ]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     }, 300), []
//   );

//   const fetchCategories = useCallback(
//     debounce(async () => {
//       try {
//         const res = await api.get("/Products/categories-list");
//         if (res.data.data && res.data.data.length > 0) {
//           const filteredCategories = res.data.data.filter(cat => cat !== "All").slice(0, 4);
//           setCategories([
//             { id: 1, name: filteredCategories[0] || "Football Shoes", image: "https://img.freepik.com/premium-photo/soccer-ball-referee-equipment-green-field_955834-26927.jpg?semt=ais_hybrid&w=740&q=80", description: "Performance Footwear", icon: <Target />, count: "200+ Items" },
//             { id: 2, name: filteredCategories[1] || "Team Jerseys", image: "https://w0.peakpx.com/wallpaper/1019/884/HD-wallpaper-champions-league-balls-football-sports.jpg", description: "Official Team Kits", icon: <Trophy />, count: "150+ Items" },
//             { id: 3, name: filteredCategories[2] || "Match Balls", image: "https://wallpapercave.com/wp/wp3736369.jpg", description: "Professional Quality", icon: <Package />, count: "80+ Items" },
//             { id: 4, name: filteredCategories[3] || "Goalkeeper Gear", image: "https://c1.wallpaperflare.com/preview/429/54/505/sport-football-sports-player.jpg", description: "Pro Grip Equipment", icon: <ShieldCheck />, count: "120+ Items" },
//           ]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//         setCategories([
//           { id: 1, name: "Football Shoes", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Performance Footwear", icon: <Target />, count: "200+ Items" },
//           { id: 2, name: "Team Jerseys", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Official Team Kits", icon: <Trophy />, count: "150+ Items" },
//           { id: 3, name: "Match Balls", image: "https://images.unsplash.com/photo-1614632537423-2cbeccc971c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Professional Quality", icon: <Package />, count: "80+ Items" },
//           { id: 4, name: "Goalkeeper Gear", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Pro Grip Equipment", icon: <ShieldCheck />, count: "120+ Items" },
//         ]);
//       }
//     }, 300), []
//   );

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//     return () => { if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current); };
//   }, [fetchProducts, fetchCategories]);
// const handleProductClick = useCallback(
//     debounce((item) => {
//       // ✅ Guests can view products — no login required
//       navigate(`/product/${item.id}`, { state: item });
//     }, 200), [navigate]
//   );

//   const handleBuyNow = useCallback(
//     debounce((item, e) => {
//       e?.stopPropagation();
//       if (!user) { navigate("/login"); return; }
//       navigate("/checkout", { state: { products: [{ ...item, quantity: 1 }], source: "buyNow" } });
//     }, 200), [user, navigate]
//   );

//   const handleAddToCart = useCallback(
//     async (item, e) => {
//       e?.stopPropagation();
//       if (!user) { navigate("/login"); return; }
//       try {
//         await addToCart(item, 1);
//         setRecentlyAddedToCart(prev => ({ ...prev, [item.id]: true }));
//         setTimeout(() => { setRecentlyAddedToCart(prev => ({ ...prev, [item.id]: false })); }, 2000);
//       } catch (error) { console.error("Failed to add to cart:", error); }
//     }, [user, navigate, addToCart]
//   );

//   const handleAddToWishlist = useCallback(
//     async (item, e) => {
//       e?.stopPropagation();
//       if (!user) { navigate("/login"); return; }
//       try { await toggleWishlist(item); } catch (err) { console.error("Wishlist error:", err); }
//     }, [user, navigate, toggleWishlist]
//   );

//   const isItemInCart = useCallback((productId) => cart.some(item => item.productId === productId), [cart]);
//   const isItemInWishlist = useCallback((productId) => wishlist.some(item => item.productId === productId), [wishlist]);

//   const handleCategoryClick = useCallback(
//     debounce((categoryName) => {
//       navigate(`/more-products?category=${encodeURIComponent(categoryName)}`);
//     }, 200), [navigate]
//   );

//   const handleSlideBuyNow = useCallback(
//     async (slide) => {
//       if (!user) { navigate("/login"); return; }
//       navigate("/checkout", { state: { products: [{ id: slide.id, name: slide.name, price: slide.price, image: slide.image, description: slide.description, quantity: 1 }], source: "slideBuyNow" } });
//     }, [user, navigate]
//   );

//   const stats = [
//     { number: "10K+", label: "Happy Customers", icon: <Users /> },
//     { number: "500+", label: "Premium Products", icon: <Package /> },
//     { number: "24/7", label: "Support Available", icon: <Headphones /> },
//     { number: "50+", label: "Brand Partners", icon: <Award /> }
//   ];

//   const features = [
//     { icon: <ShieldCheck />, title: "100% Authentic", desc: "Guaranteed genuine products" },
//     { icon: <Truck />, title: "Fast Shipping", desc: "2-5 day delivery with tracking" },
//     { icon: <CreditCard />, title: "Secure Payment", desc: "SSL encrypted & COD available" },
//     { icon: <RefreshCw />, title: "Easy Returns", desc: "30-day return policy" }
//   ];

//   const featuresVisible = useScrollFade("features");
//   const categoriesVisible = useScrollFade("categories");
//   const productsVisible = useScrollFade("products-grid");
//   const statsVisible = useScrollFade("stats");

//   return (
//     <div style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Barlow', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; }

//         .iLU-condensed { font-family: 'Barlow Condensed', sans-serif; }
//         .iLU-body      { font-family: 'Barlow', sans-serif; }

//         /* ── Ticker ── */
//         .ticker-wrap  { background:#fff; overflow:hidden; white-space:nowrap; border-bottom:1px solid #eee; }
//         .ticker-track { display:inline-flex; animation:ticker 30s linear infinite; }
//         .ticker-item  {
//           display:inline-flex; align-items:center; gap:20px;
//           padding:8px 36px;
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#000;
//         }
//         .ticker-dot { width:4px; height:4px; background:#000; border-radius:50%; flex-shrink:0; }
//         @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

//         /* ── Section label ── */
//         .section-label {
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:10px; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:#555;
//           display:flex; align-items:center; gap:12px;
//         }
//         .section-label::after { content:''; flex:1; height:1px; background:#222; }

//         /* ── Display heading ── */
//         .display-heading {
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:clamp(44px,10vw,110px);
//           font-weight:900; line-height:.9; text-transform:uppercase; letter-spacing:-.02em; color:#fff;
//         }
//         .display-heading .outline { -webkit-text-stroke:1px rgba(255,255,255,.25); color:transparent; }

//         /* ── Buttons ── */
//         .btn-primary {
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
//           background:#fff; color:#000; border:none; cursor:pointer; padding:12px 26px;
//           transition:background .15s; display:inline-flex; align-items:center; gap:8px; white-space:nowrap;
//         }
//         .btn-primary:hover { background:#e8e8e8; }

//         .btn-outline {
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
//           background:transparent; color:#fff; border:1px solid #333; cursor:pointer; padding:12px 26px;
//           transition:border-color .15s,background .15s; display:inline-flex; align-items:center; gap:8px; white-space:nowrap;
//         }
//         .btn-outline:hover { border-color:#666; background:#111; }

//         .btn-small {
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:11px; font-weight:800; letter-spacing:.18em; text-transform:uppercase;
//           background:#fff; color:#000; border:none; cursor:pointer; padding:9px 16px;
//           transition:background .15s; white-space:nowrap; flex-shrink:0;
//         }
//         .btn-small:hover { background:#e8e8e8; }

//         /* ── Product tag ── */
//         .product-tag {
//           font-family:'Barlow Condensed',sans-serif;
//           font-size:9px; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
//           background:#fff; color:#000; padding:3px 9px; display:inline-block;
//         }

//         /* ── Hero slide ── */
//         .hero-slide { position:absolute; inset:0; transition:opacity .8s ease,transform .8s ease; }
//         .hero-slide.active  { opacity:1; transform:scale(1); z-index:2; }
//         .hero-slide.inactive{ opacity:0; transform:scale(1.03); z-index:1; }

//         /* ── Slide dot ── */
//         .slide-dot { height:2px; background:#333; border:none; cursor:pointer; transition:all .3s ease; flex-shrink:0; padding:0; }
//         .slide-dot.active { background:#fff; }

//         /* ── Feature card ── */
//         .feature-card { border:1px solid #222; padding:28px 24px; transition:border-color .2s,background .2s; background:#000; }
//         .feature-card:hover { border-color:#444; background:#0d0d0d; }

//         /* ── Category card ── */
//         .category-card { position:relative; overflow:hidden; cursor:pointer; border:1px solid #222; transition:border-color .2s; }
//         .category-card:hover { border-color:#444; }
//         .category-card:hover .cat-img { transform:scale(1.05); }
//         .cat-img { transition:transform .6s ease; width:100%; height:100%; object-fit:cover; filter:grayscale(30%); display:block; }
//         .category-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.3) 50%,transparent 100%); }

//         /* ── Product card ── */
//         .product-card { background:#000; border:1px solid #222; cursor:pointer; transition:border-color .2s; position:relative; overflow:hidden; }
//         .product-card:hover { border-color:#444; }
//         .product-card:hover .product-img { transform:scale(1.06); }
//         .product-img { transition:transform .5s ease; }

//         .product-actions { position:absolute; top:10px; right:10px; display:flex; flex-direction:column; gap:6px; opacity:0; transition:opacity .2s ease; }
//         .product-card:hover .product-actions { opacity:1; }

//         .icon-action {
//           width:34px; height:34px; background:#000; border:1px solid #333;
//           display:flex; align-items:center; justify-content:center;
//           cursor:pointer; transition:background .15s,border-color .15s; color:#999;
//         }
//         .icon-action:hover,.icon-action.active-wish { background:#fff; color:#000; border-color:#fff; }

//         .cart-action {
//           width:36px; height:36px; background:#1a1a1a; border:1px solid #2e2e2e;
//           display:flex; align-items:center; justify-content:center;
//           cursor:pointer; transition:background .15s,border-color .15s; color:#666; flex-shrink:0;
//         }
//         .cart-action:hover,.cart-action.in-cart { background:#fff; color:#000; border-color:#fff; }

//         /* ── Divider ── */
//         .full-divider { border:none; border-top:1px solid #222; margin:0; }

//         /* ── Scroll fade ── */
//         .scroll-section { transition:opacity .8s ease,transform .8s ease; }
//         .scroll-visible { opacity:1 !important; transform:translateY(0) !important; }
//         .scroll-hidden  { opacity:0; transform:translateY(24px); }

//         @keyframes spin { to{transform:rotate(360deg)} }

//         /* ══════════════════════════════
//            LAYOUT GRIDS
//         ══════════════════════════════ */

//         .hero-grid       { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
//         .features-grid   { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#222; }
//         .categories-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#222; }
//         .products-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#222; }
//         .stats-grid      { display:grid; grid-template-columns:repeat(4,1fr); }

//         .section-header-row {
//           display:flex; align-items:flex-end; justify-content:space-between;
//           flex-wrap:wrap; gap:16px; margin-bottom:40px;
//         }
//         .hero-inner  { position:relative; z-index:10; width:100%; max-width:1280px; margin:0 auto; padding:110px 32px 72px; }
//         .section-pad { padding:72px 0; }
//         .section-inner { max-width:1280px; margin:0 auto; padding:0 32px; }

//         /* ── Tablet ≤ 1024px ── */
//         @media(max-width:1024px){
//           .features-grid   { grid-template-columns:repeat(2,1fr); }
//           .categories-grid { grid-template-columns:repeat(2,1fr); }
//           .products-grid   { grid-template-columns:repeat(2,1fr); }
//           .stats-grid      { grid-template-columns:repeat(2,1fr); }
//           .stat-cell       { border-right:none !important; border-bottom:1px solid #222; }
//           .stat-cell:nth-child(odd)   { border-right:1px solid #222 !important; }
//           .stat-cell:nth-last-child(-n+2){ border-bottom:none; }
//         }

//         /* ── Mobile ≤ 768px ── */
//         @media(max-width:768px){
//           .hero-grid       { grid-template-columns:1fr; gap:36px; }
//           .hero-inner      { padding:84px 20px 56px; }
//           .features-grid   { grid-template-columns:1fr; }
//           .categories-grid { grid-template-columns:repeat(2,1fr); }
//           .products-grid   { grid-template-columns:repeat(2,1fr); }
//           .section-pad     { padding:52px 0; }
//           .section-inner   { padding:0 20px; }
//           .section-header-row { margin-bottom:28px; }
//           .hide-mobile     { display:none !important; }
//           .show-mobile     { display:flex !important; }
//         }

//         /* ── Small mobile ≤ 480px ── */
//         @media(max-width:480px){
//           .categories-grid { grid-template-columns:1fr; }
//           .products-grid   { grid-template-columns:1fr; }
//           .hero-inner      { padding:80px 16px 48px; }
//           .section-inner   { padding:0 16px; }
//           .section-header-row { flex-direction:column; align-items:flex-start; }
//           .hide-small      { display:none !important; }
//         }
//       `}</style>

//       {/* ── Ticker ── */}
//       <div className="ticker-wrap">
//         <div className="ticker-track">
//           {[...Array(2)].map((_, r) =>
//             ["FREE SHIPPING ON ORDERS OVER $150","NEW SEASON DROP NOW LIVE","PREMIUM FOOTBALL GEAR","OFFICIAL LICENSED PRODUCTS","30-DAY RETURNS","WORLDWIDE DELIVERY"].map((text, i) => (
//               <span key={`${r}-${i}`} className="ticker-item">
//                 <span className="ticker-dot"/> {text}
//               </span>
//             ))
//           )}
//         </div>
//       </div>

//       {/* ── HERO ── */}
//       <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', borderBottom:'1px solid #222' }}>
        
//         {/* BG slides */}
//         <div style={{ position:'absolute', inset:0, zIndex:0 }}>
//           {slides.map((slide, i) => (
//             <div key={slide.id} className={`hero-slide ${i===currentSlide?'active':'inactive'}`}>
//               <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,rgba(0,0,0,.97) 45%,rgba(0,0,0,.5) 75%,rgba(0,0,0,.15) 100%)' }}/>
//               <img src={slide.image} alt={slide.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center right', opacity:.35, filter:'grayscale(20%)' }}/>
//             </div>
//           ))}
//         </div>

//         <div className="hero-inner">
//           <div className="hero-grid">

//             {/* Left */}
//             <div>
//               <div className="section-label" style={{ marginBottom:18 }}>Sport-X Collection</div>
//               <div className="display-heading" style={{ marginBottom:18 }}>
//                 <span style={{ display:'block' }}>Play</span>
//                 <span style={{ display:'block' }} className="outline">Like A</span>
//                 <span style={{ display:'block' }}>Champion</span>
//               </div>
//               <p className="iLU-body" style={{ color:'#666', fontSize:15, lineHeight:1.7, maxWidth:420, marginBottom:28 }}>
//                 Premium football equipment for players who demand more. From amateur leagues to professional arenas.
//               </p>
//               <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
//                 <button className="btn-primary" onClick={() => navigate("/more-products")}>
//                   <ShoppingBag size={14} strokeWidth={2}/> Shop Now
//                 </button>
//                 <button className="btn-outline" onClick={() => document.getElementById("products-grid")?.scrollIntoView({ behavior:"smooth" })}>
//                   <Gift size={14} strokeWidth={2}/> Featured Drops
//                 </button>
//               </div>
//             </div>

//             {/* Right: product card */}
//             <div>
//               <div style={{ position:'relative', background:'#0d0d0d', border:'1px solid #222', padding:'32px 24px 22px' }}>
//                 {slides[currentSlide] && (
//                   <div style={{ marginBottom:18, display:'flex', alignItems:'center', gap:12 }}>
//                     <span className="product-tag">{slides[currentSlide].tag}</span>
//                     <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#555' }}>
//                       {currentSlide+1} / {slides.length}
//                     </span>
//                   </div>
//                 )}

//                 <div
//                   onClick={() => slides[currentSlide] && navigate(`/product/${slides[currentSlide].id}`)}
//                   style={{ height:260, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', marginBottom:18, position:'relative', overflow:'hidden' }}
//                 >
//                   {slides.map((slide, i) => (
//                     <img key={slide.id} src={slide.image} alt={slide.name}
//                       style={{
//                         position:'absolute', maxHeight:'90%', maxWidth:'90%', objectFit:'contain',
//                         transition:'opacity .6s ease,transform .6s ease',
//                         opacity: i===currentSlide?1:0,
//                         transform: i===currentSlide?'scale(1)':'scale(.94)',
//                         filter:'drop-shadow(0 20px 40px rgba(0,0,0,.6))'
//                       }}
//                     />
//                   ))}
//                 </div>

//                 {slides[currentSlide] && (
//                   <>
//                     <hr className="full-divider" style={{ marginBottom:14 }}/>
//                     <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
//                       <div style={{ minWidth:0, flex:1 }}>
//                         <p className="iLU-condensed" style={{ fontSize:15, fontWeight:800, letterSpacing:'.05em', textTransform:'uppercase', color:'#fff', lineHeight:1.1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
//                           {slides[currentSlide].name}
//                         </p>
//                         <p className="iLU-condensed" style={{ fontSize:22, fontWeight:900, color:'#fff', marginTop:3 }}>
//                           ${slides[currentSlide].price}
//                         </p>
//                       </div>
//                       <button className="btn-small" onClick={() => handleSlideBuyNow(slides[currentSlide])}>Buy Now</button>
//                     </div>
//                   </>
//                 )}

//                 <div style={{ display:'flex', gap:6, marginTop:14 }}>
//                   {slides.map((_,i) => (
//                     <button key={i} onClick={() => handleSlideChange(i)}
//                       className={`slide-dot ${i===currentSlide?'active':''}`}
//                       style={{ width: i===currentSlide?28:14 }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURES ── */}
//       <section id="features" className={`scroll-section section-pad ${featuresVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
//         <div className="section-inner">
//           <div style={{ marginBottom:36 }}>
//             <div className="section-label" style={{ marginBottom:12 }}>Why Sport-X</div>
//             <h2 className="iLU-condensed" style={{ fontSize:'clamp(26px,5vw,52px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>
//               Built For Performance
//             </h2>
//           </div>
//           <div className="features-grid">
//             {features.map((feat, i) => (
//               <div key={i} className="feature-card">
//                 <div style={{ marginBottom:14, color:'#555' }}>{feat.icon}</div>
//                 <h3 className="iLU-condensed" style={{ fontSize:16, fontWeight:800, textTransform:'uppercase', letterSpacing:'.08em', color:'#fff', marginBottom:6 }}>
//                   {feat.title}
//                 </h3>
//                 <p className="iLU-body" style={{ color:'#555', fontSize:13, lineHeight:1.6 }}>{feat.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CATEGORIES ── */}
//       <section id="categories" className={`scroll-section section-pad ${categoriesVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
//         <div className="section-inner">
//           <div className="section-header-row">
//             <div>
//               <div className="section-label" style={{ marginBottom:12 }}>Browse</div>
//               <h2 className="iLU-condensed" style={{ fontSize:'clamp(26px,5vw,52px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>
//                 Shop By Category
//               </h2>
//             </div>
//             <button className="btn-outline hide-mobile" onClick={() => navigate("/more-products")} style={{ padding:'10px 22px' }}>
//               View All <ArrowRight size={13} strokeWidth={2}/>
//             </button>
//           </div>
//           <div className="categories-grid">
//             {categories.map(cat => (
//               <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat.name)}>
//                 <div style={{ height:200, overflow:'hidden', position:'relative' }}>
//                   <img src={cat.image} alt={cat.name} className="cat-img"/>
//                   <div className="category-overlay"/>
//                   <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px' }}>
//                     <p className="iLU-condensed" style={{ fontSize:17, fontWeight:800, textTransform:'uppercase', letterSpacing:'.05em', color:'#fff', lineHeight:1.1, marginBottom:4 }}>
//                       {cat.name}
//                     </p>
//                     <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//                       <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'#888' }}>{cat.count}</span>
//                       <ArrowRight size={13} color="#666" strokeWidth={2}/>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* Mobile view all */}
//           <div style={{ marginTop:20, display:'none', justifyContent:'center' }} className="show-mobile" id="cat-view-all-mobile">
//             <button className="btn-outline" onClick={() => navigate("/more-products")} style={{ padding:'10px 22px' }}>
//               View All <ArrowRight size={13} strokeWidth={2}/>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURED PRODUCTS ── */}
//       <section id="products-grid" className={`scroll-section section-pad ${productsVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
//         <div className="section-inner">
//           <div className="section-header-row">
//             <div>
//               <div className="section-label" style={{ marginBottom:12 }}>Top Picks</div>
//               <h2 className="iLU-condensed" style={{ fontSize:'clamp(26px,5vw,52px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>
//                 Featured Products
//               </h2>
//             </div>
//             <button className="btn-outline hide-mobile" onClick={() => navigate("/more-products")} style={{ padding:'10px 22px' }}>
//               View All <ArrowRight size={13} strokeWidth={2}/>
//             </button>
//           </div>

//           {loading ? (
//             <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'72px 0' }}>
//               <div style={{ width:44, height:44, border:'2px solid #222', borderTop:'2px solid #fff', borderRadius:'50%', animation:'spin .8s linear infinite' }}/>
//             </div>
//           ) : (
//             <>
//               <div className="products-grid">
//                 {products.map(item => {
//                   const isInWishlist = isItemInWishlist(item.id);
//                   const isInCart     = isItemInCart(item.id);
//                   const wasRecentlyAdded = recentlyAddedToCart[item.id];
//                   return (
//                     <div key={item.id} className="product-card" onClick={() => handleProductClick(item)}>
//                       {/* Image */}
//                       <div style={{ position:'relative', height:250, background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'20px' }}>
//                         <img
//                           src={item.imageUrl||item.image||"/placeholder.png"} alt={item.name}
//                           className="product-img"
//                           style={{ maxHeight:200, maxWidth:'100%', objectFit:'contain', filter:'drop-shadow(0 10px 30px rgba(0,0,0,.5))' }}
//                         />
//                         <div className="product-actions">
//                           <button onClick={(e)=>handleAddToWishlist(item,e)} className={`icon-action ${isInWishlist?'active-wish':''}`}>
//                             <Heart size={14} strokeWidth={1.5} fill={isInWishlist?'currentColor':'none'}/>
//                           </button>
//                           <button onClick={(e)=>{e.stopPropagation();handleProductClick(item);}} className="icon-action">
//                             <Eye size={14} strokeWidth={1.5}/>
//                           </button>
//                         </div>
//                         <div style={{ position:'absolute', top:10, left:10 }}>
//                           <span className="product-tag">In Stock</span>
//                         </div>
//                       </div>

//                       {/* Info */}
//                       <div style={{ padding:'15px 15px 18px', borderTop:'1px solid #1a1a1a' }}>
//                         <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:5, gap:8 }}>
//                           <h3 className="iLU-condensed" style={{ fontSize:15, fontWeight:800, textTransform:'uppercase', letterSpacing:'.04em', color:'#fff', lineHeight:1.1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>
//                             {item.name}
//                           </h3>
//                           <div style={{ display:'flex', alignItems:'center', gap:3, flexShrink:0 }}>
//                             <Star size={10} fill="#fff" color="#fff"/>
//                             <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, color:'#666' }}>4.5</span>
//                           </div>
//                         </div>
//                         <p className="iLU-body" style={{ color:'#444', fontSize:12, lineHeight:1.5, marginBottom:13, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
//                           {item.description||"Premium quality product"}
//                         </p>
//                         <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
//                           <div>
//                             <p className="iLU-condensed" style={{ fontSize:20, fontWeight:900, color:'#fff', lineHeight:1 }}>
//                               ${Number(item.price).toFixed(2)}
//                             </p>
//                             {item.originalPrice && (
//                               <p className="iLU-body" style={{ fontSize:11, color:'#444', textDecoration:'line-through', marginTop:2 }}>
//                                 ${Number(item.originalPrice).toFixed(2)}
//                               </p>
//                             )}
//                           </div>
//                           <div style={{ display:'flex', gap:6, flexShrink:0 }}>
//                             <button
//                               onClick={(e)=>{ if(isInCart){e.stopPropagation();navigate("/cart");}else{handleAddToCart(item,e);} }}
//                               className={`cart-action ${isInCart||wasRecentlyAdded?'in-cart':''}`}
//                             >
//                               <ShoppingCart size={14} strokeWidth={1.5}/>
//                             </button>
//                             <button onClick={(e)=>handleBuyNow(item,e)} className="btn-small">Buy Now</button>
//                           </div>
//                         </div>
//                         {(isInCart||wasRecentlyAdded) && (
//                           <div style={{ marginTop:8 }}>
//                             {wasRecentlyAdded ? (
//                               <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>✓ Added to cart</span>
//                             ) : isInCart ? (
//                               <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#888', display:'flex', alignItems:'center', gap:5, flexWrap:'wrap' }}>
//                                 ✓ In cart ·{' '}
//                                 <button onClick={(e)=>{e.stopPropagation();navigate("/cart");}}
//                                   style={{ background:'none', border:'none', cursor:'pointer', color:'#fff', fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', textDecoration:'underline', padding:0 }}>
//                                   View Cart
//                                 </button>
//                               </span>
//                             ) : null}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div style={{ textAlign:'center', marginTop:40 }}>
//                 <button className="btn-outline" onClick={() => navigate("/more-products")}>
//                   View All Products <ArrowRight size={13} strokeWidth={2}/>
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </section>

//       {/* ── STATS ── */}
//       <section id="stats" className={`scroll-section ${statsVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
//         <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
//           <div className="stats-grid">
//             {stats.map((stat, i) => (
//               <div key={i} className="stat-cell" style={{ textAlign:'center', padding:'40px 16px', borderRight: i<stats.length-1?'1px solid #222':'none' }}>
//                 <div style={{ color:'#333', marginBottom:12, display:'flex', justifyContent:'center' }}>{stat.icon}</div>
//                 <div className="iLU-condensed" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, color:'#fff', lineHeight:1, marginBottom:6 }}>
//                   {stat.number}
//                 </div>
//                 <div className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#555' }}>
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Watermark tagline ── */}
//       <section style={{ padding:'48px 24px', textAlign:'center', background:'#000', overflow:'hidden' }}>
//         <p className="iLU-condensed" style={{ fontSize:'clamp(22px,6vw,72px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#1a1a1a', lineHeight:1, whiteSpace:'nowrap' }}>
//           Premium Football Gear · Est. 2024 · Sport-X
//         </p>
//       </section>
//     </div>
//   );
// }












import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { 
  ShoppingBag, Award, Users, Package, 
  Star, ArrowRight, ShieldCheck, Truck,
  CreditCard, RefreshCw, Heart, Eye, 
  ShoppingCart, Gift, X,
  ChevronRight, Target, Trophy, Headphones,
} from "lucide-react";

const useScrollFade = (id, threshold = 100) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => { setVisible(entry.isIntersecting); }, 50);
      },
      { threshold: 0.1, rootMargin: `-${threshold}px` }
    );
    const element = document.getElementById(id);
    if (element) observer.observe(element);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      element && observer.unobserve(element);
    };
  }, [id, threshold]);
  return visible;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
  };
};

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const { wishlist = [], toggleWishlist } = useWishlist();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [recentlyAddedToCart, setRecentlyAddedToCart] = useState({});
  const [slides, setSlides] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState("");
  const slideIntervalRef = useRef(null);
  const fetchTimeoutRef = useRef(null);
  const videoRef = useRef(null);

  // ── Listen for logo click event from Navbar ──────────────────────────
 useEffect(() => {
  const handler = () => {
    const random = Math.floor(Math.random() * 3) + 1;
    setModalVideoSrc(`/videos/hero${random}.mp4`);
    setShowVideoModal(true);
  };
  window.addEventListener("sportx-logo-click", handler);
  return () => window.removeEventListener("sportx-logo-click", handler);
}, []);
  // ── Pause/play video with modal ───────────────────────────────────────
  useEffect(() => {
    if (showVideoModal) {
      document.body.style.overflow = "hidden";
      setTimeout(() => { videoRef.current?.play(); }, 100);
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
    return () => { document.body.style.overflow = ""; };
  }, [showVideoModal]);

  // ── Close on Escape ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setShowVideoModal(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const debouncedSetSlide = useCallback(debounce((slideIndex) => { setCurrentSlide(slideIndex); }, 100), []);

  const handleSlideChange = (index) => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    debouncedSetSlide(index);
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (slides.length || 4));
    }, 4000);
  };

  useEffect(() => {
    if (slides.length > 0) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 4000);
    }
    return () => { if (slideIntervalRef.current) clearInterval(slideIntervalRef.current); };
  }, [slides]);

  const fetchProducts = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        const res = await api.get("/Products/featured");
        const featuredProducts = res.data?.data || [];
        setProducts(featuredProducts);
        if (featuredProducts.length > 0) {
          const slideProducts = featuredProducts.slice(0, 4);
          const slideTags = ["BEST SELLER", "PREMIUM", "LIMITED", "NEW"];
          setSlides(slideProducts.map((product, index) => ({
            id: product.id, name: product.name, price: product.price,
            image: product.imageUrl || "/placeholder.png",
            tag: slideTags[index % slideTags.length],
            description: product.description || "Premium quality product"
          })));
        } else {
          setSlides([
            { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png", tag: "BEST SELLER" },
            { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png", tag: "PREMIUM" },
            { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png", tag: "LIMITED" },
            { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png", tag: "NEW" },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        try {
          const res = await api.get("/Products/User/GetAll");
          const allProducts = res.data?.data || res.data || [];
          setProducts(allProducts.slice(0, 6));
          const slideProducts = allProducts.slice(0, 4);
          const slideTags = ["BEST SELLER", "PREMIUM", "LIMITED", "NEW"];
          setSlides(slideProducts.map((product, index) => ({
            id: product.id, name: product.name, price: product.price,
            image: product.imageUrl || product.image || "/placeholder.png",
            tag: slideTags[index % slideTags.length],
            description: product.description || "Premium quality product"
          })));
        } catch (fallbackErr) {
          console.error("Fallback fetch also failed:", fallbackErr);
          setProducts([]);
          setSlides([
            { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png", tag: "BEST SELLER" },
            { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png", tag: "PREMIUM" },
            { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png", tag: "LIMITED" },
            { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png", tag: "NEW" },
          ]);
        }
      } finally {
        setLoading(false);
      }
    }, 300), []
  );

  const fetchCategories = useCallback(
    debounce(async () => {
      try {
        const res = await api.get("/Products/categories-list");
        if (res.data.data && res.data.data.length > 0) {
          const filteredCategories = res.data.data.filter(cat => cat !== "All").slice(0, 4);
          setCategories([
            { id: 1, name: filteredCategories[0] || "Football Shoes", image: "https://img.freepik.com/premium-photo/soccer-ball-referee-equipment-green-field_955834-26927.jpg?semt=ais_hybrid&w=740&q=80", description: "Performance Footwear", icon: <Target />, count: "200+ Items" },
            { id: 2, name: filteredCategories[1] || "Team Jerseys", image: "https://w0.peakpx.com/wallpaper/1019/884/HD-wallpaper-champions-league-balls-football-sports.jpg", description: "Official Team Kits", icon: <Trophy />, count: "150+ Items" },
            { id: 3, name: filteredCategories[2] || "Match Balls", image: "https://wallpapercave.com/wp/wp3736369.jpg", description: "Professional Quality", icon: <Package />, count: "80+ Items" },
            { id: 4, name: filteredCategories[3] || "Goalkeeper Gear", image: "https://c1.wallpaperflare.com/preview/429/54/505/sport-football-sports-player.jpg", description: "Pro Grip Equipment", icon: <ShieldCheck />, count: "120+ Items" },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([
          { id: 1, name: "Football Shoes", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Performance Footwear", icon: <Target />, count: "200+ Items" },
          { id: 2, name: "Team Jerseys", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Official Team Kits", icon: <Trophy />, count: "150+ Items" },
          { id: 3, name: "Match Balls", image: "https://images.unsplash.com/photo-1614632537423-2cbeccc971c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Professional Quality", icon: <Package />, count: "80+ Items" },
          { id: 4, name: "Goalkeeper Gear", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Pro Grip Equipment", icon: <ShieldCheck />, count: "120+ Items" },
        ]);
      }
    }, 300), []
  );

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    return () => { if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current); };
  }, [fetchProducts, fetchCategories]);

  const handleProductClick = useCallback(
    debounce((item) => {
      navigate(`/product/${item.id}`, { state: item });
    }, 200), [navigate]
  );

  const handleBuyNow = useCallback(
    debounce((item, e) => {
      e?.stopPropagation();
      if (!user) { navigate("/login"); return; }
      navigate("/checkout", { state: { products: [{ ...item, quantity: 1 }], source: "buyNow" } });
    }, 200), [user, navigate]
  );

  const handleAddToCart = useCallback(
    async (item, e) => {
      e?.stopPropagation();
      if (!user) { navigate("/login"); return; }
      try {
        await addToCart(item, 1);
        setRecentlyAddedToCart(prev => ({ ...prev, [item.id]: true }));
        setTimeout(() => { setRecentlyAddedToCart(prev => ({ ...prev, [item.id]: false })); }, 2000);
      } catch (error) { console.error("Failed to add to cart:", error); }
    }, [user, navigate, addToCart]
  );

  const handleAddToWishlist = useCallback(
    async (item, e) => {
      e?.stopPropagation();
      if (!user) { navigate("/login"); return; }
      try { await toggleWishlist(item); } catch (err) { console.error("Wishlist error:", err); }
    }, [user, navigate, toggleWishlist]
  );

  const isItemInCart = useCallback((productId) => cart.some(item => item.productId === productId), [cart]);
  const isItemInWishlist = useCallback((productId) => wishlist.some(item => item.productId === productId), [wishlist]);

  const handleCategoryClick = useCallback(
    debounce((categoryName) => {
      navigate(`/more-products?category=${encodeURIComponent(categoryName)}`);
    }, 200), [navigate]
  );

  const handleSlideBuyNow = useCallback(
    async (slide) => {
      if (!user) { navigate("/login"); return; }
      navigate("/checkout", { state: { products: [{ id: slide.id, name: slide.name, price: slide.price, image: slide.image, description: slide.description, quantity: 1 }], source: "slideBuyNow" } });
    }, [user, navigate]
  );

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: <Users /> },
    { number: "500+", label: "Premium Products", icon: <Package /> },
    { number: "24/7", label: "Support Available", icon: <Headphones /> },
    { number: "50+", label: "Brand Partners", icon: <Award /> }
  ];

  const features = [
    { icon: <ShieldCheck />, title: "100% Authentic", desc: "Guaranteed genuine products" },
    { icon: <Truck />, title: "Fast Shipping", desc: "2-5 day delivery with tracking" },
    { icon: <CreditCard />, title: "Secure Payment", desc: "SSL encrypted & COD available" },
    { icon: <RefreshCw />, title: "Easy Returns", desc: "30-day return policy" }
  ];

  const featuresVisible = useScrollFade("features");
  const categoriesVisible = useScrollFade("categories");
  const productsVisible = useScrollFade("products-grid");
  const statsVisible = useScrollFade("stats");

  return (
    <div style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Barlow', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .iLU-condensed { font-family: 'Barlow Condensed', sans-serif; }
        .iLU-body      { font-family: 'Barlow', sans-serif; }
        .ticker-wrap  { background:#fff; overflow:hidden; white-space:nowrap; border-bottom:1px solid #eee; }
        .ticker-track { display:inline-flex; animation:ticker 30s linear infinite; }
        .ticker-item  { display:inline-flex; align-items:center; gap:20px; padding:8px 36px; font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#000; }
        .ticker-dot { width:4px; height:4px; background:#000; border-radius:50%; flex-shrink:0; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .section-label { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:#555; display:flex; align-items:center; gap:12px; }
        .section-label::after { content:''; flex:1; height:1px; background:#222; }
        .display-heading { font-family:'Barlow Condensed',sans-serif; font-size:clamp(44px,10vw,110px); font-weight:900; line-height:.9; text-transform:uppercase; letter-spacing:-.02em; color:#fff; }
        .display-heading .outline { -webkit-text-stroke:1px rgba(255,255,255,.25); color:transparent; }
        .btn-primary { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; background:#fff; color:#000; border:none; cursor:pointer; padding:12px 26px; transition:background .15s; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; }
        .btn-primary:hover { background:#e8e8e8; }
        .btn-outline { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; background:transparent; color:#fff; border:1px solid #333; cursor:pointer; padding:12px 26px; transition:border-color .15s,background .15s; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; }
        .btn-outline:hover { border-color:#666; background:#111; }
        .btn-small { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; background:#fff; color:#000; border:none; cursor:pointer; padding:9px 16px; transition:background .15s; white-space:nowrap; flex-shrink:0; }
        .btn-small:hover { background:#e8e8e8; }
        .product-tag { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:800; letter-spacing:.2em; text-transform:uppercase; background:#fff; color:#000; padding:3px 9px; display:inline-block; }
        .hero-slide { position:absolute; inset:0; transition:opacity .8s ease,transform .8s ease; }
        .hero-slide.active  { opacity:1; transform:scale(1); z-index:2; }
        .hero-slide.inactive{ opacity:0; transform:scale(1.03); z-index:1; }
        .slide-dot { height:2px; background:#333; border:none; cursor:pointer; transition:all .3s ease; flex-shrink:0; padding:0; }
        .slide-dot.active { background:#fff; }
        .feature-card { border:1px solid #222; padding:28px 24px; transition:border-color .2s,background .2s; background:#000; }
        .feature-card:hover { border-color:#444; background:#0d0d0d; }
        .category-card { position:relative; overflow:hidden; cursor:pointer; border:1px solid #222; transition:border-color .2s; }
        .category-card:hover { border-color:#444; }
        .category-card:hover .cat-img { transform:scale(1.05); }
        .cat-img { transition:transform .6s ease; width:100%; height:100%; object-fit:cover; filter:grayscale(30%); display:block; }
        .category-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.3) 50%,transparent 100%); }
        .product-card { background:#000; border:1px solid #222; cursor:pointer; transition:border-color .2s; position:relative; overflow:hidden; }
        .product-card:hover { border-color:#444; }
        .product-card:hover .product-img { transform:scale(1.06); }
        .product-img { transition:transform .5s ease; }
        .product-actions { position:absolute; top:10px; right:10px; display:flex; flex-direction:column; gap:6px; opacity:0; transition:opacity .2s ease; }
        .product-card:hover .product-actions { opacity:1; }
        .icon-action { width:34px; height:34px; background:#000; border:1px solid #333; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s,border-color .15s; color:#999; }
        .icon-action:hover,.icon-action.active-wish { background:#fff; color:#000; border-color:#fff; }
        .cart-action { width:36px; height:36px; background:#1a1a1a; border:1px solid #2e2e2e; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s,border-color .15s; color:#666; flex-shrink:0; }
        .cart-action:hover,.cart-action.in-cart { background:#fff; color:#000; border-color:#fff; }
        .full-divider { border:none; border-top:1px solid #222; margin:0; }
        .scroll-section { transition:opacity .8s ease,transform .8s ease; }
        .scroll-visible { opacity:1 !important; transform:translateY(0) !important; }
        .scroll-hidden  { opacity:0; transform:translateY(24px); }
        @keyframes spin { to{transform:rotate(360deg)} }

        /* ── Video Modal ── */
        .vm-backdrop {
          position:fixed; inset:0; z-index:1000;
          background:rgba(0,0,0,0.97);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          animation: vm-in .25s ease;
        }
        @keyframes vm-in { from{opacity:0} to{opacity:1} }
        .vm-close {
          position:absolute; top:20px; right:20px;
          width:44px; height:44px;
          background:transparent; border:1px solid #2a2a2a; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          color:#666; transition:color .15s, border-color .15s;
          font-family:'Barlow Condensed',sans-serif;
        }
        .vm-close:hover { color:#fff; border-color:#555; }
        .vm-video {
          width:90vw; max-width:960px;
          aspect-ratio:16/9;
          background:#0a0a0a;
          border:1px solid #1e1e1e;
          outline:none;
        }
        .vm-label {
          font-family:'Barlow Condensed',sans-serif;
          font-size:10px; font-weight:700; letter-spacing:.28em; text-transform:uppercase;
          color:#333; margin-bottom:16px;
        }
        .vm-actions {
          display:flex; gap:12px; margin-top:28px; flex-wrap:wrap; justify-content:center;
        }
        .vm-btn-primary {
          font-family:'Barlow Condensed',sans-serif;
          font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
          background:#fff; color:#000; border:none; cursor:pointer; padding:13px 32px;
          transition:background .15s; display:inline-flex; align-items:center; gap:8px;
        }
        .vm-btn-primary:hover { background:#e8e8e8; }
        .vm-btn-outline {
          font-family:'Barlow Condensed',sans-serif;
          font-size:12px; font-weight:800; letter-spacing:.2em; text-transform:uppercase;
          background:transparent; color:#fff; border:1px solid #333; cursor:pointer; padding:13px 32px;
          transition:border-color .15s,background .15s; display:inline-flex; align-items:center; gap:8px;
        }
        .vm-btn-outline:hover { border-color:#666; background:#111; }

        .hero-grid       { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
        .features-grid   { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#222; }
        .categories-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#222; }
        .products-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#222; }
        .stats-grid      { display:grid; grid-template-columns:repeat(4,1fr); }
        .section-header-row { display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:16px; margin-bottom:40px; }
        .hero-inner  { position:relative; z-index:10; width:100%; max-width:1280px; margin:0 auto; padding:110px 32px 72px; }
        .section-pad { padding:72px 0; }
        .section-inner { max-width:1280px; margin:0 auto; padding:0 32px; }
        @media(max-width:1024px){
          .features-grid { grid-template-columns:repeat(2,1fr); }
          .categories-grid { grid-template-columns:repeat(2,1fr); }
          .products-grid { grid-template-columns:repeat(2,1fr); }
          .stats-grid { grid-template-columns:repeat(2,1fr); }
          .stat-cell { border-right:none !important; border-bottom:1px solid #222; }
          .stat-cell:nth-child(odd) { border-right:1px solid #222 !important; }
          .stat-cell:nth-last-child(-n+2){ border-bottom:none; }
        }
        @media(max-width:768px){
          .hero-grid { grid-template-columns:1fr; gap:36px; }
          .hero-inner { padding:84px 20px 56px; }
          .features-grid { grid-template-columns:1fr; }
          .categories-grid { grid-template-columns:repeat(2,1fr); }
          .products-grid { grid-template-columns:repeat(2,1fr); }
          .section-pad { padding:52px 0; }
          .section-inner { padding:0 20px; }
          .section-header-row { margin-bottom:28px; }
          .hide-mobile { display:none !important; }
          .show-mobile { display:flex !important; }
          .vm-video { width:95vw; }
        }
        @media(max-width:480px){
          .categories-grid { grid-template-columns:1fr; }
          .products-grid { grid-template-columns:1fr; }
          .hero-inner { padding:80px 16px 48px; }
          .section-inner { padding:0 16px; }
          .section-header-row { flex-direction:column; align-items:flex-start; }
          .hide-small { display:none !important; }
        }
      `}</style>

      {/* ── VIDEO MODAL ── */}
      {showVideoModal && (
        <div className="vm-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowVideoModal(false); }}>
          <button className="vm-close" onClick={() => setShowVideoModal(false)}>
            <X size={16} strokeWidth={1.5} />
          </button>

          <p className="vm-label">Sport-X · Official</p>

 <video
  ref={videoRef}
  className="vm-video"
  src={modalVideoSrc}
  autoPlay
  playsInline
  muted
  loop
  style={{
    width:'60vw', maxWidth:'640px',
    aspectRatio:'16/9',
    objectFit:'cover',
    display:'block',
    border:'1px solid #1e1e1e',
    outline:'none',
  }}
/>

          {/* CTA buttons — only shown to guests */}
          {!user && (
            <div className="vm-actions">
              <button className="vm-btn-primary" onClick={() => { setShowVideoModal(false); navigate("/register"); }}>
                <ChevronRight size={14} strokeWidth={2} /> Create Account
              </button>
              <button className="vm-btn-outline" onClick={() => { setShowVideoModal(false); navigate("/login"); }}>
                Sign In
              </button>
            </div>
          )}

          {/* Logged in — just a shop button */}
          {user && (
            <div className="vm-actions">
              <button className="vm-btn-primary" onClick={() => { setShowVideoModal(false); navigate("/more-products"); }}>
                <ShoppingBag size={14} strokeWidth={2} /> Shop Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Ticker ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...Array(2)].map((_, r) =>
            ["FREE SHIPPING ON ORDERS OVER $150","NEW SEASON DROP NOW LIVE","PREMIUM FOOTBALL GEAR","OFFICIAL LICENSED PRODUCTS","30-DAY RETURNS","WORLDWIDE DELIVERY"].map((text, i) => (
              <span key={`${r}-${i}`} className="ticker-item">
                <span className="ticker-dot"/> {text}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', borderBottom:'1px solid #222' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          {slides.map((slide, i) => (
            <div key={slide.id} className={`hero-slide ${i===currentSlide?'active':'inactive'}`}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,rgba(0,0,0,.97) 45%,rgba(0,0,0,.5) 75%,rgba(0,0,0,.15) 100%)' }}/>
              <img src={slide.image} alt={slide.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center right', opacity:.35, filter:'grayscale(20%)' }}/>
            </div>
          ))}
        </div>

        <div className="hero-inner">
          <div className="hero-grid">
            <div>
              <div className="section-label" style={{ marginBottom:18 }}>Sport-X Collection</div>
              <div className="display-heading" style={{ marginBottom:18 }}>
                <span style={{ display:'block' }}>Play</span>
                <span style={{ display:'block' }} className="outline">Like A</span>
                <span style={{ display:'block' }}>Champion</span>
              </div>
              <p className="iLU-body" style={{ color:'#666', fontSize:15, lineHeight:1.7, maxWidth:420, marginBottom:28 }}>
                Premium football equipment for players who demand more. From amateur leagues to professional arenas.
              </p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button className="btn-primary" onClick={() => navigate("/more-products")}>
                  <ShoppingBag size={14} strokeWidth={2}/> Shop Now
                </button>
                <button className="btn-outline" onClick={() => document.getElementById("products-grid")?.scrollIntoView({ behavior:"smooth" })}>
                  <Gift size={14} strokeWidth={2}/> Featured Drops
                </button>
              </div>
            </div>

            <div>
              <div style={{ position:'relative', background:'#0d0d0d', border:'1px solid #222', padding:'32px 24px 22px' }}>
                {slides[currentSlide] && (
                  <div style={{ marginBottom:18, display:'flex', alignItems:'center', gap:12 }}>
                    <span className="product-tag">{slides[currentSlide].tag}</span>
                    <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#555' }}>
                      {currentSlide+1} / {slides.length}
                    </span>
                  </div>
                )}
                <div
                  onClick={() => slides[currentSlide] && navigate(`/product/${slides[currentSlide].id}`)}
                  style={{ height:260, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', marginBottom:18, position:'relative', overflow:'hidden' }}
                >
                  {slides.map((slide, i) => (
                    <img key={slide.id} src={slide.image} alt={slide.name}
                      style={{ position:'absolute', maxHeight:'90%', maxWidth:'90%', objectFit:'contain', transition:'opacity .6s ease,transform .6s ease', opacity: i===currentSlide?1:0, transform: i===currentSlide?'scale(1)':'scale(.94)', filter:'drop-shadow(0 20px 40px rgba(0,0,0,.6))' }}
                    />
                  ))}
                </div>
                {slides[currentSlide] && (
                  <>
                    <hr className="full-divider" style={{ marginBottom:14 }}/>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                      <div style={{ minWidth:0, flex:1 }}>
                        <p className="iLU-condensed" style={{ fontSize:15, fontWeight:800, letterSpacing:'.05em', textTransform:'uppercase', color:'#fff', lineHeight:1.1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                          {slides[currentSlide].name}
                        </p>
                        <p className="iLU-condensed" style={{ fontSize:22, fontWeight:900, color:'#fff', marginTop:3 }}>
                          ${slides[currentSlide].price}
                        </p>
                      </div>
                      <button className="btn-small" onClick={() => handleSlideBuyNow(slides[currentSlide])}>Buy Now</button>
                    </div>
                  </>
                )}
                <div style={{ display:'flex', gap:6, marginTop:14 }}>
                  {slides.map((_,i) => (
                    <button key={i} onClick={() => handleSlideChange(i)}
                      className={`slide-dot ${i===currentSlide?'active':''}`}
                      style={{ width: i===currentSlide?28:14 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className={`scroll-section section-pad ${featuresVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
        <div className="section-inner">
          <div style={{ marginBottom:36 }}>
            <div className="section-label" style={{ marginBottom:12 }}>Why Sport-X</div>
            <h2 className="iLU-condensed" style={{ fontSize:'clamp(26px,5vw,52px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>
              Built For Performance
            </h2>
          </div>
          <div className="features-grid">
            {features.map((feat, i) => (
              <div key={i} className="feature-card">
                <div style={{ marginBottom:14, color:'#555' }}>{feat.icon}</div>
                <h3 className="iLU-condensed" style={{ fontSize:16, fontWeight:800, textTransform:'uppercase', letterSpacing:'.08em', color:'#fff', marginBottom:6 }}>{feat.title}</h3>
                <p className="iLU-body" style={{ color:'#555', fontSize:13, lineHeight:1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


     {/* ── BIG PROMO VIDEO ── */}
      <section style={{ position:'relative', width:'100%', overflow:'hidden', borderBottom:'1px solid #222' }}>
        <video
          autoPlay muted loop playsInline
          style={{ width:'100%', height:'100svh', objectFit:'cover', display:'block' }}
        >
          <source src="https://static.messi.com/wp-content/uploads/2025/07/MODULO_MESSI_2000x1400_JUL_2025.mp4" type="video/mp4" />
        </video>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.65) 100%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', textAlign:'center', padding:'0 20px 48px' }}>
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginBottom:12 }}>New Season · 2024</p>
          <button className="btn-primary" onClick={() => navigate("/more-products")} style={{ fontSize:'clamp(10px,3vw,12px)' }}>
            <ShoppingBag size={13} strokeWidth={2}/> Shop The Collection
          </button>
        </div>
      </section>

     {/* ── SMALL PROMO VIDEO ── */}
      <section style={{ position:'relative', width:'100%', overflow:'hidden', borderBottom:'1px solid #222' }}>
        <video
          autoPlay muted loop playsInline
          style={{ width:'100%', height:'clamp(300px,50vw,60vh)', objectFit:'cover', display:'block' }}
        >
          <source src="/videos/promo.mp4" type="video/mp4" />
        </video>
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 20px' }}>
          <button className="btn-outline" onClick={() => navigate("/more-products")} style={{ fontSize:'clamp(10px,3vw,12px)', padding:'10px 20px' }}>
            View All <ArrowRight size={13} strokeWidth={2}/>
          </button>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className={`scroll-section section-pad ${categoriesVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
        <div className="section-inner">
          <div className="section-header-row">
            <div>
              <div className="section-label" style={{ marginBottom:12 }}>Browse</div>
              <h2 className="iLU-condensed" style={{ fontSize:'clamp(26px,5vw,52px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>Shop By Category</h2>
            </div>
            <button className="btn-outline hide-mobile" onClick={() => navigate("/more-products")} style={{ padding:'10px 22px' }}>
              View All <ArrowRight size={13} strokeWidth={2}/>
            </button>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat.name)}>
                <div style={{ height:200, overflow:'hidden', position:'relative' }}>
                  <img src={cat.image} alt={cat.name} className="cat-img"/>
                  <div className="category-overlay"/>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px' }}>
                    <p className="iLU-condensed" style={{ fontSize:17, fontWeight:800, textTransform:'uppercase', letterSpacing:'.05em', color:'#fff', lineHeight:1.1, marginBottom:4 }}>{cat.name}</p>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'#888' }}>{cat.count}</span>
                      <ArrowRight size={13} color="#666" strokeWidth={2}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:20, display:'none', justifyContent:'center' }} className="show-mobile" id="cat-view-all-mobile">
            <button className="btn-outline" onClick={() => navigate("/more-products")} style={{ padding:'10px 22px' }}>
              View All <ArrowRight size={13} strokeWidth={2}/>
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section id="products-grid" className={`scroll-section section-pad ${productsVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
        <div className="section-inner">
          <div className="section-header-row">
            <div>
              <div className="section-label" style={{ marginBottom:12 }}>Top Picks</div>
              <h2 className="iLU-condensed" style={{ fontSize:'clamp(26px,5vw,52px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>Featured Products</h2>
            </div>
            <button className="btn-outline hide-mobile" onClick={() => navigate("/more-products")} style={{ padding:'10px 22px' }}>
              View All <ArrowRight size={13} strokeWidth={2}/>
            </button>
          </div>
          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'72px 0' }}>
              <div style={{ width:44, height:44, border:'2px solid #222', borderTop:'2px solid #fff', borderRadius:'50%', animation:'spin .8s linear infinite' }}/>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map(item => {
                  const isInWishlist = isItemInWishlist(item.id);
                  const isInCart = isItemInCart(item.id);
                  const wasRecentlyAdded = recentlyAddedToCart[item.id];
                  return (
                    <div key={item.id} className="product-card" onClick={() => handleProductClick(item)}>
                      <div style={{ position:'relative', height:250, background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:'20px' }}>
                        <img src={item.imageUrl||item.image||"/placeholder.png"} alt={item.name} className="product-img" style={{ maxHeight:200, maxWidth:'100%', objectFit:'contain', filter:'drop-shadow(0 10px 30px rgba(0,0,0,.5))' }}/>
                        <div className="product-actions">
                          <button onClick={(e)=>handleAddToWishlist(item,e)} className={`icon-action ${isInWishlist?'active-wish':''}`}>
                            <Heart size={14} strokeWidth={1.5} fill={isInWishlist?'currentColor':'none'}/>
                          </button>
                          <button onClick={(e)=>{e.stopPropagation();handleProductClick(item);}} className="icon-action">
                            <Eye size={14} strokeWidth={1.5}/>
                          </button>
                        </div>
                        <div style={{ position:'absolute', top:10, left:10 }}>
                          <span className="product-tag">In Stock</span>
                        </div>
                      </div>
                      <div style={{ padding:'15px 15px 18px', borderTop:'1px solid #1a1a1a' }}>
                        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:5, gap:8 }}>
                          <h3 className="iLU-condensed" style={{ fontSize:15, fontWeight:800, textTransform:'uppercase', letterSpacing:'.04em', color:'#fff', lineHeight:1.1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>{item.name}</h3>
                          <div style={{ display:'flex', alignItems:'center', gap:3, flexShrink:0 }}>
                            <Star size={10} fill="#fff" color="#fff"/>
                            <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, color:'#666' }}>4.5</span>
                          </div>
                        </div>
                        <p className="iLU-body" style={{ color:'#444', fontSize:12, lineHeight:1.5, marginBottom:13, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                          {item.description||"Premium quality product"}
                        </p>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                          <div>
                            <p className="iLU-condensed" style={{ fontSize:20, fontWeight:900, color:'#fff', lineHeight:1 }}>${Number(item.price).toFixed(2)}</p>
                            {item.originalPrice && <p className="iLU-body" style={{ fontSize:11, color:'#444', textDecoration:'line-through', marginTop:2 }}>${Number(item.originalPrice).toFixed(2)}</p>}
                          </div>
                          <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                            <button onClick={(e)=>{ if(isInCart){e.stopPropagation();navigate("/cart");}else{handleAddToCart(item,e);} }} className={`cart-action ${isInCart||wasRecentlyAdded?'in-cart':''}`}>
                              <ShoppingCart size={14} strokeWidth={1.5}/>
                            </button>
                            <button onClick={(e)=>handleBuyNow(item,e)} className="btn-small">Buy Now</button>
                          </div>
                        </div>
                        {(isInCart||wasRecentlyAdded) && (
                          <div style={{ marginTop:8 }}>
                            {wasRecentlyAdded ? (
                              <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>✓ Added to cart</span>
                            ) : isInCart ? (
                              <span className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#888', display:'flex', alignItems:'center', gap:5, flexWrap:'wrap' }}>
                                ✓ In cart ·{' '}
                                <button onClick={(e)=>{e.stopPropagation();navigate("/cart");}} style={{ background:'none', border:'none', cursor:'pointer', color:'#fff', fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', textDecoration:'underline', padding:0 }}>
                                  View Cart
                                </button>
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ textAlign:'center', marginTop:40 }}>
                <button className="btn-outline" onClick={() => navigate("/more-products")}>
                  View All Products <ArrowRight size={13} strokeWidth={2}/>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className={`scroll-section ${statsVisible?'scroll-visible':'scroll-hidden'}`} style={{ borderBottom:'1px solid #222' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-cell" style={{ textAlign:'center', padding:'40px 16px', borderRight: i<stats.length-1?'1px solid #222':'none' }}>
                <div style={{ color:'#333', marginBottom:12, display:'flex', justifyContent:'center' }}>{stat.icon}</div>
                <div className="iLU-condensed" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, color:'#fff', lineHeight:1, marginBottom:6 }}>{stat.number}</div>
                <div className="iLU-condensed" style={{ fontSize:10, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#555' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Watermark ── */}
      <section style={{ padding:'48px 24px', textAlign:'center', background:'#000', overflow:'hidden' }}>
        <p className="iLU-condensed" style={{ fontSize:'clamp(22px,6vw,72px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#1a1a1a', lineHeight:1, whiteSpace:'nowrap' }}>
          Premium Football Gear · Est. 2024 · Sport-X
        </p>
      </section>
    </div>
  );
}