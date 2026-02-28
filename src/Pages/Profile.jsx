

// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import api from "../Api/Axios_Instance";
// import { useNavigate } from "react-router-dom";

// import {
//   ShoppingCart,
//   Heart,
//   User,
//   CheckCircle,
//   Edit3,
//   Save,
//   Mail,
//   Calendar,
//   Key,
//   Image,
//   Upload,
//   X,
//   Package,
//   MapPin,
//   LayoutDashboard,
//   Shield,
//   LogOut,
//   Bell,
//   Settings,
//   ChevronRight,
// } from "lucide-react";

// import ManageAddresses from "./ManageAddresses";

// export default function Profile() {
//   const { user } = useAuth();
//   const { cart } = useCart();
//   const { wishlist } = useWishlist();
//   const navigate = useNavigate();

//   const [activeSection, setActiveSection] = useState("dashboard");
//   const [showPasswordBox, setShowPasswordBox] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//   });

//   const [userOrders, setUserOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [animate, setAnimate] = useState(false);

//   const [pwd, setPwd] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirm: "",
//   });
//   const [changingPwd, setChangingPwd] = useState(false);

//   useEffect(() => {
//     if (user) {
//       fetchProfile();
//       fetchUserOrders();
//     }
//   }, [user]);

//   useEffect(() => {
//     setAnimate(true);
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await api.get("/auth/myProfile");
//       setFormData({
//         name: res.data.data.name,
//         email: res.data.data.email,
//         profileImageUrl: res.data.data.profileImageUrl,
//       });
//     } catch {
//       toast.error("Failed to load profile");
//     }
//   };

//   const fetchUserOrders = async () => {
//     try {
//       const res = await api.get("/order/myorders");
//       setUserOrders(res.data.data || []);
//     } catch {
//       toast.error("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const changePassword = async () => {
//     if (!pwd.oldPassword || !pwd.newPassword)
//       return toast.error("All fields required");

//     if (pwd.newPassword !== pwd.confirm)
//       return toast.error("Passwords do not match");

//     try {
//       setChangingPwd(true);
//       await api.patch("/auth/change-password", {
//         oldPassword: pwd.oldPassword,
//         newPassword: pwd.newPassword,
//       });
//       toast.success("Password changed successfully");
//       setPwd({ oldPassword: "", newPassword: "", confirm: "" });
//       setShowPasswordBox(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to change password");
//     } finally {
//       setChangingPwd(false);
//     }
//   };

//   const uploadProfileImage = async () => {
//     if (!profileImage) return toast.error("Select an image");

//     const fd = new FormData();
//     fd.append("Image", profileImage);

//     try {
//       setUploadingImage(true);
//       await api.post("/auth/upload-avatar", fd);
//       toast.success("Profile picture updated");
//       await fetchProfile();
//       setProfileImage(null);
//     } catch {
//       toast.error("Upload failed");
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
//         <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl shadow-purple-500/10 backdrop-blur-sm border border-gray-700/50 max-w-md w-full mx-4">
//           <div className="relative inline-block mb-4">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30"></div>
//             <User className="w-20 h-20 mx-auto text-gray-300 relative z-10" />
//           </div>
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
//             Please login to view profile
//           </h2>
//           <p className="text-gray-400 mb-6">
//             Sign in to access your account details and orders
//           </p>
//           <button
//             onClick={() => navigate("/login")}
//             className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 w-full font-medium"
//           >
//             <span className="relative z-10">Go to Login</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//           </button>
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
//       await api.put("/auth/updateProfile", { name: formData.name });
//       toast.success("Profile updated successfully");
//       setEditMode(false);
//     } catch {
//       toast.error("Failed to update profile");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Profile Header Card */}
//         <div
//           className={`rounded-3xl overflow-hidden mb-8 transform transition-all duration-700 ${
//             animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//           }`}
//         >
//           <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-8 border border-gray-700/50 rounded-3xl shadow-2xl shadow-purple-500/10">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-32 translate-x-32"></div>
//             <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full translate-y-24 -translate-x-24"></div>
            
//             <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
//               <div className="relative group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
//                 <img
//                   src={formData.profileImageUrl || "/avatar.png"}
//                   className="relative w-28 h-28 rounded-full object-cover border-4 border-gray-800 shadow-2xl z-10"
//                   alt="Profile"
//                 />
//                 <label className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 z-20">
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={(e) => setProfileImage(e.target.files[0])}
//                   />
//                   <Image className="w-5 h-5 text-white" />
//                 </label>
//               </div>

