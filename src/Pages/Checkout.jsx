






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
//   User
// } from "lucide-react";
// import api from "../Api/Axios_Instance.jsx";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import toast from "react-hot-toast";

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
//       toast.error("Failed to load addresses");
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
//         toast.success("Address updated successfully");
//       } else {
//         await api.post("/address", addressForm);
//         toast.success("Address added successfully");
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
//       toast.success("Address deleted");
//       await fetchAddresses();
//     } catch {
//       toast.error("Failed to delete address");
//     }
//   };

//   const handleSetDefaultAddress = async (id) => {
//     try {
//       await api.put(`/address/${id}/set-default`);
//       toast.success("Default address updated");
//       await fetchAddresses();
//     } catch {
//       toast.error("Failed to update default address");
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
//   e.preventDefault();

//   if (!user) {
//     toast.error("Please login first");
//     return;
//   }

//   let finalShipping = null;

//   if (selectedAddressId) {
//     const selected = addresses.find(a => a.id === selectedAddressId);

//     if (!selected) {
//       toast.error("Please select a shipping address");
//       return;
//     }

//     finalShipping = {
//       fullName: selected.fullName,
//       phone: selected.phone,
//       addressLine: selected.addressLine,
//       city: selected.city,
//       state: selected.state,
//       pincode: selected.pincode
//     };
//   } else {
//     finalShipping = shipping;
//   }

//   try {
//     setIsProcessing(true);

//     if (paymentMethod === "cod") {
//       const res = await createOrder(finalShipping);
//       console.log("COD Response:", res.data); // Debug log
      
//       // ✅ FIXED: Get orderId from the correct response structure
//       // Your backend returns: { success: true, data: { orderId: 123 } }
//       // OR sometimes just: { data: { id: 123 } }
//       const orderId = res.data?.data?.orderId || 
//                       res.data?.data?.id || 
//                       res.data?.orderId || 
//                       res.data?.id;
      
//       console.log("Extracted orderId:", orderId);
      
//       if (!orderId) {
//         console.error("No orderId found in response:", res.data);
//         toast.error("Order created but could not get order ID");
//         navigate("/orders");
//         return;
//       }

//       if (source === "cart") {
//         await clearCart();
//       }

//       toast.success("Order placed (Cash on Delivery) ✅");
//       navigate(`/payment-success/${orderId}`, { replace: true });
//       return;
//     }

//     // ---------- RAZORPAY FLOW ----------
//     const orderRes = await createOrder(finalShipping);
//     console.log("Razorpay Order Response:", orderRes.data); // Debug log
    
//     // ✅ FIXED: Get orderId from the correct response structure
//     const orderId = orderRes.data?.data?.orderId || 
//                     orderRes.data?.data?.id || 
//                     orderRes.data?.orderId || 
//                     orderRes.data?.id;

//     console.log("Extracted orderId for Razorpay:", orderId);
    
//     if (!orderId) {
//       console.error("No orderId found in Razorpay response:", orderRes.data);
//       toast.error("Could not create order. Please try again.");
//       setIsProcessing(false);
//       return;
//     }

//     const rp = await api.post(`/payment/create/${orderId}`);

//     const options = {
//       key: rp.data.key,
//       amount: rp.data.amount * 100,
//       currency: "INR",
//       order_id: rp.data.razorpayOrderId,
//       name: "Sportex",
//       prefill: {
//         name: finalShipping.fullName,
//         contact: finalShipping.phone,
//         email: user.email
//       },
//       handler: async (response) => {
//         await api.post("/payment/verify", {
//           RazorpayOrderId: response.razorpay_order_id,
//           RazorpayPaymentId: response.razorpay_payment_id,
//           RazorpaySignature: response.razorpay_signature,
//           OrderId: orderId
//         });

//         if (source === "cart") {
//           await clearCart();
//         }

//         toast.success("Payment successful 🎉");
//         navigate(`/payment-success/${orderId}`, { replace: true });
//       }
//     };

//     new window.Razorpay(options).open();
//   } catch (err) {
//     console.error(err);
//     toast.error(err.response?.data?.message || "Payment failed");
//   } finally {
//     setIsProcessing(false);
//   }
// };

//   // const handlePayment = async (e) => {
//   //   e.preventDefault();

//   //   if (!user) {
//   //     toast.error("Please login first");
//   //     return;
//   //   }

//   //   let finalShipping = null;

