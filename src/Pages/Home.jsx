










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

//   // FIXED: This function now correctly navigates to checkout with a single-item array
//   const handleBuyNow = (item, e) => {
//     e.stopPropagation();
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     // Pass the single product as an array to match the checkout page's structure
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
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

//       {/* Hero Section */}
//       <div className="relative w-full h-[98vh] bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex flex-col items-center justify-center overflow-hidden">
//         <div className="text-center z-20 px-4">
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">Sport-X</h1>
//           <p className="text-lg md:text-2xl text-white/90 mb-6">
//             Premium Football Gear | Shoes, Jerseys & Accessories
//           </p>
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={() => navigate("/more-products")}
//               className="px-6 py-3 bg-white text-cyan-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-lg"
//             >
//               Shop Now
//             </button>
//             <button
//               onClick={() => {
//                 const section = document.getElementById("special-offers");
//                 section?.scrollIntoView({ behavior: "smooth" });
//               }}
//               className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-cyan-600 transition shadow-lg"
//             >
//               Special Offers
//             </button>
//           </div>
//         </div>

//         {/* Slide Images */}
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute bottom-0 md:bottom-10 transition-all duration-1000 ease-in-out transform ${
//               index === currentSlide ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-full z-0"
//             }`}
//           >
//             <img
//               src={slide.image}
//               alt={slide.name}
//               className="w-[250px] md:w-[350px] h-[250px] md:h-[350px] object-contain shadow-2xl"
//             />
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-black/20 z-10"></div>
//       </div>

//       {/* Shop by Category */}
//       <div
//         id="categories"
//         className={`max-w-6xl mx-auto px-6 py-16 transition-all duration-1000 transform ${
//           categoryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Shop by Category</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               onClick={() => navigate(`/more-products?category=${cat.name}`)}
//               className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg transform transition hover:scale-105 cursor-pointer hover:shadow-cyan-200 hover:shadow-xl"
//             >
//               <img src={cat.image} alt={cat.name} className="w-24 h-24 object-contain mb-3" />
//               <p className="font-bold text-gray-800">{cat.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Special Offers Section */}
//       <div
//         id="special-offers"
//         className={`transition-all duration-1000 transform ${specialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
//       >
//         <SpecialOfferProducts />
//       </div>

//       {/* Product Grid */}
//       <div
//         id="products-grid"
//         className={`p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto bg-white w-full transition-all duration-1000 transform ${
//           productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         {products.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleProductClick(item)}
//             className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center transform transition hover:scale-105 cursor-pointer relative hover:shadow-cyan-300 hover:shadow-xl"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 object-contain mx-auto mb-4 rounded-md"
//             />
//             <h2 className="text-lg font-semibold mb-2 text-gray-800">{item.name}</h2>
//             <p className="text-gray-700 mb-4">${item.price.toFixed(2)}</p>
//             <button
//               onClick={(e) => handleBuyNow(item, e)}
//               className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold shadow-md transform transition hover:scale-105"
//             >
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* About Section */}
//       <div
//         id="about"
//         className={`bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 py-20 mt-20 text-white transition-all duration-1000 transform ${
//           aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//           {/* About Text */}
//           <div>
//             <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">About Sport-X</h2>
//             <p className="text-lg leading-relaxed mb-4 text-gray-100">
//               <span className="font-semibold text-cyan-400">Sport-X</span> isn't just a store — it's a movement.
//               We bring premium football gear designed for champions. Every product is tested, trusted,
//               and built to fuel your journey, whether you're stepping onto the pitch or cheering from the stands.
//             </p>
//             <p className="text-lg text-gray-300">
//               With passion, innovation, and style, we're setting new standards in sportswear and equipment.
//               Join the Sport-X community and experience football the way it's meant to be.
//             </p>
//           </div>
//           {/* About Image */}
//           <div className="flex justify-center">
//             <img
//               src="/images/ballboot.jpg"
//               alt="About Sport-X"
//               className="rounded-2xl shadow-2xl w-96 hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div
//         id="contact"
//         className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 transition-all duration-1000 transform ${
//           contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-5xl font-extrabold text-gray-800 text-center mb-12">Contact Us</h2>
//           <div className="grid md:grid-cols-2 gap-12">
            
