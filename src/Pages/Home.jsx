



// import { useState, useEffect } from "react";
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
//   ChevronRight, Target, Trophy, Headphones
// } from "lucide-react";

// // Custom hook for scroll animations
// const useScrollFade = (id, threshold = 100) => {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setVisible(entry.isIntersecting),
//       { threshold: 0.1, rootMargin: `-${threshold}px` }
//     );
//     const element = document.getElementById(id);
//     if (element) observer.observe(element);
//     return () => element && observer.unobserve(element);
//   }, [id, threshold]);
//   return visible;
// };

// export default function Home() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addToCart } = useCart();
//   const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

//   // Hero Slides
//   const slides = [
//     { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png", tag: "BEST SELLER", color: "from-blue-500 to-cyan-500" },
//     { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png", tag: "PREMIUM", color: "from-orange-500 to-red-500" },
//     { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png", tag: "LIMITED", color: "from-emerald-500 to-teal-500" },
//     { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png", tag: "NEW", color: "from-purple-500 to-pink-500" },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Auto slide hero
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 3000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch featured products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/Products/User/GetAll");
//         setProducts((res.data?.data || res.data || []).slice(0, 6));
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Event Handlers
//   const handleProductClick = (item) => !user ? navigate("/login") : navigate(`/product/${item.id}`, { state: item });
  
//   const handleBuyNow = (item, e) => {
//     e.stopPropagation();
//     if (!user) return navigate("/login");
//     navigate("/checkout", { state: { products: [{ ...item, quantity: 1 }], source: "buyNow" } });
//   };
  
//   const handleAddToCart = (item, e) => {
//     e.stopPropagation();
//     if (!user) return navigate("/login");
//     addToCart({ ...item, quantity: 1 });
//   };
  
//   const handleAddToWishlist = async (item, e) => {
//     e.stopPropagation();
//     if (!user) return navigate("/login");
    
//     const isInWishlist = wishlist.some(w => w.productId === item.id || w.id === item.id);
    
//     try {
//       isInWishlist 
//         ? await removeFromWishlist(item.id)
//         : await addToWishlist(item.id);
//     } catch (err) {
//       console.error("Wishlist error:", err);
//     }
//   };

//   // Data
//   const categories = [
//     { id: 1, name: "Football Shoes", image: "https://m.media-amazon.com/images/I/81XmlwOysHL._AC_UL320_.jpg", description: "Performance Footwear", icon: <Target />, count: "200+ Items", color: "from-blue-500 to-cyan-500" },
//     { id: 2, name: "Team Jerseys", image: "https://m.media-amazon.com/images/I/61H2Nby46ZL._AC_UL320_.jpg", description: "Official Team Kits", icon: <Trophy />, count: "150+ Items", color: "from-red-500 to-orange-500" },
//     { id: 3, name: "Match Balls", image: "https://m.media-amazon.com/images/I/81iera7MUgL._AC_UL320_.jpg", description: "Professional Quality", icon: <Package />, count: "80+ Items", color: "from-emerald-500 to-green-500" },
//     { id: 4, name: "Goalkeeper Gear", image: "https://m.media-amazon.com/images/I/71+87JeTddL._AC_UL320_.jpg", description: "Pro Grip Equipment", icon: <ShieldCheck />, count: "120+ Items", color: "from-purple-500 to-pink-500" },
//   ];

//   const stats = [
//     { number: "10K+", label: "Happy Customers", icon: <Users /> },
//     { number: "500+", label: "Premium Products", icon: <Package /> },
//     { number: "24/7", label: "Support Available", icon: <Headphones /> },
//     { number: "50+", label: "Brand Partners", icon: <Award /> }
//   ];

//   const features = [
//     { icon: <ShieldCheck />, title: "100% Authentic", desc: "Guaranteed genuine products", gradient: "from-blue-500 to-cyan-500" },
//     { icon: <Truck />, title: "Fast Shipping", desc: "2-5 day delivery with tracking", gradient: "from-emerald-500 to-teal-500" },
//     { icon: <CreditCard />, title: "Secure Payment", desc: "SSL encrypted & COD available", gradient: "from-purple-500 to-pink-500" },
//     { icon: <RefreshCw />, title: "Easy Returns", desc: "30-day return policy", gradient: "from-orange-500 to-red-500" }
//   ];

