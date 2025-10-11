


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../Api/Axios_Instance.jsx";
import { Package, Calendar, CreditCard, Truck, ShoppingBag, RefreshCw, Eye, ChevronDown, ChevronUp } from "lucide-react";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user) {
        setLoading(false);
        setError("Please login to view your orders.");
        return;
      }

      try {
        const userResponse = await fetch(`https://sport-x-backend-3.onrender.com/users/${user.id}`);
        
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        const userOrders = userData.orders || [];

        const enrichedOrders = userOrders.map(order => ({
          ...order,
          userId: user.id,
          userName: userData.name || userData.username || user.name || user.username || "Guest User",
          userEmail: userData.email || user.email || "No email provided",
          total: Array.isArray(order.items)
            ? order.items.reduce((sum, item) => {
                const price = item && !isNaN(Number(item.price)) ? Number(item.price) : 0;
                const qty = item && !isNaN(Number(item.quantity)) ? Number(item.quantity) : 1;
                return sum + price * qty;
              }, 0)
            : 0,
        }));

        const sortedOrders = enrichedOrders.sort((a, b) => 
          new Date(b.date || 0) - new Date(a.date || 0)
        );

        setOrders(sortedOrders);
        setError(null);
      } catch (e) {
        console.error("Failed to fetch user orders:", e);
        setError("Failed to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Canceled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "Shipped":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "Delivered":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "Canceled":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
    }
  };

  const refreshOrders = async () => {
    if (!user) return;
    
    setRefreshing(true);
    try {
      const userResponse = await fetch(`http://localhost:10000/users/${user.id}`);
      if (!userResponse.ok) throw new Error("Failed to refresh orders");
      
      const userData = await userResponse.json();
      const userOrders = userData.orders || [];

      const enrichedOrders = userOrders.map(order => ({
        ...order,
        userId: user.id,
        userName: user.name || user.username || "N/A",
        userEmail: user.email || "N/A",
        total: Array.isArray(order.items)
          ? order.items.reduce((sum, item) => {
              const price = item && !isNaN(Number(item.price)) ? Number(item.price) : 0;
              const qty = item && !isNaN(Number(item.quantity)) ? Number(item.quantity) : 1;
              return sum + price * qty;
            }, 0)
          : 0,
      }));

      const sortedOrders = enrichedOrders.sort((a, b) => 
        new Date(b.date || 0) - new Date(a.date || 0)
      );

      setOrders(sortedOrders);
      setError(null);
    } catch (e) {
      console.error("Failed to refresh orders:", e);
      setError("Failed to refresh orders. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-900 mx-auto mb-6"></div>
          <h3 className="text-2xl font-serif font-light text-slate-900 mb-2">Loading Your Orders</h3>
          <p className="text-slate-600">Retrieving your order history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-12 max-w-md">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-light text-slate-900 mb-3">Unable to Load Orders</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={refreshOrders}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all duration-300"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-light text-slate-900 mb-2 tracking-tight">
                Your Orders
              </h1>
              <div className="h-px bg-gradient-to-r from-slate-300 to-transparent max-w-md mb-3"></div>
              <p className="text-slate-600 text-base">Track and manage your order history</p>
            </div>
            <button
              onClick={refreshOrders}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Orders'}
            </button>
          </div>
        </div>

        {/* Orders Content */}
        {orders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-12">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-3xl font-serif font-light text-slate-900 mb-4">No Orders Yet</h3>
              <p className="text-slate-600 text-base mb-8 max-w-md mx-auto">
                Start your shopping journey and your orders will appear here
              </p>
              <button
                onClick={() => navigate("/more-products")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium text-base rounded-xl hover:bg-slate-800 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:border-slate-300 transition-all duration-300">
                <div 
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Order ID & Date */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Order Details</p>
                        <div className="space-y-1">
                          <p className="text-base font-semibold text-slate-900">#{order.id}</p>
                          <p className="text-sm text-slate-600">
                            {order.date ? new Date(order.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : "Date unavailable"}
                          </p>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</p>
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900">{order.userName}</p>
                          <p className="text-sm text-slate-600">{order.userEmail}</p>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Amount</p>
                        <p className="text-2xl font-semibold text-slate-900">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</p>
                        <div className="inline-flex">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border ${getStatusBadge(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Expand Button */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/payment-success/${order.id}`, {
                            state: { userId: order.userId },
                          });
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      
                      <div className="text-slate-400">
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Order Items */}
                {expandedOrder === order.id && (
                  <div className="border-t border-slate-200 bg-slate-50 p-6">
                    <h4 className="text-base font-medium text-slate-900 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-slate-600" />
                      Order Items
                    </h4>
                    
                    {order.items && order.items.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all duration-200">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl">
                                  <Package className="w-8 h-8" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-slate-900 truncate mb-1">{item.name || 'Product Name'}</h5>
                                <div className="space-y-1">
                                  <p className="text-sm text-slate-600">Qty: <span className="font-medium">{item.quantity || 1}</span></p>
                                  <p className="text-base font-semibold text-slate-900">
                                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Package className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-600 font-medium">No items found for this order</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;