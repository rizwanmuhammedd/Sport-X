


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../Api/Axios_Instance.jsx";
// import { Package, Calendar, CreditCard, Truck, ShoppingBag, RefreshCw, Eye, ChevronDown, ChevronUp } from "lucide-react";

// const Orders = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const location = useLocation();


//   useEffect(() => {
//    const fetchUserOrders = async () => {
//   if (!user) {
//     setLoading(false);
//     setError("Please login to view your orders.");
//     return;
//   }

//   try {
//     const res = await api.get("/order/myorders");

//   const sorted = [...res.data.data].sort((a, b) => {
//   const dateA = new Date(a.OrderDate).getTime();
//   const dateB = new Date(b.OrderDate).getTime();

//   // If both dates are valid, sort by date (latest first)
//   if (!isNaN(dateA) && !isNaN(dateB)) {
//     return dateB - dateA;
//   }

//   // Fallback: sort by Id (newer orders usually have bigger Id)
//   return (b.Id || 0) - (a.Id || 0);
// });



//     setOrders(sorted);
//     setError(null);
//   } catch (e) {
//     console.error(e);
//     setError("Failed to load your orders.");
//   } finally {
//     setLoading(false);
//   }
// };


//     fetchUserOrders();
//   }, [user]);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Processing":
//         return "bg-amber-50 text-amber-700 border-amber-200";
//       case "Shipped":
//         return "bg-blue-50 text-blue-700 border-blue-200";
//       case "Delivered":
//         return "bg-emerald-50 text-emerald-700 border-emerald-200";
//       case "Canceled":
//         return "bg-rose-50 text-rose-700 border-rose-200";
//       default:
//         return "bg-slate-50 text-slate-700 border-slate-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Processing":
//         return (
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         );
//       case "Shipped":
//         return (
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         );
//       case "Delivered":
//         return (
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         );
//       case "Canceled":
//         return (
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         );
//       default:
//         return (
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//           </svg>
//         );
//     }
//   };

//  const refreshOrders = async () => {
//   setRefreshing(true);
//   try {
//     const res = await api.get("/order/myorders");

//   const sorted = [...res.data.data].sort((a, b) => {
//   const dateA = new Date(a.OrderDate).getTime();
//   const dateB = new Date(b.OrderDate).getTime();

//   // If both dates are valid, sort by date (latest first)
//   if (!isNaN(dateA) && !isNaN(dateB)) {
//     return dateB - dateA;
//   }

//   // Fallback: sort by Id (newer orders usually have bigger Id)
//   return (b.Id || 0) - (a.Id || 0);
// });


//     setOrders(sorted);
//   } catch {
//     alert("Failed to refresh orders");
//   } finally {
//     setRefreshing(false);
//   }
// };



//   const toggleOrderExpansion = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-12">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-900 mx-auto mb-6"></div>
//           <h3 className="text-2xl font-serif font-light text-slate-900 mb-2">Loading Your Orders</h3>
//           <p className="text-slate-600">Retrieving your order history...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-12 max-w-md">
//           <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h3 className="text-2xl font-serif font-light text-slate-900 mb-3">Unable to Load Orders</h3>
//           <p className="text-slate-600 mb-6">{error}</p>
//           <button
//             onClick={refreshOrders}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all duration-300"
//           >
//             <RefreshCw className="w-5 h-5" />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <div className="mb-10">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-2 tracking-tight">
//                 Your Orders
//               </h1>
//               <div className="h-px bg-gradient-to-r from-slate-300 to-transparent max-w-md mb-3"></div>
//               <p className="text-slate-600 text-base">Track and manage your order history</p>
//             </div>
//             <button
//               onClick={refreshOrders}
//               disabled={refreshing}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
//               {refreshing ? 'Refreshing...' : 'Refresh Orders'}
//             </button>
//           </div>
//         </div>

