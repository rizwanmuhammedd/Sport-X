// import api from "../Api/Axios_Instance";

// import React, { useState, useEffect } from "react";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Box, 
//   ShoppingCart, 
//   Users, 
//   Filter, 
//   Search, 
//   Calendar, 
//   DollarSign,
//   Package,
//   TrendingUp,
//   Eye,
//   Download,
//   RefreshCw,
//   Edit3,
//   Check,
//   X,
//   Clock,
//   Truck,
//   CheckCircle,
//   XCircle,
//   Save
// } from "lucide-react";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortBy, setSortBy] = useState("date");
//   const [refreshing, setRefreshing] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });
//   const [editingStatus, setEditingStatus] = useState(null);
//   const [updatingStatus, setUpdatingStatus] = useState(false);
//   const [apiErrors, setApiErrors] = useState({ usersError: null, ordersError: null });

//   // Stats calculation
//   const stats = {
//     total: orders.length,
//     totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
//     processing: orders.filter(order => order.status === "Processing").length,
//     delivered: orders.filter(order => order.status === "Delivered").length
//   };

//   // Notification system
//   const showNotification = (message, type = 'success') => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: '', type: '' });
//     }, 4000);
//   };

//   // Error handler
//   const handleError = (error, context) => {
//     console.error(`Error in ${context}:`, error);
//     setApiErrors(prev => ({
//       ...prev,
//       [context]: error.message || `Failed to ${context}`
//     }));
    
//     if (context === 'users') {
//       setError(`Failed to load user data: ${error.message}`);
//     } else if (context === 'orders') {
//       // Don't set main error for orders endpoint issues
//     } else {
//       setError(error.message || `An error occurred in ${context}`);
//     }
//   };

//   // Update order status - IMPROVED VERSION
//  const updateOrderStatus = async (orderId, status) => {
//   try {
//     await api.patch(
//       `/order/admin/status/${orderId}`,
//       { status }, // ✅ JSON body
//       {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     toast.success("Order status updated");

//     // refresh list
//     fetchOrders();
//   } catch (err) {
//     console.error("Update status failed:", err.response?.data || err);
//     toast.error("Failed to update order status");
//   }
// };



//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Processing": return "text-yellow-400";
//       case "Shipped": return "text-blue-400";
//       case "Delivered": return "text-green-400";
//       case "Canceled": return "text-red-400";
//       default: return "text-gray-400";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Processing": return <Clock className="w-4 h-4" />;
//       case "Shipped": return <Truck className="w-4 h-4" />;
//       case "Delivered": return <CheckCircle className="w-4 h-4" />;
//       case "Canceled": return <XCircle className="w-4 h-4" />;
//       default: return <Package className="w-4 h-4" />;
//     }
//   };

//   // ENHANCED fetchOrders function
// const fetchOrders = async () => {
//   try {
//     setRefreshing(true);
//     setError(null);

//     const res = await api.get("/order/admin");

//     const apiOrders = res.data.data || [];

//     const normalizedOrders = apiOrders.map(order => ({
//       ...order,
//       total: order.totalAmount ?? 0,
//       date: order.createdOn,

//       // 🔥 SAFE FALLBACKS (no /users call)
//       userName:
//         order.userName ||
//         order.customerName ||
//         order.shippingAddress?.fullName ||
//         `User #${order.userId}`,

//       userEmail:
//         order.userEmail ||
//         order.shippingAddress?.email ||
//         "No email",
//     }));

//     const sorted = normalizedOrders.sort(
//       (a, b) => new Date(b.date) - new Date(a.date)
//     );

//     setOrders(sorted);
//   } catch (error) {
//     console.error("Failed to fetch orders:", error);
//     setError(
//       error.response?.data?.message || "Failed to load orders"
//     );
//   } finally {
//     setLoading(false);
//     setRefreshing(false);
//   }
// };




//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const toggleExpandedOrder = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       "Processing": "bg-gradient-to-r from-yellow-900 to-yellow-800 text-yellow-300 shadow-lg shadow-yellow-900/30",
//       "Shipped": "bg-gradient-to-r from-blue-900 to-blue-800 text-blue-300 shadow-lg shadow-blue-900/30",
//       "Delivered": "bg-gradient-to-r from-green-900 to-green-800 text-green-300 shadow-lg shadow-green-900/30",
//       "Canceled": "bg-gradient-to-r from-red-900 to-red-800 text-red-300 shadow-lg shadow-red-900/30"
//     };
//     return badges[status] || "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300";
//   };

//   // Filter and search functionality
//  const filteredOrders = orders.filter(order => {
//   const userName = (order.userName || "").toString().toLowerCase();
//   const userEmail = (order.userEmail || "").toString().toLowerCase();
//   const search = searchTerm.toLowerCase();

//   const matchesSearch =
//     userName.includes(search) ||
//     userEmail.includes(search) ||
//     String(order.id || "").includes(search);


//   const matchesStatus =
//     statusFilter === "All" || order.status === statusFilter;

//   return matchesSearch && matchesStatus;
// });


//   if (loading) {
//     return (
//       <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="flex h-[60vh] items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
//             <div className="text-2xl font-bold text-purple-200 mb-2">Loading Orders...</div>
//             <div className="text-purple-400">Fetching data from database</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="flex h-[60vh] items-center justify-center">
//           <div className="text-center bg-red-950/50 p-8 rounded-xl border border-red-800 max-w-2xl">
//             <div className="text-red-400 text-6xl mb-4">⚠</div>
//             <div className="text-xl font-bold text-red-300 mb-2">Connection Error</div>
//             <div className="text-red-400 mb-4">{error}</div>
            
//             {apiErrors.usersError && (
//               <div className="bg-red-900/50 p-4 rounded-lg mb-4 text-left">
//                 <h3 className="font-bold text-red-300 mb-2">Users API Error:</h3>
//                 <p className="text-red-400 text-sm">{apiErrors.usersError}</p>
//               </div>
//             )}
            
//             {apiErrors.ordersError && (
//               <div className="bg-red-900/50 p-4 rounded-lg mb-4 text-left">
//                 <h3 className="font-bold text-red-300 mb-2">Orders API Error:</h3>
//                 <p className="text-red-400 text-sm">{apiErrors.ordersError}</p>
//               </div>
//             )}
            
//             <button 
//               onClick={fetchOrders}
//               className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
//             >
//               Retry Connection
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Notification */}
//       {notification.show && (
//         <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${
//           notification.type === 'success' 
//             ? 'bg-green-900/90 border-green-700 text-green-300' 
//             : 'bg-red-900/90 border-red-700 text-red-300'
//         }`}>
//           <div className="flex items-center gap-2">
//             {notification.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
//             {notification.message}
//           </div>
//         </div>
//       )}

//       {/* API Errors Banner */}
//       {(apiErrors.usersError || apiErrors.ordersError) && (
//         <div className="mb-6 p-4 bg-amber-900/50 border border-amber-700 rounded-lg">
//           <div className="flex items-start gap-3">
//             <div className="text-amber-400 mt-1">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-amber-300 font-medium mb-1">Partial API Issues Detected</h3>
//               <p className="text-amber-400 text-sm">
//                 Some functionality may be limited. The system is running with partial data.
//               </p>
//               {apiErrors.usersError && (
//                 <p className="text-amber-400 text-sm mt-1">Users API: {apiErrors.usersError}</p>
//               )}
//               {apiErrors.ordersError && (
//                 <p className="text-amber-400 text-sm mt-1">Orders API: {apiErrors.ordersError}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Orders Management
//             </h1>
//             <button
//               onClick={fetchOrders}
//               disabled={refreshing}
//               className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-700/30"
//             >
//               <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-300 text-sm font-medium">Total Orders</p>
//                   <p className="text-3xl font-bold text-white">{stats.total}</p>
//                 </div>
//                 <ShoppingCart className="w-8 h-8 text-blue-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-6 rounded-xl border border-green-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-300 text-sm font-medium">Revenue</p>
//                   <p className="text-3xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
//                 </div>
//                 <DollarSign className="w-8 h-8 text-green-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 p-6 rounded-xl border border-yellow-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-yellow-300 text-sm font-medium">Processing</p>
//                   <p className="text-3xl font-bold text-white">{stats.processing}</p>
//                 </div>
//                 <Package className="w-8 h-8 text-yellow-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 rounded-xl border border-purple-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-300 text-sm font-medium">Delivered</p>
//                   <p className="text-3xl font-bold text-white">{stats.delivered}</p>
//                 </div>
//                 <TrendingUp className="w-8 h-8 text-purple-400" />
//               </div>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 mb-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by customer name, email, or order ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                 />
//               </div>
              
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//               >
//                 <option value="All">All Status</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Canceled">Canceled</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Orders Table */}
//         {filteredOrders.length === 0 ? (
//           <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
//             <Box className="w-16 h-16 text-slate-600 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-slate-300 mb-2">No orders found</h3>
//             <p className="text-slate-500">
//               {searchTerm || statusFilter !== "All" 
//                 ? "Try adjusting your filters" 
//                 : "There are no orders in the database yet"}
//             </p>
//           </div>
//         ) : (
//           <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200">
//                     <th className="py-4 px-6 text-left font-bold">Order ID</th>
//                     <th className="py-4 px-6 text-left font-bold">Customer</th>
//                     <th className="py-4 px-6 text-left font-bold">Total</th>
//                     <th className="py-4 px-6 text-left font-bold">Status</th>
//                     <th className="py-4 px-6 text-left font-bold">Date</th>
//                     <th className="py-4 px-6 text-left font-bold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders.map((order, index) => (
//                     <React.Fragment key={order.id}>
//                       <tr 
//                         className={`border-b border-slate-700 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer ${
//                           index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
//                         }`}
//                         onClick={() => toggleExpandedOrder(order.id)}
//                       >
//                         <td className="py-4 px-6">
//                           <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                             <span className="text-purple-300 font-bold">#{order.id}</span>
//                           </div>
//                         </td>
//                         <td className="py-4 px-6">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
//                               {order.userName?.charAt(0)?.toUpperCase() || 'U'}
//                             </div>
//                             <div>
//                               <p className="text-white font-semibold">{order.userName}</p>
//                               <p className="text-slate-400 text-sm">{order.userEmail}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-4 px-6">
//                           <span className="text-2xl font-bold text-green-400">
//                             ${order.total ? order.total.toFixed(2) : 'N/A'}
//                           </span>
//                         </td>
//                         <td className="py-4 px-6">
//                           {editingStatus === order.id ? (
//                             <div className="flex items-center gap-2">
//                               <select
//                                 defaultValue={order.status}
//                                 className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
//                               onChange={(e) => {
//   const newStatus = e.target.value;
//   updateOrderStatus(order.id, newStatus);
// }}

