






// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../Api/Axios_Instance";
// import { useAuth } from "../context/AuthContext";
// import SpecialOfferProducts from "../components/SpecialOfferProducts";
// import ProductCard from "../components/ProductCard";

// // Custom hook for scroll fade-in
// function useScrollFade(id) {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       const section = document.getElementById(id);
//       if (section) {
//         const top = section.getBoundingClientRect().top;
//         const windowHeight = window.innerHeight;
//         if (top < windowHeight - 100) setVisible(true);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [id]);
//   return visible;
// }

// export default function Home() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // Hero Slides
//   const slides = [
//     { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png" },
//     { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png" },
//     { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png" },
//     { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png" },
//   ];
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 3000);
//     return () => clearTimeout(timer);
//   }, [currentSlide]);

//   // Products
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await api.get("/products");
//         setProducts(data.slice(0, 6));
//       } catch {
//         setProducts([]);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleProductClick = (item) => {
//     if (!user) return navigate("/login");
//     navigate(`/product/${item.id}`, { state: item });
//   };

//   const handleBuyNow = (item, e) => {
//     e.stopPropagation();
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     navigate("/checkout", { state: [{ ...item, quantity: 1 }] });
//   };

//   // Categories
//   const categories = [
//     { id: 1, name: "Shoes", image: "https://m.media-amazon.com/images/I/81XmlwOysHL._AC_UL320_.jpg" },
//     { id: 2, name: "Jerseys", image: "https://m.media-amazon.com/images/I/61H2Nby46ZL._AC_UL320_.jpg" },
//     { id: 3, name: "Balls", image: "https://m.media-amazon.com/images/I/81iera7MUgL._AC_UL320_.jpg" },
//     { id: 4, name: "Gloves", image: "https://m.media-amazon.com/images/I/71+87JeTddL._AC_UL320_.jpg" },
//   ];

//   const categoryVisible = useScrollFade("categories");
//   const specialVisible = useScrollFade("special-offers");
//   const productsVisible = useScrollFade("products-grid");
//   const aboutVisible = useScrollFade("about");
//   const contactVisible = useScrollFade("contact");

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-x-hidden">

//       {/* Hero Section - Refined */}
//       <div className="relative w-full h-[98vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden">
//         {/* Subtle Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
//             backgroundSize: '48px 48px'
//           }}></div>
//         </div>

//         <div className="text-center z-20 px-4">
//           <div className="mb-8">
//             <h1 className="text-6xl md:text-8xl font-serif font-light text-white mb-4 tracking-tight">
//               Sport-X
//             </h1>
//             <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent max-w-md mx-auto"></div>
//           </div>
//           <p className="text-lg md:text-xl text-slate-300 mb-10 font-light tracking-wide max-w-2xl mx-auto">
//             Premium Football Gear | Shoes, Jerseys & Accessories
//           </p>
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={() => navigate("/more-products")}
//               className="px-8 py-3.5 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-all duration-300 shadow-lg"
//             >
//               Shop Now
//             </button>
//             <button
//               onClick={() => {
//                 const section = document.getElementById("special-offers");
//                 section?.scrollIntoView({ behavior: "smooth" });
//               }}
//               className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
//             >
//               Special Offers
//             </button>
//           </div>
//         </div>

