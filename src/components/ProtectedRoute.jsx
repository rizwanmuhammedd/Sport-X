






// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ redirectPath = "/login", adminOnly = false }) {
//   const { user, loading } = useAuth();

//   // Show loader while checking auth status
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-lg text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   // If user not logged in → redirect to login
//   if (!user) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   // If route is admin-only and user is not admin → redirect home
// if (adminOnly && user.role !== "Admin") {
//     return <Navigate to="/" replace />;
//   }

//   // If user is admin trying to access user routes → redirect to admin dashboard
// if (!adminOnly && user.role === "Admin") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   // Otherwise render child route
//   return <Outlet />;
// }







import { Navigate, Outlet } from "react-router-dom"; // Make sure Navigate is imported
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ redirectPath = "/login", adminOnly = false }) {
  const { user, loading } = useAuth();

  // Show loader while checking auth status
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // If user not logged in → redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // If route is admin-only and user is not admin → redirect home
  if (adminOnly && user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  // If user is admin trying to access user routes → redirect to admin dashboard
  if (!adminOnly && user.role === "Admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Otherwise render child route
  return <Outlet />;
}