//   //   if (selectedAddressId) {
//   //     const selected = addresses.find(a => a.id === selectedAddressId);

//   //     if (!selected) {
//   //       toast.error("Please select a shipping address");
//   //       return;
//   //     }

//   //     finalShipping = {
//   //       fullName: selected.fullName,
//   //       phone: selected.phone,
//   //       addressLine: selected.addressLine,
//   //       city: selected.city,
//   //       state: selected.state,
//   //       pincode: selected.pincode
//   //     };
//   //   } else {
//   //     finalShipping = shipping;
//   //   }

//   //   try {
//   //     setIsProcessing(true);

//   //     if (paymentMethod === "cod") {
//   //       const res = await createOrder(finalShipping);
//   //       const orderId = res.data.data.orderId;

//   //       if (source === "cart") {
//   //         await clearCart();
//   //       }

//   //       toast.success("Order placed (Cash on Delivery) ✅");
//   //       navigate(`/payment-success/${orderId}`, { replace: true });
//   //       return;
//   //     }

//   //     const orderRes = await createOrder(finalShipping);
//   //     const orderId = orderRes.data.data.orderId;

//   //     const rp = await api.post(`/payment/create/${orderId}`);

//   //     const options = {
//   //       key: rp.data.key,
//   //       amount: rp.data.amount * 100,
//   //       currency: "INR",
//   //       order_id: rp.data.razorpayOrderId,
//   //       name: "Sportex",
//   //       prefill: {
//   //         name: finalShipping.fullName,
//   //         contact: finalShipping.phone,
//   //         email: user.email
//   //       },
//   //       handler: async (response) => {
//   //         await api.post("/payment/verify", {
//   //           RazorpayOrderId: response.razorpay_order_id,
//   //           RazorpayPaymentId: response.razorpay_payment_id,
//   //           RazorpaySignature: response.razorpay_signature,
//   //           OrderId: orderId
//   //         });

//   //         if (source === "cart") {
//   //           await clearCart();
//   //         }

//   //         toast.success("Payment successful 🎉");
//   //         navigate(`/payment-success/${orderId}`, { replace: true });
//   //       }
//   //     };

//   //     new window.Razorpay(options).open();
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error(err.response?.data?.message || "Payment failed");
//   //   } finally {
//   //     setIsProcessing(false);
//   //   }
//   // };

//   if (!products.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
//           <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//           <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
//           <p className="text-gray-600 mb-6">Add some items to proceed to checkout</p>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors w-full"
//           >
//             Continue Shopping
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
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-600 hover:text-slate-900"
//           >
//             <ChevronLeft className="w-5 h-5" />
//             Back
//           </button>
//           <h1 className="text-3xl font-bold text-center flex-1">Secure Checkout</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* LEFT COLUMN - SHIPPING & PAYMENT */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* SHIPPING ADDRESS CARD */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-blue-100 p-2 rounded-lg">
//                     <MapPin className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h2 className="text-xl font-semibold">Shipping Address</h2>
//                 </div>
                
//                 {addresses.length > 0 && !showAddressForm && (
//                   <button
//                     onClick={() => {
//                       resetAddressForm();
//                       setShowAddressForm(true);
//                     }}
//                     className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add New Address
//                   </button>
//                 )}
//               </div>

//               {loading ? (
//                 <div className="text-center py-8">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
//                   <p className="mt-2 text-gray-600">Loading addresses...</p>
//                 </div>
//               ) : showAddressForm ? (
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold">
//                       {isEditingAddress ? "Edit Address" : "Add New Address"}
//                     </h3>
//                     <button
//                       onClick={() => {
//                         setShowAddressForm(false);
//                         resetAddressForm();
//                       }}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <form onSubmit={handleSaveAddress} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Full Name *
//                         </label>
//                         <input
//                           name="fullName"
//                           value={addressForm.fullName}
//                           onChange={handleAddressFormChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Phone *
//                         </label>
//                         <input
//                           name="phone"
//                           value={addressForm.phone}
//                           onChange={handleAddressFormChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Address *
//                       </label>
//                       <input
//                         name="addressLine"
//                         value={addressForm.addressLine}
//                         onChange={handleAddressFormChange}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         required
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           City *
//                         </label>
//                         <input
//                           name="city"
//                           value={addressForm.city}
//                           onChange={handleAddressFormChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           State *
//                         </label>
//                         <input
//                           name="state"
//                           value={addressForm.state}
//                           onChange={handleAddressFormChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Pincode *
//                         </label>
//                         <input
//                           name="pincode"
//                           value={addressForm.pincode}
//                           onChange={handleAddressFormChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="addressType"
//                             value="home"
//                             checked={addressForm.addressType === "home"}
//                             onChange={handleAddressFormChange}
//                             className="text-blue-600"
//                           />
//                           <span className="flex items-center gap-1">
//                             <Home className="w-4 h-4" /> Home
//                           </span>
//                         </label>
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="radio"
//                             name="addressType"
//                             value="work"
//                             checked={addressForm.addressType === "work"}
//                             onChange={handleAddressFormChange}
//                             className="text-blue-600"
//                           />
//                           <span className="flex items-center gap-1">
//                             <Briefcase className="w-4 h-4" /> Work
//                           </span>
//                         </label>
//                       </div>

