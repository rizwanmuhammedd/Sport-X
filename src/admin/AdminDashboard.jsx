






// import React, { useState, useEffect } from "react";

// const AdminDashboard = () => {
//   const [data, setData] = useState({ products: [], analytics: {} });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [refreshing, setRefreshing] = useState(false);
//   const [usingMockData, setUsingMockData] = useState(false);

//   // Generate comprehensive mock data
//   const generateMockData = () => {
//     const categories = ['Football Boots', 'Jerseys', 'Training Gear', 'Balls', 'Goalkeeper Gear', 'Accessories'];
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
//     return {
//       products: Array.from({ length: 150 }, (_, i) => ({
//         id: i + 1,
//         name: `Product ${i + 1}`,
//         price: Math.floor(Math.random() * 300) + 20,
//         category: categories[Math.floor(Math.random() * categories.length)],
//         stock: Math.floor(Math.random() * 200),
//         sales: Math.floor(Math.random() * 500),
//         rating: (Math.random() * 2 + 3).toFixed(1)
//       })),
//       analytics: {
//         totalRevenue: 487650,
//         totalOrders: 1247,
//         activeUsers: 892,
//         conversionRate: 4.2,
//         monthlyRevenue: months.map(month => ({
//           name: month,
//           revenue: Math.floor(Math.random() * 50000) + 30000,
//           orders: Math.floor(Math.random() * 150) + 80,
//           users: Math.floor(Math.random() * 100) + 60
//         })),
//         categoryPerformance: categories.map(category => ({
//           name: category,
//           sales: Math.floor(Math.random() * 15000) + 5000,
//           profit: Math.floor(Math.random() * 8000) + 2000,
//           growth: Math.floor(Math.random() * 30) + 5
//         })),
//         topProducts: Array.from({ length: 10 }, (_, i) => ({
//           name: `Top Product ${i + 1}`,
//           sales: Math.floor(Math.random() * 1000) + 500,
//           revenue: Math.floor(Math.random() * 50000) + 20000
//         }))
//       }
//     };
//   };

//   // Process orders data for analytics
//   const processOrdersForAnalytics = (orders, users, products) => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
//     // Calculate total revenue from orders
//     const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
    
//     // Count active users
//     const activeUsers = users.filter(user => user.isAuthenticated).length;
    
//     // Calculate conversion rate (orders vs users)
//     const conversionRate = users.length > 0 ? ((orders.length / users.length) * 100).toFixed(1) : 0;
    
//     // Group orders by month for revenue trend
//     const monthlyRevenue = months.map(month => {
//       const monthOrders = orders.filter(order => {
//         if (order.createdAt || order.date) {
//           const orderDate = new Date(order.createdAt || order.date);
//           return orderDate.getMonth() === months.indexOf(month);
//         }
//         return false;
//       });
      
//       const monthRevenue = monthOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
//       const monthOrderCount = monthOrders.length;
//       const monthUsers = Math.floor(monthOrderCount * 1.5); // Estimate users from orders
      
//       return {
//         name: month,
//         revenue: monthRevenue,
//         orders: monthOrderCount,
//         users: monthUsers
//       };
//     });
    
//     // Group products by category for performance analysis
//     const categoryMap = {};
//     products.forEach(product => {
//       const category = product.category || 'Other';
//       if (!categoryMap[category]) {
//         categoryMap[category] = { name: category, sales: 0, profit: 0, growth: 0 };
//       }
//       categoryMap[category].sales += parseFloat(product.price || 0) * (product.stock || 1);
//       categoryMap[category].profit += parseFloat(product.price || 0) * 0.3; // 30% profit margin
//       categoryMap[category].growth = Math.floor(Math.random() * 30) + 5; // Random growth for demo
//     });
    
//     const categoryPerformance = Object.values(categoryMap);
    
//     // Create top products from existing products
//     const topProducts = products
//       .sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0))
//       .slice(0, 10)
//       .map(product => ({
//         name: product.name || `Product ${product.id}`,
//         sales: Math.floor(Math.random() * 1000) + 100,
//         revenue: parseFloat(product.price || 0) * Math.floor(Math.random() * 50) + 10
//       }));
    
//     return {
//       totalRevenue,
//       totalOrders: orders.length,
//       activeUsers,
//       conversionRate: parseFloat(conversionRate),
//       monthlyRevenue,
//       categoryPerformance,
//       topProducts
//     };
//   };

//   // Fetch dashboard data from your Api database
//   const fetchDashboardData = async () => {
//     try {
//       setError(null);
//       setRefreshing(true);
      
