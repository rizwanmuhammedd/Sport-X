

// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { ShoppingCart, Trash2, Plus, Minus, Package, CreditCard, ShoppingBag, Truck, Shield, RefreshCw, ChevronRight } from "lucide-react";
// import { useState, useEffect } from "react";

// export default function Cart() {
//   const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, getTotal } = useCart();
//   const navigate = useNavigate();
  
//   const [localCart, setLocalCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (cart && cart.length > 0) {
//       setLocalCart(cart);
//       setLoading(false);
//     } else if (cart && cart.length === 0) {
//       setLocalCart([]);
//       setLoading(false);
//     }
//   }, [cart]);

//   const getTotalItems = () =>
//     localCart.reduce((sum, item) => sum + item.quantity, 0);

//   // ✅ CORRECT QUANTITY HANDLERS - SIMPLE & WORKING
//   const handleIncrease = async (item) => {
//     const productId = item.productId || item.id;
//     const stock = item.stock ?? item.stockQuantity ?? 1;
    
//     if (item.quantity >= stock) return;
    
//     await increaseQuantity(productId);
//   };

//   const handleDecrease = async (item) => {
//     const productId = item.productId || item.id;
    
//     if (item.quantity <= 1) return;
    
//     await decreaseQuantity(productId);
//   };

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
//                 const stock = item.stock ?? item.stockQuantity ?? 1;
//                 const isLowStock = stock <= 5;
//                 const isOutOfStock = stock === 0;

//                 return (
//                   <div
//                     key={item.id}
//                     className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-xl overflow-hidden"
//                   >
//                     <div 
//                       className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white 
//                       dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
//                       opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
//                     </div>
                    
//                     <div className="p-6">
//                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
//                         {/* Product Image with Stock Indicator */}
//                         <div className="relative">
//                           <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700">
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

//                             {/* ✅ WORKING QUANTITY CONTROLS */}
//                             <div className="flex flex-col items-center">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   onClick={() => handleDecrease(item)}
//                                   disabled={item.quantity <= 1 || isOutOfStock}
//                                   className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
//                                 >
//                                   <Minus size={16} className="text-gray-600 dark:text-gray-400" />
//                                 </button>

//                                 <div className="min-w-[40px] text-center">
//                                   <span className="font-medium text-gray-900 dark:text-white text-lg">{item.quantity}</span>
//                                 </div>

