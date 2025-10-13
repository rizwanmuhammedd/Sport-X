








// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { ShoppingCart, Trash2, Plus, Minus, Package, CreditCard, ShoppingBag } from "lucide-react";

// export default function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
//   const navigate = useNavigate();

//   // Calculate total items in cart
//   const getTotalItems = () =>
//     cart.reduce((sum, item) => sum + item.quantity, 0);

//   // Empty cart state
//   if (!cart || cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center px-4">
//         <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-md">
//           <div className="mb-6">
//             <ShoppingCart className="text-slate-400 mx-auto" size={80} strokeWidth={1.5} />
//           </div>
//           <h2 className="text-3xl font-serif font-light text-slate-900 mb-3">
//             Your Cart is Empty
//           </h2>
//           <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-6"></div>
//           <p className="text-slate-600 text-base mb-8">
//             Start adding amazing products to your cart
//           </p>
//           <button
//             onClick={() => navigate("/")}
//             className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-md inline-flex items-center gap-2"
//           >
//             <ShoppingBag size={20} />
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Proceed to checkout
//   const handleProceedToCheckout = () => {
//     navigate("/checkout", { state: { products: cart, source: "cart" } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-20 px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-12 text-center">
//           <h1 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-3">
//             Shopping Cart
//           </h1>
//           <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-md mx-auto mb-4"></div>
//           <p className="text-slate-600 text-base">
//             {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
//           </p>
//         </div>

//         {/* Cart Items */}
//         <div className="space-y-4 mb-8">
//           {cart.map((item) => {
//             const price = Number(item.price) || 0;
//             const stock = item.stock || 1;
//             return (
//               <div
//                 key={item.id}
//                 className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white shadow-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md"
//               >
//                 {/* Product Info */}
//                 <div className="flex items-center space-x-5 w-full sm:w-auto">
//                   <div className="relative">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-24 h-24 object-contain rounded-lg border border-slate-200 bg-slate-50 p-2"
//                     />
//                   </div>
//                   <div>
//                     <h2 className="font-medium text-slate-900 text-base mb-1">
//                       {item.name}
//                     </h2>
//                     <p className="text-2xl font-semibold text-slate-900">
//                       ${price.toFixed(2)}
//                     </p>
//                     {stock <= 5 && (
//                       <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate-600">
//                         <Package size={12} />
//                         <span>Only {stock} left in stock</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center gap-3 mt-4 sm:mt-0">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.id, Math.max(1, item.quantity - 1))
//                     }
//                     disabled={item.quantity <= 1}
//                     className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
//                   >
//                     <Minus size={16} className="text-slate-600" />
//                   </button>
//                   <div className="min-w-[50px] text-center">
//                     <span className="font-medium text-slate-900 text-lg">{item.quantity}</span>
//                   </div>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     disabled={item.quantity >= stock}
//                     className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
//                   >
//                     <Plus size={16} className="text-slate-600" />
//                   </button>
//                 </div>

