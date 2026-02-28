
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../Api/Axios_Instance.jsx";
// import { 
//   Package, Calendar, CreditCard, Truck, ShoppingBag, 
//   RefreshCw, Eye, ChevronDown, ChevronUp, CheckCircle, 
//   Clock, MapPin, DollarSign, User, Mail, Hash, 
//   TrendingUp, ExternalLink, Filter, Search, AlertCircle,
//   Loader2, Receipt, CheckCheck, XCircle, TruckIcon
// } from "lucide-react";

// const Orders = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const location = useLocation();

//   const statusOptions = [
//     { value: "all", label: "All Orders", icon: <Package size={16} /> },
//     { value: "Pending", label: "Pending", icon: <Clock size={16} /> },
//     { value: "Processing", label: "Processing", icon: <Loader2 size={16} /> },
//     { value: "Shipped", label: "Shipped", icon: <TruckIcon size={16} /> },
//     { value: "Delivered", label: "Delivered", icon: <CheckCheck size={16} /> },
//     { value: "Cancelled", label: "Cancelled", icon: <XCircle size={16} /> }
//   ];
 

//   const fetchUserOrders = async () => {
//     if (!user) {
//       setLoading(false);
//       setError("Please login to view your orders.");
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("Fetching orders for user...");
      
//       const res = await api.get("/order/myorders");
//       console.log("Orders API Response:", res.data);

//       // Your API returns: { statusCode: 200, message: 'My orders', data: [...] }
//       // NOT: { success: true, data: [...] }
      
//       if (!res.data) {
//         throw new Error("No response from server");
//       }

//       if (res.data.statusCode !== 200) {
//         throw new Error(res.data.message || "Failed to load orders");
//       }

//       if (!res.data.data || !Array.isArray(res.data.data)) {
//         setOrders([]);
//         setError(null);
//         return;
//       }

//       // Transform data to match your backend structure
//       const normalizeStatus = (status) => {
//   if (!status) return "Pending";
//   const s = status.toString().toLowerCase();
//   return s.charAt(0).toUpperCase() + s.slice(1);
// };

// const transformedOrders = res.data.data.map(order => ({
//   Id: order.id || order.Id,
//   UserId: order.userId || order.UserId,
//   UserName: user.name || "User",
//   UserEmail: user.email || "No email",
//   TotalAmount: order.totalAmount || 0,
//   Status: normalizeStatus(order.status || order.Status),
//   OrderDate: order.createdAt || order.orderDate,
//   IsPaid: order.isPaid || false,
//   ShippingAddress: order.shippingAddress || "Address not available",
//   Items: order.items || []
// }));


//       // Sort by date (newest first)
//       const sorted = transformedOrders.sort((a, b) => {
//         const dateA = new Date(a.OrderDate).getTime();
//         const dateB = new Date(b.OrderDate).getTime();
//         return dateB - dateA;
//       });

//       setOrders(sorted);
//       setError(null);
      
//       if (sorted.length > 0) {
//         toast.success(`Loaded ${sorted.length} orders`);
//       }
      
//     } catch (e) {
//       console.error("Orders fetch error details:", {
//         message: e.message,
//         response: e.response?.data,
//         status: e.response?.status
//       });
      
//       // Check if it's an actual error or just the API message
//       if (e.message === "My orders") {
//         // This is actually a success - just the message from API
//         setOrders([]);
//         setError(null);
//       } else {
//         const errorMessage = e.response?.data?.message || e.message || "Failed to load your orders";
//         setError(errorMessage);
//         toast.error(errorMessage);
//         setOrders([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//  useEffect(() => {
//   if (user) {
//     fetchUserOrders();
//   }
// }, [user, location.pathname]);


//   const getStatusBadge = (status) => {
//     const statusStr = (status || "").toLowerCase();
//     switch (statusStr) {
//       case "pending":
//         return "bg-amber-500/10 text-amber-400 border-amber-500/30";
//       case "processing":
//         return "bg-blue-500/10 text-blue-400 border-blue-500/30";
//       case "shipped":
//         return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
//       case "delivered":
//         return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
//       case "cancelled":
//       case "canceled":
//         return "bg-rose-500/10 text-rose-400 border-rose-500/30";
//       default:
//         return "bg-gray-500/10 text-gray-400 border-gray-500/30";
//     }
//   };

