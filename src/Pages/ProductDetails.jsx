
// import { toast } from "sonner";

// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import api from "../Api/Axios_Instance";
// import { 
//   Heart, Package, Star, ThumbsUp, MessageSquare, Share2, Truck, 
//   Shield, RotateCcw, Award, X, CheckCircle, AlertCircle, 
//   ChevronRight, Sparkles, Tag, Clock, Users, Eye, ShoppingBag,
//   ArrowRight, CreditCard, Lock, Award as AwardIcon, Loader
// } from "lucide-react";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { addToCart, cart } = useCart();
//   const { wishlist, toggleWishlist, addToWishlist, removeFromWishlist } = useWishlist();

//   // State for product data
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [userRating, setUserRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingReviews, setLoadingReviews] = useState(true);
//   const [submittingReview, setSubmittingReview] = useState(false);
//   const [productStats, setProductStats] = useState({
//     views: 0,
//     purchases: 0,
//     wishlistCount: 0,
//     averageRating: 0,
//     reviewCount: 0,
//     isPremium: false
//   });
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loadingRelated, setLoadingRelated] = useState(false);

//   // Check if product is in cart/wishlist
//   const isInCart = cart.some((item) => item.productId === parseInt(id));
//   const isInWishlist = wishlist.some((item) => item.productId === parseInt(id));


// const passedRating = location.state?.rating;

//   // Fetch product details
  

//   useEffect(() => {
//     fetchProductDetails();
//     fetchReviews();
//     fetchProductStats();
//     fetchRelatedProducts();
    
//     // Track product view
//     if (id) {
//       api.post(`/Products/${id}/view`).catch(console.error);
//     }
//   }, [id]);

//   // Corrected fetchProductDetails function
//   const fetchProductDetails = async () => {
//   try {
//     setLoading(true);
//     console.log("📡 Fetching product from API with ID:", id);

// const response = await api.get(`/Products/GetBy_${id}`);

// if (response.data.statusCode === 200) {
//   const productData = response.data.data;

// const processedProduct = {
//   ...productData,
//   stockQuantity:
//     productData.stockQuantity ??
//     productData.stock ??
//     productData.quantity ??
//     0,

//   imageUrl:
//     productData.imageUrl ||
//     productData.image ||
//     "https://via.placeholder.com/400",
// };

//   setProduct(processedProduct);
// } else {
//   throw new Error("Product not found");
// }

//   } catch (error) {
//     console.error("❌ Error fetching product:", error);
//     toast.error("Failed to load product details");

//     // Fallback: search all products
//     try {
//       const allResponse = await api.get("/Products/User/GetAll");
//       const allProducts = allResponse.data.data || allResponse.data || [];
//       const foundProduct = allProducts.find(
//         (p) => p.id == id || p.productId == id
//       );

//       if (foundProduct) {
//        setProduct({
//   ...foundProduct,
//   stockQuantity:
//     foundProduct.stockQuantity ??
//     foundProduct.stock ??
//     foundProduct.quantity ??
//     0,

//   imageUrl:
//     foundProduct.imageUrl ||
//     foundProduct.image ||
//     "https://via.placeholder.com/400",
// });

//       }
//     } catch (fallbackError) {
//       console.error("❌ Fallback also failed:", fallbackError);
//     }
//   } finally {
//     setLoading(false);
//   }
// };


//   // ✅ UPDATED: Corrected fetchReviews function with real user data
//   const fetchReviews = async () => {
//     try {
//       setLoadingReviews(true);
      
//       const response = await api.get(`/Products/${id}/reviews`);
      
//       console.log("📊 Reviews API Response:", response.data);
      
// if (response.data.statusCode === 200) {
//         const formattedReviews = response.data.data.map(review => ({
//           id: review.id,
//           userId: review.userId,
//           name: review.userName || "Anonymous",
//           rating: review.rating,
//           date: formatReviewDate(review.createdAt),
//           comment: review.comment,
//           helpful: review.helpfulCount,
//           verified: review.isVerifiedPurchase,
//           avatar: review.userAvatar || (review.userName?.charAt(0) || "A"),
//           profileImage: review.userProfileImage || "",
//           isHelpful: review.isHelpful || false,
//           createdAt: review.createdAt
//         }));
        
//         // ✅ Sort by date (newest first)
//         const sortedReviews = formattedReviews.sort((a, b) => 
//           new Date(b.createdAt) - new Date(a.createdAt)
//         );
        
//         console.log("✅ Loaded reviews:", sortedReviews.length);
//         setReviews(sortedReviews);
//       } else {
//         console.warn("⚠️ API returned success:false");
//         setReviews([]);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching reviews:", error);
//       setReviews([]);
//     } finally {
//       setLoadingReviews(false);
//     }
//   };

//   // Corrected fetchProductStats function
//   const fetchProductStats = async () => {
//     try {
//       // Use correct endpoint for product stats
//       const response = await api.get(`/Products/${id}/stats`);
// if (response.data.statusCode === 200) {
//         setProductStats({
//           views: response.data.data.views || 0,
//           purchases: response.data.data.purchases || 0,
//           wishlistCount: response.data.data.wishlistCount || 0,
//           averageRating: response.data.data.averageRating || 0,
//           reviewCount: response.data.data.reviewCount || 0,
//           isPremium: response.data.data.averageRating >= 4.5
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//       // Set default stats if API fails
//       setProductStats({
//         views: Math.floor(Math.random() * 2000) + 500,
//         purchases: Math.floor(Math.random() * 200) + 50,
//         wishlistCount: Math.floor(Math.random() * 100) + 20,
//         averageRating: 4.5,
//         reviewCount: 2,
//         isPremium: true
//       });
//     }
//   };

//   // Corrected fetchRelatedProducts function
//   const fetchRelatedProducts = async () => {
//     try {
//       setLoadingRelated(true);
//       // Use correct endpoint for related products
//       const response = await api.get(`/Products/${id}/related`);
// if (response.data.statusCode === 200) {
//         setRelatedProducts(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching related products:", error);
//       setRelatedProducts([]); // Empty array if API fails
//     } finally {
//       setLoadingRelated(false);
//     }
//   };

//   // ✅ UPDATED: Better formatReviewDate function
//   const formatReviewDate = (dateString) => {
//     if (!dateString) return "Recently";
    
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffInMs = now - date;
//       const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//       const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//       const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      
//       if (diffInMinutes < 1) return "Just now";
//       if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
//       if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
//       if (diffInDays === 0) return "Today";
//       if (diffInDays === 1) return "Yesterday";
//       if (diffInDays < 7) return `${diffInDays} days ago`;
//       if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) !== 1 ? 's' : ''} ago`;
//       if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) !== 1 ? 's' : ''} ago`;
      
//       return date.toLocaleDateString('en-US', { 
//         year: 'numeric', 
//         month: 'short', 
//         day: 'numeric' 
//       });
//     } catch (error) {
//       return "Recently";
//     }
//   };

//   const getStockStatus = (stock) => {
//     if (!product || stock === undefined) {
//       return { text: "Checking stock...", color: "text-gray-400" };
//     }

//     if (stock <= 0) return { 
//       text: "Out of Stock", 
//       color: "text-red-400 dark:text-red-300 bg-red-50 dark:bg-red-900/20", 
//       border: "border-red-200 dark:border-red-800/30",
//       iconColor: "text-red-400 dark:text-red-300"
//     };
//     if (stock <= 5) return { 
//       text: `Only ${stock} left`, 
//       color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20", 
//       border: "border-amber-200 dark:border-amber-800/30",
//       iconColor: "text-amber-600 dark:text-amber-400"
//     };
//     if (stock <= 10) return { 
//       text: `${stock} in stock`, 
//       color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20", 
//       border: "border-emerald-200 dark:border-emerald-800/30",
//       iconColor: "text-emerald-600 dark:text-emerald-400"
//     };
//     return { 
//       text: "In Stock", 
//       color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20", 
//       border: "border-green-200 dark:border-green-800/30",
//       iconColor: "text-green-600 dark:text-green-400"
//     };
//   };

//   const handleBuyNow = () => {
//     if (!user) {
//       toast("Please login to continue");
//       return navigate("/login");
//     }

//     if (!product || product.stockQuantity <= 0) {
//       toast.error("Sorry, this product is out of stock!");
//       return;
//     }

//     if (quantity > product.stockQuantity) {
//       toast.error(`Sorry, Only ${product.stockQuantity} items available!`);
//       return;
//     }

//     navigate("/checkout", {
//       state: { products: [{ ...product, quantity }], source: "buyNow" },
//     });
//   };

//   const handleAddToCart = async () => {
//     if (!user) {
//       toast.error("Please login to add items to cart");
//       navigate("/login", { state: { from: `/product/${id}` } });
//       return;
//     }

