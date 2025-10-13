













// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { ShoppingCart, Heart, User, CheckCircle, Edit3, Save, Mail, Calendar, MapPin, Package } from "lucide-react";

// export default function Profile() {
//   const { user, updateUser } = useAuth();
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
//       const response = await fetch(`http://localhost:10000/users/${user.id}`);
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
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-3 xs:p-4 sm:p-6">
//         <div className="text-center bg-white border border-slate-200 rounded-xl xs:rounded-2xl shadow-sm p-6 xs:p-8 sm:p-12 w-full max-w-xs xs:max-w-sm sm:max-w-md">
//           <div className="w-16 h-16 xs:w-20 xs:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-6">
//             <User className="w-8 h-8 xs:w-10 xs:h-10 text-slate-400" />
//           </div>
//           <h2 className="text-xl xs:text-2xl font-serif font-light text-slate-900 mb-3 xs:mb-4">Authentication Required</h2>
//           <p className="text-slate-600 text-sm xs:text-base">Please login to view your profile</p>
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
//       const response = await fetch(`https://sport-x-backend-3.onrender.com/users/${user.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
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
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
//       <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
//         <div className={`bg-white border border-slate-200 rounded-xl xs:rounded-2xl shadow-sm overflow-hidden transform transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

//           {/* Header Section */}
//           <div className="bg-slate-900 p-4 xs:p-6 sm:p-8 text-white">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 xs:gap-6">
//               <div className="flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6">
//                 <div className="relative flex justify-center xs:justify-start">
//                   <div className="bg-white/10 backdrop-blur-md p-3 xs:p-4 rounded-lg xs:rounded-xl border border-white/20">
//                     <User className="text-white w-12 h-12 xs:w-16 xs:h-16" />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 xs:-bottom-2 xs:-right-2 w-4 h-4 xs:w-6 xs:h-6 bg-emerald-500 rounded-full border-2 xs:border-4 border-slate-900"></div>
//                 </div>
//                 <div className="space-y-1 xs:space-y-2 text-center xs:text-left">
//                   {editMode ? (
//                     <div className="space-y-2 xs:space-y-3">
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-sm xs:text-base font-medium"
//                         placeholder="Your name"
//                       />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-sm xs:text-base"
//                         placeholder="Your email"
//                       />
//                     </div>
//                   ) : (
//                     <>
//                       <h1 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-light break-words">{user.name}</h1>
//                       <div className="flex items-center gap-1 xs:gap-2 text-slate-200 justify-center xs:justify-start">
//                         <Mail className="w-4 h-4 xs:w-5 xs:h-5" />
//                         <p className="text-sm xs:text-base break-all">{user.email}</p>
//                       </div>
//                       <div className="flex items-center gap-1 xs:gap-2 text-slate-300 justify-center xs:justify-start">
//                         <Calendar className="w-3 h-3 xs:w-4 xs:h-4" />
//                         <p className="text-xs xs:text-sm">Member since {new Date().getFullYear()}</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Edit / Save Button */}
//               <button
//                 onClick={() => (editMode ? handleSave() : setEditMode(true))}
//                 disabled={updating}
//                 className="flex items-center justify-center gap-1 xs:gap-2 px-4 xs:px-6 py-2 xs:py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-lg xs:rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm xs:text-base w-full xs:w-auto mt-4 xs:mt-0"
//               >
//                 {updating ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:w-5 border-2 border-white/30 border-t-white"></div>
//                     <span>Saving...</span>
//                   </>
//                 ) : editMode ? (
//                   <>
//                     <Save className="w-4 h-4 xs:w-5 xs:h-5" />
//                     <span>Save Changes</span>
//                   </>
//                 ) : (
//                   <>
//                     <Edit3 className="w-4 h-4 xs:w-5 xs:h-5" />
//                     <span>Edit Profile</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="p-4 xs:p-6 sm:p-8 space-y-6 xs:space-y-8">
//             <div className="text-center mb-6 xs:mb-8">
//               <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-1 xs:mb-2">Your Dashboard</h2>
//               <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs xs:max-w-sm sm:max-w-md mx-auto"></div>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
//               {/* Cart */}
//               <div className="bg-slate-50 border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
//                 <div className="flex items-center gap-3 xs:gap-4">
//                   <div className="bg-slate-900 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl text-white">
//                     <ShoppingCart className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm xs:text-base font-medium text-slate-900">Cart Items</h3>
//                     <p className="text-2xl xs:text-3xl font-semibold text-slate-900">
//                       {cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0}
//                     </p>
//                     <p className="text-slate-600 text-xs xs:text-sm">Items ready to checkout</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Wishlist */}
//               <div className="bg-slate-50 border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
//                 <div className="flex items-center gap-3 xs:gap-4">
//                   <div className="bg-slate-900 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl text-white">
//                     <Heart className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm xs:text-base font-medium text-slate-900">Wishlist</h3>
//                     <p className="text-2xl xs:text-3xl font-semibold text-slate-900">
//                       {wishlist?.length || 0}
//                     </p>
//                     <p className="text-slate-600 text-xs xs:text-sm">Items you love</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Orders */}
//               <div className="bg-slate-50 border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
//                 <div className="flex items-center gap-3 xs:gap-4">
//                   <div className="bg-slate-900 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl text-white">
//                     <CheckCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm xs:text-base font-medium text-slate-900">Total Orders</h3>
//                     <p className="text-2xl xs:text-3xl font-semibold text-slate-900">
//                       {userOrders?.length || 0}
//                     </p>
//                     <p className="text-slate-600 text-xs xs:text-sm">Completed purchases</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Orders Details Section */}
//           {userOrders && userOrders.length > 0 && (
//             <div className="p-4 xs:p-6 sm:p-8 border-t border-slate-200">
//               <div className="mb-6 xs:mb-8">
//                 <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-2 xs:mb-3">Order History</h2>
//                 <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
//               </div>
              