//                                 disabled={updatingStatus}
//                               >
//                                 <option value="Processing">Processing</option>
//                                 <option value="Shipped">Shipped</option>
//                                 <option value="Delivered">Delivered</option>
//                                 <option value="Canceled">Canceled</option>
//                               </select>
//                               <button
//                                 onClick={() => setEditingStatus(null)}
//                                 className="text-slate-400 hover:text-slate-300 transition-colors"
//                                 disabled={updatingStatus}
//                               >
//                                 <X size={16} />
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${getStatusBadge(order.status)}`}>
//                                 {getStatusIcon(order.status)}
//                                 {order.status}
//                               </span>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   setEditingStatus(order.id);
//                                 }}
//                                 className="text-slate-400 hover:text-purple-400 transition-colors ml-2"
//                                 title="Edit Status"
//                               >
//                                 <Edit3 size={16} />
//                               </button>
//                             </div>
//                           )}
//                         </td>
//                         <td className="py-4 px-6 text-slate-400 font-medium">
//                           {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
//                         </td>
//                         <td className="py-4 px-6">
//                           <div className="flex items-center gap-2">
//                             <button 
//                               className="text-purple-400 hover:text-purple-300 transition-colors"
//                               title="View Details"
//                             >
//                               <Eye size={18} />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setEditingStatus(editingStatus === order.id ? null : order.id);
//                               }}
//                               className={`transition-colors ${
//                                 editingStatus === order.id 
//                                   ? 'text-green-400 hover:text-green-300' 
//                                   : 'text-slate-400 hover:text-purple-400'
//                               }`}
//                               title={editingStatus === order.id ? "Save Changes" : "Edit Status"}
//                             >
//                               {editingStatus === order.id ? <Save size={18} /> : <Edit3 size={18} />}
//                             </button>
//                             <div className="text-slate-600">
//                               {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
                      
//                       {expandedOrder === order.id && (
//                         <tr className="border-b border-slate-700">
//                           <td colSpan="6" className="p-0">
//                             <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 p-6">
//                               <div className="flex items-center justify-between mb-4">
//                                 <h4 className="text-xl font-bold text-purple-300 flex items-center gap-2">
//                                   <Package className="w-5 h-5" />
//                                   Order Details
//                                 </h4>
//                                 <div className="flex items-center gap-4">
//                                   <div className="text-sm text-slate-400">
//                                     Status: <span className={`font-semibold ${getStatusColor(order.status)}`}>
//                                       {order.status}
//                                     </span>
//                                   </div>
//                                   {editingStatus !== order.id && (
//                                     <button
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         setEditingStatus(order.id);
//                                       }}
//                                       className="flex items-center gap-2 px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors"
//                                     >
//                                       <Edit3 size={14} />
//                                       Update Status
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
                              
//                               {editingStatus === order.id && (
//                                 <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
//                                   <h5 className="text-lg font-semibold text-white mb-3">Update Order Status</h5>
//                                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                   {['Processing', 'Shipped', 'Delivered', 'Canceled'].map(status => (
//   <button
//     key={status}
//     onClick={() => updateOrderStatus(order.id, status)}
//     disabled={updatingStatus || order.status === status}
//     className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
//       order.status === status
//         ? 'bg-purple-700 border-purple-600 text-white cursor-default'
//         : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-purple-500 hover:text-white'
//     } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
//   >
//     {getStatusIcon(status)}
//     <span className="text-sm font-medium">{status}</span>
//     {order.status === status && <Check size={16} />}
//   </button>
// ))}

//                                   </div>
//                                   <div className="flex justify-end mt-4">
//                                     <button
//                                       onClick={() => setEditingStatus(null)}
//                                       className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
//                                     >
//                                       Cancel
//                                     </button>
//                                   </div>
//                                 </div>
//                               )}

//                               {/* Shipping Address and Order Summary - Side by Side */}
//                               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                                 {/* Shipping Address Section */}
//                                 {order.shippingAddress && (
//                                   <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600 hover:border-purple-500/50 transition-all">
//                                     <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
//                                       <div className="p-2 bg-purple-700/30 rounded-lg">
//                                         <Truck className="w-5 h-5 text-purple-400" />
//                                       </div>
//                                       <h5 className="text-lg font-bold text-white">Shipping Address</h5>
//                                     </div>
//                                     <div className="space-y-3">
//                                       <div className="flex items-start gap-3">
//                                         <div className="w-24 text-sm text-slate-400 font-medium">Name:</div>
//                                         <div className="flex-1 text-white font-semibold">{order.shippingAddress.fullName || 'N/A'}</div>
//                                       </div>
//                                       <div className="flex items-start gap-3">
//                                         <div className="w-24 text-sm text-slate-400 font-medium">Phone:</div>
//                                         <div className="flex-1 text-white font-semibold">{order.shippingAddress.phone || 'N/A'}</div>
//                                       </div>
//                                       <div className="flex items-start gap-3">
//                                         <div className="w-24 text-sm text-slate-400 font-medium">Address:</div>
//                                         <div className="flex-1 text-white font-semibold">{order.shippingAddress.address || 'N/A'}</div>
//                                       </div>
//                                       <div className="flex items-start gap-3">
//                                         <div className="w-24 text-sm text-slate-400 font-medium">City:</div>
//                                         <div className="flex-1 text-white font-semibold">{order.shippingAddress.city || 'N/A'}</div>
//                                       </div>
//                                       <div className="flex items-start gap-3">
//                                         <div className="w-24 text-sm text-slate-400 font-medium">State:</div>
//                                         <div className="flex-1 text-white font-semibold">{order.shippingAddress.state || 'N/A'}</div>
//                                       </div>
//                                       <div className="flex items-start gap-3">
//                                         <div className="w-24 text-sm text-slate-400 font-medium">Postal:</div>
//                                         <div className="flex-1 text-white font-semibold">{order.shippingAddress.postalCode || order.shippingAddress.zipCode || 'N/A'}</div>
//                                       </div>
//                                       <div className="flex items-start gap-3">
//                                         <div className="w-24 text-sm text-slate-400 font-medium">Country:</div>
//                                         <div className="flex-1 text-white font-semibold">{order.shippingAddress.country || 'N/A'}</div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 )}
                                
//                                 {/* Order Summary Section */}
//                                 <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all">
//                                   <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
//                                     <div className="p-2 bg-green-700/30 rounded-lg">
//                                       <DollarSign className="w-5 h-5 text-green-400" />
//                                     </div>
//                                     <h5 className="text-lg font-bold text-white">Order Summary</h5>
//                                   </div>
//                                   <div className="space-y-3">
//                                     <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
//                                       <span className="text-slate-400 font-medium">Order ID:</span>
//                                       <span className="text-purple-300 font-bold">#{order.id}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
//                                       <span className="text-slate-400 font-medium">Items Count:</span>
//                                       <span className="text-white font-bold">{order.items?.length || 0} items</span>
//                                     </div>
//                                     <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
//                                       <span className="text-slate-400 font-medium">Order Date:</span>
//                                       <span className="text-white font-bold">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
//                                       <span className="text-green-300 font-medium">Total Amount:</span>
//                                       <span className="text-green-400 font-bold text-xl">${order.total ? order.total.toFixed(2) : 'N/A'}</span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
                              
//                               {/* Order Items Section */}
//                               <div>
//                                 <div className="flex items-center gap-3 mb-4">
//                                   <div className="p-2 bg-blue-700/30 rounded-lg">
//                                     <Box className="w-5 h-5 text-blue-400" />
//                                   </div>
//                                   <h5 className="text-lg font-bold text-white">Order Items</h5>
//                                   <div className="flex-1 h-px bg-slate-700"></div>
//                                   <span className="text-slate-400 text-sm">{order.items?.length || 0} items</span>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   {order.items?.map(item => (
//                                     <div 
//                                       key={item.id} 
//                                       className="bg-slate-900/70 backdrop-blur-sm border border-slate-600 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
//                                     >
//                                       <div className="flex items-start gap-4">
//                                         <div className="w-20 h-20 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700 group-hover:border-blue-500 transition-all">
//                                           {item.image ? (
//                                             <img
//                                               src={item.image}
//                                               alt={item.name}
//                                               className="w-full h-full object-cover"
//                                               onError={(e) => {
//                                                 e.target.style.display = 'none';
//                                                 e.target.nextSibling.style.display = 'flex';
//                                               }}
//                                             />
//                                           ) : null}
//                                           <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl">
//                                             📦
//                                           </div>
//                                         </div>
//                                         <div className="flex-1 min-w-0">
//                                           <h6 className="text-white font-bold text-base mb-2 truncate group-hover:text-blue-300 transition-colors">{item.name}</h6>
//                                           <div className="flex items-center justify-between mb-2">
//                                             <div className="flex items-center gap-2">
//                                               <span className="text-slate-400 text-sm">Qty:</span>
//                                               <span className="bg-slate-800 px-3 py-1 rounded-full text-white font-bold text-sm border border-slate-700">{item.quantity}</span>
//                                             </div>
//                                             <div className="text-slate-400 text-sm">
//                                               ${item.price ? item.price.toFixed(2) : 'N/A'} each
//                                             </div>
//                                           </div>
//                                           <div className="flex items-center justify-between pt-2 border-t border-slate-700">
//                                             <span className="text-slate-400 text-sm font-medium">Subtotal:</span>
//                                             <span className="text-green-400 font-bold text-lg">
//                                               ${(item.price * item.quantity).toFixed(2)}
//                                             </span>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   )) || (
//                                     <div className="col-span-full text-center py-8 bg-slate-900/50 rounded-xl border border-slate-700">
//                                       <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
//                                       <p className="text-slate-500 font-medium">No items found for this order</p>
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;











// import api from "../Api/Axios_Instance";
// import React, { useState, useEffect } from "react";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Box, 
//   ShoppingCart, 
//   Users, 
//   Filter, 
//   Search, 
//   Calendar, 
//   DollarSign,
//   Package,
//   TrendingUp,
//   Eye,
//   Download,
//   RefreshCw,
//   Edit3,
//   Check,
//   X,
//   Clock,
//   Truck,
//   CheckCircle,
//   XCircle,
//   Save,
//   Printer,
//   Mail,
//   Phone,
//   MapPin,
//   CreditCard,
//   FileText,
//   AlertCircle,
//   UserCheck,
//   Shield,
//   Tag,
//   Percent,
//   ArrowRight,
//   ArrowLeft,
//   MoreVertical,
//   Copy,
//   ExternalLink,
//   BarChart,
//   FilterX,
//   CalendarDays,
//   Layers
// } from "lucide-react";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [refreshing, setRefreshing] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });
//   const [editingStatus, setEditingStatus] = useState(null);
//   const [updatingStatus, setUpdatingStatus] = useState(false);
//   const [apiErrors, setApiErrors] = useState({ usersError: null, ordersError: null });
//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });
//   const [minAmount, setMinAmount] = useState('');
//   const [maxAmount, setMaxAmount] = useState('');

//   // Stats calculation with more metrics
//   const stats = {
//     total: orders.length,
//     totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
//     processing: orders.filter(order => order.status === "Processing").length,
//     shipped: orders.filter(order => order.status === "Shipped").length,
//     delivered: orders.filter(order => order.status === "Delivered").length,
//     cancelled: orders.filter(order => order.status === "Cancelled" || order.status === "Canceled").length,
//     pending: orders.filter(order => order.status === "Pending").length,
//     avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + (order.total || 0), 0) / orders.length : 0,
//     todayOrders: orders.filter(order => {
//       const orderDate = new Date(order.date);
//       const today = new Date();
//       return orderDate.toDateString() === today.toDateString();
//     }).length
//   };

//   // Status workflow configuration
//   const statusWorkflow = {
//     "Pending": ["Processing"],
//     "Processing": ["Shipped", "Cancelled"],
//     "Shipped": ["Delivered"],
//     "Delivered": [],
//     "Cancelled": []
//   };

//   // Get next possible statuses based on current status
//   const getNextPossibleStatuses = (currentStatus) => {
//     return statusWorkflow[currentStatus] || [];
//   };

//   // Check if a status transition is allowed
//   const isStatusTransitionAllowed = (currentStatus, newStatus) => {
//     return getNextPossibleStatuses(currentStatus).includes(newStatus);
//   };

//   // Get status badge with progress indicator
//   const getStatusWithProgress = (order) => {
//     const statusOrder = ["Pending", "Processing", "Shipped", "Delivered"];
//     const currentIndex = statusOrder.indexOf(order.status);
//     const totalSteps = statusOrder.length;
    
//     if (order.status === "Cancelled" || order.status === "Canceled") {
//       return { progress: 0, currentStep: 0, totalSteps, isCancelled: true };
//     }
    
//     return { 
//       progress: ((currentIndex + 1) / totalSteps) * 100,
//       currentStep: currentIndex + 1,
//       totalSteps,
//       isCancelled: false
//     };
//   };

//   // Notification system
//   const showNotification = (message, type = 'success') => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: '', type: '' });
//     }, 4000);
//   };

//   // Error handler
//   const handleError = (error, context) => {
//     console.error(`Error in ${context}:`, error);
//     setApiErrors(prev => ({
//       ...prev,
//       [context]: error.message || `Failed to ${context}`
//     }));
    
//     if (context === 'users') {
//       setError(`Failed to load user data: ${error.message}`);
//     } else if (context === 'orders') {
//       // Don't set main error for orders endpoint issues
//     } else {
//       setError(error.message || `An error occurred in ${context}`);
//     }
//   };

//   // Update order status with workflow validation
//   // Update order status with workflow validation
// // Update order status with workflow validation
// // Update order status with workflow validation
// const updateOrderStatus = async (orderId, newStatus) => {
//   const order = orders.find(o => o.id === orderId);
  
//   if (!order) {
//     showNotification("Order not found", "error");
//     return;
//   }

//   // Check if status transition is allowed
//   if (!isStatusTransitionAllowed(order.status, newStatus)) {
//     showNotification(`Cannot change status from ${order.status} to ${newStatus}`, "error");
//     return;
//   }

//   setUpdatingStatus(true);

//   try {
//     // Map status string to numeric value (based on your backend enum)
//     const statusMap = {
//       "Pending": 0,
//       "Processing": 1,
//       "Shipped": 2,
//       "Delivered": 3,
//       "Cancelled": 4
//     };
    
//     const numericStatus = statusMap[newStatus];
    
//     console.log("Sending request:", {
//       url: `/order/admin/status/${orderId}`,
//       method: 'PATCH',
//       data: { Status: numericStatus }
//     });

//     // Send PATCH request with numeric status value
//     await api.patch(`/order/admin/status/${orderId}`, { 
//       Status: numericStatus
//     });

//     // Update UI state immediately
//     setOrders(prev =>
//       prev.map(order =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     );

//     showNotification(
//       `Order #${orderId} status updated to ${newStatus}`,
//       "success"
//     );
//     setEditingStatus(null);
    
//     // If order is cancelled, show refund option
//     if (newStatus === "Cancelled" || newStatus === "Canceled") {
//       setTimeout(() => {
//         showNotification(`Order #${orderId} cancelled. Consider processing refund if payment was made.`, "info");
//       }, 1000);
//     }
    
//     // If order is delivered, show review request option
//     if (newStatus === "Delivered") {
//       setTimeout(() => {
//         showNotification(`Order #${orderId} delivered. Customer review can be requested.`, "info");
//       }, 1000);
//     }
    
//   } catch (error) {
//     console.error("Update status failed:", error);
    
//     // Check if it's a 400 error and show more details
//     if (error.response?.status === 400) {
//       console.error("400 Error Details:", error.response.data);
//       showNotification(
//         `Bad Request: ${error.response.data?.message || "Invalid status update"}`,
//         "error"
//       );
//     } else {
//       showNotification(
//         error.response?.data?.message || "Failed to update order status",
//         "error"
//       );
//     }
//   } finally {
//     setUpdatingStatus(false);
//   }
// };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending": return "text-yellow-400";
//       case "Processing": return "text-blue-400";
//       case "Shipped": return "text-purple-400";
//       case "Delivered": return "text-green-400";
//       case "Cancelled":
//       case "Canceled": return "text-red-400";
//       default: return "text-gray-400";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Pending": return <Clock className="w-4 h-4" />;
//       case "Processing": return <Package className="w-4 h-4" />;
//       case "Shipped": return <Truck className="w-4 h-4" />;
//       case "Delivered": return <CheckCircle className="w-4 h-4" />;
//       case "Cancelled":
//       case "Canceled": return <XCircle className="w-4 h-4" />;
//       default: return <Package className="w-4 h-4" />;
//     }
//   };

//   // ENHANCED fetchOrders function with better error handling
//   const fetchOrders = async () => {
//     try {
//       setRefreshing(true);
//       setError(null);

//       const res = await api.get("/order/admin");

//       const apiOrders = res.data.data || [];

//       const normalizedOrders = apiOrders.map(order => ({
//         ...order,
//         id: order.id || order._id || `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//         total: order.totalAmount || order.total || 0,
//         date: order.createdAt || order.createdOn || order.orderDate,
//         userName: order.userName || order.customerName || order.shippingAddress?.fullName || `User #${order.userId || 'Unknown'}`,
//         userEmail: order.userEmail || order.shippingAddress?.email || "No email provided",
//         phone: order.phone || order.shippingAddress?.phone || "Not provided",
//         shippingMethod: order.shippingMethod || "Standard Shipping",
//         paymentMethod: order.paymentMethod || "Credit Card",
//         paymentStatus: order.paymentStatus || "Paid",
//         items: order.items || order.orderItems || [],
//         notes: order.notes || order.specialInstructions || "",
//         trackingNumber: order.trackingNumber || order.trackingId || null,
//         estimatedDelivery: order.estimatedDelivery || null
//       }));

//       // Sort by date (newest first by default)
//       const sorted = normalizedOrders.sort(
//         (a, b) => new Date(b.date) - new Date(a.date)
//       );

//       setOrders(sorted);
//       showNotification(`Loaded ${sorted.length} orders`, "success");
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//       setError(
//         error.response?.data?.message || "Failed to load orders. Please check your connection."
//       );
//       showNotification("Failed to load orders", "error");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const toggleExpandedOrder = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       "Pending": "bg-gradient-to-r from-yellow-900 to-yellow-800 text-yellow-300 shadow-lg shadow-yellow-900/30",
//       "Processing": "bg-gradient-to-r from-blue-900 to-blue-800 text-blue-300 shadow-lg shadow-blue-900/30",
//       "Shipped": "bg-gradient-to-r from-purple-900 to-purple-800 text-purple-300 shadow-lg shadow-purple-900/30",
//       "Delivered": "bg-gradient-to-r from-green-900 to-green-800 text-green-300 shadow-lg shadow-green-900/30",
//       "Cancelled": "bg-gradient-to-r from-red-900 to-red-800 text-red-300 shadow-lg shadow-red-900/30",
//       "Canceled": "bg-gradient-to-r from-red-900 to-red-800 text-red-300 shadow-lg shadow-red-900/30"
//     };
//     return badges[status] || "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300";
//   };

//   // Filter and search functionality with advanced filters
//   const filteredOrders = orders.filter(order => {
//     const userName = (order.userName || "").toString().toLowerCase();
//     const userEmail = (order.userEmail || "").toString().toLowerCase();
//     const phone = (order.phone || "").toString().toLowerCase();
//     const orderId = String(order.id || "").toLowerCase();
//     const search = searchTerm.toLowerCase();

//     const matchesSearch =
//       userName.includes(search) ||
//       userEmail.includes(search) ||
//       phone.includes(search) ||
//       orderId.includes(search) ||
//       (order.trackingNumber && order.trackingNumber.toLowerCase().includes(search));

//     const matchesStatus =
//       statusFilter === "All" || order.status === statusFilter;

//     // Date range filter
//     const orderDate = new Date(order.date);
//     const matchesDateRange = 
//       (!dateRange.start || orderDate >= new Date(dateRange.start)) &&
//       (!dateRange.end || orderDate <= new Date(dateRange.end));

//     // Amount filter
//     const orderAmount = order.total || 0;
//     const matchesAmountRange =
//       (!minAmount || orderAmount >= parseFloat(minAmount)) &&
//       (!maxAmount || orderAmount <= parseFloat(maxAmount));

//     return matchesSearch && matchesStatus && matchesDateRange && matchesAmountRange;
//   });

//   // Sort orders
//   const sortedOrders = [...filteredOrders].sort((a, b) => {
//     if (sortBy === "date") {
//       return sortOrder === "desc" 
//         ? new Date(b.date) - new Date(a.date)
//         : new Date(a.date) - new Date(b.date);
//     } else if (sortBy === "amount") {
//       return sortOrder === "desc" 
//         ? (b.total || 0) - (a.total || 0)
//         : (a.total || 0) - (b.total || 0);
//     } else if (sortBy === "status") {
//       const statusOrder = { "Pending": 0, "Processing": 1, "Shipped": 2, "Delivered": 3, "Cancelled": 4, "Canceled": 4 };
//       return sortOrder === "desc"
//         ? statusOrder[b.status] - statusOrder[a.status]
//         : statusOrder[a.status] - statusOrder[b.status];
//     }
//     return 0;
//   });

//   // Toggle order selection
//   const toggleOrderSelection = (orderId) => {
//     setSelectedOrders(prev =>
//       prev.includes(orderId)
//         ? prev.filter(id => id !== orderId)
//         : [...prev, orderId]
//     );
//   };

//   // Select all visible orders
//   const selectAllVisible = () => {
//     if (selectedOrders.length === sortedOrders.length) {
//       setSelectedOrders([]);
//     } else {
//       setSelectedOrders(sortedOrders.map(order => order.id));
//     }
//   };

//   // Bulk status update
//   // Bulk status update
// // Bulk status update
// // Bulk status update
// const bulkUpdateStatus = async (newStatus) => {
//   if (selectedOrders.length === 0) {
//     showNotification("Please select orders first", "warning");
//     return;
//   }

//   const invalidTransitions = [];
  
//   // Check each order for valid transitions
//   selectedOrders.forEach(orderId => {
//     const order = orders.find(o => o.id === orderId);
//     if (order && !isStatusTransitionAllowed(order.status, newStatus)) {
//       invalidTransitions.push({ id: orderId, currentStatus: order.status });
//     }
//   });

//   if (invalidTransitions.length > 0) {
//     const message = `Cannot update ${invalidTransitions.length} order(s). Status transition not allowed.`;
//     showNotification(message, "error");
//     return;
//   }

//   setUpdatingStatus(true);
  
//   try {
//     // Map status string to numeric value
//     const statusMap = {
//       "Pending": 0,
//       "Processing": 1,
//       "Shipped": 2,
//       "Delivered": 3,
//       "Cancelled": 4
//     };
    
//     const numericStatus = statusMap[newStatus];
    
//     // Update each order individually
//     for (const orderId of selectedOrders) {
//       await api.patch(`/order/admin/status/${orderId}`, { 
//         Status: numericStatus
//       });
//     }

//     // Update UI state
//     setOrders(prev =>
//       prev.map(order =>
//         selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order
//       )
//     );

//     showNotification(`Updated ${selectedOrders.length} orders to ${newStatus}`, "success");
//     setSelectedOrders([]);
    
//   } catch (error) {
//     console.error("Bulk update failed:", error);
//     showNotification("Failed to update some orders", "error");
//   } finally {
//     setUpdatingStatus(false);
//   }
// };

//   // Export orders
//   const exportOrders = () => {
//     const dataToExport = sortedOrders.map(order => ({
//       "Order ID": order.id,
//       "Customer": order.userName,
//       "Email": order.userEmail,
//       "Phone": order.phone,
//       "Amount": order.total,
//       "Status": order.status,
//       "Date": order.date ? new Date(order.date).toLocaleDateString() : 'N/A',
//       "Payment Method": order.paymentMethod,
//       "Payment Status": order.paymentStatus,
//       "Tracking Number": order.trackingNumber || 'N/A',
//       "Items Count": order.items?.length || 0
//     }));

//     const csv = [
//       Object.keys(dataToExport[0] || {}).join(','),
//       ...dataToExport.map(row => Object.values(row).join(','))
//     ].join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
    
//     showNotification(`Exported ${dataToExport.length} orders to CSV`, "success");
//   };

//   // Print invoice
//   const printInvoice = (order) => {
//     const printWindow = window.open('', '_blank');
//     const invoiceContent = `
//       <html>
//         <head>
//           <title>Invoice #${order.id}</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; }
//             .invoice-header { border-bottom: 2px solid #000; margin-bottom: 20px; padding-bottom: 10px; }
//             .invoice-details { margin: 20px 0; }
//             .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
//             .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             .total { font-weight: bold; font-size: 1.2em; }
//             .footer { margin-top: 40px; font-size: 0.9em; color: #666; }
//           </style>
//         </head>
//         <body>
//           <div class="invoice-header">
//             <h1>INVOICE #${order.id}</h1>
//             <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
//           </div>
          
//           <div class="invoice-details">
//             <h3>Bill To:</h3>
//             <p>${order.userName}<br/>
//             ${order.userEmail}<br/>
//             ${order.phone}</p>
//           </div>
          
//           <table class="items-table">
//             <thead>
//               <tr>
//                 <th>Item</th>
//                 <th>Quantity</th>
//                 <th>Price</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${order.items?.map(item => `
//                 <tr>
//                   <td>${item.name}</td>
//                   <td>${item.quantity}</td>
//                   <td>$${item.price?.toFixed(2) || '0.00'}</td>
//                   <td>$${(item.price * item.quantity).toFixed(2)}</td>
//                 </tr>
//               `).join('') || '<tr><td colspan="4">No items</td></tr>'}
//             </tbody>
//           </table>
          
//           <div class="total">
//             Total Amount: $${order.total?.toFixed(2) || '0.00'}
//           </div>
          
//           <div class="footer">
//             <p>Status: ${order.status}</p>
//             <p>Thank you for your business!</p>
//           </div>
//         </body>
//       </html>
//     `;
    
//     printWindow.document.write(invoiceContent);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   // Copy order ID to clipboard
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     showNotification("Copied to clipboard", "success");
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSearchTerm("");
//     setStatusFilter("All");
//     setDateRange({ start: '', end: '' });
//     setMinAmount('');
//     setMaxAmount('');
//     showNotification("Filters cleared", "info");
//   };

//   if (loading) {
//     return (
//       <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="flex h-[60vh] items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
//             <div className="text-2xl font-bold text-purple-200 mb-2">Loading Orders...</div>
//             <div className="text-purple-400">Fetching data from database</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <div className="flex h-[60vh] items-center justify-center">
//           <div className="text-center bg-red-950/50 p-8 rounded-xl border border-red-800 max-w-2xl">
//             <div className="text-red-400 text-6xl mb-4">⚠</div>
//             <div className="text-xl font-bold text-red-300 mb-2">Connection Error</div>
//             <div className="text-red-400 mb-4">{error}</div>
//             <button 
//               onClick={fetchOrders}
//               className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
//             >
//               Retry Connection
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Notification */}
//       {notification.show && (
//         <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${
//           notification.type === 'success' 
//             ? 'bg-green-900/90 border-green-700 text-green-300' 
//             : notification.type === 'error'
//             ? 'bg-red-900/90 border-red-700 text-red-300'
//             : notification.type === 'warning'
//             ? 'bg-yellow-900/90 border-yellow-700 text-yellow-300'
//             : 'bg-blue-900/90 border-blue-700 text-blue-300'
//         }`}>
//           <div className="flex items-center gap-2">
//             {notification.type === 'success' ? <Check className="w-5 h-5" /> : 
//              notification.type === 'error' ? <X className="w-5 h-5" /> :
//              notification.type === 'warning' ? <AlertCircle className="w-5 h-5" /> :
//              <CheckCircle className="w-5 h-5" />}
//             {notification.message}
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Orders Management
//               </h1>
//               <p className="text-slate-400 mt-2">Manage and track all customer orders</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
//               >
//                 <Filter className="w-4 h-4" />
//                 {showFilters ? 'Hide' : 'Show'} Filters
//               </button>
//               <button
//                 onClick={exportOrders}
//                 className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-all"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>
//               <button
//                 onClick={fetchOrders}
//                 disabled={refreshing}
//                 className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white rounded-lg transition-all"
//               >
//                 <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//                 Refresh
//               </button>
//             </div>
//           </div>

