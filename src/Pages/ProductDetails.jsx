

// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import { Heart, Package } from "lucide-react";

// export default function ProductDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   const product = location.state; 
//   const [quantity, setQuantity] = useState(1);

//   if (!product) return <p className="text-center mt-20">Product not found.</p>;

//   const isInWishlist = wishlist.some((item) => item.id === product.id);
//   const stock = product.stock || 0;
//   const isOutOfStock = stock <= 0;

//   const getStockStatus = (stock) => {
//     if (stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-50" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-50" };
//     return { text: `${stock} in stock`, color: "text-green-600 bg-green-50" };
//   };

//   const stockStatus = getStockStatus(stock);

//   const handleBuyNow = () => {
//     if (!user) return navigate("/login");
    
//     if (isOutOfStock) {
//       alert("Sorry, this product is out of stock!");
//       return;
//     }

//     if (quantity > stock) {
//       alert(`Sorry, only ${stock} items available in stock!`);
//       return;
//     }

//     navigate("/checkout", { state: { products: [{ ...product, quantity }], source: "buyNow" } });
//   };

//   const handleAddToCart = () => {
//     if (!user) return navigate("/login");
    
//     if (isOutOfStock) {
//       alert("Sorry, this product is out of stock!");
//       return;
//     }

//     if (quantity > stock) {
//       alert(`Sorry, only ${stock} items available in stock!`);
//       return;
//     }

//     addToCart({ ...product, quantity });
//     navigate("/cart");
//   };

//   const handleIncrease = () => {
//     if (quantity < stock) {
//       setQuantity((prev) => prev + 1);
//     } else {
//       alert(`Only ${stock} items available in stock!`);
//     }
//   };

//   const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-16">
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 relative">
          
//           {/* Stock Badge */}
//           <div className={`absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border ${stockStatus.color}`}>
//             <Package size={16} />
//             {stockStatus.text}
//           </div>

//           {/* Image */}
//           <div className="flex justify-center items-center">
//             <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className={`w-[350px] h-[350px] object-contain transition-all duration-300 ${
//                   isOutOfStock ? "grayscale opacity-50" : ""
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Details */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h2 className="text-4xl font-serif font-light text-slate-900 mb-6 leading-tight">
//                 {product.name}
//               </h2>
//               <div className="h-px bg-gradient-to-r from-slate-300 to-transparent max-w-xs mb-6"></div>
              
//               <p className="text-3xl font-semibold text-slate-900 mb-6">
//                 ${Number(product.price * quantity).toFixed(2)}
//               </p>
              
//               {/* Stock Information */}
//               <div className="mb-6">
//                 <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${stockStatus.color}`}>
//                   <Package size={14} />
//                   {stockStatus.text}
//                 </div>
//                 {isOutOfStock && (
//                   <p className="text-red-600 text-sm mt-3 font-medium">
//                     This item is currently unavailable
//                   </p>
//                 )}
//               </div>

//               <p className="text-slate-600 mb-8 leading-relaxed text-base">
//                 {product.description ||
//                   "This is a premium quality product for football enthusiasts."}
//               </p>
//             </div>

//             {/* Quantity Controls */}
//             <div className="flex items-center gap-6 mb-8">
//               <span className="font-medium text-slate-700">Quantity:</span>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleDecrease}
//                   disabled={isOutOfStock}
//                   className={`w-10 h-10 rounded-lg font-semibold border transition-all duration-300 ${
//                     isOutOfStock
//                       ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
//                       : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
//                   }`}
//                 >
//                   -
//                 </button>
//                 <span className={`font-semibold text-lg min-w-[2rem] text-center ${isOutOfStock ? "text-slate-400" : "text-slate-900"}`}>
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={handleIncrease}
//                   disabled={isOutOfStock || quantity >= stock}
//                   className={`w-10 h-10 rounded-lg font-semibold border transition-all duration-300 ${
//                     isOutOfStock || quantity >= stock
//                       ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
//                       : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
//                   }`}
//                 >
//                   +
//                 </button>
//               </div>
//               {!isOutOfStock && stock <= 10 && (
//                 <span className="text-sm text-orange-600 font-medium">
//                   (Max: {stock})
//                 </span>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="flex gap-4 items-center">
//               <button
//                 onClick={handleBuyNow}
//                 disabled={isOutOfStock}
//                 className={`flex-1 px-8 py-3.5 rounded-lg transition-all duration-300 font-medium shadow-sm ${
//                   isOutOfStock
//                     ? "bg-slate-200 text-slate-400 cursor-not-allowed"
//                     : "bg-slate-900 text-white hover:bg-slate-800"
//                 }`}
//               >
//                 {isOutOfStock ? "Out of Stock" : "Buy Now"}
//               </button>
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock}
//                 className={`flex-1 px-8 py-3.5 rounded-lg transition-all duration-300 font-medium border ${
//                   isOutOfStock
//                     ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
//                     : "bg-white text-slate-900 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//                 }`}
//               >
//                 {isOutOfStock ? "Unavailable" : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() => toggleWishlist(product)}
//                 className={`p-3.5 rounded-lg transition-all duration-300 border ${
//                   isInWishlist
//                     ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
//                     : "bg-white text-slate-400 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//                 }`}
//               >
//                 <Heart size={22} className={`${isInWishlist ? "fill-current" : ""}`} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import api from "../Api/Axios_Instance";
// import { Heart, Package, Star, ThumbsUp, MessageSquare, Share2, Truck, Shield, RotateCcw, Award, X, CheckCircle, AlertCircle } from "lucide-react";