//   const getStatusIcon = (status) => {
//     const statusStr = (status || "").toLowerCase();
//     switch (statusStr) {
//       case "pending":
//         return <Clock size={16} className="text-amber-400" />;
//       case "processing":
//         return <Loader2 size={16} className="text-blue-400" />;
//       case "shipped":
//         return <TruckIcon size={16} className="text-indigo-400" />;
//       case "delivered":
//         return <CheckCircle size={16} className="text-emerald-400" />;
//       case "cancelled":
//       case "canceled":
//         return <XCircle size={16} className="text-rose-400" />;
//       default:
//         return <Package size={16} className="text-gray-400" />;
//     }
//   };

//   const refreshOrders = async () => {
//     setRefreshing(true);
//     try {
//       await fetchUserOrders();
//     } catch {
//       toast.error("Failed to refresh orders");
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const toggleOrderExpansion = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = searchTerm === "" || 
//       (order.Id?.toString() || "").includes(searchTerm) ||
//       (order.TotalAmount?.toString() || "").includes(searchTerm) ||
//       (order.ShippingAddress || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (order.Status || "").toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === "all" || 
//       (order.Status || "").toLowerCase() === statusFilter.toLowerCase();
    
//     return matchesSearch && matchesStatus;
//   });

//   const getTotalOrdersValue = () => {
//     return orders.reduce((total, order) => total + (Number(order.TotalAmount || 0)), 0);
//   };

//   const formatOrderDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return "Date unavailable";
//     }
//   };

//   const handleViewOrderDetails = (orderId) => {
//     navigate(`/payment-success/${orderId}`, {
//       state: { 
//         fromOrders: true,
//         orderId: orderId 
//       }
//     });
//   };
//   const handleCancelOrder = async (orderId) => {
//   if (!window.confirm("Are you sure you want to cancel this order?")) return;

//   try {
//     await api.patch(`/order/Cancel/${orderId}`);

//     toast.success("Order cancelled successfully");

//     // Update UI immediately
//     setOrders(prev =>
//       prev.map(o =>
//         o.Id === orderId
//           ? { ...o, Status: "Cancelled" }
//           : o
//       )
//     );
//   } catch (error) {
//     console.error("Cancel order failed:", error);
//     toast.error(
//       error.response?.data?.message || "Failed to cancel order"
//     );
//   }
// };


//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
//         <div className="text-center bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-12 max-w-md">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
//             <Package className="w-10 h-10 absolute inset-0 m-auto text-purple-500" />
//           </div>
//           <h3 className="text-2xl font-light text-white mb-3">Loading Orders</h3>
//           <p className="text-gray-400">Fetching your order history...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
//         <div className="text-center bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-12 max-w-md">
//           <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//             <AlertCircle className="w-10 h-10 text-rose-400" />
//           </div>
//           <h3 className="text-2xl font-light text-white mb-3">Unable to Load Orders</h3>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <p className="text-gray-500 text-sm mb-6">Please check your connection and try again</p>
//           <button
//             onClick={refreshOrders}
//             className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
//           >
//             <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         {/* Header Section */}
//         <div className="mb-8 lg:mb-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//             <div>
//               <div className="inline-flex items-center gap-3 mb-4">
//                 <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg">
//                   <Receipt className="w-6 h-6 text-white" />
//                 </div>
//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
//                   Order <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">History</span>
//                 </h1>
//               </div>
//               <p className="text-gray-400 text-lg max-w-2xl">
//                 Track and manage all your orders in one place
//               </p>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={refreshOrders}
//                 disabled={refreshing}
//                 className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
//               >
//                 <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
//                 {refreshing ? 'Refreshing...' : 'Refresh'}
//               </button>
              
//               <button
//                 onClick={() => navigate("/more-products")}
//                 className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl"
//               >
//                 <ShoppingBag className="w-5 h-5" />
//                 Shop Now
//               </button>
//             </div>
//           </div>

//           {/* Stats Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl">
//                   <Receipt className="w-6 h-6 text-purple-400" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-400">Total Orders</span>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-2">{orders.length}</h3>
//               <p className="text-sm text-gray-400">All your orders</p>
//             </div>
            