//           {/* Stats Cards - Enhanced */}
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
//             <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-4 rounded-xl border border-blue-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-300 text-xs font-medium">Total Orders</p>
//                   <p className="text-2xl font-bold text-white">{stats.total}</p>
//                 </div>
//                 <ShoppingCart className="w-6 h-6 text-blue-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-4 rounded-xl border border-green-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-green-300 text-xs font-medium">Revenue</p>
//                   <p className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(0)}</p>
//                 </div>
//                 <DollarSign className="w-6 h-6 text-green-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 p-4 rounded-xl border border-yellow-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-yellow-300 text-xs font-medium">Processing</p>
//                   <p className="text-2xl font-bold text-white">{stats.processing}</p>
//                 </div>
//                 <Clock className="w-6 h-6 text-yellow-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-4 rounded-xl border border-purple-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-300 text-xs font-medium">Shipped</p>
//                   <p className="text-2xl font-bold text-white">{stats.shipped}</p>
//                 </div>
//                 <Truck className="w-6 h-6 text-purple-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-4 rounded-xl border border-emerald-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-emerald-300 text-xs font-medium">Delivered</p>
//                   <p className="text-2xl font-bold text-white">{stats.delivered}</p>
//                 </div>
//                 <CheckCircle className="w-6 h-6 text-emerald-400" />
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 p-4 rounded-xl border border-red-700/30 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-red-300 text-xs font-medium">Cancelled</p>
//                   <p className="text-2xl font-bold text-white">{stats.cancelled}</p>
//                 </div>
//                 <XCircle className="w-6 h-6 text-red-400" />
//               </div>
//             </div>
//           </div>