//               <div className="space-y-4 xs:space-y-6">
//                 {userOrders.slice(0, 5).map((order, index) => (
//                   <div key={order.id} className="bg-white border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
//                     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 xs:gap-4 mb-3 xs:mb-4">
//                       <div className="flex items-center gap-3 xs:gap-4">
//                         <div className="w-10 h-10 xs:w-12 xs:h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold text-sm xs:text-base">
//                           #{order.id}
//                         </div>
//                         <div>
//                           <p className="font-medium text-slate-900 text-sm xs:text-base">Order #{order.id}</p>
//                           <div className="flex items-center gap-1 xs:gap-2 text-slate-600">
//                             <Calendar className="w-3 h-3 xs:w-4 xs:h-4" />
//                             <span className="text-xs xs:text-sm">{order.date}</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="inline-flex items-center gap-1 xs:gap-2 px-3 xs:px-4 py-1 xs:py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs xs:text-sm font-medium mt-2 lg:mt-0 self-start">
//                         <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4" />
//                         {order.status || 'Completed'}
//                       </div>
//                     </div>
                    
//                     <div className="space-y-2 xs:space-y-3">
//                       {order.items?.slice(0, 3).map((item, itemIndex) => (
//                         <div key={itemIndex} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 xs:p-4 border border-slate-200">
//                           <div className="flex items-center gap-2 xs:gap-3">
//                             <img 
//                               src={item.image || '/placeholder.png'} 
//                               alt={item.name}
//                               className="w-10 h-10 xs:w-12 xs:h-12 object-contain rounded-lg border border-slate-200"
//                             />
//                             <div className="min-w-0 flex-1">
//                               <p className="font-medium text-slate-900 text-sm xs:text-base truncate">{item.name}</p>
//                               <p className="text-slate-600 text-xs xs:text-sm">Qty: {item.quantity || 1}</p>
//                             </div>
//                           </div>
//                           <p className="font-semibold text-slate-900 text-sm xs:text-base whitespace-nowrap">
//                             ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
//                           </p>
//                         </div>
//                       ))}
                      
//                       {order.items?.length > 3 && (
//                         <div className="text-center py-1 xs:py-2">
//                           <span className="text-slate-600 text-xs xs:text-sm">
//                             +{order.items.length - 3} more items
//                           </span>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="border-t border-slate-200 pt-3 xs:pt-4 mt-3 xs:mt-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-slate-600 font-medium text-sm xs:text-base">Order Total:</span>
//                         <span className="text-xl xs:text-2xl font-semibold text-slate-900">
//                           ${order.total?.toFixed(2) || '0.00'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
                
