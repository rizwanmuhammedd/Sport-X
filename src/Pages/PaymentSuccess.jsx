


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { CheckCircle, MapPin } from "lucide-react";
// import api from "../Api/Axios_Instance.jsx";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const { orderId } = useParams();
//   const location = useLocation();
//   const userIdFromState = location.state?.userId; // ✅ Get userId from Orders.jsx

//   const [order, setOrder] = useState(null);
//   const [shippingAddress, setShippingAddress] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         // Fetch the order by ID
//         const orderRes = await api.get(`/orders/${orderId}`);
//         const orderData = orderRes.data;

//         if (!orderData) {
//           setError("Order not found.");
//           setLoading(false);
//           return;
//         }

//         // Determine userId safely: prefer state passed from Orders.jsx
//         const userId = userIdFromState || orderData.userId || orderData.user_id;
//         if (!userId) {
//           setError("Order does not contain user information.");
//           setLoading(false);
//           return;
//         }

//         // Fetch user details
//         const userRes = await api.get(`/users/${userId}`);
//         const orderUser = userRes.data;

//         setOrder({
//           ...orderData,
//           userName: orderUser?.name || orderUser?.username || "N/A",
//           userEmail: orderUser?.email || "N/A",
//           items: Array.isArray(orderData.items) ? orderData.items : [],
//         });

//         // Get last saved shipping address if exists
//         const lastAddress =
//           orderUser?.shippingAddress?.[orderUser.shippingAddress.length - 1];
//         if (lastAddress) {
//           setShippingAddress(lastAddress);
//         }
//       } catch (e) {
//         console.error("Error fetching order details:", e);
//         setError("Failed to load order details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrder();
//     } else {
//       setError("Order ID not found in URL.");
//       setLoading(false);
//     }
//   }, [orderId, userIdFromState]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl text-gray-700">Loading order details...</p>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl text-red-500">{error || "Order not found."}</p>
//       </div>
//     );
//   }

//   // ✅ Fixed total calculation: ensures a valid number even if items are missing price/quantity
//   const total = order.items.reduce((sum, item) => {
//     const price = item && !isNaN(Number(item.price)) ? Number(item.price) : 0;
//     const qty = item && !isNaN(Number(item.quantity)) ? Number(item.quantity) : 1;
//     return sum + price * qty;
//   }, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center py-16 px-6">
//       <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
//         Payment Successful 🎉
//       </h1>
//       <p className="text-gray-600 text-lg mb-6 text-center">
//         Thank you for your purchase!
//       </p>

//       <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-4xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Order Summary Section */}
//           <div>
//             <div className="flex justify-between items-center mb-6 border-b pb-4">
//               <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
//               <span className="text-gray-500 text-sm">
//                 Order ID: <span className="font-semibold">{order.id}</span>
//               </span>
//             </div>

//             <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
//               {order.items.map((item, idx) => {
//                 const price = item && !isNaN(Number(item.price)) ? Number(item.price) : 0;
//                 const qty = item && !isNaN(Number(item.quantity)) ? Number(item.quantity) : 1;
//                 return (
//                   <div
//                     key={item?.id || idx}
//                     className="flex items-center justify-between border-b pb-3"
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={item?.image || "/placeholder.png"}
//                         alt={item?.name || "Item"}
//                         className="w-16 h-16 object-contain rounded-lg border"
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-800">{item?.name || "Item"}</p>
//                         <p className="text-gray-500 text-sm">Qty: {qty}</p>
//                       </div>
//                     </div>
//                     <p className="font-bold text-gray-900">
//                       ${(price * qty).toFixed(2)}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//             <h3 className="text-xl font-bold mt-6 text-right">
//               Total Paid:{" "}
//               <span className="text-green-600">${total.toFixed(2)}</span>
//             </h3>
//           </div>

