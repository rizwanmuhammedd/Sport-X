// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { ShoppingCart, Heart, User, CheckCircle } from "lucide-react";

// export default function Profile() {
//   const { user } = useAuth();
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100">
//         <p className="text-2xl font-semibold text-gray-600">
//           Please login to view your profile 🔑
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-100 py-12 px-6 flex justify-center">
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between">
//           <div className="flex items-center gap-4">
//             <div className="bg-white p-3 rounded-full shadow-md">
//               <User className="text-blue-600 w-10 h-10" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold">{user.name}</h1>
//               <p className="text-lg opacity-90">{user.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
//           {/* Cart */}
//           <div className="bg-gradient-to-tr from-green-100 via-green-50 to-emerald-100 rounded-2xl p-6 shadow-md flex items-center gap-4">
//             <div className="bg-green-500 p-3 rounded-full text-white shadow">
//               <ShoppingCart className="w-8 h-8" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">Cart Items</h2>
//               <p className="text-2xl font-bold text-green-700">{cart?.length || 0}</p>
//             </div>
//           </div>

//           {/* Wishlist */}
//           <div className="bg-gradient-to-tr from-pink-100 via-rose-50 to-red-100 rounded-2xl p-6 shadow-md flex items-center gap-4">
//             <div className="bg-pink-500 p-3 rounded-full text-white shadow">
//               <Heart className="w-8 h-8" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">Wishlist</h2>
//               <p className="text-2xl font-bold text-pink-600">{wishlist?.length || 0}</p>
//             </div>
//           </div>

//           {/* Orders */}
//           <div className="bg-gradient-to-tr from-yellow-100 via-yellow-50 to-amber-100 rounded-2xl p-6 shadow-md flex items-center gap-4">
//             <div className="bg-yellow-500 p-3 rounded-full text-white shadow">
//               <CheckCircle className="w-8 h-8" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
//               <p className="text-2xl font-bold text-yellow-700">
//                 {user.orders?.length || 0}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Orders Details Section */}
//         {user.orders && user.orders.length > 0 && (
//           <div className="p-8 space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Past Orders</h2>
//             {user.orders.map((order) => (
//               <div key={order.id} className="bg-gray-50 rounded-2xl shadow p-4">
//                 <div className="flex justify-between mb-2">
//                   <span className="font-semibold text-gray-700">Order ID:</span>
//                   <span className="text-gray-800">{order.id}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span className="font-semibold text-gray-700">Date:</span>
//                   <span className="text-gray-800">{order.date}</span>
//                 </div>
//                 <div className="space-y-2">
//                   {order.products.map((p) => (
//                     <div key={p.id} className="flex justify-between items-center">
//                       <p className="text-gray-800">{p.name} (x{p.quantity || 1})</p>
//                       <p className="font-semibold text-gray-900">
//                         ${(Number(p.price) * (p.quantity || 1)).toFixed(2)}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="text-right mt-2 font-bold text-green-700">
//                   Total: ${order.total.toFixed(2)}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Footer Section */}
//         <div className="bg-gray-50 px-8 py-6 border-t flex justify-between items-center">
//           <p className="text-gray-600 text-sm">
//             Last login: <span className="font-medium text-gray-800">Today</span>
//           </p>
//           <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-lg font-semibold shadow-md hover:scale-105 transition">
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { ShoppingCart, Heart, User, CheckCircle, Edit3, Save, Mail, Calendar, MapPin } from "lucide-react";

// export default function Profile() {
//   const { user, updateUser } = useAuth(); // Add updateUser function in your AuthContext
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();

//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({ name: user?.name || "", email: user?.email || "" });
//   const [userOrders, setUserOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     setAnimate(true);
//     if (user) {
//       fetchUserOrders();
//     }
//   }, [user]);

//   const fetchUserOrders = async () => {
//     if (!user) return;
    