//   // Animation states
//   const featuresVisible = useScrollFade("features");
//   const categoriesVisible = useScrollFade("categories");
//   const productsVisible = useScrollFade("products-grid");
//   const statsVisible = useScrollFade("stats");

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {/* HERO SECTION */}
//       <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 pt-20 pb-32 overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden">
//           {[["-top-40 -right-40", "blue"], ["-bottom-40 -left-40", "emerald"], ["top-1/2 left-1/4", "purple"]].map(([pos, color], i) => (
//             <div key={i} className={`absolute ${pos} w-80 h-80 bg-${color}-500/10 rounded-full mix-blend-multiply blur-3xl animate-blob ${i > 0 ? `animation-delay-${i*2000}` : ''}`} />
//           ))}
//         </div>

//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-12">
//           <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
//             {/* Hero Content */}
//             <div className="space-y-6 lg:space-y-8">
//               <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
//                 <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
//                 <span className="text-sm text-white font-semibold">⚡ Limited Time Offers</span>
//                 <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-xs font-bold rounded-full animate-pulse">HOT</span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
//                 Elevate Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Game</span>
//               </h1>

//               <p className="text-lg md:text-xl text-slate-300 max-w-xl font-light">
//                 Premium football equipment for champions. From amateur leagues to professional arenas.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                 <button onClick={() => navigate("/more-products")} className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3">
//                   <ShoppingBag className="w-5 h-5" />
//                   <span>Start Shopping</span>
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button onClick={() => document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all hover:border-white/50 group flex items-center justify-center gap-2">
//                   <Gift className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   Featured Products
//                 </button>
//               </div>
//             </div>

//             {/* Hero Slider */}
//             <div className="relative h-[400px] sm:h-[500px] flex items-center justify-center">
//               {slides.map((slide, i) => (
//                 <div key={slide.id} className={`absolute transition-all duration-1000 ease-in-out ${i === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-90 z-0"}`}>
//                   <div className="relative">
//                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
//                       <div className={`px-4 py-2 bg-gradient-to-r ${slide.color} text-white font-bold rounded-full shadow-lg flex items-center gap-2`}>
//                         <Tag className="w-3 h-3" /> {slide.tag}
//                       </div>
//                     </div>
                    
//                     <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700/50">
//                       <img src={slide.image} alt={slide.name} className="w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
//                       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
//                         <h3 className="text-white font-bold text-lg text-center mb-2">{slide.name}</h3>
//                         <div className="flex justify-between items-center">
//                           <span className="text-2xl font-bold text-white">${slide.price}</span>
//                           <button className="px-4 py-2 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors">Buy Now</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//                 {slides.map((_, i) => (
//                   <button key={i} onClick={() => setCurrentSlide(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-white/30 hover:bg-white/50'}`} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section id="features" className={`py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50 transition-all duration-1000 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 lg:mb-16">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Sport-X</span></h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">Premium football equipment experience</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//             {features.map((feat, i) => (
//               <div key={i} className="group relative bg-white rounded-2xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
//                 <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`} />
//                 <div className={`relative w-14 h-14 lg:w-16 lg:h-16 mb-6 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-lg`}>{feat.icon}</div>
//                 <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
//                 <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CATEGORIES */}
//       <section id="categories" className={`py-16 lg:py-24 bg-white transition-all duration-1000 ${categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 lg:mb-16">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Shop By <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Category</span></h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">Explore our football equipment categories</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//             {categories.map(cat => (
//               <div key={cat.id} onClick={() => navigate(`/category/${cat.id}`)} className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-slate-100">
//                 <div className="relative h-48 overflow-hidden">
//                   <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20`} />
//                   <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                   <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">{cat.icon}</div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.name}</h3>
//                   <p className="text-slate-600 mb-4">{cat.description}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-semibold text-slate-500">{cat.count}</span>
//                     <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
//                       <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURED PRODUCTS */}
//       <section id="products-grid" className={`py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50 transition-all duration-1000 ${productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 lg:mb-16">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Featured <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Products</span></h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">Top picks from our premium collection</p>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="relative">
//                 <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
//                 <ShoppingBag className="w-8 h-8 absolute inset-0 m-auto text-blue-600" />
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//                 {products.map(item => {
//                   const isInWishlist = wishlist.some(w => w.productId === item.id || w.id === item.id);
                  
//                   return (
//                     <div key={item.id} onClick={() => handleProductClick(item)} className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-slate-100">
//                       {/* Product Image */}
//                       <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
//                         <img src={item.image} alt={item.name} className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500" />
//                         <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <button onClick={(e) => handleAddToWishlist(item, e)} className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${isInWishlist ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' : 'bg-white hover:bg-slate-50'}`}>
//                             <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : 'text-slate-600'}`} />
//                           </button>
//                           <button onClick={(e) => handleProductClick(item)} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors">
//                             <Eye className="w-5 h-5 text-slate-600" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Product Info */}
//                       <div className="p-6">
//                         <div className="flex items-start justify-between mb-3">
//                           <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{item.name}</h3>
//                           <div className="flex items-center gap-1">
//                             <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                             <span className="text-sm text-slate-600">4.5</span>
//                           </div>
//                         </div>
//                         <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description || "Premium quality product"}</p>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-2xl font-bold text-slate-900">${Number(item.price).toFixed(2)}</p>
//                             {item.originalPrice && <p className="text-sm text-slate-400 line-through">${Number(item.originalPrice).toFixed(2)}</p>}
//                           </div>
//                           <div className="flex gap-2">
//                             <button onClick={(e) => handleAddToCart(item, e)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
//                               <ShoppingCart className="w-5 h-5 text-slate-600" />
//                             </button>
//                             <button onClick={(e) => handleBuyNow(item, e)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all hover:shadow-lg">
//                               Buy Now
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="text-center mt-12 lg:mt-16">
//                 <button onClick={() => navigate("/more-products")} className="group px-8 py-4 bg-gradient-to-r from-slate-900 to-gray-900 text-white font-semibold rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto">
//                   <span>View All Products</span>
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </section>

//       {/* STATS */}
//       <section id="stats" className={`py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-gray-900 transition-all duration-1000 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//             {stats.map((stat, i) => (
//               <div key={i} className="text-center p-6 lg:p-8">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl mb-6 backdrop-blur-sm border border-white/10">
//                   {stat.icon}
//                 </div>
//                 <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
//                 <div className="text-slate-300 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         .animate-blob { animation: blob 7s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
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
  ShoppingCart, Tag, Sparkles, Gift,
  ChevronRight, Target, Trophy, Headphones,
  Zap, ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";

// Custom hook for scroll animations with debouncing
const useScrollFade = (id, threshold = 100) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Debounce the visibility change
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          setVisible(entry.isIntersecting);
        }, 50); // 50ms debounce delay
      },
      { threshold: 0.1, rootMargin: `-${threshold}px` }
    );
    
    const element = document.getElementById(id);
    if (element) observer.observe(element);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      element && observer.unobserve(element);
    };
  }, [id, threshold]);
  
  return visible;
};

