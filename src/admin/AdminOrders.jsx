






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
  Save
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [editingStatus, setEditingStatus] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [apiErrors, setApiErrors] = useState({ usersError: null, ordersError: null });

  // Stats calculation
  const stats = {
    total: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    processing: orders.filter(order => order.status === "Processing").length,
    delivered: orders.filter(order => order.status === "Delivered").length
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

  // Update order status - IMPROVED VERSION
  const updateOrderStatus = async (orderId, newStatus, userId) => {
    setUpdatingStatus(true);
    let success = false;
    let errorMessage = '';
    
    try {
      // Method 1: Update in users endpoint
      try {
        const userResponse = await fetch(`https://sport-x-backend-3.onrender.com/users/${userId}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        
        const userData = await userResponse.json();
        
        // Update the specific order status in user data
        const updatedUserOrders = userData.orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        
        // Update the user with new order data
        const updateUserResponse = await fetch(`https://sport-x-backend-3.onrender.com/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userData,
            orders: updatedUserOrders
          })
        });

        if (!updateUserResponse.ok) throw new Error('Failed to update user orders');
        success = true;
      } catch (userError) {
        handleError(userError, 'users');
        errorMessage = userError.message;
      }
      
      // Method 2: Update in orders endpoint
      try {
        const orderResponse = await fetch(`https://sport-x-backend-3.onrender.com/orders/${orderId}`);
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          
          const updateOrderResponse = await fetch(`https://sport-x-backend-3.onrender.com/orders/${orderId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...orderData,
              status: newStatus
            })
          });

          if (!updateOrderResponse.ok) {
            handleError(new Error('Failed to update order in orders endpoint'), 'orders');
          } else {
            success = true;
          }
        }
      } catch (orderError) {
        handleError(orderError, 'orders');
        if (!success) errorMessage = orderError.message;
      }

      if (success) {
        // Update local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        showNotification(`Order #${orderId} status updated to ${newStatus}`, 'success');
        setEditingStatus(null);
      } else {
        showNotification(`Failed to update order status: ${errorMessage}`, 'error');
      }
    } catch (error) {
      handleError(error, 'updateOrderStatus');
      showNotification('Failed to update order status. Please try again.', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing": return "text-yellow-400";
      case "Shipped": return "text-blue-400";
      case "Delivered": return "text-green-400";
      case "Canceled": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing": return <Clock className="w-4 h-4" />;
      case "Shipped": return <Truck className="w-4 h-4" />;
      case "Delivered": return <CheckCircle className="w-4 h-4" />;
      case "Canceled": return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  // ENHANCED fetchOrders function
  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      setApiErrors({ usersError: null, ordersError: null });
      setError(null);
      
      // Try to fetch from both endpoints and merge data
      const [usersResponse, ordersResponse] = await Promise.allSettled([
        fetch("https://sport-x-backend-3.onrender.com/users"),
        fetch("https://sport-x-backend-3.onrender.com/orders")
      ]);

      let allOrders = [];
      
      // Get orders from users endpoint (primary source)
      if (usersResponse.status === 'fulfilled' && usersResponse.value.ok) {
        try {
          const allUsers = await usersResponse.value.json();
          
          allUsers.forEach(user => {
            if (user.orders && user.orders.length > 0) {
              const enrichedOrders = user.orders.map(order => ({
                ...order,
                userName: user.name || user.username,
                userEmail: user.email,
                userId: user.id
              }));
              allOrders = [...allOrders, ...enrichedOrders];
            }
          });
        } catch (err) {
          handleError(err, 'users');
        }
      } else if (usersResponse.status === 'rejected') {
        handleError(usersResponse.reason, 'users');
      }
      
      // If we have orders endpoint, sync any missing data
      if (ordersResponse.status === 'fulfilled' && ordersResponse.value.ok) {
        try {
          const ordersData = await ordersResponse.value.json();
          
          // Check for orders that exist in orders endpoint but not in users
          ordersData.forEach(orderEndpointOrder => {
            const existsInUserData = allOrders.some(order => order.id === orderEndpointOrder.id);
            
            if (!existsInUserData && orderEndpointOrder.userId) {
              // Try to get user info for this orphaned order
              fetch(`https://sport-x-backend-3.onrender.com/users/${orderEndpointOrder.userId}`)
                .then(userRes => {
                  if (!userRes.ok) throw new Error('User not found');
                  return userRes.json();
                })
                .then(userData => {
                  const enrichedOrder = {
                    ...orderEndpointOrder,
                    userName: userData.name || userData.username || 'Unknown User',
                    userEmail: userData.email || 'No email',
                    userId: userData.id
                  };
                  
                  setOrders(prevOrders => {
                    const orderExists = prevOrders.some(order => order.id === enrichedOrder.id);
                    if (!orderExists) {
                      return [...prevOrders, enrichedOrder];
                    }
                    return prevOrders;
                  });
                })
                .catch(err => {
                  handleError(err, 'users');
                });
            }
          });
        } catch (err) {
          handleError(err, 'orders');
        }
      } else if (ordersResponse.status === 'rejected') {
        handleError(ordersResponse.reason, 'orders');
      }
      
      const sortedOrders = allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
      
    } catch (e) {
      handleError(e, 'fetchOrders');
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
      "Processing": "bg-gradient-to-r from-yellow-900 to-yellow-800 text-yellow-300 shadow-lg shadow-yellow-900/30",
      "Shipped": "bg-gradient-to-r from-blue-900 to-blue-800 text-blue-300 shadow-lg shadow-blue-900/30",
      "Delivered": "bg-gradient-to-r from-green-900 to-green-800 text-green-300 shadow-lg shadow-green-900/30",
      "Canceled": "bg-gradient-to-r from-red-900 to-red-800 text-red-300 shadow-lg shadow-red-900/30"
    };
    return badges[status] || "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300";
  };

  // Filter and search functionality
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            
            {apiErrors.usersError && (
              <div className="bg-red-900/50 p-4 rounded-lg mb-4 text-left">
                <h3 className="font-bold text-red-300 mb-2">Users API Error:</h3>
                <p className="text-red-400 text-sm">{apiErrors.usersError}</p>
              </div>
            )}
            
            {apiErrors.ordersError && (
              <div className="bg-red-900/50 p-4 rounded-lg mb-4 text-left">
                <h3 className="font-bold text-red-300 mb-2">Orders API Error:</h3>
                <p className="text-red-400 text-sm">{apiErrors.ordersError}</p>
              </div>
            )}
            
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
            : 'bg-red-900/90 border-red-700 text-red-300'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            {notification.message}
          </div>
        </div>
      )}

      {/* API Errors Banner */}
      {(apiErrors.usersError || apiErrors.ordersError) && (
        <div className="mb-6 p-4 bg-amber-900/50 border border-amber-700 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="text-amber-400 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-amber-300 font-medium mb-1">Partial API Issues Detected</h3>
              <p className="text-amber-400 text-sm">
                Some functionality may be limited. The system is running with partial data.
              </p>
              {apiErrors.usersError && (
                <p className="text-amber-400 text-sm mt-1">Users API: {apiErrors.usersError}</p>
              )}
              {apiErrors.ordersError && (
                <p className="text-amber-400 text-sm mt-1">Orders API: {apiErrors.ordersError}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Orders Management
            </h1>
            <button
              onClick={fetchOrders}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-700/30"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-6 rounded-xl border border-green-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Revenue</p>
                  <p className="text-3xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 p-6 rounded-xl border border-yellow-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Processing</p>
                  <p className="text-3xl font-bold text-white">{stats.processing}</p>
                </div>
                <Package className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 p-6 rounded-xl border border-purple-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Delivered</p>
                  <p className="text-3xl font-bold text-white">{stats.delivered}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by customer name, email, or order ID..."
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
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-12 text-center">
            <Box className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No orders found</h3>
            <p className="text-slate-500">
              {searchTerm || statusFilter !== "All" 
                ? "Try adjusting your filters" 
                : "There are no orders in the database yet"}
            </p>
          </div>
        ) : (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200">
                    <th className="py-4 px-6 text-left font-bold">Order ID</th>
                    <th className="py-4 px-6 text-left font-bold">Customer</th>
                    <th className="py-4 px-6 text-left font-bold">Total</th>
                    <th className="py-4 px-6 text-left font-bold">Status</th>
                    <th className="py-4 px-6 text-left font-bold">Date</th>
                    <th className="py-4 px-6 text-left font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <tr 
                        className={`border-b border-slate-700 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer ${
                          index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
                        }`}
                        onClick={() => toggleExpandedOrder(order.id)}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-purple-300 font-bold">#{order.id}</span>
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
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-2xl font-bold text-green-400">
                            ${order.total ? order.total.toFixed(2) : 'N/A'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {editingStatus === order.id ? (
                            <div className="flex items-center gap-2">
                              <select
                                defaultValue={order.status}
                                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
                                onChange={(e) => {
                                  const newStatus = e.target.value;
                                  updateOrderStatus(order.id, newStatus, order.userId);
                                }}
                                disabled={updatingStatus}
                              >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Canceled">Canceled</option>
                              </select>
                              <button
                                onClick={() => setEditingStatus(null)}
                                className="text-slate-400 hover:text-slate-300 transition-colors"
                                disabled={updatingStatus}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${getStatusBadge(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingStatus(order.id);
                                }}
                                className="text-slate-400 hover:text-purple-400 transition-colors ml-2"
                                title="Edit Status"
                              >
                                <Edit3 size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-slate-400 font-medium">
                          {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingStatus(editingStatus === order.id ? null : order.id);
                              }}
                              className={`transition-colors ${
                                editingStatus === order.id 
                                  ? 'text-green-400 hover:text-green-300' 
                                  : 'text-slate-400 hover:text-purple-400'
                              }`}
                              title={editingStatus === order.id ? "Save Changes" : "Edit Status"}
                            >
                              {editingStatus === order.id ? <Save size={18} /> : <Edit3 size={18} />}
                            </button>
                            <div className="text-slate-600">
                              {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </div>
                        </td>
                      </tr>
                      
                      {expandedOrder === order.id && (
                        <tr className="border-b border-slate-700">
                          <td colSpan="6" className="p-0">
                            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                                  <Package className="w-5 h-5" />
                                  Order Details
                                </h4>
                                <div className="flex items-center gap-4">
                                  <div className="text-sm text-slate-400">
                                    Status: <span className={`font-semibold ${getStatusColor(order.status)}`}>
                                      {order.status}
                                    </span>
                                  </div>
                                  {editingStatus !== order.id && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingStatus(order.id);
                                      }}
                                      className="flex items-center gap-2 px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors"
                                    >
                                      <Edit3 size={14} />
                                      Update Status
                                    </button>
                                  )}
                                </div>
                              </div>
                              
                              {editingStatus === order.id && (
                                <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                                  <h5 className="text-lg font-semibold text-white mb-3">Update Order Status</h5>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['Processing', 'Shipped', 'Delivered', 'Canceled'].map(status => (
                                      <button
                                        key={status}
                                        onClick={() => updateOrderStatus(order.id, status, order.userId)}
                                        disabled={updatingStatus || order.status === status}
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
                                  <div className="flex justify-end mt-4">
                                    <button
                                      onClick={() => setEditingStatus(null)}
                                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Shipping Address and Order Summary - Side by Side */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                {/* Shipping Address Section */}
                                {order.shippingAddress && (
                                  <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600 hover:border-purple-500/50 transition-all">
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                      <div className="p-2 bg-purple-700/30 rounded-lg">
                                        <Truck className="w-5 h-5 text-purple-400" />
                                      </div>
                                      <h5 className="text-lg font-bold text-white">Shipping Address</h5>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-start gap-3">
                                        <div className="w-24 text-sm text-slate-400 font-medium">Name:</div>
                                        <div className="flex-1 text-white font-semibold">{order.shippingAddress.fullName || 'N/A'}</div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-24 text-sm text-slate-400 font-medium">Phone:</div>
                                        <div className="flex-1 text-white font-semibold">{order.shippingAddress.phone || 'N/A'}</div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-24 text-sm text-slate-400 font-medium">Address:</div>
                                        <div className="flex-1 text-white font-semibold">{order.shippingAddress.address || 'N/A'}</div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-24 text-sm text-slate-400 font-medium">City:</div>
                                        <div className="flex-1 text-white font-semibold">{order.shippingAddress.city || 'N/A'}</div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-24 text-sm text-slate-400 font-medium">State:</div>
                                        <div className="flex-1 text-white font-semibold">{order.shippingAddress.state || 'N/A'}</div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-24 text-sm text-slate-400 font-medium">Postal:</div>
                                        <div className="flex-1 text-white font-semibold">{order.shippingAddress.postalCode || order.shippingAddress.zipCode || 'N/A'}</div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <div className="w-24 text-sm text-slate-400 font-medium">Country:</div>
                                        <div className="flex-1 text-white font-semibold">{order.shippingAddress.country || 'N/A'}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Order Summary Section */}
                                <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all">
                                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
                                    <div className="p-2 bg-green-700/30 rounded-lg">
                                      <DollarSign className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h5 className="text-lg font-bold text-white">Order Summary</h5>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                      <span className="text-slate-400 font-medium">Order ID:</span>
                                      <span className="text-purple-300 font-bold">#{order.id}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                      <span className="text-slate-400 font-medium">Items Count:</span>
                                      <span className="text-white font-bold">{order.items?.length || 0} items</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                      <span className="text-slate-400 font-medium">Order Date:</span>
                                      <span className="text-white font-bold">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
                                      <span className="text-green-300 font-medium">Total Amount:</span>
                                      <span className="text-green-400 font-bold text-xl">${order.total ? order.total.toFixed(2) : 'N/A'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Order Items Section */}
                              <div>
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-blue-700/30 rounded-lg">
                                    <Box className="w-5 h-5 text-blue-400" />
                                  </div>
                                  <h5 className="text-lg font-bold text-white">Order Items</h5>
                                  <div className="flex-1 h-px bg-slate-700"></div>
                                  <span className="text-slate-400 text-sm">{order.items?.length || 0} items</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {order.items?.map(item => (
                                    <div 
                                      key={item.id} 
                                      className="bg-slate-900/70 backdrop-blur-sm border border-slate-600 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
                                    >
                                      <div className="flex items-start gap-4">
                                        <div className="w-20 h-20 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700 group-hover:border-blue-500 transition-all">
                                          {item.image ? (
                                            <img
                                              src={item.image}
                                              alt={item.name}
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
                                          <h6 className="text-white font-bold text-base mb-2 truncate group-hover:text-blue-300 transition-colors">{item.name}</h6>
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                              <span className="text-slate-400 text-sm">Qty:</span>
                                              <span className="bg-slate-800 px-3 py-1 rounded-full text-white font-bold text-sm border border-slate-700">{item.quantity}</span>
                                            </div>
                                            <div className="text-slate-400 text-sm">
                                              ${item.price ? item.price.toFixed(2) : 'N/A'} each
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                                            <span className="text-slate-400 text-sm font-medium">Subtotal:</span>
                                            <span className="text-green-400 font-bold text-lg">
                                              ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )) || (
                                    <div className="col-span-full text-center py-8 bg-slate-900/50 rounded-xl border border-slate-700">
                                      <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                                      <p className="text-slate-500 font-medium">No items found for this order</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;