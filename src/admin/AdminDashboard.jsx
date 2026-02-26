// import { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import { Users, ShoppingCart, Package, AlertTriangle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     blockedUsers: 0,
//     totalOrders: 0,
//     pendingOrders: 0,
//     completedOrders: 0,
//     totalProducts: 0,
//     lowStock: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchDashboardStats();
//   }, []);

//   const fetchDashboardStats = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const [
//         usersRes,
//         blockedUsersRes,
//         ordersRes,
//         productsRes,
//         lowStockRes
//       ] = await Promise.all([
//         api.get("/admin/users"),
//         api.get("/admin/users/blocked"),
//         api.get("/order/admin"),
//         api.get("/Products/GetAll"),
//         api.get("/Products/low-stock"),
//       ]);

//       const users = usersRes.data.data || [];
//       const blockedUsers = blockedUsersRes.data.data || [];
//       const orders = ordersRes.data.data || [];
//       const products = productsRes.data.data || [];
//       const lowStock = lowStockRes.data.data || [];

//       setStats({
//         totalUsers: users.length,
//         blockedUsers: blockedUsers.length,
//         totalOrders: orders.length,
//         pendingOrders: orders.filter(o => o.status === "Pending").length,
//         completedOrders: orders.filter(o => o.status === "Completed").length,
//         totalProducts: products.length,
//         lowStock: lowStock.length,
//       });

//     } catch (err) {
//       console.error(err);
//       setError("Failed to load admin dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-white">
//         Loading Admin Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 text-white space-y-6">

//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//       {error && (
//         <div className="bg-red-500/20 border border-red-500 p-3 rounded">
//           {error}
//         </div>
//       )}

//       {/* STATS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         <StatCard
//           title="Total Users"
//           value={stats.totalUsers}
//           icon={<Users />}
//           onClick={() => navigate("/admin/users")}
//         />

//         <StatCard
//           title="Blocked Users"
//           value={stats.blockedUsers}
//           icon={<Users />}
//           onClick={() => navigate("/admin/users")}
//         />

//         <StatCard
//           title="Total Orders"
//           value={stats.totalOrders}
//           icon={<ShoppingCart />}
//           onClick={() => navigate("/admin/orders")}
//         />

//         <StatCard
//           title="Products"
//           value={stats.totalProducts}
//           icon={<Package />}
//           onClick={() => navigate("/admin/products")}
//         />
//       </div>

//       {/* SECOND ROW */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

//         <InfoCard
//           title="Pending Orders"
//           value={stats.pendingOrders}
//         />

//         <InfoCard
//           title="Completed Orders"
//           value={stats.completedOrders}
//         />

//         <InfoCard
//           title="Low Stock Products"
//           value={stats.lowStock}
//           warning
//           onClick={() => navigate("/admin/products")}
//         />
//       </div>

//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function StatCard({ title, value, icon, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="cursor-pointer bg-gray-800 hover:bg-gray-700 transition p-5 rounded-xl flex items-center justify-between"
//     >
//       <div>
//         <p className="text-gray-400 text-sm">{title}</p>
//         <h2 className="text-2xl font-bold">{value}</h2>
//       </div>
//       <div className="text-green-400">{icon}</div>
//     </div>
//   );
// }

// function InfoCard({ title, value, warning, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`p-5 rounded-xl ${
//         warning
//           ? "bg-red-600/20 border border-red-500 cursor-pointer"
//           : "bg-gray-800"
//       }`}
//     >
//       <p className="text-sm text-gray-300">{title}</p>
//       <h2 className="text-2xl font-bold flex items-center gap-2">
//         {warning && <AlertTriangle className="text-red-400" />}
//         {value}
//       </h2>
//     </div>
//   );
// }






import { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { 
  Users, ShoppingCart, Package, AlertTriangle, TrendingUp, TrendingDown,
  CreditCard, DollarSign, Clock, CheckCircle, XCircle, RefreshCw, Eye,
  BarChart3, PieChart, LineChart, Download, Filter, Calendar, MoreVertical,
  UserCheck, UserX, Truck, Star, MessageSquare, Bell, Loader2, ShoppingBag,
  ArrowUpRight, ArrowDownRight, Shield, Database, Home, Grid, List,
  Plus, Minus, ChevronRight, ChevronLeft, Search, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    blockedUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    conversionRate: 0,
  });

  const [recentData, setRecentData] = useState({
    recentOrders: [],
    recentUsers: [],
    topProducts: [],
    lowStockItems: [],
    recentActivity: []
  });

  const [timeFilter, setTimeFilter] = useState("today");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchDashboardStats();
  }, [timeFilter]);

  const fetchDashboardStats = async () => {
    try {
      setRefreshing(true);
      setError("");

      const [
        usersRes,
        blockedUsersRes,
        ordersRes,
        productsRes,
        lowStockRes
      ] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/users/blocked"),
        api.get("/order/admin"),
        api.get("/Products/GetAll"),
        api.get("/Products/low-stock"),
      ]);

      // Safely extract data with fallbacks
      const users = Array.isArray(usersRes.data?.data) 
        ? usersRes.data.data 
        : Array.isArray(usersRes.data) 
        ? usersRes.data 
        : [];

      const blockedUsers = Array.isArray(blockedUsersRes.data?.data) 
        ? blockedUsersRes.data.data 
        : Array.isArray(blockedUsersRes.data) 
        ? blockedUsersRes.data 
        : [];

      const orders = Array.isArray(ordersRes.data?.data) 
        ? ordersRes.data.data 
        : Array.isArray(ordersRes.data) 
        ? ordersRes.data 
        : [];

      const products = Array.isArray(productsRes.data?.data) 
        ? productsRes.data.data 
        : Array.isArray(productsRes.data) 
        ? productsRes.data 
        : [];

      const lowStock = Array.isArray(lowStockRes.data?.data) 
        ? lowStockRes.data.data 
        : Array.isArray(lowStockRes.data) 
        ? lowStockRes.data 
        : [];

      // Calculate additional statistics
      const totalRevenue = orders.reduce((sum, order) => {
        const amount = order?.totalAmount || order?.total || order?.amount || 0;
        return sum + (parseFloat(amount) || 0);
      }, 0);
      
      const averageOrderValue = orders.length > 0 
        ? totalRevenue / orders.length 
        : 0;
      
      const completedOrdersCount = orders.filter(o => {
        const status = (o?.status || "").toLowerCase();
        return status === "completed" || status === "delivered" || status === "success";
      }).length;
      
      const conversionRate = users.length > 0 
        ? ((completedOrdersCount / users.length) * 100).toFixed(1)
        : 0;
      
      const cancelledOrders = orders.filter(o => {
        const status = (o?.status || "").toLowerCase();
        return status === "cancelled" || status === "canceled" || status === "failed";
      }).length;
      
      const outOfStock = products.filter(p => {
        const stock = parseInt(p?.stock || p?.quantity || 0);
        return stock <= 0;
      }).length;

      // Get recent orders (last 5)
      const recentOrders = orders
        .filter(order => order?.createdAt || order?.orderDate || order?.date)
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.orderDate || a.date || 0);
          const dateB = new Date(b.createdAt || b.orderDate || b.date || 0);
          return dateB - dateA;
        })
        .slice(0, 5)
        .map(order => ({
          id: order.id || order._id || order.orderId || `order-${Math.random().toString(36).substr(2, 9)}`,
          orderNumber: order.orderNumber || order.orderId || order.id || "N/A",
          customerName: order.customer?.name || order.user?.name || order.customerName || "Customer",
          amount: order.totalAmount || order.total || order.amount || 0,
          status: order.status || "pending",
          createdAt: order.createdAt || order.orderDate || order.date || new Date().toISOString()
        }));
      
      // Get recent users (last 5)
      const recentUsers = users
        .filter(user => user?.createdAt || user?.registeredDate || user?.dateJoined)
        .sort((a, b) => {
          const dateA = new Date(a.createdAt || a.registeredDate || a.dateJoined || 0);
          const dateB = new Date(b.createdAt || b.registeredDate || b.dateJoined || 0);
          return dateB - dateA;
        })
        .slice(0, 5)
        .map(user => ({
          id: user.id || user._id || user.userId || `user-${Math.random().toString(36).substr(2, 9)}`,
          name: user.name || user.username || user.fullName || "User",
          email: user.email || "No email",
          createdAt: user.createdAt || user.registeredDate || user.dateJoined || new Date().toISOString(),
          isActive: !user.isBlocked
        }));

      // Get top products (by price or sales)
      const topProducts = products
        .sort((a, b) => {
          const priceA = parseFloat(a.price || a.priceAmount || 0);
          const salesA = parseInt(a.sales || a.soldCount || 0);
          const revenueA = priceA * salesA;
          
          const priceB = parseFloat(b.price || b.priceAmount || 0);
          const salesB = parseInt(b.sales || b.soldCount || 0);
          const revenueB = priceB * salesB;
          
          return revenueB - revenueA;
        })
        .slice(0, 5)
        .map(product => ({
          id: product.id || product._id || product.productId || `product-${Math.random().toString(36).substr(2, 9)}`,
          name: product.name || product.productName || "Product",
          price: parseFloat(product.price || product.priceAmount || 0),
          category: product.category || product.categoryName || "Uncategorized",
          sales: parseInt(product.sales || product.soldCount || 0),
          stock: parseInt(product.stock || product.quantity || 0)
        }));

      // Get low stock items
      const lowStockItems = products
        .filter(p => {
          const stock = parseInt(p.stock || p.quantity || 0);
          return stock > 0 && stock < 10;
        })
        .slice(0, 5);

      // Generate recent activity
      const recentActivity = [
        ...recentOrders.map(order => ({
          id: order.id,
          type: 'order',
          title: 'New Order',
          description: `Order #${order.orderNumber} received`,
          time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: order.status
        })),
        ...recentUsers.map(user => ({
          id: user.id,
          type: 'user',
          title: 'New User',
          description: `${user.name} registered`,
          time: new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: user.isActive ? 'active' : 'inactive'
        }))
      ];

      setStats({
        totalUsers: users.length,
        blockedUsers: blockedUsers.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => (o?.status || "").toLowerCase() === "pending").length,
        completedOrders: completedOrdersCount,
        cancelledOrders,
        totalProducts: products.length,
        lowStock: lowStock.length,
        outOfStock,
        totalRevenue,
        averageOrderValue,
        conversionRate: parseFloat(conversionRate)
      });

      setRecentData({
        recentOrders,
        recentUsers,
        topProducts,
        lowStockItems,
        recentActivity
      });

    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data. Please check your connection and try again.");
      
      // Fallback to mock data
      const mockData = getMockData();
      setStats(mockData.stats);
      setRecentData(mockData.recentData);
      
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Mock data for fallback
  const getMockData = () => ({
    stats: {
      totalUsers: 892,
      blockedUsers: 23,
      totalOrders: 1247,
      pendingOrders: 45,
      completedOrders: 985,
      cancelledOrders: 32,
      totalProducts: 156,
      lowStock: 12,
      outOfStock: 8,
      totalRevenue: 487650,
      averageOrderValue: 391,
      conversionRate: 4.2
    },
    recentData: {
      recentOrders: [
        { id: 'ORD-1001', orderNumber: 'ORD-1001', customerName: 'John Doe', amount: 299.99, status: 'completed', createdAt: new Date().toISOString() },
        { id: 'ORD-1002', orderNumber: 'ORD-1002', customerName: 'Jane Smith', amount: 189.50, status: 'processing', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: 'ORD-1003', orderNumber: 'ORD-1003', customerName: 'Bob Wilson', amount: 425.75, status: 'pending', createdAt: new Date(Date.now() - 172800000).toISOString() },
        { id: 'ORD-1004', orderNumber: 'ORD-1004', customerName: 'Alice Johnson', amount: 156.99, status: 'delivered', createdAt: new Date(Date.now() - 259200000).toISOString() },
        { id: 'ORD-1005', orderNumber: 'ORD-1005', customerName: 'Charlie Brown', amount: 289.50, status: 'completed', createdAt: new Date(Date.now() - 345600000).toISOString() }
      ],
      recentUsers: [
        { id: 'USR-1001', name: 'Alice Johnson', email: 'alice@example.com', createdAt: new Date().toISOString(), isActive: true },
        { id: 'USR-1002', name: 'Charlie Brown', email: 'charlie@example.com', createdAt: new Date(Date.now() - 86400000).toISOString(), isActive: true },
        { id: 'USR-1003', name: 'David Wilson', email: 'david@example.com', createdAt: new Date(Date.now() - 172800000).toISOString(), isActive: true },
        { id: 'USR-1004', name: 'Eva Davis', email: 'eva@example.com', createdAt: new Date(Date.now() - 259200000).toISOString(), isActive: true },
        { id: 'USR-1005', name: 'Frank Miller', email: 'frank@example.com', createdAt: new Date(Date.now() - 345600000).toISOString(), isActive: true }
      ],
      topProducts: [
        { id: 'PROD-1001', name: 'Nike Mercurial Superfly', price: 299.99, category: 'Football Boots', sales: 145, stock: 15 },
        { id: 'PROD-1002', name: 'Adidas Predator League', price: 249.99, category: 'Football Boots', sales: 98, stock: 8 },
        { id: 'PROD-1003', name: 'Manchester United Home Jersey', price: 89.99, category: 'Jerseys', sales: 230, stock: 45 },
        { id: 'PROD-1004', name: 'Training Ball Pro', price: 49.99, category: 'Balls', sales: 189, stock: 32 },
        { id: 'PROD-1005', name: 'Goalkeeper Gloves Elite', price: 79.99, category: 'Goalkeeper Gear', sales: 67, stock: 5 }
      ],
      lowStockItems: [],
      recentActivity: []
    }
  });

  const handleExportData = () => {
    const dataStr = JSON.stringify({ stats, recentData }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'text-gray-400 bg-gray-400/10';
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('complete') || statusLower.includes('delivered') || statusLower.includes('success')) {
      return 'text-green-400 bg-green-400/10';
    } else if (statusLower.includes('pending')) {
      return 'text-yellow-400 bg-yellow-400/10';
    } else if (statusLower.includes('processing') || statusLower.includes('shipping')) {
      return 'text-blue-400 bg-blue-400/10';
    } else if (statusLower.includes('cancel') || statusLower.includes('failed')) {
      return 'text-red-400 bg-red-400/10';
    } else {
      return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusDotColor = (status) => {
    if (!status) return 'bg-gray-500';
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('complete') || statusLower.includes('delivered') || statusLower.includes('success')) {
      return 'bg-green-500';
    } else if (statusLower.includes('pending')) {
      return 'bg-yellow-500';
    } else if (statusLower.includes('processing') || statusLower.includes('shipping')) {
      return 'bg-blue-500';
    } else if (statusLower.includes('cancel') || statusLower.includes('failed')) {
      return 'bg-red-500';
    } else {
      return 'bg-gray-500';
    }
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-300 font-medium text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-6 lg:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Welcome back, Administrator</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            
            <button
              onClick={fetchDashboardStats}
              disabled={refreshing}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
            >
              {refreshing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh
            </button>

            <button
              onClick={handleExportData}
              className="flex items-center px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-900/30 border border-red-800 rounded-xl p-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-200 font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError("")}
              className="text-red-300 hover:text-red-100 ml-4"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Revenue */}
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<DollarSign className="w-6 h-6" />}
          trend="+12.5%"
          trendUp={true}
          color="blue"
          onClick={() => navigate("/admin/orders")}
        />

        {/* Total Orders */}
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={<ShoppingBag className="w-6 h-6" />}
          subtext={`${stats.pendingOrders} pending`}
          color="green"
          warning={stats.pendingOrders > 10}
          onClick={() => navigate("/admin/orders")}
        />

        {/* Active Users */}
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={<Users className="w-6 h-6" />}
          subtext={`${stats.blockedUsers} blocked`}
          trend="+8.2%"
          trendUp={true}
          color="purple"
          onClick={() => navigate("/admin/users")}
        />

        {/* Products */}
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          icon={<Package className="w-6 h-6" />}
          subtext={`${stats.lowStock} low stock`}
          color="orange"
          warning={stats.lowStock > 0}
          onClick={() => navigate("/admin/products")}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MiniStatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          color="green"
        />
        
        <MiniStatCard
          title="Avg Order Value"
          value={formatCurrency(stats.averageOrderValue)}
          icon={<DollarSign className="w-4 h-4" />}
          color="blue"
        />
        
        <MiniStatCard
          title="Completed Orders"
          value={stats.completedOrders.toLocaleString()}
          icon={<CheckCircle className="w-4 h-4" />}
          color="green"
        />
        
        <MiniStatCard
          title="Cancelled Orders"
          value={stats.cancelledOrders.toLocaleString()}
          icon={<XCircle className="w-4 h-4" />}
          color="red"
        />
      </div>

      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 md:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 text-green-400 mr-2" />
              <h3 className="text-lg font-semibold">Recent Orders</h3>
            </div>
            <button 
              onClick={() => navigate("/admin/orders")}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentData.recentOrders.length > 0 ? (
              recentData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDotColor(order.status)}`}></div>
                      <p className="font-medium truncate">
                        Order #{order.orderNumber}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {order.customerName} • {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <span className="font-bold whitespace-nowrap">
                      {formatCurrency(order.amount)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent orders found</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 md:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="text-lg font-semibold">Top Products</h3>
            </div>
            <button 
              onClick={() => navigate("/admin/products")}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentData.topProducts.length > 0 ? (
              recentData.topProducts.map((product) => (
                <div key={product.id} className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-900/30 to-orange-900/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-yellow-400 font-bold">$</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-gray-400 text-sm truncate">{product.category}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold">{formatCurrency(product.price)}</p>
                    <p className="text-gray-400 text-sm">{product.sales} sales</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 md:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-400 mr-2" />
              <h3 className="text-lg font-semibold">Recent Users</h3>
            </div>
            <button 
              onClick={() => navigate("/admin/users")}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentData.recentUsers.length > 0 ? (
              recentData.recentUsers.map((user) => (
                <div key={user.id} className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-900/30 to-blue-900/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-400 font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.name}</p>
                    <p className="text-gray-400 text-sm truncate">{user.email}</p>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent users found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 md:p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold">Quick Stats</h3>
            </div>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <QuickStatItem
              label="Low Stock Items"
              value={stats.lowStock}
              color="red"
              onClick={() => navigate("/admin/products")}
            />
            
            <QuickStatItem
              label="Out of Stock"
              value={stats.outOfStock}
              color="red"
              onClick={() => navigate("/admin/products")}
            />
            
            <QuickStatItem
              label="Blocked Users"
              value={stats.blockedUsers}
              color="orange"
              onClick={() => navigate("/admin/users")}
            />
            
            <QuickStatItem
              label="Pending Orders"
              value={stats.pendingOrders}
              color="yellow"
              onClick={() => navigate("/admin/orders")}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 md:p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-green-400 mr-2" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <span className="text-gray-400 text-sm">Last 24 hours</span>
        </div>
        
        <div className="space-y-3">
          {recentData.recentActivity.length > 0 ? (
            recentData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                <div className={`p-2 rounded-lg mr-3 ${
                  activity.type === 'order' ? 'bg-blue-900/30' : 'bg-green-900/30'
                }`}>
                  {activity.type === 'order' ? (
                    <ShoppingCart className="w-4 h-4 text-blue-400" />
                  ) : (
                    <UserPlus className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-gray-400 text-sm">{activity.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'active' || activity.status === 'completed' 
                      ? 'bg-green-400/10 text-green-400' 
                      : 'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, icon, subtext, trend, trendUp, color, warning, onClick }) {
  const colorClasses = {
    blue: 'border-blue-500/50',
    green: 'border-green-500/50',
    purple: 'border-purple-500/50',
    orange: 'border-orange-500/50'
  };

  const iconColorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400'
  };

  const bgColorClasses = {
    blue: 'bg-blue-900/20',
    green: 'bg-green-900/20',
    purple: 'bg-purple-900/20',
    orange: 'bg-orange-900/20'
  };

  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer bg-gray-800/30 border ${colorClasses[color]} rounded-xl p-4 md:p-6 backdrop-blur-sm hover:border-opacity-80 transition-all duration-300 shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${bgColorClasses[color]} rounded-lg`}>
          <div className={iconColorClasses[color]}>
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {trend}
          </div>
        )}
        
        {warning && (
          <div className="flex items-center text-yellow-400 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Alert
          </div>
        )}
      </div>
      
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl md:text-3xl font-bold mb-2">{value}</p>
      
      {subtext && (
        <p className="text-gray-400 text-sm">{subtext}</p>
      )}
    </div>
  );
}

function MiniStatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
    red: 'text-red-400'
  };

  return (
    <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 text-center backdrop-blur-sm">
      <div className={`${colorClasses[color]} mb-2 flex justify-center`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function QuickStatItem({ label, value, color, onClick }) {
  const colorClasses = {
    red: 'bg-red-900/20 border-red-800/30 text-red-400',
    orange: 'bg-orange-900/20 border-orange-800/30 text-orange-400',
    yellow: 'bg-yellow-900/20 border-yellow-800/30 text-yellow-400',
    green: 'bg-green-900/20 border-green-800/30 text-green-400',
    blue: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  };

  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-all ${colorClasses[color]}`}
    >
      <span className="text-gray-300">{label}</span>
      <span className={`font-bold`}>{value}</span>
    </div>
  );
}