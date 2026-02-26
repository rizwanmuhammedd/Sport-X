
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

  // State for product data
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
    views: 0,
    purchases: 0,
    wishlistCount: 0,
    averageRating: 0,
    reviewCount: 0,
    isPremium: false
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // Check if product is in cart/wishlist
  const isInCart = cart.some((item) => item.productId === parseInt(id));
  const isInWishlist = wishlist.some((item) => item.productId === parseInt(id));


const passedRating = location.state?.rating;

  // Fetch product details
  

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
    fetchProductStats();
    fetchRelatedProducts();
    
    // Track product view
    if (id) {
      api.post(`/Products/${id}/view`).catch(console.error);
    }
  }, [id]);

  // Corrected fetchProductDetails function
  const fetchProductDetails = async () => {
  try {
    setLoading(true);
    console.log("📡 Fetching product from API with ID:", id);

const response = await api.get(`/Products/GetBy_${id}`);

if (response.data.statusCode === 200) {
  const productData = response.data.data;

const processedProduct = {
  ...productData,
  stockQuantity:
    productData.stockQuantity ??
    productData.stock ??
    productData.quantity ??
    0,

  imageUrl:
    productData.imageUrl ||
    productData.image ||
    "https://via.placeholder.com/400",
};

  setProduct(processedProduct);
} else {
  throw new Error("Product not found");
}

  } catch (error) {
    console.error("❌ Error fetching product:", error);
    toast.error("Failed to load product details");

    // Fallback: search all products
    try {
      const allResponse = await api.get("/Products/User/GetAll");
      const allProducts = allResponse.data.data || allResponse.data || [];
      const foundProduct = allProducts.find(
        (p) => p.id == id || p.productId == id
      );

      if (foundProduct) {
       setProduct({
  ...foundProduct,
  stockQuantity:
    foundProduct.stockQuantity ??
    foundProduct.stock ??
    foundProduct.quantity ??
    0,

  imageUrl:
    foundProduct.imageUrl ||
    foundProduct.image ||
    "https://via.placeholder.com/400",
});

      }
    } catch (fallbackError) {
      console.error("❌ Fallback also failed:", fallbackError);
    }
  } finally {
    setLoading(false);
  }
};


  // ✅ UPDATED: Corrected fetchReviews function with real user data
  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      
      const response = await api.get(`/Products/${id}/reviews`);
      
      console.log("📊 Reviews API Response:", response.data);
      