//               <div className="flex-1 text-center md:text-left">
//                 {editMode ? (
//                   <div className="space-y-4">
//                     <input
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-100 rounded-xl w-full max-w-md text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="Your name"
//                     />
//                     <div className="flex items-center gap-2 text-gray-400">
//                       <Mail className="w-5 h-5" />
//                       <span className="text-gray-300">{formData.email}</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
//                       {user.name}
//                     </h1>
//                     <div className="flex items-center gap-2 text-gray-400">
//                       <Mail className="w-5 h-5" />
//                       <span className="text-gray-300">{user.email}</span>
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => (editMode ? handleSave() : setEditMode(true))}
//                   className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 backdrop-blur-sm px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
//                   disabled={updating}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                   <span className="relative flex items-center gap-2 text-gray-200 group-hover:text-white transition-colors">
//                     {editMode ? (
//                       <>
//                         <Save className="w-5 h-5" />
//                         {updating ? "Saving..." : "Save Changes"}
//                       </>
//                     ) : (
//                       <>
//                         <Edit3 className="w-5 h-5" />
//                         Edit Profile
//                       </>
//                     )}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="flex border-t border-gray-800 mt-8 pt-4">
//             <button
//               className={`relative flex-1 p-5 flex items-center justify-center gap-3 text-lg font-medium transition-all group ${
//                 activeSection === "dashboard"
//                   ? "text-purple-400"
//                   : "text-gray-500 hover:text-gray-300"
//               }`}
//               onClick={() => setActiveSection("dashboard")}
//             >
//               {activeSection === "dashboard" && (
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-full"></div>
//               )}
//               <LayoutDashboard className={`w-5 h-5 transition-transform group-hover:scale-110 ${
//                 activeSection === "dashboard" ? "text-purple-400" : ""
//               }`} />
//               Dashboard
//             </button>
//             <button
//               className={`relative flex-1 p-5 flex items-center justify-center gap-3 text-lg font-medium transition-all group ${
//                 activeSection === "addresses"
//                   ? "text-purple-400"
//                   : "text-gray-500 hover:text-gray-300"
//               }`}
//               onClick={() => setActiveSection("addresses")}
//             >
//               {activeSection === "addresses" && (
//                 <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-full"></div>
//               )}
//               <MapPin className={`w-5 h-5 transition-transform group-hover:scale-110 ${
//                 activeSection === "addresses" ? "text-purple-400" : ""
//               }`} />
//               Your Addresses
//             </button>
//           </div>
//         </div>

//         {/* Dashboard Section */}
//         {activeSection === "dashboard" && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {/* Cart Card */}
//             <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="relative flex items-center gap-4 mb-4">
//                 <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl">
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-xl opacity-50"></div>
//                   <ShoppingCart className="w-8 h-8 text-blue-400 relative z-10" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-300">Cart Items</h3>
//                   <p className="text-3xl font-bold text-gray-100 mt-1">
//                     {cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm relative">Items waiting for checkout</p>
//             </div>

//             {/* Wishlist Card */}
//             <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
//               <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="relative flex items-center gap-4 mb-4">
//                 <div className="relative bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-3 rounded-xl">
//                   <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-rose-500/30 blur-xl opacity-50"></div>
//                   <Heart className="w-8 h-8 text-pink-400 relative z-10" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-300">Wishlist</h3>
//                   <p className="text-3xl font-bold text-gray-100 mt-1">{wishlist?.length || 0}</p>
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm relative">Products saved for later</p>
//             </div>

//             {/* Orders Card */}
//             <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
//               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="relative flex items-center gap-4 mb-4">
//                 <div className="relative bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-3 rounded-xl">
//                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-500/30 blur-xl opacity-50"></div>
//                   <CheckCircle className="w-8 h-8 text-emerald-400 relative z-10" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-300">Total Orders</h3>
//                   <p className="text-3xl font-bold text-gray-100 mt-1">{userOrders?.length || 0}</p>
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm relative">Completed purchases</p>
//             </div>
//           </div>
//         )}

