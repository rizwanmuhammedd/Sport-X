
// import api from "../Api/Axios_Instance";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { ShoppingCart, Trash2, Plus, Minus, Package, CreditCard, ShoppingBag, Truck, Shield, RefreshCw, ChevronRight } from "lucide-react";
// import { useState, useEffect } from "react"; // Added

// export default function Cart() {
//   const { cart, removeFromCart, addToCart, clearCart, getTotal } = useCart();
//   const navigate = useNavigate();
  
//   // Add local state to prevent immediate empty state
//   const [localCart, setLocalCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Sync local cart with context cart
//   useEffect(() => {
//     if (cart && cart.length > 0) {
//       setLocalCart(cart);
//       setLoading(false);
//     } else if (cart && cart.length === 0) {
//       setLocalCart([]);
//       setLoading(false);
//     }
//   }, [cart]);

//   // Calculate total items in cart
//   const getTotalItems = () =>
//     localCart.reduce((sum, item) => sum + item.quantity, 0);

//   // Safe add to cart with error handling
//  const safeAddToCart = async (item, change) => {
//   try {
//     const newQuantity = item.quantity + change;

//     if (newQuantity < 1) return;

//     await addToCart(
//       { productId: item.productId || item.id }, // 👈 IMPORTANT FIX
//       newQuantity
//     );
//   } catch (error) {
//     console.error("Error updating cart:", error);
//   }
// };


//   // Safe remove from cart
//   const safeRemoveFromCart = async (cartItemId) => {
//     try {
//       await removeFromCart(cartItemId);
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Safe clear cart
//   const safeClearCart = async () => {
//     if (window.confirm("Are you sure you want to clear your cart?")) {
//       try {
//         await clearCart();
//       } catch (error) {
//         console.error("Error clearing cart:", error);
//       }
//     }
//   };

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
//         <div className="flex items-center justify-center min-h-[70vh]">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-300"></div>
//             <ShoppingCart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-300 animate-pulse" size={24} />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty cart state - use localCart instead of cart
//   if (!localCart || localCart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
//         <div className="flex items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="relative inline-block mb-8">
//               <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-xl"></div>
//               <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
//                 <ShoppingCart className="mx-auto text-gray-400 dark:text-gray-600 mb-6" size={80} strokeWidth={1.5} />
//                 <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
//                   Your Cart is Empty
//                 </h1>
//                 <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6"></div>
//                 <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
//                   Discover premium products and build your perfect collection
//                 </p>
//                 <button
//                   onClick={() => navigate("/")}
//                   className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
//                 >
//                   <ShoppingBag size={20} />
//                   Start Shopping
//                   <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Proceed to checkout
//   const handleProceedToCheckout = () => {
//     navigate("/checkout", { state: { products: localCart, source: "cart" } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
//         {/* Premium Header */}
//         <div className="text-center mb-10 lg:mb-12">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
//               <ShoppingCart className="text-gray-900 dark:text-white" size={28} strokeWidth={1.5} />
//             </div>
//             <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider">SHOPPING BAG</span>
//           </div>
          
//           <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-3">
//             Your Cart
//           </h1>
          
//           <div className="relative w-48 h-px mx-auto mb-4">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 dark:via-white/20 to-transparent blur-sm"></div>
//           </div>
          
//           <p className="text-gray-600 dark:text-gray-400 text-base">
//             <span className="font-medium text-gray-900 dark:text-white">{getTotalItems()}</span> premium {getTotalItems() === 1 ? 'item' : 'items'} selected
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Cart Items Section */}
//           <div className="lg:w-2/3">
//             {/* Cart Header */}
//             <div className="hidden sm:grid grid-cols-12 gap-4 mb-6 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
//               <div className="col-span-6">
//                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">PRODUCT</span>
//               </div>
//               <div className="col-span-2 text-center">
//                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">PRICE</span>
//               </div>
//               <div className="col-span-2 text-center">
//                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">QUANTITY</span>
//               </div>
//               <div className="col-span-2 text-right">
//                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">TOTAL</span>
//               </div>
//             </div>