//     const currentStock =
//       product.stockQuantity ??
//       product.stock ??
//       product.quantity ??
//       0;
    
//     if (currentStock <= 0) {
//       toast.error("Sorry, this product is out of stock!");
//       return;
//     }

//     if (quantity > currentStock) {
//       toast.error(`Only ${currentStock} items available in stock!`);
//       return;
//     }

//     try {
//       const productForCart = {
//         productId: product.id,
//         id: product.id,
//         name: product.name,
//         price: parseFloat(product.price || 0),
//         image: product.imageUrl || product.image,
//         stockQuantity: currentStock
//       };
      
//       await addToCart(productForCart, quantity);
//     } catch (error) {
//       console.error("❌ Add to cart error:", error);
//       toast.error(error.response?.data?.message || "Failed to add to cart");
//     }
//   };

//   useEffect(() => {
//     console.log("Current wishlist state:", wishlist);
//     console.log("Is current product in wishlist?", isInWishlist);
//     console.log("Current product ID:", id);
//   }, [wishlist, isInWishlist, id]);

//   const handleWishlistToggle = async () => {
//     if (!user) {
//       toast.error("Please login to save items");
//       navigate("/login", { state: { from: `/product/${id}` } });
//       return;
//     }

//     try {
//       const productForWishlist = {
//         id: product.id,
//         productId: product.id,
//         name: product.name,
//         price: product.price,
//         imageUrl: product.imageUrl || product.image,
//         image: product.imageUrl || product.image,
//         stockQuantity: product.stockQuantity || product.stock || product.quantity || 0,
//         stock: product.stockQuantity || product.stock || product.quantity || 0,
//         category: product.category,
//         description: product.description
//       };

//       console.log("Toggling wishlist with product:", productForWishlist);
      
//       await toggleWishlist(productForWishlist);
//       fetchProductStats();
      
//     } catch (error) {
//       console.error("❌ Wishlist error:", error);
//       toast.error(error.response?.data?.message || "Failed to update wishlist");
//     }
//   };

//   // ✅ UPDATED: handleSubmitReview function for persistent reviews
//  const handleSubmitReview = async () => {
//   if (!user) {
//     toast.error("Please login to submit a review");
//     navigate("/login", { state: { from: `/product/${id}` } });
//     return;
//   }

//   if (!userRating) {
//     toast.error("Please select a rating");
//     return;
//   }

//   if (!reviewText.trim()) {
//     toast.error("Please write a review");
//     return;
//   }

//   if (reviewText.trim().length < 10) {
//     toast.error("Review must be at least 10 characters");
//     return;
//   }

//   try {
//     setSubmittingReview(true);

//     const reviewData = {
//       rating: userRating,
//       comment: reviewText.trim(),
//     };

//     console.log("📦 Sending review data:", reviewData);

//     const response = await api.post(`/Products/${id}/reviews`, reviewData);

//     console.log("✅ API Response:", response.data);

// if (response.data.statusCode === 200) {
//       toast.success("Review submitted successfully!");

//       // Refresh UI
//       await fetchReviews();
//       await fetchProductStats();

//       // Clear form
//       setReviewText("");
//       setUserRating(0);
//     } 
//   } 
//   catch (error) {
//     console.error("❌ Review submission error:", error);

//     if (error.response?.data) {
//       const errorData = error.response.data;

//       if (errorData.errors) {
//         const validationErrors = Object.entries(errorData.errors)
//           .map(([field, messages]) =>
//             `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
//           )
//           .join("; ");

//         toast.error(`Validation error: ${validationErrors}`);
//       } 
//       else if (
//         errorData.message?.toLowerCase().includes("already") ||
//         errorData.message?.toLowerCase().includes("duplicate")
//       ) {
//         toast.error("You have already reviewed this product");
//       } 
//       else if (errorData.message) {
//         toast.error(errorData.message);
//       } 
//       else {
//         toast.error("Failed to submit review. Please try again.");
//       }
//     } 
//     else {
//       toast.error(error.message || "Failed to submit review");
//     }
//   } 
//   finally {
//     setSubmittingReview(false);
//   }
// };


//   // Corrected handleMarkHelpful function
//   const handleMarkHelpful = async (reviewId) => {
//     if (!user) {
//       toast("Please login to mark reviews helpful");
//       return navigate("/login");
//     }

//     try {
//       // Correct endpoint for marking helpful
//       await api.post(`/Products/reviews/${reviewId}/helpful`);
      
//       // Update local state
//       setReviews(reviews.map(review => 
//         review.id === reviewId 
//           ? { ...review, helpful: review.helpful + 1, isHelpful: true }
//           : review
//       ));
      
//       toast.success("Marked as helpful!");
//     } catch (error) {
//       console.error("Error marking helpful:", error);
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product?.name || "Sport-X Product",
//         text: `Check out ${product?.name} on Sport-X`,
//         url: window.location.href
//       }).then(() => {
//         toast.success("Shared successfully!");
//       }).catch(() => {
//         navigator.clipboard.writeText(window.location.href);
//         toast.success("Link copied to clipboard!");
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       toast.success("Link copied to clipboard!");
//     }
//   };

//   // const handleIncrease = () => {
//   //   if (!product || !stock) {
//   //     toast.error("Product stock information not available");
//   //     return;
//   //   }
//     const handleIncrease = () => {
//   if (!product) return;

//   const stock =
//     product.stockQuantity ??
//     product.stock ??
//     product.quantity ??
//     0;

//   if (quantity >= stock) {
//     toast.error(`Only ${stock} items available in stock!`);
//     return;
//   }

//   setQuantity((prev) => prev + 1);
// };


//   const handleDecrease = () => {
//     if (quantity <= 1) {
//       toast.error("Minimum quantity is 1");
//       return;
//     }
//     setQuantity(prev => prev - 1);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="mx-auto animate-spin text-gray-400 dark:text-gray-600 mb-4" size={48} />
//           <h2 className="text-xl font-light text-gray-900 dark:text-white">Loading Product...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center p-8 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
//           <AlertCircle className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
//           <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">Product Not Found</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
//           <button
//             onClick={() => navigate("/")}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
//           >
//             <ShoppingBag size={20} />
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const stockStatus = getStockStatus(product.stockQuantity);
//   const stock = 
//     product.stockQuantity !== undefined ? product.stockQuantity :
//     product.stock !== undefined ? product.stock :
//     product.quantity !== undefined ? product.quantity :
//     10;

//   const isOutOfStock = stock <= 0;
// const productRating =
//   productStats.averageRating ||
//   passedRating ||
//   4.5; // fallback
//   const totalReviews = reviews.length;
//   const isPremium = productStats.isPremium;

//   // ✅ Check if current user has already reviewed
//   const myReview = user ? reviews.find(r => r.userId === user.id) : null;

//   const ratingDistribution = [
//     { stars: 5, count: Math.floor(totalReviews * 0.65), percentage: 65 },
//     { stars: 4, count: Math.floor(totalReviews * 0.22), percentage: 22 },
//     { stars: 3, count: Math.floor(totalReviews * 0.07), percentage: 7 },
//     { stars: 2, count: Math.floor(totalReviews * 0.04), percentage: 4 },
//     { stars: 1, count: Math.floor(totalReviews * 0.02), percentage: 2 }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
//         {/* Premium Header */}
//         <div className="mb-8 lg:mb-12">
//           <div className="inline-flex items-center gap-2 mb-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-1 text-sm"
//             >
//               <ChevronRight className="rotate-180" size={16} />
//               Back
//             </button>
//             <ChevronRight className="text-gray-400" size={16} />
//             <span className="text-gray-600 dark:text-gray-400 text-sm">{product.category}</span>
//           </div>
          
//           <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-3">
//             {product.name}
//           </h1>
          
//           <div className="relative w-48 h-px mb-4">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 dark:via-white/20 to-transparent blur-sm"></div>
//           </div>
//         </div>

//         {/* Main Product Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
//           {/* Image Gallery */}
//           <div className="relative">
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
//               <div className="relative w-full h-96 flex items-center justify-center">
//                <img
//   src={
//     product.imageUrl?.startsWith("http") || product.imageUrl?.startsWith("/")
//       ? product.imageUrl
//       : product.image?.startsWith("http") || product.image?.startsWith("/")
//       ? product.image
//       : `data:image/svg+xml;base64,${btoa(`
//         <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
//           <rect width="400" height="400" fill="#f3f4f6"/>
//           <text x="200" y="200" font-family="Arial" font-size="24" text-anchor="middle" fill="#9ca3af" dy=".3em">
//             ${product.name || 'Product'}
//           </text>
//         </svg>
//       `)}`
//   }
//   alt={product.name}
//   className={`w-full h-full object-contain transition-all duration-500 ${
//     isOutOfStock ? "grayscale opacity-50" : ""
//   }`}
//   onError={(e) => {
//     // Fallback to data URL
//     e.target.src = `data:image/svg+xml;base64,${btoa(`
//       <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
//         <rect width="400" height="400" fill="#f3f4f6"/>
//         <text x="200" y="200" font-family="Arial" font-size="20" text-anchor="middle" fill="#9ca3af" dy=".3em">
//           ${product.name || 'No Image'}
//         </text>
//       </svg>
//     `)}`;
//   }}
// />
//                 {/* Premium Badge */}
//                 {isPremium && (
//                   <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded-full border border-amber-200 dark:border-amber-800/30 flex items-center gap-2">
//                     <Sparkles size={14} />
//                     Premium Choice
//                   </div>
//                 )}
//               </div>
              
