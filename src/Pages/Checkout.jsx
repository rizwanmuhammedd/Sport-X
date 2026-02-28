

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { 
//   CreditCard, 
//   Lock, 
//   ShoppingBag, 
//   MapPin, 
//   Plus, 
//   Edit2, 
//   Trash2,
//   Check,
//   X,
//   ChevronLeft,
//   Home,
//   Briefcase,
//   User,
//   Shield,
//   Truck,
//   AlertCircle,
//   Sparkles,
//   ChevronRight
// } from "lucide-react";
// import api from "../Api/Axios_Instance.jsx";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();
//   const { cart, clearCart } = useCart();

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [showAddressForm, setShowAddressForm] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [editingAddressId, setEditingAddressId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [addressForm, setAddressForm] = useState({
//     fullName: "",
//     phone: "",
//     addressLine: "",
//     city: "",
//     state: "",
//     pincode: "",
//     addressType: "home",
//     isDefault: false
//   });

//   const [shipping, setShipping] = useState({
//     fullName: "",
//     phone: "",
//     addressLine: "",
//     city: "",
//     state: "",
//     pincode: ""
//   });

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => setAnimate(true), []);

//   // ---------- LOAD USER ADDRESSES ----------
//   useEffect(() => {
//     if (user) {
//       fetchAddresses();
//     }
//   }, [user]);

//   const fetchAddresses = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/address");
//       const addressList = res.data.data || [];
//       setAddresses(addressList);

//       const defaultAddr = addressList.find(a => a.isDefault);
//       if (defaultAddr) {
//         setSelectedAddressId(defaultAddr.id);
//         setShipping({
//           fullName: defaultAddr.fullName,
//           phone: defaultAddr.phone,
//           addressLine: defaultAddr.addressLine,
//           city: defaultAddr.city,
//           state: defaultAddr.state,
//           pincode: defaultAddr.pincode
//         });
//       }
//     } catch {
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ----------- HANDLE ADDRESS FORM -----------
//   const handleAddressFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setAddressForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const resetAddressForm = () => {
//     setAddressForm({
//       fullName: "",
//       phone: "",
//       addressLine: "",
//       city: "",
//       state: "",
//       pincode: "",
//       addressType: "home",
//       isDefault: false
//     });
//     setIsEditingAddress(false);
//     setEditingAddressId(null);
//   };

//   const handleSaveAddress = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditingAddress) {
//         await api.put(`/address/${editingAddressId}`, addressForm);
//       } else {
//         await api.post("/address", addressForm);
//       }
      
//       await fetchAddresses();
//       resetAddressForm();
//       setShowAddressForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to save address");
//     }
//   };

//   const handleDeleteAddress = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this address?")) return;
    
//     try {
//       await api.delete(`/address/${id}`);
//       await fetchAddresses();
//     } catch {
//     }
//   };

//   const handleSetDefaultAddress = async (id) => {
//     try {
//       await api.put(`/address/${id}/set-default`);
//       await fetchAddresses();
//     } catch {
//     }
//   };

//   const handleEditAddress = (address) => {
//     setAddressForm({
//       fullName: address.fullName,
//       phone: address.phone,
//       addressLine: address.addressLine,
//       city: address.city,
//       state: address.state,
//       pincode: address.pincode,
//       addressType: address.addressType || "home",
//       isDefault: address.isDefault
//     });
//     setIsEditingAddress(true);
//     setEditingAddressId(address.id);
//     setShowAddressForm(true);
//   };

//   const handleSelectAddress = (address) => {
//     setSelectedAddressId(address.id);
//     setShipping({
//       fullName: address.fullName,
//       phone: address.phone,
//       addressLine: address.addressLine,
//       city: address.city,
//       state: address.state,
//       pincode: address.pincode
//     });
//   };

//   // ----------- CART OR BUY NOW DETECTION -----------
//   const checkoutData = location.state;
//   let products, source;

//   if (checkoutData && typeof checkoutData === "object" && checkoutData.products) {
//     products = checkoutData.products;
//     source = checkoutData.source;
//   } else if (checkoutData && Array.isArray(checkoutData)) {
//     products = checkoutData;
//     source =
//       JSON.stringify(checkoutData) === JSON.stringify(cart)
//         ? "cart"
//         : "buyNow";
//   } else {
//     products = cart;
//     source = "cart";
//   }

//   const total = products.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//     0
//   );

//   const handleShippingChange = (e) => {
//     setShipping(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const createOrder = async (finalShipping) => {
//     const payload = {
//       shippingAddress: finalShipping,
//       paymentMode: paymentMethod === "cod" ? "COD" : "ONLINE"
//     };

//     if (source === "cart") {
//       return await api.post("/order/add", payload);
//     } else {
//       return await api.post("/order/direct", {
//         ...payload,
//         items: products.map(p => ({
//           productId: p.id,
//           quantity: p.quantity || 1
//         }))
//       });
//     }
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!user) {
//   navigate("/login");
//   return;
// }
// if (user?.isBlocked) {
//   navigate("/login", { replace: true });
//   return;
// }



//     let finalShipping = null;

//     if (selectedAddressId) {
//       const selected = addresses.find(a => a.id === selectedAddressId);

//       if (!selected) {
//         return;
//       }

//       finalShipping = {
//         fullName: selected.fullName,
//         phone: selected.phone,
//         addressLine: selected.addressLine,
//         city: selected.city,
//         state: selected.state,
//         pincode: selected.pincode
//       };
//     } else {
//       finalShipping = shipping;
//     }

//     try {
//       setIsProcessing(true);

//       if (paymentMethod === "cod") {
//         const res = await createOrder(finalShipping);
//         console.log("COD Response:", res.data);
        
//         const orderId = res.data?.data?.orderId || 
//                         res.data?.data?.id || 
//                         res.data?.orderId || 
//                         res.data?.id;
        
//         console.log("Extracted orderId:", orderId);
        
//         if (!orderId) {
//           console.error("No orderId found in response:", res.data);
//           navigate("/orders");
//           return;
//         }

//         if (source === "cart") {
//           await clearCart();
//         }

//         navigate(`/payment-success/${orderId}`, { replace: true });
//         return;
//       }

//       // ---------- RAZORPAY FLOW ----------
//       const orderRes = await createOrder(finalShipping);
//       console.log("Razorpay Order Response:", orderRes.data);
      
//       const orderId = orderRes.data?.data?.orderId || 
//                       orderRes.data?.data?.id || 
//                       orderRes.data?.orderId || 
//                       orderRes.data?.id;

//       console.log("Extracted orderId for Razorpay:", orderId);
      
//       if (!orderId) {
//         console.error("No orderId found in Razorpay response:", orderRes.data);
//         setIsProcessing(false);
//         return;
//       }

//       const rp = await api.post(`/payment/create/${orderId}`);

//       const options = {
//         key: rp.data.key,
//         amount: rp.data.amount * 100,
//         currency: "INR",
//         order_id: rp.data.razorpayOrderId,
//         name: "Sportex",
//         prefill: {
//           name: finalShipping.fullName,
//           contact: finalShipping.phone,
//           email: user.email
//         },
//         handler: async (response) => {
//           await api.post("/payment/verify", {
//             RazorpayOrderId: response.razorpay_order_id,
//             RazorpayPaymentId: response.razorpay_payment_id,
//             RazorpaySignature: response.razorpay_signature,
//             OrderId: orderId
//           });

//           if (source === "cart") {
//             await clearCart();
//           }

//           navigate(`/payment-success/${orderId}`, { replace: true });
//         }
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//   console.error(err);
//   // Do nothing here
//   // Axios interceptor + global modal will handle 401 / blocked
// }
//  finally {
//       setIsProcessing(false);
//     }
//   };

//   if (!products.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
//         <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl shadow-purple-500/10 backdrop-blur-sm border border-gray-700/50 max-w-md w-full mx-4">
//           <div className="relative inline-block mb-4">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30"></div>
//             <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 relative z-10" />
//           </div>
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
//             Your cart is empty
//           </h2>
//           <p className="text-gray-400 mb-6">Add some items to proceed to checkout</p>
//           <button
//             onClick={() => navigate("/")}
//             className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 w-full font-medium"
//           >
//             <span className="relative z-10">Continue Shopping</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const getAddressIcon = (type) => {
//     switch (type) {
//       case "home": return <Home className="w-4 h-4" />;
//       case "work": return <Briefcase className="w-4 h-4" />;
//       default: return <User className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="group relative flex items-center gap-2 text-gray-400 hover:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             <ChevronLeft className="w-5 h-5 relative z-10" />
//             <span className="relative z-10">Back</span>
//           </button>
//           <h1 className="text-3xl font-bold text-center flex-1 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
//             Secure Checkout
//           </h1>
//         </div>

//         <div className={`transform transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* LEFT COLUMN - SHIPPING & PAYMENT */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* SHIPPING ADDRESS CARD */}
//               <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl shadow-blue-500/10 p-6 hover:shadow-blue-500/20 transition-all duration-300">
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                
//                 <div className="flex items-center justify-between mb-6 relative">
//                   <div className="flex items-center gap-3">
//                     <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl">
//                       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl opacity-50"></div>
//                       <MapPin className="w-6 h-6 text-blue-400 relative z-10" />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-200">Shipping Address</h2>
//                       <p className="text-sm text-gray-400 mt-1">Select or add a delivery address</p>
//                     </div>
//                   </div>
                  
//                   {addresses.length > 0 && !showAddressForm && (
//                     <button
//                       onClick={() => {
//                         resetAddressForm();
//                         setShowAddressForm(true);
//                       }}
//                       className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-gray-300 px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
//                     >
//                       <span className="relative flex items-center gap-2">
//                         <Plus className="w-4 h-4" />
//                         Add New Address
//                       </span>
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                     </button>
//                   )}
//                 </div>

//                 {loading ? (
//                   <div className="text-center py-8">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
//                     <p className="mt-3 text-gray-400">Loading addresses...</p>
//                   </div>
//                 ) : showAddressForm ? (
//                   <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
//                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    
//                     <div className="flex items-center justify-between mb-6">
//                       <h3 className="text-lg font-semibold text-gray-200">
//                         {isEditingAddress ? "Edit Address" : "Add New Address"}
//                       </h3>
//                       <button
//                         onClick={() => {
//                           setShowAddressForm(false);
//                           resetAddressForm();
//                         }}
//                         className="text-gray-500 hover:text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors"
//                       >
//                         <X className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <form onSubmit={handleSaveAddress} className="space-y-5">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-400 mb-2">
//                             Full Name *
//                           </label>
//                           <input
//                             name="fullName"
//                             value={addressForm.fullName}
//                             onChange={handleAddressFormChange}
//                             className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
//                             required
//                             placeholder="John Doe"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-400 mb-2">
//                             Phone *
//                           </label>
//                           <input
//                             name="phone"
//                             value={addressForm.phone}
//                             onChange={handleAddressFormChange}
//                             className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
//                             required
//                             placeholder="+1 (234) 567-8900"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-2">
//                           Address *
//                         </label>
//                         <input
//                           name="addressLine"
//                           value={addressForm.addressLine}
//                           onChange={handleAddressFormChange}
//                           className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
//                           required
//                           placeholder="123 Main Street, Apt 4B"
//                         />
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-400 mb-2">
//                             City *
//                           </label>
//                           <input
//                             name="city"
//                             value={addressForm.city}
//                             onChange={handleAddressFormChange}
//                             className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
//                             required
//                             placeholder="New York"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-400 mb-2">
//                             State *
//                           </label>
//                           <input
//                             name="state"
//                             value={addressForm.state}
//                             onChange={handleAddressFormChange}
//                             className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
//                             required
//                             placeholder="NY"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-400 mb-2">
//                             Pincode *
//                           </label>
//                           <input
//                             name="pincode"
//                             value={addressForm.pincode}
//                             onChange={handleAddressFormChange}
//                             className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
//                             required
//                             placeholder="10001"
//                           />
//                         </div>
//                       </div>

//                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                         <div className="flex items-center gap-6">
//                           <label className="flex items-center gap-3 cursor-pointer group">
//                             <div className="relative">
//                               <input
//                                 type="radio"
//                                 name="addressType"
//                                 value="home"
//                                 checked={addressForm.addressType === "home"}
//                                 onChange={handleAddressFormChange}
//                                 className="sr-only"
//                               />
//                               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
//                                 addressForm.addressType === "home" 
//                                   ? "border-blue-500 bg-blue-500/20" 
//                                   : "border-gray-600 group-hover:border-blue-400"
//                               }`}>
//                                 {addressForm.addressType === "home" && (
//                                   <div className="w-3 h-3 rounded-full bg-blue-500"></div>
//                                 )}
//                               </div>
//                             </div>
//                             <span className="flex items-center gap-2 text-gray-300 group-hover:text-gray-200">
//                               <Home className="w-4 h-4" /> Home
//                             </span>
//                           </label>
//                           <label className="flex items-center gap-3 cursor-pointer group">
//                             <div className="relative">
//                               <input
//                                 type="radio"
//                                 name="addressType"
//                                 value="work"
//                                 checked={addressForm.addressType === "work"}
//                                 onChange={handleAddressFormChange}
//                                 className="sr-only"
//                               />
//                               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
//                                 addressForm.addressType === "work" 
//                                   ? "border-blue-500 bg-blue-500/20" 
//                                   : "border-gray-600 group-hover:border-blue-400"
//                               }`}>
//                                 {addressForm.addressType === "work" && (
//                                   <div className="w-3 h-3 rounded-full bg-blue-500"></div>
//                                 )}
//                               </div>
//                             </div>
//                             <span className="flex items-center gap-2 text-gray-300 group-hover:text-gray-200">
//                               <Briefcase className="w-4 h-4" /> Work
//                             </span>
//                           </label>
//                         </div>

//                         <label className="flex items-center gap-3 cursor-pointer group">
//                           <div className="relative">
//                             <input
//                               type="checkbox"
//                               name="isDefault"
//                               checked={addressForm.isDefault}
//                               onChange={handleAddressFormChange}
//                               className="sr-only"
//                             />
//                             <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
//                               addressForm.isDefault 
//                                 ? "border-blue-500 bg-blue-500/20" 
//                                 : "border-gray-600 group-hover:border-blue-400"
//                             }`}>
//                               {addressForm.isDefault && (
//                                 <Check className="w-4 h-4 text-blue-500" />
//                               )}
//                             </div>
//                           </div>
//                           <span className="text-gray-300 group-hover:text-gray-200">Set as default address</span>
//                         </label>
//                       </div>

//                       <div className="flex gap-3 pt-6">
//                         <button
//                           type="submit"
//                           className="group relative flex-1 overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
//                         >
//                           <span className="relative z-10">
//                             {isEditingAddress ? "Update Address" : "Save Address"}
//                           </span>
//                           <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setShowAddressForm(false);
//                             resetAddressForm();
//                           }}
//                           className="flex-1 border border-gray-600 text-gray-400 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800/50 hover:text-gray-300 transition-colors"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 ) : addresses.length > 0 ? (
//                   <div className="space-y-4">
//                     {addresses.map(address => (
//                       <div
//                         key={address.id}
//                         className={`group relative overflow-hidden border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
//                           selectedAddressId === address.id
//                             ? "border-blue-500 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
//                             : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/30"
//                         }`}
//                         onClick={() => handleSelectAddress(address)}
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
//                         <div className="relative flex items-start justify-between">
//                           <div className="flex items-start gap-4">
//                             <div className={`relative p-3 rounded-xl ${
//                               selectedAddressId === address.id 
//                                 ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" 
//                                 : "bg-gray-800"
//                             }`}>
//                               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl opacity-50"></div>
//                               <div className="relative text-blue-400">
//                                 {getAddressIcon(address.addressType)}
//                               </div>
//                             </div>
//                             <div>
//                               <div className="flex items-center gap-3 mb-2">
//                                 <h3 className="font-semibold text-gray-200">{address.fullName}</h3>
//                                 {address.isDefault && (
//                                   <span className="text-xs bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30">
//                                     Default
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-gray-400 mb-1">{address.addressLine}</p>
//                               <p className="text-gray-500 text-sm mb-1">
//                                 {address.city}, {address.state} - {address.pincode}
//                               </p>
//                               <p className="text-gray-500 text-sm">📱 {address.phone}</p>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-3">
//                             {selectedAddressId === address.id && (
//                               <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-full border border-blue-500/30">
//                                 <span className="flex items-center gap-1">
//                                   <Check className="w-3 h-3" /> Selected
//                                 </span>
//                               </div>
//                             )}
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleEditAddress(address);
//                                 }}
//                                 className="p-2.5 text-gray-500 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleDeleteAddress(address.id);
//                                 }}
//                                 className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
                        
//                         {!address.isDefault && (
//                           <div className="relative mt-4 pt-4 border-t border-gray-800">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleSetDefaultAddress(address.id);
//                               }}
//                               className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
//                             >
//                               <Sparkles className="w-3 h-3" />
//                               Set as default address
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <div className="relative inline-block mb-4">
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-20"></div>
//                       <MapPin className="w-12 h-12 mx-auto text-gray-400 relative z-10" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-300 mb-2">No saved addresses</h3>
//                     <p className="text-gray-500 mb-6">Add an address to proceed with checkout</p>
//                     <button
//                       onClick={() => setShowAddressForm(true)}
//                       className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
//                     >
//                       <span className="relative flex items-center justify-center gap-2">
//                         <Plus className="w-4 h-4" />
//                         Add Your First Address
//                       </span>
//                       <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* PAYMENT METHOD CARD */}
//               <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl shadow-purple-500/10 p-6 hover:shadow-purple-500/20 transition-all duration-300">
//                 <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-x-12 -translate-y-12"></div>
                
//                 <div className="flex items-center gap-3 mb-6 relative">
//                   <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl">
//                     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl opacity-50"></div>
//                     <CreditCard className="w-6 h-6 text-purple-400 relative z-10" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-200">Payment Method</h2>
//                     <p className="text-sm text-gray-400 mt-1">Choose how you want to pay</p>
//                   </div>
//                 </div>

//                 <div className="space-y-4 relative">
//                   <label className={`group relative overflow-hidden flex items-center gap-4 p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${
//                     paymentMethod === "card" 
//                       ? "border-purple-500 bg-gradient-to-r from-purple-500/10 to-pink-500/10" 
//                       : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/30"
//                   }`}>
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                     <div className="relative z-10">
//                       <input
//                         type="radio"
//                         value="card"
//                         checked={paymentMethod === "card"}
//                         onChange={() => setPaymentMethod("card")}
//                         className="sr-only"
//                       />
//                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
//                         paymentMethod === "card" 
//                           ? "border-purple-500 bg-purple-500/20" 
//                           : "border-gray-600 group-hover:border-purple-400"
//                       }`}>
//                         {paymentMethod === "card" && (
//                           <div className="w-3 h-3 rounded-full bg-purple-500"></div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-200">Card / UPI (Razorpay)</h3>
//                       <p className="text-sm text-gray-400">Pay securely with credit/debit card or UPI</p>
//                     </div>
//                     <div className="text-2xl">💳</div>
//                   </label>

//                   <label className={`group relative overflow-hidden flex items-center gap-4 p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${
//                     paymentMethod === "cod" 
//                       ? "border-amber-500 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" 
//                       : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/30"
//                   }`}>
//                     <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                     <div className="relative z-10">
//                       <input
//                         type="radio"
//                         value="cod"
//                         checked={paymentMethod === "cod"}
//                         onChange={() => setPaymentMethod("cod")}
//                         className="sr-only"
//                       />
//                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
//                         paymentMethod === "cod" 
//                           ? "border-amber-500 bg-amber-500/20" 
//                           : "border-gray-600 group-hover:border-amber-400"
//                       }`}>
//                         {paymentMethod === "cod" && (
//                           <div className="w-3 h-3 rounded-full bg-amber-500"></div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-200">Cash on Delivery</h3>
//                       <p className="text-sm text-gray-400">Pay when your order arrives</p>
//                     </div>
//                     <div className="text-2xl">💰</div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT COLUMN - ORDER SUMMARY */}
//             <div className="space-y-8">
//               <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl shadow-emerald-500/10 p-6 hover:shadow-emerald-500/20 transition-all duration-300">
//                 <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full translate-x-20 translate-y-20"></div>
                
//                 <div className="flex items-center justify-between mb-6 relative">
//                   <h2 className="text-xl font-semibold text-gray-200">Order Summary</h2>
//                   <span className="text-sm text-gray-400">{products.length} items</span>
//                 </div>
                
//                 <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
//                   {products.map(item => (
//                     <div key={item.id} className="group/item flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
//                        <img
//   src={item.image || item.imageUrl || "/placeholder.png"}
//   alt={item.name}
//   className="relative w-16 h-16 object-cover rounded-lg"
// />

//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-medium text-gray-200 truncate">{item.name}</h3>
//                         <p className="text-sm text-gray-400">
//                           Qty: {item.quantity || 1} × ${item.price.toFixed(2)}
//                         </p>
//                       </div>
//                       <div className="font-semibold text-gray-200">
//                         ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="space-y-3 pt-6 border-t border-gray-700">
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Subtotal</span>
//                     <span className="font-semibold text-gray-200">${total.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Shipping</span>
//                     <span className="font-semibold text-emerald-400 flex items-center gap-2">
//                       <Truck className="w-4 h-4" /> FREE
//                     </span>
//                   </div>
//                   <div className="pt-3 border-t border-gray-700">
//                     <div className="flex justify-between text-lg font-bold">
//                       <span className="text-gray-200">Total</span>
//                       <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
//                         ${total.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handlePayment}
// disabled={
//   isProcessing ||
//   user?.isBlocked ||
//   (!selectedAddressId && addresses.length > 0)
// }
//                  className={`group relative overflow-hidden w-full py-4 rounded-xl font-semibold mt-6 transition-all duration-300 ${
//   isProcessing || user?.isBlocked || (!selectedAddressId && addresses.length > 0)
//     ? "bg-gray-700 cursor-not-allowed"
//     : "bg-gradient-to-r from-emerald-600 to-green-600 hover:shadow-lg hover:shadow-emerald-500/25"
// }`}

//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                   {isProcessing ? (
//                     <span className="relative flex items-center justify-center gap-2 text-white">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Processing...
//                     </span>
//                   ) : paymentMethod === "cod" ? (
//                     <span className="relative flex items-center justify-center gap-2 text-white">
//                       Place COD Order (${total.toFixed(2)})
//                       <Sparkles className="w-4 h-4" />
//                     </span>
//                   ) : (
//                     <span className="relative flex items-center justify-center gap-2 text-white">
//                       Pay ${total.toFixed(2)} Securely
//                       <Lock className="w-4 h-4" />
//                     </span>
//                   )}
//                 </button>

//                 <div className="flex items-center justify-center gap-3 mt-5 text-sm text-gray-500">
//                   <Shield className="w-4 h-4" />
//                   <span>Your payment is secure and encrypted</span>
//                 </div>
//               </div>

//               {/* NEED HELP CARD - Moved outside the sticky container */}
//               <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
//                 <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full -translate-y-8 translate-x-8"></div>
                
//                 <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
//                   <AlertCircle className="w-5 h-5" />
//                   Need help?
//                 </h3>
//                 <p className="text-blue-400 text-sm mb-4">
//                   Contact our customer support for assistance with your order.
//                 </p>
//                 <div className="text-blue-300 text-sm space-y-2">
//                   <p className="flex items-center gap-2">
//                     <span className="text-blue-400">📞</span> +1 (800) 123-4567
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <span className="text-blue-400">✉️</span> support@sportex.com
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard, Lock, ShoppingBag, MapPin, Plus, Edit2, Trash2,
  Check, X, ChevronLeft, Home, Briefcase, User, Shield, Truck,
  AlertCircle, Sparkles, ChevronRight
} from "lucide-react";
import api from "../Api/Axios_Instance.jsx";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [addressForm, setAddressForm] = useState({
    fullName: "", phone: "", addressLine: "", city: "", state: "",
    pincode: "", addressType: "home", isDefault: false
  });

  const [shipping, setShipping] = useState({
    fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: ""
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [animate, setAnimate] = useState(false);

  useEffect(() => setAnimate(true), []);

  useEffect(() => { if (user) fetchAddresses(); }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/address");
      const addressList = res.data.data || [];
      setAddresses(addressList);
      const defaultAddr = addressList.find(a => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
        setShipping({ fullName: defaultAddr.fullName, phone: defaultAddr.phone, addressLine: defaultAddr.addressLine, city: defaultAddr.city, state: defaultAddr.state, pincode: defaultAddr.pincode });
      }
    } catch {}
    finally { setLoading(false); }
  };

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetAddressForm = () => {
    setAddressForm({ fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: "", addressType: "home", isDefault: false });
    setIsEditingAddress(false);
    setEditingAddressId(null);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (isEditingAddress) await api.put(`/address/${editingAddressId}`, addressForm);
      else await api.post("/address", addressForm);
      await fetchAddresses();
      resetAddressForm();
      setShowAddressForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save address");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try { await api.delete(`/address/${id}`); await fetchAddresses(); } catch {}
  };

  const handleSetDefaultAddress = async (id) => {
    try { await api.put(`/address/${id}/set-default`); await fetchAddresses(); } catch {}
  };

  const handleEditAddress = (address) => {
    setAddressForm({ fullName: address.fullName, phone: address.phone, addressLine: address.addressLine, city: address.city, state: address.state, pincode: address.pincode, addressType: address.addressType || "home", isDefault: address.isDefault });
    setIsEditingAddress(true);
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    setShipping({ fullName: address.fullName, phone: address.phone, addressLine: address.addressLine, city: address.city, state: address.state, pincode: address.pincode });
  };

  const checkoutData = location.state;
  let products, source;
  if (checkoutData && typeof checkoutData === "object" && checkoutData.products) {
    products = checkoutData.products; source = checkoutData.source;
  } else if (checkoutData && Array.isArray(checkoutData)) {
    products = checkoutData;
    source = JSON.stringify(checkoutData) === JSON.stringify(cart) ? "cart" : "buyNow";
  } else {
    products = cart; source = "cart";
  }

  const total = products.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleShippingChange = (e) => setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const createOrder = async (finalShipping) => {
    const payload = { shippingAddress: finalShipping, paymentMode: paymentMethod === "cod" ? "COD" : "ONLINE" };
    if (source === "cart") return await api.post("/order/add", payload);
    return await api.post("/order/direct", { ...payload, items: products.map(p => ({ productId: p.id, quantity: p.quantity || 1 })) });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    if (user?.isBlocked) { navigate("/login", { replace: true }); return; }

    let finalShipping = null;
    if (selectedAddressId) {
      const selected = addresses.find(a => a.id === selectedAddressId);
      if (!selected) return;
      finalShipping = { fullName: selected.fullName, phone: selected.phone, addressLine: selected.addressLine, city: selected.city, state: selected.state, pincode: selected.pincode };
    } else {
      finalShipping = shipping;
    }

    try {
      setIsProcessing(true);
      if (paymentMethod === "cod") {
        const res = await createOrder(finalShipping);
        console.log("COD Response:", res.data);
        const orderId = res.data?.data?.orderId || res.data?.data?.id || res.data?.orderId || res.data?.id;
        console.log("Extracted orderId:", orderId);
        if (!orderId) { console.error("No orderId found in response:", res.data); navigate("/orders"); return; }
        if (source === "cart") await clearCart();
        navigate(`/payment-success/${orderId}`, { replace: true });
        return;
      }
      const orderRes = await createOrder(finalShipping);
      console.log("Razorpay Order Response:", orderRes.data);
      const orderId = orderRes.data?.data?.orderId || orderRes.data?.data?.id || orderRes.data?.orderId || orderRes.data?.id;
      console.log("Extracted orderId for Razorpay:", orderId);
      if (!orderId) { console.error("No orderId found in Razorpay response:", orderRes.data); setIsProcessing(false); return; }
      const rp = await api.post(`/payment/create/${orderId}`);
      const options = {
        key: rp.data.key, amount: rp.data.amount * 100, currency: "INR",
        order_id: rp.data.razorpayOrderId, name: "Sportex",
        prefill: { name: finalShipping.fullName, contact: finalShipping.phone, email: user.email },
        handler: async (response) => {
          await api.post("/payment/verify", { RazorpayOrderId: response.razorpay_order_id, RazorpayPaymentId: response.razorpay_payment_id, RazorpaySignature: response.razorpay_signature, OrderId: orderId });
          if (source === "cart") await clearCart();
          navigate(`/payment-success/${orderId}`, { replace: true });
        }
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "home": return <Home size={13} />;
      case "work": return <Briefcase size={13} />;
      default: return <User size={13} />;
    }
  };

  if (!products.length) {
    return (
      <>
        <style>{STYLES}</style>
        <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, paddingTop: 80 }}>
          <div style={{ border: "1px solid #1a1a1a", padding: "44px 36px", maxWidth: 380, width: "100%", textAlign: "center", fontFamily: "'Barlow', sans-serif" }}>
            <ShoppingBag size={36} style={{ margin: "0 auto 14px", color: "#2a2a2a" }} />
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: "0.1em", color: "#fff", textTransform: "uppercase", margin: "0 0 8px" }}>CART EMPTY</h2>
            <p style={{ color: "#444", marginBottom: 22, fontSize: 12, letterSpacing: "0.05em" }}>Add items to proceed to checkout</p>
            <button className="btn-p" onClick={() => navigate("/")} style={{ width: "100%" }}>CONTINUE SHOPPING</button>
          </div>
        </div>
      </>
    );
  }

  const isPayDisabled = isProcessing || user?.isBlocked || (!selectedAddressId && addresses.length > 0);

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ minHeight: "100vh", background: "#000", paddingTop: 80, fontFamily: "'Barlow', sans-serif" }}>
        <div className="co-wrap">

          {/* HEADER */}
          <div className="co-hdr">
            <button className="co-back" onClick={() => navigate(-1)}>
              <ChevronLeft size={15} /> BACK
            </button>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "clamp(20px, 4vw, 32px)", margin: 0 }}>
              SECURE CHECKOUT
            </h1>
            <div style={{ width: 70 }} />
          </div>

          <div className="co-divider" />

          {/* GRID */}
          <div className={`co-grid${animate ? " in" : ""}`}>

            {/* ═══ LEFT ═══ */}
            <div className="co-lcol">

              {/* SHIPPING ADDRESS */}
              <div className="co-sec">
                <div className="co-sec-hdr">
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div className="co-isq"><MapPin size={15} /></div>
                    <div>
                      <div className="co-slbl">SHIPPING ADDRESS</div>
                      <div className="co-ssub">Select or add a delivery address</div>
                    </div>
                  </div>
                  {addresses.length > 0 && !showAddressForm && (
                    <button className="co-ghost-sm" onClick={() => { resetAddressForm(); setShowAddressForm(true); }}>
                      <Plus size={11} /> ADD NEW
                    </button>
                  )}
                </div>

                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 0", color: "#3a3a3a", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, letterSpacing: "0.1em" }}>
                    <div className="co-spin" /> LOADING ADDRESSES...
                  </div>
                ) : showAddressForm ? (
                  <div className="co-fb">
                    <div className="co-fb-hdr">
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "#fff" }}>
                        {isEditingAddress ? "EDIT ADDRESS" : "ADD ADDRESS"}
                      </span>
                      <button className="co-xbtn" onClick={() => { setShowAddressForm(false); resetAddressForm(); }}><X size={13} /></button>
                    </div>
                    <form onSubmit={handleSaveAddress} className="co-form">
                      <div className="co-r2">
                        <div className="co-field">
                          <label className="co-lbl">FULL NAME *</label>
                          <input name="fullName" value={addressForm.fullName} onChange={handleAddressFormChange} className="co-inp" required placeholder="John Doe" />
                        </div>
                        <div className="co-field">
                          <label className="co-lbl">PHONE *</label>
                          <input name="phone" value={addressForm.phone} onChange={handleAddressFormChange} className="co-inp" required placeholder="+1 234 567 8900" />
                        </div>
                      </div>
                      <div className="co-field">
                        <label className="co-lbl">ADDRESS *</label>
                        <input name="addressLine" value={addressForm.addressLine} onChange={handleAddressFormChange} className="co-inp" required placeholder="123 Main Street, Apt 4B" />
                      </div>
                      <div className="co-r3">
                        <div className="co-field">
                          <label className="co-lbl">CITY *</label>
                          <input name="city" value={addressForm.city} onChange={handleAddressFormChange} className="co-inp" required placeholder="New York" />
                        </div>
                        <div className="co-field">
                          <label className="co-lbl">STATE *</label>
                          <input name="state" value={addressForm.state} onChange={handleAddressFormChange} className="co-inp" required placeholder="NY" />
                        </div>
                        <div className="co-field">
                          <label className="co-lbl">PINCODE *</label>
                          <input name="pincode" value={addressForm.pincode} onChange={handleAddressFormChange} className="co-inp" required placeholder="10001" />
                        </div>
                      </div>

                      <div className="co-opts-row">
                        <div style={{ display: "flex", gap: 18 }}>
                          {["home", "work"].map(type => (
                            <label key={type} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
                              <input type="radio" name="addressType" value={type} checked={addressForm.addressType === type} onChange={handleAddressFormChange} className="sr-only" />
                              <div className={`co-rb${addressForm.addressType === type ? " on" : ""}`}>
                                {addressForm.addressType === type && <div className="co-rdot" />}
                              </div>
                              <span className="co-rtxt">
                                {type === "home" ? <Home size={11} /> : <Briefcase size={11} />}
                                {type.toUpperCase()}
                              </span>
                            </label>
                          ))}
                        </div>
                        <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
                          <input type="checkbox" name="isDefault" checked={addressForm.isDefault} onChange={handleAddressFormChange} className="sr-only" />
                          <div className={`co-cb${addressForm.isDefault ? " on" : ""}`}>
                            {addressForm.isDefault && <Check size={9} />}
                          </div>
                          <span className="co-rtxt">SET AS DEFAULT</span>
                        </label>
                      </div>

                      <div className="co-fact">
                        <button type="submit" className="btn-p" style={{ flex: 1 }}>
                          {isEditingAddress ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                        </button>
                        <button type="button" className="btn-o" style={{ flex: 1 }} onClick={() => { setShowAddressForm(false); resetAddressForm(); }}>
                          CANCEL
                        </button>
                      </div>
                    </form>
                  </div>
                ) : addresses.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {addresses.map(address => (
                      <div
                        key={address.id}
                        className={`co-acard${selectedAddressId === address.id ? " sel" : ""}`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <div className="co-aic">{getAddressIcon(address.addressType)}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3 }}>
                              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.07em", color: "#fff" }}>{address.fullName}</span>
                              {address.isDefault && <span className="co-dtag">DEFAULT</span>}
                              {selectedAddressId === address.id && <span className="co-stag"><Check size={9} /> SELECTED</span>}
                            </div>
                            <p style={{ fontSize: 11, color: "#484848", lineHeight: 1.6, margin: 0 }}>{address.addressLine}</p>
                            <p style={{ fontSize: 11, color: "#303030", lineHeight: 1.6, margin: 0 }}>{address.city}, {address.state} — {address.pincode}</p>
                            <p style={{ fontSize: 11, color: "#303030", lineHeight: 1.6, margin: 0 }}>{address.phone}</p>
                          </div>
                          <div style={{ display: "flex", gap: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                            <button className="co-ib" onClick={() => handleEditAddress(address)}><Edit2 size={12} /></button>
                            <button className="co-ib d" onClick={() => handleDeleteAddress(address.id)}><Trash2 size={12} /></button>
                          </div>
                        </div>
                        {!address.isDefault && (
                          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #0d0d0d" }} onClick={e => e.stopPropagation()}>
                            <button className="co-sdb" onClick={() => handleSetDefaultAddress(address.id)}>SET AS DEFAULT</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "36px 16px", textAlign: "center", gap: 6 }}>
                    <MapPin size={30} style={{ color: "#222", marginBottom: 10 }} />
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.12em", color: "#2a2a2a" }}>NO SAVED ADDRESSES</div>
                    <p style={{ fontSize: 11, color: "#2a2a2a", marginBottom: 14 }}>Add an address to proceed with checkout</p>
                    <button className="btn-p" onClick={() => setShowAddressForm(true)}>
                      <Plus size={13} /> ADD YOUR FIRST ADDRESS
                    </button>
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD */}
              <div className="co-sec">
                <div className="co-sec-hdr" style={{ borderBottom: "none", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div className="co-isq"><CreditCard size={15} /></div>
                    <div>
                      <div className="co-slbl">PAYMENT METHOD</div>
                      <div className="co-ssub">Choose how you want to pay</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { value: "card", label: "CARD / UPI (RAZORPAY)", sub: "Pay securely with card or UPI", icon: "💳" },
                    { value: "cod", label: "CASH ON DELIVERY", sub: "Pay when your order arrives", icon: "💰" }
                  ].map(opt => (
                    <label key={opt.value} className={`co-popt${paymentMethod === opt.value ? " on" : ""}`}>
                      <input type="radio" value={opt.value} checked={paymentMethod === opt.value} onChange={() => setPaymentMethod(opt.value)} className="sr-only" />
                      <div className={`co-rb${paymentMethod === opt.value ? " on" : ""}`} style={{ flexShrink: 0 }}>
                        {paymentMethod === opt.value && <div className="co-rdot" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "#fff" }}>{opt.label}</div>
                        <div style={{ fontSize: 11, color: "#3a3a3a", marginTop: 2 }}>{opt.sub}</div>
                      </div>
                      <span style={{ fontSize: 18 }}>{opt.icon}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ RIGHT ═══ */}
            <div className="co-rcol">

              {/* ORDER SUMMARY */}
              <div className="co-sec">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #111" }}>
                  <span className="co-slbl">ORDER SUMMARY</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#3a3a3a" }}>
                    {products.length} {products.length === 1 ? "ITEM" : "ITEMS"}
                  </span>
                </div>

                <div className="co-plist">
                  {products.map(item => (
                    <div key={item.id} className="co-prow">
                      <div style={{ width: 48, height: 48, border: "1px solid #1a1a1a", flexShrink: 0, overflow: "hidden" }}>
                        <img src={item.image || item.imageUrl || "/placeholder.png"} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(15%)" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", color: "#bbb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                        <div style={{ fontSize: 10, color: "#3a3a3a", marginTop: 2 }}>Qty: {item.quantity || 1} × ${item.price.toFixed(2)}</div>
                      </div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="co-divider" style={{ margin: "14px 0" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <div className="co-trow">
                    <span style={{ color: "#3a3a3a" }}>SUBTOTAL</span>
                    <span style={{ color: "#bbb" }}>${total.toFixed(2)}</span>
                  </div>
                  <div className="co-trow">
                    <span style={{ color: "#3a3a3a" }}>SHIPPING</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#444", border: "1px solid #1a1a1a", padding: "2px 7px" }}>
                      <Truck size={11} /> FREE
                    </span>
                  </div>
                  <div className="co-divider" style={{ margin: "4px 0" }} />
                  <div className="co-trow" style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#2a2a2a", letterSpacing: "0.07em", textAlign: "right" }}>INCLUSIVE OF ALL TAXES</div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isPayDisabled}
                  className={`co-paybtn${isPayDisabled ? " dis" : ""}`}
                >
                  {isProcessing ? (
                    <><div className="co-spin" /> PROCESSING...</>
                  ) : paymentMethod === "cod" ? (
                    <>PLACE COD ORDER — ${total.toFixed(2)} <Sparkles size={13} /></>
                  ) : (
                    <><Lock size={13} /> PAY ${total.toFixed(2)} SECURELY</>
                  )}
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 10, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "#2a2a2a", textTransform: "uppercase" }}>
                  <Shield size={11} /> YOUR PAYMENT IS SECURE AND ENCRYPTED
                </div>
              </div>

              {/* HELP */}
              <div style={{ border: "1px solid #1a1a1a", padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#555", marginBottom: 7 }}>
                  <AlertCircle size={13} /> NEED HELP?
                </div>
                <p style={{ fontSize: 11, color: "#2a2a2a", marginBottom: 10, lineHeight: 1.5 }}>Contact our customer support for assistance with your order.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", color: "#3a3a3a" }}>
                  <span>📞 +1 (800) 123-4567</span>
                  <span>✉️ support@sportex.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800&family=Barlow:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

  .co-wrap { max-width: 1100px; margin: 0 auto; padding: 28px 16px 80px; }

  .co-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; gap: 12px; }
  .co-back { display: flex; align-items: center; gap: 5px; background: none; border: none; color: #444; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; cursor: pointer; padding: 0; transition: color 0.2s; text-transform: uppercase; width: 70px; }
  .co-back:hover { color: #fff; }

  .co-divider { width: 100%; height: 1px; background: #1a1a1a; margin-bottom: 24px; }

  .co-grid { display: grid; grid-template-columns: 1fr 340px; gap: 16px; opacity: 0; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .co-grid.in { opacity: 1; transform: translateY(0); }
  @media(max-width:860px){ .co-grid { grid-template-columns: 1fr; } .co-rcol { order: -1; } }

  .co-lcol, .co-rcol { display: flex; flex-direction: column; gap: 14px; }

  .co-sec { border: 1px solid #1a1a1a; padding: 20px; background: #000; }
  .co-sec-hdr { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #111; gap: 12px; }
  .co-isq { width: 32px; height: 32px; border: 1px solid #1e1e1e; display: flex; align-items: center; justify-content: center; color: #444; flex-shrink: 0; }
  .co-slbl { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.12em; color: #fff; text-transform: uppercase; }
  .co-ssub { font-size: 10px; color: "#3a3a3a"; letter-spacing: 0.04em; margin-top: 2px; color: #3a3a3a; }

  .co-ghost-sm { display: inline-flex; align-items: center; gap: 4px; background: none; border: 1px solid #1e1e1e; color: #444; padding: 6px 12px; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s, color 0.2s; white-space: nowrap; }
  .co-ghost-sm:hover { border-color: #555; color: #ccc; }

  .co-spin { width: 14px; height: 14px; border: 2px solid #1a1a1a; border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .co-fb { border: 1px solid #1a1a1a; padding: 16px; }
  .co-fb-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #0f0f0f; }
  .co-xbtn { background: none; border: 1px solid #1a1a1a; color: #3a3a3a; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
  .co-xbtn:hover { border-color: #555; color: #ccc; }

  .co-form { display: flex; flex-direction: column; gap: 12px; }
  .co-r2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .co-r3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  @media(max-width:560px){ .co-r2 { grid-template-columns: 1fr; } .co-r3 { grid-template-columns: 1fr 1fr; } }
  @media(max-width:380px){ .co-r3 { grid-template-columns: 1fr; } }

  .co-field { display: flex; flex-direction: column; gap: 5px; }
  .co-lbl { font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.15em; color: "#3a3a3a"; color: #3a3a3a; }
  .co-inp { width: 100%; background: #050505; border: 1px solid #1a1a1a; color: #bbb; padding: 10px 12px; font-family: 'Barlow', sans-serif; font-size: 12px; outline: none; transition: border-color 0.2s; }
  .co-inp::placeholder { color: #252525; }
  .co-inp:focus { border-color: #3a3a3a; color: #fff; }

  .co-opts-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
  .co-rb { width: 15px; height: 15px; border: 1px solid #2a2a2a; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s; flex-shrink: 0; }
  .co-rb.on { border-color: #fff; }
  .co-rdot { width: 7px; height: 7px; background: #fff; border-radius: 50%; }
  .co-cb { width: 15px; height: 15px; border: 1px solid #2a2a2a; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s; flex-shrink: 0; }
  .co-cb.on { border-color: #fff; }
  .co-rtxt { display: flex; align-items: center; gap: 4px; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; color: #444; }
  .co-fact { display: flex; gap: 10px; padding-top: 6px; }

  .btn-p { display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: #fff; color: #000; border: none; padding: 12px 18px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .btn-p:hover { background: #ddd; }
  .btn-o { display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: transparent; color: #444; border: 1px solid #252525; padding: 12px 18px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
  .btn-o:hover { border-color: #555; color: #bbb; }

  .co-acard { border: 1px solid #1a1a1a; padding: 13px; cursor: pointer; transition: border-color 0.2s; }
  .co-acard:hover { border-color: #2e2e2e; }
  .co-acard.sel { border-color: #fff; }
  .co-aic { width: 26px; height: 26px; border: 1px solid #1a1a1a; display: flex; align-items: center; justify-content: center; color: "#3a3a3a"; color: #3a3a3a; flex-shrink: 0; }
  .co-acard.sel .co-aic { border-color: #3a3a3a; color: #aaa; }
  .co-dtag { font-family: 'Barlow Condensed', sans-serif; font-size: 8px; font-weight: 700; letter-spacing: 0.12em; color: "#3a3a3a"; color: #3a3a3a; border: 1px solid #1a1a1a; padding: 2px 5px; }
  .co-stag { display: inline-flex; align-items: center; gap: 3px; font-family: 'Barlow Condensed', sans-serif; font-size: 8px; font-weight: 700; letter-spacing: 0.12em; color: #fff; border: 1px solid #fff; padding: 2px 5px; }
  .co-ib { width: 26px; height: 26px; background: none; border: 1px solid #1a1a1a; color: "#2e2e2e"; color: #2e2e2e; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
  .co-ib:hover { border-color: #555; color: #aaa; }
  .co-ib.d:hover { border-color: #500; color: #a33; }
  .co-sdb { background: none; border: none; color: "#2e2e2e"; color: #2e2e2e; font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; cursor: pointer; padding: 0; transition: color 0.2s; text-transform: uppercase; }
  .co-sdb:hover { color: #fff; }

  .co-popt { display: flex; align-items: center; gap: 12px; padding: 13px; border: 1px solid #1a1a1a; cursor: pointer; transition: border-color 0.2s; }
  .co-popt:hover { border-color: #2e2e2e; }
  .co-popt.on { border-color: #fff; }

  .co-plist { display: flex; flex-direction: column; max-height: 220px; overflow-y: auto; }
  .co-plist::-webkit-scrollbar { width: 2px; }
  .co-plist::-webkit-scrollbar-track { background: #000; }
  .co-plist::-webkit-scrollbar-thumb { background: #1a1a1a; }
  .co-prow { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #0c0c0c; }
  .co-prow:last-child { border-bottom: none; }

  .co-trow { display: flex; align-items: center; justify-content: space-between; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; }

  .co-paybtn { width: 100%; margin-top: 16px; padding: 14px; background: #fff; color: #000; border: none; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 7px; }
  .co-paybtn:hover:not(.dis) { background: #ddd; }
  .co-paybtn.dis { background: #0d0d0d; color: #252525; cursor: not-allowed; }
`;