//         {/* Orders Content */}
//         {orders.length === 0 ? (
//           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-12">
//             <div className="text-center py-16">
//               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
//                 <Package className="w-12 h-12 text-slate-400" />
//               </div>
//               <h3 className="text-3xl font-serif font-light text-slate-900 mb-4">No Orders Yet</h3>
//               <p className="text-slate-600 text-base mb-8 max-w-md mx-auto">
//                 Start your shopping journey and your orders will appear here
//               </p>
//               <button
//                 onClick={() => navigate("/more-products")}
//                 className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium text-base rounded-xl hover:bg-slate-800 transition-all duration-300"
//               >
//                 <ShoppingBag className="w-5 h-5" />
//                 Start Shopping
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order, index) => (
//               <div key={order.Id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:border-slate-300 transition-all duration-300">
//                 <div 
//                   className="p-6 cursor-pointer hover:bg-slate-50 transition-colors duration-200"
//                   onClick={() => toggleOrderExpansion(order.Id)}
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                     <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                       {/* Order ID & Date */}
//                       <div className="space-y-2">
//                         <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Order Details</p>
//                         <div className="space-y-1">
//                           <p className="text-base font-semibold text-slate-900">#{order.Id}</p>
//                           <p className="text-sm text-slate-600">
//                             {order.OrderDate ? new Date(order.OrderDate)
// .toLocaleDateString('en-US', { 
//                               year: 'numeric', 
//                               month: 'long', 
//                               day: 'numeric' 
//                             }) : "Date unavailable"}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Customer Info */}
//                       <div className="space-y-2">
//                         <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</p>
//                         <div className="space-y-1">
//                           <p className="font-medium text-slate-900">{order.UserName}</p>
//                           <p className="text-sm text-slate-600">{order.UserEmail}</p>
//                         </div>
//                       </div>

//                       {/* Total Amount */}
//                       <div className="space-y-2">
//                         <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Amount</p>
//                         <p className="text-2xl font-semibold text-slate-900">
// ${Number(
//   order.TotalAmount ?? order.totalAmount ?? 0
// ).toFixed(2)}
//                         </p>
//                       </div>  

//                       {/* Status */}
//                       <div className="space-y-2">
//                         <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</p>
//                         <div className="inline-flex">
//                           <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border ${getStatusBadge(order.Status)}`}>
//                             {getStatusIcon(order.Status)}
//                             {order.Status}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions & Expand Button */}
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigate(`/payment-success/${order.Id}`, {
//                             state: { userId: order.UserId },
//                           });
//                         }}
//                         className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all duration-300"
//                       >
//                         <Eye className="w-4 h-4" />
//                         View Details
//                       </button>
                      
//                       <div className="text-slate-400">
//                         {expandedOrder === order.Id ? (
//                           <ChevronUp className="w-6 h-6" />
//                         ) : (
//                           <ChevronDown className="w-6 h-6" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Expanded Order Items */}
//                 {expandedOrder === order.Id && (
//                   <div className="border-t border-slate-200 bg-slate-50 p-6">
//                     <h4 className="text-base font-medium text-slate-900 mb-4 flex items-center gap-2">
//                       <Package className="w-5 h-5 text-slate-600" />
//                       Order Items
//                     </h4>
                    
// {(order.Items || order.items) && (order.Items || order.items).length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// {(order.Items || order.items).map((item, itemIndex) => (
//                           <div key={itemIndex} className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all duration-200">
//                             <div className="flex items-center gap-4">
//                               <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
//                               {item.ImageUrl || item.imageUrl ? (
//   <img
//     src={item.ImageUrl || item.imageUrl}
//     alt={item.ProductName || item.productName}

//                                     className="w-full h-full object-contain"
//                                     onError={(e) => {
//                                       e.target.style.display = 'none';
//                                       e.target.nextSibling.style.display = 'flex';
//                                     }}
//                                   />
//                                 ) : null}
//                                 <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl">
//                                   <Package className="w-8 h-8" />
//                                 </div>
//                               </div>
//                               <div className="flex-1 min-w-0">
// <h5 className="font-medium text-slate-900 truncate mb-1">
// {item.ProductName || item.productName || "Product Name"}
// </h5>
// <div className="space-y-1">
// <p className="text-sm text-slate-600">
//   Qty: <span className="font-medium">{item.Quantity || 1}</span>
// </p>

// <p className="text-base font-semibold text-slate-900">
// ${(
//   Number(item.UnitPrice ?? item.unitPrice ?? 0) *
//   Number(item.Quantity ?? item.quantity ?? 1)
// ).toFixed(2)}

// </p>

//                                 </div>
//                               </div>
//                             </div>
//                           </div>                                   
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                           <Package className="w-8 h-8 text-slate-400" />
//                         </div>
//                         <p className="text-slate-600 font-medium">No items found for this order</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
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
    { value: "all", label: "All Orders", icon: <Package size={16} /> },
    { value: "Pending", label: "Pending", icon: <Clock size={16} /> },
    { value: "Processing", label: "Processing", icon: <Loader2 size={16} /> },
    { value: "Shipped", label: "Shipped", icon: <TruckIcon size={16} /> },
    { value: "Delivered", label: "Delivered", icon: <CheckCheck size={16} /> },
    { value: "Cancelled", label: "Cancelled", icon: <XCircle size={16} /> }
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

      // Your API returns: { statusCode: 200, message: 'My orders', data: [...] }
      // NOT: { success: true, data: [...] }
      
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

      // Transform data to match your backend structure
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


      // Sort by date (newest first)
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
      
      // Check if it's an actual error or just the API message
      if (e.message === "My orders") {
        // This is actually a success - just the message from API
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
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "processing":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "shipped":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      case "delivered":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "cancelled":
      case "canceled":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    const statusStr = (status || "").toLowerCase();
    switch (statusStr) {
      case "pending":
        return <Clock size={16} className="text-amber-400" />;
      case "processing":
        return <Loader2 size={16} className="text-blue-400" />;
      case "shipped":
        return <TruckIcon size={16} className="text-indigo-400" />;
      case "delivered":
        return <CheckCircle size={16} className="text-emerald-400" />;
      case "cancelled":
      case "canceled":
        return <XCircle size={16} className="text-rose-400" />;
      default:
        return <Package size={16} className="text-gray-400" />;
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

    // Update UI immediately
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="text-center bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-12 max-w-md">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
            <Package className="w-10 h-10 absolute inset-0 m-auto text-purple-500" />
          </div>
          <h3 className="text-2xl font-light text-white mb-3">Loading Orders</h3>
          <p className="text-gray-400">Fetching your order history...</p>
        </div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="text-center bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-12 max-w-md">
          <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-rose-400" />
          </div>
          <h3 className="text-2xl font-light text-white mb-3">Unable to Load Orders</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <p className="text-gray-500 text-sm mb-6">Please check your connection and try again</p>
          <button
            onClick={refreshOrders}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Order <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">History</span>
                </h1>
              </div>
              <p className="text-gray-400 text-lg max-w-2xl">
                Track and manage all your orders in one place
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={refreshOrders}
                disabled={refreshing}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform'}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              
              <button
                onClick={() => navigate("/more-products")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl">
                  <Receipt className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm font-medium text-gray-400">Total Orders</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{orders.length}</h3>
              <p className="text-sm text-gray-400">All your orders</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-gray-400">Total Spent</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">${getTotalOrdersValue().toFixed(2)}</h3>
              <p className="text-sm text-gray-400">Total amount spent</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl">
                  <Truck className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-sm font-medium text-gray-400">In Progress</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {orders.filter(o => ["Pending", "Processing", "Shipped"].includes(o.Status)).length}
              </h3>
              <p className="text-sm text-gray-400">Active orders</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by order ID, amount, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-400">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setStatusFilter(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        statusFilter === option.value
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Content */}
        {filteredOrders.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-12">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <Package className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No Orders Found</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
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
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-base rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {searchTerm || statusFilter !== "all" ? "Clear Filters" : "Start Shopping"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <div 
                key={order.Id || index} 
                className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div 
                  className="p-6 lg:p-8 cursor-pointer hover:bg-gray-800/20 transition-colors duration-200"
                  onClick={() => toggleOrderExpansion(order.Id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Order Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Order ID & Date */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-gray-500" />
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-bold text-white">#{order.Id || "N/A"}</p>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{formatOrderDate(order.OrderDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Amount</p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          ${Number(order.TotalAmount || 0).toFixed(2)}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.Status)}
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</p>
                        </div>
                        <div className="inline-flex">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border ${getStatusBadge(order.Status)}`}>
                            {getStatusIcon(order.Status)}
                            {order.Status || "Unknown"}
                          </span>
                        </div>
                      </div>

                      {/* Payment Status */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-500" />
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</p>
                        </div>
                        <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${order.IsPaid ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                          {order.IsPaid ? 'Paid ✓' : 'Pending'}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                   {/* Actions */}
<div className="flex items-center gap-4">
  {/* VIEW DETAILS */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleViewOrderDetails(order.Id);
    }}
    className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 flex items-center gap-2"
  >
    <Eye className="w-4 h-4" />
    View Details
    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
  </button>

  {/* CANCEL ORDER — ONLY IF PENDING */}
{["Pending", "Processing"].includes(order.Status) && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleCancelOrder(order.Id);
      }}
      className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-red-500/30 flex items-center gap-2"
    >
      Cancel Order
    </button>
  )}

  {/* EXPAND ICON */}
  <div className="text-gray-500 group-hover:text-gray-400 transition-colors">
    {expandedOrder === order.Id ? (
      <ChevronUp className="w-6 h-6" />
    ) : (
      <ChevronDown className="w-6 h-6" />
    )}
  </div>
</div>

                  </div>
                </div>

                {/* Expanded Order Items */}
                {expandedOrder === order.Id && (
                  <div className="border-t border-gray-700/50 bg-gray-900/30 p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Order Items */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg">
                            <Package className="w-5 h-5 text-purple-400" />
                          </div>
                          Order Items ({order.Items?.length || 0})
                        </h4>
                        
                        {order.Items && order.Items.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {order.Items.map((item, itemIndex) => (
                              <div 
                                key={itemIndex} 
                                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="relative w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700/50">
                                    {item.imageUrl || item.ImageUrl ? (
                                      <img
                                        src={item.imageUrl || item.ImageUrl}
                                        alt={item.productName || item.ProductName || "Product"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                        <Package className="w-8 h-8 text-gray-600" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-semibold text-white truncate mb-2">
                                      {item.productName || item.ProductName || "Product"}
                                    </h5>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">Quantity</span>
                                        <span className="font-medium text-white">{item.quantity || item.Quantity || 1}</span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">Unit Price</span>
                                        <span className="font-medium text-emerald-400">
                                          ${Number(item.unitPrice || item.UnitPrice || 0).toFixed(2)}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                                        <span className="text-sm font-medium text-gray-400">Item Total</span>
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
                          <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Package className="w-10 h-10 text-gray-500" />
                            </div>
                            <p className="text-gray-400 font-medium text-lg">No items found for this order</p>
                          </div>
                        )}
                      </div>

                      {/* Shipping Info */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-lg">
                              <MapPin className="w-5 h-5 text-emerald-400" />
                            </div>
                            Shipping Details
                          </h4>
                          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                            <p className="text-gray-300 whitespace-pre-line">
                              {order.ShippingAddress || "No shipping address provided"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg">
                              <User className="w-5 h-5 text-blue-400" />
                            </div>
                            Customer Info
                          </h4>
                          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-3">
                            <div className="flex items-center gap-3">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-white">{order.UserName || user?.name || "Customer"}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-white">{order.UserEmail || user?.email || "No email"}</span>
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
          <div className="mt-12 p-6 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-2">{orders.length}</div>
                <div className="text-sm text-gray-400">Total Orders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  ${getTotalOrdersValue().toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Total Spent</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  {orders.filter(o => o.Status === "Delivered").length}
                </div>
                <div className="text-sm text-gray-400">Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  {orders.filter(o => o.IsPaid).length}
                </div>
                <div className="text-sm text-gray-400">Paid Orders</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;