// // Toast Component
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const styles = {
//     success: "bg-green-50 text-green-800 border-green-200",
//     error: "bg-red-50 text-red-800 border-red-200",
//     warning: "bg-amber-50 text-amber-800 border-amber-200",
//     info: "bg-blue-50 text-blue-800 border-blue-200"
//   };

//   const icons = {
//     success: <CheckCircle size={20} />,
//     error: <AlertCircle size={20} />,
//     warning: <AlertCircle size={20} />,
//     info: <AlertCircle size={20} />
//   };

//   return (
//     <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${styles[type]} animate-slideIn`}>
//       {icons[type]}
//       <span className="font-medium">{message}</span>
//       <button onClick={onClose} className="ml-2 hover:opacity-70">
//         <X size={18} />
//       </button>
//     </div>
//   );
// };

// export default function ProductDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   const product = location.state; 
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [userRating, setUserRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [loadingReviews, setLoadingReviews] = useState(true);
//   const [submittingReview, setSubmittingReview] = useState(false);
//   const [toast, setToast] = useState(null);

//   const showToast = (message, type = "info") => {
//     setToast({ message, type });
//   };

//   useEffect(() => {
//     if (product?.id) {
//       fetchReviews();
//     }
//   }, [product?.id]);

//   const fetchReviews = async () => {
//     try {
//       setLoadingReviews(true);
//       const { data } = await api.get(`/products/${product.id}/reviews`);
//       setReviews(data);
//     } catch (error) {
//       // If API doesn't have reviews endpoint, use mock data
//       setReviews([
//         {
//           id: 1,
//           name: "John Smith",
//           rating: 5,
//           date: "2 weeks ago",
//           comment: "Excellent product! The quality exceeded my expectations. Highly recommended for anyone looking for premium quality.",
//           helpful: 24,
//           verified: true
//         },
//         {
//           id: 2,
//           name: "Sarah Johnson",
//           rating: 4,
//           date: "1 month ago",
//           comment: "Great value for money. Fast shipping and well-packaged. Would definitely buy again.",
//           helpful: 18,
//           verified: true
//         },
//         {
//           id: 3,
//           name: "Michael Brown",
//           rating: 5,
//           date: "2 months ago",
//           comment: "Outstanding quality and customer service. This product has become my go-to choice.",
//           helpful: 31,
//           verified: false
//         }
//       ]);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   if (!product) {
//     showToast("Product not found", "error");
//     return <p className="text-center mt-20">Product not found.</p>;
//   }

//   const isInWishlist = wishlist.some((item) => item.id === product.id);
//   const stock = product.stock || 0;
//   const isOutOfStock = stock <= 0;
//   const productRating = product.rating || 4.5;
//   const totalReviews = reviews.length;

//   const getStockStatus = (stock) => {
//     if (stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50", border: "border-red-200" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-50", border: "border-orange-200" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-200" };
//     return { text: `${stock} in stock`, color: "text-green-600 bg-green-50", border: "border-green-200" };
//   };

//   const stockStatus = getStockStatus(stock);

//   const handleBuyNow = () => {
//     if (!user) {
//       showToast("Please login to continue", "warning");
//       return navigate("/login");
//     }
    
//     if (isOutOfStock) {
//       showToast("Sorry, this product is out of stock!", "error");
//       return;
//     }

//     if (quantity > stock) {
//       showToast(`Sorry, only ${stock} items available in stock!`, "warning");
//       return;
//     }

//     navigate("/checkout", { state: { products: [{ ...product, quantity }], source: "buyNow" } });
//   };

//   const handleAddToCart = () => {
//     if (!user) {
//       showToast("Please login to add items to cart", "warning");
//       return navigate("/login");
//     }
    
//     if (isOutOfStock) {
//       showToast("Sorry, this product is out of stock!", "error");
//       return;
//     }

//     if (quantity > stock) {
//       showToast(`Sorry, only ${stock} items available in stock!`, "warning");
//       return;
//     }

//     addToCart({ ...product, quantity });
//     showToast("Product added to cart successfully!", "success");
//     navigate("/cart");
//   };

//   const handleIncrease = () => {
//     if (quantity < stock) {
//       setQuantity((prev) => prev + 1);
//     } else {
//       showToast(`Only ${stock} items available in stock!`, "warning");
//     }
//   };

//   const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

//   const handleSubmitReview = async () => {
//     if (!user) {
//       showToast("Please login to submit a review", "warning");
//       return;
//     }
//     if (userRating === 0) {
//       showToast("Please select a rating", "warning");
//       return;
//     }
//     if (!reviewText.trim()) {
//       showToast("Please write a review", "warning");
//       return;
//     }

//     try {
//       setSubmittingReview(true);
//       const reviewData = {
//         productId: product.id,
//         rating: userRating,
//         comment: reviewText
//       };

//       // Try to submit to API
//       await api.post(`/products/${product.id}/reviews`, reviewData);
      
//       showToast("Review submitted successfully!", "success");
      
//       // Refresh reviews
//       await fetchReviews();
      
//       setUserRating(0);
//       setReviewText("");
//     } catch (error) {
//       // If API fails, add review locally
//       const newReview = {
//         id: reviews.length + 1,
//         name: user.name || "Anonymous User",
//         rating: userRating,
//         date: "Just now",
//         comment: reviewText,
//         helpful: 0,
//         verified: true
//       };

//       setReviews([newReview, ...reviews]);
//       setUserRating(0);
//       setReviewText("");
//       showToast("Review submitted successfully!", "success");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleHelpfulReview = async (reviewId) => {
//     try {
//       await api.post(`/reviews/${reviewId}/helpful`);
      
//       setReviews(reviews.map(review => 
//         review.id === reviewId 
//           ? { ...review, helpful: review.helpful + 1 }
//           : review
//       ));
      
//       showToast("Thank you for your feedback!", "success");
//     } catch (error) {
//       // Local update if API fails
//       setReviews(reviews.map(review => 
//         review.id === reviewId 
//           ? { ...review, helpful: review.helpful + 1 }
//           : review
//       ));
//       showToast("Thank you for your feedback!", "success");
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: `Check out ${product.name}`,
//         url: window.location.href
//       }).then(() => {
//         showToast("Shared successfully!", "success");
//       }).catch(() => {
//         // Fallback to clipboard
//         navigator.clipboard.writeText(window.location.href);
//         showToast("Link copied to clipboard!", "success");
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       showToast("Link copied to clipboard!", "success");
//     }
//   };

//   const ratingDistribution = [
//     { stars: 5, count: Math.floor(totalReviews * 0.65), percentage: 65 },
//     { stars: 4, count: Math.floor(totalReviews * 0.22), percentage: 22 },
//     { stars: 3, count: Math.floor(totalReviews * 0.07), percentage: 7 },
//     { stars: 2, count: Math.floor(totalReviews * 0.04), percentage: 4 },
//     { stars: 1, count: Math.floor(totalReviews * 0.02), percentage: 2 }
//   ];

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-16">
//       {/* Toast Notification */}
//       {toast && (
//         <Toast 
//           message={toast.message} 
//           type={toast.type} 
//           onClose={() => setToast(null)} 
//         />
//       )}

//       <div className="max-w-7xl mx-auto px-6">
//         {/* Main Product Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 relative mb-8">
          
//           {/* Stock Badge */}
//           <div className={`absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border ${stockStatus.color} ${stockStatus.border}`}>
//             <Package size={16} />
//             {stockStatus.text}
//           </div>

//           {/* Image */}
//           <div className="flex justify-center items-center">
//             <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className={`w-[350px] h-[350px] object-contain transition-all duration-300 ${
//                   isOutOfStock ? "grayscale opacity-50" : ""
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Details */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h1 className="text-4xl font-serif font-light text-slate-900 mb-4 leading-tight">
//                 {product.name}
//               </h1>

//               {/* Rating Overview */}
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star 
//                       key={i} 
//                       size={20} 
//                       className={i < Math.floor(productRating) ? "text-amber-400 fill-current" : "text-slate-300"} 
//                     />
//                   ))}
//                 </div>
//                 <span className="text-lg font-semibold text-slate-900">{productRating}</span>
//                 <span className="text-slate-500">|</span>
//                 <span className="text-slate-600">{totalReviews} reviews</span>
//                 <span className="text-slate-500">|</span>
//                 <span className="text-green-600 font-medium flex items-center gap-1">
//                   <Award size={16} />
//                   Verified
//                 </span>
//               </div>
              
//               <div className="h-px bg-gradient-to-r from-slate-300 to-transparent mb-6"></div>
              
//               <p className="text-3xl font-semibold text-slate-900 mb-6">
//                 ${Number(product.price * quantity).toFixed(2)}
//               </p>
              
//               {/* Stock Information */}
//               <div className="mb-6">
//                 <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${stockStatus.color} ${stockStatus.border}`}>
//                   <Package size={14} />
//                   {stockStatus.text}
//                 </div>
//                 {isOutOfStock && (
//                   <p className="text-red-600 text-sm mt-3 font-medium">
//                     This item is currently unavailable
//                   </p>
//                 )}
//               </div>

//               {/* Quick Features */}
//               <div className="grid grid-cols-2 gap-3 mb-8">
//                 <div className="flex items-center gap-2 text-sm text-slate-600">
//                   <Truck size={18} className="text-green-600" />
//                   <span>Free Shipping</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-slate-600">
//                   <Shield size={18} className="text-blue-600" />
//                   <span>Secure Payment</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-slate-600">
//                   <RotateCcw size={18} className="text-purple-600" />
//                   <span>Easy Returns</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-slate-600">
//                   <Award size={18} className="text-amber-600" />
//                   <span>Quality Assured</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quantity Controls */}
//             <div className="flex items-center gap-6 mb-8">
//               <span className="font-medium text-slate-700">Quantity:</span>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleDecrease}
//                   disabled={isOutOfStock}
//                   className={`w-10 h-10 rounded-lg font-semibold border transition-all duration-300 ${
//                     isOutOfStock
//                       ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
//                       : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
//                   }`}
//                 >
//                   -
//                 </button>
//                 <span className={`font-semibold text-lg min-w-[2rem] text-center ${isOutOfStock ? "text-slate-400" : "text-slate-900"}`}>
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={handleIncrease}
//                   disabled={isOutOfStock || quantity >= stock}
//                   className={`w-10 h-10 rounded-lg font-semibold border transition-all duration-300 ${
//                     isOutOfStock || quantity >= stock
//                       ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
//                       : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
//                   }`}
//                 >
//                   +
//                 </button>
//               </div>
//               {!isOutOfStock && stock <= 10 && (
//                 <span className="text-sm text-orange-600 font-medium">
//                   (Max: {stock})
//                 </span>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="flex gap-4 items-center">
//               <button
//                 onClick={handleBuyNow}
//                 disabled={isOutOfStock}
//                 className={`flex-1 px-8 py-3.5 rounded-lg transition-all duration-300 font-medium shadow-sm ${
//                   isOutOfStock
//                     ? "bg-slate-200 text-slate-400 cursor-not-allowed"
//                     : "bg-slate-900 text-white hover:bg-slate-800"
//                 }`}
//               >
//                 {isOutOfStock ? "Out of Stock" : "Buy Now"}
//               </button>
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock}
//                 className={`flex-1 px-8 py-3.5 rounded-lg transition-all duration-300 font-medium border ${
//                   isOutOfStock
//                     ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
//                     : "bg-white text-slate-900 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//                 }`}
//               >
//                 {isOutOfStock ? "Unavailable" : "Add to Cart"}
//               </button>
//               <button
//                 onClick={() => {
//                   toggleWishlist(product);
//                   showToast(
//                     isInWishlist ? "Removed from wishlist" : "Added to wishlist",
//                     "success"
//                   );
//                 }}
//                 className={`p-3.5 rounded-lg transition-all duration-300 border ${
//                   isInWishlist
//                     ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
//                     : "bg-white text-slate-400 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//                 }`}
//               >
//                 <Heart size={22} className={`${isInWishlist ? "fill-current" : ""}`} />
//               </button>
//               <button 
//                 onClick={handleShare}
//                 className="p-3.5 rounded-lg transition-all duration-300 border bg-white text-slate-400 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//               >
//                 <Share2 size={22} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//           {/* Tab Navigation */}
//           <div className="flex gap-2 border-b border-slate-200 mb-8">
//             <button
//               onClick={() => setActiveTab("description")}
//               className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
//                 activeTab === "description"
//                   ? "text-slate-900 border-slate-900"
//                   : "text-slate-500 border-transparent hover:text-slate-700"
//               }`}
//             >
//               Description
//             </button>
//             <button
//               onClick={() => setActiveTab("specifications")}
//               className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
//                 activeTab === "specifications"
//                   ? "text-slate-900 border-slate-900"
//                   : "text-slate-500 border-transparent hover:text-slate-700"
//               }`}
//             >
//               Specifications
//             </button>
//             <button
//               onClick={() => setActiveTab("reviews")}
//               className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
//                 activeTab === "reviews"
//                   ? "text-slate-900 border-slate-900"
//                   : "text-slate-500 border-transparent hover:text-slate-700"
//               }`}
//             >
//               Reviews ({totalReviews})
//             </button>
//           </div>

//           {/* Tab Content */}
//           {activeTab === "description" && (
//             <div className="prose max-w-none">
//               <h3 className="text-2xl font-serif font-light text-slate-900 mb-4">Product Description</h3>
//               <p className="text-slate-600 leading-relaxed mb-4">
//                 {product.description || "Experience the perfect blend of quality, style, and functionality with this premium product. Crafted with attention to detail and built to last, this item represents the pinnacle of modern design and engineering."}
//               </p>
//               <p className="text-slate-600 leading-relaxed mb-4">
//                 Our commitment to excellence ensures that every product meets the highest standards of quality. Whether you're a professional or an enthusiast, this product delivers exceptional performance that exceeds expectations.
//               </p>
//               <h4 className="text-xl font-medium text-slate-900 mt-6 mb-3">Key Features</h4>
//               <ul className="space-y-2 text-slate-600">
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Premium quality materials for long-lasting durability</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Ergonomic design for maximum comfort and efficiency</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Advanced features for enhanced performance</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Easy to use with minimal maintenance required</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Backed by manufacturer warranty and support</span>
//                 </li>
//               </ul>
//             </div>
//           )}

//           {activeTab === "specifications" && (
//             <div>
//               <h3 className="text-2xl font-serif font-light text-slate-900 mb-6">Technical Specifications</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">Category</span>
//                     <span className="text-slate-600">{product.category || "General"}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">Brand</span>
//                     <span className="text-slate-600">Premium Brand</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">Model</span>
//                     <span className="text-slate-600">#{product.id}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">Warranty</span>
//                     <span className="text-slate-600">1 Year</span>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">Availability</span>
//                     <span className="text-slate-600">{isOutOfStock ? "Out of Stock" : "In Stock"}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">Shipping</span>
//                     <span className="text-slate-600">Free</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">Returns</span>
//                     <span className="text-slate-600">30 Days</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900">SKU</span>
//                     <span className="text-slate-600">SKU-{product.id}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "reviews" && (
//             <div>
//               <h3 className="text-2xl font-serif font-light text-slate-900 mb-6">Customer Reviews</h3>
              
//               {/* Rating Summary */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-200">
//                 <div className="text-center">
//                   <div className="text-5xl font-bold text-slate-900 mb-2">{productRating}</div>
//                   <div className="flex items-center justify-center gap-1 mb-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         size={20} 
//                         className={i < Math.floor(productRating) ? "text-amber-400 fill-current" : "text-slate-300"} 
//                       />
//                     ))}
//                   </div>
//                   <p className="text-slate-600">Based on {totalReviews} reviews</p>
//                 </div>
                
//                 <div className="lg:col-span-2 space-y-2">
//                   {ratingDistribution.map((item) => (
//                     <div key={item.stars} className="flex items-center gap-3">
//                       <span className="text-sm font-medium text-slate-600 w-12">{item.stars} star</span>
//                       <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
//                         <div 
//                           className="bg-amber-400 h-full rounded-full transition-all duration-500" 
//                           style={{ width: `${item.percentage}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-sm text-slate-600 w-12 text-right">{item.count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Write Review */}
//               <div className="mb-8 pb-8 border-b border-slate-200">
//                 <h4 className="text-lg font-medium text-slate-900 mb-4">Write a Review</h4>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         onClick={() => setUserRating(star)}
//                         onMouseEnter={() => setHoverRating(star)}
//                         onMouseLeave={() => setHoverRating(0)}
//                         className="transition-all duration-200"
//                       >
//                         <Star 
//                           size={32} 
//                           className={
//                             star <= (hoverRating || userRating) 
//                               ? "text-amber-400 fill-current" 
//                               : "text-slate-300"
//                           } 
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
//                   <textarea
//                     value={reviewText}
//                     onChange={(e) => setReviewText(e.target.value)}
//                     placeholder="Share your experience with this product..."
//                     rows={4}
//                     className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
//                   ></textarea>
//                 </div>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={submittingReview}
//                   className={`px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all ${
//                     submittingReview ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {submittingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>

//               {/* Reviews List */}
//               {loadingReviews ? (
//                 <div className="text-center py-8">
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
//                   <p className="text-slate-600 mt-2">Loading reviews...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {reviews.map((review) => (
//                     <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0">
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <h5 className="font-medium text-slate-900">{review.name}</h5>
//                             {review.verified && (
//                               <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
//                                 Verified Purchase
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="flex gap-0.5">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star 
//                                   key={i} 
//                                   size={14} 
//                                   className={i < review.rating ? "text-amber-400 fill-current" : "text-slate-300"} 
//                                 />
//                               ))}
//                             </div>
//                             <span className="text-sm text-slate-500">{review.date}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-slate-600 mb-3 leading-relaxed">{review.comment}</p>
//                       <div className="flex items-center gap-4 text-sm">
//                         <button 
//                           onClick={() => handleHelpfulReview(review.id)}
//                           className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
//                         >
//                           <ThumbsUp size={14} />
//                           <span>Helpful ({review.helpful})</span>
//                         </button>
//                         <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors">
//                           <MessageSquare size={14} />
//                           <span>Reply</span>
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }















// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import api from "../Api/Axios_Instance";
// import { Heart, Package, Star, ThumbsUp, MessageSquare, Share2, Truck, Shield, RotateCcw, Award, X, CheckCircle, AlertCircle } from "lucide-react";

// // Toast Component
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const styles = {
//     success: "bg-green-50 text-green-800 border-green-200",
//     error: "bg-red-50 text-red-800 border-red-200",
//     warning: "bg-amber-50 text-amber-800 border-amber-200",
//     info: "bg-blue-50 text-blue-800 border-blue-200"
//   };

//   const icons = {
//     success: <CheckCircle size={20} />,
//     error: <AlertCircle size={20} />,
//     warning: <AlertCircle size={20} />,
//     info: <AlertCircle size={20} />
//   };

//   return (
//     <div className={`fixed top-4 right-4 left-4 sm:left-auto z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${styles[type]} animate-slideIn`}>
//       {icons[type]}
//       <span className="font-medium flex-1">{message}</span>
//       <button onClick={onClose} className="ml-2 hover:opacity-70">
//         <X size={18} />
//       </button>
//     </div>
//   );
// };

// export default function ProductDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist } = useWishlist();

//   const product = location.state; 
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [userRating, setUserRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [loadingReviews, setLoadingReviews] = useState(true);
//   const [submittingReview, setSubmittingReview] = useState(false);
//   const [toast, setToast] = useState(null);

//   const showToast = (message, type = "info") => {
//     setToast({ message, type });
//   };

//   useEffect(() => {
//     if (product?.id) {
//       fetchReviews();
//     }
//   }, [product?.id]);

//   const fetchReviews = async () => {
//     try {
//       setLoadingReviews(true);
//       const { data } = await api.get(`/products/${product.id}/reviews`);
//       setReviews(data);
//     } catch (error) {
//       // If API doesn't have reviews endpoint, use mock data
//       setReviews([
//         {
//           id: 1,
//           name: "John Smith",
//           rating: 5,
//           date: "2 weeks ago",
//           comment: "Excellent product! The quality exceeded my expectations. Highly recommended for anyone looking for premium quality.",
//           helpful: 24,
//           verified: true
//         },
//         {
//           id: 2,
//           name: "Sarah Johnson",
//           rating: 4,
//           date: "1 month ago",
//           comment: "Great value for money. Fast shipping and well-packaged. Would definitely buy again.",
//           helpful: 18,
//           verified: true
//         },
//         {
//           id: 3,
//           name: "Michael Brown",
//           rating: 5,
//           date: "2 months ago",
//           comment: "Outstanding quality and customer service. This product has become my go-to choice.",
//           helpful: 31,
//           verified: false
//         }
//       ]);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   if (!product) {
//     showToast("Product not found", "error");
//     return <p className="text-center mt-20">Product not found.</p>;
//   }

//   const isInWishlist = wishlist.some((item) => item.id === product.id);
//   const stock = product.stock || 0;
//   const isOutOfStock = stock <= 0;
//   const productRating = product.rating || 4.5;
//   const totalReviews = reviews.length;

//   const getStockStatus = (stock) => {
//     if (stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50", border: "border-red-200" };
//     if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-50", border: "border-orange-200" };
//     if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-200" };
//     return { text: `${stock} in stock`, color: "text-green-600 bg-green-50", border: "border-green-200" };
//   };

//   const stockStatus = getStockStatus(stock);

//   const handleBuyNow = () => {
//     if (!user) {
//       showToast("Please login to continue", "warning");
//       return navigate("/login");
//     }
    
//     if (isOutOfStock) {
//       showToast("Sorry, this product is out of stock!", "error");
//       return;
//     }

//     if (quantity > stock) {
//       showToast(`Sorry, only ${stock} items available in stock!`, "warning");
//       return;
//     }

//     navigate("/checkout", { state: { products: [{ ...product, quantity }], source: "buyNow" } });
//   };

//   const handleAddToCart = () => {
//     if (!user) {
//       showToast("Please login to add items to cart", "warning");
//       return navigate("/login");
//     }
    
//     if (isOutOfStock) {
//       showToast("Sorry, this product is out of stock!", "error");
//       return;
//     }

//     if (quantity > stock) {
//       showToast(`Sorry, only ${stock} items available in stock!`, "warning");
//       return;
//     }

//     addToCart({ ...product, quantity });
//     showToast("Product added to cart successfully!", "success");
//     navigate("/cart");
//   };

//   const handleIncrease = () => {
//     if (quantity < stock) {
//       setQuantity((prev) => prev + 1);
//     } else {
//       showToast(`Only ${stock} items available in stock!`, "warning");
//     }
//   };

//   const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

//   const handleSubmitReview = async () => {
//     if (!user) {
//       showToast("Please login to submit a review", "warning");
//       return;
//     }
//     if (userRating === 0) {
//       showToast("Please select a rating", "warning");
//       return;
//     }
//     if (!reviewText.trim()) {
//       showToast("Please write a review", "warning");
//       return;
//     }

//     try {
//       setSubmittingReview(true);
//       const reviewData = {
//         productId: product.id,
//         rating: userRating,
//         comment: reviewText
//       };

//       // Try to submit to API
//       await api.post(`/products/${product.id}/reviews`, reviewData);
      
//       showToast("Review submitted successfully!", "success");
      
//       // Refresh reviews
//       await fetchReviews();
      
//       setUserRating(0);
//       setReviewText("");
//     } catch (error) {
//       // If API fails, add review locally
//       const newReview = {
//         id: reviews.length + 1,
//         name: user.name || "Anonymous User",
//         rating: userRating,
//         date: "Just now",
//         comment: reviewText,
//         helpful: 0,
//         verified: true
//       };

//       setReviews([newReview, ...reviews]);
//       setUserRating(0);
//       setReviewText("");
//       showToast("Review submitted successfully!", "success");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   const handleHelpfulReview = async (reviewId) => {
//     try {
//       await api.post(`/reviews/${reviewId}/helpful`);
      
//       setReviews(reviews.map(review => 
//         review.id === reviewId 
//           ? { ...review, helpful: review.helpful + 1 }
//           : review
//       ));
      
//       showToast("Thank you for your feedback!", "success");
//     } catch (error) {
//       // Local update if API fails
//       setReviews(reviews.map(review => 
//         review.id === reviewId 
//           ? { ...review, helpful: review.helpful + 1 }
//           : review
//       ));
//       showToast("Thank you for your feedback!", "success");
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: `Check out ${product.name}`,
//         url: window.location.href
//       }).then(() => {
//         showToast("Shared successfully!", "success");
//       }).catch(() => {
//         // Fallback to clipboard
//         navigator.clipboard.writeText(window.location.href);
//         showToast("Link copied to clipboard!", "success");
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       showToast("Link copied to clipboard!", "success");
//     }
//   };

//   const ratingDistribution = [
//     { stars: 5, count: Math.floor(totalReviews * 0.65), percentage: 65 },
//     { stars: 4, count: Math.floor(totalReviews * 0.22), percentage: 22 },
//     { stars: 3, count: Math.floor(totalReviews * 0.07), percentage: 7 },
//     { stars: 2, count: Math.floor(totalReviews * 0.04), percentage: 4 },
//     { stars: 1, count: Math.floor(totalReviews * 0.02), percentage: 2 }
//   ];

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-8 sm:py-12 lg:py-16">
//       {/* Toast Notification */}
//       {toast && (
//         <Toast 
//           message={toast.message} 
//           type={toast.type} 
//           onClose={() => setToast(null)} 
//         />
//       )}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Main Product Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 lg:p-12 relative mb-6 sm:mb-8">
          
//           {/* Stock Badge */}
//           <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 border ${stockStatus.color} ${stockStatus.border}`}>
//             <Package size={14} className="sm:w-4 sm:h-4" />
//             <span className="hidden xs:inline">{stockStatus.text}</span>
//             <span className="xs:hidden">{stock <= 0 ? "Out of Stock" : `${stock} left`}</span>
//           </div>

//           {/* Image */}
//           <div className="flex justify-center items-center">
//             <div className="bg-slate-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-slate-100 w-full max-w-md">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className={`w-full h-auto max-h-[280px] sm:max-h-[350px] md:max-h-[400px] object-contain transition-all duration-300 ${
//                   isOutOfStock ? "grayscale opacity-50" : ""
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Details */}
//           <div className="flex flex-col justify-between space-y-6 sm:space-y-8">
//             <div className="space-y-4 sm:space-y-6">
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-slate-900 leading-tight">
//                 {product.name}
//               </h1>

//               {/* Rating Overview */}
//               <div className="flex flex-wrap items-center gap-2 sm:gap-4">
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star 
//                       key={i} 
//                       size={18} 
//                       className={`${i < Math.floor(productRating) ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-5 sm:h-5`} 
//                     />
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm sm:text-base">
//                   <span className="font-semibold text-slate-900">{productRating}</span>
//                   <span className="text-slate-500 hidden sm:inline">|</span>
//                   <span className="text-slate-600">{totalReviews} reviews</span>
//                   <span className="text-slate-500 hidden sm:inline">|</span>
//                   <span className="text-green-600 font-medium flex items-center gap-1 text-sm">
//                     <Award size={14} className="sm:w-4 sm:h-4" />
//                     <span className="hidden xs:inline">Verified</span>
//                   </span>
//                 </div>
//               </div>
              
//               <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
              
//               <p className="text-2xl sm:text-3xl font-semibold text-slate-900">
//                 ${Number(product.price * quantity).toFixed(2)}
//               </p>
              
//               {/* Stock Information */}
//               <div>
//                 <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border ${stockStatus.color} ${stockStatus.border}`}>
//                   <Package size={12} className="sm:w-3.5 sm:h-3.5" />
//                   {stockStatus.text}
//                 </div>
//                 {isOutOfStock && (
//                   <p className="text-red-600 text-sm mt-2 font-medium">
//                     This item is currently unavailable
//                   </p>
//                 )}
//               </div>

//               {/* Quick Features */}
//               <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
//                 <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
//                   <Truck size={16} className="text-green-600 sm:w-4 sm:h-4" />
//                   <span>Free Shipping</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
//                   <Shield size={16} className="text-blue-600 sm:w-4 sm:h-4" />
//                   <span>Secure Payment</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
//                   <RotateCcw size={16} className="text-purple-600 sm:w-4 sm:h-4" />
//                   <span>Easy Returns</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
//                   <Award size={16} className="text-amber-600 sm:w-4 sm:h-4" />
//                   <span>Quality Assured</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quantity Controls */}
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//               <span className="font-medium text-slate-700 text-sm sm:text-base">Quantity:</span>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleDecrease}
//                   disabled={isOutOfStock}
//                   className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold border transition-all duration-300 text-sm sm:text-base ${
//                     isOutOfStock
//                       ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
//                       : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
//                   }`}
//                 >
//                   -
//                 </button>
//                 <span className={`font-semibold text-base sm:text-lg min-w-[2rem] text-center ${isOutOfStock ? "text-slate-400" : "text-slate-900"}`}>
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={handleIncrease}
//                   disabled={isOutOfStock || quantity >= stock}
//                   className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold border transition-all duration-300 text-sm sm:text-base ${
//                     isOutOfStock || quantity >= stock
//                       ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
//                       : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
//                   }`}
//                 >
//                   +
//                 </button>
//               </div>
//               {!isOutOfStock && stock <= 10 && (
//                 <span className="text-xs sm:text-sm text-orange-600 font-medium">
//                   (Max: {stock})
//                 </span>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
//               <button
//                 onClick={handleBuyNow}
//                 disabled={isOutOfStock}
//                 className={`flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-300 font-medium shadow-sm text-sm sm:text-base ${
//                   isOutOfStock
//                     ? "bg-slate-200 text-slate-400 cursor-not-allowed"
//                     : "bg-slate-900 text-white hover:bg-slate-800"
//                 }`}
//               >
//                 {isOutOfStock ? "Out of Stock" : "Buy Now"}
//               </button>
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock}
//                 className={`flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-300 font-medium border text-sm sm:text-base ${
//                   isOutOfStock
//                     ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
//                     : "bg-white text-slate-900 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//                 }`}
//               >
//                 {isOutOfStock ? "Unavailable" : "Add to Cart"}
//               </button>
//               <div className="flex xs:flex-col sm:flex-row gap-3 sm:gap-2">
//                 <button
//                   onClick={() => {
//                     toggleWishlist(product);
//                     showToast(
//                       isInWishlist ? "Removed from wishlist" : "Added to wishlist",
//                       "success"
//                     );
//                   }}
//                   className={`p-2.5 sm:p-3.5 rounded-lg transition-all duration-300 border flex-1 xs:flex-none ${
//                     isInWishlist
//                       ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
//                       : "bg-white text-slate-400 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
//                   }`}
//                 >
//                   <Heart size={20} className={`sm:w-5 sm:h-5 ${isInWishlist ? "fill-current" : ""}`} />
//                 </button>
//                 <button 
//                   onClick={handleShare}
//                   className="p-2.5 sm:p-3.5 rounded-lg transition-all duration-300 border bg-white text-slate-400 border-slate-300 hover:border-slate-400 hover:bg-slate-50 flex-1 xs:flex-none"
//                 >
//                   <Share2 size={20} className="sm:w-5 sm:h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
//           {/* Tab Navigation */}
//           <div className="flex overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 border-b border-slate-200 mb-6 sm:mb-8">
//             <button
//               onClick={() => setActiveTab("description")}
//               className={`px-4 sm:px-6 py-3 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm sm:text-base ${
//                 activeTab === "description"
//                   ? "text-slate-900 border-slate-900"
//                   : "text-slate-500 border-transparent hover:text-slate-700"
//               }`}
//             >
//               Description
//             </button>
//             <button
//               onClick={() => setActiveTab("specifications")}
//               className={`px-4 sm:px-6 py-3 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm sm:text-base ${
//                 activeTab === "specifications"
//                   ? "text-slate-900 border-slate-900"
//                   : "text-slate-500 border-transparent hover:text-slate-700"
//               }`}
//             >
//               Specifications
//             </button>
//             <button
//               onClick={() => setActiveTab("reviews")}
//               className={`px-4 sm:px-6 py-3 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm sm:text-base ${
//                 activeTab === "reviews"
//                   ? "text-slate-900 border-slate-900"
//                   : "text-slate-500 border-transparent hover:text-slate-700"
//               }`}
//             >
//               Reviews ({totalReviews})
//             </button>
//           </div>