//       try {
//         // Fetch data from your Api database (assuming json-server on port 3000)
//         const [productsResponse, usersResponse, ordersResponse] = await Promise.all([
//           fetch('http://localhost:3000/products').then(res => {
//             if (!res.ok) throw new Error('Products API failed');
//             return res.json();
//           }),
//           fetch('http://localhost:3000/users').then(res => {
//             if (!res.ok) throw new Error('Users API failed');
//             return res.json();
//           }),
//           fetch('http://localhost:3000/orders').then(res => {
//             if (!res.ok) throw new Error('Orders API failed');
//             return res.json();
//           })
//         ]);

//         // Process the data for analytics
//         const analytics = processOrdersForAnalytics(ordersResponse, usersResponse, productsResponse);

//         setData({
//           products: productsResponse,
//           users: usersResponse,
//           orders: ordersResponse,
//           analytics: analytics
//         });
//         setUsingMockData(false);
//         setError(null);
        
//       } catch (apiError) {
//         console.log("Api database not available, using demo data:", apiError.message);
//         const mockData = generateMockData();
//         setData(mockData);
//         setUsingMockData(true);
//         setError("Api database not connected. Make sure json-server is running on port 3000.");
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       const mockData = generateMockData();
//       setData(mockData);
//       setUsingMockData(true);
//       setError("Connection failed. Using demo data for visualization.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const refreshData = async () => {
//     await fetchDashboardData();
//   };

//   // Dark theme stat card component
//   const StatCard = ({ title, value, change, icon, color, onClick }) => (
//     <div 
//       className={`bg-gray-800 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden backdrop-blur-sm`}
//       onClick={onClick}
//     >
//       <div className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</p>
//             <p className="text-3xl font-bold text-white mt-2">{value}</p>
//             {change && (
//               <div className="flex items-center mt-2">
//                 <span className={`text-sm font-semibold ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
//                   {change > 0 ? '+' : ''}{change}%
//                 </span>
//                 <span className="text-gray-500 text-sm ml-1">vs last month</span>
//               </div>
//             )}
//           </div>
//           <div className={`p-4 rounded-full bg-gradient-to-r ${color} shadow-lg`}>
//             {icon}
//           </div>
//         </div>
//       </div>
//       <div className={`h-2 bg-gradient-to-r ${color}`}></div>
//     </div>
//   );

//   // Dark theme metric card
//   const MetricCard = ({ title, value, subtitle, progress, color }) => (
//     <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
//         <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
//       </div>
//       <div className="text-3xl font-bold text-white mb-2">{value}</div>
//       <div className="text-sm text-gray-400 mb-4">{subtitle}</div>
//       <div className="w-full bg-gray-700 rounded-full h-2">
//         <div 
//           className={`h-2 rounded-full bg-gradient-to-r from-${color}-400 to-${color}-600 transition-all duration-1000`}
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//       <div className="text-right text-sm text-gray-500 mt-1">{progress}%</div>
//     </div>
//   );

//   // Custom Chart Components
//   const BarChart = ({ data, title, color = "green" }) => {
//     const maxValue = Math.max(...data.map(item => item.value || item.sales || 0));
//     const colors = {
//       green: 'from-green-500 to-green-600',
//       blue: 'from-blue-500 to-blue-600',
//       purple: 'from-purple-500 to-purple-600',
//       orange: 'from-orange-500 to-orange-600'
//     };
    
//     return (
//       <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
//         <h3 className="text-xl font-bold text-white mb-6 flex items-center">
//           <div className={`w-3 h-3 bg-${color}-500 rounded-full mr-3`}></div>
//           {title}
//         </h3>
//         <div className="space-y-4">
//           {data.map((item, index) => (
//             <div key={index} className="group">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium text-gray-300">{item.name || item.label}</span>
//                 <span className="text-sm font-bold text-green-400">{item.value || item.sales}</span>
//               </div>
//               <div className="relative">
//                 <div className="w-full bg-gray-700 rounded-full h-3">
//                   <div
//                     className={`h-3 rounded-full bg-gradient-to-r ${colors[color]} transition-all duration-1000 ease-out group-hover:scale-105`}
//                     style={{ width: `${((item.value || item.sales) / maxValue) * 100}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const LineChart = ({ data, title }) => {
//     const maxValue = Math.max(...data.map(item => item.revenue || 0));
    
