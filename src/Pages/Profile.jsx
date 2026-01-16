
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";


import { ShoppingCart, Heart, User, CheckCircle, Edit3, Save, Mail, Calendar, MapPin, Package } from "lucide-react";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
const navigate = useNavigate();
const [showPasswordBox, setShowPasswordBox] = useState(false);
const [profileImage, setProfileImage] = useState(null);
const [uploadingImage, setUploadingImage] = useState(false);



  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || "", email: user?.email || "" });
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [pwd, setPwd] = useState({ oldPassword: "", newPassword: "", confirm: "" });
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
  profileImageUrl: res.data.data.profileImageUrl
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
      newPassword: pwd.newPassword
    });
    toast.success("Password changed successfully");
    setPwd({ oldPassword: "", newPassword: "", confirm: "" });
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to change password");
  } finally {
    setChangingPwd(false);
  }
};
const uploadProfileImage = async () => {
  if (!profileImage) return toast.error("Select an image");

  const formData = new FormData();
  formData.append("Image", profileImage);   // 👈 EXACT NAME

  try {
    setUploadingImage(true);
    const res = await api.post("/auth/upload-avatar", formData);
  toast.success("Profile picture updated");
await fetchProfile(); // 🔥 reload profile from backend
setProfileImage(null);


    setFormData(p => ({ ...p, profileImageUrl: res.data.data }));
  } catch (err) {
    console.log(err.response?.data);
    toast.error("Upload failed");
  } finally {
    setUploadingImage(false);
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
    await api.put("/auth/updateProfile", { name: formData.name });
    toast.success("Profile updated");
    setEditMode(false);
  } catch {
    toast.error("Failed to update profile");
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
                 <div className="relative group">
  <img
    src={formData.profileImageUrl || "/avatar.png"}
    className="w-16 h-16 rounded-xl object-cover border border-white/30"
  />

  <label htmlFor="avatarInput" className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer text-sm rounded-xl">
    Change
  <input
  id="avatarInput"
  name="file"
  type="file"
  hidden
  accept="Image/*"
  onChange={e => setProfileImage(e.target.files[0])}
/>


  </label>
</div>
{profileImage && (
  <button
    onClick={uploadProfileImage}
    disabled={uploadingImage}
    className="mt-2 text-xs bg-white/20 px-3 py-1 rounded"
  >
    {uploadingImage ? "Uploading..." : "Save Photo"}
  </button>
)}

                  <div className="absolute -bottom-1 -right-1 xs:-bottom-2 xs:-right-2 w-4 h-4 xs:w-6 xs:h-6 bg-emerald-500 rounded-full border-2 xs:border-4 border-slate-900"></div>
                </div>
                <div className="space-y-1 xs:space-y-2 text-center xs:text-left">
                  {editMode ? (
                    <div className="space-y-2 xs:space-y-3">
                     <label htmlFor="profileName" className="sr-only">Name</label>
<input
  id="profileName"
  name="name"
  autoComplete="name"
  type="text"
  value={formData.name}
  onChange={handleInputChange}
  className="w-full px-3 xs:px-4 py-2 xs:py-3 rounded-lg text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-sm xs:text-base font-medium"
  placeholder="Your name"
/>

                    <p className="text-slate-200">{formData.email}</p>

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

        <div className="p-6 border-t border-slate-200 text-center">
  <button
    onClick={() => navigate("/orders")}
    className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
  >
    View Order History
  </button>
</div>

         

     <div className="p-6 border-t border-slate-200">

  {!showPasswordBox && (
    <button
      onClick={() => setShowPasswordBox(true)}
      className="flex items-center gap-2 text-slate-900 font-medium hover:underline"
    >
      🔒 Change Password
    </button>
  )}

  {showPasswordBox && (
    <div className="max-w-md space-y-3 mt-4">

      <input
        type="password"
        placeholder="Current password"
        className="input"
        value={pwd.oldPassword}
        onChange={e => setPwd({ ...pwd, oldPassword: e.target.value })}
      />

      <input
        type="password"
        placeholder="New password"
        className="input"
        value={pwd.newPassword}
        onChange={e => setPwd({ ...pwd, newPassword: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm new password"
        className="input"
        value={pwd.confirm}
        onChange={e => setPwd({ ...pwd, confirm: e.target.value })}
      />

      <div className="flex gap-3">
        <button
          onClick={changePassword}
          disabled={changingPwd}
          className="bg-slate-900 text-white px-5 py-2 rounded"
        >
          {changingPwd ? "Updating..." : "Update Password"}
        </button>

        <button
          onClick={() => {
            setShowPasswordBox(false);
            setPwd({ oldPassword: "", newPassword: "", confirm: "" });
          }}
          className="text-slate-600 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  )}

</div>
  

  
        </div>
      </div>
      


    </div>
  );
}