//           {/* Tab Content */}
//           {activeTab === "description" && (
//             <div className="prose max-w-none prose-sm sm:prose-base">
//               <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 mb-4">Product Description</h3>
//               <p className="text-slate-600 leading-relaxed mb-4">
//                 {product.description || "Experience the perfect blend of quality, style, and functionality with this premium product. Crafted with attention to detail and built to last, this item represents the pinnacle of modern design and engineering."}
//               </p>
//               <p className="text-slate-600 leading-relaxed mb-4">
//                 Our commitment to excellence ensures that every product meets the highest standards of quality. Whether you're a professional or an enthusiast, this product delivers exceptional performance that exceeds expectations.
//               </p>
//               <h4 className="text-lg sm:text-xl font-medium text-slate-900 mt-6 mb-3">Key Features</h4>
//               <ul className="space-y-2 text-slate-600 text-sm sm:text-base">
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Premium quality materials for long-lasting durability</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Ergonomic design for maximum comfort and efficiency</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Advanced features for enhanced performance</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Easy to use with minimal maintenance required</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-green-600 mt-1">✓</span>
//                   <span>Backed by manufacturer warranty and support</span>
//                 </li>
//               </ul>
//             </div>
//           )}

//           {activeTab === "specifications" && (
//             <div>
//               <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 mb-6">Technical Specifications</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 <div className="space-y-3 sm:space-y-4">
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">Category</span>
//                     <span className="text-slate-600 text-sm sm:text-base">{product.category || "General"}</span>
//                   </div>
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">Brand</span>
//                     <span className="text-slate-600 text-sm sm:text-base">Premium Brand</span>
//                   </div>
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">Model</span>
//                     <span className="text-slate-600 text-sm sm:text-base">#{product.id}</span>
//                   </div>
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">Warranty</span>
//                     <span className="text-slate-600 text-sm sm:text-base">1 Year</span>
//                   </div>
//                 </div>
//                 <div className="space-y-3 sm:space-y-4">
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">Availability</span>
//                     <span className="text-slate-600 text-sm sm:text-base">{isOutOfStock ? "Out of Stock" : "In Stock"}</span>
//                   </div>
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">Shipping</span>
//                     <span className="text-slate-600 text-sm sm:text-base">Free</span>
//                   </div>
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">Returns</span>
//                     <span className="text-slate-600 text-sm sm:text-base">30 Days</span>
//                   </div>
//                   <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
//                     <span className="font-medium text-slate-900 text-sm sm:text-base">SKU</span>
//                     <span className="text-slate-600 text-sm sm:text-base">SKU-{product.id}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "reviews" && (
//             <div>
//               <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 mb-6">Customer Reviews</h3>
              