//     return (
//       <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
//         <h3 className="text-xl font-bold text-white mb-6 flex items-center">
//           <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
//           {title}
//         </h3>
//         <div className="h-64 flex items-end justify-between space-x-2">
//           {data.map((item, index) => {
//             const height = ((item.revenue || 0) / maxValue) * 100;
//             return (
//               <div key={index} className="flex flex-col items-center flex-1">
//                 <div
//                   className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-md transition-all duration-1000 hover:from-green-400 hover:to-green-300"
//                   style={{ height: `${height}%` }}
//                 ></div>
//                 <span className="text-xs text-gray-400 mt-2 transform rotate-45 origin-left">
//                   {item.name}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const PieChart = ({ data, title }) => {
//     const total = data.reduce((sum, item) => sum + (item.sales || 0), 0);
//     const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
    
//     return (
//       <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
//         <h3 className="text-xl font-bold text-white mb-6 flex items-center">
//           <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
//           {title}
//         </h3>
//         <div className="flex items-center justify-center">
//           <div className="relative w-48 h-48">
//             <div className="w-48 h-48 rounded-full overflow-hidden">
//               {data.map((item, index) => {
//                 const percentage = ((item.sales || 0) / total) * 100;
//                 return (
//                   <div
//                     key={index}
//                     className="absolute inset-0 rounded-full"
//                     style={{
//                       background: `conic-gradient(${colors[index % colors.length]} 0% ${percentage}%, transparent ${percentage}% 100%)`,
//                       transform: `rotate(${data.slice(0, index).reduce((sum, prev) => sum + ((prev.sales || 0) / total) * 360, 0)}deg)`
//                     }}
//                   ></div>
//                 );
//               })}
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-700"></div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 space-y-2">
//           {data.map((item, index) => (
//             <div key={index} className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div 
//                   className="w-3 h-3 rounded-full mr-2"
//                   style={{ backgroundColor: colors[index % colors.length] }}
//                 ></div>
//                 <span className="text-gray-300 text-sm">{item.name}</span>
//               </div>
//               <span className="text-white font-semibold">
//                 {Math.round(((item.sales || 0) / total) * 100)}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
//           <p className="mt-4 text-gray-300 font-medium text-lg">Loading Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   const mockData = data.analytics || {};

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl mr-4 shadow-lg">
//                 <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.06 3.75c.29-.14.62-.14.91 0L16.5 7.5c.14.07.25.2.3.35l1.5 4.5c.07.2.04.42-.08.6L16.5 16.5c-.05.15-.16.28-.3.35l-4.65 1.75c-.29.14-.62.14-.91 0L5.99 16.85c-.14-.07-.25-.2-.3-.35L4.19 12c-.07-.2-.04-.42.08-.6L5.99 7.85c.05-.15.16-.28.3-.35L10.94 5.75z"/>
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold text-white">Football Store Analytics</h1>
//                 <p className="text-gray-400 text-lg mt-1">Professional dashboard for business insights</p>
//               </div>
//             </div>
//             <button
//               onClick={refreshData}
//               disabled={refreshing}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center"
//             >
//               <svg className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               {refreshing ? 'Updating...' : 'Refresh Data'}
//             </button>
//           </div>

//           {/* Status Messages */}
//           {error && (
//             <div className="mt-4 bg-blue-900 bg-opacity-50 border border-blue-600 p-4 rounded-lg backdrop-blur-sm">
//               <div className="flex">
//                 <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                 </svg>
//                 <span className="text-blue-200 font-medium">{error}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Navigation */}
//         <div className="mb-8">
//           <div className="border border-gray-700 bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm">
//             <nav className="flex px-6">
//               {['overview', 'analytics'].map(tab => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-4 px-8 font-semibold text-sm capitalize transition-all duration-300 border-b-2 ${
//                     activeTab === tab
//                       ? 'border-green-500 text-green-400 bg-gray-700'
//                       : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700'
//                   }`}
//                 >
//                   {tab === 'overview' && <span className="mr-2">📊</span>}
//                   {tab === 'analytics' && <span className="mr-2">📈</span>}
//                   {tab}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-8">
            
//             {/* KPI Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <StatCard
//                 title="Total Revenue"
//                 value={`$${(mockData.totalRevenue || 487650).toLocaleString()}`}
//                 change={23}
//                 color="from-green-500 to-green-600"
//                 icon={
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//                   </svg>
//                 }
//               />
//               <StatCard
//                 title="Total Orders"
//                 value={(mockData.totalOrders || 1247).toLocaleString()}
//                 change={15}
//                 color="from-blue-500 to-blue-600"
//                 icon={
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                 }
//               />
//               <StatCard
//                 title="Active Users"
//                 value={(mockData.activeUsers || 892).toLocaleString()}
//                 change={12}
//                 color="from-purple-500 to-purple-600"
//                 icon={
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                   </svg>
//                 }
//               />
//               <StatCard
//                 title="Conversion Rate"
//                 value={`${mockData.conversionRate || 4.2}%`}
//                 change={8}
//                 color="from-orange-500 to-orange-600"
//                 icon={
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                   </svg>
//                 }
//               />
//             </div>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <LineChart data={mockData.monthlyRevenue || []} title="Monthly Revenue Trend" />
//               <PieChart data={mockData.categoryPerformance || []} title="Category Performance" />
//             </div>