// Debounce function utility
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
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
  const slideIntervalRef = useRef(null);
  const fetchTimeoutRef = useRef(null);

  // Debounced slide change
  const debouncedSetSlide = useCallback(
    debounce((slideIndex) => {
      setCurrentSlide(slideIndex);
    }, 100),
    []
  );

  // Handle manual slide change with debouncing
  const handleSlideChange = (index) => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    debouncedSetSlide(index);
    
    // Restart auto-slide after manual change
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (slides.length || 4));
    }, 4000);
  };

  // Auto slide hero with debounced interval
  useEffect(() => {
    if (slides.length > 0) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 4000);
    }
    
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [slides]);

  // Debounced fetch functions
  const fetchProducts = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        const res = await api.get("/Products/featured");
        const featuredProducts = res.data?.data || [];
        setProducts(featuredProducts);
        
        if (featuredProducts.length > 0) {
          const slideProducts = featuredProducts.slice(0, 4);
          const slideColors = [
            "from-purple-600 to-indigo-600",
            "from-rose-600 to-pink-600", 
            "from-cyan-600 to-blue-600",
            "from-emerald-600 to-teal-600"
          ];
          
          const createdSlides = slideProducts.map((product, index) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl || "/placeholder.png",
            tag: index === 0 ? "BEST SELLER" : index === 1 ? "PREMIUM" : index === 2 ? "LIMITED" : "NEW",
            color: slideColors[index % slideColors.length],
            description: product.description || "Premium quality product"
          }));
          
          setSlides(createdSlides);
        } else {
          setSlides([
            { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png", tag: "BEST SELLER", color: "from-purple-600 to-indigo-600" },
            { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png", tag: "PREMIUM", color: "from-rose-600 to-pink-600" },
            { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png", tag: "LIMITED", color: "from-cyan-600 to-blue-600" },
            { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png", tag: "NEW", color: "from-emerald-600 to-teal-600" },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        try {
          const res = await api.get("/Products/User/GetAll");
          const allProducts = res.data?.data || res.data || [];
          setProducts(allProducts.slice(0, 6));
          
          const slideProducts = allProducts.slice(0, 4);
          const slideColors = [
            "from-purple-600 to-indigo-600",
            "from-rose-600 to-pink-600", 
            "from-cyan-600 to-blue-600",
            "from-emerald-600 to-teal-600"
          ];
          
          const createdSlides = slideProducts.map((product, index) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl || product.image || "/placeholder.png",
            tag: index === 0 ? "BEST SELLER" : index === 1 ? "PREMIUM" : index === 2 ? "LIMITED" : "NEW",
            color: slideColors[index % slideColors.length],
            description: product.description || "Premium quality product"
          }));
          
          setSlides(createdSlides);
        } catch (fallbackErr) {
          console.error("Fallback fetch also failed:", fallbackErr);
          setProducts([]);
          setSlides([
            { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png", tag: "BEST SELLER", color: "from-purple-600 to-indigo-600" },
            { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png", tag: "PREMIUM", color: "from-rose-600 to-pink-600" },
            { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png", tag: "LIMITED", color: "from-cyan-600 to-blue-600" },
            { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png", tag: "NEW", color: "from-emerald-600 to-teal-600" },
          ]);
        }
      } finally {
        setLoading(false);
      }
    }, 300), // 300ms debounce for product fetching
    []
  );

  // Fetch categories with debouncing
  const fetchCategories = useCallback(
    debounce(async () => {
      try {
        const res = await api.get("/Products/categories-list");
        if (res.data.data && res.data.data.length > 0) {
          const filteredCategories = res.data.data.filter(cat => cat !== "All").slice(0, 4);
          
          const categoryData = [
            { id: 1, name: filteredCategories[0] || "Football Shoes", image: "https://img.freepik.com/premium-photo/soccer-ball-referee-equipment-green-field_955834-26927.jpg?semt=ais_hybrid&w=740&q=80", description: "Performance Footwear", icon: <Target />, count: "200+ Items", color: "from-purple-600 to-indigo-600" },
            { id: 2, name: filteredCategories[1] || "Team Jerseys", image: "https://w0.peakpx.com/wallpaper/1019/884/HD-wallpaper-champions-league-balls-football-sports.jpg", description: "Official Team Kits", icon: <Trophy />, count: "150+ Items", color: "from-rose-600 to-pink-600" },
            { id: 3, name: filteredCategories[2] || "Match Balls", image: "https://wallpapercave.com/wp/wp3736369.jpg", description: "Professional Quality", icon: <Package />, count: "80+ Items", color: "from-cyan-600 to-blue-600" },
            { id: 4, name: filteredCategories[3] || "Goalkeeper Gear", image: "https://c1.wallpaperflare.com/preview/429/54/505/sport-football-sports-player.jpg", description: "Pro Grip Equipment", icon: <ShieldCheck />, count: "120+ Items", color: "from-emerald-600 to-teal-600" },
          ];
          
          setCategories(categoryData);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([
          { id: 1, name: "Football Shoes", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Performance Footwear", icon: <Target />, count: "200+ Items", color: "from-purple-600 to-indigo-600" },
          { id: 2, name: "Team Jerseys", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Official Team Kits", icon: <Trophy />, count: "150+ Items", color: "from-rose-600 to-pink-600" },
          { id: 3, name: "Match Balls", image: "https://images.unsplash.com/photo-1614632537423-2cbeccc971c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Professional Quality", icon: <Package />, count: "80+ Items", color: "from-cyan-600 to-blue-600" },
          { id: 4, name: "Goalkeeper Gear", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", description: "Pro Grip Equipment", icon: <ShieldCheck />, count: "120+ Items", color: "from-emerald-600 to-teal-600" },
        ]);
      }
    }, 300),
    []
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [fetchProducts, fetchCategories]);

  // Event Handlers with debouncing
  const handleProductClick = useCallback(
    debounce((item) => {
      if (!user) {
        navigate("/login");
        return;
      }
      navigate(`/product/${item.id}`, { state: item });
    }, 200),
    [user, navigate]
  );
  
  const handleBuyNow = useCallback(
    debounce((item, e) => {
      e?.stopPropagation();
      if (!user) {
        navigate("/login");
        return;
      }
      navigate("/checkout", { state: { products: [{ ...item, quantity: 1 }], source: "buyNow" } });
    }, 200),
    [user, navigate]
  );
  
  const handleAddToCart = useCallback(
  async (item, e) => {
    e?.stopPropagation();  // STOP card click navigation

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(item, 1);

      setRecentlyAddedToCart(prev => ({
        ...prev,
        [item.id]: true
      }));

      setTimeout(() => {
        setRecentlyAddedToCart(prev => ({
          ...prev,
          [item.id]: false
        }));
      }, 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  },
  [user, navigate, addToCart]
);

  
  const handleAddToWishlist = useCallback(
  async (item, e) => {
    e?.stopPropagation();   // VERY IMPORTANT

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await toggleWishlist(item);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  },
  [user, navigate, toggleWishlist]
);


  // Helper functions
  const isItemInCart = useCallback((productId) => {
    return cart.some(item => item.productId === productId);
  }, [cart]);

  const isItemInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  // Handle category click
  const handleCategoryClick = useCallback(
    debounce((categoryName) => {
      navigate(`/more-products?category=${encodeURIComponent(categoryName)}`);
    }, 200),
    [navigate]
  );

  // Data
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: <Users /> },
    { number: "500+", label: "Premium Products", icon: <Package /> },
    { number: "24/7", label: "Support Available", icon: <Headphones /> },
    { number: "50+", label: "Brand Partners", icon: <Award /> }
  ];

  const features = [
    { icon: <ShieldCheck />, title: "100% Authentic", desc: "Guaranteed genuine products", gradient: "from-purple-600 to-indigo-600" },
    { icon: <Truck />, title: "Fast Shipping", desc: "2-5 day delivery with tracking", gradient: "from-rose-600 to-pink-600" },
    { icon: <CreditCard />, title: "Secure Payment", desc: "SSL encrypted & COD available", gradient: "from-cyan-600 to-blue-600" },
    { icon: <RefreshCw />, title: "Easy Returns", desc: "30-day return policy", gradient: "from-emerald-600 to-teal-600" }
  ];

  // Animation states
  const featuresVisible = useScrollFade("features");
  const categoriesVisible = useScrollFade("categories");
  const productsVisible = useScrollFade("products-grid");
  const statsVisible = useScrollFade("stats");

  // Handle slide Buy Now with backend connection
 const handleSlideBuyNow = useCallback(
  async (slide) => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/checkout", { 
      state: { 
        products: [{ 
          id: slide.id,
          name: slide.name,
          price: slide.price,
          image: slide.image,
          description: slide.description,
          quantity: 1 
        }], 
        source: "slideBuyNow" 
      } 
    });
  },
  [user, navigate]
);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[["-top-40 -right-40", "purple"], ["-bottom-40 -left-40", "rose"], ["top-1/2 left-1/4", "cyan"]].map(([pos, color], i) => (
            <div key={i} className={`absolute ${pos} w-80 h-80 bg-${color}-500/10 rounded-full mix-blend-multiply blur-3xl animate-blob ${i > 0 ? `animation-delay-${i*2000}` : ''}`} />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span className="text-sm text-white font-semibold">⚡ Limited Time Offers</span>
                <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-xs font-bold rounded-full animate-pulse">HOT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Elevate Your <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Game</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-xl font-light">
                Premium football equipment for champions. From amateur leagues to professional arenas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button onClick={() => navigate("/more-products")} className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Start Shopping</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" })} className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/40 group flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Featured Products
                </button>
              </div>
            </div>

            {/* Hero Slider */}
            <div className="relative h-[400px] sm:h-[500px] flex items-center justify-center">
             {slides.map((slide, i) => (
  <div 
    key={slide.id} 
    onClick={() => navigate(`/product/${slide.id}`)}
    className={`absolute transition-all duration-1000 ease-in-out ${i === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-90 z-0"}`}
  >

                  <div className="relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div className={`px-4 py-2 bg-gradient-to-r ${slide.color} text-white font-bold rounded-full shadow-lg flex items-center gap-2`}>
                        <Tag className="w-3 h-3" /> {slide.tag}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                      <img src={slide.image} alt={slide.name} className="w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                        <h3 className="text-white font-bold text-lg text-center mb-2">{slide.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-white">${slide.price}</span>
                          <button 
                            onClick={() => handleSlideBuyNow(slide)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSlideChange(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-white/20 hover:bg-white/40'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={`py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-1000 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Sport-X</span></h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Premium football equipment experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feat, i) => (
              <div key={i} className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-700/50">
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`} />
                <div className={`relative w-14 h-14 lg:w-16 lg:h-16 mb-6 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-lg`}>{feat.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className={`py-16 lg:py-24 bg-gray-900 transition-all duration-1000 ${categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Shop By <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Category</span></h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Explore our football equipment categories</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map(cat => (
              <div 
                key={cat.id} 
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-700/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20`} />
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center text-white">
                    {cat.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-gray-300 mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-400">{cat.count}</span>
                    <button className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products-grid" className={`py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-1000 ${productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Featured <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Products</span></h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Top picks from our premium collection</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-purple-600 rounded-full animate-spin" />
                <ShoppingBag className="w-8 h-8 absolute inset-0 m-auto text-purple-600" />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {products.map(item => {
                  const isInWishlist = isItemInWishlist(item.id);
                  const isInCart = isItemInCart(item.id);
                  const wasRecentlyAdded = recentlyAddedToCart[item.id];
                  
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => handleProductClick(item)} 
                      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-700/50"
                    >
                      {/* Product Image */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6">
                        <img 
                          src={item.imageUrl || item.image || "/placeholder.png"} 
                          alt={item.name} 
                          className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={(e) => handleAddToWishlist(item, e)} 
                            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${
                              isInWishlist 
                                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white' 
                                : 'bg-gray-700/80 hover:bg-gray-600/80 text-gray-300'
                            }`}
                          >
                            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
                          </button>
                          <button 
                            onClick={(e) => handleProductClick(item)} 
                            className="w-10 h-10 bg-gray-700/80 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600/80 transition-colors text-gray-300"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-300">4.5</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description || "Premium quality product"}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-white">${Number(item.price).toFixed(2)}</p>
                            {item.originalPrice && <p className="text-sm text-gray-500 line-through">${Number(item.originalPrice).toFixed(2)}</p>}
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => {
                                if (isInCart) {
                                  e.stopPropagation();
                                  navigate("/cart");
                                } else {
                                  handleAddToCart(item, e);
                                }
                              }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isInCart 
                                  ? 'bg-green-600 text-white hover:bg-green-700' 
                                  : wasRecentlyAdded
                                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                              }`}
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={(e) => handleBuyNow(item, e)} 
                              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg"
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                        
                        {/* Cart Status Indicator */}
                        {(isInCart || wasRecentlyAdded) && (
                          <div className="mt-3 text-xs">
                            {wasRecentlyAdded ? (
                              <span className="text-emerald-400 font-semibold animate-pulse">✓ Added to cart!</span>
                            ) : isInCart ? (
                              <span className="text-green-400 font-semibold flex items-center gap-1">
                                ✓ In cart • 
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/cart");
                                  }}
                                  className="text-green-300 hover:text-green-200 underline"
                                >
                                  View cart
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

              <div className="text-center mt-12 lg:mt-16">
                <button 
                  onClick={() => navigate("/more-products")} 
                  className="group px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto border border-gray-700/50 hover:border-gray-600/50"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className={`py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-all duration-1000 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 lg:p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/10">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}