//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           name="isDefault"
//                           checked={addressForm.isDefault}
//                           onChange={handleAddressFormChange}
//                           className="rounded text-blue-600"
//                         />
//                         <span>Set as default address</span>
//                       </label>
//                     </div>

//                     <div className="flex gap-3 pt-4">
//                       <button
//                         type="submit"
//                         className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                       >
//                         {isEditingAddress ? "Update Address" : "Save Address"}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setShowAddressForm(false);
//                           resetAddressForm();
//                         }}
//                         className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               ) : addresses.length > 0 ? (
//                 <div className="space-y-4">
//                   {addresses.map(address => (
//                     <div
//                       key={address.id}
//                       className={`border rounded-xl p-4 cursor-pointer transition-all ${
//                         selectedAddressId === address.id
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200 hover:border-gray-300"
//                       }`}
//                       onClick={() => handleSelectAddress(address)}
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-start gap-3">
//                           <div className={`p-2 rounded-lg ${
//                             selectedAddressId === address.id ? "bg-blue-100" : "bg-gray-100"
//                           }`}>
//                             {getAddressIcon(address.addressType)}
//                           </div>
//                           <div>
//                             <div className="flex items-center gap-2">
//                               <h3 className="font-semibold">{address.fullName}</h3>
//                               {address.isDefault && (
//                                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                                   Default
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-gray-600">{address.addressLine}</p>
//                             <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
//                             <p className="text-gray-600">Phone: {address.phone}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           {selectedAddressId === address.id && (
//                             <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                               Selected
//                             </div>
//                           )}
//                           <div className="flex gap-1">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleEditAddress(address);
//                               }}
//                               className="p-2 text-gray-500 hover:text-blue-600"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleDeleteAddress(address.id);
//                               }}
//                               className="p-2 text-gray-500 hover:text-red-600"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {!address.isDefault && (
//                         <div className="mt-3 pt-3 border-t border-gray-100">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleSetDefaultAddress(address.id);
//                             }}
//                             className="text-sm text-blue-600 hover:text-blue-800"
//                           >
//                             Set as default address
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//                   <h3 className="text-lg font-semibold text-gray-700 mb-2">No saved addresses</h3>
//                   <p className="text-gray-600 mb-6">Add an address to proceed with checkout</p>
//                   <button
//                     onClick={() => setShowAddressForm(true)}
//                     className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
//                   >
//                     <Plus className="w-4 h-4 inline mr-2" />
//                     Add Your First Address
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* PAYMENT METHOD CARD */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="bg-purple-100 p-2 rounded-lg">
//                   <CreditCard className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <h2 className="text-xl font-semibold">Payment Method</h2>
//               </div>

//               <div className="space-y-4">
//                 <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 ${
//                   paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"
//                 }`}>
//                   <input
//                     type="radio"
//                     value="card"
//                     checked={paymentMethod === "card"}
//                     onChange={() => setPaymentMethod("card")}
//                     className="text-blue-600"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold">Card / UPI (Razorpay)</h3>
//                     <p className="text-sm text-gray-600">Pay securely with credit/debit card or UPI</p>
//                   </div>
//                   <div className="text-2xl">💳</div>
//                 </label>