//           {/* Shipping Details Section */}
//           <div className="md:border-l md:pl-8">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//               <MapPin className="w-6 h-6 text-blue-500" /> Shipping Details
//             </h2>
//             {shippingAddress ? (
//               <div className="bg-gray-50 rounded-xl p-6 space-y-2 text-gray-700 shadow-sm">
//                 <p>
//                   <span className="font-semibold">Address:</span>{" "}
//                   {shippingAddress.address}
//                 </p>
//                 <p>
//                   <span className="font-semibold">City:</span>{" "}
//                   {shippingAddress.city}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Postal Code:</span>{" "}
//                   {shippingAddress.postalCode}
//                 </p>
//               </div>
//             ) : (
//               <p className="text-gray-500">Shipping details not available.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={() => navigate("/orders")}
//         className="mt-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transform transition"
//       >
//         Go to My Orders
//       </button>
//     </div>
//   );
// }











// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { CheckCircle, MapPin } from "lucide-react";
// import api from "../Api/Axios_Instance.jsx";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const { orderId } = useParams();
//   const location = useLocation();
//   const userIdFromState = location.state?.userId; // ✅ Get userId from Orders.jsx

//   const [order, setOrder] = useState(null);
//   const [shippingAddress, setShippingAddress] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     setAnimate(true);
    
//     const fetchOrder = async () => {
//       try {
//         // Fetch the order by ID
//         const orderRes = await api.get(`/orders/${orderId}`);
//         const orderData = orderRes.data;

//         if (!orderData) {
//           setError("Order not found.");
//           setLoading(false);
//           return;
//         }

//         // Determine userId safely: prefer state passed from Orders.jsx
//         const userId = userIdFromState || orderData.userId || orderData.user_id;
//         if (!userId) {
//           setError("Order does not contain user information.");
//           setLoading(false);
//           return;
//         }

//         // Fetch user details
//         const userRes = await api.get(`/users/${userId}`);
//         const orderUser = userRes.data;

//         setOrder({
//           ...orderData,
//           userName: orderUser?.name || orderUser?.username || "N/A",
//           userEmail: orderUser?.email || "N/A",
//           items: Array.isArray(orderData.items) ? orderData.items : [],
//         });

//         // Get last saved shipping address if exists
//         const lastAddress =
//           orderUser?.shippingAddress?.[orderUser.shippingAddress.length - 1];
//         if (lastAddress) {
//           setShippingAddress(lastAddress);
//         }
//       } catch (e) {
//         console.error("Error fetching order details:", e);
//         setError("Failed to load order details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrder();
//     } else {
//       setError("Order ID not found in URL.");
//       setLoading(false);
//     }
//   }, [orderId, userIdFromState]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white backdrop-blur-lg shadow-2xl border border-blue-100 rounded-3xl p-12">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Order Details</h3>
//           <p className="text-gray-600">Please wait while we fetch your order information...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white backdrop-blur-lg shadow-2xl border border-red-100 rounded-3xl p-12 max-w-md">
//           <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-white text-2xl">⚠</span>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-3">Order Error</h3>
//           <p className="text-red-600 text-lg mb-6">{error || "Order not found."}</p>
//           <button
//             onClick={() => navigate("/orders")}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
//           >
//             Go to Orders
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Fixed total calculation: ensures a valid number even if items are missing price/quantity
//   const total = order.items.reduce((sum, item) => {
//     const price = item && !isNaN(Number(item.price)) ? Number(item.price) : 0;
//     const qty = item && !isNaN(Number(item.quantity)) ? Number(item.quantity) : 1;
//     return sum + price * qty;
//   }, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-green-200/30 to-green-300/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-blue-300/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-100/50 to-green-100/50 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <div className="relative z-10 flex flex-col items-center py-16 px-6">
//         {/* Success Header */}
//         <div className={`text-center mb-12 transform transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
//           <div className="relative mb-8">
//             <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30 animate-pulse">
//               <CheckCircle className="w-14 h-14 text-white" />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-full animate-ping"></div>
//           </div>
          