//                                 <button
//                                   onClick={() => handleIncrease(item)}
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

  const safeRemoveFromCart = async (cartItemId) => {
    try { await removeFromCart(cartItemId); }
    catch (error) { console.error("Error removing item:", error); }
  };

  const safeClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try { await clearCart(); }
      catch (error) { console.error("Error clearing cart:", error); }
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { products: localCart, source: "cart" } });
  };

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="c-page">
          <div className="c-center">
            <div className="c-spin-wrap">
              <div className="c-spinner" />
              <ShoppingCart size={20} color="#fff" className="c-spin-icon" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!localCart || localCart.length === 0) {
    return (
      <>
        <style>{css}</style>
        <div className="c-page">
          <div className="c-center">
            <ShoppingCart size={60} color="#1e1e1e" strokeWidth={1} style={{ marginBottom: 24 }} />
            <p className="c-eyebrow">SHOPPING BAG</p>
            <h1 className="c-hero-title">YOUR CART IS EMPTY</h1>
            <div className="c-rule-h" />
            <p className="c-muted-body">Add something worth owning.</p>
            <button className="c-btn-white" onClick={() => navigate("/")}>
              <ShoppingBag size={15} /> SHOP NOW
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="c-page">

        {/* HEADER */}
        <header className="c-page-header">
          <p className="c-eyebrow">SHOPPING BAG</p>
          <h1 className="c-hero-title">YOUR CART</h1>
          <div className="c-rule-h" />
          <p className="c-header-sub">{getTotalItems()} {getTotalItems() === 1 ? "ITEM" : "ITEMS"}</p>
        </header>

        {/* LAYOUT */}
        <div className="c-layout">

          {/* ITEMS COLUMN */}
          <div className="c-items">

            {/* Desktop col heads */}
            <div className="c-col-heads">
              <span style={{ flex: 2 }}>PRODUCT</span>
              <span style={{ flex: 1, textAlign: "center" }}>PRICE</span>
              <span style={{ flex: 1, textAlign: "center" }}>QTY</span>
              <span style={{ flex: 1, textAlign: "right" }}>TOTAL</span>
            </div>

            {localCart.map((item, idx) => {
              const price = Number(item.price) || 0;
              const stock = item.stock ?? item.stockQuantity ?? 1;
              const isLowStock = stock <= 5;
              const isOutOfStock = stock === 0;

              return (
                <div key={item.id} className="c-row" style={{ borderTop: idx === 0 ? "1px solid #1a1a1a" : "none" }}>

                  {/* Image + meta */}
                  <div className="c-img-cell">
                    <div className="c-img-frame">
                      <img
                        src={item.image || item.imageUrl || "/images/default.jpg"}
                        alt={item.name}
                        className="c-img"
                        style={{ filter: isOutOfStock ? "grayscale(1) opacity(0.3)" : "none" }}
                        onError={e => { e.target.onerror = null; e.target.src = "/images/default.jpg"; }}
                      />
                      {isLowStock && !isOutOfStock && <span className="c-badge c-badge-amber">ONLY {stock} LEFT</span>}
                      {isOutOfStock && <span className="c-badge c-badge-red">SOLD OUT</span>}
                    </div>
                    <div className="c-item-meta">
                      <p className="c-item-name">{item.name}</p>
                      <p className="c-item-cat">{item.category || "PREMIUM PRODUCT"}</p>
                      <p className="c-mobile-price">${price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Desktop price */}
                  <div className="c-desk-price">
                    <p className="c-price">${price.toFixed(2)}</p>
                  </div>

                  {/* Qty controls */}
                  <div className="c-qty">
                    <button className="c-qty-btn" onClick={() => handleDecrease(item)}
                      disabled={item.quantity <= 1 || isOutOfStock}
                      style={{ opacity: item.quantity <= 1 || isOutOfStock ? 0.25 : 1 }}>
                      <Minus size={12} />
                    </button>
                    <span className="c-qty-num">{item.quantity}</span>
                    <button className="c-qty-btn" onClick={() => handleIncrease(item)}
                      disabled={item.quantity >= stock || isOutOfStock}
                      style={{ opacity: item.quantity >= stock || isOutOfStock ? 0.25 : 1 }}>
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="c-sub-cell">
                    <p className="c-subtotal">${(price * item.quantity).toFixed(2)}</p>
                    <button className="c-remove" onClick={() => safeRemoveFromCart(item.id)}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}

            <button className="c-btn-ghost" onClick={() => navigate("/")}>
              <ChevronRight size={13} style={{ transform: "rotate(180deg)" }} />
              CONTINUE SHOPPING
            </button>
          </div>

          {/* SUMMARY COLUMN */}
          <div className="c-summary">
            <div className="c-summary-box">
              <p className="c-eyebrow" style={{ marginBottom: 16 }}>ORDER SUMMARY</p>
              <div className="c-divider" />
              <div className="c-sum-rows">
                <div className="c-sum-row"><span className="c-sum-label">SUBTOTAL</span><span className="c-sum-val">${getTotal().toFixed(2)}</span></div>
                <div className="c-sum-row"><span className="c-sum-label">SHIPPING</span><span className="c-sum-val" style={{ color: "#4ade80" }}>FREE</span></div>
                <div className="c-sum-row"><span className="c-sum-label">TAX (8%)</span><span className="c-sum-val">${(getTotal() * 0.08).toFixed(2)}</span></div>
              </div>
              <div className="c-divider" style={{ margin: "20px 0" }} />
              <div className="c-total-row">
                <span className="c-total-label">TOTAL</span>
                <span className="c-total-val">${(getTotal() * 1.08).toFixed(2)}</span>
              </div>
              <p className="c-total-sub">{getTotalItems()} ITEMS · INCL. TAX</p>
              <button className="c-btn-white c-btn-full" onClick={handleProceedToCheckout} style={{ marginTop: 24 }}>
                <CreditCard size={16} /> CHECKOUT
              </button>
              <button className="c-btn-ghost c-btn-full" onClick={safeClearCart} style={{ marginTop: 10, justifyContent: "center" }}>
                <Trash2 size={13} /> CLEAR CART
              </button>
            </div>

            {/* Trust badges */}
            <div className="c-trust">
              {[
                { Icon: Truck, label: "FREE DELIVERY", sub: "2–3 business days" },
                { Icon: Shield, label: "SECURE PAYMENT", sub: "256-bit SSL" },
                { Icon: RefreshCw, label: "EASY RETURNS", sub: "30-day policy" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="c-trust-card">
                  <Icon size={18} color="#333" />
                  <p className="c-trust-label">{label}</p>
                  <p className="c-trust-sub">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="c-watermark" aria-hidden>SPORT-X</div>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.c-page{min-height:100vh;background:#000;color:#fff;font-family:'Barlow Condensed',sans-serif;padding-bottom:120px;position:relative;overflow:hidden;}

/* atoms */
.c-eyebrow{font-size:10px;letter-spacing:.28em;color:#2e2e2e;text-transform:uppercase;font-family:'Barlow Condensed',sans-serif;}
.c-rule-h{width:36px;height:1px;background:#1a1a1a;margin:16px auto;}
.c-divider{height:1px;background:#111;}
.c-center{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;padding:0 24px;text-align:center;}
.c-muted-body{font-family:'Barlow',sans-serif;color:#333;font-size:14px;letter-spacing:.04em;margin-bottom:28px;}

/* buttons */
.c-btn-white{display:inline-flex;align-items:center;gap:10px;background:#fff;color:#000;border:none;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;letter-spacing:.2em;padding:13px 32px;cursor:pointer;transition:background .18s;}
.c-btn-white:hover{background:#e0e0e0;}
.c-btn-full{width:100%;justify-content:center;}
.c-btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#3a3a3a;border:1px solid #1a1a1a;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:600;letter-spacing:.18em;padding:11px 22px;cursor:pointer;transition:all .18s;}
.c-btn-ghost:hover{color:#fff;border-color:#3a3a3a;}

/* header */
.c-page-header{text-align:center;padding:clamp(48px,8vw,96px) 24px 36px;border-bottom:1px solid #0f0f0f;}
.c-hero-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(32px,7vw,68px);font-weight:900;letter-spacing:.08em;color:#fff;line-height:1;}
.c-header-sub{font-size:11px;letter-spacing:.22em;color:#2a2a2a;margin-top:6px;}

/* layout */
.c-layout{display:flex;gap:48px;max-width:1280px;margin:0 auto;padding:48px 24px 0;align-items:flex-start;}
.c-items{flex:2;min-width:0;}
.c-summary{flex:1;min-width:280px;position:sticky;top:24px;}

/* col heads */
.c-col-heads{display:flex;align-items:center;padding-bottom:12px;border-bottom:1px solid #111;font-size:10px;letter-spacing:.22em;color:#2a2a2a;}

/* cart row */
.c-row{display:flex;align-items:center;gap:20px;padding:26px 0;border-bottom:1px solid #111;}
.c-img-cell{display:flex;align-items:center;gap:16px;flex:2;min-width:0;}
.c-img-frame{position:relative;flex-shrink:0;width:88px;height:88px;background:#080808;border:1px solid #111;display:flex;align-items:center;justify-content:center;}
.c-img{width:72%;height:72%;object-fit:contain;}
.c-badge{position:absolute;top:-8px;right:-8px;font-size:8px;letter-spacing:.12em;padding:3px 6px;font-weight:700;font-family:'Barlow Condensed',sans-serif;}
.c-badge-amber{background:#000;border:1px solid #92400e;color:#f59e0b;}
.c-badge-red{background:#000;border:1px solid #7f1d1d;color:#ef4444;}
.c-item-meta{min-width:0;}
.c-item-name{font-size:15px;font-weight:600;letter-spacing:.04em;color:#e0e0e0;line-height:1.3;margin-bottom:4px;}
.c-item-cat{font-size:9px;letter-spacing:.2em;color:#2a2a2a;}
.c-mobile-price{display:none;}
.c-desk-price{flex:1;text-align:center;}
.c-price{font-size:16px;font-weight:600;color:#fff;}
.c-qty{flex:1;display:flex;align-items:center;justify-content:center;}
.c-qty-btn{background:transparent;border:1px solid #111;color:#fff;width:28px;height:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .15s;}
.c-qty-btn:hover:not(:disabled){border-color:#333;}
.c-qty-num{font-size:16px;font-weight:600;color:#fff;min-width:32px;text-align:center;border-top:1px solid #111;border-bottom:1px solid #111;height:28px;line-height:26px;}
.c-sub-cell{flex:1;display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
.c-subtotal{font-size:19px;font-weight:800;color:#fff;}
.c-remove{background:transparent;border:none;color:#333;cursor:pointer;padding:4px;transition:color .15s;display:flex;}
.c-remove:hover{color:#ef4444;}

/* summary */
.c-summary-box{border:1px solid #111;padding:28px;}
.c-sum-rows{display:flex;flex-direction:column;gap:12px;margin-top:16px;}
.c-sum-row{display:flex;justify-content:space-between;align-items:center;}
.c-sum-label{font-size:10px;letter-spacing:.2em;color:#333;}
.c-sum-val{font-size:14px;font-weight:600;color:#fff;}
.c-total-row{display:flex;justify-content:space-between;align-items:baseline;}
.c-total-label{font-size:11px;letter-spacing:.22em;color:#333;}
.c-total-val{font-size:28px;font-weight:900;color:#fff;}
.c-total-sub{font-size:9px;letter-spacing:.18em;color:#1e1e1e;text-align:right;margin-top:4px;}

/* trust */
.c-trust{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#111;border:1px solid #111;border-top:none;}
.c-trust-card{background:#000;padding:16px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;}
.c-trust-label{font-size:8px;font-weight:700;letter-spacing:.14em;color:#333;}
.c-trust-sub{font-family:'Barlow',sans-serif;font-size:9px;color:#1e1e1e;line-height:1.4;}

/* spinner */
.c-spin-wrap{position:relative;width:52px;height:52px;}
.c-spinner{width:52px;height:52px;border-radius:50%;border:2px solid #111;border-top:2px solid #fff;animation:c-spin .8s linear infinite;}
.c-spin-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
@keyframes c-spin{to{transform:rotate(360deg);}}

/* watermark */
.c-watermark{position:absolute;bottom:0;left:50%;transform:translateX(-50%);font-family:'Barlow Condensed',sans-serif;font-size:clamp(80px,18vw,180px);font-weight:900;letter-spacing:.06em;color:transparent;-webkit-text-stroke:1px #0b0b0b;user-select:none;pointer-events:none;white-space:nowrap;line-height:1;}

/* responsive */
@media(max-width:960px){
  .c-layout{flex-direction:column;gap:32px;}
  .c-summary{width:100%;min-width:unset;position:static;}
  .c-col-heads{display:none;}
  .c-row{flex-wrap:wrap;gap:14px;padding:20px 0;}
  .c-img-cell{flex:unset;width:100%;}
  .c-img-frame{width:72px;height:72px;}
  .c-desk-price{display:none;}
  .c-mobile-price{display:block;font-size:17px;font-weight:700;color:#fff;margin-top:6px;}
  .c-qty{flex:unset;justify-content:flex-start;}
  .c-sub-cell{flex-direction:row;align-items:center;justify-content:space-between;width:100%;}
  .c-trust{grid-template-columns:1fr 1fr;}
}
@media(max-width:480px){
  .c-layout{padding:28px 16px 0;}
  .c-trust{grid-template-columns:1fr;}
  .c-btn-ghost{width:100%;justify-content:center;}
}
`;