//           {/* Bulk Actions */}
//           {selectedOrders.length > 0 && (
//             <div className="mb-6 p-4 bg-purple-900/30 border border-purple-700/50 rounded-xl">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <Shield className="w-5 h-5 text-purple-400" />
//                   <span className="text-white font-medium">
//                     {selectedOrders.length} order(s) selected
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setSelectedOrders([])}
//                     className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
//                   >
//                     Clear Selection
//                   </button>
//                   <div className="flex gap-2">
//                     {["Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
//                       <button
//                         key={status}
//                         onClick={() => bulkUpdateStatus(status)}
//                         disabled={updatingStatus}
//                         className={`px-3 py-1 rounded-lg text-sm transition-all ${
//                           updatingStatus
//                             ? 'opacity-50 cursor-not-allowed'
//                             : 'hover:opacity-90'
//                         } ${status === 'Processing' ? 'bg-blue-700 text-white' :
//                            status === 'Shipped' ? 'bg-purple-700 text-white' :
//                            status === 'Delivered' ? 'bg-green-700 text-white' :
//                            'bg-red-700 text-white'}`}
//                       >
//                         Set {status}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Filters - Enhanced */}
//           <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 mb-6">
//             <div className="flex flex-col md:flex-row gap-4 mb-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search orders by ID, customer, email, phone, or tracking..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//                 />
//               </div>
              
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
//               >
//                 <option value="All">All Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>

//               <button
//                 onClick={clearFilters}
//                 className="flex items-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
//               >
//                 <FilterX className="w-4 h-4" />
//                 Clear
//               </button>
//             </div>

//             {showFilters && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
//                 <div>
//                   <label className="block text-slate-400 text-sm mb-2">Date Range</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="date"
//                       value={dateRange.start}
//                       onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
//                       className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
//                     />
//                     <input
//                       type="date"
//                       value={dateRange.end}
//                       onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
//                       className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-slate-400 text-sm mb-2">Amount Range</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       placeholder="Min $"
//                       value={minAmount}
//                       onChange={(e) => setMinAmount(e.target.value)}
//                       className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Max $"
//                       value={maxAmount}
//                       onChange={(e) => setMaxAmount(e.target.value)}
//                       className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-slate-400 text-sm mb-2">Sort By</label>
//                   <div className="flex gap-2">
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
//                     >
//                       <option value="date">Date</option>
//                       <option value="amount">Amount</option>
//                       <option value="status">Status</option>
//                     </select>
//                     <button
//                       onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
//                       className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
//                     >
//                       {sortOrder === "desc" ? "↓" : "↑"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Orders Table */}
//         {sortedOrders.length === 0 ? (
//           <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
//             <Box className="w-16 h-16 text-slate-600 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-slate-300 mb-2">No orders found</h3>
//             <p className="text-slate-500 mb-4">
//               {searchTerm || statusFilter !== "All" || dateRange.start || dateRange.end || minAmount || maxAmount
//                 ? "Try adjusting your filters" 
//                 : "There are no orders in the database yet"}
//             </p>
//             {(searchTerm || statusFilter !== "All" || dateRange.start || dateRange.end || minAmount || maxAmount) && (
//               <button
//                 onClick={clearFilters}
//                 className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg"
//               >
//                 Clear All Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200">
//                     <th className="py-4 px-6 text-left font-bold">
//                       <input
//                         type="checkbox"
//                         checked={selectedOrders.length === sortedOrders.length && sortedOrders.length > 0}
//                         onChange={selectAllVisible}
//                         className="rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500"
//                       />
//                     </th>
//                     <th className="py-4 px-6 text-left font-bold">Order ID</th>
//                     <th className="py-4 px-6 text-left font-bold">Customer</th>
//                     <th className="py-4 px-6 text-left font-bold">Amount</th>
//                     <th className="py-4 px-6 text-left font-bold">Status & Progress</th>
//                     <th className="py-4 px-6 text-left font-bold">Date</th>
//                     <th className="py-4 px-6 text-left font-bold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedOrders.map((order, index) => {
//                     const progressInfo = getStatusWithProgress(order);
//                     const nextPossibleStatuses = getNextPossibleStatuses(order.status);
                    
//                     return (
//                       <React.Fragment key={order.id}>
//                         <tr 
//                           className={`border-b border-slate-700 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer ${
//                             index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
//                           } ${selectedOrders.includes(order.id) ? 'bg-purple-900/20' : ''}`}
//                           onClick={() => toggleExpandedOrder(order.id)}
//                         >
//                           <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
//                             <input
//                               type="checkbox"
//                               checked={selectedOrders.includes(order.id)}
//                               onChange={() => toggleOrderSelection(order.id)}
//                               className="rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500"
//                             />
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex items-center gap-2">
//                               <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                               <div>
//                                 <span className="text-purple-300 font-bold">#{order.id}</span>
//                                 {order.trackingNumber && (
//                                   <div className="text-xs text-slate-400 mt-1">
//                                     Track: {order.trackingNumber}
//                                   </div>
//                                 )}
//                               </div>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   copyToClipboard(order.id);
//                                 }}
//                                 className="text-slate-500 hover:text-slate-300 transition-colors"
//                                 title="Copy Order ID"
//                               >
//                                 <Copy size={14} />
//                               </button>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
//                                 {order.userName?.charAt(0)?.toUpperCase() || 'U'}
//                               </div>
//                               <div>
//                                 <p className="text-white font-semibold">{order.userName}</p>
//                                 <p className="text-slate-400 text-sm">{order.userEmail}</p>
//                                 {order.phone && order.phone !== "Not provided" && (
//                                   <p className="text-slate-500 text-xs flex items-center gap-1">
//                                     <Phone size={10} /> {order.phone}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div>
//                               <span className="text-2xl font-bold text-green-400">
//                                 ${order.total ? order.total.toFixed(2) : 'N/A'}
//                               </span>
//                               <div className="text-xs text-slate-400 mt-1">
//                                 {order.paymentMethod} • {order.paymentStatus}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="space-y-2">
//                               <div className="flex items-center gap-2">
//                                 <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${getStatusBadge(order.status)}`}>
//                                   {getStatusIcon(order.status)}
//                                   {order.status}
//                                 </span>
                                