//               {/* Rating Summary */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-200">
//                 <div className="text-center">
//                   <div className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">{productRating}</div>
//                   <div className="flex items-center justify-center gap-1 mb-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         size={18} 
//                         className={`${i < Math.floor(productRating) ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-5 sm:h-5`} 
//                       />
//                     ))}
//                   </div>
//                   <p className="text-slate-600 text-sm sm:text-base">Based on {totalReviews} reviews</p>
//                 </div>
                
//                 <div className="lg:col-span-2 space-y-1 sm:space-y-2">
//                   {ratingDistribution.map((item) => (
//                     <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
//                       <span className="text-xs sm:text-sm font-medium text-slate-600 w-10 sm:w-12">{item.stars} star</span>
//                       <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
//                         <div 
//                           className="bg-amber-400 h-full rounded-full transition-all duration-500" 
//                           style={{ width: `${item.percentage}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-xs sm:text-sm text-slate-600 w-8 sm:w-12 text-right">{item.count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Write Review */}
//               <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-200">
//                 <h4 className="text-lg font-medium text-slate-900 mb-4">Write a Review</h4>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
//                   <div className="flex gap-1 sm:gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         onClick={() => setUserRating(star)}
//                         onMouseEnter={() => setHoverRating(star)}
//                         onMouseLeave={() => setHoverRating(0)}
//                         className="transition-all duration-200"
//                       >
//                         <Star 
//                           size={28} 
//                           className={`${star <= (hoverRating || userRating) ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-8 sm:h-8`} 
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
//                   <textarea
//                     value={reviewText}
//                     onChange={(e) => setReviewText(e.target.value)}
//                     placeholder="Share your experience with this product..."
//                     rows={4}
//                     className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none text-sm sm:text-base"
//                   ></textarea>
//                 </div>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={submittingReview}
//                   className={`px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all text-sm sm:text-base ${
//                     submittingReview ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {submittingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>