//               {/* Product Stats */}
//               <div className="mt-6 grid grid-cols-3 gap-4 text-center">
//                 <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
//                   <Eye className="mx-auto text-gray-600 dark:text-gray-400 mb-2" size={20} />
//                   <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {productStats.views.toLocaleString()}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
//                 </div>
//                 <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
//                   <Users className="mx-auto text-gray-600 dark:text-gray-400 mb-2" size={20} />
//                   <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {productStats.purchases}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Purchased</div>
//                 </div>
//                 <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
//                   <Heart className="mx-auto text-gray-600 dark:text-gray-400 mb-2" size={20} />
//                   <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {productStats.wishlistCount}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Saved</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6 lg:space-y-8">
//             {/* Rating & Price */}
//             <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={20}
//                         strokeWidth={1.5}
//                         className={i < Math.floor(productRating) 
//                           ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
//                           : "text-gray-300 dark:text-gray-700"
//                         }
//                       />
//                     ))}
//                   </div>
//                   <span className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {productRating.toFixed(1)}
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-400 text-sm">
//                     ({totalReviews} reviews)
//                   </span>
//                 </div>
                
//                 {/* Stock Status */}
//                 <div className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium border ${stockStatus.color} ${stockStatus.border}`}>
//                   <Package size={16} className={stockStatus.iconColor} />
//                   <span>{stockStatus.text}</span>
//                 </div>
//               </div>

//               {/* Price */}
//               <div className="mb-6">
//                 <div className="flex items-baseline gap-3 mb-2">
//                   <span className="text-4xl font-bold text-gray-900 dark:text-white">
//                     ${(product.price * quantity).toFixed(2)}
//                   </span>
//                   <span className="text-gray-500 dark:text-gray-400 text-lg">
//                     ${Number(product.price).toFixed(2)} each
//                   </span>
//                 </div>
//                 {stock <= 5 && !isOutOfStock && (
//                   <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
//                     ⚠️ Hurry! Only {stock} items left
//                   </p>
//                 )}
//               </div>

//               {/* Quantity Controls */}
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="font-medium text-gray-900 dark:text-white">Quantity</span>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     Max: {stock}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={handleDecrease}
//                     disabled={isOutOfStock || quantity <= 1}
//                     className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
//                   >
//                     <X size={20} className="text-gray-600 dark:text-gray-400" />
//                   </button>
                  
//                   <div className="flex-1 text-center">
//                     <span className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {quantity}
//                     </span>
//                   </div>
                  
//                   <button
//                     onClick={handleIncrease}
//                     disabled={isOutOfStock || quantity >= stock}
//                     className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
//                   >
//                     <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">+</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="space-y-4">
//                 <button
//                   onClick={handleBuyNow}
//                   disabled={isOutOfStock}
//                   className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
//                     isOutOfStock
//                       ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
//                       : "bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
//                   }`}
//                 >
//                   <CreditCard size={20} />
//                   {isOutOfStock ? "Out of Stock" : "Buy Now"}
//                   <ArrowRight size={20} />
//                 </button>

//                 <button
//                   onClick={() => {
//                     if (isInCart) {
//                       navigate("/cart");
//                     } else {
//                       handleAddToCart();
//                     }
//                   }}
//                   disabled={isOutOfStock}
//                   className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-lg border ${
//                     isOutOfStock
//                       ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-200 dark:border-gray-700"
//                       : isInCart
//                       ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border-transparent"
//                       : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-[1.02] active:scale-[0.98]"
//                   }`}
//                 >
//                   <ShoppingBag size={20} />
//                   {isOutOfStock
//                     ? "Out of Stock"
//                     : isInCart
//                     ? "View in Cart"
//                     : "Add to Cart"}
//                 </button>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleWishlistToggle}
//                     disabled={!product}
//                     className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
//                       isInWishlist
//                         ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-transparent shadow-lg shadow-rose-500/30"
//                         : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
//                     } ${!product ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
//                     {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
//                   </button>
//                   <button
//                     onClick={handleShare}
//                     className="flex-1 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
//                   >
//                     <Share2 size={20} />
//                     Share
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Premium Features */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                     <Truck className="text-blue-600 dark:text-blue-400" size={20} />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
//                     <Lock className="text-emerald-600 dark:text-emerald-400" size={20} />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">Secure Payment</h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encrypted</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden mb-12">
//           {/* Tab Navigation */}
//           <div className="flex border-b border-gray-100 dark:border-gray-800">
//             {["description", "specifications", "reviews"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex-1 px-6 py-4 font-medium transition-all duration-300 border-b-2 text-sm md:text-base ${
//                   activeTab === tab
//                     ? "text-gray-900 dark:text-white border-gray-900 dark:border-white"
//                     : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
//                 }`}
//               >
//                 {tab === "reviews" ? `Reviews (${totalReviews})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="p-6 md:p-8">
//             {activeTab === "description" && (
//               <div className="prose prose-gray dark:prose-invert max-w-none">
//                 <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Product Description</h3>
//                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
//                   Experience unparalleled quality and performance with this premium product. Crafted with precision engineering and premium materials, it delivers exceptional results for both professionals and enthusiasts alike.
//                 </p>
                
//                 <div className="grid md:grid-cols-2 gap-6 mt-8">
//                   <div className="space-y-4">
//                     <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Key Features</h4>
//                     <ul className="space-y-3">
//                       {["Premium materials for durability", "Ergonomic design for comfort", "Advanced performance features", "Easy maintenance and care", "Manufacturer warranty included"].map((feature, index) => (
//                         <li key={index} className="flex items-start gap-3">
//                           <CheckCircle className="text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" size={20} />
//                           <span className="text-gray-600 dark:text-gray-400">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Why Choose This</h4>
//                     <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
//                       <div className="flex items-start gap-3">
//                         <AwardIcon className="text-amber-600 dark:text-amber-400 mt-1" size={20} />
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-white mb-1">Premium Quality</p>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">Backed by our quality assurance guarantee</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "specifications" && (
//               <div>
//                 <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-8">Technical Specifications</h3>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
//                       <span className="font-medium text-gray-900 dark:text-white">Category</span>
//                       <span className="text-gray-600 dark:text-gray-400">{product.category || "General"}</span>
//                     </div>
//                     <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
//                       <span className="font-medium text-gray-900 dark:text-white">Material</span>
//                       <span className="text-gray-600 dark:text-gray-400">Premium</span>
//                     </div>
//                     <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
//                       <span className="font-medium text-gray-900 dark:text-white">Weight</span>
//                       <span className="text-gray-600 dark:text-gray-400">Standard</span>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
//                       <span className="font-medium text-gray-900 dark:text-white">Warranty</span>
//                       <span className="text-gray-600 dark:text-gray-400">1 Year</span>
//                     </div>
//                     <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
//                       <span className="font-medium text-gray-900 dark:text-white">Returns</span>
//                       <span className="text-gray-600 dark:text-gray-400">30 Days</span>
//                     </div>
//                     <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
//                       <span className="font-medium text-gray-900 dark:text-white">SKU</span>
//                       <span className="text-gray-600 dark:text-gray-400">SPX-{product.id}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "reviews" && (
//               <div>
//                 <div className="grid lg:grid-cols-3 gap-8 mb-8">
//                   {/* Rating Summary */}
//                   <div className="lg:col-span-1">
//                     <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800">
//                       <div className="text-5xl font-bold text-gray-900 dark:text-white mb-3">{productRating.toFixed(1)}</div>
//                       <div className="flex justify-center gap-1 mb-4">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={24}
//                             className={i < Math.floor(productRating) 
//                               ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
//                               : "text-gray-300 dark:text-gray-700"
//                             }
//                           />
//                         ))}
//                       </div>
//                       <p className="text-gray-600 dark:text-gray-400">{reviews.length} verified review{reviews.length !== 1 ? 's' : ''}</p>
//                     </div>
//                   </div>

//                   {/* Rating Distribution */}
//                   <div className="lg:col-span-2 space-y-4">
//                     <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Rating Breakdown</h4>
//                     {ratingDistribution.map((item) => (
//                       <div key={item.stars} className="flex items-center gap-4">
//                         <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-16">
//                           {item.stars} star{item.stars !== 1 ? 's' : ''}
//                         </span>
//                         <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
//                           <div 
//                             className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full transition-all duration-700" 
//                             style={{ width: `${item.percentage}%` }}
//                           />
//                         </div>
//                         <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
//                           {item.percentage}%
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ✅ ADDED: Show current user's existing review (Like Amazon) */}
//                 {user && myReview && (
//                   <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
//                     <div className="flex items-center gap-3 mb-4">
//                       <CheckCircle className="text-blue-600 dark:text-blue-400" size={24} />
//                       <div>
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Your Review</h4>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           You reviewed this product on {formatReviewDate(myReview.createdAt)}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-2 mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={20}
//                           className={i < myReview.rating 
//                             ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
//                             : "text-gray-300 dark:text-gray-700"
//                           }
//                         />
//                       ))}
//                       <span className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
//                         {myReview.rating}.0
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-700 dark:text-gray-300 mb-4">{myReview.comment}</p>
                    
//                     <div className="flex items-center gap-4">
//                       <button 
//                         onClick={() => {
//                           setUserRating(myReview.rating);
//                           setReviewText(myReview.comment);
//                           // Scroll to review form
//                           document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
//                         }}
//                         className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
//                       >
//                         Edit Review
//                       </button>
                      
//                       <button 
//                         onClick={async () => {
//                           if (window.confirm("Are you sure you want to delete your review?")) {
//                             try {
//                               await api.delete(`/Products/reviews/${myReview.id}`);
//                               toast.success("Review deleted");
//                               await fetchReviews();
//                               await fetchProductStats();
//                             } catch (error) {
//                               toast.error("Failed to delete review");
//                             }
//                           }
//                         }}
//                         className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300"
//                       >
//                         Delete Review
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Write Review */}
//                 <div id="review-form" className="mb-8 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800">
//                   <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Share Your Experience</h4>
                  
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Your Rating</label>
//                     <div className="flex gap-2">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           onClick={() => setUserRating(star)}
//                           onMouseEnter={() => setHoverRating(star)}
//                           onMouseLeave={() => setHoverRating(0)}
//                           className="transition-transform duration-200 hover:scale-110"
//                         >
//                           <Star
//                             size={32}
//                             className={star <= (hoverRating || userRating) 
//                               ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
//                               : "text-gray-300 dark:text-gray-700"
//                             }
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Your Review</label>
//                     <textarea
//                       value={reviewText}
//                       onChange={(e) => setReviewText(e.target.value)}
//                       placeholder="Share your honest thoughts about this product..."
//                       rows={4}
//                       className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent resize-none transition-all duration-300"
//                     />
//                   </div>