//                                {editingStatus === order.id ? (
//   <div className="flex items-center gap-2">
//     <select
//       value={order.status}
//       className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
//       onChange={(e) => {
//         const newStatus = e.target.value;
//         updateOrderStatus(order.id, newStatus);
//       }}
//       disabled={updatingStatus}
//     >
//       <option value={order.status}>
//         Current: {order.status}
//       </option>
//       {nextPossibleStatuses.map(status => (
//         <option key={status} value={status}>
//           {status}
//         </option>
//       ))}
//     </select>
//     <button
//       onClick={() => setEditingStatus(null)}
//       className="text-slate-400 hover:text-slate-300 transition-colors"
//       disabled={updatingStatus}
//     >
//       <X size={16} />
//     </button>
//   </div>
// ) : nextPossibleStatuses.length > 0 ? (
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       setEditingStatus(order.id);
//     }}
//     className="text-slate-400 hover:text-purple-400 transition-colors ml-2"
//     title="Update Status"
//   >
//     <ArrowRight size={16} />
//   </button>
// ) : null}
//                               </div>
                              
//                               {/* Status Progress Bar */}
//                               {!progressInfo.isCancelled && (
//                                 <div className="w-full bg-slate-700 rounded-full h-1.5">
//                                   <div 
//                                     className="bg-gradient-to-r from-blue-500 to-green-500 h-1.5 rounded-full transition-all duration-500"
//                                     style={{ width: `${progressInfo.progress}%` }}
//                                   ></div>
//                                 </div>
//                               )}
                              
//                               {/* Next Steps */}
//                               {nextPossibleStatuses.length > 0 && (
//                                 <div className="text-xs text-slate-400">
//                                   Next: {nextPossibleStatuses.join(' → ')}
//                                 </div>
//                               )}
//                             </div>
//                           </td>
//                           <td className="py-4 px-6 text-slate-400 font-medium">
//                             <div className="space-y-1">
//                               <div>{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</div>
//                               <div className="text-xs">
//                                 {order.date ? new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex items-center gap-2">
//                               <button 
//                                 className="text-blue-400 hover:text-blue-300 transition-colors"
//                                 title="View Details"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   toggleExpandedOrder(order.id);
//                                 }}
//                               >
//                                 <Eye size={18} />
//                               </button>
                              
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   printInvoice(order);
//                                 }}
//                                 className="text-green-400 hover:text-green-300 transition-colors"
//                                 title="Print Invoice"
//                               >
//                                 <Printer size={18} />
//                               </button>
                              
//                               {nextPossibleStatuses.length > 0 && editingStatus !== order.id && (
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     setEditingStatus(order.id);
//                                   }}
//                                   className="text-purple-400 hover:text-purple-300 transition-colors"
//                                   title="Update Status"
//                                 >
//                                   <Edit3 size={18} />
//                                 </button>
//                               )}
                              
//                               <div className="text-slate-600">
//                                 {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
                        
//                         {expandedOrder === order.id && (
//                           <tr className="border-b border-slate-700">
//                             <td colSpan="7" className="p-0">
//                               <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 p-6">
//                                 <div className="flex items-center justify-between mb-6">
//                                   <div>
//                                     <h4 className="text-xl font-bold text-purple-300 flex items-center gap-2">
//                                       <FileText className="w-5 h-5" />
//                                       Order Details #{order.id}
//                                     </h4>
//                                     <p className="text-slate-400 text-sm mt-1">
//                                       Placed on {order.date ? new Date(order.date).toLocaleString() : 'Unknown date'}
//                                     </p>
//                                   </div>
                                  
//                                   <div className="flex items-center gap-4">
//                                     <div className="text-sm">
//                                       <span className="text-slate-400">Payment: </span>
//                                       <span className="font-semibold text-green-400">{order.paymentStatus}</span>
//                                     </div>
//                                     {editingStatus !== order.id && nextPossibleStatuses.length > 0 && (
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           setEditingStatus(order.id);
//                                         }}
//                                         className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm transition-all"
//                                       >
//                                         <Edit3 size={14} />
//                                         Update Status
//                                       </button>
//                                     )}
//                                     <button
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         printInvoice(order);
//                                       }}
//                                       className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm"
//                                     >
//                                       <Printer size={14} />
//                                       Print Invoice
//                                     </button>
//                                   </div>
//                                 </div>
                                
//                                 {/* Status Update Section */}
//                                 {editingStatus === order.id && (
//                                   <div className="mb-6 p-4 bg-slate-900/70 rounded-lg border border-slate-600">
//                                     <h5 className="text-lg font-semibold text-white mb-3">Update Order Status</h5>
//                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                       {nextPossibleStatuses.map(status => (
//                                         <button
//                                           key={status}
//                                           onClick={() => updateOrderStatus(order.id, status)}
//                                           disabled={updatingStatus}
//                                           className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
//                                             order.status === status
//                                               ? 'bg-purple-700 border-purple-600 text-white cursor-default'
//                                               : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-purple-500 hover:text-white'
//                                           } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                         >
//                                           {getStatusIcon(status)}
//                                           <span className="text-sm font-medium">{status}</span>
//                                           {order.status === status && <Check size={16} />}
//                                         </button>
//                                       ))}
//                                     </div>
//                                     <div className="flex justify-between items-center mt-4">
//                                       <div className="text-sm text-slate-400">
//                                         Current status: <span className={`font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
//                                       </div>
//                                       <button
//                                         onClick={() => setEditingStatus(null)}
//                                         className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
//                                       >
//                                         Cancel
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )}

//                                 {/* Order Information Grid */}
//                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//                                   {/* Customer Information */}
//                                   <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
//                                     <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
//                                       <div className="p-2 bg-blue-700/30 rounded-lg">
//                                         <UserCheck className="w-5 h-5 text-blue-400" />
//                                       </div>
//                                       <h5 className="text-lg font-bold text-white">Customer Information</h5>
//                                     </div>
//                                     <div className="space-y-3">
//                                       <div className="flex items-center gap-3">
//                                         <UserCheck className="w-4 h-4 text-slate-500 flex-shrink-0" />
//                                         <div>
//                                           <p className="text-slate-400 text-xs">Name</p>
//                                           <p className="text-white font-medium">{order.userName}</p>
//                                         </div>
//                                       </div>
//                                       <div className="flex items-center gap-3">
//                                         <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
//                                         <div>
//                                           <p className="text-slate-400 text-xs">Email</p>
//                                           <p className="text-white font-medium">{order.userEmail}</p>
//                                         </div>
//                                       </div>
//                                       <div className="flex items-center gap-3">
//                                         <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
//                                         <div>
//                                           <p className="text-slate-400 text-xs">Phone</p>
//                                           <p className="text-white font-medium">{order.phone}</p>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
                                  
//                                   {/* Payment Information */}
//                                   <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
//                                     <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
//                                       <div className="p-2 bg-green-700/30 rounded-lg">
//                                         <CreditCard className="w-5 h-5 text-green-400" />
//                                       </div>
//                                       <h5 className="text-lg font-bold text-white">Payment Details</h5>
//                                     </div>
//                                     <div className="space-y-3">
//                                       <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
//                                         <span className="text-slate-400">Method:</span>
//                                         <span className="text-white font-medium">{order.paymentMethod}</span>
//                                       </div>
//                                       <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
//                                         <span className="text-slate-400">Status:</span>
//                                         <span className={`font-medium ${
//                                           order.paymentStatus === 'Paid' ? 'text-green-400' :
//                                           order.paymentStatus === 'Pending' ? 'text-yellow-400' :
//                                           order.paymentStatus === 'Failed' ? 'text-red-400' :
//                                           'text-slate-400'
//                                         }`}>
//                                           {order.paymentStatus}
//                                         </span>
//                                       </div>
//                                       <div className="flex items-center justify-between p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
//                                         <span className="text-green-300">Total Amount:</span>
//                                         <span className="text-green-400 font-bold text-xl">${order.total?.toFixed(2) || '0.00'}</span>
//                                       </div>
//                                     </div>
//                                   </div>
                                  
//                                   {/* Shipping Information */}
//                                   {order.shippingAddress && (
//                                     <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
//                                       <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
//                                         <div className="p-2 bg-purple-700/30 rounded-lg">
//                                           <MapPin className="w-5 h-5 text-purple-400" />
//                                         </div>
//                                         <h5 className="text-lg font-bold text-white">Shipping Details</h5>
//                                       </div>
//                                       <div className="space-y-2">
//                                         <p className="text-white font-medium">{order.shippingAddress.fullName}</p>
//                                         <p className="text-slate-400 text-sm">{order.shippingAddress.address}</p>
//                                         <p className="text-slate-400 text-sm">
//                                           {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
//                                         </p>
//                                         <p className="text-slate-400 text-sm">{order.shippingAddress.country}</p>
//                                         {order.trackingNumber && (
//                                           <div className="mt-3 p-3 bg-purple-900/30 rounded-lg border border-purple-700/50">
//                                             <p className="text-purple-300 text-sm font-medium mb-1">Tracking Number</p>
//                                             <div className="flex items-center justify-between">
//                                               <p className="text-white font-mono">{order.trackingNumber}</p>
//                                               <button
//                                                 onClick={() => copyToClipboard(order.trackingNumber)}
//                                                 className="text-purple-400 hover:text-purple-300"
//                                                 title="Copy Tracking"
//                                               >
//                                                 <Copy size={14} />
//                                               </button>
//                                             </div>
//                                           </div>
//                                         )}
//                                       </div>
//                                     </div>
//                                   )}
//                                 </div>
                                