//             <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-xl">
//                   <DollarSign className="w-6 h-6 text-emerald-400" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-400">Total Spent</span>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-2">${getTotalOrdersValue().toFixed(2)}</h3>
//               <p className="text-sm text-gray-400">Total amount spent</p>
//             </div>
            
//             <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-3 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl">
//                   <Truck className="w-6 h-6 text-amber-400" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-400">In Progress</span>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-2">
//                 {orders.filter(o => ["Pending", "Processing", "Shipped"].includes(o.Status)).length}
//               </h3>
//               <p className="text-sm text-gray-400">Active orders</p>
//             </div>
//           </div>

//           {/* Filters and Search */}
//           <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
//                   <input
//                     type="text"
//                     placeholder="Search by order ID, amount, or status..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <Filter className="w-5 h-5 text-gray-400" />
//                   <span className="text-sm text-gray-400">Filter:</span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {statusOptions.map((option) => (
//                     <button
//                       key={option.value}
//                       onClick={() => setStatusFilter(option.value)}
//                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
//                         statusFilter === option.value
//                           ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
//                           : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
//                       }`}
//                     >
//                       {option.icon}
//                       {option.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Orders Content */}
//         {filteredOrders.length === 0 ? (
//           <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-12">
//             <div className="text-center py-16">
//               <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
//                 <Package className="w-12 h-12 text-gray-500" />
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-4">No Orders Found</h3>
//               <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
//                 {searchTerm || statusFilter !== "all" 
//                   ? "No orders match your search criteria" 
//                   : "You haven't placed any orders yet. Start shopping now!"}
//               </p>
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setStatusFilter("all");
//                   navigate("/more-products");
//                 }}
//                 className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-base rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
//               >
//                 <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 {searchTerm || statusFilter !== "all" ? "Clear Filters" : "Start Shopping"}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredOrders.map((order, index) => (
//               <div 
//                 key={order.Id || index} 
//                 className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 group"
//               >
//                 <div 
//                   className="p-6 lg:p-8 cursor-pointer hover:bg-gray-800/20 transition-colors duration-200"
//                   onClick={() => toggleOrderExpansion(order.Id)}
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                     {/* Order Details */}
//                     <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                       {/* Order ID & Date */}
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-2">
//                           <Hash className="w-4 h-4 text-gray-500" />
//                           <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</p>
//                         </div>
//                         <div className="space-y-2">
//                           <p className="text-lg font-bold text-white">#{order.Id || "N/A"}</p>
//                           <div className="flex items-center gap-2 text-gray-400">
//                             <Calendar className="w-4 h-4" />
//                             <span className="text-sm">{formatOrderDate(order.OrderDate)}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Total Amount */}
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-2">
//                           <DollarSign className="w-4 h-4 text-gray-500" />
//                           <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Amount</p>
//                         </div>
//                         <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
//                           ${Number(order.TotalAmount || 0).toFixed(2)}
//                         </p>
//                       </div>

//                       {/* Status */}
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-2">
//                           {getStatusIcon(order.Status)}
//                           <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</p>
//                         </div>
//                         <div className="inline-flex">
//                           <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border ${getStatusBadge(order.Status)}`}>
//                             {getStatusIcon(order.Status)}
//                             {order.Status || "Unknown"}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Payment Status */}
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-2">
//                           <CreditCard className="w-4 h-4 text-gray-500" />
//                           <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</p>
//                         </div>
//                         <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${order.IsPaid ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
//                           {order.IsPaid ? 'Paid ✓' : 'Pending'}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                    {/* Actions */}
// <div className="flex items-center gap-4">
//   {/* VIEW DETAILS */}
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       handleViewOrderDetails(order.Id);
//     }}
//     className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 flex items-center gap-2"
//   >
//     <Eye className="w-4 h-4" />
//     View Details
//     <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
//   </button>

//   {/* CANCEL ORDER — ONLY IF PENDING */}
// {["Pending", "Processing"].includes(order.Status) && (
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         handleCancelOrder(order.Id);
//       }}
//       className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-red-500/30 flex items-center gap-2"
//     >
//       Cancel Order
//     </button>
//   )}

//   {/* EXPAND ICON */}
//   <div className="text-gray-500 group-hover:text-gray-400 transition-colors">
//     {expandedOrder === order.Id ? (
//       <ChevronUp className="w-6 h-6" />
//     ) : (
//       <ChevronDown className="w-6 h-6" />
//     )}
//   </div>
// </div>