//         {/* Refined Slide Images */}
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute bottom-0 md:bottom-10 transition-all duration-1000 ease-in-out ${
//               index === currentSlide 
//                 ? "opacity-100 translate-x-0 z-10" 
//                 : "opacity-0 translate-x-full z-0"
//             }`}
//           >
//             <img
//               src={slide.image}
//               alt={slide.name}
//               className="w-[280px] md:w-[400px] h-[280px] md:h-[400px] object-contain"
//             />
//           </div>
//         ))}

//         {/* Slide Indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`transition-all duration-300 rounded-full ${
//                 index === currentSlide 
//                   ? 'w-8 h-2 bg-white' 
//                   : 'w-2 h-2 bg-white/40 hover:bg-white/60'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Shop by Category - Refined */}
//       <div
//         id="categories"
//         className={`max-w-6xl mx-auto px-6 py-20 transition-all duration-1000 ${
//           categoryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-3">
//             Shop by Category
//           </h2>
//           <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto"></div>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               onClick={() => navigate(`/more-products?category=${cat.name}`)}
//               className="group flex flex-col items-center p-8 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-lg"
//             >
//               <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
//                 <img src={cat.image} alt={cat.name} className="w-28 h-28 object-contain" />
//               </div>
//               <p className="font-medium text-slate-900 text-base group-hover:text-slate-600 transition-colors duration-300">{cat.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Special Offers Section */}
//       <div
//         id="special-offers"
//         className={`transition-all duration-1000 ${specialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
//       >
//         <SpecialOfferProducts />
//       </div>

//       {/* Product Grid - Refined */}
//       <div
//         id="products-grid"
//         className={`p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto bg-white w-full rounded-2xl shadow-sm border border-slate-200 my-16 transition-all duration-1000 ${
//           productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         {products.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleProductClick(item)}
//             className="group bg-white border border-slate-200 rounded-xl hover:border-slate-300 p-6 text-center transform transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-lg"
//           >
//             <div className="mb-4 overflow-hidden rounded-lg">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-48 object-contain mx-auto transform group-hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//             <h2 className="text-base font-medium mb-2 text-slate-900 group-hover:text-slate-600 transition-colors duration-300">{item.name}</h2>
//             <p className="text-2xl font-semibold text-slate-900 mb-4">
//               ${item.price.toFixed(2)}
//             </p>
//             <button
//               onClick={(e) => handleBuyNow(item, e)}
//               className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 w-full"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* About Section - Refined */}
//       <div
//         id="about"
//         className={`relative bg-slate-900 py-24 mt-20 text-white overflow-hidden transition-all duration-1000 ${
//           aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
//           <div className="space-y-6">
//             <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 leading-tight">
//               About Sport-X
//             </h2>
//             <div className="h-px bg-gradient-to-r from-white/30 to-transparent max-w-xs mb-8"></div>
//             <p className="text-lg leading-relaxed mb-6 text-slate-300">
//               Sport-X isn't just a store — it's a movement.
//               We bring premium football gear designed for champions. Every product is tested, trusted,
//               and built to fuel your journey, whether you're stepping onto the pitch or cheering from the stands.
//             </p>
//             <p className="text-base text-slate-400 leading-relaxed">
//               With passion, innovation, and style, we're setting new standards in sportswear and equipment.
//               Join the Sport-X community and experience football the way it's meant to be.
//             </p>
//             <div className="flex gap-4 pt-6">
//               <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
//                 <div className="text-3xl font-semibold text-white mb-2">10K+</div>
//                 <div className="text-slate-400 text-sm">Happy Customers</div>
//               </div>
//               <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
//                 <div className="text-3xl font-semibold text-white mb-2">500+</div>
//                 <div className="text-slate-400 text-sm">Products</div>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <img
//               src="/images/ballboot.jpg"
//               alt="About Sport-X"
//               className="rounded-2xl shadow-2xl w-full max-w-md transform group-hover:scale-105 transition-all duration-500 border border-white/10"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Contact Section - Refined */}
//       <div
//         id="contact"
//         className={`py-24 bg-gradient-to-br from-slate-50 to-gray-100 transition-all duration-1000 ${
//           contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-3">
//               Contact Us
//             </h2>
//             <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto"></div>
//           </div>
//           <div className="grid md:grid-cols-2 gap-12">
            
//             {/* Contact Info */}
//             <div className="space-y-6">
//               <p className="text-lg text-slate-600 leading-relaxed">
//                 We're here to assist you with product details, orders, or any queries you may have.
//                 Reach out to us anytime.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
//                   <span className="bg-slate-100 p-3 rounded-lg text-slate-600 text-xl">📧</span>
//                   <div>
//                     <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</p>
//                     <p className="text-slate-900 font-medium">support@sportx.com</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
//                   <span className="bg-slate-100 p-3 rounded-lg text-slate-600 text-xl">📞</span>
//                   <div>
//                     <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Phone</p>
//                     <p className="text-slate-900 font-medium">+91 98765 43210</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
//                   <span className="bg-slate-100 p-3 rounded-lg text-slate-600 text-xl">📍</span>
//                   <div>
//                     <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Address</p>
//                     <p className="text-slate-900 font-medium">Sport-X HQ, Kochi, India</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//               <form className="space-y-5">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="email"
//                     placeholder="Your Email"
//                     className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
//                   />
//                 </div>
//                 <div>
//                   <textarea
//                     placeholder="Your Message"
//                     rows="5"
//                     className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 resize-none"
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all duration-300"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>

//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }
















import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { useAuth } from "../context/AuthContext";
import SpecialOfferProducts from "../components/SpecialOfferProducts";
import { 
  ShoppingBag, TrendingUp, Award, Users, Package, 
  Star, ArrowRight, CheckCircle, Zap, Shield, Truck,
  Mail, Phone, MapPin, ChevronRight, Sparkles, Clock
} from "lucide-react";

// Custom hook for scroll fade-in
function useScrollFade(id) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);
  return visible;
}

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Hero Slides
  const slides = [
    { id: 1, name: "Adidas Football Jersey", price: 45, image: "/images/arg-removebg-preview.png" },
    { id: 2, name: "Nike Mercurial Boots", price: 120, image: "/images/banner11-removebg-preview.png" },
    { id: 3, name: "Official FIFA Ball", price: 60, image: "/images/fifa-removebg-preview.png" },
    { id: 4, name: "Goalkeeper Gloves", price: 35, image: "/images/glooves2-removebg-preview.png" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 3000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.slice(0, 6));
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (item) => {
    if (!user) return navigate("/login");
    navigate(`/product/${item.id}`, { state: item });
  };

  const handleBuyNow = (item, e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: [{ ...item, quantity: 1 }] });
  };

  // Categories
  const categories = [
    { id: 1, name: "Shoes", image: "https://m.media-amazon.com/images/I/81XmlwOysHL._AC_UL320_.jpg", description: "Performance Footwear" },
    { id: 2, name: "Jerseys", image: "https://m.media-amazon.com/images/I/61H2Nby46ZL._AC_UL320_.jpg", description: "Official Team Kits" },
    { id: 3, name: "Balls", image: "https://m.media-amazon.com/images/I/81iera7MUgL._AC_UL320_.jpg", description: "Match Quality" },
    { id: 4, name: "Gloves", image: "https://m.media-amazon.com/images/I/71+87JeTddL._AC_UL320_.jpg", description: "Pro Grip" },
  ];

  const categoryVisible = useScrollFade("categories");
  const specialVisible = useScrollFade("special-offers");
  const productsVisible = useScrollFade("products-grid");
  const featuresVisible = useScrollFade("features");
  const statsVisible = useScrollFade("stats");
  const aboutVisible = useScrollFade("about");
  const contactVisible = useScrollFade("contact");

  const features = [
    { icon: <Shield className="w-6 h-6" />, title: "Authentic Products", desc: "100% genuine gear" },
    { icon: <Truck className="w-6 h-6" />, title: "Fast Delivery", desc: "2-5 days shipping" },
    { icon: <Award className="w-6 h-6" />, title: "Premium Quality", desc: "Top-tier brands" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Easy Returns", desc: "30-day guarantee" }
  ];

  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">

      {/* Hero Section - Clean & Professional */}
      <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden pt-20 pb-32">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 z-20 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Award className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Premium Quality Guaranteed</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Elevate Your Game
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                Discover premium football equipment designed for champions. Shop authentic jerseys, boots, and accessories from top brands.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate("/more-products")}
                  className="group px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all duration-300 shadow-xl flex items-center gap-2"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    const section = document.getElementById("special-offers");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Special Offers
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">10K+</div>
                  <div className="text-sm text-slate-400">Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-slate-400">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                  <div className="text-sm text-slate-400">Rating</div>
                </div>
              </div>
            </div>

            {/* Right - Product Showcase */}
            <div className="relative h-[500px] flex items-center justify-center">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute transition-all duration-1000 ease-in-out ${
                    index === currentSlide 
                      ? "opacity-100 scale-100 z-10" 
                      : "opacity-0 scale-90 z-0"
                  }`}
                >
                  <div className="relative">
                    {/* Product Image */}
                    <img
                      src={slide.image}
                      alt={slide.name}
                      className="w-[350px] md:w-[450px] h-[350px] md:h-[450px] object-contain drop-shadow-2xl"
                    />
                    
                    {/* Product Info Card */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-xl p-5 shadow-2xl">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{slide.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-slate-900">${slide.price}</span>
                        <button className="px-5 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all text-sm">
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Slide Indicators */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide 
                        ? 'w-8 h-2 bg-white' 
                        : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div
        id="features"
        className={`py-16 bg-white transition-all duration-1000 ${
          featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-6 bg-slate-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-slate-200"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop by Category - Clean Design */}
      <div
        id="categories"
        className={`py-20 bg-slate-50 transition-all duration-1000 ${
          categoryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse our collection of premium football gear
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/more-products?category=${cat.name}`)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-40 object-contain"
                  />
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{cat.description}</p>
                  <div className="inline-flex items-center gap-1 text-slate-900 font-medium text-sm group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div
        id="special-offers"
        className={`py-20 bg-slate-900 transition-all duration-1000 ${
          specialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">Limited Time</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Special Offers
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Exclusive deals on premium football gear
            </p>
          </div>
        </div>
        <SpecialOfferProducts />
      </div>

      {/* Featured Products - Clean Design */}
      <div
        id="products-grid"
        className={`py-20 bg-white transition-all duration-1000 ${
          productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              Featured Products
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleProductClick(item)}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group bg-white border border-slate-200 rounded-2xl hover:border-slate-300 p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fadeInUp"
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-50 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-contain transform group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-slate-900 line-clamp-2 min-h-[3rem] group-hover:text-slate-700 transition-colors">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-600">(4.9)</span>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </div>

                  <button
                    onClick={(e) => handleBuyNow(item, e)}
                    className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/more-products")}
              className="group px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        id="stats"
        className={`py-16 bg-slate-900 transition-all duration-1000 ${
          statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-6 h-6" />, value: "10,000+", label: "Happy Customers" },
              { icon: <Package className="w-6 h-6" />, value: "500+", label: "Products" },
              { icon: <Award className="w-6 h-6" />, value: "50+", label: "Brands" },
              { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section - Clean */}
      <div
        id="about"
        className={`py-20 bg-white transition-all duration-1000 ${
          aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="/images/ballboot.jpg"
                alt="About Sport-X"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Your Trusted Football Gear Partner
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Sport-X isn't just a store — it's a movement. We bring premium football gear designed for champions. Every product is tested, trusted, and built to fuel your journey.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-3xl font-bold text-slate-900 mb-1">10K+</div>
                  <div className="text-slate-600 text-sm">Happy Customers</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                  <div className="text-slate-600 text-sm">Premium Products</div>
                </div>
              </div>

              <button
                onClick={() => navigate("/more-products")}
                className="group mt-6 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
              >
                Learn More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - Clean */}
      <div
        id="contact"
        className={`py-20 bg-slate-50 transition-all duration-1000 ${
          contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              Contact Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions? We're here to help you
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-600 mb-1 text-sm">Send us your queries anytime</p>
                    <a href="mailto:support@sportx.com" className="text-blue-600 font-semibold hover:text-blue-700">
                      risvanmd172@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
                    <p className="text-slate-600 mb-1 text-sm">24 Hours Support</p>
                    <a href="tel:+919876543210" className="text-green-600 font-semibold hover:text-green-700">
                      6238741289
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Visit Us</h3>
                    <p className="text-slate-600 mb-1 text-sm">Come say hello at our office</p>
                    <p className="text-purple-600 font-semibold">Sport-X HQ, Kochi, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 resize-none text-slate-900"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Get Exclusive Deals
            </h2>
            <p className="text-lg text-slate-300 mb-6">
              Subscribe to our newsletter for special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
              <button className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <span>Subscribe</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-3">
              🔒 We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
}