//                 {/* Price & Remove */}
//                 <div className="flex items-center gap-6 mt-4 sm:mt-0">
//                   <div className="text-right">
//                     <p className="text-xs text-slate-500 font-medium mb-1">Subtotal</p>
//                     <p className="font-semibold text-xl text-slate-900">
//                       ${(price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="p-2.5 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 border border-slate-200 hover:border-slate-300"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Total & Actions */}
//         <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
//             <div>
//               <p className="text-slate-600 font-medium mb-2">Order Summary</p>
//               <h2 className="text-4xl font-serif font-light text-slate-900 mb-2">
//                 Total: ${getTotal().toFixed(2)}
//               </h2>
//               <p className="text-slate-600">
//                 {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               <button
//                 onClick={clearCart}
//                 className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all duration-300 border border-slate-200 hover:border-slate-300 inline-flex items-center justify-center gap-2"
//               >
//                 <Trash2 size={20} />
//                 <span>Clear Cart</span>
//               </button>
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2"
//               >
//                 <CreditCard size={20} />
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Info Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
//             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
//               <Package className="text-slate-600" size={24} />
//             </div>
//             <h3 className="font-medium text-slate-900 mb-1">Fast Delivery</h3>
//             <p className="text-slate-600 text-sm">Ships within 2-3 days</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
//             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
//               <CreditCard className="text-slate-600" size={24} />
//             </div>
//             <h3 className="font-medium text-slate-900 mb-1">Secure Payment</h3>
//             <p className="text-slate-600 text-sm">100% secure checkout</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
//             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
//               <ShoppingBag className="text-slate-600" size={24} />
//             </div>
//             <h3 className="font-medium text-slate-900 mb-1">Easy Returns</h3>
//             <p className="text-slate-600 text-sm">30-day return policy</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, Package, CreditCard, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  // Calculate total items in cart
  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  // Empty cart state
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center px-3 xs:px-4 sm:px-6">
        <div className="text-center p-6 xs:p-8 sm:p-12 bg-white rounded-xl xs:rounded-2xl shadow-lg border border-slate-200 w-full max-w-xs xs:max-w-sm sm:max-w-md">
          <div className="mb-4 xs:mb-6">
            <ShoppingCart className="text-slate-400 mx-auto" size={60} xs:size={70} sm:size={80} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-2 xs:mb-3">
            Your Cart is Empty
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-4 xs:mb-6"></div>
          <p className="text-slate-600 text-sm xs:text-base mb-6 xs:mb-8">
            Start adding amazing products to your cart
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 xs:px-8 py-2.5 xs:py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-md inline-flex items-center gap-1 xs:gap-2 text-sm xs:text-base w-full justify-center"
          >
            <ShoppingBag size={18} xs:size={20} />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { products: cart, source: "cart" } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12 xs:py-16 sm:py-20 px-3 xs:px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 xs:mb-10 sm:mb-12 text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-serif font-light text-slate-900 mb-2 xs:mb-3">
            Shopping Cart
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-3 xs:mb-4"></div>
          <p className="text-slate-600 text-sm xs:text-base">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
          {cart.map((item) => {
            const price = Number(item.price) || 0;
            const stock = item.stock || 1;
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 xs:p-5 sm:p-6 bg-white shadow-sm rounded-lg xs:rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-3 xs:space-x-4 sm:space-x-5 w-full sm:w-auto mb-3 xs:mb-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1 xs:p-2"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-medium text-slate-900 text-sm xs:text-base mb-1 truncate">
                      {item.name}
                    </h2>
                    <p className="text-xl xs:text-2xl font-semibold text-slate-900">
                      ${price.toFixed(2)}
                    </p>
                    {stock <= 5 && (
                      <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate-600">
                        <Package size={10} xs:size={12} />
                        <span>Only {stock} left in stock</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-0">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                    className="p-1.5 xs:p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
                  >
                    <Minus size={14} xs:size={16} className="text-slate-600" />
                  </button>
                  <div className="min-w-[40px] xs:min-w-[50px] text-center">
                    <span className="font-medium text-slate-900 text-base xs:text-lg">{item.quantity}</span>
                  </div>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= stock}
                    className="p-1.5 xs:p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
                  >
                    <Plus size={14} xs:size={16} className="text-slate-600" />
                  </button>
                </div>

                {/* Price & Remove */}
                <div className="flex items-center gap-4 xs:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium mb-1">Subtotal</p>
                    <p className="font-semibold text-lg xs:text-xl text-slate-900">
                      ${(price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 xs:p-2.5 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 border border-slate-200 hover:border-slate-300"
                  >
                    <Trash2 size={16} xs:size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total & Actions */}
        <div className="mt-6 xs:mt-8 bg-white p-4 xs:p-6 sm:p-8 rounded-lg xs:rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 xs:gap-6">
            <div className="text-center lg:text-left w-full lg:w-auto">
              <p className="text-slate-600 font-medium mb-1 xs:mb-2 text-sm xs:text-base">Order Summary</p>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-light text-slate-900 mb-1 xs:mb-2">
                Total: ${getTotal().toFixed(2)}
              </h2>
              <p className="text-slate-600 text-sm xs:text-base">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 w-full lg:w-auto">
              <button
                onClick={clearCart}
                className="px-4 xs:px-6 py-2.5 xs:py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all duration-300 border border-slate-200 hover:border-slate-300 inline-flex items-center justify-center gap-1 xs:gap-2 text-sm xs:text-base"
              >
                <Trash2 size={18} xs:size={20} />
                <span>Clear Cart</span>
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="px-6 xs:px-8 py-2.5 xs:py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-md inline-flex items-center justify-center gap-1 xs:gap-2 text-sm xs:text-base"
              >
                <CreditCard size={18} xs:size={20} />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 mt-6 xs:mt-8">
          <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 border border-slate-200">
              <Package className="text-slate-600" size={20} xs:size={24} />
            </div>
            <h3 className="font-medium text-slate-900 text-sm xs:text-base mb-1">Fast Delivery</h3>
            <p className="text-slate-600 text-xs xs:text-sm">Ships within 2-3 days</p>
          </div>
          <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 border border-slate-200">
              <CreditCard className="text-slate-600" size={20} xs:size={24} />
            </div>
            <h3 className="font-medium text-slate-900 text-sm xs:text-base mb-1">Secure Payment</h3>
            <p className="text-slate-600 text-xs xs:text-sm">100% secure checkout</p>
          </div>
          <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 border border-slate-200">
              <ShoppingBag className="text-slate-600" size={20} xs:size={24} />
            </div>
            <h3 className="font-medium text-slate-900 text-sm xs:text-base mb-1">Easy Returns</h3>
            <p className="text-slate-600 text-xs xs:text-sm">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}