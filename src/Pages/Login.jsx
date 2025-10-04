







// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

// export default function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await login(email, password);

//       // Ensure result is defined and has data
//       const success = result?.success ?? result?.data?.success;
//       const user = result?.user ?? result?.data?.user;
//       const errorCode = result?.error ?? result?.data?.error;
//       const message = result?.message ?? result?.data?.message;

//       if (success) {
//         if (user?.status === "blocked") {
//           setError("Your account has been blocked. Please contact support for assistance.");
//           setLoading(false);
//           return;
//         }

//         if (user?.status === "inactive") {
//           setError("Your account is inactive. Please contact support to activate your account.");
//           setLoading(false);
//           return;
//         }

//         if (user?.status === "active") {
//           navigate("/");
//         } else {
//           setError("Account status not recognized. Please contact support.");
//         }
//       } else {
//         if (errorCode === "USER_NOT_FOUND") {
//           alert("This account does not exist. Please register first.");
//           navigate("/register");
//         } else if (errorCode === "INVALID_CREDENTIALS") {
//           setError("Invalid email or password. Please try again.");
//         } else {
//           setError(message || "Login failed. Please try again.");
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-green-800 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-white/10 to-green-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       {/* Football Pattern Overlay */}
//       <div className="absolute inset-0 opacity-5">
//         <svg width="100%" height="100%" viewBox="0 0 100 100" className="fill-white">
//           <pattern id="footballPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
//             <circle cx="10" cy="10" r="1.5" />
//             <polygon points="10,6 12,8 10,14 8,8" />
//           </pattern>
//           <rect width="100%" height="100%" fill="url(#footballPattern)" />
//         </svg>
//       </div>

//       <div className="relative z-10 w-full max-w-3xl">
//         {/* Login Card - Two Column Layout */}
//         <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] flex flex-col md:flex-row">
//           {/* Left Section - Image */}
//           <div className="w-full md:w-2/5 h-40 md:h-auto">
//             <img 
//               src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" 
//               alt="Sport-X Football Store" 
//               className="w-full h-full object-cover"
//             />
//           </div>
          
//           {/* Right Section - Login Form */}
//           <div className="w-full md:w-3/5 p-4 md:p-5">
//             {/* Header Section */}
//             <div className="text-center mb-4">
//               {/* Logo/Icon */}
//               <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
//                 <User className="w-5 h-5 text-white" />
//               </div>
              
//               <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-green-700 mb-1">
//                 Sport-X
//               </h1>
              
//               <h2 className="text-lg font-bold text-gray-800 mb-1">
//                 Welcome Back!
//               </h2>
              
//               <p className="text-xs text-gray-600">
//                 Sign in to your account
//               </p>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs shadow-md">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-white text-xs">!</span>
//                   </div>
//                   {error}
//                 </div>
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-3">
//               {/* Email Field */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="Enter your email"
//                     disabled={loading}
//                     className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 text-sm text-gray-800 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
//                   />
//                 </div>
//               </div>{/* Password Field */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">
//                   Password (8 digits)
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, '').slice(0, 8);
//                       setPassword(value);
//                     }}
//                     required
//                     placeholder="Enter 8-digit password"
//                     disabled={loading}
//                     pattern="\d{8}"
//                     maxLength={8}
//                     inputMode="numeric"
//                     className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 text-sm text-gray-800 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     disabled={loading}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-2 px-4 bg-gradient-to-r from-green-500 via-blue-600 to-green-500 text-white font-bold text-sm rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-4"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                     Signing in...
//                   </>
//                 ) : (
//                   <>
//                     <Lock className="w-4 h-4" />
//                     Sign In
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Footer Links */}
//             <div className="mt-4 text-center">
//               <div className="relative mb-3">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200"></div>
//                 </div>
//                 <div className="relative flex justify-center text-xs">
//                   <span className="px-3 bg-white text-gray-500">New to Sport-X?</span>
//                 </div>
//               </div>
              
//               <p className="text-xs text-gray-600">
//                 Don't have an account?{" "}
//                 <Link 
//                   to="/register" 
//                   className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-600 hover:to-green-600 transition-all duration-300 underline decoration-1 underline-offset-2"
//                 >
//                   Create Account
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Security Badge */}
//         <div className="mt-4 text-center">
//           <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-2 shadow-lg">
//             <Lock className="w-3 h-3 text-white" />
//             <span className="text-white text-xs font-medium">Secure Login • SSL Protected</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";

// export default function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await login(email, password);

//       const success = result?.success ?? result?.data?.success;
//       const user = result?.user ?? result?.data?.user;
//       const errorCode = result?.error ?? result?.data?.error;
//       const message = result?.message ?? result?.data?.message;

//       if (success) {
//         if (user?.status === "blocked") {
//           setError("Your account has been blocked. Please contact support for assistance.");
//           setLoading(false);
//           return;
//         }

//         if (user?.status === "inactive") {
//           setError("Your account is inactive. Please contact support to activate your account.");
//           setLoading(false);
//           return;
//         }

