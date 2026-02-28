



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../Api/Axios_Instance";
// import { 
//   CheckCircle, 
//   Package, 
//   Truck, 
//   Home, 
//   ShoppingBag, 
//   Calendar, 
//   CreditCard, 
//   Mail, 
//   Phone, 
//   MapPin,
//   Download,
//   Share2,
//   Shield,
//   Sparkles,
//   Clock,
//   ChevronRight,
//   Star,
//   Gift,
//   Trophy,
//   Zap
// } from "lucide-react";

// export default function PaymentSuccess() {
//   const { orderId } = useParams();
//   const validOrderId = Number(orderId);

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [animate, setAnimate] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [checkmarkDraw, setCheckmarkDraw] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);

//   useEffect(() => {
//     // Sequence animations
//     const timer1 = setTimeout(() => setShowSuccess(true), 300);
//     const timer2 = setTimeout(() => setCheckmarkDraw(true), 800);
//     const timer3 = setTimeout(() => setAnimate(true), 1200);
//     const timer4 = setTimeout(() => setShowConfetti(true), 500);
    
//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//       clearTimeout(timer4);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const validId = Number(orderId);

//         if (!validId || isNaN(validId)) {
//           console.error("Invalid orderId:", orderId);
//           setLoading(false);
//           return;
//         }

//         const res = await api.get(`/order/${validId}`);
//         setOrder(res.data.data);
//         console.log("ORDER FROM API:", res.data.data);
//       } catch (err) {
//         console.error("Failed to fetch order", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   if (loading || !order) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center mb-4">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin"></div>
//               <ShoppingBag className="w-8 h-8 absolute inset-0 m-auto text-emerald-400" />
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent">
//             Loading your order details...
//           </h2>
//           <p className="text-gray-500 mt-2">Preparing your receipt</p>
//         </div>
//       </div>
//     );
//   }

//   // Calculate estimated delivery (3-7 days from now)
//   const orderDate = order.OrderDate ? new Date(order.OrderDate) : new Date();
//   const estimatedDelivery = new Date(orderDate);
//   estimatedDelivery.setDate(estimatedDelivery.getDate() + Math.floor(Math.random() * 5) + 3);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Confetti Effect */}
//       {showConfetti && (
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full animate-confetti"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 2}s`,
//                 animationDuration: `${Math.random() * 3 + 2}s`,
//                 opacity: Math.random() * 0.5 + 0.5,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <div className="relative flex flex-col items-center justify-center py-16 px-4">
//         {/* Success Card */}
//         <div
//           className={`bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl shadow-emerald-500/10 w-full max-w-4xl p-8 md:p-12 transform transition-all duration-1000 ${
//             animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//           }`}
//         >
//           {/* Header with Success Icon */}
//           <div className="flex flex-col items-center mb-10">
//             <div className="relative mb-6">
//               {/* Glow Effect */}
//               <div className="absolute inset-0 w-32 h-32 bg-emerald-500/30 blur-2xl rounded-full"></div>
              
//               {/* Animated Circle */}
//               <div 
//                 className={`relative w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center transition-all duration-700 ${
//                   showSuccess ? "scale-100 opacity-100" : "scale-0 opacity-0"
//                 }`}
//                 style={{
//                   boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
//                   border: '1px solid rgba(16, 185, 129, 0.2)'
//                 }}
//               >
//                 {/* Checkmark Animation */}
//                 <svg
//                   className="w-20 h-20"
//                   viewBox="0 0 52 52"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle
//                     className="transition-all duration-1000 ease-out"
//                     cx="26"
//                     cy="26"
//                     r="25"
//                     fill="none"
//                     stroke="url(#gradient)"
//                     strokeWidth="2"
//                     style={{
//                       strokeDasharray: checkmarkDraw ? "166" : "0",
//                       strokeDashoffset: "0",
//                     }}
//                   />
//                   <defs>
//                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                       <stop offset="0%" stopColor="#10b981" />
//                       <stop offset="100%" stopColor="#34d399" />
//                     </linearGradient>
//                   </defs>
//                   <path
//                     className="transition-all duration-700 ease-out"
//                     fill="none"
//                     stroke="url(#gradient)"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14 27l7 7 16-16"
//                     style={{
//                       strokeDasharray: checkmarkDraw ? "48" : "0",
//                       strokeDashoffset: "0",
//                       transitionDelay: "0.3s",
//                     }}
//                   />
//                 </svg>
                