//                   <button
//                     onClick={handleSubmitReview}
//                     disabled={submittingReview || !userRating || (user && myReview)}
//                     className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//                       submittingReview || !userRating || (user && myReview)
//                         ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
//                         : "bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02]"
//                     }`}
//                   >
//                     {submittingReview ? "Submitting..." : (user && myReview ? "Already Reviewed" : "Submit Review")}
//                   </button>
//                 </div>

//                 {/* Reviews List */}
//                 <div className="space-y-6">
//                   {loadingReviews ? (
//                     <div className="text-center py-8">
//                       <Loader className="mx-auto animate-spin text-gray-400 dark:text-gray-600" size={32} />
//                     </div>
//                   ) : reviews.length === 0 ? (
//                     <div className="text-center py-8">
//                       <MessageSquare className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Reviews Yet</h4>
//                       <p className="text-gray-600 dark:text-gray-400">Be the first to review this product!</p>
//                     </div>
//                   ) : (
//                     reviews.map((review) => (
//                       <div key={review.id} className="p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800">
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
//                               <span className="font-semibold text-gray-900 dark:text-white">{review.avatar}</span>
//                             </div>
//                             <div>
//                               <div className="flex items-center gap-2 mb-1">
//                                 <h5 className="font-semibold text-gray-900 dark:text-white">{review.name}</h5>
                                
//                                 {/* Show "Your Review" badge for current user */}
//                                 {review.userId === user?.id && (
//                                   <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800/30">
//                                     Your Review
//                                   </span>
//                                 )}
                                
//                                 {review.verified && (
//                                   <span className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-200 dark:border-emerald-800/30">
//                                     Verified Purchase
//                                   </span>
//                                 )}
//                               </div>
//                               <div className="flex items-center gap-4">
//                                 <div className="flex gap-1">
//                                   {[...Array(5)].map((_, i) => (
//                                     <Star
//                                       key={i}
//                                       size={16}
//                                       className={i < review.rating 
//                                         ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
//                                         : "text-gray-300 dark:text-gray-700"
//                                       }
//                                     />
//                                   ))}
//                                 </div>
//                                 <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{review.comment}</p>
                        
//                         <div className="flex items-center gap-4">
//                           <button 
//                             onClick={() => handleMarkHelpful(review.id)}
//                             disabled={review.isHelpful || review.userId === user?.id}
//                             className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
//                               review.isHelpful
//                                 ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30"
//                                 : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                             } ${review.userId === user?.id ? "opacity-50 cursor-not-allowed" : ""}`}
//                           >
//                             <ThumbsUp size={16} />
//                             <span>Helpful ({review.helpful})</span>
//                           </button>
                          