//           <h1 className="text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-green-700 drop-shadow-lg">
//             Payment Successful
//           </h1>
//           <p className="text-gray-600 text-xl font-medium">
//             Thank you for your purchase! Your order has been confirmed.
//           </p>
          
//           {/* Order ID Badge */}
//           <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-6 py-3 mt-6 shadow-lg">
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//             <span className="text-gray-700 font-semibold">Order ID: #{order.id}</span>
//           </div>
//         </div>

//         {/* Main Content Card */}
//         <div className={`bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-2xl w-full max-w-6xl p-8 transform transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Order Summary Section */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
//                   <CheckCircle className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
//               </div>

//               <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
//                 {order.items.map((item, idx) => {
//                   const price = item && !isNaN(Number(item.price)) ? Number(item.price) : 0;
//                   const qty = item && !isNaN(Number(item.quantity)) ? Number(item.quantity) : 1;
//                   return (
//                     <div
//                       key={item?.id || idx}
//                       className="bg-white border border-blue-100 rounded-2xl p-5 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="relative group">
//                             <img
//                               src={item?.image || "/placeholder.png"}
//                               alt={item?.name || "Item"}
//                               className="w-16 h-16 object-cover rounded-xl border-2 border-blue-100 group-hover:border-blue-300 transition-all duration-300 shadow-sm"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           </div>
//                           <div>
//                             <p className="font-bold text-gray-800 text-lg">{item?.name || "Item"}</p>
//                             <span className="text-gray-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
//                               Qty: {qty}
//                             </span>
//                           </div>
//                         </div>
//                         <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">
//                           ${(price * qty).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="border-t border-blue-200 pt-6">
//                 <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-800 text-xl font-semibold">Total Paid:</span>
//                     <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-green-800 drop-shadow-lg">
//                       ${total.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Shipping Details Section */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
//                   <MapPin className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800">Shipping Details</h2>
//               </div>
              
//               {shippingAddress ? (
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg space-y-4">
//                   <div className="space-y-3">
//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                         <MapPin className="w-4 h-4 text-white" />
//                       </div>
//                       <div>
//                         <p className="text-gray-700 font-medium text-lg">{shippingAddress.address}</p>
//                         <p className="text-gray-600">{shippingAddress.city}</p>
//                         <p className="text-gray-600">Postal Code: {shippingAddress.postalCode}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="border-t border-blue-200 pt-4">
//                     <div className="flex items-center gap-2 text-blue-700 font-medium">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span>Your order will be delivered to this address</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
//                   <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                   <p className="text-gray-500 font-medium">Shipping details not available</p>
//                 </div>
//               )}

//               {/* Order Status */}
//               <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-6 shadow-lg">
//                 <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                   <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs font-bold">⏳</span>
//                   </div>
//                   Order Status
//                 </h3>
//                 <div className="flex items-center gap-3">
//                   <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
//                   <span className="text-gray-700 font-semibold text-lg">Processing</span>
//                 </div>
//                 <p className="text-gray-600 text-sm mt-2">Your order is being prepared for shipment</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className={`flex flex-col sm:flex-row gap-4 mt-12 transform transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <button
//             onClick={() => navigate("/orders")}
//             className="px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
//           >
//             <CheckCircle className="w-5 h-5" />
//             View My Orders
//           </button>
          
//           <button
//             onClick={() => navigate("/")}
//             className="px-8 py-4 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
//           >
//             Continue Shopping
//           </button>
//         </div>

//         {/* Thank You Message */}
//         <div className={`mt-12 text-center max-w-2xl transform transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 shadow-lg">
//             <h3 className="text-2xl font-bold text-gray-800 mb-3">Thank You for Your Purchase!</h3>
//             <p className="text-gray-600 leading-relaxed">
//               We appreciate your business and trust in our service. You will receive an email confirmation shortly with your order details and tracking information once your order ships.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Home, ShoppingBag, Calendar, CreditCard } from "lucide-react";