//         if (user?.status === "active") {
//           navigate("/");
//         } else {
//           setError("Account status not recognized. Please contact support.");
//         }
//       } else {
//         if (errorCode === "USER_NOT_FOUND") {
//           alert("This account does not exist. Please register first.");
//           navigate("/register");
//         } else if (errorCode === "INVALID_CREDENTIALS") {
//           setError("Invalid email or password. Please try again.");
//         } else {
//           setError(message || "Login failed. Please try again.");
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl">
//         {/* Login Card - Two Column Layout */}
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
//           {/* Left Section - Image */}
//           <div className="w-full md:w-2/5 h-40 md:h-auto bg-slate-900 flex items-center justify-center">
//             <div className="text-center p-8">
//               <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
//                 <User className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-2xl font-serif font-light text-white mb-2">Sport-X</h1>
//               <p className="text-slate-300 text-sm">Your Premium Sports Store</p>
//             </div>
//           </div>
          
//           {/* Right Section - Login Form */}
//           <div className="w-full md:w-3/5 p-8 md:p-10">
//             {/* Header Section */}
//             <div className="mb-8">
//               <h2 className="text-3xl font-serif font-light text-slate-900 mb-2">
//                 Welcome Back
//               </h2>
//               <div className="h-px bg-gradient-to-r from-slate-300 to-transparent mb-3"></div>
//               <p className="text-slate-600 text-sm">
//                 Sign in to your account
//               </p>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
//                 <div className="flex items-center gap-2">
//                   <AlertCircle className="w-4 h-4 flex-shrink-0" />
//                   <span>{error}</span>
//                 </div>
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Email Field */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="Enter your email"
//                     disabled={loading}
//                     className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Password (8 digits)
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, '').slice(0, 8);
//                       setPassword(value);
//                     }}
//                     required
//                     placeholder="Enter 8-digit password"
//                     disabled={loading}
//                     pattern="\d{8}"
//                     maxLength={8}
//                     inputMode="numeric"
//                     className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     disabled={loading}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200 disabled:opacity-50"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 px-4 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
//                     Signing in...
//                   </>
//                 ) : (
//                   <>
//                     <Lock className="w-5 h-5" />
//                     Sign In
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Footer Links */}
//             <div className="mt-8">
//               <div className="relative mb-6">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-slate-200"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-4 bg-white text-slate-500">New to Sport-X?</span>
//                 </div>
//               </div>
              
//               <p className="text-center text-sm text-slate-600">
//                 Don't have an account?{" "}
//                 <Link 
//                   to="/register" 
//                   className="font-medium text-slate-900 hover:underline transition-all duration-300"
//                 >
//                   Create Account
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Security Badge */}
//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm">
//             <Lock className="w-4 h-4 text-slate-600" />
//             <span className="text-slate-600 text-sm font-medium">Secure Login • SSL Protected</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














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
      const result = await login(email, password);

      const success = result?.success ?? result?.data?.success;
      const user = result?.user ?? result?.data?.user;
      const errorCode = result?.error ?? result?.data?.error;
      const message = result?.message ?? result?.data?.message;

      if (success) {
        if (user?.status === "blocked") {
          setError("Your account has been blocked. Please contact support for assistance.");
          setLoading(false);
          return;
        }

        if (user?.status === "inactive") {
          setError("Your account is inactive. Please contact support to activate your account.");
          setLoading(false);
          return;
        }

        if (user?.status === "active") {
          navigate("/");
        } else {
          setError("Account status not recognized. Please contact support.");
        }
      } else {
        if (errorCode === "USER_NOT_FOUND") {
          alert("This account does not exist. Please register first.");
          navigate("/register");
        } else if (errorCode === "INVALID_CREDENTIALS") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Login Card - Two Column Layout */}
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section - Enhanced Branding */}
          <div className="w-full md:w-2/5 h-48 md:h-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="text-center p-4 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-light text-white mb-3 tracking-wide">Sport-X</h1>
              <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent mb-3"></div>
              <p className="text-slate-300 text-sm font-light tracking-wide">Your Premium Sports Store</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-xs">
                <Shield className="w-3 h-3" />
                <span>Trusted by Athletes</span>
              </div>
            </div>
          </div>
          
          {/* Right Section - Login Form */}
          <div className="w-full md:w-3/5 p-6 md:p-8 bg-white/80 backdrop-blur-sm">
            {/* Header Section */}
            <div className="mb-6">
              <h2 className="text-3xl font-serif font-light text-slate-900 mb-2 tracking-tight">
                Welcome Back
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-slate-900 to-slate-400 rounded-full mb-3"></div>
              <p className="text-slate-600 text-sm font-light">
                Sign in to continue your journey
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-300 text-rose-700 rounded-2xl text-sm shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-1.5 transition-colors duration-200 group-focus-within:text-slate-900">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-slate-900">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-slate-600" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900 focus:ring-opacity-10 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:border-slate-300"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 mb-1.5 transition-colors duration-200 group-focus-within:text-slate-900">
                  Password (8 digits)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-slate-600" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 8);
                      setPassword(value);
                    }}
                    required
                    placeholder="Enter 8-digit password"
                    disabled={loading}
                    pattern="\d{8}"
                    maxLength={8}
                    inputMode="numeric"
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-slate-200 rounded-xl bg-white/50 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900 focus:ring-opacity-10 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:border-slate-300"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium rounded-xl transition-all duration-300 hover:from-slate-800 hover:to-slate-700 hover:shadow-lg hover:shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-slate-500 font-light">New to Sport-X?</span>
                </div>
              </div>
              
              <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="font-semibold text-slate-900 hover:underline hover:text-slate-700 transition-all duration-300 underline-offset-4"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-white/40 rounded-full px-8 py-4 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 transition-all duration-300">
            <Lock className="w-4 h-4 text-slate-600" />
            <span className="text-slate-700 text-sm font-medium tracking-wide">Secure Login • SSL Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}