//                                 {/* Order Items */}
//                                 <div>
//                                   <div className="flex items-center gap-3 mb-4">
//                                     <div className="p-2 bg-blue-700/30 rounded-lg">
//                                       <Layers className="w-5 h-5 text-blue-400" />
//                                     </div>
//                                     <h5 className="text-lg font-bold text-white">Order Items ({order.items?.length || 0})</h5>
//                                     <div className="flex-1 h-px bg-slate-700"></div>
//                                   </div>
//                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {order.items?.map((item, idx) => (
//                                       <div 
//                                         key={idx} 
//                                         className="bg-slate-900/70 backdrop-blur-sm border border-slate-600 rounded-xl p-4 hover:border-blue-500 transition-all group"
//                                       >
//                                         <div className="flex items-start gap-4">
//                                           <div className="w-20 h-20 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700 group-hover:border-blue-500 transition-all">
//                                             {item.image ? (
//                                               <img
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 className="w-full h-full object-cover"
//                                                 onError={(e) => {
//                                                   e.target.style.display = 'none';
//                                                   e.target.nextSibling.style.display = 'flex';
//                                                 }}
//                                               />
//                                             ) : null}
//                                             <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl">
//                                               📦
//                                             </div>
//                                           </div>
//                                           <div className="flex-1 min-w-0">
//                                             <h6 className="text-white font-bold text-base mb-2 group-hover:text-blue-300 transition-colors">{item.name}</h6>
//                                             <div className="flex items-center justify-between mb-2">
//                                               <div className="flex items-center gap-2">
//                                                 <span className="text-slate-400 text-sm">Qty:</span>
//                                                 <span className="bg-slate-800 px-3 py-1 rounded-full text-white font-bold text-sm border border-slate-700">{item.quantity || 1}</span>
//                                               </div>
//                                               <div className="text-slate-400 text-sm">
//                                                 ${item.price ? item.price.toFixed(2) : '0.00'} each
//                                               </div>
//                                             </div>
//                                             <div className="flex items-center justify-between pt-2 border-t border-slate-700">
//                                               <span className="text-slate-400 text-sm font-medium">Subtotal:</span>
//                                               <span className="text-green-400 font-bold text-lg">
//                                                 ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                                               </span>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     )) || (
//                                       <div className="col-span-full text-center py-8 bg-slate-900/50 rounded-xl border border-slate-700">
//                                         <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
//                                         <p className="text-slate-500 font-medium">No items found for this order</p>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>
                                
//                                 {/* Order Notes */}
//                                 {order.notes && (
//                                   <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
//                                     <div className="flex items-center gap-2 mb-2">
//                                       <AlertCircle className="w-4 h-4 text-yellow-400" />
//                                       <h6 className="text-yellow-300 font-medium">Order Notes</h6>
//                                     </div>
//                                     <p className="text-yellow-200 text-sm">{order.notes}</p>
//                                   </div>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
            
//             {/* Table Footer */}
//             <div className="p-4 bg-slate-800/50 border-t border-slate-700">
//               <div className="flex items-center justify-between">
//                 <div className="text-slate-400 text-sm">
//                   Showing {sortedOrders.length} of {orders.length} orders
//                 </div>
//                 <div className="text-slate-400 text-sm">
//                   Total: ${stats.totalRevenue.toFixed(2)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;










