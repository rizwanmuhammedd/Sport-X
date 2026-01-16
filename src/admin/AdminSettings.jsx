



import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../Api/Axios_Instance.jsx";
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Database, 
  Key, 
  Mail, 
  Phone,
  Save,
  Eye,
  EyeOff,
  Camera,
  Settings as SettingsIcon,
  Menu,
  X
} from "lucide-react";

const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '/images/njan.jpg'
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Football Store Admin',
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: true,
    language: 'en',
    timezone: 'UTC',
    autoBackup: true,
    backupFrequency: 'daily'
  });

  useEffect(() => {
    fetchUserProfile();
    fetchSystemSettings();
  }, []);

  // Auto-hide messages
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const fetchUserProfile = async () => {
    try {
      if (user?.id) {
        const response = await api.get(`/users/${user.id}`);
        
        // Handle different response structures
        const userData = response.data.data || response.data;
        
        setProfileData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          bio: userData.bio || '',
          avatar: userData.avatar || '/images/njan.jpg'
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setError('Failed to load profile data');
    }
  };

  const fetchSystemSettings = async () => {
    try {
      const response = await api.get('/settings');
      
      // Handle different response structures
      const settingsData = response.data.data || response.data;
      
      if (settingsData) {
        setSystemSettings(prev => ({ ...prev, ...settingsData }));
      }
    } catch (error) {
      console.error("Failed to fetch system settings:", error);
      // Don't show error message for settings as they might not exist yet
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await api.patch(`/users/${user.id}`, profileData);
      
      // Handle different response structures
      const updatedUser = response.data.data || response.data;
      
      // Update the auth context with new user data
      updateUser({ ...user, ...updatedUser });
      
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error("Failed to update profile:", error);
      
      // Handle different error structures
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update profile. Please try again.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length !== 8) {
      setError('Password must be exactly 8 digits');
      return;
    }

    if (passwordData.currentPassword.length !== 8) {
      setError('Current password must be 8 digits');
      return;
    }

    setLoading(true);
    try {
      // For JSON Server: First verify current password matches
      const userResponse = await api.get(`/users/${user.id}`);
      const currentUser = userResponse.data;
      
      if (currentUser.password !== String(passwordData.currentPassword)) {
        setError('Current password is incorrect');
        setLoading(false);
        return;
      }

      // Update the password using PATCH
      await api.patch(`/users/${user.id}`, {
        password: String(passwordData.newPassword)
      });
      
      // Update local auth context
      updateUser({ ...user, password: String(passwordData.newPassword) });
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccessMessage('Password changed successfully!');
    } catch (error) {
      console.error("Failed to change password:", error);
      console.error("Error response:", error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to change password. Please try again.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSystemSettingsUpdate = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await api.patch('/settings', systemSettings);
      
      setSuccessMessage('System settings updated successfully!');
    } catch (error) {
      console.error("Failed to update system settings:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update system settings. Please try again.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post(`/users/${user.id}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const avatarUrl = response.data.avatarUrl || response.data.data?.avatarUrl;
      
      setProfileData(prev => ({ ...prev, avatar: avatarUrl }));
      setSuccessMessage('Avatar updated successfully!');
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to upload avatar. Please try again.';
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'system', name: 'System', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-400">Manage your account and system preferences</p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-green-900/50 border border-green-500/30 text-green-400 text-sm sm:text-base">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-red-900/50 border border-red-500/30 text-red-400 text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar Navigation - Mobile Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-64 h-full bg-gray-800 border-r border-gray-700 shadow-xl p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">Settings Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <Icon size={18} />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm p-4 sticky top-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <User className="text-blue-400" size={20} sm:size={24} />
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Profile Settings</h2>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-4 sm:space-y-6">
                    {/* Avatar */}
                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 sm:gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={profileData.avatar}
                          alt="Profile"
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-gray-600"
                          onError={(e) => {
                            e.target.src = '/images/default-avatar.png';
                          }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                          id="avatar-upload"
                        />
                        <label
                          htmlFor="avatar-upload"
                          className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 sm:p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          <Camera size={14} sm:size={16} className="text-white" />
                        </label>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm sm:text-base">Profile Picture</h3>
                        <p className="text-xs sm:text-sm text-gray-400">Update your avatar image (Max: 5MB)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div className="xs:col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="xs:col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="xs:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto justify-center"
                      >
                        <Save size={16} sm:size={18} />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <Shield className="text-blue-400" size={20} sm:size={24} />
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Security Settings</h2>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 pr-12"
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showCurrentPassword ? <EyeOff size={16} sm:size={18} /> : <Eye size={16} sm:size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div className="xs:col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 pr-12"
                            placeholder="Enter new password"
                            required
                            minLength="6"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showNewPassword ? <EyeOff size={16} sm:size={18} /> : <Eye size={16} sm:size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="xs:col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto justify-center"
                      >
                        <Key size={16} sm:size={18} />
                        {loading ? 'Changing...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <Bell className="text-blue-400" size={20} sm:size={24} />
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Notification Settings</h2>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Mail className="text-blue-400" size={18} sm:size={20} />
                        <div className="min-w-0">
                          <h3 className="font-medium text-white text-sm sm:text-base truncate">Email Notifications</h3>
                          <p className="text-xs sm:text-sm text-gray-400 truncate">Receive notifications via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={systemSettings.emailNotifications}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] sm:after:top-[2px] after:left-[1px] sm:after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Phone className="text-blue-400" size={18} sm:size={20} />
                        <div className="min-w-0">
                          <h3 className="font-medium text-white text-sm sm:text-base truncate">SMS Notifications</h3>
                          <p className="text-xs sm:text-sm text-gray-400 truncate">Receive notifications via SMS</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={systemSettings.smsNotifications}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] sm:after:top-[2px] after:left-[1px] sm:after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleSystemSettingsUpdate}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto justify-center"
                      >
                        <Save size={16} sm:size={18} />
                        {loading ? 'Saving...' : 'Save Settings'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* System Tab */}
              {activeTab === 'system' && (
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <SettingsIcon className="text-blue-400" size={20} sm:size={24} />
                    <h2 className="text-lg sm:text-xl font-semibold text-white">System Settings</h2>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={systemSettings.siteName}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Language
                        </label>
                        <select
                          value={systemSettings.language}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Timezone
                        </label>
                        <select
                          value={systemSettings.timezone}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, timezone: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                          <option value="Europe/London">London</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-white text-sm sm:text-base">Maintenance Mode</h3>
                          <p className="text-xs sm:text-sm text-gray-400">Put the site in maintenance mode</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
                          <input
                            type="checkbox"
                            checked={systemSettings.maintenanceMode}
                            onChange={(e) => setSystemSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] sm:after:top-[2px] after:left-[1px] sm:after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-white text-sm sm:text-base">Auto Backup</h3>
                          <p className="text-xs sm:text-sm text-gray-400">Automatically backup system data</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-4">
                          <input
                            type="checkbox"
                            checked={systemSettings.autoBackup}
                            onChange={(e) => setSystemSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] sm:after:top-[2px] after:left-[1px] sm:after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {systemSettings.autoBackup && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={systemSettings.backupFrequency}
                          onChange={(e) => setSystemSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleSystemSettingsUpdate}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto justify-center"
                      >
                        <Database size={16} sm:size={18} />
                        {loading ? 'Saving...' : 'Save System Settings'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6 shadow-2xl mx-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
                <span className="text-white text-sm sm:text-base">Processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;