//         {/* Addresses Section */}
//         {activeSection === "addresses" && (
//           <div className="mb-8">
//             <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl shadow-purple-500/5 overflow-hidden">
//               <div className="p-8">
//                 <ManageAddresses />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Action Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           {/* Order History Card */}
//           <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16"></div>
//             <div className="relative flex items-center justify-between">
//               <div>
//                 <div className="relative inline-block mb-4">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-30"></div>
//                   <Package className="w-10 h-10 text-blue-400 relative z-10" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-200 mb-2">Order History</h3>
//                 <p className="text-gray-400 mb-6">
//                   View and track all your previous orders
//                 </p>
//               </div>
//               <button
//                 onClick={() => navigate("/orders")}
//                 className="group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 whitespace-nowrap"
//               >
//                 <span className="relative flex items-center gap-2 text-gray-300 group-hover:text-blue-400 transition-colors">
//                   View Orders
//                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//               </button>
//             </div>
//           </div>

//           {/* Password Change Card */}
//           <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300">
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full translate-y-16 -translate-x-16"></div>
//             <div className="relative flex items-center gap-4 mb-6">
//               <div className="relative bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-3 rounded-xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-yellow-500/30 blur-xl opacity-50"></div>
//                 <Key className="w-8 h-8 text-amber-400 relative z-10" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-200">Security</h3>
//                 <p className="text-gray-400">Update your password</p>
//               </div>
//             </div>

//             {!showPasswordBox ? (
//               <button
//                 onClick={() => setShowPasswordBox(true)}
//                 className="group relative overflow-hidden w-full bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 text-gray-300 px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
//               >
//                 <span className="relative flex items-center justify-center gap-2">
//                   <Shield className="w-5 h-5" />
//                   Change Password
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//               </button>
//             ) : (
//               <div className="space-y-4 relative">
//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-1">
//                       Current Password
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="Enter current password"
//                       value={pwd.oldPassword}
//                       onChange={(e) =>
//                         setPwd({ ...pwd, oldPassword: e.target.value })
//                       }
//                       className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-1">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="Enter new password"
//                       value={pwd.newPassword}
//                       onChange={(e) =>
//                         setPwd({ ...pwd, newPassword: e.target.value })
//                       }
//                       className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-400 mb-1">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="Confirm new password"
//                       value={pwd.confirm}
//                       onChange={(e) =>
//                         setPwd({ ...pwd, confirm: e.target.value })
//                       }
//                       className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-2">
//                   <button
//                     onClick={changePassword}
//                     disabled={changingPwd}
//                     className="group relative flex-1 overflow-hidden bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50"
//                   >
//                     <span className="relative z-10">
//                       {changingPwd ? "Updating..." : "Update Password"}
//                     </span>
//                     <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowPasswordBox(false);
//                       setPwd({ oldPassword: "", newPassword: "", confirm: "" });
//                     }}
//                     className="flex-1 border border-gray-600 text-gray-400 px-6 py-3 rounded-xl font-medium hover:bg-gray-800/50 hover:text-gray-300 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Image Upload (if image selected) */}
//         {profileImage && (
//           <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mb-8 shadow-xl shadow-purple-500/10">
//             <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-8 translate-x-8"></div>
            
//             <div className="relative flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-200">
//                 <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-2 rounded-lg">
//                   <Upload className="w-5 h-5 text-purple-400" />
//                 </div>
//                 Update Profile Picture
//               </h3>
//               <button
//                 onClick={() => setProfileImage(null)}
//                 className="text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="flex items-center gap-6">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30"></div>
//                 <img
//                   src={URL.createObjectURL(profileImage)}
//                   alt="Preview"
//                   className="relative w-20 h-20 rounded-full object-cover border-2 border-gray-700 z-10"
//                 />
//               </div>
//               <div className="flex-1">
//                 <p className="text-gray-400 mb-2">
//                   Selected: <span className="text-gray-300">{profileImage.name}</span>
//                 </p>
//                 <button
//                   onClick={uploadProfileImage}
//                   disabled={uploadingImage}
//                   className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
//                 >
//                   <span className="relative z-10">
//                     {uploadingImage ? "Uploading..." : "Upload Picture"}
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../Api/Axios_Instance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  ShoppingCart,
  Heart,
  User,
  CheckCircle,
  Edit3,
  Save,
  Mail,
  Calendar,
  Key,
  Image,
  Upload,
  X,
  Package,
  MapPin,
  LayoutDashboard,
  Shield,
  LogOut,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";

import ManageAddresses from "./ManageAddresses";