//                 <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 ${
//                   paymentMethod === "cod" ? "border-blue-500 bg-blue-50" : "border-gray-200"
//                 }`}>
//                   <input
//                     type="radio"
//                     value="cod"
//                     checked={paymentMethod === "cod"}
//                     onChange={() => setPaymentMethod("cod")}
//                     className="text-blue-600"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold">Cash on Delivery</h3>
//                     <p className="text-sm text-gray-600">Pay when your order arrives</p>
//                   </div>
//                   <div className="text-2xl">💰</div>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN - ORDER SUMMARY */}
//           <div className="space-y-8">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
//               <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
//               <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
//                 {products.map(item => (
//                   <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded-lg"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-800">{item.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         Qty: {item.quantity || 1} × ${item.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="font-semibold">
//                       ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-3 pt-6 border-t border-gray-200">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-semibold">${total.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-semibold text-green-600">FREE</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={isProcessing || (!selectedAddressId && addresses.length > 0)}
//                 className={`w-full py-4 rounded-xl font-semibold mt-6 transition-all ${
//                   isProcessing || (!selectedAddressId && addresses.length > 0)
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-slate-900 hover:bg-slate-800 text-white"
//                 }`}
//               >
//                 {isProcessing ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     Processing...
//                   </span>
//                 ) : paymentMethod === "cod" ? (
//                   `Place COD Order ($${total.toFixed(2)})`
//                 ) : (
//                   `Pay $${total.toFixed(2)} Securely`
//                 )}
//               </button>

//               <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
//                 <Lock className="w-4 h-4" />
//                 <span>Your payment is secure and encrypted</span>
//               </div>
//             </div>

