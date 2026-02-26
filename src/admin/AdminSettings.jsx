import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  Upload,
  CheckCircle,
  XCircle,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
  FileText,
  AlertCircle,
  Loader2,
  Key,
  ShieldCheck,
  RefreshCw,
  Trash2,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";

const AdminSettings = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    avatar: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  // Fetch profile data
  useEffect(() => {
    loadProfile();
    loadSessions();
    loadActivityLog();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/admin/profile");
      const data = res.data.data;

      setProfileData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
        avatar: data.avatarUrl || "/images/default-avatar.png",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const loadSessions = async () => {
    try {
      // This endpoint needs to be implemented
      // const res = await api.get("/auth/sessions");
      // setSessions(res.data.data);
    } catch (error) {
      console.error("Failed to load sessions");
    }
  };

  const loadActivityLog = async () => {
    try {
      // This endpoint needs to be implemented
      // const res = await api.get("/admin/activity-log");
      // setActivityLog(res.data.data);
    } catch (error) {
      console.error("Failed to load activity log");
    }
  };

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.put("/admin/profile", {
        Name: profileData.name,
        Phone: profileData.phone,
        Bio: profileData.bio,
      });

      updateUser({
        ...user,
        name: profileData.name,
        phone: profileData.phone,
        bio: profileData.bio,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordStrength < 75) {
      toast.error("Password is too weak. Please use a stronger password");
      setLoading(false);
      return;
    }

    try {
      await api.patch("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password changed successfully");
      setShowPasswordStrength(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  // Upload avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("Avatar", file);
    setUploadingAvatar(true);

    try {
      const res = await api.post("/auth/upload-avatar", formData);
      const avatarUrl = res.data.data.avatarUrl;

      setProfileData((prev) => ({ ...prev, avatar: avatarUrl }));
      updateUser({ ...user, avatarUrl });
      toast.success("Avatar updated successfully");
    } catch (error) {
      toast.error("Avatar upload failed");
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  };

  // Terminate session
  const terminateSession = async (sessionId) => {
    try {
      // This endpoint needs to be implemented
      // await api.post("/auth/terminate-session", { sessionId });
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast.success("Session terminated");
    } catch (error) {
      toast.error("Failed to terminate session");
    }
  };

  // Logout from all devices
  const logoutAllDevices = async () => {
    try {
      // This endpoint needs to be implemented
      // await api.post("/auth/logout-all");
      logout();
      toast.success("Logged out from all devices");
    } catch (error) {
      toast.error("Failed to logout from all devices");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Admin Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your account and security settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === "profile"
                      ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 text-blue-300"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <UserIcon size={20} />
                  <span className="font-medium">Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === "security"
                      ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 text-blue-300"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <ShieldCheck size={20} />
                  <span className="font-medium">Security</span>
                </button>

                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === "sessions"
                      ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 text-blue-300"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <RefreshCw size={20} />
                  <span className="font-medium">Sessions</span>
                </button>

                <button
                  onClick={() => setActiveTab("activity")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === "activity"
                      ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 text-blue-300"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <FileText size={20} />
                  <span className="font-medium">Activity Log</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Role</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs font-medium">
                      Admin
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Status</span>
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <UserIcon size={24} />
                  Profile Information
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-blue-500 transition-all">
                          <img
                            src={profileData.avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/images/default-avatar.png";
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="text-white" size={24} />
                        </div>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                          <Upload size={16} />
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarUpload}
                            disabled={uploadingAvatar}
                          />
                        </label>
                      </div>
                      {uploadingAvatar && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-blue-400">
                          <Loader2 className="animate-spin" size={14} />
                          Uploading...
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="email"
                            value={profileData.email}
                            readOnly
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/30 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Key size={24} />
                    Change Password
                  </h2>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type={showCurrent ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => {
                              setPasswordData({ ...passwordData, currentPassword: e.target.value });
                            }}
                            className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type={showNew ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => {
                              const newPass = e.target.value;
                              setPasswordData({ ...passwordData, newPassword: newPass });
                              setPasswordStrength(calculatePasswordStrength(newPass));
                              setShowPasswordStrength(true);
                            }}
                            className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type={showConfirm ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Password Strength Indicator */}
                    {showPasswordStrength && passwordData.newPassword && (
                      <div className="p-4 bg-gray-900/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-300">Password Strength</span>
                          <span className={`text-sm font-medium ${
                            passwordStrength >= 75 ? 'text-green-400' :
                            passwordStrength >= 50 ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {passwordStrength >= 75 ? 'Strong' :
                             passwordStrength >= 50 ? 'Medium' :
                             'Weak'}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              passwordStrength >= 75 ? 'bg-green-500' :
                              passwordStrength >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              passwordData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-gray-400">At least 8 characters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              /[A-Z]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-gray-400">Uppercase letter</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              /[0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-gray-400">Number</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              /[^A-Za-z0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-gray-400">Special character</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Password Match Indicator */}
                    {passwordData.confirmPassword && (
                      <div className="flex items-center gap-2">
                        {passwordData.newPassword === passwordData.confirmPassword ? (
                          <>
                            <CheckCircle className="text-green-400" size={16} />
                            <span className="text-green-400 text-sm">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="text-red-400" size={16} />
                            <span className="text-red-400 text-sm">Passwords don't match</span>
                          </>
                        )}
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading || passwordData.newPassword !== passwordData.confirmPassword || passwordStrength < 75}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            Updating...
                          </>
                        ) : (
                          <>
                            <ShieldCheck size={18} />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Two-Factor Authentication Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all">
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === "sessions" && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <RefreshCw size={24} />
                    Active Sessions
                  </h2>
                  <button
                    onClick={logoutAllDevices}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout All Devices
                  </button>
                </div>

                <div className="space-y-4">
                  {sessions.length > 0 ? (
                    sessions.map((session) => (
                      <div key={session.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                session.isCurrent ? 'bg-green-500' : 'bg-blue-500'
                              }`} />
                              <span className="font-medium text-white">{session.device}</span>
                              {session.isCurrent && (
                                <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              Last active: {session.lastActive} • {session.ipAddress}
                            </p>
                          </div>
                          {!session.isCurrent && (
                            <button
                              onClick={() => terminateSession(session.id)}
                              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm transition-colors flex items-center gap-2"
                            >
                              <Trash2 size={14} />
                              Terminate
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <RefreshCw className="mx-auto text-gray-500 mb-3" size={48} />
                      <p className="text-gray-400">No active sessions found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity Log Tab */}
            {activeTab === "activity" && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText size={24} />
                  Activity Log
                </h2>

                <div className="space-y-3">
                  {activityLog.length > 0 ? (
                    activityLog.map((activity) => (
                      <div key={activity.id} className="p-4 bg-gray-900/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white">{activity.description}</p>
                            <p className="text-sm text-gray-400 mt-1">
                              {activity.timestamp} • {activity.ipAddress}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.type === 'login' ? 'bg-blue-900/30 text-blue-400' :
                            activity.type === 'update' ? 'bg-green-900/30 text-green-400' :
                            activity.type === 'security' ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-gray-700 text-gray-300'
                          }`}>
                            {activity.type}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="mx-auto text-gray-500 mb-3" size={48} />
                      <p className="text-gray-400">No activity recorded yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;




// import React, { useEffect, useState } from "react";
// import api from "../Api/Axios_Instance";
// import { useAuth } from "../context/AuthContext";
// import {
//   User,
//   Shield,
//   Camera,
//   Save,
//   Eye,
//   EyeOff,
//   Settings as SettingsIcon,
// } from "lucide-react";

// const AdminSettings = () => {
//   const { user, updateUser } = useAuth();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     bio: "",
//     avatar: "",
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);

//   // ---------------- FETCH PROFILE ----------------
//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       const res = await api.get("/admin/Profile");
//       const data = res.data.data;

//       setProfileData({
//         name: data.name || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         bio: data.bio || "",
// avatar:
//   data.avatarUrl && data.avatarUrl.trim() !== ""
//     ? data.avatarUrl
//     : "/images/default-avatar.png",


//       });
//     } catch {
//       setError("Failed to load profile");
//     }
//   };

//   // ---------------- UPDATE PROFILE ----------------
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const res = await api.put("/admin/Profile", {
//         name: profileData.name,
//         phone: profileData.phone,
//         bio: profileData.bio,
//       });

// updateUser({
//   ...user,
//   name: profileData.name,
//   phone: profileData.phone,
//   bio: profileData.bio,
// });

//       setSuccess("Profile updated successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Profile update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- CHANGE PASSWORD ----------------
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       await api.patch("/auth/change-password", {
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//       });

//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });

//       setSuccess("Password changed successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Password change failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UPLOAD AVATAR ----------------
//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Invalid image file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Avatar", file);

//     setLoading(true);
//     try {
//       const res = await api.post("/auth/upload-avatar", formData);
//       const avatarUrl = res.data.data.avatarUrl;

//       setProfileData((p) => ({ ...p, avatar: avatarUrl }));
//       updateUser({ ...user, avatarUrl });
//       setSuccess("Avatar updated successfully");
//     } catch {
//       setError("Avatar upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       <h1 className="text-2xl font-bold text-white mb-6">Admin Settings</h1>

//       {success && <div className="mb-4 text-green-400">{success}</div>}
//       {error && <div className="mb-4 text-red-400">{error}</div>}

//       <div className="bg-gray-800 rounded-lg p-6">
//         <div className="flex gap-4 mb-6">
//           <button onClick={() => setActiveTab("profile")} className="text-white">
//             <User size={18} /> Profile
//           </button>
//           <button onClick={() => setActiveTab("security")} className="text-white">
//             <Shield size={18} /> Security
//           </button>
//           <button disabled className="text-gray-500">
//             <SettingsIcon size={18} /> System
//           </button>
//         </div>

//         {/* PROFILE */}
//         {activeTab === "profile" && (
//           <form onSubmit={handleProfileUpdate} className="space-y-4">
//             <img
//   src={profileData.avatar || "/images/default-avatar.png"}
//   onError={(e) => (e.target.src = "/images/default-avatar.png")}
//   className="w-20 h-20 rounded-full"
// />

//             <input type="file" onChange={handleAvatarUpload} />

//             <input
//               className="w-full p-2 bg-gray-700 text-white"
//               value={profileData.name}
//               onChange={(e) =>
//                 setProfileData({ ...profileData, name: e.target.value })
//               }
//               placeholder="Name"
//             />

//             <input
//               className="w-full p-2 bg-gray-700 text-white"
//               value={profileData.phone}
//               onChange={(e) =>
//                 setProfileData({ ...profileData, phone: e.target.value })
//               }
//               placeholder="Phone"
//             />

//             <textarea
//               className="w-full p-2 bg-gray-700 text-white"
//               value={profileData.bio}
//               onChange={(e) =>
//                 setProfileData({ ...profileData, bio: e.target.value })
//               }
//               placeholder="Bio"
//             />

//             <button className="bg-blue-600 px-4 py-2 rounded text-white">
//               <Save size={16} /> Save Profile
//             </button>
//           </form>
//         )}

//         {/* SECURITY */}
//         {activeTab === "security" && (
//           <form onSubmit={handlePasswordChange} className="space-y-4">
//             <input
//               type={showCurrent ? "text" : "password"}
//               placeholder="Current Password"
//               value={passwordData.currentPassword}
//               onChange={(e) =>
//                 setPasswordData({
//                   ...passwordData,
//                   currentPassword: e.target.value,
//                 })
//               }
//             />

//             <input
//               type={showNew ? "text" : "password"}
//               placeholder="New Password"
//               value={passwordData.newPassword}
//               onChange={(e) =>
//                 setPasswordData({
//                   ...passwordData,
//                   newPassword: e.target.value,
//                 })
//               }
//             />

//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={passwordData.confirmPassword}
//               onChange={(e) =>
//                 setPasswordData({
//                   ...passwordData,
//                   confirmPassword: e.target.value,
//                 })
//               }
//             />

//             <button className="bg-blue-600 px-4 py-2 rounded text-white">
//               Change Password
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;