//                           {/* Show reply option only for other users' reviews */}
//                           {review.userId !== user?.id && (
//                             <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
//                               <MessageSquare size={16} />
//                               <span>Reply</span>
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products Section */}
//         {relatedProducts.length > 0 && (
//           <div className="mb-12">
//             <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-8">Related Products</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {loadingRelated ? (
//                 <div className="col-span-4 text-center py-8">
//                   <Loader className="mx-auto animate-spin text-gray-400 dark:text-gray-600" size={32} />
//                 </div>
//               ) : (
//                 relatedProducts.map((relatedProduct) => (
//                   <div
//                     key={relatedProduct.id}
//                     onClick={() => navigate(`/product/${relatedProduct.id}`)}
//                     className="group bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer"
//                   >
//                     <div className="relative h-48 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden">
//                       <img
//                         src={relatedProduct.imageUrl}
//                         alt={relatedProduct.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
//                       {relatedProduct.name}
//                     </h4>
//                     <div className="flex items-center justify-between">
//                       <span className="text-lg font-bold text-gray-900 dark:text-white">
//                         ${Number(relatedProduct.price).toFixed(2)}
//                       </span>
//                       <span className="text-sm text-gray-500 dark:text-gray-400">
//                         {relatedProduct.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../Api/Axios_Instance";
import {
  Heart, Package, Star, ThumbsUp, MessageSquare, Share2, Truck,
  Shield, RotateCcw, Award, X, CheckCircle, AlertCircle,
  ChevronRight, Sparkles, Tag, Clock, Users, Eye, ShoppingBag,
  ArrowRight, CreditCard, Lock, Award as AwardIcon, Loader
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [productStats, setProductStats] = useState({
    views: 0, purchases: 0, wishlistCount: 0, averageRating: 0, reviewCount: 0, isPremium: false
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const isInCart = cart.some((item) => item.productId === parseInt(id));
  const isInWishlist = wishlist.some((item) => item.productId === parseInt(id));
  const passedRating = location.state?.rating;

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
    fetchProductStats();
    fetchRelatedProducts();
    if (id) { api.post(`/Products/${id}/view`).catch(console.error); }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/Products/GetBy_${id}`);
      if (response.data.statusCode === 200) {
        const productData = response.data.data;
        setProduct({
          ...productData,
          stockQuantity: productData.stockQuantity ?? productData.stock ?? productData.quantity ?? 0,
          imageUrl: productData.imageUrl || productData.image || "https://via.placeholder.com/400",
        });
      } else { throw new Error("Product not found"); }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
      try {
        const allResponse = await api.get("/Products/User/GetAll");
        const allProducts = allResponse.data.data || allResponse.data || [];
        const foundProduct = allProducts.find((p) => p.id == id || p.productId == id);
        if (foundProduct) {
          setProduct({
            ...foundProduct,
            stockQuantity: foundProduct.stockQuantity ?? foundProduct.stock ?? foundProduct.quantity ?? 0,
            imageUrl: foundProduct.imageUrl || foundProduct.image || "https://via.placeholder.com/400",
          });
        }
      } catch (fallbackError) { console.error("Fallback failed:", fallbackError); }
    } finally { setLoading(false); }
  };

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const response = await api.get(`/Products/${id}/reviews`);
      if (response.data.statusCode === 200) {
        const formattedReviews = response.data.data.map(review => ({
          id: review.id, userId: review.userId, name: review.userName || "Anonymous",
          rating: review.rating, date: formatReviewDate(review.createdAt),
          comment: review.comment, helpful: review.helpfulCount,
          verified: review.isVerifiedPurchase,
          avatar: review.userAvatar || (review.userName?.charAt(0) || "A"),
          profileImage: review.userProfileImage || "",
          isHelpful: review.isHelpful || false, createdAt: review.createdAt
        }));
        setReviews(formattedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else { setReviews([]); }
    } catch (error) { console.error("Error fetching reviews:", error); setReviews([]); }
    finally { setLoadingReviews(false); }
  };

  const fetchProductStats = async () => {
    try {
      const response = await api.get(`/Products/${id}/stats`);
      if (response.data.statusCode === 200) {
        setProductStats({
          views: response.data.data.views || 0,
          purchases: response.data.data.purchases || 0,
          wishlistCount: response.data.data.wishlistCount || 0,
          averageRating: response.data.data.averageRating || 0,
          reviewCount: response.data.data.reviewCount || 0,
          isPremium: response.data.data.averageRating >= 4.5
        });
      }
    } catch (error) {
      setProductStats({ views: Math.floor(Math.random() * 2000) + 500, purchases: Math.floor(Math.random() * 200) + 50, wishlistCount: Math.floor(Math.random() * 100) + 20, averageRating: 4.5, reviewCount: 2, isPremium: true });
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      setLoadingRelated(true);
      const response = await api.get(`/Products/${id}/related`);
      if (response.data.statusCode === 200) { setRelatedProducts(response.data.data); }
    } catch (error) { setRelatedProducts([]); }
    finally { setLoadingRelated(false); }
  };

  const formatReviewDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffDays = Math.floor(diffMs / 86400000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return "Recently"; }
  };

  const getStockStatus = (stock) => {
    if (!product || stock === undefined) return { text: "Checking...", iluColor: "ilu-stock-unknown", dotColor: "#555" };
    if (stock <= 0) return { text: "Out of Stock", iluColor: "ilu-stock-out", dotColor: "#ef4444" };
    if (stock <= 5) return { text: `Only ${stock} left`, iluColor: "ilu-stock-low", dotColor: "#f59e0b" };
    if (stock <= 10) return { text: `${stock} in stock`, iluColor: "ilu-stock-mid", dotColor: "#eab308" };
    return { text: "In Stock", iluColor: "ilu-stock-ok", dotColor: "#22c55e" };
  };

  const handleBuyNow = () => {
    if (!user) { toast("Please login to continue"); return navigate("/login"); }
    if (!product || product.stockQuantity <= 0) { toast.error("Sorry, this product is out of stock!"); return; }
    if (quantity > product.stockQuantity) { toast.error(`Only ${product.stockQuantity} items available!`); return; }
    navigate("/checkout", { state: { products: [{ ...product, quantity }], source: "buyNow" } });
  };

  const handleAddToCart = async () => {
    if (!user) { toast.error("Please login to add items to cart"); navigate("/login", { state: { from: `/product/${id}` } }); return; }
    const currentStock = product.stockQuantity ?? product.stock ?? product.quantity ?? 0;
    if (currentStock <= 0) { toast.error("Sorry, this product is out of stock!"); return; }
    if (quantity > currentStock) { toast.error(`Only ${currentStock} items available!`); return; }
    try {
      await addToCart({ productId: product.id, id: product.id, name: product.name, price: parseFloat(product.price || 0), image: product.imageUrl || product.image, stockQuantity: currentStock }, quantity);
    } catch (error) { toast.error(error.response?.data?.message || "Failed to add to cart"); }
  };

  useEffect(() => {
    console.log("Current wishlist state:", wishlist);
    console.log("Is current product in wishlist?", isInWishlist);
    console.log("Current product ID:", id);
  }, [wishlist, isInWishlist, id]);

  const handleWishlistToggle = async () => {
    if (!user) { toast.error("Please login to save items"); navigate("/login", { state: { from: `/product/${id}` } }); return; }
    try {
      await toggleWishlist({ id: product.id, productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl || product.image, image: product.imageUrl || product.image, stockQuantity: product.stockQuantity || product.stock || product.quantity || 0, stock: product.stockQuantity || product.stock || product.quantity || 0, category: product.category, description: product.description });
      fetchProductStats();
    } catch (error) { toast.error(error.response?.data?.message || "Failed to update wishlist"); }
  };

  const handleSubmitReview = async () => {
    if (!user) { toast.error("Please login to submit a review"); navigate("/login", { state: { from: `/product/${id}` } }); return; }
    if (!userRating) { toast.error("Please select a rating"); return; }
    if (!reviewText.trim()) { toast.error("Please write a review"); return; }
    if (reviewText.trim().length < 10) { toast.error("Review must be at least 10 characters"); return; }
    try {
      setSubmittingReview(true);
      const response = await api.post(`/Products/${id}/reviews`, { rating: userRating, comment: reviewText.trim() });
      if (response.data.statusCode === 200) {
        toast.success("Review submitted successfully!");
        await fetchReviews(); await fetchProductStats();
        setReviewText(""); setUserRating(0);
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.errors) {
        toast.error(`Validation error: ${Object.entries(errorData.errors).map(([f, m]) => `${f}: ${Array.isArray(m) ? m.join(", ") : m}`).join("; ")}`);
      } else if (errorData?.message?.toLowerCase().includes("already") || errorData?.message?.toLowerCase().includes("duplicate")) {
        toast.error("You have already reviewed this product");
      } else { toast.error(errorData?.message || error.message || "Failed to submit review"); }
    } finally { setSubmittingReview(false); }
  };

  const handleMarkHelpful = async (reviewId) => {
    if (!user) { toast("Please login to mark reviews helpful"); return navigate("/login"); }
    try {
      await api.post(`/Products/reviews/${reviewId}/helpful`);
      setReviews(reviews.map(r => r.id === reviewId ? { ...r, helpful: r.helpful + 1, isHelpful: true } : r));
      toast.success("Marked as helpful!");
    } catch (error) { console.error("Error marking helpful:", error); }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product?.name || "Sport-X Product", text: `Check out ${product?.name} on Sport-X`, url: window.location.href })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); });
    } else { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }
  };

  const handleIncrease = () => {
    if (!product) return;
    const s = product.stockQuantity ?? product.stock ?? product.quantity ?? 0;
    if (quantity >= s) { toast.error(`Only ${s} items available!`); return; }
    setQuantity(p => p + 1);
  };

  const handleDecrease = () => {
    if (quantity <= 1) { toast.error("Minimum quantity is 1"); return; }
    setQuantity(p => p - 1);
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={{ minHeight:'100vh', background:'#000', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&display=swap'); @keyframes iluSpin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ textAlign:'center' }}>
          <Loader style={{ margin:'0 auto 14px', color:'#333', animation:'iluSpin .8s linear infinite' }} size={36} />
          <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:800, letterSpacing:'.25em', textTransform:'uppercase', color:'#333' }}>Loading</p>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!product) {
    return (
      <div style={{ minHeight:'100vh', background:'#000', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&display=swap');`}</style>
        <div style={{ textAlign:'center', border:'1px solid #1a1a1a', padding:'48px 40px', maxWidth:440 }}>
          <AlertCircle style={{ margin:'0 auto 18px', color:'#333' }} size={36} />
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:26, fontWeight:900, textTransform:'uppercase', letterSpacing:'.05em', color:'#fff', marginBottom:10 }}>Product Not Found</h2>
          <p style={{ color:'#444', fontSize:13, marginBottom:24 }}>The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/")} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', background:'#fff', color:'#000', border:'none', cursor:'pointer', padding:'11px 26px', display:'inline-flex', alignItems:'center', gap:8 }}>
            <ShoppingBag size={13}/> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stockQuantity);
  const stock = product.stockQuantity !== undefined ? product.stockQuantity : product.stock !== undefined ? product.stock : product.quantity !== undefined ? product.quantity : 10;
  const isOutOfStock = stock <= 0;
  const productRating = productStats.averageRating || passedRating || 4.5;
  const totalReviews = reviews.length;
  const isPremium = productStats.isPremium;
  const myReview = user ? reviews.find(r => r.userId === user.id) : null;
  const ratingDistribution = [
    { stars: 5, percentage: 65 }, { stars: 4, percentage: 22 },
    { stars: 3, percentage: 7  }, { stars: 2, percentage: 4  }, { stars: 1, percentage: 2 }
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#000', fontFamily:"'Barlow',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .ilu   { font-family:'Barlow',sans-serif; }
        .ilu-c { font-family:'Barlow Condensed',sans-serif; }

        .ilu-label { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:#444; display:block; margin-bottom:8px; }

        /* Buttons */
        .ilu-btn-primary { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; background:#fff; color:#000; border:none; cursor:pointer; padding:14px 20px; transition:background .15s; display:flex; align-items:center; justify-content:center; gap:9px; width:100%; }
        .ilu-btn-primary:hover:not(:disabled) { background:#e8e8e8; }
        .ilu-btn-primary:disabled { background:#111; color:#333; cursor:not-allowed; border:1px solid #1a1a1a; }

        .ilu-btn-outline { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; background:transparent; color:#fff; border:1px solid #2e2e2e; cursor:pointer; padding:14px 20px; transition:all .15s; display:flex; align-items:center; justify-content:center; gap:9px; width:100%; }
        .ilu-btn-outline:hover:not(:disabled) { border-color:#555; background:#0d0d0d; }
        .ilu-btn-outline:disabled { opacity:.3; cursor:not-allowed; }
        .ilu-btn-outline.cart-active { background:#fff; color:#000; border-color:#fff; }

        .ilu-btn-ghost { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; background:#0d0d0d; color:#555; border:1px solid #222; cursor:pointer; padding:11px 18px; transition:all .15s; display:flex; align-items:center; justify-content:center; gap:7px; flex:1; }
        .ilu-btn-ghost:hover { border-color:#444; color:#fff; background:#111; }
        .ilu-btn-ghost.wish-active { background:#fff; color:#000; border-color:#fff; }

        /* Qty */
        .ilu-qty-btn { width:40px; height:40px; background:#0d0d0d; border:1px solid #222; color:#666; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .15s; flex-shrink:0; }
        .ilu-qty-btn:hover:not(:disabled) { border-color:#444; color:#fff; }
        .ilu-qty-btn:disabled { opacity:.25; cursor:not-allowed; }

        /* Input */
        .ilu-input { width:100%; padding:10px 12px; background:#0d0d0d; border:1px solid #222; color:#fff; font-family:'Barlow',sans-serif; font-size:13px; outline:none; transition:border-color .15s; resize:vertical; }
        .ilu-input:focus { border-color:#444; }
        .ilu-input::placeholder { color:#333; }

        /* Tabs */
        .ilu-tab { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; background:transparent; color:#444; border:none; border-bottom:2px solid transparent; cursor:pointer; padding:15px 16px; transition:all .15s; flex:1; white-space:nowrap; }
        .ilu-tab:hover { color:#888; }
        .ilu-tab.active { color:#fff; border-bottom-color:#fff; }

        /* Stock */
        .ilu-stock-tag { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; display:inline-flex; align-items:center; gap:6px; padding:5px 10px; }
        .ilu-stock-out     { background:rgba(239,68,68,.07);  color:#ef4444; border:1px solid rgba(239,68,68,.2); }
        .ilu-stock-low     { background:rgba(245,158,11,.07); color:#f59e0b; border:1px solid rgba(245,158,11,.2); }
        .ilu-stock-mid     { background:rgba(234,179,8,.07);  color:#eab308; border:1px solid rgba(234,179,8,.2); }
        .ilu-stock-ok      { background:rgba(34,197,94,.07);  color:#22c55e; border:1px solid rgba(34,197,94,.2); }
        .ilu-stock-unknown { background:rgba(100,100,100,.07);color:#555;    border:1px solid rgba(100,100,100,.2); }

        .ilu-hr { border:none; border-top:1px solid #1a1a1a; margin:0; }
        .ilu-box { border:1px solid #1a1a1a; background:#000; padding:20px; }
        .ilu-star-btn { background:none; border:none; cursor:pointer; padding:2px; transition:transform .12s; }
        .ilu-star-btn:hover { transform:scale(1.15); }

        @keyframes iluSpin { to{transform:rotate(360deg)} }
        .ilu-spin { animation:iluSpin .8s linear infinite; }

        /* Related card */
        .ilu-rc { border:1px solid #1a1a1a; cursor:pointer; background:#000; transition:border-color .2s; }
        .ilu-rc:hover { border-color:#333; }
        .ilu-rc:hover .ilu-ri { transform:scale(1.05); }
        .ilu-ri { transition:transform .5s ease; max-height:130px; max-width:100%; object-fit:contain; }

        /* ══════════ LAYOUT GRIDS ══════════ */
        .pd-inner    { max-width:1200px; margin:0 auto; padding:28px 24px 60px; }
        .pd-grid     { display:grid; grid-template-columns:1fr 1fr; gap:36px; margin-bottom:40px; }
        .pd-stats    { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#1a1a1a; }
        .pd-features { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .pd-actions  { display:flex; gap:8px; }
        .pd-rh       { display:grid; grid-template-columns:160px 1fr; gap:20px; margin-bottom:28px; }
        .pd-related  { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#1a1a1a; }
        .pd-specs    { display:grid; grid-template-columns:1fr 1fr; }
        .pd-desc-cols{ display:grid; grid-template-columns:1fr 1fr; gap:28px; margin-top:24px; }

        /* Tablet ≤ 1024px */
        @media(max-width:1024px){
          .pd-grid    { grid-template-columns:1fr; gap:24px; }
          .pd-related { grid-template-columns:repeat(2,1fr); }
          .pd-rh      { grid-template-columns:1fr; }
          .pd-specs   { grid-template-columns:1fr; }
          .pd-desc-cols{ grid-template-columns:1fr; }
        }

        /* Mobile ≤ 640px */
        @media(max-width:640px){
          .pd-inner    { padding:16px 14px 48px; }
          .pd-features { grid-template-columns:1fr; }
          .pd-actions  { flex-direction:column; }
          .pd-related  { grid-template-columns:1fr 1fr; }
          .ilu-tab     { font-size:9px; padding:13px 8px; letter-spacing:.1em; }
          .pd-stats    { grid-template-columns:repeat(3,1fr); } /* stays 3-col, just shrinks */
        }

        /* Small ≤ 400px */
        @media(max-width:400px){
          .pd-related  { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="pd-inner">

        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', marginBottom:22 }}>
          {[
            { label:'← Back', action:() => navigate(-1) },
            { label:'/', isDiv:true },
            { label: product.category, action:() => navigate(`/more-products?category=${encodeURIComponent(product.category)}`) },
          ].map((b, i) => b.isDiv ? (
            <span key={i} className="ilu-c" style={{ fontSize:10, color:'#333' }}>/</span>
          ) : (
            <button key={i} onClick={b.action} className="ilu-c" style={{ fontSize:10, fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'#444', background:'none', border:'none', cursor:'pointer', padding:0, transition:'color .15s' }}
              onMouseEnter={e => e.target.style.color='#888'} onMouseLeave={e => e.target.style.color='#444'}>
              {b.label}
            </button>
          ))}
        </div>

        {/* Title */}
        <div style={{ marginBottom:28 }}>
          <h1 className="ilu-c" style={{ fontSize:'clamp(24px,5vw,52px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:.95, marginBottom:10 }}>
            {product.name}
          </h1>
          <div style={{ height:1, width:160, background:'#1a1a1a' }} />
        </div>

        {/* ── Main grid ── */}
        <div className="pd-grid">

          {/* Image side */}
          <div>
            <div style={{ border:'1px solid #1a1a1a', background:'#060606', padding:'36px 28px', position:'relative', marginBottom:10 }}>
              {isPremium && (
                <div style={{ position:'absolute', top:12, right:12 }}>
                  <span className="ilu-c" style={{ fontSize:9, fontWeight:800, letterSpacing:'.16em', textTransform:'uppercase', background:'#fff', color:'#000', padding:'3px 9px', display:'inline-flex', alignItems:'center', gap:5 }}>
                    <Sparkles size={9}/> Premium
                  </span>
                </div>
              )}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:260 }}>
                <img
                  src={product.imageUrl?.startsWith("http")||product.imageUrl?.startsWith("/") ? product.imageUrl : product.image?.startsWith("http")||product.image?.startsWith("/") ? product.image : `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#0d0d0d"/><text x="200" y="200" font-family="Arial" font-size="18" text-anchor="middle" fill="#333" dy=".3em">${product.name||'Product'}</text></svg>`)}`}
                  alt={product.name}
                  style={{ maxHeight:300, maxWidth:'100%', objectFit:'contain', filter:isOutOfStock?'grayscale(1) opacity(.5)':'none', transition:'filter .3s' }}
                  onError={(e)=>{ e.target.src=`data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#0d0d0d"/><text x="200" y="200" font-family="Arial" font-size="18" text-anchor="middle" fill="#333" dy=".3em">${product.name||'No Image'}</text></svg>`)}`; }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="pd-stats">
              {[
                { Icon:Eye,   value:productStats.views.toLocaleString(), label:'Views' },
                { Icon:Users, value:productStats.purchases,              label:'Purchased' },
                { Icon:Heart, value:productStats.wishlistCount,          label:'Saved' },
              ].map(({ Icon, value, label }, i) => (
                <div key={i} style={{ textAlign:'center', padding:'16px 8px', background:'#060606', borderRight: i<2?'1px solid #1a1a1a':'none' }}>
                  <Icon size={14} style={{ margin:'0 auto 7px', color:'#333', display:'block' }} />
                  <div className="ilu-c" style={{ fontSize:18, fontWeight:900, color:'#fff', lineHeight:1, marginBottom:3 }}>{value}</div>
                  <div className="ilu-c" style={{ fontSize:8, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#444' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Details side */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>

            <div className="ilu-box">
              {/* Rating row */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10, marginBottom:18 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ display:'flex', gap:2 }}>
                    {[...Array(5)].map((_,i) => <Star key={i} size={15} fill={i<Math.floor(productRating)?'#fff':'none'} color={i<Math.floor(productRating)?'#fff':'#333'} strokeWidth={1.5}/>)}
                  </div>
                  <span className="ilu-c" style={{ fontSize:15, fontWeight:900, color:'#fff' }}>{productRating.toFixed(1)}</span>
                  <span className="ilu-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.1em', color:'#444' }}>({totalReviews})</span>
                </div>
                <span className={`ilu-stock-tag ${stockStatus.iluColor}`}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:stockStatus.dotColor, flexShrink:0 }}/>
                  {stockStatus.text}
                </span>
              </div>
              <hr className="ilu-hr" style={{ marginBottom:18 }}/>

              {/* Price */}
              <div style={{ marginBottom:22 }}>
                <p className="ilu-c" style={{ fontSize:'clamp(34px,6vw,54px)', fontWeight:900, color:'#fff', lineHeight:1, marginBottom:3 }}>
                  ${(product.price * quantity).toFixed(2)}
                </p>
                <p className="ilu-c" style={{ fontSize:11, fontWeight:700, color:'#444', letterSpacing:'.1em' }}>${Number(product.price).toFixed(2)} each</p>
                {stock<=5 && !isOutOfStock && (
                  <p className="ilu-c" style={{ fontSize:9, fontWeight:800, letterSpacing:'.18em', textTransform:'uppercase', color:'#f59e0b', marginTop:7 }}>⚠ Only {stock} left</p>
                )}
              </div>

              {/* Qty */}
              <div style={{ marginBottom:22 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:9 }}>
                  <span className="ilu-label" style={{ margin:0 }}>Quantity</span>
                  <span className="ilu-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.15em', color:'#444' }}>Max: {stock}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center' }}>
                  <button className="ilu-qty-btn" onClick={handleDecrease} disabled={isOutOfStock||quantity<=1}><X size={13}/></button>
                  <div style={{ flex:1, textAlign:'center', borderTop:'1px solid #222', borderBottom:'1px solid #222', height:40, display:'flex', alignItems:'center', justifyContent:'center', background:'#060606' }}>
                    <span className="ilu-c" style={{ fontSize:20, fontWeight:900, color:'#fff' }}>{quantity}</span>
                  </div>
                  <button className="ilu-qty-btn" onClick={handleIncrease} disabled={isOutOfStock||quantity>=stock}>
                    <span style={{ fontSize:18, lineHeight:1 }}>+</span>
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <button className="ilu-btn-primary" onClick={handleBuyNow} disabled={isOutOfStock}>
                  <CreditCard size={13} strokeWidth={1.5}/>
                  {isOutOfStock ? "Out of Stock" : "Buy Now"}
                  {!isOutOfStock && <ArrowRight size={13} strokeWidth={1.5}/>}
                </button>
                <button className={`ilu-btn-outline ${isInCart?'cart-active':''}`} onClick={()=>{ if(isInCart){navigate("/cart");}else{handleAddToCart();} }} disabled={isOutOfStock}>
                  <ShoppingBag size={13} strokeWidth={1.5}/>
                  {isOutOfStock ? "Out of Stock" : isInCart ? "View in Cart" : "Add to Cart"}
                </button>
                <div className="pd-actions">
                  <button className={`ilu-btn-ghost ${isInWishlist?'wish-active':''}`} onClick={handleWishlistToggle} disabled={!product}>
                    <Heart size={13} strokeWidth={1.5} fill={isInWishlist?'currentColor':'none'}/>
                    {isInWishlist ? "In Wishlist" : "Wishlist"}
                  </button>
                  <button className="ilu-btn-ghost" onClick={handleShare}>
                    <Share2 size={13} strokeWidth={1.5}/> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="pd-features">
              {[
                { Icon:Truck, title:"Fast Delivery",  sub:"2-3 business days" },
                { Icon:Lock,  title:"Secure Payment", sub:"256-bit SSL" },
              ].map(({ Icon, title, sub }, i) => (
                <div key={i} className="ilu-box" style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:34, height:34, border:'1px solid #222', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={14} color="#444" strokeWidth={1.5}/>
                  </div>
                  <div>
                    <p className="ilu-c" style={{ fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.06em', color:'#fff', lineHeight:1, marginBottom:3 }}>{title}</p>
                    <p className="ilu" style={{ fontSize:11, color:'#444' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{ border:'1px solid #1a1a1a', marginBottom:44 }}>
          <div style={{ display:'flex', borderBottom:'1px solid #1a1a1a', overflowX:'auto' }}>
            {["description","specifications","reviews"].map(tab => (
              <button key={tab} onClick={()=>setActiveTab(tab)} className={`ilu-tab ${activeTab===tab?'active':''}`}>
                {tab==="reviews" ? `Reviews (${totalReviews})` : tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ padding:'28px 22px' }}>

            {/* Description */}
            {activeTab==="description" && (
              <div>
                <h3 className="ilu-c" style={{ fontSize:22, fontWeight:900, textTransform:'uppercase', letterSpacing:'.04em', color:'#fff', marginBottom:16 }}>Product Description</h3>
                <p className="ilu" style={{ color:'#555', fontSize:13, lineHeight:1.8, maxWidth:600, marginBottom:0 }}>
                  Experience unparalleled quality and performance with this premium product. Crafted with precision engineering and premium materials, it delivers exceptional results for both professionals and enthusiasts alike.
                </p>
                <div className="pd-desc-cols">
                  <div>
                    <p className="ilu-c" style={{ fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.1em', color:'#fff', marginBottom:12 }}>Key Features</p>
                    {["Premium materials for durability","Ergonomic design for comfort","Advanced performance features","Easy maintenance and care","Manufacturer warranty included"].map((f,i) => (
                      <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:9, marginBottom:8 }}>
                        <CheckCircle size={13} color="#22c55e" style={{ flexShrink:0, marginTop:2 }}/>
                        <span className="ilu" style={{ fontSize:12, color:'#555', lineHeight:1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="ilu-c" style={{ fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.1em', color:'#fff', marginBottom:12 }}>Why Choose This</p>
                    <div className="ilu-box" style={{ display:'flex', gap:10 }}>
                      <AwardIcon size={14} color="#444" style={{ flexShrink:0, marginTop:2 }} strokeWidth={1.5}/>
                      <div>
                        <p className="ilu-c" style={{ fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.06em', color:'#fff', marginBottom:3 }}>Premium Quality</p>
                        <p className="ilu" style={{ fontSize:11, color:'#444' }}>Backed by our quality assurance guarantee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications */}
            {activeTab==="specifications" && (
              <div>
                <h3 className="ilu-c" style={{ fontSize:22, fontWeight:900, textTransform:'uppercase', letterSpacing:'.04em', color:'#fff', marginBottom:24 }}>Specifications</h3>
                <div className="pd-specs" style={{ border:'1px solid #1a1a1a' }}>
                  {[
                    { label:"Category", value:product.category||"General" },
                    { label:"Material", value:"Premium" },
                    { label:"Weight",   value:"Standard" },
                    { label:"Warranty", value:"1 Year" },
                    { label:"Returns",  value:"30 Days" },
                    { label:"SKU",      value:`SPX-${product.id}` },
                  ].map(({ label, value }, i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 16px', borderBottom:'1px solid #1a1a1a', gap:12 }}>
                      <span className="ilu-c" style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#444' }}>{label}</span>
                      <span className="ilu-c" style={{ fontSize:12, fontWeight:700, color:'#fff', letterSpacing:'.05em' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab==="reviews" && (
              <div>
                {/* Summary */}
                <div className="pd-rh">
                  <div style={{ border:'1px solid #1a1a1a', background:'#060606', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, padding:'20px 12px' }}>
                    <div className="ilu-c" style={{ fontSize:'clamp(40px,8vw,60px)', fontWeight:900, color:'#fff', lineHeight:1 }}>{productRating.toFixed(1)}</div>
                    <div style={{ display:'flex', gap:3 }}>
                      {[...Array(5)].map((_,i)=><Star key={i} size={12} fill={i<Math.floor(productRating)?'#fff':'none'} color={i<Math.floor(productRating)?'#fff':'#333'}/>)}
                    </div>
                    <span className="ilu-c" style={{ fontSize:8, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'#444' }}>{reviews.length} verified</span>
                  </div>
                  <div style={{ border:'1px solid #1a1a1a', padding:'18px 18px', display:'flex', flexDirection:'column', justifyContent:'center', gap:10 }}>
                    <p className="ilu-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:'#444', marginBottom:4 }}>Rating Breakdown</p>
                    {ratingDistribution.map(item => (
                      <div key={item.stars} style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span className="ilu-c" style={{ fontSize:9, fontWeight:700, color:'#444', width:28, flexShrink:0 }}>{item.stars}★</span>
                        <div style={{ flex:1, height:2, background:'#111' }}>
                          <div style={{ height:'100%', background:'#fff', width:`${item.percentage}%`, transition:'width .5s ease' }}/>
                        </div>
                        <span className="ilu-c" style={{ fontSize:9, fontWeight:700, color:'#444', width:24, textAlign:'right', flexShrink:0 }}>{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User's existing review */}
                {user && myReview && (
                  <div className="ilu-box" style={{ marginBottom:20, borderColor:'#252525' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                      <CheckCircle size={13} color="#22c55e"/>
                      <span className="ilu-c" style={{ fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.1em', color:'#fff' }}>Your Review</span>
                      <span className="ilu-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.12em', color:'#444', marginLeft:'auto' }}>{formatReviewDate(myReview.createdAt)}</span>
                    </div>
                    <div style={{ display:'flex', gap:2, marginBottom:9 }}>
                      {[...Array(5)].map((_,i)=><Star key={i} size={12} fill={i<myReview.rating?'#fff':'none'} color={i<myReview.rating?'#fff':'#333'}/>)}
                    </div>
                    <p className="ilu" style={{ fontSize:12, color:'#555', lineHeight:1.7, marginBottom:14 }}>{myReview.comment}</p>
                    <div style={{ display:'flex', gap:8 }}>
                      {[
                        { label:'Edit', style:{}, action:()=>{ setUserRating(myReview.rating); setReviewText(myReview.comment); document.getElementById('review-form')?.scrollIntoView({behavior:'smooth'}); } },
                        { label:'Delete', style:{ color:'#ef4444', borderColor:'rgba(239,68,68,.25)' }, action:async()=>{ if(window.confirm("Delete your review?")){ try{ await api.delete(`/Products/reviews/${myReview.id}`); toast.success("Review deleted"); await fetchReviews(); await fetchProductStats(); }catch{ toast.error("Failed to delete review"); } } } },
                      ].map(({ label, style, action }) => (
                        <button key={label} className="ilu-btn-ghost" style={{ flex:'none', width:'auto', padding:'7px 14px', fontSize:10, ...style }} onClick={action}>{label}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Review form */}
                <div id="review-form" className="ilu-box" style={{ marginBottom:24 }}>
                  <p className="ilu-c" style={{ fontSize:15, fontWeight:900, textTransform:'uppercase', letterSpacing:'.06em', color:'#fff', marginBottom:18 }}>Share Your Experience</p>
                  <div style={{ marginBottom:16 }}>
                    <span className="ilu-label">Your Rating</span>
                    <div style={{ display:'flex', gap:6 }}>
                      {[1,2,3,4,5].map(star => (
                        <button key={star} className="ilu-star-btn" onClick={()=>setUserRating(star)} onMouseEnter={()=>setHoverRating(star)} onMouseLeave={()=>setHoverRating(0)}>
                          <Star size={26} fill={star<=(hoverRating||userRating)?'#fff':'none'} color={star<=(hoverRating||userRating)?'#fff':'#333'} strokeWidth={1.5}/>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom:16 }}>
                    <span className="ilu-label">Your Review</span>
                    <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder="Share your honest thoughts..." rows={4} className="ilu-input"/>
                  </div>
                  <button onClick={handleSubmitReview} disabled={submittingReview||!userRating||(!!user&&!!myReview)} className="ilu-btn-primary" style={{ width:'auto', padding:'11px 24px' }}>
                    {submittingReview ? "Submitting..." : user&&myReview ? "Already Reviewed" : "Submit Review"}
                  </button>
                </div>

                {/* Reviews list */}
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {loadingReviews ? (
                    <div style={{ textAlign:'center', padding:'40px 0' }}>
                      <Loader size={26} color="#333" className="ilu-spin" style={{ margin:'0 auto' }}/>
                    </div>
                  ) : reviews.length===0 ? (
                    <div style={{ textAlign:'center', padding:'40px 20px', border:'1px solid #1a1a1a' }}>
                      <MessageSquare size={28} color="#222" style={{ margin:'0 auto 14px' }}/>
                      <p className="ilu-c" style={{ fontSize:14, fontWeight:800, textTransform:'uppercase', letterSpacing:'.08em', color:'#333', marginBottom:4 }}>No Reviews Yet</p>
                      <p className="ilu" style={{ fontSize:12, color:'#333' }}>Be the first to review this product!</p>
                    </div>
                  ) : reviews.map(review => (
                    <div key={review.id} style={{ border:'1px solid #1a1a1a', padding:'18px', background:'#000' }}>
                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, marginBottom:10, flexWrap:'wrap' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, border:'1px solid #222', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            <span className="ilu-c" style={{ fontSize:13, fontWeight:900, color:'#fff' }}>{review.avatar}</span>
                          </div>
                          <div>
                            <div style={{ display:'flex', alignItems:'center', gap:7, flexWrap:'wrap', marginBottom:4 }}>
                              <span className="ilu-c" style={{ fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.06em', color:'#fff' }}>{review.name}</span>
                              {review.userId===user?.id && <span className="ilu-c" style={{ fontSize:8, fontWeight:800, letterSpacing:'.14em', textTransform:'uppercase', background:'#fff', color:'#000', padding:'2px 6px' }}>You</span>}
                              {review.verified && <span className="ilu-c" style={{ fontSize:8, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', border:'1px solid rgba(34,197,94,.25)', color:'#22c55e', padding:'2px 6px' }}>Verified</span>}
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div style={{ display:'flex', gap:2 }}>
                                {[...Array(5)].map((_,i)=><Star key={i} size={10} fill={i<review.rating?'#fff':'none'} color={i<review.rating?'#fff':'#333'}/>)}
                              </div>
                              <span className="ilu-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.1em', color:'#444' }}>{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="ilu" style={{ fontSize:12, color:'#555', lineHeight:1.7, marginBottom:12 }}>{review.comment}</p>
                      <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                        <button onClick={()=>handleMarkHelpful(review.id)} disabled={review.isHelpful||review.userId===user?.id}
                          className="ilu-btn-ghost"
                          style={{ flex:'none', width:'auto', padding:'6px 13px', fontSize:10, background:review.isHelpful?'#fff':undefined, color:review.isHelpful?'#000':undefined, borderColor:review.isHelpful?'#fff':undefined, opacity:review.userId===user?.id?.4:1, cursor:review.userId===user?.id?'not-allowed':undefined }}>
                          <ThumbsUp size={11}/> Helpful ({review.helpful})
                        </button>
                        {review.userId!==user?.id && (
                          <button className="ilu-btn-ghost" style={{ flex:'none', width:'auto', padding:'6px 13px', fontSize:10 }}>
                            <MessageSquare size={11}/> Reply
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ marginBottom:20, paddingBottom:14, borderBottom:'1px solid #1a1a1a' }}>
              <p className="ilu-c" style={{ fontSize:9, fontWeight:700, letterSpacing:'.3em', textTransform:'uppercase', color:'#444', marginBottom:5 }}>You May Also Like</p>
              <h3 className="ilu-c" style={{ fontSize:'clamp(20px,4vw,36px)', fontWeight:900, textTransform:'uppercase', letterSpacing:'.02em', color:'#fff', lineHeight:1 }}>Related Products</h3>
            </div>
            {loadingRelated ? (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <Loader size={26} color="#333" className="ilu-spin" style={{ margin:'0 auto' }}/>
              </div>
            ) : (
              <div className="pd-related">
                {relatedProducts.map(rel => (
                  <div key={rel.id} className="ilu-rc" onClick={()=>navigate(`/product/${rel.id}`)}>
                    <div style={{ height:160, background:'#060606', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', padding:16, borderBottom:'1px solid #1a1a1a' }}>
                      <img src={rel.imageUrl} alt={rel.name} className="ilu-ri"/>
                    </div>
                    <div style={{ padding:'12px 14px 16px' }}>
                      <p className="ilu-c" style={{ fontSize:12, fontWeight:800, textTransform:'uppercase', letterSpacing:'.04em', color:'#fff', lineHeight:1.1, marginBottom:7, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rel.name}</p>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <span className="ilu-c" style={{ fontSize:17, fontWeight:900, color:'#fff' }}>${Number(rel.price).toFixed(2)}</span>
                        <span className="ilu-c" style={{ fontSize:8, fontWeight:800, letterSpacing:'.14em', textTransform:'uppercase', color:rel.stockQuantity>0?'#22c55e':'#ef4444' }}>
                          {rel.stockQuantity>0?"In Stock":"Out"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}