//             {/* Cart Items */}
//             <div className="space-y-4">
//               {localCart.map((item) => {
//                 const price = Number(item.price) || 0;
//                 const stock = item.stock ?? 1;
//                 const isLowStock = stock <= 5;
//                 const isOutOfStock = stock === 0;

//                 return (
//                   <div
//                     key={item.id}
//                     className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-xl overflow-hidden"
//                   >
//                     {/* Premium background effect */}
// <div 
//   className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white 
//   dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
//   opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
// </div>
                    
//                     <div className="p-6">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
//                         {/* Product Image with Stock Indicator */}
//                         <div className="relative">
//                           <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700">
//                             {/* Fixed image source - check all possible image properties */}
//                             <img
//                               src={item.image || item.imageUrl || "/images/default.jpg"}
//                               alt={item.name}
//                               className="w-full h-full object-contain"
//                               onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "/images/default.jpg";
//                               }}
//                             />
//                           </div>
                          
//                           {/* Stock Indicator */}
//                           {isLowStock && !isOutOfStock && (
//                             <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full border border-amber-200 dark:border-amber-800/30">
//                               <Package size={10} className="inline mr-1" />
//                               {stock} left
//                             </div>
//                           )}
//                           {isOutOfStock && (
//                             <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800/30">
//                               Out of stock
//                             </div>
//                           )}
//                         </div>

//                         {/* Product Details */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                             <div className="flex-1">
//                               <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
//                                 {item.name}
//                               </h2>
//                               <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
//                                 {item.category || "Premium Product"}
//                               </p>
                              
//                               {/* Mobile Price */}
//                               <div className="sm:hidden mb-4">
//                                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                                   ${price.toFixed(2)}
//                                 </p>
//                               </div>
//                             </div>

//                             {/* Desktop Price */}
//                             <div className="hidden sm:block text-center">
//                               <p className="text-xl font-bold text-gray-900 dark:text-white">
//                                 ${price.toFixed(2)}
//                               </p>
//                               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                                 each
//                               </p>
//                             </div>

//                             {/* Quantity Controls */}
//                             <div className="flex flex-col items-center">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   onClick={() => safeAddToCart(item, -1)}
//                                   disabled={item.quantity <= 1 || isOutOfStock}
//                                   className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
//                                 >
//                                   <Minus size={16} className="text-gray-600 dark:text-gray-400" />
//                                 </button>

//                                 <div className="min-w-[40px] text-center">
//                                   <span className="font-medium text-gray-900 dark:text-white text-lg">{item.quantity}</span>
//                                 </div>

//                                 <button
//                                   onClick={() => safeAddToCart(item, 1)}
//                                   disabled={item.quantity >= stock || isOutOfStock}
//                                   className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
//                                 >
//                                   <Plus size={16} className="text-gray-600 dark:text-gray-400" />
//                                 </button>
//                               </div>
//                               <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
//                                 Max: {stock}
//                               </p>
//                             </div>

//                             {/* Total & Remove */}
//                             <div className="flex flex-col items-end gap-4">
//                               <div className="text-right">
//                                 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">SUBTOTAL</p>
//                                 <p className="font-bold text-xl text-gray-900 dark:text-white">
//                                   ${(price * item.quantity).toFixed(2)}
//                                 </p>
//                               </div>
//                               <button
//                                 onClick={() => safeRemoveFromCart(item.id)}
//                                 className="group relative p-2 bg-transparent text-gray-500 dark:text-gray-400 rounded-lg hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800/30 hover:bg-red-50/50 dark:hover:bg-red-900/10"
//                                 title="Remove item"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Continue Shopping Button */}
//             <div className="mt-8">
//               <button
//                 onClick={() => navigate("/")}
//                 className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
//               >
//                 <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
//                 Continue Shopping
//               </button>
//             </div>
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:w-1/3">
//             <div className="sticky top-8">
//               <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
//                 <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//                   <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h2>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   {/* Summary Items */}
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
//                       <span className="font-medium text-gray-900 dark:text-white">${getTotal().toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600 dark:text-gray-400">Shipping</span>
//                       <span className="font-medium text-green-600 dark:text-green-400">Free</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600 dark:text-gray-400">Tax</span>
//                       <span className="font-medium text-gray-900 dark:text-white">${(getTotal() * 0.08).toFixed(2)}</span>
//                     </div>
//                   </div>