export default function Profile() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [pwd, setPwd] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [changingPwd, setChangingPwd] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserOrders();
    }
  }, [user]);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/myProfile");
      setFormData({
        name: res.data.data.name,
        email: res.data.data.email,
        profileImageUrl: res.data.data.profileImageUrl,
      });
    } catch {
      toast.error("Failed to load profile");
    }
  };

  const fetchUserOrders = async () => {
    try {
      const res = await api.get("/order/myorders");
      setUserOrders(res.data.data || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (!pwd.oldPassword || !pwd.newPassword)
      return toast.error("All fields required");

    if (pwd.newPassword !== pwd.confirm)
      return toast.error("Passwords do not match");

    try {
      setChangingPwd(true);
      await api.patch("/auth/change-password", {
        oldPassword: pwd.oldPassword,
        newPassword: pwd.newPassword,
      });
      toast.success("Password changed successfully");
      setPwd({ oldPassword: "", newPassword: "", confirm: "" });
      setShowPasswordBox(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPwd(false);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) return toast.error("Select an image");

    const fd = new FormData();
    fd.append("Image", profileImage);

    try {
      setUploadingImage(true);
      await api.post("/auth/upload-avatar", fd);
      toast.success("Profile picture updated");
      await fetchProfile();
      setProfileImage(null);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap');
          .font-ilu { font-family: 'Barlow Condensed', sans-serif; }
        `}</style>
        <div className="text-center border border-[#222] p-8 sm:p-12 max-w-md w-full">
          <div className="w-20 h-20 border border-[#333] flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-ilu font-bold text-white uppercase tracking-wider mb-3">
            Please Login
          </h2>
          <p className="text-[#666] text-xs uppercase tracking-widest mb-6">
            Sign in to access your account details and orders
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-xs hover:bg-[#ddd] transition-colors"
          >
            Go to Login
          </button>
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
      await api.put("/auth/updateProfile", { name: formData.name });
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 sm:py-8 px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap');
        .font-ilu { font-family: 'Barlow Condensed', sans-serif; }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <div
          className={`border border-[#222] mb-6 sm:mb-8 transform transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-6 sm:p-8 border-b border-[#222]">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-[#333] overflow-hidden">
                  <img
                    src={formData.profileImageUrl || "/avatar.png"}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                </div>
                <label className="absolute bottom-0 right-0 bg-white text-black p-2 cursor-pointer hover:bg-[#ddd] transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                  <Image className="w-4 h-4" strokeWidth={1.5} />
                </label>
              </div>

              <div className="flex-1 text-center md:text-left">
                {editMode ? (
                  <div className="space-y-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-black border border-[#333] text-white w-full max-w-md text-xl font-ilu font-bold uppercase tracking-wider focus:outline-none focus:border-[#555] placeholder-[#333]"
                      placeholder="YOUR NAME"
                    />
                    <div className="flex items-center justify-center md:justify-start gap-2 text-[#666]">
                      <Mail className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-xs uppercase tracking-widest">{formData.email}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl sm:text-3xl font-ilu font-bold text-white uppercase tracking-wider mb-2">
                      {user.name}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-[#666]">
                      <Mail className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-xs uppercase tracking-widest">{user.email}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => (editMode ? handleSave() : setEditMode(true))}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 border border-[#333] text-white font-ilu font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:border-[#555] hover:bg-white/5 transition-all disabled:opacity-50"
                  disabled={updating}
                >
                  {editMode ? (
                    <>
                      <Save className="w-4 h-4" strokeWidth={1.5} />
                      {updating ? "Saving..." : "Save"}
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" strokeWidth={1.5} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-t border-[#222]">
            <button
              className={`flex-1 p-4 sm:p-5 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-ilu font-semibold uppercase tracking-widest transition-all ${
                activeSection === "dashboard"
                  ? "text-white border-b-2 border-white"
                  : "text-[#666] hover:text-white"
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Dash</span>
            </button>
            <button
              className={`flex-1 p-4 sm:p-5 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-ilu font-semibold uppercase tracking-widest transition-all ${
                activeSection === "addresses"
                  ? "text-white border-b-2 border-white"
                  : "text-[#666] hover:text-white"
              }`}
              onClick={() => setActiveSection("addresses")}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Addresses</span>
              <span className="sm:hidden">Addr</span>
            </button>
          </div>
        </div>

        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Cart Card */}
            <div className="border border-[#222] p-5 sm:p-6 hover:border-[#444] transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#333] flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-ilu uppercase tracking-widest text-[#666]">Cart Items</h3>
                  <p className="text-2xl sm:text-3xl font-ilu font-bold text-white">
                    {cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0}
                  </p>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#444]">Items waiting for checkout</p>
            </div>

            {/* Wishlist Card */}
            <div className="border border-[#222] p-5 sm:p-6 hover:border-[#444] transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#333] flex items-center justify-center">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-ilu uppercase tracking-widest text-[#666]">Wishlist</h3>
                  <p className="text-2xl sm:text-3xl font-ilu font-bold text-white">{wishlist?.length || 0}</p>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#444]">Products saved for later</p>
            </div>

            {/* Orders Card */}
            <div className="border border-[#222] p-5 sm:p-6 hover:border-[#444] transition-all duration-300 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#333] flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-ilu uppercase tracking-widest text-[#666]">Total Orders</h3>
                  <p className="text-2xl sm:text-3xl font-ilu font-bold text-white">{userOrders?.length || 0}</p>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#444]">Completed purchases</p>
            </div>
          </div>
        )}

        {/* Addresses Section */}
        {activeSection === "addresses" && (
          <div className="mb-6 sm:mb-8">
            <div className="border border-[#222] overflow-hidden">
              <div className="p-4 sm:p-8">
                <ManageAddresses />
              </div>
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Order History Card */}
          <div className="border border-[#222] p-5 sm:p-8 hover:border-[#444] transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#333] flex items-center justify-center mb-3 sm:mb-4">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg sm:text-xl font-ilu font-bold text-white uppercase tracking-wider mb-1 sm:mb-2">Order History</h3>
                <p className="text-[#666] text-xs sm:text-sm uppercase tracking-widest">
                  View and track all your previous orders
                </p>
              </div>
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#ddd] transition-colors whitespace-nowrap"
              >
                View Orders
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Password Change Card */}
          <div className="border border-[#222] p-5 sm:p-8 hover:border-[#444] transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#333] flex items-center justify-center">
                <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-ilu font-bold text-white uppercase tracking-wider mb-1">Security</h3>
                <p className="text-[#666] text-xs sm:text-sm uppercase tracking-widest">Update your password</p>
              </div>
            </div>

            {!showPasswordBox ? (
              <button
                onClick={() => setShowPasswordBox(true)}
                className="w-full py-3 border border-[#333] text-white font-ilu font-semibold uppercase tracking-widest text-xs hover:border-[#555] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" strokeWidth={1.5} />
                Change Password
              </button>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-ilu uppercase tracking-widest text-[#666] mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="ENTER CURRENT PASSWORD"
                      value={pwd.oldPassword}
                      onChange={(e) =>
                        setPwd({ ...pwd, oldPassword: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black border border-[#333] text-white text-xs uppercase tracking-wider focus:outline-none focus:border-[#555] placeholder-[#333]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-ilu uppercase tracking-widest text-[#666] mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="ENTER NEW PASSWORD"
                      value={pwd.newPassword}
                      onChange={(e) =>
                        setPwd({ ...pwd, newPassword: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black border border-[#333] text-white text-xs uppercase tracking-wider focus:outline-none focus:border-[#555] placeholder-[#333]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-ilu uppercase tracking-widest text-[#666] mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="CONFIRM NEW PASSWORD"
                      value={pwd.confirm}
                      onChange={(e) =>
                        setPwd({ ...pwd, confirm: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black border border-[#333] text-white text-xs uppercase tracking-wider focus:outline-none focus:border-[#555] placeholder-[#333]"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={changePassword}
                    disabled={changingPwd}
                    className="flex-1 py-3 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#ddd] transition-colors disabled:opacity-50"
                  >
                    {changingPwd ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordBox(false);
                      setPwd({ oldPassword: "", newPassword: "", confirm: "" });
                    }}
                    className="flex-1 py-3 border border-[#333] text-[#666] font-ilu font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:border-[#555] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Image Upload (if image selected) */}
        {profileImage && (
          <div className="border border-[#222] p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-ilu font-bold text-white uppercase tracking-wider flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 border border-[#333] flex items-center justify-center">
                  <Upload className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>
                Update Profile Picture
              </h3>
              <button
                onClick={() => setProfileImage(null)}
                className="text-[#666] hover:text-white p-2 hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border border-[#333] overflow-hidden">
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-[#666] text-xs uppercase tracking-widest mb-3">
                  Selected: <span className="text-white">{profileImage.name}</span>
                </p>
                <button
                  onClick={uploadProfileImage}
                  disabled={uploadingImage}
                  className="px-5 sm:px-6 py-2 sm:py-3 bg-white text-black font-ilu font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#ddd] transition-colors disabled:opacity-50"
                >
                  {uploadingImage ? "Uploading..." : "Upload Picture"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}