//             {/* NEED HELP CARD */}
//             <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
//               <h3 className="font-semibold text-blue-900 mb-2">Need help?</h3>
//               <p className="text-blue-800 text-sm mb-4">
//                 Contact our customer support for assistance with your order.
//               </p>
//               <div className="text-blue-700 text-sm">
//                 <p>📞 +1 (800) 123-4567</p>
//                 <p>✉️ support@sportex.com</p>
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
  CreditCard, 
  Lock, 
  ShoppingBag, 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2,
  Check,
  X,
  ChevronLeft,
  Home,
  Briefcase,
  User,
  Shield,
  Truck,
  AlertCircle,
  Sparkles,
  ChevronRight
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
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home",
    isDefault: false
  });

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [animate, setAnimate] = useState(false);

  useEffect(() => setAnimate(true), []);

  // ---------- LOAD USER ADDRESSES ----------
  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/address");
      const addressList = res.data.data || [];
      setAddresses(addressList);

      const defaultAddr = addressList.find(a => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
        setShipping({
          fullName: defaultAddr.fullName,
          phone: defaultAddr.phone,
          addressLine: defaultAddr.addressLine,
          city: defaultAddr.city,
          state: defaultAddr.state,
          pincode: defaultAddr.pincode
        });
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  // ----------- HANDLE ADDRESS FORM -----------
  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetAddressForm = () => {
    setAddressForm({
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      addressType: "home",
      isDefault: false
    });
    setIsEditingAddress(false);
    setEditingAddressId(null);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (isEditingAddress) {
        await api.put(`/address/${editingAddressId}`, addressForm);
      } else {
        await api.post("/address", addressForm);
      }
      
      await fetchAddresses();
      resetAddressForm();
      setShowAddressForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save address");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    
    try {
      await api.delete(`/address/${id}`);
      await fetchAddresses();
    } catch {
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await api.put(`/address/${id}/set-default`);
      await fetchAddresses();
    } catch {
    }
  };

  const handleEditAddress = (address) => {
    setAddressForm({
      fullName: address.fullName,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      addressType: address.addressType || "home",
      isDefault: address.isDefault
    });
    setIsEditingAddress(true);
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    setShipping({
      fullName: address.fullName,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    });
  };

  // ----------- CART OR BUY NOW DETECTION -----------
  const checkoutData = location.state;
  let products, source;

  if (checkoutData && typeof checkoutData === "object" && checkoutData.products) {
    products = checkoutData.products;
    source = checkoutData.source;
  } else if (checkoutData && Array.isArray(checkoutData)) {
    products = checkoutData;
    source =
      JSON.stringify(checkoutData) === JSON.stringify(cart)
        ? "cart"
        : "buyNow";
  } else {
    products = cart;
    source = "cart";
  }

  const total = products.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleShippingChange = (e) => {
    setShipping(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const createOrder = async (finalShipping) => {
    const payload = {
      shippingAddress: finalShipping,
      paymentMode: paymentMethod === "cod" ? "COD" : "ONLINE"
    };

    if (source === "cart") {
      return await api.post("/order/add", payload);
    } else {
      return await api.post("/order/direct", {
        ...payload,
        items: products.map(p => ({
          productId: p.id,
          quantity: p.quantity || 1
        }))
      });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) {
  navigate("/login");
  return;
}
if (user?.isBlocked) {
  navigate("/login", { replace: true });
  return;
}



    let finalShipping = null;

    if (selectedAddressId) {
      const selected = addresses.find(a => a.id === selectedAddressId);

      if (!selected) {
        return;
      }

      finalShipping = {
        fullName: selected.fullName,
        phone: selected.phone,
        addressLine: selected.addressLine,
        city: selected.city,
        state: selected.state,
        pincode: selected.pincode
      };
    } else {
      finalShipping = shipping;
    }

    try {
      setIsProcessing(true);

      if (paymentMethod === "cod") {
        const res = await createOrder(finalShipping);
        console.log("COD Response:", res.data);
        
        const orderId = res.data?.data?.orderId || 
                        res.data?.data?.id || 
                        res.data?.orderId || 
                        res.data?.id;
        
        console.log("Extracted orderId:", orderId);
        
        if (!orderId) {
          console.error("No orderId found in response:", res.data);
          navigate("/orders");
          return;
        }

        if (source === "cart") {
          await clearCart();
        }

        navigate(`/payment-success/${orderId}`, { replace: true });
        return;
      }

      // ---------- RAZORPAY FLOW ----------
      const orderRes = await createOrder(finalShipping);
      console.log("Razorpay Order Response:", orderRes.data);
      
      const orderId = orderRes.data?.data?.orderId || 
                      orderRes.data?.data?.id || 
                      orderRes.data?.orderId || 
                      orderRes.data?.id;

      console.log("Extracted orderId for Razorpay:", orderId);
      
      if (!orderId) {
        console.error("No orderId found in Razorpay response:", orderRes.data);
        setIsProcessing(false);
        return;
      }

      const rp = await api.post(`/payment/create/${orderId}`);

      const options = {
        key: rp.data.key,
        amount: rp.data.amount * 100,
        currency: "INR",
        order_id: rp.data.razorpayOrderId,
        name: "Sportex",
        prefill: {
          name: finalShipping.fullName,
          contact: finalShipping.phone,
          email: user.email
        },
        handler: async (response) => {
          await api.post("/payment/verify", {
            RazorpayOrderId: response.razorpay_order_id,
            RazorpayPaymentId: response.razorpay_payment_id,
            RazorpaySignature: response.razorpay_signature,
            OrderId: orderId
          });

          if (source === "cart") {
            await clearCart();
          }

          navigate(`/payment-success/${orderId}`, { replace: true });
        }
      };

      new window.Razorpay(options).open();
    } catch (err) {
  console.error(err);
  // Do nothing here
  // Axios interceptor + global modal will handle 401 / blocked
}
 finally {
      setIsProcessing(false);
    }
  };

  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl shadow-purple-500/10 backdrop-blur-sm border border-gray-700/50 max-w-md w-full mx-4">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30"></div>
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 relative z-10" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-6">Add some items to proceed to checkout</p>
          <button
            onClick={() => navigate("/")}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 w-full font-medium"
          >
            <span className="relative z-10">Continue Shopping</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  const getAddressIcon = (type) => {
    switch (type) {
      case "home": return <Home className="w-4 h-4" />;
      case "work": return <Briefcase className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group relative flex items-center gap-2 text-gray-400 hover:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ChevronLeft className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-center flex-1 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Secure Checkout
          </h1>
        </div>

        <div className={`transform transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - SHIPPING & PAYMENT */}
            <div className="lg:col-span-2 space-y-8">
              {/* SHIPPING ADDRESS CARD */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl shadow-blue-500/10 p-6 hover:shadow-blue-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="flex items-center justify-between mb-6 relative">
                  <div className="flex items-center gap-3">
                    <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl opacity-50"></div>
                      <MapPin className="w-6 h-6 text-blue-400 relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-200">Shipping Address</h2>
                      <p className="text-sm text-gray-400 mt-1">Select or add a delivery address</p>
                    </div>
                  </div>
                  
                  {addresses.length > 0 && !showAddressForm && (
                    <button
                      onClick={() => {
                        resetAddressForm();
                        setShowAddressForm(true);
                      }}
                      className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 text-gray-300 px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    >
                      <span className="relative flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add New Address
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-3 text-gray-400">Loading addresses...</p>
                  </div>
                ) : showAddressForm ? (
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-200">
                        {isEditingAddress ? "Edit Address" : "Add New Address"}
                      </h3>
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          resetAddressForm();
                        }}
                        className="text-gray-500 hover:text-gray-300 hover:bg-gray-800 p-2 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveAddress} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Full Name *
                          </label>
                          <input
                            name="fullName"
                            value={addressForm.fullName}
                            onChange={handleAddressFormChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                            required
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Phone *
                          </label>
                          <input
                            name="phone"
                            value={addressForm.phone}
                            onChange={handleAddressFormChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                            required
                            placeholder="+1 (234) 567-8900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Address *
                        </label>
                        <input
                          name="addressLine"
                          value={addressForm.addressLine}
                          onChange={handleAddressFormChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                          required
                          placeholder="123 Main Street, Apt 4B"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            City *
                          </label>
                          <input
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressFormChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                            required
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            State *
                          </label>
                          <input
                            name="state"
                            value={addressForm.state}
                            onChange={handleAddressFormChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                            required
                            placeholder="NY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Pincode *
                          </label>
                          <input
                            name="pincode"
                            value={addressForm.pincode}
                            onChange={handleAddressFormChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                            required
                            placeholder="10001"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                              <input
                                type="radio"
                                name="addressType"
                                value="home"
                                checked={addressForm.addressType === "home"}
                                onChange={handleAddressFormChange}
                                className="sr-only"
                              />
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                addressForm.addressType === "home" 
                                  ? "border-blue-500 bg-blue-500/20" 
                                  : "border-gray-600 group-hover:border-blue-400"
                              }`}>
                                {addressForm.addressType === "home" && (
                                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                )}
                              </div>
                            </div>
                            <span className="flex items-center gap-2 text-gray-300 group-hover:text-gray-200">
                              <Home className="w-4 h-4" /> Home
                            </span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                              <input
                                type="radio"
                                name="addressType"
                                value="work"
                                checked={addressForm.addressType === "work"}
                                onChange={handleAddressFormChange}
                                className="sr-only"
                              />
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                addressForm.addressType === "work" 
                                  ? "border-blue-500 bg-blue-500/20" 
                                  : "border-gray-600 group-hover:border-blue-400"
                              }`}>
                                {addressForm.addressType === "work" && (
                                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                )}
                              </div>
                            </div>
                            <span className="flex items-center gap-2 text-gray-300 group-hover:text-gray-200">
                              <Briefcase className="w-4 h-4" /> Work
                            </span>
                          </label>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="isDefault"
                              checked={addressForm.isDefault}
                              onChange={handleAddressFormChange}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                              addressForm.isDefault 
                                ? "border-blue-500 bg-blue-500/20" 
                                : "border-gray-600 group-hover:border-blue-400"
                            }`}>
                              {addressForm.isDefault && (
                                <Check className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <span className="text-gray-300 group-hover:text-gray-200">Set as default address</span>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-6">
                        <button
                          type="submit"
                          className="group relative flex-1 overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                        >
                          <span className="relative z-10">
                            {isEditingAddress ? "Update Address" : "Save Address"}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddressForm(false);
                            resetAddressForm();
                          }}
                          className="flex-1 border border-gray-600 text-gray-400 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800/50 hover:text-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map(address => (
                      <div
                        key={address.id}
                        className={`group relative overflow-hidden border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                          selectedAddressId === address.id
                            ? "border-blue-500 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                            : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/30"
                        }`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="relative flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`relative p-3 rounded-xl ${
                              selectedAddressId === address.id 
                                ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" 
                                : "bg-gray-800"
                            }`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl opacity-50"></div>
                              <div className="relative text-blue-400">
                                {getAddressIcon(address.addressType)}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-200">{address.fullName}</h3>
                                {address.isDefault && (
                                  <span className="text-xs bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 mb-1">{address.addressLine}</p>
                              <p className="text-gray-500 text-sm mb-1">
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                              <p className="text-gray-500 text-sm">📱 {address.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {selectedAddressId === address.id && (
                              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-full border border-blue-500/30">
                                <span className="flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Selected
                                </span>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(address);
                                }}
                                className="p-2.5 text-gray-500 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(address.id);
                                }}
                                className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {!address.isDefault && (
                          <div className="relative mt-4 pt-4 border-t border-gray-800">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetDefaultAddress(address.id);
                              }}
                              className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                            >
                              <Sparkles className="w-3 h-3" />
                              Set as default address
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-20"></div>
                      <MapPin className="w-12 h-12 mx-auto text-gray-400 relative z-10" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">No saved addresses</h3>
                    <p className="text-gray-500 mb-6">Add an address to proceed with checkout</p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Your First Address
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </button>
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD CARD */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl shadow-purple-500/10 p-6 hover:shadow-purple-500/20 transition-all duration-300">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-x-12 -translate-y-12"></div>
                
                <div className="flex items-center gap-3 mb-6 relative">
                  <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl opacity-50"></div>
                    <CreditCard className="w-6 h-6 text-purple-400 relative z-10" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-200">Payment Method</h2>
                    <p className="text-sm text-gray-400 mt-1">Choose how you want to pay</p>
                  </div>
                </div>

                <div className="space-y-4 relative">
                  <label className={`group relative overflow-hidden flex items-center gap-4 p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "card" 
                      ? "border-purple-500 bg-gradient-to-r from-purple-500/10 to-pink-500/10" 
                      : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/30"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        paymentMethod === "card" 
                          ? "border-purple-500 bg-purple-500/20" 
                          : "border-gray-600 group-hover:border-purple-400"
                      }`}>
                        {paymentMethod === "card" && (
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-200">Card / UPI (Razorpay)</h3>
                      <p className="text-sm text-gray-400">Pay securely with credit/debit card or UPI</p>
                    </div>
                    <div className="text-2xl">💳</div>
                  </label>

                  <label className={`group relative overflow-hidden flex items-center gap-4 p-5 border rounded-2xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === "cod" 
                      ? "border-amber-500 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" 
                      : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/30"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                      <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        paymentMethod === "cod" 
                          ? "border-amber-500 bg-amber-500/20" 
                          : "border-gray-600 group-hover:border-amber-400"
                      }`}>
                        {paymentMethod === "cod" && (
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-200">Cash on Delivery</h3>
                      <p className="text-sm text-gray-400">Pay when your order arrives</p>
                    </div>
                    <div className="text-2xl">💰</div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - ORDER SUMMARY */}
            <div className="space-y-8">
              <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl shadow-emerald-500/10 p-6 hover:shadow-emerald-500/20 transition-all duration-300">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full translate-x-20 translate-y-20"></div>
                
                <div className="flex items-center justify-between mb-6 relative">
                  <h2 className="text-xl font-semibold text-gray-200">Order Summary</h2>
                  <span className="text-sm text-gray-400">{products.length} items</span>
                </div>
                
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                  {products.map(item => (
                    <div key={item.id} className="group/item flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                       <img
  src={item.image || item.imageUrl || "/placeholder.png"}
  alt={item.name}
  className="relative w-16 h-16 object-cover rounded-lg"
/>

                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-200 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity || 1} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="font-semibold text-gray-200">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-200">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-2">
                      <Truck className="w-4 h-4" /> FREE
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-200">Total</span>
                      <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
disabled={
  isProcessing ||
  user?.isBlocked ||
  (!selectedAddressId && addresses.length > 0)
}
                 className={`group relative overflow-hidden w-full py-4 rounded-xl font-semibold mt-6 transition-all duration-300 ${
  isProcessing || user?.isBlocked || (!selectedAddressId && addresses.length > 0)
    ? "bg-gray-700 cursor-not-allowed"
    : "bg-gradient-to-r from-emerald-600 to-green-600 hover:shadow-lg hover:shadow-emerald-500/25"
}`}

                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  {isProcessing ? (
                    <span className="relative flex items-center justify-center gap-2 text-white">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </span>
                  ) : paymentMethod === "cod" ? (
                    <span className="relative flex items-center justify-center gap-2 text-white">
                      Place COD Order (${total.toFixed(2)})
                      <Sparkles className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="relative flex items-center justify-center gap-2 text-white">
                      Pay ${total.toFixed(2)} Securely
                      <Lock className="w-4 h-4" />
                    </span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-3 mt-5 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>

              {/* NEED HELP CARD - Moved outside the sticky container */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full -translate-y-8 translate-x-8"></div>
                
                <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Need help?
                </h3>
                <p className="text-blue-400 text-sm mb-4">
                  Contact our customer support for assistance with your order.
                </p>
                <div className="text-blue-300 text-sm space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-blue-400">📞</span> +1 (800) 123-4567
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-400">✉️</span> support@sportex.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}