import api from "../Api/Axios_Instance";
import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Box, 
  ShoppingCart, 
  Users, 
  Filter, 
  Search, 
  Calendar, 
  DollarSign,
  Package,
  TrendingUp,
  Eye,
  Download,
  RefreshCw,
  Edit3,
  Check,
  X,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Save,
  Printer,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  AlertCircle,
  UserCheck,
  Shield,
  Tag,
  Percent,
  ArrowRight,
  ArrowLeft,
  MoreVertical,
  Copy,
  ExternalLink,
  BarChart,
  FilterX,
  CalendarDays,
  Layers
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [editingStatus, setEditingStatus] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [apiErrors, setApiErrors] = useState({ usersError: null, ordersError: null });
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // Stats calculation with more metrics
  const stats = {
    total: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    processing: orders.filter(order => order.status === "Processing").length,
    shipped: orders.filter(order => order.status === "Shipped").length,
    delivered: orders.filter(order => order.status === "Delivered").length,
    cancelled: orders.filter(order => order.status === "Cancelled" || order.status === "Canceled").length,
    pending: orders.filter(order => order.status === "Pending").length,
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + (order.total || 0), 0) / orders.length : 0,
    todayOrders: orders.filter(order => {
      const orderDate = new Date(order.date);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString();
    }).length
  };

  // Status workflow configuration
  const statusWorkflow = {
    "Pending": ["Processing"],
    "Processing": ["Shipped", "Cancelled"],
    "Shipped": ["Delivered"],
    "Delivered": [],
    "Cancelled": []
  };

  // Get next possible statuses based on current status
  const getNextPossibleStatuses = (currentStatus) => {
    return statusWorkflow[currentStatus] || [];
  };

  // Check if a status transition is allowed
  const isStatusTransitionAllowed = (currentStatus, newStatus) => {
    return getNextPossibleStatuses(currentStatus).includes(newStatus);
  };

  // Get status badge with progress indicator
  const getStatusWithProgress = (order) => {
    const statusOrder = ["Pending", "Processing", "Shipped", "Delivered"];
    const currentIndex = statusOrder.indexOf(order.status);
    const totalSteps = statusOrder.length;
    
    if (order.status === "Cancelled" || order.status === "Canceled") {
      return { progress: 0, currentStep: 0, totalSteps, isCancelled: true };
    }
    
    return { 
      progress: ((currentIndex + 1) / totalSteps) * 100,
      currentStep: currentIndex + 1,
      totalSteps,
      isCancelled: false
    };
  };

  // Notification system
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 4000);
  };

  // Error handler
  const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    setApiErrors(prev => ({
      ...prev,
      [context]: error.message || `Failed to ${context}`
    }));
    
    if (context === 'users') {
      setError(`Failed to load user data: ${error.message}`);
    } else if (context === 'orders') {
      // Don't set main error for orders endpoint issues
    } else {
      setError(error.message || `An error occurred in ${context}`);
    }
  };

  // Update order status with workflow validation
  const updateOrderStatus = async (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
      showNotification("Order not found", "error");
      return;
    }

    // Check if status transition is allowed
    if (!isStatusTransitionAllowed(order.status, newStatus)) {
      showNotification(`Cannot change status from ${order.status} to ${newStatus}`, "error");
      return;
    }

    setUpdatingStatus(true);

    try {
      // Map status string to numeric value (based on your backend enum)
      const statusMap = {
        "Pending": 0,
        "Processing": 1,
        "Shipped": 2,
        "Delivered": 3,
        "Cancelled": 4
      };
      
      const numericStatus = statusMap[newStatus];
      
      console.log("Sending request:", {
        url: `/order/admin/status/${orderId}`,
        method: 'PATCH',
        data: { Status: numericStatus }
      });

      // Send PATCH request with numeric status value
      await api.patch(`/order/admin/status/${orderId}`, { 
        Status: numericStatus
      });

      // Update UI state immediately
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      showNotification(
        `Order #${orderId} status updated to ${newStatus}`,
        "success"
      );
      setEditingStatus(null);
      
      // If order is cancelled, show refund option
      if (newStatus === "Cancelled" || newStatus === "Canceled") {
        setTimeout(() => {
          showNotification(`Order #${orderId} cancelled. Consider processing refund if payment was made.`, "info");
        }, 1000);
      }
      
      // If order is delivered, show review request option
      if (newStatus === "Delivered") {
        setTimeout(() => {
          showNotification(`Order #${orderId} delivered. Customer review can be requested.`, "info");
        }, 1000);
      }
      
    } catch (error) {
      console.error("Update status failed:", error);
      
      // Check if it's a 400 error and show more details
      if (error.response?.status === 400) {
        console.error("400 Error Details:", error.response.data);
        showNotification(
          `Bad Request: ${error.response.data?.message || "Invalid status update"}`,
          "error"
        );
      } else {
        showNotification(
          error.response?.data?.message || "Failed to update order status",
          "error"
        );
      }
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "text-yellow-400";
      case "Processing": return "text-blue-400";
      case "Shipped": return "text-purple-400";
      case "Delivered": return "text-green-400";
      case "Cancelled":
      case "Canceled": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Processing": return <Package className="w-4 h-4" />;
      case "Shipped": return <Truck className="w-4 h-4" />;
      case "Delivered": return <CheckCircle className="w-4 h-4" />;
      case "Cancelled":
      case "Canceled": return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  // ENHANCED fetchOrders function with better error handling
  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      setError(null);

      const res = await api.get("/order/admin");

      const apiOrders = res.data.data || [];

      const normalizedOrders = apiOrders.map(order => ({
        ...order,
        id: order.id || order._id || `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        total: order.totalAmount || order.total || 0,
        date: order.createdAt || order.createdOn || order.orderDate,
        userName: order.userName || order.customerName || order.shippingAddress?.fullName || `User #${order.userId || 'Unknown'}`,
        userEmail: order.userEmail || order.shippingAddress?.email || "No email provided",
        phone: order.phone || order.shippingAddress?.phone || "Not provided",
        shippingMethod: order.shippingMethod || "Standard Shipping",
        paymentMethod: order.paymentMethod || "Credit Card",
        paymentStatus: order.paymentStatus || "Paid",
        items: order.items || order.orderItems || [],
        notes: order.notes || order.specialInstructions || "",
        trackingNumber: order.trackingNumber || order.trackingId || null,
        estimatedDelivery: order.estimatedDelivery || null,
        // Shipping Address mapping from backend
        shippingAddress: order.shippingAddress || {
          fullName: order.userName || "Not provided",
          phone: order.phone || "Not provided",
          altPhone: order.shippingAddress?.altPhone || "",
          addressLine: order.shippingAddress?.addressLine || order.shippingAddress?.address || "Not provided",
          landmark: order.shippingAddress?.landmark || "",
          city: order.shippingAddress?.city || "Not provided",
          state: order.shippingAddress?.state || "Not provided",
          pincode: order.shippingAddress?.pincode || "Not provided",
          country: order.shippingAddress?.country || "Not provided",
          isDefault: order.shippingAddress?.isDefault || false
        },
        // Product details enhancement
        products: order.items?.map(item => ({
          id: item.id || item.productId,
          name: item.name || item.productName || "Product",
          price: item.price || item.unitPrice || 0,
          quantity: item.quantity || 1,
          image: item.image || item.imageUrl || null,
          description: item.description || "",
          category: item.category || "",
          brand: item.brand || "",
          sku: item.sku || item.productCode || ""
        })) || []
      }));

      // Sort by date (newest first by default)
      const sorted = normalizedOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setOrders(sorted);
      showNotification(`Loaded ${sorted.length} orders`, "success");
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError(
        error.response?.data?.message || "Failed to load orders. Please check your connection."
      );
      showNotification("Failed to load orders", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleExpandedOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => {
    const badges = {
      "Pending": "bg-gradient-to-r from-yellow-900 to-yellow-800 text-yellow-300 shadow-lg shadow-yellow-900/30",
      "Processing": "bg-gradient-to-r from-blue-900 to-blue-800 text-blue-300 shadow-lg shadow-blue-900/30",
      "Shipped": "bg-gradient-to-r from-purple-900 to-purple-800 text-purple-300 shadow-lg shadow-purple-900/30",
      "Delivered": "bg-gradient-to-r from-green-900 to-green-800 text-green-300 shadow-lg shadow-green-900/30",
      "Cancelled": "bg-gradient-to-r from-red-900 to-red-800 text-red-300 shadow-lg shadow-red-900/30",
      "Canceled": "bg-gradient-to-r from-red-900 to-red-800 text-red-300 shadow-lg shadow-red-900/30"
    };
    return badges[status] || "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300";
  };

  // Filter and search functionality with advanced filters
  const filteredOrders = orders.filter(order => {
    const userName = (order.userName || "").toString().toLowerCase();
    const userEmail = (order.userEmail || "").toString().toLowerCase();
    const phone = (order.phone || "").toString().toLowerCase();
    const orderId = String(order.id || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      userName.includes(search) ||
      userEmail.includes(search) ||
      phone.includes(search) ||
      orderId.includes(search) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(search));

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    // Date range filter
    const orderDate = new Date(order.date);
    const matchesDateRange = 
      (!dateRange.start || orderDate >= new Date(dateRange.start)) &&
      (!dateRange.end || orderDate <= new Date(dateRange.end));

    // Amount filter
    const orderAmount = order.total || 0;
    const matchesAmountRange =
      (!minAmount || orderAmount >= parseFloat(minAmount)) &&
      (!maxAmount || orderAmount <= parseFloat(maxAmount));

    return matchesSearch && matchesStatus && matchesDateRange && matchesAmountRange;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "desc" 
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    } else if (sortBy === "amount") {
      return sortOrder === "desc" 
        ? (b.total || 0) - (a.total || 0)
        : (a.total || 0) - (b.total || 0);
    } else if (sortBy === "status") {
      const statusOrder = { "Pending": 0, "Processing": 1, "Shipped": 2, "Delivered": 3, "Cancelled": 4, "Canceled": 4 };
      return sortOrder === "desc"
        ? statusOrder[b.status] - statusOrder[a.status]
        : statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  // Toggle order selection
  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Select all visible orders
  const selectAllVisible = () => {
    if (selectedOrders.length === sortedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(sortedOrders.map(order => order.id));
    }
  };

  // Bulk status update
  const bulkUpdateStatus = async (newStatus) => {
    if (selectedOrders.length === 0) {
      showNotification("Please select orders first", "warning");
      return;
    }

    const invalidTransitions = [];
    
    // Check each order for valid transitions
    selectedOrders.forEach(orderId => {
      const order = orders.find(o => o.id === orderId);
      if (order && !isStatusTransitionAllowed(order.status, newStatus)) {
        invalidTransitions.push({ id: orderId, currentStatus: order.status });
      }
    });

    if (invalidTransitions.length > 0) {
      const message = `Cannot update ${invalidTransitions.length} order(s). Status transition not allowed.`;
      showNotification(message, "error");
      return;
    }

    setUpdatingStatus(true);
    
    try {
      // Map status string to numeric value
      const statusMap = {
        "Pending": 0,
        "Processing": 1,
        "Shipped": 2,
        "Delivered": 3,
        "Cancelled": 4
      };
      
      const numericStatus = statusMap[newStatus];
      
      // Update each order individually
      for (const orderId of selectedOrders) {
        await api.patch(`/order/admin/status/${orderId}`, { 
          Status: numericStatus
        });
      }

      // Update UI state
      setOrders(prev =>
        prev.map(order =>
          selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order
        )
      );

      showNotification(`Updated ${selectedOrders.length} orders to ${newStatus}`, "success");
      setSelectedOrders([]);
      
    } catch (error) {
      console.error("Bulk update failed:", error);
      showNotification("Failed to update some orders", "error");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Export orders
  const exportOrders = () => {
    const dataToExport = sortedOrders.map(order => ({
      "Order ID": order.id,
      "Customer": order.userName,
      "Email": order.userEmail,
      "Phone": order.phone,
      "Amount": order.total,
      "Status": order.status,
      "Date": order.date ? new Date(order.date).toLocaleDateString() : 'N/A',
      "Payment Method": order.paymentMethod,
      "Payment Status": order.paymentStatus,
      "Tracking Number": order.trackingNumber || 'N/A',
      "Items Count": order.items?.length || 0
    }));

    const csv = [
      Object.keys(dataToExport[0] || {}).join(','),
      ...dataToExport.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification(`Exported ${dataToExport.length} orders to CSV`, "success");
  };

  // Print invoice
  const printInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    const invoiceContent = `
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .invoice-header { border-bottom: 2px solid #000; margin-bottom: 20px; padding-bottom: 10px; }
            .invoice-details { margin: 20px 0; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .total { font-weight: bold; font-size: 1.2em; }
            .footer { margin-top: 40px; font-size: 0.9em; color: #666; }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1>INVOICE #${order.id}</h1>
            <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
          </div>
          
          <div class="invoice-details">
            <h3>Bill To:</h3>
            <p>${order.userName}<br/>
            ${order.userEmail}<br/>
            ${order.phone}</p>
            
            <h3>Shipping Address:</h3>
            <p>
              ${order.shippingAddress.fullName}<br/>
              ${order.shippingAddress.addressLine}<br/>
              ${order.shippingAddress.landmark ? order.shippingAddress.landmark + '<br/>' : ''}
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}<br/>
              ${order.shippingAddress.country}<br/>
              Phone: ${order.shippingAddress.phone}
              ${order.shippingAddress.altPhone ? '<br/>Alt Phone: ' + order.shippingAddress.altPhone : ''}
            </p>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.products?.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.sku || 'N/A'}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price?.toFixed(2) || '0.00'}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('') || '<tr><td colspan="5">No items</td></tr>'}
            </tbody>
          </table>
          
          <div class="total">
            Total Amount: $${order.total?.toFixed(2) || '0.00'}
          </div>
          
          <div class="footer">
            <p>Status: ${order.status}</p>
            <p>Payment Method: ${order.paymentMethod}</p>
            <p>Shipping Method: ${order.shippingMethod}</p>
            ${order.trackingNumber ? `<p>Tracking Number: ${order.trackingNumber}</p>` : ''}
            <p>Thank you for your business!</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Copy order ID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification("Copied to clipboard", "success");
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setDateRange({ start: '', end: '' });
    setMinAmount('');
    setMaxAmount('');
    showNotification("Filters cleared", "info");
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <div className="text-2xl font-bold text-purple-200 mb-2">Loading Orders...</div>
            <div className="text-purple-400">Fetching data from database</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center bg-red-950/50 p-8 rounded-xl border border-red-800 max-w-2xl">
            <div className="text-red-400 text-6xl mb-4">⚠</div>
            <div className="text-xl font-bold text-red-300 mb-2">Connection Error</div>
            <div className="text-red-400 mb-4">{error}</div>
            <button 
              onClick={fetchOrders}
              className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-900/90 border-green-700 text-green-300' 
            : notification.type === 'error'
            ? 'bg-red-900/90 border-red-700 text-red-300'
            : notification.type === 'warning'
            ? 'bg-yellow-900/90 border-yellow-700 text-yellow-300'
            : 'bg-blue-900/90 border-blue-700 text-blue-300'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check className="w-5 h-5" /> : 
             notification.type === 'error' ? <X className="w-5 h-5" /> :
             notification.type === 'warning' ? <AlertCircle className="w-5 h-5" /> :
             <CheckCircle className="w-5 h-5" />}
            {notification.message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Orders Management
              </h1>
              <p className="text-slate-400 mt-2">Manage and track all customer orders</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
              <button
                onClick={exportOrders}
                className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={fetchOrders}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white rounded-lg transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-4 rounded-xl border border-blue-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-xs font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <ShoppingCart className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-4 rounded-xl border border-green-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-xs font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(0)}</p>
                </div>
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 p-4 rounded-xl border border-yellow-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-xs font-medium">Processing</p>
                  <p className="text-2xl font-bold text-white">{stats.processing}</p>
                </div>
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-4 rounded-xl border border-purple-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-xs font-medium">Shipped</p>
                  <p className="text-2xl font-bold text-white">{stats.shipped}</p>
                </div>
                <Truck className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 p-4 rounded-xl border border-emerald-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-300 text-xs font-medium">Delivered</p>
                  <p className="text-2xl font-bold text-white">{stats.delivered}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 p-4 rounded-xl border border-red-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-xs font-medium">Cancelled</p>
                  <p className="text-2xl font-bold text-white">{stats.cancelled}</p>
                </div>
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="mb-6 p-4 bg-purple-900/30 border border-purple-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">
                    {selectedOrders.length} order(s) selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOrders([])}
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm"
                  >
                    Clear Selection
                  </button>
                  <div className="flex gap-2">
                    {["Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
                      <button
                        key={status}
                        onClick={() => bulkUpdateStatus(status)}
                        disabled={updatingStatus}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                          updatingStatus
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:opacity-90'
                        } ${status === 'Processing' ? 'bg-blue-700 text-white' :
                           status === 'Shipped' ? 'bg-purple-700 text-white' :
                           status === 'Delivered' ? 'bg-green-700 text-white' :
                           'bg-red-700 text-white'}`}
                      >
                        Set {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters - Enhanced */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search orders by ID, customer, email, phone, or tracking..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <FilterX className="w-4 h-4" />
                Clear
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Amount Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min $"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max $"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm"
                    >
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                      <option value="status">Status</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                    >
                      {sortOrder === "desc" ? "↓" : "↑"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders Table */}
        {sortedOrders.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
            <Box className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No orders found</h3>
            <p className="text-slate-500 mb-4">
              {searchTerm || statusFilter !== "All" || dateRange.start || dateRange.end || minAmount || maxAmount
                ? "Try adjusting your filters" 
                : "There are no orders in the database yet"}
            </p>
            {(searchTerm || statusFilter !== "All" || dateRange.start || dateRange.end || minAmount || maxAmount) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200">
                    <th className="py-4 px-6 text-left font-bold">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === sortedOrders.length && sortedOrders.length > 0}
                        onChange={selectAllVisible}
                        className="rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500"
                      />
                    </th>
                    <th className="py-4 px-6 text-left font-bold">Order ID</th>
                    <th className="py-4 px-6 text-left font-bold">Customer</th>
                    <th className="py-4 px-6 text-left font-bold">Amount</th>
                    <th className="py-4 px-6 text-left font-bold">Status & Progress</th>
                    <th className="py-4 px-6 text-left font-bold">Date</th>
                    <th className="py-4 px-6 text-left font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order, index) => {
                    const progressInfo = getStatusWithProgress(order);
                    const nextPossibleStatuses = getNextPossibleStatuses(order.status);
                    
                    return (
                      <React.Fragment key={order.id}>
                        <tr 
                          className={`border-b border-slate-700 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer ${
                            index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
                          } ${selectedOrders.includes(order.id) ? 'bg-purple-900/20' : ''}`}
                          onClick={() => toggleExpandedOrder(order.id)}
                        >
                          <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(order.id)}
                              onChange={() => toggleOrderSelection(order.id)}
                              className="rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <div>
                                <span className="text-purple-300 font-bold">#{order.id}</span>
                                {order.trackingNumber && (
                                  <div className="text-xs text-slate-400 mt-1">
                                    Track: {order.trackingNumber}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(order.id);
                                }}
                                className="text-slate-500 hover:text-slate-300 transition-colors"
                                title="Copy Order ID"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                {order.userName?.charAt(0)?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <p className="text-white font-semibold">{order.userName}</p>
                                <p className="text-slate-400 text-sm">{order.userEmail}</p>
                                {order.phone && order.phone !== "Not provided" && (
                                  <p className="text-slate-500 text-xs flex items-center gap-1">
                                    <Phone size={10} /> {order.phone}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <span className="text-2xl font-bold text-green-400">
                                ${order.total ? order.total.toFixed(2) : 'N/A'}
                              </span>
                              <div className="text-xs text-slate-400 mt-1">
                                {order.paymentMethod} • {order.paymentStatus}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${getStatusBadge(order.status)}`}>
                                  {getStatusIcon(order.status)}
                                  {order.status}
                                </span>
                                
                               {editingStatus === order.id ? (
  <div className="flex items-center gap-2">
    <select
      value={order.status}
      className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
      onChange={(e) => {
        const newStatus = e.target.value;
        updateOrderStatus(order.id, newStatus);
      }}
      disabled={updatingStatus}
    >
      <option value={order.status}>
        Current: {order.status}
      </option>
      {nextPossibleStatuses.map(status => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
    <button
      onClick={() => setEditingStatus(null)}
      className="text-slate-400 hover:text-slate-300 transition-colors"
      disabled={updatingStatus}
    >
      <X size={16} />
    </button>
  </div>
) : nextPossibleStatuses.length > 0 ? (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setEditingStatus(order.id);
    }}
    className="text-slate-400 hover:text-purple-400 transition-colors ml-2"
    title="Update Status"
  >
    <ArrowRight size={16} />
  </button>
) : null}
                              </div>
                              
                              {/* Status Progress Bar */}
                              {!progressInfo.isCancelled && (
                                <div className="w-full bg-slate-700 rounded-full h-1.5">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-green-500 h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${progressInfo.progress}%` }}
                                  ></div>
                                </div>
                              )}
                              
                              {/* Next Steps */}
                              {nextPossibleStatuses.length > 0 && (
                                <div className="text-xs text-slate-400">
                                  Next: {nextPossibleStatuses.join(' → ')}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-400 font-medium">
                            <div className="space-y-1">
                              <div>{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</div>
                              <div className="text-xs">
                                {order.date ? new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button 
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                title="View Details"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExpandedOrder(order.id);
                                }}
                              >
                                <Eye size={18} />
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  printInvoice(order);
                                }}
                                className="text-green-400 hover:text-green-300 transition-colors"
                                title="Print Invoice"
                              >
                                <Printer size={18} />
                              </button>
                              
                              {nextPossibleStatuses.length > 0 && editingStatus !== order.id && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingStatus(order.id);
                                  }}
                                  className="text-purple-400 hover:text-purple-300 transition-colors"
                                  title="Update Status"
                                >
                                  <Edit3 size={18} />
                                </button>
                              )}
                              
                              <div className="text-slate-600">
                                {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </div>
                            </div>
                          </td>
                        </tr>
                        
                        {expandedOrder === order.id && (
                          <tr className="border-b border-slate-700">
                            <td colSpan="7" className="p-0">
                              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 p-6">
                                <div className="flex items-center justify-between mb-6">
                                  <div>
                                    <h4 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                                      <FileText className="w-5 h-5" />
                                      Order Details #{order.id}
                                    </h4>
                                    <p className="text-slate-400 text-sm mt-1">
                                      Placed on {order.date ? new Date(order.date).toLocaleString() : 'Unknown date'}
                                    </p>
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                      <span className="text-slate-400">Payment: </span>
                                      <span className="font-semibold text-green-400">{order.paymentStatus}</span>
                                    </div>
                                    {editingStatus !== order.id && nextPossibleStatuses.length > 0 && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingStatus(order.id);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm transition-all"
                                      >
                                        <Edit3 size={14} />
                                        Update Status
                                      </button>
                                    )}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        printInvoice(order);
                                      }}
                                      className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm"
                                    >
                                      <Printer size={14} />
                                      Print Invoice
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Status Update Section */}
                                {editingStatus === order.id && (
                                  <div className="mb-6 p-4 bg-slate-900/70 rounded-lg border border-slate-600">
                                    <h5 className="text-lg font-semibold text-white mb-3">Update Order Status</h5>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                      {nextPossibleStatuses.map(status => (
                                        <button
                                          key={status}
                                          onClick={() => updateOrderStatus(order.id, status)}
                                          disabled={updatingStatus}
                                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                                            order.status === status
                                              ? 'bg-purple-700 border-purple-600 text-white cursor-default'
                                              : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-purple-500 hover:text-white'
                                          } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                          {getStatusIcon(status)}
                                          <span className="text-sm font-medium">{status}</span>
                                          {order.status === status && <Check size={16} />}
                                        </button>
                                      ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                      <div className="text-sm text-slate-400">
                                        Current status: <span className={`font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                                      </div>
                                      <button
                                        onClick={() => setEditingStatus(null)}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Order Information Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                  {/* Customer Information */}
                                  <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                      <div className="p-2 bg-blue-700/30 rounded-lg">
                                        <UserCheck className="w-5 h-5 text-blue-400" />
                                      </div>
                                      <h5 className="text-lg font-bold text-white">Customer Information</h5>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3">
                                        <UserCheck className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                        <div>
                                          <p className="text-slate-400 text-xs">Name</p>
                                          <p className="text-white font-medium">{order.userName}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                        <div>
                                          <p className="text-slate-400 text-xs">Email</p>
                                          <p className="text-white font-medium">{order.userEmail}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                        <div>
                                          <p className="text-slate-400 text-xs">Phone</p>
                                          <p className="text-white font-medium">{order.phone}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Shipping Address Information */}
                                  <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                      <div className="p-2 bg-purple-700/30 rounded-lg">
                                        <MapPin className="w-5 h-5 text-purple-400" />
                                      </div>
                                      <h5 className="text-lg font-bold text-white">Shipping Address</h5>
                                      {order.shippingAddress?.isDefault && (
                                        <span className="ml-auto text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded-full">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3">
                                        <UserCheck className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                        <div>
                                          <p className="text-slate-400 text-xs">Recipient Name</p>
                                          <p className="text-white font-medium">{order.shippingAddress?.fullName || "Not provided"}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                        <div>
                                          <p className="text-slate-400 text-xs">Primary Phone</p>
                                          <p className="text-white font-medium">{order.shippingAddress?.phone || "Not provided"}</p>
                                        </div>
                                      </div>
                                      {order.shippingAddress?.altPhone && (
                                        <div className="flex items-center gap-3">
                                          <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                          <div>
                                            <p className="text-slate-400 text-xs">Alternate Phone</p>
                                            <p className="text-white font-medium">{order.shippingAddress.altPhone}</p>
                                          </div>
                                        </div>
                                      )}
                                      <div className="space-y-1">
                                        <p className="text-slate-400 text-xs">Address</p>
                                        <div className="text-white">
                                          <p className="font-medium">{order.shippingAddress?.addressLine}</p>
                                          {order.shippingAddress?.landmark && (
                                            <p className="text-slate-300 text-sm">Landmark: {order.shippingAddress.landmark}</p>
                                          )}
                                          <p className="text-slate-300 text-sm">
                                            {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                                          </p>
                                          {order.shippingAddress?.country && (
                                            <p className="text-slate-300 text-sm">{order.shippingAddress.country}</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Payment Information */}
                                  <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                      <div className="p-2 bg-green-700/30 rounded-lg">
                                        <CreditCard className="w-5 h-5 text-green-400" />
                                      </div>
                                      <h5 className="text-lg font-bold text-white">Payment Details</h5>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                        <span className="text-slate-400">Method:</span>
                                        <span className="text-white font-medium">{order.paymentMethod}</span>
                                      </div>
                                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                        <span className="text-slate-400">Status:</span>
                                        <span className={`font-medium ${
                                          order.paymentStatus === 'Paid' ? 'text-green-400' :
                                          order.paymentStatus === 'Pending' ? 'text-yellow-400' :
                                          order.paymentStatus === 'Failed' ? 'text-red-400' :
                                          'text-slate-400'
                                        }`}>
                                          {order.paymentStatus}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
                                        <span className="text-green-300">Total Amount:</span>
                                        <span className="text-green-400 font-bold text-xl">${order.total?.toFixed(2) || '0.00'}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Product Details Section */}
                                <div className="mb-6">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-700/30 rounded-lg">
                                      <Package className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h5 className="text-lg font-bold text-white">Product Details ({order.products?.length || 0} items)</h5>
                                    <div className="flex-1 h-px bg-slate-700"></div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {order.products?.map((product, idx) => (
                                      <div 
                                        key={idx} 
                                        className="bg-slate-900/70 backdrop-blur-sm border border-slate-600 rounded-xl p-4 hover:border-blue-500 transition-all group"
                                      >
                                        <div className="flex items-start gap-4">
                                          <div className="w-20 h-20 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700 group-hover:border-blue-500 transition-all">
                                            {product.image ? (
                                              <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                  e.target.style.display = 'none';
                                                  e.target.nextSibling.style.display = 'flex';
                                                }}
                                              />
                                            ) : null}
                                            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl">
                                              📦
                                            </div>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h6 className="text-white font-bold text-base mb-2 group-hover:text-blue-300 transition-colors">
                                              {product.name}
                                            </h6>
                                            
                                            {product.description && (
                                              <p className="text-slate-400 text-sm mb-2 line-clamp-2">
                                                {product.description}
                                              </p>
                                            )}
                                            
                                            <div className="flex flex-wrap gap-2 mb-3">
                                              {product.brand && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-slate-800 text-slate-300">
                                                  <Tag className="w-3 h-3 mr-1" /> {product.brand}
                                                </span>
                                              )}
                                              {product.category && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-slate-800 text-slate-300">
                                                  {product.category}
                                                </span>
                                              )}
                                              {product.sku && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-purple-900/50 text-purple-300">
                                                  SKU: {product.sku}
                                                </span>
                                              )}
                                            </div>
                                            
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2">
                                                <span className="text-slate-400 text-sm">Quantity:</span>
                                                <span className="bg-slate-800 px-3 py-1 rounded-full text-white font-bold text-sm border border-slate-700">
                                                  {product.quantity || 1}
                                                </span>
                                              </div>
                                              <div className="text-slate-400 text-sm">
                                                ${product.price ? product.price.toFixed(2) : '0.00'} each
                                              </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                                              <span className="text-slate-400 text-sm font-medium">Subtotal:</span>
                                              <span className="text-green-400 font-bold text-lg">
                                                ${((product.price || 0) * (product.quantity || 1)).toFixed(2)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )) || (
                                      <div className="col-span-full text-center py-8 bg-slate-900/50 rounded-xl border border-slate-700">
                                        <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                                        <p className="text-slate-500 font-medium">No product details found for this order</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Shipping & Tracking Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                  {/* Shipping Method */}
                                  <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                      <Truck className="w-5 h-5 text-blue-400" />
                                      <h5 className="text-lg font-bold text-white">Shipping Information</h5>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Method:</span>
                                        <span className="text-white font-medium">{order.shippingMethod}</span>
                                      </div>
                                      {order.trackingNumber && (
                                        <div className="flex items-center justify-between">
                                          <span className="text-slate-400">Tracking Number:</span>
                                          <div className="flex items-center gap-2">
                                            <span className="text-white font-mono text-sm">{order.trackingNumber}</span>
                                            <button
                                              onClick={() => copyToClipboard(order.trackingNumber)}
                                              className="text-blue-400 hover:text-blue-300 transition-colors"
                                              title="Copy Tracking Number"
                                            >
                                              <Copy size={14} />
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                      {order.estimatedDelivery && (
                                        <div className="flex items-center justify-between">
                                          <span className="text-slate-400">Estimated Delivery:</span>
                                          <span className="text-white font-medium">
                                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Order Summary */}
                                  <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                      <FileText className="w-5 h-5 text-green-400" />
                                      <h5 className="text-lg font-bold text-white">Order Summary</h5>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Items:</span>
                                        <span className="text-white">{order.products?.length || 0}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Order Date:</span>
                                        <span className="text-white">{new Date(order.date).toLocaleDateString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-400">Order Status:</span>
                                        <span className={`font-medium ${getStatusColor(order.status)}`}>
                                          {order.status}
                                        </span>
                                      </div>
                                      <div className="pt-3 border-t border-slate-700">
                                        <div className="flex justify-between text-xl font-bold">
                                          <span className="text-slate-300">Total Amount:</span>
                                          <span className="text-green-400">${order.total?.toFixed(2) || '0.00'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Order Notes */}
                                {order.notes && (
                                  <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                                      <h6 className="text-yellow-300 font-medium">Order Notes</h6>
                                    </div>
                                    <p className="text-yellow-200 text-sm">{order.notes}</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer */}
            <div className="p-4 bg-slate-800/50 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <div className="text-slate-400 text-sm">
                  Showing {sortedOrders.length} of {orders.length} orders
                </div>
                <div className="text-slate-400 text-sm">
                  Total: ${stats.totalRevenue.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;