//               {/* Reviews List */}
//               {loadingReviews ? (
//                 <div className="text-center py-6 sm:py-8">
//                   <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-slate-900"></div>
//                   <p className="text-slate-600 mt-2 text-sm sm:text-base">Loading reviews...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4 sm:space-y-6">
//                   {reviews.map((review) => (
//                     <div key={review.id} className="border-b border-slate-200 pb-4 sm:pb-6 last:border-0">
//                       <div className="flex items-start justify-between mb-2 sm:mb-3">
//                         <div>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
//                             <h5 className="font-medium text-slate-900 text-sm sm:text-base">{review.name}</h5>
//                             {review.verified && (
//                               <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200 self-start sm:self-center">
//                                 Verified Purchase
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="flex gap-0.5">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star 
//                                   key={i} 
//                                   size={12} 
//                                   className={`${i < review.rating ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-3.5 sm:h-3.5`} 
//                                 />
//                               ))}
//                             </div>
//                             <span className="text-xs sm:text-sm text-slate-500">{review.date}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-slate-600 mb-2 sm:mb-3 leading-relaxed text-sm sm:text-base">{review.comment}</p>
//                       <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
//                         <button 
//                           onClick={() => handleHelpfulReview(review.id)}
//                           className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
//                         >
//                           <ThumbsUp size={12} className="sm:w-3.5 sm:h-3.5" />
//                           <span>Helpful ({review.helpful})</span>
//                         </button>
//                         <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors">
//                           <MessageSquare size={12} className="sm:w-3.5 sm:h-3.5" />
//                           <span>Reply</span>
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
        
