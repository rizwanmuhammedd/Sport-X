


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Shield } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    await login(email, password);
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Login failed. Please try again.";

    setError(message);
  } finally {
    setLoading(false);
  }
};


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-3 xs:p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-2xl xs:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-2xl xs:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-2xl xs:blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl relative z-10">
        {/* Login Card - Two Column Layout */}
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl xs:rounded-3xl shadow-xl xs:shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section - Enhanced Branding */}
          <div className="w-full md:w-2/5 h-40 xs:h-48 md:h-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-24 h-24 xs:w-32 xs:h-32 bg-white rounded-full blur-xl xs:blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 xs:w-40 xs:h-40 bg-cyan-400 rounded-full blur-2xl xs:blur-3xl"></div>
            </div>
            
            <div className="text-center p-3 xs:p-4 relative z-10">
              <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-xl xs:rounded-2xl flex items-center justify-center mx-auto mb-4 xs:mb-6 border border-white/30 shadow-lg xs:shadow-xl transform hover:scale-105 transition-transform duration-300">
                <User className="w-8 h-8 xs:w-10 xs:h-10 text-white" />
              </div>
              <h1 className="text-2xl xs:text-3xl font-serif font-light text-white mb-2 xs:mb-3 tracking-wide">Sport-X</h1>
              <div className="h-px w-20 xs:w-24 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent mb-2 xs:mb-3"></div>
              <p className="text-slate-300 text-xs xs:text-sm font-light tracking-wide">Your Premium Sports Store</p>
              <div className="mt-4 xs:mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs">
                <Shield className="w-3 h-3" />
                <span>Trusted by Athletes</span>
              </div>
            </div>
          </div>
          
          {/* Right Section - Login Form */}
          <div className="w-full md:w-3/5 p-4 xs:p-5 sm:p-6 md:p-8 bg-white/80 backdrop-blur-sm">
            {/* Header Section */}
            <div className="mb-4 xs:mb-5 sm:mb-6">
              <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-1 xs:mb-2 tracking-tight">
                Welcome Back
              </h2>
              <div className="h-1 w-12 xs:w-16 bg-gradient-to-r from-slate-900 to-slate-400 rounded-full mb-2 xs:mb-3"></div>
              <p className="text-slate-600 text-xs xs:text-sm font-light">
                Sign in to continue your journey
              </p>
            </div>

            {/* Error Message */}
            {error && (
<div className="mb-3 xs:mb-4 p-2 xs:p-3 bg-gradient-to-r from-red-50 to-rose-50 border border-red-400 text-red-700 rounded-xl xs:rounded-2xl text-xs xs:text-sm shadow-sm">
                <div className="flex items-center gap-1 xs:gap-2">
                  <AlertCircle className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
              {/* Email Field */}
              <div className="group">
                <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1 xs:mb-1.5 transition-colors duration-200 group-focus-within:text-slate-900">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-slate-900">
                    <Mail className="h-4 w-4 xs:h-5 xs:w-5 text-slate-400 group-focus-within:text-slate-600" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                    className="w-full pl-9 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3.5 border border-slate-200 xs:border-2 rounded-lg xs:rounded-xl bg-white/50 focus:bg-white focus:border-slate-900 focus:ring-2 xs:focus:ring-4 focus:ring-slate-900 focus:ring-opacity-10 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:border-slate-300 text-sm xs:text-base"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1 xs:mb-1.5 transition-colors duration-200 group-focus-within:text-slate-900">
                  Password (8 digits)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none transition-colors duration-200">
                    <Lock className="h-4 w-4 xs:h-5 xs:w-5 text-slate-400 group-focus-within:text-slate-600" />
                  </div>
                 <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  placeholder="Enter your password"
  disabled={loading}
  className="w-full pl-9 xs:pl-12 pr-9 xs:pr-12 py-2.5 xs:py-3.5 border border-slate-200 xs:border-2 rounded-lg xs:rounded-xl bg-white/50 focus:bg-white focus:border-slate-900 focus:ring-2 xs:focus:ring-4 focus:ring-slate-900 focus:ring-opacity-10 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:border-slate-300 text-sm xs:text-base"
/>


                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-3 xs:pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 xs:h-5 xs:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 xs:h-5 xs:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 xs:py-4 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium rounded-lg xs:rounded-xl transition-all duration-300 hover:from-slate-800 hover:to-slate-700 hover:shadow-lg hover:shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 xs:gap-2 mt-6 xs:mt-8 transform hover:scale-[1.02] active:scale-[0.98] text-sm xs:text-base"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 xs:w-5 xs:h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 xs:mt-8">
              <div className="relative mb-4 xs:mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs xs:text-sm">
                  <span className="px-3 xs:px-4 bg-white/80 text-slate-500 font-light">New to Sport-X?</span>
                </div>
              </div>
              
              <p className="text-center text-xs xs:text-sm text-slate-600">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="font-semibold text-slate-900 hover:underline hover:text-slate-700 transition-all duration-300 underline-offset-2 xs:underline-offset-4"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 xs:mt-8 text-center">
          <div className="inline-flex items-center gap-1.5 xs:gap-2.5 bg-white/90 backdrop-blur-md border border-white/40 rounded-full px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 shadow-lg xs:shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 transition-all duration-300">
            <Lock className="w-3 h-3 xs:w-4 xs:h-4 text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
}