//                   </div>
//                 </div>

//                 {/* Expanded Order Items */}
//                 {expandedOrder === order.Id && (
//                   <div className="border-t border-gray-700/50 bg-gray-900/30 p-6 lg:p-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                       {/* Order Items */}
//                       <div className="lg:col-span-2">
//                         <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
//                           <div className="p-2 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg">
//                             <Package className="w-5 h-5 text-purple-400" />
//                           </div>
//                           Order Items ({order.Items?.length || 0})
//                         </h4>
                        
//                         {order.Items && order.Items.length > 0 ? (
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {order.Items.map((item, itemIndex) => (
//                               <div 
//                                 key={itemIndex} 
//                                 className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
//                               >
//                                 <div className="flex items-center gap-4">
//                                   <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700/50">
//                                     {item.imageUrl || item.ImageUrl ? (
//                                       <img
//                                         src={item.imageUrl || item.ImageUrl}
//                                         alt={item.productName || item.ProductName || "Product"}
//                                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                         onError={(e) => {
//                                           e.target.style.display = 'none';
//                                         }}
//                                       />
//                                     ) : (
//                                       <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//                                         <Package className="w-8 h-8 text-gray-600" />
//                                       </div>
//                                     )}
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <h5 className="font-semibold text-white truncate mb-2">
//                                       {item.productName || item.ProductName || "Product"}
//                                     </h5>
//                                     <div className="space-y-2">
//                                       <div className="flex items-center justify-between">
//                                         <span className="text-sm text-gray-400">Quantity</span>
//                                         <span className="font-medium text-white">{item.quantity || item.Quantity || 1}</span>
//                                       </div>
//                                       <div className="flex items-center justify-between">
//                                         <span className="text-sm text-gray-400">Unit Price</span>
//                                         <span className="font-medium text-emerald-400">
//                                           ${Number(item.unitPrice || item.UnitPrice || 0).toFixed(2)}
//                                         </span>
//                                       </div>
//                                       <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
//                                         <span className="text-sm font-medium text-gray-400">Item Total</span>
//                                         <span className="font-bold text-white">
//                                           ${(
//                                             Number(item.unitPrice || item.UnitPrice || 0) *
//                                             Number(item.quantity || item.Quantity || 1)
//                                           ).toFixed(2)}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="text-center py-12">
//                             <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
//                               <Package className="w-10 h-10 text-gray-500" />
//                             </div>
//                             <p className="text-gray-400 font-medium text-lg">No items found for this order</p>
//                           </div>
//                         )}
//                       </div>

//                       {/* Shipping Info */}
//                       <div className="space-y-6">
//                         <div>
//                           <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
//                             <div className="p-2 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-lg">
//                               <MapPin className="w-5 h-5 text-emerald-400" />
//                             </div>
//                             Shipping Details
//                           </h4>
//                           <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
//                             <p className="text-gray-300 whitespace-pre-line">
//                               {order.ShippingAddress || "No shipping address provided"}
//                             </p>
//                           </div>
//                         </div>

//                         <div>
//                           <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
//                             <div className="p-2 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg">
//                               <User className="w-5 h-5 text-blue-400" />
//                             </div>
//                             Customer Info
//                           </h4>
//                           <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-3">
//                             <div className="flex items-center gap-3">
//                               <User className="w-4 h-4 text-gray-400" />
//                               <span className="text-white">{order.UserName || user?.name || "Customer"}</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                               <Mail className="w-4 h-4 text-gray-400" />
//                               <span className="text-white">{order.UserEmail || user?.email || "No email"}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Footer Stats */}
//         {orders.length > 0 && (
//           <div className="mt-12 p-6 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//               <div>
//                 <div className="text-2xl font-bold text-white mb-2">{orders.length}</div>
//                 <div className="text-sm text-gray-400">Total Orders</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-white mb-2">
//                   ${getTotalOrdersValue().toFixed(2)}
//                 </div>
//                 <div className="text-sm text-gray-400">Total Spent</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-white mb-2">
//                   {orders.filter(o => o.Status === "Delivered").length}
//                 </div>
//                 <div className="text-sm text-gray-400">Delivered</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-white mb-2">
//                   {orders.filter(o => o.IsPaid).length}
//                 </div>
//                 <div className="text-sm text-gray-400">Paid Orders</div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;










import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../Api/Axios_Instance.jsx";
import { 
  Package, Calendar, CreditCard, Truck, ShoppingBag, 
  RefreshCw, Eye, ChevronDown, ChevronUp, CheckCircle, 
  Clock, MapPin, DollarSign, User, Mail, Hash, 
  TrendingUp, ExternalLink, Filter, Search, AlertCircle,
  Loader2, Receipt, CheckCheck, XCircle, TruckIcon
} from "lucide-react";
import { toast } from "sonner";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const location = useLocation();

  const statusOptions = [
    { value: "all", label: "All Orders", icon: <Package size={14} /> },
    { value: "Pending", label: "Pending", icon: <Clock size={14} /> },
    { value: "Processing", label: "Processing", icon: <Loader2 size={14} /> },
    { value: "Shipped", label: "Shipped", icon: <TruckIcon size={14} /> },
    { value: "Delivered", label: "Delivered", icon: <CheckCheck size={14} /> },
    { value: "Cancelled", label: "Cancelled", icon: <XCircle size={14} /> }
  ];
 

  const fetchUserOrders = async () => {
    if (!user) {
      setLoading(false);
      setError("Please login to view your orders.");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching orders for user...");
      
      const res = await api.get("/order/myorders");
      console.log("Orders API Response:", res.data);

      if (!res.data) {
        throw new Error("No response from server");
      }

      if (res.data.statusCode !== 200) {
        throw new Error(res.data.message || "Failed to load orders");
      }

      if (!res.data.data || !Array.isArray(res.data.data)) {
        setOrders([]);
        setError(null);
        return;
      }

      const normalizeStatus = (status) => {
        if (!status) return "Pending";
        const s = status.toString().toLowerCase();
        return s.charAt(0).toUpperCase() + s.slice(1);
      };

      const transformedOrders = res.data.data.map(order => ({
        Id: order.id || order.Id,
        UserId: order.userId || order.UserId,
        UserName: user.name || "User",
        UserEmail: user.email || "No email",
        TotalAmount: order.totalAmount || 0,
        Status: normalizeStatus(order.status || order.Status),
        OrderDate: order.createdAt || order.orderDate,
        IsPaid: order.isPaid || false,
        ShippingAddress: order.shippingAddress || "Address not available",
        Items: order.items || []
      }));

      const sorted = transformedOrders.sort((a, b) => {
        const dateA = new Date(a.OrderDate).getTime();
        const dateB = new Date(b.OrderDate).getTime();
        return dateB - dateA;
      });

      setOrders(sorted);
      setError(null);
      
      if (sorted.length > 0) {
        toast.success(`Loaded ${sorted.length} orders`);
      }
      
    } catch (e) {
      console.error("Orders fetch error details:", {
        message: e.message,
        response: e.response?.data,
        status: e.response?.status
      });
      
      if (e.message === "My orders") {
        setOrders([]);
        setError(null);
      } else {
        const errorMessage = e.response?.data?.message || e.message || "Failed to load your orders";
        setError(errorMessage);
        toast.error(errorMessage);
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user, location.pathname]);

  const getStatusBadge = (status) => {
    const statusStr = (status || "").toLowerCase();
    switch (statusStr) {
      case "pending":
        return "border-amber-500 text-amber-400";
      case "processing":
        return "border-blue-500 text-blue-400";
      case "shipped":
        return "border-indigo-500 text-indigo-400";
      case "delivered":
        return "border-emerald-500 text-emerald-400";
      case "cancelled":
      case "canceled":
        return "border-rose-500 text-rose-400";
      default:
        return "border-gray-500 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    const statusStr = (status || "").toLowerCase();
    switch (statusStr) {
      case "pending":
        return <Clock size={14} className="text-amber-400" />;
      case "processing":
        return <Loader2 size={14} className="text-blue-400" />;
      case "shipped":
        return <TruckIcon size={14} className="text-indigo-400" />;
      case "delivered":
        return <CheckCircle size={14} className="text-emerald-400" />;
      case "cancelled":
      case "canceled":
        return <XCircle size={14} className="text-rose-400" />;
      default:
        return <Package size={14} className="text-gray-400" />;
    }
  };

  const refreshOrders = async () => {
    setRefreshing(true);
    try {
      await fetchUserOrders();
    } catch {
      toast.error("Failed to refresh orders");
    } finally {
      setRefreshing(false);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      (order.Id?.toString() || "").includes(searchTerm) ||
      (order.TotalAmount?.toString() || "").includes(searchTerm) ||
      (order.ShippingAddress || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.Status || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (order.Status || "").toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getTotalOrdersValue = () => {
    return orders.reduce((total, order) => total + (Number(order.TotalAmount || 0)), 0);
  };

  const formatOrderDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "Date unavailable";
    }
  };

  const handleViewOrderDetails = (orderId) => {
    navigate(`/payment-success/${orderId}`, {
      state: { 
        fromOrders: true,
        orderId: orderId 
      }
    });
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.patch(`/order/Cancel/${orderId}`);
      toast.success("Order cancelled successfully");
      setOrders(prev =>
        prev.map(o =>
          o.Id === orderId
            ? { ...o, Status: "Cancelled" }
            : o
        )
      );
    } catch (error) {
      console.error("Cancel order failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap');
          .font-ilu { font-family: 'Barlow Condensed', sans-serif; }
        `}</style>
        <div className="text-center border border-[#222] p-12 max-w-md">
          <div className="w-16 h-16 border border-[#333] flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-ilu font-semibold text-white uppercase tracking-wider mb-3">Loading Orders</h3>
          <p className="text-[#666] text-xs uppercase tracking-widest">Fetching your order history...</p>
        </div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap');
          .font-ilu { font-family: 'Barlow Condensed', sans-serif; }
        `}</style>
        <div className="text-center border border-[#333] p-12 max-w-md">
          <div className="w-16 h-16 border border-rose-500/30 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-rose-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-ilu font-semibold text-white uppercase tracking-wider mb-3">Unable to Load Orders</h3>
          <p className="text-[#666] mb-4 text-sm">{error}</p>
          <p className="text-[#444] text-xs uppercase tracking-widest mb-6">Please check your connection and try again</p>
          <button
            onClick={refreshOrders}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-xs hover:bg-[#ddd] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} strokeWidth={1.5} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap');
        .font-ilu { font-family: 'Barlow Condensed', sans-serif; }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 border border-[#333] flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-ilu font-bold text-white uppercase tracking-wider">
                  Order <span className="text-[#666]">History</span>
                </h1>
              </div>
              <p className="text-[#666] text-sm uppercase tracking-widest">
                Track and manage all your orders in one place
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={refreshOrders}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#333] text-white font-ilu font-semibold uppercase tracking-widest text-xs hover:border-[#555] hover:bg-white/5 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} strokeWidth={1.5} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              
              <button
                onClick={() => navigate("/more-products")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-xs hover:bg-[#ddd] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                Shop Now
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-[#222] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-[#333] flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-ilu uppercase tracking-widest text-[#666]">Total Orders</span>
              </div>
              <h3 className="text-3xl font-ilu font-bold text-white mb-1">{orders.length}</h3>
              <p className="text-xs uppercase tracking-widest text-[#444]">All your orders</p>
            </div>
            
            <div className="border border-[#222] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-[#333] flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-ilu uppercase tracking-widest text-[#666]">Total Spent</span>
              </div>
              <h3 className="text-3xl font-ilu font-bold text-white mb-1">${getTotalOrdersValue().toFixed(2)}</h3>
              <p className="text-xs uppercase tracking-widest text-[#444]">Total amount spent</p>
            </div>
            
            <div className="border border-[#222] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-[#333] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-ilu uppercase tracking-widest text-[#666]">In Progress</span>
              </div>
              <h3 className="text-3xl font-ilu font-bold text-white mb-1">
                {orders.filter(o => ["Pending", "Processing", "Shipped"].includes(o.Status)).length}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#444]">Active orders</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="border border-[#222] p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#444]" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="SEARCH BY ORDER ID, AMOUNT, OR STATUS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-black border border-[#222] text-white placeholder-[#333] focus:outline-none focus:border-[#555] transition-colors text-xs uppercase tracking-widest"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#666]" strokeWidth={1.5} />
                  <span className="text-xs font-ilu uppercase tracking-widest text-[#666]">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setStatusFilter(option.value)}
                      className={`px-3 sm:px-4 py-2 text-xs font-ilu uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
                        statusFilter === option.value
                          ? "bg-white text-black border-white"
                          : "bg-black text-[#666] border-[#333] hover:border-[#555] hover:text-white"
                      }`}
                    >
                      {option.icon}
                      <span className="hidden sm:inline">{option.label}</span>
                      <span className="sm:hidden">{option.label.slice(0, 3)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Content */}
        {filteredOrders.length === 0 ? (
          <div className="border border-[#222] p-8 sm:p-12">
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 border border-[#333] flex items-center justify-center mx-auto mb-8">
                <Package className="w-10 h-10 text-[#444]" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-ilu font-bold text-white uppercase tracking-wider mb-4">No Orders Found</h3>
              <p className="text-[#666] text-sm uppercase tracking-widest mb-8 max-w-md mx-auto">
                {searchTerm || statusFilter !== "all" 
                  ? "No orders match your search criteria" 
                  : "You haven't placed any orders yet. Start shopping now!"}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  navigate("/more-products");
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-xs hover:bg-[#ddd] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                {searchTerm || statusFilter !== "all" ? "Clear Filters" : "Start Shopping"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredOrders.map((order, index) => (
              <div 
                key={order.Id || index} 
                className="border border-[#222] overflow-hidden hover:border-[#444] transition-all duration-300"
              >
                <div 
                  className="p-4 sm:p-6 lg:p-8 cursor-pointer hover:bg-white/[0.02] transition-colors duration-200"
                  onClick={() => toggleOrderExpansion(order.Id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                    {/* Order Details */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      {/* Order ID & Date */}
                      <div className="space-y-2 sm:space-y-3 col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2">
                          <Hash className="w-3 h-3 text-[#444]" strokeWidth={1.5} />
                          <p className="text-[10px] font-ilu uppercase tracking-widest text-[#666]">Order ID</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-lg sm:text-xl font-ilu font-bold text-white">#{order.Id || "N/A"}</p>
                          <div className="flex items-center gap-2 text-[#666]">
                            <Calendar className="w-3 h-3" strokeWidth={1.5} />
                            <span className="text-xs uppercase tracking-wider">{formatOrderDate(order.OrderDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3 text-[#444]" strokeWidth={1.5} />
                          <p className="text-[10px] font-ilu uppercase tracking-widest text-[#666]">Total Amount</p>
                        </div>
                        <p className="text-2xl sm:text-3xl font-ilu font-bold text-white">
                          ${Number(order.TotalAmount || 0).toFixed(2)}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.Status)}
                          <p className="text-[10px] font-ilu uppercase tracking-widest text-[#666]">Status</p>
                        </div>
                        <div className="inline-flex">
                          <span className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-ilu uppercase tracking-widest border ${getStatusBadge(order.Status)}`}>
                            {getStatusIcon(order.Status)}
                            <span className="hidden sm:inline">{order.Status || "Unknown"}</span>
                            <span className="sm:hidden">{order.Status?.slice(0, 3) || "UNK"}</span>
                          </span>
                        </div>
                      </div>

                      {/* Payment Status */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-3 h-3 text-[#444]" strokeWidth={1.5} />
                          <p className="text-[10px] font-ilu uppercase tracking-widest text-[#666]">Payment</p>
                        </div>
                        <div className={`inline-flex px-3 sm:px-4 py-2 text-xs font-ilu uppercase tracking-widest border ${order.IsPaid ? 'border-emerald-500 text-emerald-400' : 'border-amber-500 text-amber-400'}`}>
                          {order.IsPaid ? 'Paid' : 'Pending'}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-4 mt-4 lg:mt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewOrderDetails(order.Id);
                        }}
                        className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#ddd] transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.5} />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </button>

                      {["Pending", "Processing"].includes(order.Status) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelOrder(order.Id);
                          }}
                          className="px-4 sm:px-6 py-2 sm:py-3 border border-rose-500 text-rose-400 font-ilu font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-rose-500/10 transition-colors"
                        >
                          <span className="hidden sm:inline">Cancel Order</span>
                          <span className="sm:hidden">Cancel</span>
                        </button>
                      )}

                      <div className="text-[#444] ml-2">
                        {expandedOrder === order.Id ? (
                          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                        ) : (
                          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Order Items */}
                {expandedOrder === order.Id && (
                  <div className="border-t border-[#222] bg-black p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                      {/* Order Items */}
                      <div className="lg:col-span-2">
                        <h4 className="text-base sm:text-lg font-ilu font-bold text-white uppercase tracking-wider mb-4 sm:mb-6 flex items-center gap-3">
                          <div className="w-8 h-8 border border-[#333] flex items-center justify-center">
                            <Package className="w-4 h-4 text-white" strokeWidth={1.5} />
                          </div>
                          Order Items ({order.Items?.length || 0})
                        </h4>
                        
                        {order.Items && order.Items.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {order.Items.map((item, itemIndex) => (
                              <div 
                                key={itemIndex} 
                                className="border border-[#222] p-3 sm:p-4 hover:border-[#444] transition-all duration-300"
                              >
                                <div className="flex items-center gap-3 sm:gap-4">
                                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-black border border-[#333] overflow-hidden flex-shrink-0">
                                    {item.imageUrl || item.ImageUrl ? (
                                      <img
                                        src={item.imageUrl || item.ImageUrl}
                                        alt={item.productName || item.ProductName || "Product"}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-black flex items-center justify-center">
                                        <Package className="w-6 h-6 sm:w-8 sm:h-8 text-[#333]" strokeWidth={1.5} />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-ilu font-semibold text-white text-sm sm:text-base truncate mb-1 sm:mb-2 uppercase tracking-wider">
                                      {item.productName || item.ProductName || "Product"}
                                    </h5>
                                    <div className="space-y-1 sm:space-y-2">
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#666] uppercase tracking-wider">Qty</span>
                                        <span className="font-medium text-white">{item.quantity || item.Quantity || 1}</span>
                                      </div>
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#666] uppercase tracking-wider">Unit</span>
                                        <span className="font-medium text-white">
                                          ${Number(item.unitPrice || item.UnitPrice || 0).toFixed(2)}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-[#222]">
                                        <span className="text-[10px] font-ilu uppercase tracking-widest text-[#666]">Total</span>
                                        <span className="font-bold text-white">
                                          ${(
                                            Number(item.unitPrice || item.UnitPrice || 0) *
                                            Number(item.quantity || item.Quantity || 1)
                                          ).toFixed(2)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 sm:py-12 border border-[#222]">
                            <div className="w-16 h-16 border border-[#333] flex items-center justify-center mx-auto mb-4 sm:mb-6">
                              <Package className="w-8 h-8 text-[#444]" strokeWidth={1.5} />
                            </div>
                            <p className="text-[#666] font-ilu uppercase tracking-widest text-sm">No items found for this order</p>
                          </div>
                        )}
                      </div>

                      {/* Shipping Info */}
                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <h4 className="text-base sm:text-lg font-ilu font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 border border-[#333] flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" strokeWidth={1.5} />
                            </div>
                            Shipping Details
                          </h4>
                          <div className="border border-[#222] p-3 sm:p-4">
                            <p className="text-[#999] text-xs sm:text-sm uppercase tracking-wider whitespace-pre-line">
                              {order.ShippingAddress || "No shipping address provided"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base sm:text-lg font-ilu font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 border border-[#333] flex items-center justify-center">
                              <User className="w-4 h-4 text-white" strokeWidth={1.5} />
                            </div>
                            Customer Info
                          </h4>
                          <div className="border border-[#222] p-3 sm:p-4 space-y-2 sm:space-y-3">
                            <div className="flex items-center gap-3">
                              <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#666]" strokeWidth={1.5} />
                              <span className="text-white text-xs sm:text-sm uppercase tracking-wider">{order.UserName || user?.name || "Customer"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#666]" strokeWidth={1.5} />
                              <span className="text-white text-xs sm:text-sm uppercase tracking-wider truncate">{order.UserEmail || user?.email || "No email"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {orders.length > 0 && (
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 border border-[#222]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-ilu font-bold text-white mb-1">{orders.length}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#666]">Total Orders</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-ilu font-bold text-white mb-1">
                  ${getTotalOrdersValue().toFixed(2)}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#666]">Total Spent</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-ilu font-bold text-white mb-1">
                  {orders.filter(o => o.Status === "Delivered").length}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#666]">Delivered</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-ilu font-bold text-white mb-1">
                  {orders.filter(o => o.IsPaid).length}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#666]">Paid Orders</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;