//             {/* Performance Metrics */}
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               <MetricCard 
//                 title="Customer Satisfaction" 
//                 value="92%" 
//                 subtitle="Based on reviews"
//                 progress={92}
//                 color="green"
//               />
//               <MetricCard 
//                 title="Order Fulfillment" 
//                 value="88%" 
//                 subtitle="On-time delivery"
//                 progress={88}
//                 color="blue"
//               />
//               <MetricCard 
//                 title="Inventory Turnover" 
//                 value="6.2x" 
//                 subtitle="Annual rotation"
//                 progress={75}
//                 color="purple"
//               />
//               <MetricCard 
//                 title="Return Rate" 
//                 value="2.1%" 
//                 subtitle="Quality indicator"
//                 progress={21}
//                 color="red"
//               />
//             </div>

//             {/* Additional Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <BarChart data={mockData.topProducts?.slice(0, 6) || []} title="Top Products Performance" color="green" />
              
//               {/* Quick Stats Grid */}
//               <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
//                 <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gray-700 p-4 rounded-lg text-center">
//                     <div className="text-2xl font-bold text-green-400">24</div>
//                     <div className="text-gray-300 text-sm">Countries</div>
//                   </div>
//                   <div className="bg-gray-700 p-4 rounded-lg text-center">
//                     <div className="text-2xl font-bold text-blue-400">1.2M</div>
//                     <div className="text-gray-300 text-sm">Page Views</div>
//                   </div>
//                   <div className="bg-gray-700 p-4 rounded-lg text-center">
//                     <div className="text-2xl font-bold text-purple-400">4.8</div>
//                     <div className="text-gray-300 text-sm">Avg Rating</div>
//                   </div>
//                   <div className="bg-gray-700 p-4 rounded-lg text-center">
//                     <div className="text-2xl font-bold text-orange-400">156</div>
//                     <div className="text-gray-300 text-sm">Products</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         )}

//         {/* Analytics Tab */}
//         {activeTab === 'analytics' && (
//           <div className="space-y-8">
            
//             {/* Advanced KPIs */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
//                 <h4 className="text-lg font-semibold opacity-90">Customer LTV</h4>
//                 <p className="text-3xl font-bold mt-2">$892</p>
//                 <p className="text-sm opacity-80 mt-2">18% increase from last quarter</p>
//               </div>
//               <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
//                 <h4 className="text-lg font-semibold opacity-90">Cart Abandonment</h4>
//                 <p className="text-3xl font-bold mt-2">24.3%</p>
//                 <p className="text-sm opacity-80 mt-2">5% improvement this month</p>
//               </div>
//               <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
//                 <h4 className="text-lg font-semibold opacity-90">Average Order Value</h4>
//                 <p className="text-3xl font-bold mt-2">$147</p>
//                 <p className="text-sm opacity-80 mt-2">$23 increase from last month</p>
//               </div>
//               <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
//                 <h4 className="text-lg font-semibold opacity-90">Customer Retention</h4>
//                 <p className="text-3xl font-bold mt-2">76.8%</p>
//                 <p className="text-sm opacity-80 mt-2">8.2% improvement</p>
//               </div>
//             </div>

//             {/* Advanced Analytics Charts */}
//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//               <BarChart data={mockData.categoryPerformance || []} title="Revenue Breakdown by Category" color="blue" />
              