if (response.data.statusCode === 200) {
        const formattedReviews = response.data.data.map(review => ({
          id: review.id,
          userId: review.userId,
          name: review.userName || "Anonymous",
          rating: review.rating,
          date: formatReviewDate(review.createdAt),
          comment: review.comment,
          helpful: review.helpfulCount,
          verified: review.isVerifiedPurchase,
          avatar: review.userAvatar || (review.userName?.charAt(0) || "A"),
          profileImage: review.userProfileImage || "",
          isHelpful: review.isHelpful || false,
          createdAt: review.createdAt
        }));
        
        // ✅ Sort by date (newest first)
        const sortedReviews = formattedReviews.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        console.log("✅ Loaded reviews:", sortedReviews.length);
        setReviews(sortedReviews);
      } else {
        console.warn("⚠️ API returned success:false");
        setReviews([]);
      }
    } catch (error) {
      console.error("❌ Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Corrected fetchProductStats function
  const fetchProductStats = async () => {
    try {
      // Use correct endpoint for product stats
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
      console.error("Error fetching stats:", error);
      // Set default stats if API fails
      setProductStats({
        views: Math.floor(Math.random() * 2000) + 500,
        purchases: Math.floor(Math.random() * 200) + 50,
        wishlistCount: Math.floor(Math.random() * 100) + 20,
        averageRating: 4.5,
        reviewCount: 2,
        isPremium: true
      });
    }
  };

  // Corrected fetchRelatedProducts function
  const fetchRelatedProducts = async () => {
    try {
      setLoadingRelated(true);
      // Use correct endpoint for related products
      const response = await api.get(`/Products/${id}/related`);
if (response.data.statusCode === 200) {
        setRelatedProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
      setRelatedProducts([]); // Empty array if API fails
    } finally {
      setLoadingRelated(false);
    }
  };

  // ✅ UPDATED: Better formatReviewDate function
  const formatReviewDate = (dateString) => {
    if (!dateString) return "Recently";
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now - date;
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      
      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      if (diffInDays === 0) return "Today";
      if (diffInDays === 1) return "Yesterday";
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) !== 1 ? 's' : ''} ago`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) !== 1 ? 's' : ''} ago`;
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return "Recently";
    }
  };

  const getStockStatus = (stock) => {
    if (!product || stock === undefined) {
      return { text: "Checking stock...", color: "text-gray-400" };
    }

    if (stock <= 0) return { 
      text: "Out of Stock", 
      color: "text-red-400 dark:text-red-300 bg-red-50 dark:bg-red-900/20", 
      border: "border-red-200 dark:border-red-800/30",
      iconColor: "text-red-400 dark:text-red-300"
    };
    if (stock <= 5) return { 
      text: `Only ${stock} left`, 
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20", 
      border: "border-amber-200 dark:border-amber-800/30",
      iconColor: "text-amber-600 dark:text-amber-400"
    };
    if (stock <= 10) return { 
      text: `${stock} in stock`, 
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20", 
      border: "border-emerald-200 dark:border-emerald-800/30",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    };
    return { 
      text: "In Stock", 
      color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20", 
      border: "border-green-200 dark:border-green-800/30",
      iconColor: "text-green-600 dark:text-green-400"
    };
  };

  const handleBuyNow = () => {
    if (!user) {
      toast("Please login to continue");
      return navigate("/login");
    }

    if (!product || product.stockQuantity <= 0) {
      toast.error("Sorry, this product is out of stock!");
      return;
    }

    if (quantity > product.stockQuantity) {
      toast.error(`Sorry, Only ${product.stockQuantity} items available!`);
      return;
    }

    navigate("/checkout", {
      state: { products: [{ ...product, quantity }], source: "buyNow" },
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }

    const currentStock =
      product.stockQuantity ??
      product.stock ??
      product.quantity ??
      0;
    
    if (currentStock <= 0) {
      toast.error("Sorry, this product is out of stock!");
      return;
    }

    if (quantity > currentStock) {
      toast.error(`Only ${currentStock} items available in stock!`);
      return;
    }

    try {
      const productForCart = {
        productId: product.id,
        id: product.id,
        name: product.name,
        price: parseFloat(product.price || 0),
        image: product.imageUrl || product.image,
        stockQuantity: currentStock
      };
      
      await addToCart(productForCart, quantity);
    } catch (error) {
      console.error("❌ Add to cart error:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  useEffect(() => {
    console.log("Current wishlist state:", wishlist);
    console.log("Is current product in wishlist?", isInWishlist);
    console.log("Current product ID:", id);
  }, [wishlist, isInWishlist, id]);

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("Please login to save items");
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }

    try {
      const productForWishlist = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || product.image,
        image: product.imageUrl || product.image,
        stockQuantity: product.stockQuantity || product.stock || product.quantity || 0,
        stock: product.stockQuantity || product.stock || product.quantity || 0,
        category: product.category,
        description: product.description
      };

      console.log("Toggling wishlist with product:", productForWishlist);
      
      await toggleWishlist(productForWishlist);
      fetchProductStats();
      
    } catch (error) {
      console.error("❌ Wishlist error:", error);
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    }
  };

  // ✅ UPDATED: handleSubmitReview function for persistent reviews
 const handleSubmitReview = async () => {
  if (!user) {
    toast.error("Please login to submit a review");
    navigate("/login", { state: { from: `/product/${id}` } });
    return;
  }

  if (!userRating) {
    toast.error("Please select a rating");
    return;
  }

  if (!reviewText.trim()) {
    toast.error("Please write a review");
    return;
  }

  if (reviewText.trim().length < 10) {
    toast.error("Review must be at least 10 characters");
    return;
  }

  try {
    setSubmittingReview(true);

    const reviewData = {
      rating: userRating,
      comment: reviewText.trim(),
    };

    console.log("📦 Sending review data:", reviewData);

    const response = await api.post(`/Products/${id}/reviews`, reviewData);

    console.log("✅ API Response:", response.data);

if (response.data.statusCode === 200) {
      toast.success("Review submitted successfully!");

      // Refresh UI
      await fetchReviews();
      await fetchProductStats();

      // Clear form
      setReviewText("");
      setUserRating(0);
    } 
  } 
  catch (error) {
    console.error("❌ Review submission error:", error);

    if (error.response?.data) {
      const errorData = error.response.data;

      if (errorData.errors) {
        const validationErrors = Object.entries(errorData.errors)
          .map(([field, messages]) =>
            `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
          )
          .join("; ");

        toast.error(`Validation error: ${validationErrors}`);
      } 
      else if (
        errorData.message?.toLowerCase().includes("already") ||
        errorData.message?.toLowerCase().includes("duplicate")
      ) {
        toast.error("You have already reviewed this product");
      } 
      else if (errorData.message) {
        toast.error(errorData.message);
      } 
      else {
        toast.error("Failed to submit review. Please try again.");
      }
    } 
    else {
      toast.error(error.message || "Failed to submit review");
    }
  } 
  finally {
    setSubmittingReview(false);
  }
};


  // Corrected handleMarkHelpful function
  const handleMarkHelpful = async (reviewId) => {
    if (!user) {
      toast("Please login to mark reviews helpful");
      return navigate("/login");
    }

    try {
      // Correct endpoint for marking helpful
      await api.post(`/Products/reviews/${reviewId}/helpful`);
      
      // Update local state
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1, isHelpful: true }
          : review
      ));
      
      toast.success("Marked as helpful!");
    } catch (error) {
      console.error("Error marking helpful:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || "Sport-X Product",
        text: `Check out ${product?.name} on Sport-X`,
        url: window.location.href
      }).then(() => {
        toast.success("Shared successfully!");
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // const handleIncrease = () => {
  //   if (!product || !stock) {
  //     toast.error("Product stock information not available");
  //     return;
  //   }
    const handleIncrease = () => {
  if (!product) return;

  const stock =
    product.stockQuantity ??
    product.stock ??
    product.quantity ??
    0;

  if (quantity >= stock) {
    toast.error(`Only ${stock} items available in stock!`);
    return;
  }

  setQuantity((prev) => prev + 1);
};


  const handleDecrease = () => {
    if (quantity <= 1) {
      toast.error("Minimum quantity is 1");
      return;
    }
    setQuantity(prev => prev - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="mx-auto animate-spin text-gray-400 dark:text-gray-600 mb-4" size={48} />
          <h2 className="text-xl font-light text-gray-900 dark:text-white">Loading Product...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
          <AlertCircle className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
          <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stockQuantity);
  const stock = 
    product.stockQuantity !== undefined ? product.stockQuantity :
    product.stock !== undefined ? product.stock :
    product.quantity !== undefined ? product.quantity :
    10;

  const isOutOfStock = stock <= 0;
const productRating =
  productStats.averageRating ||
  passedRating ||
  4.5; // fallback
  const totalReviews = reviews.length;
  const isPremium = productStats.isPremium;

  // ✅ Check if current user has already reviewed
  const myReview = user ? reviews.find(r => r.userId === user.id) : null;

  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.65), percentage: 65 },
    { stars: 4, count: Math.floor(totalReviews * 0.22), percentage: 22 },
    { stars: 3, count: Math.floor(totalReviews * 0.07), percentage: 7 },
    { stars: 2, count: Math.floor(totalReviews * 0.04), percentage: 4 },
    { stars: 1, count: Math.floor(totalReviews * 0.02), percentage: 2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Premium Header */}
        <div className="mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 flex items-center gap-1 text-sm"
            >
              <ChevronRight className="rotate-180" size={16} />
              Back
            </button>
            <ChevronRight className="text-gray-400" size={16} />
            <span className="text-gray-600 dark:text-gray-400 text-sm">{product.category}</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-3">
            {product.name}
          </h1>
          
          <div className="relative w-48 h-px mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 dark:via-white/20 to-transparent blur-sm"></div>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Image Gallery */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
              <div className="relative w-full h-96 flex items-center justify-center">
               <img
  src={
    product.imageUrl?.startsWith("http") || product.imageUrl?.startsWith("/")
      ? product.imageUrl
      : product.image?.startsWith("http") || product.image?.startsWith("/")
      ? product.image
      : `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
          <rect width="400" height="400" fill="#f3f4f6"/>
          <text x="200" y="200" font-family="Arial" font-size="24" text-anchor="middle" fill="#9ca3af" dy=".3em">
            ${product.name || 'Product'}
          </text>
        </svg>
      `)}`
  }
  alt={product.name}
  className={`w-full h-full object-contain transition-all duration-500 ${
    isOutOfStock ? "grayscale opacity-50" : ""
  }`}
  onError={(e) => {
    // Fallback to data URL
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#f3f4f6"/>
        <text x="200" y="200" font-family="Arial" font-size="20" text-anchor="middle" fill="#9ca3af" dy=".3em">
          ${product.name || 'No Image'}
        </text>
      </svg>
    `)}`;
  }}
/>
                {/* Premium Badge */}
                {isPremium && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold rounded-full border border-amber-200 dark:border-amber-800/30 flex items-center gap-2">
                    <Sparkles size={14} />
                    Premium Choice
                  </div>
                )}
              </div>
              
              {/* Product Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <Eye className="mx-auto text-gray-600 dark:text-gray-400 mb-2" size={20} />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {productStats.views.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <Users className="mx-auto text-gray-600 dark:text-gray-400 mb-2" size={20} />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {productStats.purchases}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Purchased</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <Heart className="mx-auto text-gray-600 dark:text-gray-400 mb-2" size={20} />
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {productStats.wishlistCount}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6 lg:space-y-8">
            {/* Rating & Price */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        strokeWidth={1.5}
                        className={i < Math.floor(productRating) 
                          ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
                          : "text-gray-300 dark:text-gray-700"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {productRating.toFixed(1)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({totalReviews} reviews)
                  </span>
                </div>
                
                {/* Stock Status */}
                <div className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium border ${stockStatus.color} ${stockStatus.border}`}>
                  <Package size={16} className={stockStatus.iconColor} />
                  <span>{stockStatus.text}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-lg">
                    ${Number(product.price).toFixed(2)} each
                  </span>
                </div>
                {stock <= 5 && !isOutOfStock && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    ⚠️ Hurry! Only {stock} items left
                  </p>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-900 dark:text-white">Quantity</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Max: {stock}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleDecrease}
                    disabled={isOutOfStock || quantity <= 1}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                  >
                    <X size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleIncrease}
                    disabled={isOutOfStock || quantity >= stock}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">+</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
                    isOutOfStock
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                      : "bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  <CreditCard size={20} />
                  {isOutOfStock ? "Out of Stock" : "Buy Now"}
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => {
                    if (isInCart) {
                      navigate("/cart");
                    } else {
                      handleAddToCart();
                    }
                  }}
                  disabled={isOutOfStock}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 text-lg border ${
                    isOutOfStock
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-200 dark:border-gray-700"
                      : isInCart
                      ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border-transparent"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  <ShoppingBag size={20} />
                  {isOutOfStock
                    ? "Out of Stock"
                    : isInCart
                    ? "View in Cart"
                    : "Add to Cart"}
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleWishlistToggle}
                    disabled={!product}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                      isInWishlist
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-transparent shadow-lg shadow-rose-500/30"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    } ${!product ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
                    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  >
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Truck className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <Lock className="text-emerald-600 dark:text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Secure Payment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden mb-12">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 dark:border-gray-800">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-medium transition-all duration-300 border-b-2 text-sm md:text-base ${
                  activeTab === tab
                    ? "text-gray-900 dark:text-white border-gray-900 dark:border-white"
                    : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab === "reviews" ? `Reviews (${totalReviews})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === "description" && (
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Experience unparalleled quality and performance with this premium product. Crafted with precision engineering and premium materials, it delivers exceptional results for both professionals and enthusiasts alike.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Key Features</h4>
                    <ul className="space-y-3">
                      {["Premium materials for durability", "Ergonomic design for comfort", "Advanced performance features", "Easy maintenance and care", "Manufacturer warranty included"].map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" size={20} />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Why Choose This</h4>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                      <div className="flex items-start gap-3">
                        <AwardIcon className="text-amber-600 dark:text-amber-400 mt-1" size={20} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">Premium Quality</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Backed by our quality assurance guarantee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-8">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-medium text-gray-900 dark:text-white">Category</span>
                      <span className="text-gray-600 dark:text-gray-400">{product.category || "General"}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-medium text-gray-900 dark:text-white">Material</span>
                      <span className="text-gray-600 dark:text-gray-400">Premium</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-medium text-gray-900 dark:text-white">Weight</span>
                      <span className="text-gray-600 dark:text-gray-400">Standard</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-medium text-gray-900 dark:text-white">Warranty</span>
                      <span className="text-gray-600 dark:text-gray-400">1 Year</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-medium text-gray-900 dark:text-white">Returns</span>
                      <span className="text-gray-600 dark:text-gray-400">30 Days</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-medium text-gray-900 dark:text-white">SKU</span>
                      <span className="text-gray-600 dark:text-gray-400">SPX-{product.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                  {/* Rating Summary */}
                  <div className="lg:col-span-1">
                    <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white mb-3">{productRating.toFixed(1)}</div>
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={24}
                            className={i < Math.floor(productRating) 
                              ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
                              : "text-gray-300 dark:text-gray-700"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{reviews.length} verified review{reviews.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Rating Breakdown</h4>
                    {ratingDistribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-16">
                          {item.stars} star{item.stars !== 1 ? 's' : ''}
                        </span>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full transition-all duration-700" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ✅ ADDED: Show current user's existing review (Like Amazon) */}
                {user && myReview && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="text-blue-600 dark:text-blue-400" size={24} />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Your Review</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You reviewed this product on {formatReviewDate(myReview.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < myReview.rating 
                            ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
                            : "text-gray-300 dark:text-gray-700"
                          }
                        />
                      ))}
                      <span className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
                        {myReview.rating}.0
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{myReview.comment}</p>
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => {
                          setUserRating(myReview.rating);
                          setReviewText(myReview.comment);
                          // Scroll to review form
                          document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      >
                        Edit Review
                      </button>
                      
                      <button 
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete your review?")) {
                            try {
                              await api.delete(`/Products/reviews/${myReview.id}`);
                              toast.success("Review deleted");
                              await fetchReviews();
                              await fetchProductStats();
                            } catch (error) {
                              toast.error("Failed to delete review");
                            }
                          }
                        }}
                        className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300"
                      >
                        Delete Review
                      </button>
                    </div>
                  </div>
                )}

                {/* Write Review */}
                <div id="review-form" className="mb-8 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Share Your Experience</h4>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform duration-200 hover:scale-110"
                        >
                          <Star
                            size={32}
                            className={star <= (hoverRating || userRating) 
                              ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
                              : "text-gray-300 dark:text-gray-700"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Your Review</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your honest thoughts about this product..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent resize-none transition-all duration-300"
                    />
                  </div>

                  <button
                    onClick={handleSubmitReview}
                    disabled={submittingReview || !userRating || (user && myReview)}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      submittingReview || !userRating || (user && myReview)
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 hover:shadow-lg hover:scale-[1.02]"
                    }`}
                  >
                    {submittingReview ? "Submitting..." : (user && myReview ? "Already Reviewed" : "Submit Review")}
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {loadingReviews ? (
                    <div className="text-center py-8">
                      <Loader className="mx-auto animate-spin text-gray-400 dark:text-gray-600" size={32} />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={48} />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Reviews Yet</h4>
                      <p className="text-gray-600 dark:text-gray-400">Be the first to review this product!</p>
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="p-6 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-gray-900 dark:text-white">{review.avatar}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-semibold text-gray-900 dark:text-white">{review.name}</h5>
                                
                                {/* Show "Your Review" badge for current user */}
                                {review.userId === user?.id && (
                                  <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800/30">
                                    Your Review
                                  </span>
                                )}
                                
                                {review.verified && (
                                  <span className="px-2 py-1 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full border border-emerald-200 dark:border-emerald-800/30">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={16}
                                      className={i < review.rating 
                                        ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" 
                                        : "text-gray-300 dark:text-gray-700"
                                      }
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{review.comment}</p>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => handleMarkHelpful(review.id)}
                            disabled={review.isHelpful || review.userId === user?.id}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                              review.isHelpful
                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30"
                                : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            } ${review.userId === user?.id ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <ThumbsUp size={16} />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          
                          {/* Show reply option only for other users' reviews */}
                          {review.userId !== user?.id && (
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                              <MessageSquare size={16} />
                              <span>Reply</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loadingRelated ? (
                <div className="col-span-4 text-center py-8">
                  <Loader className="mx-auto animate-spin text-gray-400 dark:text-gray-600" size={32} />
                </div>
              ) : (
                relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    className="group bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden">
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {relatedProduct.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${Number(relatedProduct.price).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {relatedProduct.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}









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

//   // Add debounced search state
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm || "");

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

//   // Debouncing effect for search term
//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm || "");
//     }, 300); // 300ms delay

//     return () => {
//       clearTimeout(timerId);
//     };
//   }, [searchTerm]);

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

//   // Debounced filter function for price inputs
//   const debouncedFilter = useCallback((filterType, value) => {
//     // Clear any existing timeout
//     if (debouncedFilter.timeoutId) {
//       clearTimeout(debouncedFilter.timeoutId);
//     }
    
//     // Set new timeout
//     debouncedFilter.timeoutId = setTimeout(() => {
//       if (filterType === 'minPrice') {
//         setMinPrice(value);
//         setCurrentPage(1);
//       } else if (filterType === 'maxPrice') {
//         setMaxPrice(value);
//         setCurrentPage(1);
//       }
//     }, 500); // 500ms delay for price filters
//   }, []);

//   // Store timeout ID
//   debouncedFilter.timeoutId = null;

//   // MAIN FETCH FUNCTION - Fixed to handle errors better
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const allProductsRes = await api.get("/Products/User/GetAll");
//         const allProducts = allProductsRes.data.data || [];
        
//         // Apply frontend filtering
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
        
//         // Category filter
//         if (selectedCategory && selectedCategory !== "All") {
//           filtered = filtered.filter(p => p.category === selectedCategory);
//         }
        
//         // Price filters
//         if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
//         if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
        
//         // Search filter - using debounced search term
//         if (debouncedSearchTerm && debouncedSearchTerm.trim()) {
//           filtered = filtered.filter(p => 
//             p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
//           );
//         }
        
//         // ⭐ Rating filter
//         if (minRating > 0) {
//           filtered = filtered.filter(p => p.rating >= minRating);
//         }
        
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
//   }, [
//     currentPage,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     minRating,
//     sortOption,
//     debouncedSearchTerm // Using debounced search term instead of searchTerm
//   ]);

//   // Cleanup function for debounced filter
//   useEffect(() => {
//     return () => {
//       if (debouncedFilter.timeoutId) {
//         clearTimeout(debouncedFilter.timeoutId);
//       }
//     };
//   }, []);

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
//     e.stopPropagation();

//     // 🔒 Not logged in
//     if (!user) {
//       toast.warning("Please login to add items to your cart", {
//         action: {
//           label: "Login",
//           onClick: () => navigate("/login"),
//         },
//       });
//       return;
//     }

//     // 🚫 Out of stock
//     if (item.stock <= 0) {
//       toast.error("Sorry, this product is currently out of stock");
//       return;
//     }

//     // 🛒 Already in cart
//     if (isItemInCart(item.id)) {
//       toast.info("This item is already in your cart", {
//         action: {
//           label: "View Cart",
//           onClick: () => navigate("/cart"),
//         },
//       });
//       return;
//     }

//     // ✅ Success
//     addToCart(item, 1);

//     toast.success("Added to cart 🛒");

//     setAddedToCart(item.id);
//     setTimeout(() => setAddedToCart(null), 2000);
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
//                 {/* Price Filter with Debouncing */}
//                 <div className="space-y-3">
//                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                     Price Range
//                   </label>
//                   <div className="flex gap-3 items-center">
//                     <div className="flex-1">
//                       <input
//                         type="number"
//                         placeholder={`Min $${priceRange.min}`}
//                         defaultValue={minPrice}
//                         onChange={(e) => debouncedFilter('minPrice', e.target.value)}
//                         className="w-full px-3 py-2.5 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
//                       />
//                     </div>
//                     <div className="w-6 h-px bg-gray-700"></div>
//                     <div className="flex-1">
//                       <input
//                         type="number"
//                         placeholder={`Max $${priceRange.max}`}
//                         defaultValue={maxPrice}
//                         onChange={(e) => debouncedFilter('maxPrice', e.target.value)}
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

//             {/* Advanced Filters Row with Debounced Price Inputs */}
//             <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Price Filter with Debouncing */}
//               <div>
//                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
//                   Price Range
//                 </label>
//                 <div className="flex gap-3 items-center">
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       placeholder={`Min $${priceRange.min}`}
//                       defaultValue={minPrice}
//                       onChange={(e) => debouncedFilter('minPrice', e.target.value)}
//                       className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
//                     />
//                   </div>
//                   <div className="text-gray-500">-</div>
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       placeholder={`Max $${priceRange.max}`}
//                       defaultValue={maxPrice}
//                       onChange={(e) => debouncedFilter('maxPrice', e.target.value)}
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

//         {/* Rest of the component remains exactly the same... */}
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