//                   {/* Divider */}
//                   <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4"></div>

//                   {/* Total */}
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                         ${(getTotal() * 1.08).toFixed(2)}
//                       </div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {getTotalItems()} items
//                       </p>
//                     </div>
//                   </div>

//                   {/* Checkout Button */}
//                   <button
//                     onClick={handleProceedToCheckout}
//                     className="w-full group py-4 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-[1.02] active:scale-[0.98] mt-6"
//                   >
//                     <CreditCard size={20} />
//                     Proceed to Checkout
//                     <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
//                   </button>

//                   {/* Clear Cart Button */}
//                   <button
//                     onClick={safeClearCart}
//                     className="w-full py-3 bg-transparent text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800/30 flex items-center justify-center gap-2 hover:bg-red-50/50 dark:hover:bg-red-900/10 mt-3"
//                   >
//                     <Trash2 size={18} />
//                     Clear Entire Cart
//                   </button>
//                 </div>
//               </div>

//               {/* Premium Features */}
//               <div className="mt-6 grid grid-cols-1 gap-4">
//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                       <Truck className="text-blue-600 dark:text-blue-400" size={20} />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
//                       <Shield className="text-emerald-600 dark:text-emerald-400" size={20} />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 dark:text-white">Secure Payment</h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encrypted</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-amber-100 dark:border-amber-800/30">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
//                       <RefreshCw className="text-amber-600 dark:text-amber-400" size={20} />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 dark:text-white">Easy Returns</h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, Package, CreditCard, ShoppingBag, Truck, Shield, RefreshCw, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, getTotal } = useCart();
  const navigate = useNavigate();
  
  const [localCart, setLocalCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cart && cart.length > 0) {
      setLocalCart(cart);
      setLoading(false);
    } else if (cart && cart.length === 0) {
      setLocalCart([]);
      setLoading(false);
    }
  }, [cart]);

  const getTotalItems = () =>
    localCart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ CORRECT QUANTITY HANDLERS - SIMPLE & WORKING
  const handleIncrease = async (item) => {
    const productId = item.productId || item.id;
    const stock = item.stock ?? item.stockQuantity ?? 1;
    
    if (item.quantity >= stock) return;
    
    await increaseQuantity(productId);
  };

  const handleDecrease = async (item) => {
    const productId = item.productId || item.id;
    
    if (item.quantity <= 1) return;
    
    await decreaseQuantity(productId);
  };

  // Safe remove from cart
  const safeRemoveFromCart = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Safe clear cart
  const safeClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart();
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-800 border-t-gray-900 dark:border-t-gray-300"></div>
            <ShoppingCart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-300 animate-pulse" size={24} />
          </div>
        </div>
      </div>
    );
  }

  if (!localCart || localCart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="flex items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-xl"></div>
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <ShoppingCart className="mx-auto text-gray-400 dark:text-gray-600 mb-6" size={80} strokeWidth={1.5} />
                <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
                  Your Cart is Empty
                </h1>
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-6"></div>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
                  Discover premium products and build your perfect collection
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  <ShoppingBag size={20} />
                  Start Shopping
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { products: localCart, source: "cart" } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Premium Header */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
              <ShoppingCart className="text-gray-900 dark:text-white" size={28} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider">SHOPPING BAG</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white tracking-tight mb-3">
            Your Cart
          </h1>
          
          <div className="relative w-48 h-px mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 dark:via-white/20 to-transparent blur-sm"></div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-base">
            <span className="font-medium text-gray-900 dark:text-white">{getTotalItems()}</span> premium {getTotalItems() === 1 ? 'item' : 'items'} selected
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            {/* Cart Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 mb-6 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="col-span-6">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">PRODUCT</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">PRICE</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">QUANTITY</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">TOTAL</span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {localCart.map((item) => {
                const price = Number(item.price) || 0;
                const stock = item.stock ?? item.stockQuantity ?? 1;
                const isLowStock = stock <= 5;
                const isOutOfStock = stock === 0;

                return (
                  <div
                    key={item.id}
                    className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-xl overflow-hidden"
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white 
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                      opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        {/* Product Image with Stock Indicator */}
                        <div className="relative">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700">
                            <img
                              src={item.image || item.imageUrl || "/images/default.jpg"}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/images/default.jpg";
                              }}
                            />
                          </div>
                          
                          {/* Stock Indicator */}
                          {isLowStock && !isOutOfStock && (
                            <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full border border-amber-200 dark:border-amber-800/30">
                              <Package size={10} className="inline mr-1" />
                              {stock} left
                            </div>
                          )}
                          {isOutOfStock && (
                            <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full border border-red-200 dark:border-red-800/30">
                              Out of stock
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                                {item.name}
                              </h2>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {item.category || "Premium Product"}
                              </p>
                              
                              {/* Mobile Price */}
                              <div className="sm:hidden mb-4">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                  ${price.toFixed(2)}
                                </p>
                              </div>
                            </div>

                            {/* Desktop Price */}
                            <div className="hidden sm:block text-center">
                              <p className="text-xl font-bold text-gray-900 dark:text-white">
                                ${price.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                each
                              </p>
                            </div>

                            {/* ✅ WORKING QUANTITY CONTROLS */}
                            <div className="flex flex-col items-center">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDecrease(item)}
                                  disabled={item.quantity <= 1 || isOutOfStock}
                                  className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                                >
                                  <Minus size={16} className="text-gray-600 dark:text-gray-400" />
                                </button>

                                <div className="min-w-[40px] text-center">
                                  <span className="font-medium text-gray-900 dark:text-white text-lg">{item.quantity}</span>
                                </div>

                                <button
                                  onClick={() => handleIncrease(item)}
                                  disabled={item.quantity >= stock || isOutOfStock}
                                  className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                                >
                                  <Plus size={16} className="text-gray-600 dark:text-gray-400" />
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Max: {stock}
                              </p>
                            </div>

                            {/* Total & Remove */}
                            <div className="flex flex-col items-end gap-4">
                              <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">SUBTOTAL</p>
                                <p className="font-bold text-xl text-gray-900 dark:text-white">
                                  ${(price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <button
                                onClick={() => safeRemoveFromCart(item.id)}
                                className="group relative p-2 bg-transparent text-gray-500 dark:text-gray-400 rounded-lg hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800/30 hover:bg-red-50/50 dark:hover:bg-red-900/10"
                                title="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping Button */}
            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              >
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Summary Items */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">${getTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="font-medium text-gray-900 dark:text-white">${(getTotal() * 0.08).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4"></div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(getTotal() * 1.08).toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getTotalItems()} items
                      </p>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full group py-4 bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-300 text-white dark:text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-[1.02] active:scale-[0.98] mt-6"
                  >
                    <CreditCard size={20} />
                    Proceed to Checkout
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>

                  {/* Clear Cart Button */}
                  <button
                    onClick={safeClearCart}
                    className="w-full py-3 bg-transparent text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-800/30 flex items-center justify-center gap-2 hover:bg-red-50/50 dark:hover:bg-red-900/10 mt-3"
                  >
                    <Trash2 size={18} />
                    Clear Entire Cart
                  </button>
                </div>
              </div>

              {/* Premium Features */}
              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Truck className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Shield className="text-emerald-600 dark:text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Secure Payment</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encrypted</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <RefreshCw className="text-amber-600 dark:text-amber-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Easy Returns</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}