//               {/* Sales Funnel */}
//               <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
//                 <h3 className="text-xl font-bold text-white mb-6">Sales Funnel Analysis</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
//                     <span className="text-gray-300 font-medium">Website Visitors</span>
//                     <span className="text-white font-bold text-lg">10,847</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-4">
//                     <span className="text-gray-300 font-medium">Product Views</span>
//                     <span className="text-blue-400 font-bold text-lg">4,923</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-8">
//                     <span className="text-gray-300 font-medium">Add to Cart</span>
//                     <span className="text-green-400 font-bold text-lg">1,687</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-12">
//                     <span className="text-gray-300 font-medium">Checkout Started</span>
//                     <span className="text-yellow-400 font-bold text-lg">892</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-16">
//                     <span className="text-gray-300 font-medium">Completed Orders</span>
//                     <span className="text-purple-400 font-bold text-lg">456</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Comprehensive Metrics Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 text-center backdrop-blur-sm">
//                 <div className="text-3xl font-bold text-green-400 mb-2">94.2%</div>
//                 <div className="text-gray-300 font-medium">Customer Satisfaction</div>
//                 <div className="text-gray-500 text-sm">Based on 1,247 reviews</div>
//               </div>
//               <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 text-center backdrop-blur-sm">
//                 <div className="text-3xl font-bold text-blue-400 mb-2">3.8s</div>
//                 <div className="text-gray-300 font-medium">Page Load Time</div>
//                 <div className="text-gray-500 text-sm">15% faster than industry avg</div>
//               </div>
//               <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 text-center backdrop-blur-sm">
//                 <div className="text-3xl font-bold text-purple-400 mb-2">67%</div>
//                 <div className="text-gray-300 font-medium">Mobile Traffic</div>
//                 <div className="text-gray-500 text-sm">Growing 23% monthly</div>
//               </div>
//             </div>

//             {/* Real-time Activity */}
//             <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
//               <h3 className="text-xl font-bold text-white mb-6">Real-time Activity</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center p-3 bg-gray-700 rounded-lg">
//                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
//                   <div className="flex-1">
//                     <p className="text-white text-sm">New order from Manchester</p>
//                     <p className="text-gray-400 text-xs">2 minutes ago</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center p-3 bg-gray-700 rounded-lg">
//                   <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-3"></div>
//                   <div className="flex-1">
//                     <p className="text-white text-sm">Football boots restocked</p>
//                     <p className="text-gray-400 text-xs">5 minutes ago</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center p-3 bg-gray-700 rounded-lg">
//                   <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mr-3"></div>
//                   <div className="flex-1">
//                     <p className="text-white text-sm">High traffic detected</p>
//                     <p className="text-gray-400 text-xs">8 minutes ago</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center p-3 bg-gray-700 rounded-lg">
//                   <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse mr-3"></div>
//                   <div className="flex-1">
//                     <p className="text-white text-sm">New user registered</p>
//                     <p className="text-gray-400 text-xs">12 minutes ago</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Performance Heat Map */}
//             <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
//               <h3 className="text-xl font-bold text-white mb-6">Performance Heat Map</h3>
//               <div className="grid grid-cols-7 gap-2">
//                 {Array.from({ length: 35 }, (_, i) => (
//                   <div 
//                     key={i}
//                     className={`aspect-square rounded-lg ${
//                       Math.random() > 0.7 ? 'bg-green-500' :
//                       Math.random() > 0.5 ? 'bg-green-400' :
//                       Math.random() > 0.3 ? 'bg-green-300' :
//                       Math.random() > 0.1 ? 'bg-green-200' : 'bg-gray-700'
//                     }`}
//                     title={`Day ${i + 1}: ${Math.floor(Math.random() * 100)} orders`}
//                   ></div>
//                 ))}
//               </div>
//               <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
//                 <span>Less</span>
//                 <div className="flex space-x-1">
//                   <div className="w-3 h-3 bg-gray-700 rounded"></div>
//                   <div className="w-3 h-3 bg-green-200 rounded"></div>
//                   <div className="w-3 h-3 bg-green-300 rounded"></div>
//                   <div className="w-3 h-3 bg-green-400 rounded"></div>
//                   <div className="w-3 h-3 bg-green-500 rounded"></div>
//                 </div>
//                 <span>More</span>
//               </div>
//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




