//                 {/* Floating Sparkles */}
//                 <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
//                 <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-blue-400 animate-pulse animation-delay-1000" />
//               </div>
//             </div>

//             {/* Success Message */}
//             <div className="text-center mb-6">
//               <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4 transition-all duration-700 ${
//                 animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//               }`}>
//                 Payment Successful!
//               </h1>
//               <div className={`h-1 w-32 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto mb-6 rounded-full transition-all duration-700 delay-100 ${
//                 animate ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
//               }`}></div>
//               <p className={`text-gray-400 text-lg transition-all duration-700 delay-200 ${
//                 animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//               }`}>
//                 Thank you for your purchase! Your order is confirmed.
//               </p>
//             </div>
//           </div>

//           {/* Order Summary Card */}
//           <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8 transition-all duration-700 delay-300 ${
//             animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
//                 <div className="relative bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-2 rounded-lg">
//                   <Package className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 Order Summary
//               </h2>
//               <div className="flex gap-2">
//                 <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/50">
//                   <Download className="w-5 h-5" />
//                 </button>
//                 <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/50">
//                   <Share2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {/* Order Number */}
//               <div className="group space-y-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
//                 <div className="flex items-center gap-3">
//                   <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2.5 rounded-lg border border-gray-700/50">
//                     <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                     <Package className="w-4 h-4 text-emerald-400 relative z-10" />
//                   </div>
//                   <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Order Number
//                   </span>
//                 </div>
//                 <p className="text-lg font-semibold text-gray-200">
//                   #{order?.Id ?? order?.id ?? orderId}
//                 </p>
//               </div>

//               {/* Order Date */}
//               <div className="group space-y-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
//                 <div className="flex items-center gap-3">
//                   <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2.5 rounded-lg border border-gray-700/50">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                     <Calendar className="w-4 h-4 text-blue-400 relative z-10" />
//                   </div>
//                   <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Order Date
//                   </span>
//                 </div>
//                 <p className="text-lg font-semibold text-gray-200">
//                   {order.OrderDate
//                     ? new Date(order.OrderDate).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })
//                     : new Date().toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                 </p>
//               </div>

//               {/* Payment Method */}
//               <div className="group space-y-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
//                 <div className="flex items-center gap-3">
//                   <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2.5 rounded-lg border border-gray-700/50">
//                     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                     <CreditCard className="w-4 h-4 text-purple-400 relative z-10" />
//                   </div>
//                   <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Payment Method
//                   </span>
//                 </div>
//                 <p className="text-lg font-semibold text-gray-200">
// {order.PaymentMode === "COD" ? "Cash on Delivery" : "Online Payment"}
//                 </p>
//               </div>