//                 {userOrders.length > 5 && (
//                   <div className="text-center pt-3 xs:pt-4">
//                     <p className="text-slate-600 text-sm">
//                       Showing 5 of {userOrders.length} orders
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {userOrders && userOrders.length === 0 && !loading && (
//             <div className="p-4 xs:p-6 sm:p-8 border-t border-slate-200">
//               <div className="text-center py-8 xs:py-12">
//                 <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-6">
//                   <Package className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-slate-400" />
//                 </div>
//                 <h3 className="text-xl xs:text-2xl font-serif font-light text-slate-900 mb-2 xs:mb-3">No Orders Yet</h3>
//                 <p className="text-slate-600 text-sm xs:text-base">Start shopping to see your order history here</p>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-3 xs:p-4 sm:p-6">
        <div className="text-center bg-white border border-slate-200 rounded-xl xs:rounded-2xl shadow-sm p-6 xs:p-8 sm:p-12 w-full max-w-xs xs:max-w-sm sm:max-w-md">
          <div className="w-16 h-16 xs:w-20 xs:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-6">
            <User className="w-8 h-8 xs:w-10 xs:h-10 text-slate-400" />
          </div>
          <h2 className="text-xl xs:text-2xl font-serif font-light text-slate-900 mb-3 xs:mb-4">Authentication Required</h2>
          <p className="text-slate-600 text-sm xs:text-base">Please login to view your profile</p>
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
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
        <div className={`bg-white border border-slate-200 rounded-xl xs:rounded-2xl shadow-sm overflow-hidden transform transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Header Section */}
          <div className="bg-slate-900 p-4 xs:p-6 sm:p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 xs:gap-6">
              <div className="flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6">
                <div className="relative flex justify-center xs:justify-start">
                  <div className="bg-white/10 backdrop-blur-md p-3 xs:p-4 rounded-lg xs:rounded-xl border border-white/20">
                    <User className="text-white w-12 h-12 xs:w-16 xs:h-16" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 xs:-bottom-2 xs:-right-2 w-4 h-4 xs:w-6 xs:h-6 bg-emerald-500 rounded-full border-2 xs:border-4 border-slate-900"></div>
                </div>
                <div className="space-y-1 xs:space-y-2 text-center xs:text-left">
                  {editMode ? (
                    <div className="space-y-2 xs:space-y-3">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-sm xs:text-base font-medium"
                        placeholder="Your name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-sm xs:text-base"
                        placeholder="Your email"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-light break-words">{user.name}</h1>
                      <div className="flex items-center gap-1 xs:gap-2 text-slate-200 justify-center xs:justify-start">
                        <Mail className="w-4 h-4 xs:w-5 xs:h-5" />
                        <p className="text-sm xs:text-base break-all">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-1 xs:gap-2 text-slate-300 justify-center xs:justify-start">
                        <Calendar className="w-3 h-3 xs:w-4 xs:h-4" />
                        <p className="text-xs xs:text-sm">Member since {new Date().getFullYear()}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Edit / Save Button */}
              <button
                onClick={() => (editMode ? handleSave() : setEditMode(true))}
                disabled={updating}
                className="flex items-center justify-center gap-1 xs:gap-2 px-4 xs:px-6 py-2 xs:py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-lg xs:rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm xs:text-base w-full xs:w-auto mt-4 xs:mt-0"
              >
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Saving...</span>
                  </>
                ) : editMode ? (
                  <>
                    <Save className="w-4 h-4 xs:w-5 xs:h-5" />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 xs:w-5 xs:h-5" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-4 xs:p-6 sm:p-8 space-y-6 xs:space-y-8">
            <div className="text-center mb-6 xs:mb-8">
              <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-1 xs:mb-2">Your Dashboard</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent max-w-xs xs:max-w-sm sm:max-w-md mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
              {/* Cart */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
                <div className="flex items-center gap-3 xs:gap-4">
                  <div className="bg-slate-900 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl text-white">
                    <ShoppingCart className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="text-sm xs:text-base font-medium text-slate-900">Cart Items</h3>
                    <p className="text-2xl xs:text-3xl font-semibold text-slate-900">
                      {cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0}
                    </p>
                    <p className="text-slate-600 text-xs xs:text-sm">Items ready to checkout</p>
                  </div>
                </div>
              </div>

              {/* Wishlist */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
                <div className="flex items-center gap-3 xs:gap-4">
                  <div className="bg-slate-900 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl text-white">
                    <Heart className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="text-sm xs:text-base font-medium text-slate-900">Wishlist</h3>
                    <p className="text-2xl xs:text-3xl font-semibold text-slate-900">
                      {wishlist?.length || 0}
                    </p>
                    <p className="text-slate-600 text-xs xs:text-sm">Items you love</p>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
                <div className="flex items-center gap-3 xs:gap-4">
                  <div className="bg-slate-900 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl text-white">
                    <CheckCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="text-sm xs:text-base font-medium text-slate-900">Total Orders</h3>
                    <p className="text-2xl xs:text-3xl font-semibold text-slate-900">
                      {userOrders?.length || 0}
                    </p>
                    <p className="text-slate-600 text-xs xs:text-sm">Completed purchases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Details Section */}
          {userOrders && userOrders.length > 0 && (
            <div className="p-4 xs:p-6 sm:p-8 border-t border-slate-200">
              <div className="mb-6 xs:mb-8">
                <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-2 xs:mb-3">Order History</h2>
                <div className="h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
              </div>
              
              <div className="space-y-4 xs:space-y-6">
                {userOrders.slice(0, 5).map((order, index) => (
                  <div key={order.id} className="bg-white border border-slate-200 rounded-lg xs:rounded-xl p-4 xs:p-6 hover:border-slate-300 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 xs:gap-4 mb-3 xs:mb-4">
                      <div className="flex items-center gap-3 xs:gap-4">
                        <div className="w-10 h-10 xs:w-12 xs:h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold text-sm xs:text-base">
                          #{order.id}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm xs:text-base">Order #{order.id}</p>
                          <div className="flex items-center gap-1 xs:gap-2 text-slate-600">
                            <Calendar className="w-3 h-3 xs:w-4 xs:h-4" />
                            <span className="text-xs xs:text-sm">{order.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="inline-flex items-center gap-1 xs:gap-2 px-3 xs:px-4 py-1 xs:py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs xs:text-sm font-medium mt-2 lg:mt-0 self-start">
                        <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4" />
                        {order.status || 'Completed'}
                      </div>
                    </div>
                    
                    <div className="space-y-2 xs:space-y-3">
                      {order.items?.slice(0, 3).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 xs:p-4 border border-slate-200">
                          <div className="flex items-center gap-2 xs:gap-3">
                            <img 
                              src={item.image || '/placeholder.png'} 
                              alt={item.name}
                              className="w-10 h-10 xs:w-12 xs:h-12 object-contain rounded-lg border border-slate-200"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-slate-900 text-sm xs:text-base truncate">{item.name}</p>
                              <p className="text-slate-600 text-xs xs:text-sm">Qty: {item.quantity || 1}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900 text-sm xs:text-base whitespace-nowrap">
                            ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      
                      {order.items?.length > 3 && (
                        <div className="text-center py-1 xs:py-2">
                          <span className="text-slate-600 text-xs xs:text-sm">
                            +{order.items.length - 3} more items
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-slate-200 pt-3 xs:pt-4 mt-3 xs:mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium text-sm xs:text-base">Order Total:</span>
                        <span className="text-xl xs:text-2xl font-semibold text-slate-900">
                          ${order.total?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {userOrders.length > 5 && (
                  <div className="text-center pt-3 xs:pt-4">
                    <p className="text-slate-600 text-sm">
                      Showing 5 of {userOrders.length} orders
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {userOrders && userOrders.length === 0 && !loading && (
            <div className="p-4 xs:p-6 sm:p-8 border-t border-slate-200">
              <div className="text-center py-8 xs:py-12">
                <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-6">
                  <Package className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-slate-400" />
                </div>
                <h3 className="text-xl xs:text-2xl font-serif font-light text-slate-900 mb-2 xs:mb-3">No Orders Yet</h3>
                <p className="text-slate-600 text-sm xs:text-base">Start shopping to see your order history here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}