//     try {
//       const response = await fetch(`http://localhost:3000/users/${user.id}`);
//       if (response.ok) {
//         const userData = await response.json();
//         setUserOrders(userData.orders || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch user orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white backdrop-blur-lg shadow-2xl border border-blue-100 rounded-3xl p-12">
//           <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
//             <User className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
//           <p className="text-gray-600 text-lg">Please login to view your profile</p>
//         </div>
//       </div>
//     );
//   }

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSave = async () => {
//     setUpdating(true);
//     try {
//       // Update user in database
//       const response = await fetch(`http://localhost:3000/users/${user.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // Update user context if updateUser function exists
//         if (updateUser) updateUser(formData);
//         setEditMode(false);
//       } else {
//         console.error('Failed to update user');
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/40 to-blue-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-100/50 to-blue-100/50 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <div className="relative z-10 py-12 px-6 flex justify-center">
//         <div className={`w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>

//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
//             {/* Decorative elements */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl"></div>
            
//             <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               <div className="flex items-center gap-6">
//                 <div className="relative">
//                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/30">
//                     <User className="text-white w-16 h-16" />
//                   </div>
//                   <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
//                 </div>
//                 <div className="space-y-2">
//                   {editMode ? (
//                     <div className="space-y-3">
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="px-4 py-3 rounded-xl text-gray-800 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm text-lg font-semibold"
//                         placeholder="Your name"
//                       />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="px-4 py-3 rounded-xl text-gray-800 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm"
//                         placeholder="Your email"
//                       />
//                     </div>
//                   ) : (
//                     <>
//                       <h1 className="text-4xl font-black drop-shadow-lg">{user.name}</h1>
//                       <div className="flex items-center gap-2 text-blue-100">
//                         <Mail className="w-5 h-5" />
//                         <p className="text-xl font-medium">{user.email}</p>
//                       </div>
//                       <div className="flex items-center gap-2 text-blue-200">
//                         <Calendar className="w-4 h-4" />
//                         <p className="text-sm">Member since {new Date().getFullYear()}</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Edit / Save Button */}
//               <button
//                 onClick={() => (editMode ? handleSave() : setEditMode(true))}
//                 disabled={updating}
//                 className="flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {updating ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
//                     Saving...
//                   </>
//                 ) : editMode ? (
//                   <>
//                     <Save className="w-5 h-5" />
//                     Save Changes
//                   </>
//                 ) : (
//                   <>
//                     <Edit3 className="w-5 h-5" />
//                     Edit Profile
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="p-8 space-y-8">
//             <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Your Dashboard</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {/* Cart */}
//               <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl text-white shadow-lg">
//                     <ShoppingCart className="w-8 h-8" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800">Cart Items</h3>
//                     <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">
//                       {cart?.length || 0}
//                     </p>
//                     <p className="text-gray-600 text-sm">Items ready to checkout</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Wishlist */}
//               <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4 rounded-2xl text-white shadow-lg">
//                     <Heart className="w-8 h-8" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800">Wishlist</h3>
//                     <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-700">
//                       {wishlist?.length || 0}
//                     </p>
//                     <p className="text-gray-600 text-sm">Items you love</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Orders */}
//               <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg">
//                     <CheckCircle className="w-8 h-8" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800">Total Orders</h3>
//                     <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
//                       {userOrders?.length || 0}
//                     </p>
//                     <p className="text-gray-600 text-sm">Completed purchases</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Orders Details Section */}
//           {userOrders && userOrders.length > 0 && (
//             <div className="p-8 border-t border-blue-100">
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <CheckCircle className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-800">Order History</h2>
//               </div>
              
//               <div className="space-y-6">
//                 {userOrders.slice(0, 5).map((order, index) => (
//                   <div key={order.id} className={`bg-white border border-blue-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-102 ${animate ? `animate-fadeInUp delay-${index * 100}` : 'opacity-0'}`}>
//                     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                           #{order.id}
//                         </div>
//                         <div>
//                           <p className="font-bold text-gray-800 text-lg">Order #{order.id}</p>
//                           <div className="flex items-center gap-2 text-gray-600">
//                             <Calendar className="w-4 h-4" />
//                             <span className="text-sm">{order.date}</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="text-right">
//                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm font-semibold">
//                           <CheckCircle className="w-4 h-4" />
//                           {order.status || 'Completed'}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-3">
//                       {order.items?.slice(0, 3).map((item, itemIndex) => (
//                         <div key={itemIndex} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
//                           <div className="flex items-center gap-3">
//                             <img 
//                               src={item.image || '/placeholder.png'} 
//                               alt={item.name}
//                               className="w-12 h-12 object-cover rounded-lg border border-gray-200"
//                             />
//                             <div>
//                               <p className="font-semibold text-gray-800">{item.name}</p>
//                               <p className="text-gray-600 text-sm">Qty: {item.quantity || 1}</p>
//                             </div>
//                           </div>
//                           <p className="font-bold text-gray-900">
//                             ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
//                           </p>
//                         </div>
//                       ))}
                      
//                       {order.items?.length > 3 && (
//                         <div className="text-center py-2">
//                           <span className="text-gray-500 text-sm">
//                             +{order.items.length - 3} more items
//                           </span>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-4 mt-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600 font-medium">Order Total:</span>
//                         <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">
//                           ${order.total?.toFixed(2) || '0.00'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
                
//                 {userOrders.length > 5 && (
//                   <div className="text-center pt-4">
//                     <p className="text-gray-500">
//                       Showing 5 of {userOrders.length} orders
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {userOrders && userOrders.length === 0 && !loading && (
//             <div className="p-8 border-t border-blue-100">
//               <div className="text-center py-12">
//                 <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <CheckCircle className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-600 mb-3">No Orders Yet</h3>
//                 <p className="text-gray-500 text-lg">Start shopping to see your order history here</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }














import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Heart, User, CheckCircle, Edit3, Save, Mail, Calendar, MapPin, Package } from "lucide-react";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || "", email: user?.email || "" });
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`http://localhost:10000/users/${user.id}`);
      if (response.ok) {
        const userData = await response.json();
        setUserOrders(userData.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-12">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-serif font-light text-slate-900 mb-4">Authentication Required</h2>
          <p className="text-slate-600 text-base">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`https://sport-x-backend-3.onrender.com/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (updateUser) updateUser(formData);
        setEditMode(false);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transform transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Header Section */}
          <div className="bg-slate-900 p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                    <User className="text-white w-16 h-16" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900"></div>
                </div>
                <div className="space-y-2">
                  {editMode ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-base font-medium"
                        placeholder="Your name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-base"
                        placeholder="Your email"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl font-serif font-light">{user.name}</h1>
                      <div className="flex items-center gap-2 text-slate-200">
                        <Mail className="w-5 h-5" />
                        <p className="text-base">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm">Member since {new Date().getFullYear()}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Edit / Save Button */}
              <button
                onClick={() => (editMode ? handleSave() : setEditMode(true))}
                disabled={updating}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    Saving...
                  </>
                ) : editMode ? (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="w-5 h-5" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-8 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-light text-slate-900 mb-2">Your Dashboard</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-md mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cart */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl text-white">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900">Cart Items</h3>
                    <p className="text-3xl font-semibold text-slate-900">
                      {cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0}
                    </p>
                    <p className="text-slate-600 text-sm">Items ready to checkout</p>
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl text-white">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900">Wishlist</h3>
                    <p className="text-3xl font-semibold text-slate-900">
                      {wishlist?.length || 0}
                    </p>
                    <p className="text-slate-600 text-sm">Items you love</p>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl text-white">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900">Total Orders</h3>
                    <p className="text-3xl font-semibold text-slate-900">
                      {userOrders?.length || 0}
                    </p>
                    <p className="text-slate-600 text-sm">Completed purchases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Details Section */}
          {userOrders && userOrders.length > 0 && (
            <div className="p-8 border-t border-slate-200">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-light text-slate-900 mb-3">Order History</h2>
                <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                {userOrders.slice(0, 5).map((order, index) => (
                  <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold">
                          #{order.id}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-base">Order #{order.id}</p>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{order.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        {order.status || 'Completed'}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {order.items?.slice(0, 3).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.image || '/placeholder.png'} 
                              alt={item.name}
                              className="w-12 h-12 object-contain rounded-lg border border-slate-200"
                            />
                            <div>
                              <p className="font-medium text-slate-900">{item.name}</p>
                              <p className="text-slate-600 text-sm">Qty: {item.quantity || 1}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900">
                            ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      
                      {order.items?.length > 3 && (
                        <div className="text-center py-2">
                          <span className="text-slate-600 text-sm">
                            +{order.items.length - 3} more items
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Order Total:</span>
                        <span className="text-2xl font-semibold text-slate-900">
                          ${order.total?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {userOrders.length > 5 && (
                  <div className="text-center pt-4">
                    <p className="text-slate-600">
                      Showing 5 of {userOrders.length} orders
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {userOrders && userOrders.length === 0 && !loading && (
            <div className="p-8 border-t border-slate-200">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-serif font-light text-slate-900 mb-3">No Orders Yet</h3>
                <p className="text-slate-600 text-base">Start shopping to see your order history here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}