export default function PaymentSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkmarkDraw, setCheckmarkDraw] = useState(false);

  useEffect(() => {
    // Sequence animations
    const timer1 = setTimeout(() => setShowSuccess(true), 300);
    const timer2 = setTimeout(() => setCheckmarkDraw(true), 800);
    const timer3 = setTimeout(() => setAnimate(true), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Mock order data - replace with actual API call if needed
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    total: 299.99,
    paymentMethod: "Card Payment",
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div
          className={`bg-white border border-slate-200 rounded-2xl shadow-sm w-full max-w-2xl p-8 md:p-12 transform transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Animated Circle Background */}
              <div 
                className={`w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center transition-all duration-500 ${
                  showSuccess ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                {/* Animated Checkmark */}
                <svg
                  className="w-14 h-14"
                  viewBox="0 0 52 52"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="transition-all duration-700 ease-out"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    style={{
                      strokeDasharray: checkmarkDraw ? "166" : "0",
                      strokeDashoffset: "0",
                    }}
                  />
                  <path
                    className="transition-all duration-500 ease-out"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l7 7 16-16"
                    style={{
                      strokeDasharray: checkmarkDraw ? "48" : "0",
                      strokeDashoffset: "0",
                      transitionDelay: "0.3s",
                    }}
                  />
                </svg>
              </div>
              
              {/* Ripple Effect */}
              <div 
                className={`absolute inset-0 w-24 h-24 bg-emerald-100 rounded-full transition-all duration-1000 ${
                  checkmarkDraw ? "animate-ping opacity-20" : "opacity-0"
                }`}
              ></div>
              
              {/* Outer Ripple */}
              <div 
                className={`absolute inset-0 w-24 h-24 bg-emerald-200 rounded-full transition-all duration-1000 delay-200 ${
                  checkmarkDraw ? "animate-ping opacity-10" : "opacity-0"
                }`}
              ></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-10">
            <h1 className={`text-4xl md:text-5xl font-serif font-light text-slate-900 mb-4 tracking-tight transition-all duration-700 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Payment Successful
            </h1>
            <div className={`h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-md mx-auto mb-6 transition-all duration-700 delay-100 ${
              animate ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}></div>
            <p className={`text-slate-600 text-base transition-all duration-700 delay-200 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              Thank you for your order! Your payment has been processed successfully.
            </p>
          </div>

          {/* Order Details */}
          <div className={`space-y-4 mb-8 transition-all duration-700 delay-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <Package className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Order Number
                    </p>
                    <p className="text-slate-900 font-medium">#{order.id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <Calendar className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Order Date
                    </p>
                    <p className="text-slate-900 font-medium">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <CreditCard className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Payment Method
                    </p>
                    <p className="text-slate-900 font-medium">{order.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <Truck className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Estimated Delivery
                    </p>
                    <p className="text-slate-900 font-medium">{order.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-700 text-base font-medium">Total Amount Paid:</span>
                <span className="text-3xl font-semibold text-slate-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className={`bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 transition-all duration-700 delay-400 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex items-start gap-3">
              <Truck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-medium text-emerald-900 mb-1">
                  Your order is being processed
                </h3>
                <p className="text-sm text-emerald-700">
                  We'll send you a confirmation email with tracking details once your order ships.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <button
              onClick={() => navigate("/orders")}
              className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              View Orders
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3.5 bg-white text-slate-700 rounded-xl font-medium hover:bg-slate-50 border border-slate-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>

          {/* Continue Shopping */}
          <div className={`text-center mt-6 transition-all duration-700 delay-600 ${
            animate ? "opacity-100" : "opacity-0"
          }`}>
            <button
              onClick={() => navigate("/products")}
              className="text-slate-600 hover:text-slate-900 text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`mt-8 text-center max-w-2xl transition-all duration-700 delay-700 ${
          animate ? "opacity-100" : "opacity-0"
        }`}>
          <p className="text-slate-600 text-sm">
            Questions about your order? Contact our support team at{" "}
            <a href="mailto:support@example.com" className="text-slate-900 font-medium hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}