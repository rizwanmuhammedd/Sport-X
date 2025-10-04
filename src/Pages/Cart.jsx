




// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
//   const navigate = useNavigate();

//   // ✅ Calculate total items in cart
//   const getTotalItems = () =>
//     cart.reduce((sum, item) => sum + item.quantity, 0);

//   // ✅ Empty cart state
//   if (!cart || cart.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/102/102661.png"
//           alt="Empty Cart"
//           className="w-32 h-32 mb-4 opacity-70"
//         />
//         <h2 className="text-gray-600 text-xl font-medium">
//           Your cart is empty 🛒
//         </h2>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transform transition"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   // ✅ Proceed to checkout
//   const handleProceedToCheckout = () => {
//     navigate("/checkout", { state: { products: cart, source: "cart" } });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       {/* Title */}
//       <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
//         Your Shopping Cart ({getTotalItems()} items)
//       </h1>

//       {/* Cart Items */}
//       <div className="space-y-6">
//         {cart.map((item) => {
//           const price = Number(item.price) || 0;
//           const stock = item.stock || 1; // ✅ fallback to 1 if stock not provided
//           return (
//             <div
//               key={item.id}
//               className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition"
//             >
//               {/* Product Info */}
//               <div className="flex items-center space-x-4 w-full sm:w-auto">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-contain rounded-lg border"
//                 />
//                 <div>
//                   <h2 className="font-semibold text-gray-800 text-lg">
//                     {item.name}
//                   </h2>
//                   <p className="text-blue-600 font-medium">
//                     ${price.toFixed(2)}
//                   </p>
//                 </div>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center gap-3 mt-4 sm:mt-0">
//                 <button
//                   onClick={() =>
//                     updateQuantity(item.id, Math.max(1, item.quantity - 1))
//                   }
//                   disabled={item.quantity <= 1} // ✅ stop at 1
//                   className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//                 >
//                   -
//                 </button>
//                 <span className="font-medium text-gray-800 min-w-[30px] text-center">
//                   {item.quantity}
//                 </span>
//                 <button
//                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                   disabled={item.quantity >= stock} // ✅ stop at stock
//                   className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Price & Remove */}
//               <div className="flex items-center gap-4 mt-4 sm:mt-0">
//                 <p className="font-bold text-green-600 text-lg">
//                   ${(price * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 hover:text-red-700 font-medium"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Total & Actions */}
//       <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-2xl shadow-inner border">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
//           Total:{" "}
//           <span className="text-green-600">${getTotal().toFixed(2)}</span> (
//           {getTotalItems()} items)
//         </h2>
//         <div className="flex gap-4">
//           <button
//             onClick={clearCart}
//             className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-600 transition"
//           >
//             Clear Cart
//           </button>
//           <button
//             onClick={handleProceedToCheckout}
//             className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transform transition"
//           >
//             Proceed to Checkout
//           </button>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-md">
          <div className="mb-6">
            <ShoppingCart className="text-slate-400 mx-auto" size={80} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-serif font-light text-slate-900 mb-3">
            Your Cart is Empty
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs mx-auto mb-6"></div>
          <p className="text-slate-600 text-base mb-8">
            Start adding amazing products to your cart
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-md inline-flex items-center gap-2"
          >
            <ShoppingBag size={20} />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-slate-900 mb-3">
            Shopping Cart
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-md mx-auto mb-4"></div>
          <p className="text-slate-600 text-base">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cart.map((item) => {
            const price = Number(item.price) || 0;
            const stock = item.stock || 1;
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white shadow-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-5 w-full sm:w-auto">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-lg border border-slate-200 bg-slate-50 p-2"
                    />
                  </div>
                  <div>
                    <h2 className="font-medium text-slate-900 text-base mb-1">
                      {item.name}
                    </h2>
                    <p className="text-2xl font-semibold text-slate-900">
                      ${price.toFixed(2)}
                    </p>
                    {stock <= 5 && (
                      <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate-600">
                        <Package size={12} />
                        <span>Only {stock} left in stock</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                    className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
                  >
                    <Minus size={16} className="text-slate-600" />
                  </button>
                  <div className="min-w-[50px] text-center">
                    <span className="font-medium text-slate-900 text-lg">{item.quantity}</span>
                  </div>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= stock}
                    className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
                  >
                    <Plus size={16} className="text-slate-600" />
                  </button>
                </div>

                {/* Price & Remove */}
                <div className="flex items-center gap-6 mt-4 sm:mt-0">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium mb-1">Subtotal</p>
                    <p className="font-semibold text-xl text-slate-900">
                      ${(price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2.5 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 border border-slate-200 hover:border-slate-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total & Actions */}
        <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-slate-600 font-medium mb-2">Order Summary</p>
              <h2 className="text-4xl font-serif font-light text-slate-900 mb-2">
                Total: ${getTotal().toFixed(2)}
              </h2>
              <p className="text-slate-600">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all duration-300 border border-slate-200 hover:border-slate-300 inline-flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                <span>Clear Cart</span>
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
              <Package className="text-slate-600" size={24} />
            </div>
            <h3 className="font-medium text-slate-900 mb-1">Fast Delivery</h3>
            <p className="text-slate-600 text-sm">Ships within 2-3 days</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
              <CreditCard className="text-slate-600" size={24} />
            </div>
            <h3 className="font-medium text-slate-900 mb-1">Secure Payment</h3>
            <p className="text-slate-600 text-sm">100% secure checkout</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:border-slate-300 transition-all duration-300">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200">
              <ShoppingBag className="text-slate-600" size={24} />
            </div>
            <h3 className="font-medium text-slate-900 mb-1">Easy Returns</h3>
            <p className="text-slate-600 text-sm">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}