//             {/* Contact Info */}
//             <div className="space-y-6">
//               <p className="text-lg text-gray-600">
//                 We're here to assist you with product details, orders, or any queries you may have.
//                 Reach out to us anytime!
//               </p>
//               <div className="space-y-4 text-gray-700">
//                 <div className="flex items-center gap-3">
//                   <span className="bg-cyan-100 p-3 rounded-full text-cyan-600">📧</span>
//                   <p><strong>Email:</strong> support@sportx.com</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="bg-emerald-100 p-3 rounded-full text-emerald-600">📞</span>
//                   <p><strong>Phone:</strong> +91 98765 43210</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="bg-blue-100 p-3 rounded-full text-blue-600">📍</span>
//                   <p><strong>Address:</strong> Sport-X HQ, Kochi, India</p>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <form className="space-y-6">
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Your Email"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
//                 />
//                 <textarea
//                   placeholder="Your Message"
//                   rows="4"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:scale-105 transform transition shadow-md"
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
import ProductCard from "../components/ProductCard";

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
    { id: 1, name: "Shoes", image: "https://m.media-amazon.com/images/I/81XmlwOysHL._AC_UL320_.jpg" },
    { id: 2, name: "Jerseys", image: "https://m.media-amazon.com/images/I/61H2Nby46ZL._AC_UL320_.jpg" },
    { id: 3, name: "Balls", image: "https://m.media-amazon.com/images/I/81iera7MUgL._AC_UL320_.jpg" },
    { id: 4, name: "Gloves", image: "https://m.media-amazon.com/images/I/71+87JeTddL._AC_UL320_.jpg" },
  ];

  const categoryVisible = useScrollFade("categories");
  const specialVisible = useScrollFade("special-offers");
  const productsVisible = useScrollFade("products-grid");
  const aboutVisible = useScrollFade("about");
  const contactVisible = useScrollFade("contact");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-x-hidden">

      {/* Hero Section - Refined */}
      <div className="relative w-full h-[98vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        <div className="text-center z-20 px-4">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-serif font-light text-white mb-4 tracking-tight">
              Sport-X
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent max-w-md mx-auto"></div>
          </div>
          <p className="text-lg md:text-xl text-slate-300 mb-10 font-light tracking-wide max-w-2xl mx-auto">
            Premium Football Gear | Shoes, Jerseys & Accessories
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/more-products")}
              className="px-8 py-3.5 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-all duration-300 shadow-lg"
            >
              Shop Now
            </button>
            <button
              onClick={() => {
                const section = document.getElementById("special-offers");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Special Offers
            </button>
          </div>
        </div>

        {/* Refined Slide Images */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute bottom-0 md:bottom-10 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? "opacity-100 translate-x-0 z-10" 
                : "opacity-0 translate-x-full z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-[280px] md:w-[400px] h-[280px] md:h-[400px] object-contain"
            />
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
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

      {/* Shop by Category - Refined */}
      <div
        id="categories"
        className={`max-w-6xl mx-auto px-6 py-20 transition-all duration-1000 ${
          categoryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-3">
            Shop by Category
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/more-products?category=${cat.name}`)}
              className="group flex flex-col items-center p-8 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-lg"
            >
              <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                <img src={cat.image} alt={cat.name} className="w-28 h-28 object-contain" />
              </div>
              <p className="font-medium text-slate-900 text-base group-hover:text-slate-600 transition-colors duration-300">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers Section */}
      <div
        id="special-offers"
        className={`transition-all duration-1000 ${specialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <SpecialOfferProducts />
      </div>

      {/* Product Grid - Refined */}
      <div
        id="products-grid"
        className={`p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto bg-white w-full rounded-2xl shadow-sm border border-slate-200 my-16 transition-all duration-1000 ${
          productsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => handleProductClick(item)}
            className="group bg-white border border-slate-200 rounded-xl hover:border-slate-300 p-6 text-center transform transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-lg"
          >
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain mx-auto transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="text-base font-medium mb-2 text-slate-900 group-hover:text-slate-600 transition-colors duration-300">{item.name}</h2>
            <p className="text-2xl font-semibold text-slate-900 mb-4">
              ${item.price.toFixed(2)}
            </p>
            <button
              onClick={(e) => handleBuyNow(item, e)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 w-full"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* About Section - Refined */}
      <div
        id="about"
        className={`relative bg-slate-900 py-24 mt-20 text-white overflow-hidden transition-all duration-1000 ${
          aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 leading-tight">
              About Sport-X
            </h2>
            <div className="h-px bg-gradient-to-r from-white/30 to-transparent max-w-xs mb-8"></div>
            <p className="text-lg leading-relaxed mb-6 text-slate-300">
              Sport-X isn't just a store — it's a movement.
              We bring premium football gear designed for champions. Every product is tested, trusted,
              and built to fuel your journey, whether you're stepping onto the pitch or cheering from the stands.
            </p>
            <p className="text-base text-slate-400 leading-relaxed">
              With passion, innovation, and style, we're setting new standards in sportswear and equipment.
              Join the Sport-X community and experience football the way it's meant to be.
            </p>
            <div className="flex gap-4 pt-6">
              <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-semibold text-white mb-2">10K+</div>
                <div className="text-slate-400 text-sm">Happy Customers</div>
              </div>
              <div className="flex-1 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-semibold text-white mb-2">500+</div>
                <div className="text-slate-400 text-sm">Products</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/ballboot.jpg"
              alt="About Sport-X"
              className="rounded-2xl shadow-2xl w-full max-w-md transform group-hover:scale-105 transition-all duration-500 border border-white/10"
            />
          </div>
        </div>
      </div>

      {/* Contact Section - Refined */}
      <div
        id="contact"
        className={`py-24 bg-gradient-to-br from-slate-50 to-gray-100 transition-all duration-1000 ${
          contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-3">
              Contact Us
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                We're here to assist you with product details, orders, or any queries you may have.
                Reach out to us anytime.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
                  <span className="bg-slate-100 p-3 rounded-lg text-slate-600 text-xl">📧</span>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</p>
                    <p className="text-slate-900 font-medium">support@sportx.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
                  <span className="bg-slate-100 p-3 rounded-lg text-slate-600 text-xl">📞</span>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Phone</p>
                    <p className="text-slate-900 font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
                  <span className="bg-slate-100 p-3 rounded-lg text-slate-600 text-xl">📍</span>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Address</p>
                    <p className="text-slate-900 font-medium">Sport-X HQ, Kochi, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <form className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}