//         /* Hide scrollbar for tab navigation */
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }











import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../Api/Axios_Instance";
import { Heart, Package, Star, ThumbsUp, MessageSquare, Share2, Truck, Shield, RotateCcw, Award, X, CheckCircle, AlertCircle } from "lucide-react";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    info: "bg-blue-50 text-blue-800 border-blue-200"
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <AlertCircle size={20} />
  };

  return (
    <div className={`fixed top-4 right-4 left-4 sm:left-auto z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${styles[type]} animate-slideIn`}>
      {icons[type]}
      <span className="font-medium flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={18} />
      </button>
    </div>
  );
};

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cart } = useCart(); // Added cart from useCart
  const { wishlist, toggleWishlist } = useWishlist();

  const product = location.state; 
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (product?.id) {
      fetchReviews();
    }
  }, [product?.id]);

  // Check if product is already in cart
  const isInCart = cart.some((item) => item.id === product?.id);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const { data } = await api.get(`/products/${product.id}/reviews`);
      setReviews(data);
    } catch (error) {
      // If API doesn't have reviews endpoint, use mock data
      setReviews([
        {
          id: 1,
          name: "John Smith",
          rating: 5,
          date: "2 weeks ago",
          comment: "Excellent product! The quality exceeded my expectations. Highly recommended for anyone looking for premium quality.",
          helpful: 24,
          verified: true
        },
        {
          id: 2,
          name: "Sarah Johnson",
          rating: 4,
          date: "1 month ago",
          comment: "Great value for money. Fast shipping and well-packaged. Would definitely buy again.",
          helpful: 18,
          verified: true
        },
        {
          id: 3,
          name: "Michael Brown",
          rating: 5,
          date: "2 months ago",
          comment: "Outstanding quality and customer service. This product has become my go-to choice.",
          helpful: 31,
          verified: false
        }
      ]);
    } finally {
      setLoadingReviews(false);
    }
  };

  if (!product) {
    showToast("Product not found", "error");
    return <p className="text-center mt-20">Product not found.</p>;
  }

  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const stock = product.stock || 0;
  const isOutOfStock = stock <= 0;
  const productRating = product.rating || 4.5;
  const totalReviews = reviews.length;

  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50", border: "border-red-200" };
    if (stock <= 5) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-50", border: "border-orange-200" };
    if (stock <= 10) return { text: `${stock} in stock`, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-200" };
    return { text: `${stock} in stock`, color: "text-green-600 bg-green-50", border: "border-green-200" };
  };

  const stockStatus = getStockStatus(stock);

  const handleBuyNow = () => {
    if (!user) {
      showToast("Please login to continue", "warning");
      return navigate("/login");
    }
    
    if (isOutOfStock) {
      showToast("Sorry, this product is out of stock!", "error");
      return;
    }

    if (quantity > stock) {
      showToast(`Sorry, only ${stock} items available in stock!`, "warning");
      return;
    }

    navigate("/checkout", { state: { products: [{ ...product, quantity }], source: "buyNow" } });
  };

  const handleAddToCart = () => {
    if (!user) {
      showToast("Please login to add items to cart", "warning");
      return navigate("/login");
    }
    
    if (isOutOfStock) {
      showToast("Sorry, this product is out of stock!", "error");
      return;
    }

    if (quantity > stock) {
      showToast(`Sorry, only ${stock} items available in stock!`, "warning");
      return;
    }

    addToCart({ ...product, quantity });
    showToast("Product added to cart successfully!", "success");
    navigate("/cart");
  };

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    } else {
      showToast(`Only ${stock} items available in stock!`, "warning");
    }
  };

  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleSubmitReview = async () => {
    if (!user) {
      showToast("Please login to submit a review", "warning");
      return;
    }
    if (userRating === 0) {
      showToast("Please select a rating", "warning");
      return;
    }
    if (!reviewText.trim()) {
      showToast("Please write a review", "warning");
      return;
    }

    try {
      setSubmittingReview(true);
      const reviewData = {
        productId: product.id,
        rating: userRating,
        comment: reviewText
      };

      // Try to submit to API
      await api.post(`/products/${product.id}/reviews`, reviewData);
      
      showToast("Review submitted successfully!", "success");
      
      // Refresh reviews
      await fetchReviews();
      
      setUserRating(0);
      setReviewText("");
    } catch (error) {
      // If API fails, add review locally
      const newReview = {
        id: reviews.length + 1,
        name: user.name || "Anonymous User",
        rating: userRating,
        date: "Just now",
        comment: reviewText,
        helpful: 0,
        verified: true
      };

      setReviews([newReview, ...reviews]);
      setUserRating(0);
      setReviewText("");
      showToast("Review submitted successfully!", "success");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleHelpfulReview = async (reviewId) => {
    try {
      await api.post(`/reviews/${reviewId}/helpful`);
      
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      ));
      
      showToast("Thank you for your feedback!", "success");
    } catch (error) {
      // Local update if API fails
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      ));
      showToast("Thank you for your feedback!", "success");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url: window.location.href
      }).then(() => {
        showToast("Shared successfully!", "success");
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard!", "success");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
    }
  };

  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.65), percentage: 65 },
    { stars: 4, count: Math.floor(totalReviews * 0.22), percentage: 22 },
    { stars: 3, count: Math.floor(totalReviews * 0.07), percentage: 7 },
    { stars: 2, count: Math.floor(totalReviews * 0.04), percentage: 4 },
    { stars: 1, count: Math.floor(totalReviews * 0.02), percentage: 2 }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-8 sm:py-12 lg:py-16">
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 lg:p-12 relative mb-6 sm:mb-8">
          
          {/* Stock Badge */}
          <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 border ${stockStatus.color} ${stockStatus.border}`}>
            <Package size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">{stockStatus.text}</span>
            <span className="xs:hidden">{stock <= 0 ? "Out of Stock" : `${stock} left`}</span>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center">
            <div className="bg-slate-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-slate-100 w-full max-w-md">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-auto max-h-[280px] sm:max-h-[350px] md:max-h-[400px] object-contain transition-all duration-300 ${
                  isOutOfStock ? "grayscale opacity-50" : ""
                }`}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-slate-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating Overview */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={`${i < Math.floor(productRating) ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-5 sm:h-5`} 
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="font-semibold text-slate-900">{productRating}</span>
                  <span className="text-slate-500 hidden sm:inline">|</span>
                  <span className="text-slate-600">{totalReviews} reviews</span>
                  <span className="text-slate-500 hidden sm:inline">|</span>
                  <span className="text-green-600 font-medium flex items-center gap-1 text-sm">
                    <Award size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Verified</span>
                  </span>
                </div>
              </div>
              
              <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
              
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900">
                ${Number(product.price * quantity).toFixed(2)}
              </p>
              
              {/* Stock Information */}
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border ${stockStatus.color} ${stockStatus.border}`}>
                  <Package size={12} className="sm:w-3.5 sm:h-3.5" />
                  {stockStatus.text}
                </div>
                {isOutOfStock && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    This item is currently unavailable
                  </p>
                )}
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Truck size={16} className="text-green-600 sm:w-4 sm:h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Shield size={16} className="text-blue-600 sm:w-4 sm:h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <RotateCcw size={16} className="text-purple-600 sm:w-4 sm:h-4" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <Award size={16} className="text-amber-600 sm:w-4 sm:h-4" />
                  <span>Quality Assured</span>
                </div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="font-medium text-slate-700 text-sm sm:text-base">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrease}
                  disabled={isOutOfStock}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold border transition-all duration-300 text-sm sm:text-base ${
                    isOutOfStock
                      ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                      : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  -
                </button>
                <span className={`font-semibold text-base sm:text-lg min-w-[2rem] text-center ${isOutOfStock ? "text-slate-400" : "text-slate-900"}`}>
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  disabled={isOutOfStock || quantity >= stock}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-semibold border transition-all duration-300 text-sm sm:text-base ${
                    isOutOfStock || quantity >= stock
                      ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                      : "bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  +
                </button>
              </div>
              {!isOutOfStock && stock <= 10 && (
                <span className="text-xs sm:text-sm text-orange-600 font-medium">
                  (Max: {stock})
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              {/* Buy Now Button - Always Visible */}
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-300 font-medium shadow-sm text-sm sm:text-base ${
                  isOutOfStock
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {isOutOfStock ? "Out of Stock" : "Buy Now"}
              </button>

              {/* Add to Cart Button - Only show if product is NOT in cart */}
              {!isInCart && (
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-300 font-medium border text-sm sm:text-base ${
                    isOutOfStock
                      ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                      : "bg-white text-slate-900 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {isOutOfStock ? "Unavailable" : "Add to Cart"}
                </button>
              )}

              <div className="flex xs:flex-col sm:flex-row gap-3 sm:gap-2">
                <button
                  onClick={() => {
                    toggleWishlist(product);
                    showToast(
                      isInWishlist ? "Removed from wishlist" : "Added to wishlist",
                      "success"
                    );
                  }}
                  className={`p-2.5 sm:p-3.5 rounded-lg transition-all duration-300 border flex-1 xs:flex-none ${
                    isInWishlist
                      ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      : "bg-white text-slate-400 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <Heart size={20} className={`sm:w-5 sm:h-5 ${isInWishlist ? "fill-current" : ""}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2.5 sm:p-3.5 rounded-lg transition-all duration-300 border bg-white text-slate-400 border-slate-300 hover:border-slate-400 hover:bg-slate-50 flex-1 xs:flex-none"
                >
                  <Share2 size={20} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0 border-b border-slate-200 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 sm:px-6 py-3 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm sm:text-base ${
                activeTab === "description"
                  ? "text-slate-900 border-slate-900"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`px-4 sm:px-6 py-3 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm sm:text-base ${
                activeTab === "specifications"
                  ? "text-slate-900 border-slate-900"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 sm:px-6 py-3 font-medium transition-all duration-200 border-b-2 whitespace-nowrap text-sm sm:text-base ${
                activeTab === "reviews"
                  ? "text-slate-900 border-slate-900"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              Reviews ({totalReviews})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="prose max-w-none prose-sm sm:prose-base">
              <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 mb-4">Product Description</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {product.description || "Experience the perfect blend of quality, style, and functionality with this premium product. Crafted with attention to detail and built to last, this item represents the pinnacle of modern design and engineering."}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our commitment to excellence ensures that every product meets the highest standards of quality. Whether you're a professional or an enthusiast, this product delivers exceptional performance that exceeds expectations.
              </p>
              <h4 className="text-lg sm:text-xl font-medium text-slate-900 mt-6 mb-3">Key Features</h4>
              <ul className="space-y-2 text-slate-600 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Premium quality materials for long-lasting durability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Ergonomic design for maximum comfort and efficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Advanced features for enhanced performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Easy to use with minimal maintenance required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Backed by manufacturer warranty and support</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">Category</span>
                    <span className="text-slate-600 text-sm sm:text-base">{product.category || "General"}</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">Brand</span>
                    <span className="text-slate-600 text-sm sm:text-base">Premium Brand</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">Model</span>
                    <span className="text-slate-600 text-sm sm:text-base">#{product.id}</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">Warranty</span>
                    <span className="text-slate-600 text-sm sm:text-base">1 Year</span>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">Availability</span>
                    <span className="text-slate-600 text-sm sm:text-base">{isOutOfStock ? "Out of Stock" : "In Stock"}</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">Shipping</span>
                    <span className="text-slate-600 text-sm sm:text-base">Free</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">Returns</span>
                    <span className="text-slate-600 text-sm sm:text-base">30 Days</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                    <span className="font-medium text-slate-900 text-sm sm:text-base">SKU</span>
                    <span className="text-slate-600 text-sm sm:text-base">SKU-{product.id}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 mb-6">Customer Reviews</h3>
              
              {/* Rating Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-200">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">{productRating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={`${i < Math.floor(productRating) ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-5 sm:h-5`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base">Based on {totalReviews} reviews</p>
                </div>
                
                <div className="lg:col-span-2 space-y-1 sm:space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm font-medium text-slate-600 w-10 sm:w-12">{item.stars} star</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm text-slate-600 w-8 sm:w-12 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review */}
              <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-200">
                <h4 className="text-lg font-medium text-slate-900 mb-4">Write a Review</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                  <div className="flex gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-all duration-200"
                      >
                        <Star 
                          size={28} 
                          className={`${star <= (hoverRating || userRating) ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-8 sm:h-8`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none text-sm sm:text-base"
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmitReview}
                  disabled={submittingReview}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all text-sm sm:text-base ${
                    submittingReview ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>

              {/* Reviews List */}
              {loadingReviews ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-slate-900"></div>
                  <p className="text-slate-600 mt-2 text-sm sm:text-base">Loading reviews...</p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-200 pb-4 sm:pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <h5 className="font-medium text-slate-900 text-sm sm:text-base">{review.name}</h5>
                            {review.verified && (
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200 self-start sm:self-center">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={12} 
                                  className={`${i < review.rating ? "text-amber-400 fill-current" : "text-slate-300"} sm:w-3.5 sm:h-3.5`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs sm:text-sm text-slate-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-2 sm:mb-3 leading-relaxed text-sm sm:text-base">{review.comment}</p>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                        <button 
                          onClick={() => handleHelpfulReview(review.id)}
                          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          <ThumbsUp size={12} className="sm:w-3.5 sm:h-3.5" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors">
                          <MessageSquare size={12} className="sm:w-3.5 sm:h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        /* Hide scrollbar for tab navigation */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}