import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [data, setData] = useState({ products: [], analytics: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  // Generate comprehensive mock data
  const generateMockData = () => {
    const categories = ['Football Boots', 'Jerseys', 'Training Gear', 'Balls', 'Goalkeeper Gear', 'Accessories'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      products: Array.from({ length: 150 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 300) + 20,
        category: categories[Math.floor(Math.random() * categories.length)],
        stock: Math.floor(Math.random() * 200),
        sales: Math.floor(Math.random() * 500),
        rating: (Math.random() * 2 + 3).toFixed(1)
      })),
      analytics: {
        totalRevenue: 487650,
        totalOrders: 1247,
        activeUsers: 892,
        conversionRate: 4.2,
        monthlyRevenue: months.map(month => ({
          name: month,
          revenue: Math.floor(Math.random() * 50000) + 30000,
          orders: Math.floor(Math.random() * 150) + 80,
          users: Math.floor(Math.random() * 100) + 60
        })),
        categoryPerformance: categories.map(category => ({
          name: category,
          sales: Math.floor(Math.random() * 15000) + 5000,
          profit: Math.floor(Math.random() * 8000) + 2000,
          growth: Math.floor(Math.random() * 30) + 5
        })),
        topProducts: Array.from({ length: 10 }, (_, i) => ({
          name: `Top Product ${i + 1}`,
          sales: Math.floor(Math.random() * 1000) + 500,
          revenue: Math.floor(Math.random() * 50000) + 20000
        }))
      }
    };
  };

  // Process orders data for analytics
  const processOrdersForAnalytics = (orders, users, products) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
    const activeUsers = users.filter(user => user.isAuthenticated).length;
    const conversionRate = users.length > 0 ? ((orders.length / users.length) * 100).toFixed(1) : 0;
    
    const monthlyRevenue = months.map(month => {
      const monthOrders = orders.filter(order => {
        if (order.createdAt || order.date) {
          const orderDate = new Date(order.createdAt || order.date);
          return orderDate.getMonth() === months.indexOf(month);
        }
        return false;
      });
      
      const monthRevenue = monthOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
      return {
        name: month,
        revenue: monthRevenue,
        orders: monthOrders.length,
        users: Math.floor(monthOrders.length * 1.5)
      };
    });
    
    const categoryMap = {};
    products.forEach(product => {
      const category = product.category || 'Other';
      if (!categoryMap[category]) {
        categoryMap[category] = { name: category, sales: 0, profit: 0, growth: 0 };
      }
      categoryMap[category].sales += parseFloat(product.price || 0) * (product.stock || 1);
      categoryMap[category].profit += parseFloat(product.price || 0) * 0.3;
      categoryMap[category].growth = Math.floor(Math.random() * 30) + 5;
    });
    
    const categoryPerformance = Object.values(categoryMap);
    
    const topProducts = products
      .sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0))
      .slice(0, 10)
      .map(product => ({
        name: product.name || `Product ${product.id}`,
        sales: Math.floor(Math.random() * 1000) + 100,
        revenue: parseFloat(product.price || 0) * Math.floor(Math.random() * 50) + 10
      }));
    
    return {
      totalRevenue,
      totalOrders: orders.length,
      activeUsers,
      conversionRate: parseFloat(conversionRate),
      monthlyRevenue,
      categoryPerformance,
      topProducts
    };
  };

  const fetchDashboardData = async () => {
    try {
      setError(null);
      setRefreshing(true);
      
      try {
        const [productsResponse, usersResponse, ordersResponse] = await Promise.all([
          fetch('https://sport-x-backend-3.onrender.com/products').then(res => {
            if (!res.ok) throw new Error('Products API failed');
            return res.json();
          }),
          fetch('https://sport-x-backend-3.onrender.com/users').then(res => {
            if (!res.ok) throw new Error('Users API failed');
            return res.json();
          }),
          fetch('https://sport-x-backend-3.onrender.com/orders').then(res => {
            if (!res.ok) throw new Error('Orders API failed');
            return res.json();
          })
        ]);

        const analytics = processOrdersForAnalytics(ordersResponse, usersResponse, productsResponse);

        setData({
          products: productsResponse,
          users: usersResponse,
          orders: ordersResponse,
          analytics: analytics
        });
        setUsingMockData(false);
        setError(null);
        
      } catch (apiError) {
        console.log("Api database not available, using demo data:", apiError.message);
        const mockData = generateMockData();
        setData(mockData);
        setUsingMockData(true);
        setError("Api database not connected. Make sure json-server is running on port 3000.");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      const mockData = generateMockData();
      setData(mockData);
      setUsingMockData(true);
      setError("Connection failed. Using demo data for visualization.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refreshData = async () => {
    await fetchDashboardData();
  };

  const StatCard = ({ title, value, change, icon, color, onClick }) => (
    <div 
      className={`bg-gray-800 border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden backdrop-blur-sm`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                <span className={`text-sm font-semibold ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
                <span className="text-gray-500 text-sm ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-full bg-gradient-to-r ${color} shadow-lg`}>
            {icon}
          </div>
        </div>
      </div>
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
    </div>
  );

  const MetricCard = ({ title, value, subtitle, progress, color }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm text-gray-400 mb-4">{subtitle}</div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r from-${color}-400 to-${color}-600 transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-right text-sm text-gray-500 mt-1">{progress}%</div>
    </div>
  );

  const BarChart = ({ data, title, color = "green" }) => {
    const maxValue = Math.max(...data.map(item => item.value || item.sales || 0));
    const colors = {
      green: 'from-green-500 to-green-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className={`w-3 h-3 bg-${color}-500 rounded-full mr-3`}></div>
          {title}
        </h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">{item.name || item.label}</span>
                <span className="text-sm font-bold text-green-400">{item.value || item.sales}</span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${colors[color]} transition-all duration-1000 ease-out group-hover:scale-105`}
                    style={{ width: `${((item.value || item.sales) / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProfitLineChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(item => item.revenue || 0));
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.revenue || 0) / maxValue) * 70 - 10;
      return { x, y, value: item.revenue || 0, name: item.name };
    });

    const pathData = points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ');

    const gradientPath = `${pathData} L 100 90 L 0 90 Z`;

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          {title}
        </h3>
        <div className="relative h-64">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path
              d={gradientPath}
              fill="url(#profitGradient)"
              className="animate-[fadeIn_1s_ease-in]"
            />
            
            <path
              d={pathData}
              fill="none"
              stroke="#10B981"
              strokeWidth="0.5"
              filter="url(#glow)"
              strokeDasharray="200"
              strokeDashoffset="200"
              style={{
                animation: 'drawLine 2s ease-in-out forwards'
              }}
            />
            
            {points.map((point, index) => (
              <g key={index}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="1"
                  fill="#10B981"
                  className="animate-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="0.5"
                  fill="#fff"
                />
              </g>
            ))}
          </svg>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-gray-400">{item.name}</span>
                <span className="text-green-400 font-semibold">
                  ${((item.revenue || 0) / 1000).toFixed(0)}k
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  };

  const PieChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + (item.sales || 0), 0);
    const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
    
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
          {title}
        </h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <div className="w-48 h-48 rounded-full overflow-hidden">
              {data.map((item, index) => {
                const percentage = ((item.sales || 0) / total) * 100;
                return (
                  <div
                    key={index}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${colors[index % colors.length]} 0% ${percentage}%, transparent ${percentage}% 100%)`,
                      transform: `rotate(${data.slice(0, index).reduce((sum, prev) => sum + ((prev.sales || 0) / total) * 360, 0)}deg)`
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-700"></div>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-gray-300 text-sm">{item.name}</span>
              </div>
              <span className="text-white font-semibold">
                {Math.round(((item.sales || 0) / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-300 font-medium text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const mockData = data.analytics || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl mr-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.06 3.75c.29-.14.62-.14.91 0L16.5 7.5c.14.07.25.2.3.35l1.5 4.5c.07.2.04.42-.08.6L16.5 16.5c-.05.15-.16.28-.3.35l-4.65 1.75c-.29.14-.62.14-.91 0L5.99 16.85c-.14-.07-.25-.2-.3-.35L4.19 12c-.07-.2-.04-.42.08-.6L5.99 7.85c.05-.15.16-.28.3-.35L10.94 5.75z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Football Store Analytics</h1>
                <p className="text-gray-400 text-lg mt-1">Professional dashboard for business insights</p>
              </div>
            </div>
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center"
            >
              <svg className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshing ? 'Updating...' : 'Refresh Data'}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-blue-900 bg-opacity-50 border border-blue-600 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex">
                <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-200 font-medium">{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="border border-gray-700 bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm">
            <nav className="flex px-6">
              {['overview', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-8 font-semibold text-sm capitalize transition-all duration-300 border-b-2 ${
                    activeTab === tab
                      ? 'border-green-500 text-green-400 bg-gray-700'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab === 'overview' && <span className="mr-2">📊</span>}
                  {tab === 'analytics' && <span className="mr-2">📈</span>}
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`${(mockData.totalRevenue || 487650).toLocaleString()}`}
                change={23}
                color="from-green-500 to-green-600"
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                }
              />
              <StatCard
                title="Total Orders"
                value={(mockData.totalOrders || 1247).toLocaleString()}
                change={15}
                color="from-blue-500 to-blue-600"
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                }
              />
              <StatCard
                title="Active Users"
                value={(mockData.activeUsers || 892).toLocaleString()}
                change={12}
                color="from-purple-500 to-purple-600"
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                }
              />
              <StatCard
                title="Conversion Rate"
                value={`${mockData.conversionRate || 4.2}%`}
                change={8}
                color="from-orange-500 to-orange-600"
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfitLineChart data={mockData.monthlyRevenue || []} title="Monthly Profit Trend" />
              <PieChart data={mockData.categoryPerformance || []} title="Category Performance" />
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <MetricCard 
                title="Customer Satisfaction" 
                value="92%" 
                subtitle="Based on reviews"
                progress={92}
                color="green"
              />
              <MetricCard 
                title="Order Fulfillment" 
                value="88%" 
                subtitle="On-time delivery"
                progress={88}
                color="blue"
              />
              <MetricCard 
                title="Inventory Turnover" 
                value="6.2x" 
                subtitle="Annual rotation"
                progress={75}
                color="purple"
              />
              <MetricCard 
                title="Return Rate" 
                value="2.1%" 
                subtitle="Quality indicator"
                progress={21}
                color="red"
              />
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BarChart data={mockData.topProducts?.slice(0, 6) || []} title="Top Products Performance" color="green" />
              
              {/* Quick Stats Grid */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">24</div>
                    <div className="text-gray-300 text-sm">Countries</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">1.2M</div>
                    <div className="text-gray-300 text-sm">Page Views</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">4.8</div>
                    <div className="text-gray-300 text-sm">Avg Rating</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-400">156</div>
                    <div className="text-gray-300 text-sm">Products</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            
            {/* Advanced KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
                <h4 className="text-lg font-semibold opacity-90">Customer LTV</h4>
                <p className="text-3xl font-bold mt-2">$892</p>
                <p className="text-sm opacity-80 mt-2">18% increase from last quarter</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
                <h4 className="text-lg font-semibold opacity-90">Cart Abandonment</h4>
                <p className="text-3xl font-bold mt-2">24.3%</p>
                <p className="text-sm opacity-80 mt-2">5% improvement this month</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
                <h4 className="text-lg font-semibold opacity-90">Average Order Value</h4>
                <p className="text-3xl font-bold mt-2">$147</p>
                <p className="text-sm opacity-80 mt-2">$23 increase from last month</p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm">
                <h4 className="text-lg font-semibold opacity-90">Customer Retention</h4>
                <p className="text-3xl font-bold mt-2">76.8%</p>
                <p className="text-sm opacity-80 mt-2">8.2% improvement</p>
              </div>
            </div>

            {/* Advanced Analytics Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <BarChart data={mockData.categoryPerformance || []} title="Revenue Breakdown by Category" color="blue" />
              
              {/* Sales Funnel */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Sales Funnel Analysis</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <span className="text-gray-300 font-medium">Website Visitors</span>
                    <span className="text-white font-bold text-lg">10,847</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-4">
                    <span className="text-gray-300 font-medium">Product Views</span>
                    <span className="text-blue-400 font-bold text-lg">4,923</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-8">
                    <span className="text-gray-300 font-medium">Add to Cart</span>
                    <span className="text-green-400 font-bold text-lg">1,687</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-12">
                    <span className="text-gray-300 font-medium">Checkout Started</span>
                    <span className="text-yellow-400 font-bold text-lg">892</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg ml-16">
                    <span className="text-gray-300 font-medium">Completed Orders</span>
                    <span className="text-purple-400 font-bold text-lg">456</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-400 mb-2">94.2%</div>
                <div className="text-gray-300 font-medium">Customer Satisfaction</div>
                <div className="text-gray-500 text-sm">Based on 1,247 reviews</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-400 mb-2">3.8s</div>
                <div className="text-gray-300 font-medium">Page Load Time</div>
                <div className="text-gray-500 text-sm">15% faster than industry avg</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-400 mb-2">67%</div>
                <div className="text-gray-300 font-medium">Mobile Traffic</div>
                <div className="text-gray-500 text-sm">Growing 23% monthly</div>
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">Real-time Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">New order from Manchester</p>
                    <p className="text-gray-400 text-xs">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-3"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Football boots restocked</p>
                    <p className="text-gray-400 text-xs">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mr-3"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">High traffic detected</p>
                    <p className="text-gray-400 text-xs">8 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse mr-3"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">New user registered</p>
                    <p className="text-gray-400 text-xs">12 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Heat Map */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">Performance Heat Map</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => (
                  <div 
                    key={i}
                    className={`aspect-square rounded-lg ${
                      Math.random() > 0.7 ? 'bg-green-500' :
                      Math.random() > 0.5 ? 'bg-green-400' :
                      Math.random() > 0.3 ? 'bg-green-300' :
                      Math.random() > 0.1 ? 'bg-green-200' : 'bg-gray-700'
                    }`}
                    title={`Day ${i + 1}: ${Math.floor(Math.random() * 100)} orders`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-700 rounded"></div>
                  <div className="w-3 h-3 bg-green-200 rounded"></div>
                  <div className="w-3 h-3 bg-green-300 rounded"></div>
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                </div>
                <span>More</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;