//               {/* Estimated Delivery */}
//               <div className="group space-y-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300">
//                 <div className="flex items-center gap-3">
//                   <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2.5 rounded-lg border border-gray-700/50">
//                     <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                     <Clock className="w-4 h-4 text-yellow-400 relative z-10" />
//                   </div>
//                   <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
//                     Delivery Est.
//                   </span>
//                 </div>
//                 <p className="text-lg font-semibold text-emerald-400">
//                   {estimatedDelivery.toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Amount Card */}
//           <div className={`group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-6 mb-8 transition-all duration-700 delay-400 hover:shadow-xl hover:shadow-emerald-500/10 ${
//             animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}>
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//             <div className="relative flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div>
//                 <p className="text-gray-400 text-sm font-medium mb-1">Total Amount Paid</p>
//                 <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
//                   ${Number(order?.TotalAmount ?? order?.totalAmount ?? order?.amount ?? 0).toFixed(2)}
//                 </p>
//               </div>
//               <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 px-4 py-2 rounded-xl">
//                 <Shield className="w-5 h-5 text-emerald-400" />
//                 <span className="text-emerald-400 text-sm font-medium">Payment Secured & Encrypted</span>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Info & Actions */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//             {/* Shipping Status */}
//             <div className={`group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 transition-all duration-700 delay-500 hover:shadow-lg hover:shadow-emerald-500/10 ${
//               animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//             }`}>
//               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="relative flex items-start gap-4">
//                 <div className="relative bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-3 rounded-xl">
//                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-500/30 blur-xl opacity-50"></div>
//                   <Truck className="w-6 h-6 text-emerald-400 relative z-10" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-emerald-300 mb-2">
//                     Order Status: Processing
//                   </h3>
//                   <p className="text-emerald-400/80 mb-4">
//                     Your order is being prepared for shipment. We'll notify you when it's on the way!
//                   </p>
//                   <div className="flex items-center gap-2 text-sm text-emerald-400">
//                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//                     <span>Real-time tracking available soon</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Customer Support */}
//             <div className={`group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 transition-all duration-700 delay-600 hover:shadow-lg hover:shadow-blue-500/10 ${
//               animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//             }`}>
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <h3 className="text-lg font-semibold text-blue-300 mb-4 relative">Need Help?</h3>
//               <div className="space-y-3 relative">
//                 <div className="flex items-center gap-3">
//                   <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-2 rounded-lg">
//                     <Mail className="w-4 h-4 text-blue-400" />
//                   </div>
//                   <span className="text-blue-300">support@sportex.com</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-2 rounded-lg">
//                     <Phone className="w-4 h-4 text-blue-400" />
//                   </div>
//                   <span className="text-blue-300">1-800-123-4567</span>
//                 </div>
//                 <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1 transition-colors group">
//                   View FAQ 
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-700 ${
//             animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}>
//             <button
//               onClick={() => navigate("/orders")}
//               className="group relative overflow-hidden py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex items-center justify-center gap-3 border border-gray-700/50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//               <Package className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
//               <span className="relative z-10">View All Orders</span>
//             </button>
            
//             <button
//               onClick={() => navigate("/")}
//               className="group relative overflow-hidden py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex items-center justify-center gap-3 border border-gray-700/50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//               <Home className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
//               <span className="relative z-10">Back to Home</span>
//             </button>
            
//             <button
//               onClick={() => navigate("/")}
//               className="group relative overflow-hidden py-4 px-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-3"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//               <ShoppingBag className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
//               <span className="relative z-10">Continue Shopping</span>
//             </button>
//           </div>

//           {/* Quick Links */}
//           <div className={`mt-8 pt-8 border-t border-gray-700/50 transition-all duration-700 delay-800 ${
//             animate ? "opacity-100" : "opacity-0"
//           }`}>
//             <p className="text-gray-400 text-center text-sm mb-4">
//               What would you like to do next?
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <button className="text-gray-400 hover:text-gray-200 text-sm font-medium px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/50">
//                 Track Order
//               </button>
//               <button className="text-gray-400 hover:text-gray-200 text-sm font-medium px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/50">
//                 Download Invoice
//               </button>
//               <button className="text-gray-400 hover:text-gray-200 text-sm font-medium px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/50">
//                 Write a Review
//               </button>
//               <button className="text-gray-400 hover:text-gray-200 text-sm font-medium px-4 py-2 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700/50">
//                 Contact Support
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Note */}
//         <div className={`mt-8 text-center max-w-2xl transition-all duration-700 delay-900 ${
//           animate ? "opacity-100" : "opacity-0"
//         }`}>
//           <p className="text-gray-500 text-sm">
//             A confirmation email has been sent to your registered email address.
//             You'll receive another email with tracking information once your order ships.
//           </p>
//           <div className="flex items-center justify-center gap-6 mt-4">
//             <div className="flex items-center gap-2 text-gray-500 text-sm">
//               <Trophy className="w-4 h-4 text-yellow-500" />
//               Premium Service
//             </div>
//             <div className="flex items-center gap-2 text-gray-500 text-sm">
//               <Zap className="w-4 h-4 text-blue-500" />
//               Fast Processing
//             </div>
//             <div className="flex items-center gap-2 text-gray-500 text-sm">
//               <Gift className="w-4 h-4 text-emerald-500" />
//               Loyalty Rewards
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add CSS for animations */}
//       <style jsx>{`
//         @keyframes confetti {
//           0% {
//             transform: translateY(-100px) rotate(0deg);
//           }
//           100% {
//             transform: translateY(100vh) rotate(360deg);
//           }
//         }
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-confetti {
//           animation: confetti linear infinite;
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }










import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Home, 
  ShoppingBag, 
  Calendar, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin,
  Download,
  Share2,
  Shield,
  Sparkles,
  Clock,
  ChevronRight,
  Star,
  Gift,
  Trophy,
  Zap
} from "lucide-react";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const { orderId } = useParams();
  const validOrderId = Number(orderId);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkmarkDraw, setCheckmarkDraw] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSuccess(true), 300);
    const timer2 = setTimeout(() => setCheckmarkDraw(true), 800);
    const timer3 = setTimeout(() => setAnimate(true), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const validId = Number(orderId);

        if (!validId || isNaN(validId)) {
          console.error("Invalid orderId:", orderId);
          setLoading(false);
          return;
        }

        const res = await api.get(`/order/${validId}`);
        setOrder(res.data.data);
        console.log("ORDER FROM API:", res.data.data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap');
          .font-ilu { font-family: 'Barlow Condensed', sans-serif; }
        `}</style>
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-16 h-16 border border-[#333] flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-xl font-ilu font-bold text-white uppercase tracking-wider mb-2">
            Loading Order Details...
          </h2>
          <p className="text-[#666] text-xs uppercase tracking-widest">Preparing your receipt</p>
        </div>
      </div>
    );
  }

  const orderDate = order.OrderDate ? new Date(order.OrderDate) : new Date();
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + Math.floor(Math.random() * 5) + 3);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap');
        .font-ilu { font-family: 'Barlow Condensed', sans-serif; }
      `}</style>
      
      <div className="relative flex flex-col items-center justify-center py-12 sm:py-16 px-4">
        {/* Success Card */}
        <div
          className={`border border-[#222] w-full max-w-4xl p-6 sm:p-8 md:p-12 transform transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header with Success Icon */}
          <div className="flex flex-col items-center mb-8 sm:mb-10">
            <div className="relative mb-4 sm:mb-6">
              <div 
                className={`relative w-24 h-24 sm:w-32 sm:h-32 border-2 border-white flex items-center justify-center transition-all duration-700 ${
                  showSuccess ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  viewBox="0 0 52 52"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="50"
                    height="50"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    style={{
                      strokeDasharray: checkmarkDraw ? "200" : "0",
                      transition: "stroke-dasharray 1s ease-out"
                    }}
                  />
                  <path
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M14 27l7 7 16-16"
                    style={{
                      strokeDasharray: checkmarkDraw ? "48" : "0",
                      strokeDashoffset: "0",
                      transition: "stroke-dasharray 0.5s ease-out 0.3s"
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-4 sm:mb-6">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-ilu font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 transition-all duration-700 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                Payment Successful
              </h1>
              <div className={`h-px w-24 sm:w-32 bg-white mx-auto mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
                animate ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}></div>
              <p className={`text-[#666] text-sm sm:text-base uppercase tracking-widest transition-all duration-700 delay-200 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                Thank you for your purchase
              </p>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className={`border border-[#222] p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-700 delay-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h2 className="text-lg sm:text-xl font-ilu font-bold text-white uppercase tracking-wider flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#333] flex items-center justify-center">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
                </div>
                Order Summary
              </h2>
              <div className="flex gap-2">
                <button className="p-2 border border-[#333] text-[#666] hover:text-white hover:border-[#555] transition-colors">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                </button>
                <button className="p-2 border border-[#333] text-[#666] hover:text-white hover:border-[#555] transition-colors">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 sm:gap-6">
              {/* Order Number */}
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 border border-[#222] hover:border-[#444] transition-all">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#333] flex items-center justify-center">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-ilu uppercase tracking-widest text-[#666]">
                    Order Number
                  </span>
                </div>
                <p className="text-base sm:text-lg font-ilu font-bold text-white uppercase tracking-wider">
                  #{order?.Id ?? order?.id ?? orderId}
                </p>
              </div>

              {/* Order Date */}
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 border border-[#222] hover:border-[#444] transition-all">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#333] flex items-center justify-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-ilu uppercase tracking-widest text-[#666]">
                    Order Date
                  </span>
                </div>
                <p className="text-base sm:text-lg font-ilu font-bold text-white">
                  {order.OrderDate
                    ? new Date(order.OrderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </p>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 border border-[#222] hover:border-[#444] transition-all">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#333] flex items-center justify-center">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-ilu uppercase tracking-widest text-[#666]">
                    Payment
                  </span>
                </div>
                <p className="text-base sm:text-lg font-ilu font-bold text-white">
                  {order.PaymentMode === "COD" ? "Cash on Delivery" : "Online Payment"}
                </p>
              </div>

              {/* Estimated Delivery */}
              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 border border-[#222] hover:border-[#444] transition-all col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#333] flex items-center justify-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-ilu uppercase tracking-widest text-[#666]">
                    Delivery Est.
                  </span>
                </div>
                <p className="text-base sm:text-lg font-ilu font-bold text-white">
                  {estimatedDelivery.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Amount Card */}
          <div className={`border border-[#222] p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-700 delay-400 hover:border-[#444] ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-[#666] text-xs sm:text-sm font-ilu uppercase tracking-widest mb-1">Total Amount Paid</p>
                <p className="text-3xl sm:text-4xl font-ilu font-bold text-white uppercase tracking-wider">
                  ${Number(order?.TotalAmount ?? order?.totalAmount ?? order?.amount ?? 0).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 border border-[#333] px-3 sm:px-4 py-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
                <span className="text-white text-xs sm:text-sm font-ilu uppercase tracking-widest">Secured</span>
              </div>
            </div>
          </div>

          {/* Shipping Info & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* Shipping Status */}
            <div className={`border border-[#333] p-4 sm:p-6 transition-all duration-700 delay-500 hover:border-[#555] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#444] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-ilu font-bold text-white uppercase tracking-wider mb-2">
                    Order Status: Processing
                  </h3>
                  <p className="text-[#999] text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                    Your order is being prepared for shipment
                  </p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#666]">
                    <div className="w-1.5 h-1.5 bg-white animate-pulse"></div>
                    <span>Real-time tracking available soon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className={`border border-[#333] p-4 sm:p-6 transition-all duration-700 delay-600 hover:border-[#555] ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <h3 className="text-base sm:text-lg font-ilu font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">Need Help?</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 border border-[#444] flex items-center justify-center">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-[#999] text-xs sm:text-sm uppercase tracking-wider">support@sportex.com</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 border border-[#444] flex items-center justify-center">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-[#999] text-xs sm:text-sm uppercase tracking-wider">1-800-123-4567</span>
                </div>
                <button className="mt-2 sm:mt-4 text-white text-xs sm:text-sm font-ilu uppercase tracking-widest inline-flex items-center gap-1 hover:underline">
                  View FAQ 
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 transition-all duration-700 delay-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <button
              onClick={() => navigate("/orders")}
              className="py-3 sm:py-4 px-4 sm:px-6 border border-[#333] text-white font-ilu font-semibold uppercase tracking-widest text-xs hover:border-[#555] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              View All Orders
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="py-3 sm:py-4 px-4 sm:px-6 border border-[#333] text-[#999] font-ilu font-semibold uppercase tracking-widest text-xs hover:border-[#555] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              Back to Home
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="py-3 sm:py-4 px-4 sm:px-6 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-xs hover:bg-[#ddd] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              Continue Shopping
            </button>
          </div>

          {/* Quick Links */}
          <div className={`mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#222] transition-all duration-700 delay-800 ${
            animate ? "opacity-100" : "opacity-0"
          }`}>
            <p className="text-[#666] text-center text-xs sm:text-sm uppercase tracking-widest mb-4">
              What would you like to do next?
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <button className="text-[#666] hover:text-white text-xs uppercase tracking-widest px-3 sm:px-4 py-2 border border-[#333] hover:border-[#555] transition-colors">
                Track Order
              </button>
              <button className="text-[#666] hover:text-white text-xs uppercase tracking-widest px-3 sm:px-4 py-2 border border-[#333] hover:border-[#555] transition-colors">
                Download Invoice
              </button>
              <button className="text-[#666] hover:text-white text-xs uppercase tracking-widest px-3 sm:px-4 py-2 border border-[#333] hover:border-[#555] transition-colors">
                Write a Review
              </button>
              <button className="text-[#666] hover:text-white text-xs uppercase tracking-widest px-3 sm:px-4 py-2 border border-[#333] hover:border-[#555] transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className={`mt-6 sm:mt-8 text-center max-w-2xl px-4 transition-all duration-700 delay-900 ${
          animate ? "opacity-100" : "opacity-0"
        }`}>
          <p className="text-[#444] text-xs sm:text-sm uppercase tracking-widest">
            A confirmation email has been sent to your registered email address.
            You'll receive tracking information once your order ships.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
            <div className="flex items-center gap-2 text-[#555] text-xs uppercase tracking-widest">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
              Premium Service
            </div>
            <div className="flex items-center gap-2 text-[#555] text-xs uppercase tracking-widest">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
              Fast Processing
            </div>
            <div className="flex items-center gap-2 text-[#555] text-xs uppercase tracking-widest">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
              Loyalty Rewards
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}