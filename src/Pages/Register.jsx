// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff, Mail, Lock, User, UserPlus, AlertCircle } from "lucide-react";

// export default function Register() {
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     // For password fields, only allow digits and limit to 8
//     if (name === "password" || name === "confirmPassword") {
//       const numericValue = value.replace(/\D/g, '').slice(0, 8);
//       setForm({ ...form, [name]: numericValue });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
    
//     // Clear error when user starts typing
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const success = await signup({
//         name: form.name,
//         email: form.email,
//         password: form.password,
//       });

//       setForm({ name: "", email: "", password: "", confirmPassword: "" });
//     } catch (error) {
//       setError("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <div className="min-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl">
//         {/* Register Card - Two Column Layout */}
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
//           {/* Left Section - Brand */}
//           <div className="w-full md:w-2/5 h-32 md:h-auto bg-slate-900 flex items-center justify-center">
//             <div className="text-center p-6">
//               <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
//                 <UserPlus className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-xl font-serif font-light text-white mb-1">Sport-X</h1>
//               <p className="text-slate-300 text-xs">Your Premium Sports Store</p>
//             </div>
//           </div>
          
//           {/* Right Section - Register Form */}
//           <div className="w-full md:w-3/5 p-6 md:p-8">
//             {/* Header Section */}
//             <div className="mb-8">
//               <h2 className="text-3xl font-serif font-light text-slate-900 mb-2">
//                 Join the Team
//               </h2>
//               <div className="h-px bg-gradient-to-r from-slate-300 to-transparent mb-3"></div>
//               <p className="text-slate-600 text-sm">
//                 Create your account
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
//               {/* Name Field */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your full name"
//                     disabled={loading}
//                     className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>

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
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
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
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
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

//               {/* Confirm Password Field */}
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     placeholder="Confirm 8-digit password"
//                     disabled={loading}
//                     pattern="\d{8}"
//                     maxLength={8}
//                     inputMode="numeric"
//                     className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
//                   />
//                   <button
//                     type="button"
//                     onClick={toggleConfirmPasswordVisibility}
//                     disabled={loading}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200 disabled:opacity-50"
//                   >
//                     {showConfirmPassword ? (
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
//                     Creating Account...
//                   </>
//                 ) : (
//                   <>
//                     <UserPlus className="w-5 h-5" />
//                     Create Account
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
//                   <span className="px-4 bg-white text-slate-500">Already have an account?</span>
//                 </div>
//               </div>
              
//               <p className="text-center text-sm text-slate-600">
//                 Sign in{" "}
//                 <Link 
//                   to="/login" 
//                   className="font-medium text-slate-900 hover:underline transition-all duration-300"
//                 >
//                   here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Security Badge */}
//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm">
//             <Lock className="w-4 h-4 text-slate-600" />
//             <span className="text-slate-600 text-sm font-medium">Secure Registration • SSL Protected</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, UserPlus, AlertCircle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: value
  }));

  if (error) setError("");
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const success = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-3 xs:p-4 sm:p-6">
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl">
        {/* Register Card - Two Column Layout */}
        <div className="bg-white border border-slate-200 rounded-xl xs:rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Left Section - Brand */}
          <div className="w-full md:w-2/5 h-28 xs:h-32 md:h-auto bg-slate-900 flex items-center justify-center">
            <div className="text-center p-4 xs:p-5 sm:p-6">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-white/10 backdrop-blur-md rounded-lg xs:rounded-xl flex items-center justify-center mx-auto mb-2 xs:mb-3 border border-white/20">
                <UserPlus className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
              </div>
              <h1 className="text-lg xs:text-xl font-serif font-light text-white mb-1">Sport-X</h1>
              <p className="text-slate-300 text-xs">Your Premium Sports Store</p>
            </div>
          </div>
          
          {/* Right Section - Register Form */}
          <div className="w-full md:w-3/5 p-4 xs:p-5 sm:p-6 md:p-8">
            {/* Header Section */}
            <div className="mb-6 xs:mb-8">
              <h2 className="text-2xl xs:text-3xl font-serif font-light text-slate-900 mb-1 xs:mb-2">
                Join the Team
              </h2>
              <div className="h-px bg-gradient-to-r from-slate-300 to-transparent mb-2 xs:mb-3"></div>
              <p className="text-slate-600 text-xs xs:text-sm">
                Create your account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 xs:mb-6 p-3 xs:p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg xs:rounded-xl text-xs xs:text-sm">
                <div className="flex items-center gap-1 xs:gap-2">
                  <AlertCircle className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1 xs:mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 xs:h-5 xs:w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    disabled={loading}
                    className="w-full pl-9 xs:pl-11 pr-3 xs:pr-4 py-2.5 xs:py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm xs:text-base"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1 xs:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 xs:h-5 xs:w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                    className="w-full pl-9 xs:pl-11 pr-3 xs:pr-4 py-2.5 xs:py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm xs:text-base"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1 xs:mb-2">
                  Password (8 digits)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 xs:h-5 xs:w-5 text-slate-400" />
                  </div>
                 <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={form.password}
  onChange={handleChange}
  required
  placeholder="Enter your password"
  disabled={loading}
  className="w-full pl-9 xs:pl-11 pr-9 xs:pr-11 py-2.5 xs:py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400"
/>

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-3 xs:pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 xs:h-5 xs:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 xs:h-5 xs:w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs xs:text-sm font-medium text-slate-700 mb-1 xs:mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 xs:pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 xs:h-5 xs:w-5 text-slate-400" />
                  </div>
                 <input
  type={showConfirmPassword ? "text" : "password"}
  name="confirmPassword"
  value={form.confirmPassword}
  onChange={handleChange}
  required
  placeholder="Confirm your password"
  disabled={loading}
  className="w-full pl-9 xs:pl-11 pr-9 xs:pr-11 py-2.5 xs:py-3 border border-slate-200 rounded-lg bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-opacity-20 transition-all duration-300 text-slate-900 placeholder-slate-400"
/>

                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-3 xs:pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {showConfirmPassword ? (
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
                className="w-full py-3 xs:py-3.5 px-4 bg-slate-900 text-white font-medium rounded-lg xs:rounded-xl transition-all duration-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 xs:gap-2 mt-4 xs:mt-6 text-sm xs:text-base"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 xs:w-5 xs:h-5" />
                    <span>Create Account</span>
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
                  <span className="px-3 xs:px-4 bg-white text-slate-500">Already have an account?</span>
                </div>
              </div>
              
              <p className="text-center text-xs xs:text-sm text-slate-600">
                Sign in{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-slate-900 hover:underline transition-all duration-300"
                >
                  here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-4 xs:mt-6 text-center">
          <div className="inline-flex items-center gap-1 xs:gap-2 bg-white border border-slate-200 rounded-full px-4 xs:px-6 py-2 xs:py-3 shadow-sm">
            <Lock className="w-3 h-3 xs:w-4 xs:h-4 text-slate-600" />
            <span className="text-slate-600 text-xs xs:text-sm font-medium">Secure Registration • SSL Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}