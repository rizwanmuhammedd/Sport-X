

// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../Api/Axios_Instance";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
// const isAdmin = user?.role === "Admin";

//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       localStorage.clear();
//       setUser(null);
//     }

//     setLoading(false);
//   }, []);

//   const signup = async ({ name, email, password }) => {
//     try {
//       await api.post("/auth/register", { name, email, password });
//       toast.success("Registration successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Signup failed");
//       throw err;
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       const token = res.data.data.accessToken;

//       localStorage.setItem("token", token);

//       const payload = JSON.parse(atob(token.split(".")[1]));

//       const userData = {
//         id: payload.uid,
//         role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
//         email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
//       };

//       localStorage.setItem("currentUser", JSON.stringify(userData));
//       setUser(userData);

//       toast.success("Logged in successfully");

//       if (userData.role === "Admin") navigate("/admin/dashboard");
//       else navigate("/");

//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//       throw err;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     setUser(null);
//     navigate("/login");
//   };

//   // ⛔ prevent app rendering before auth hydration completes
//   if (loading) return null;

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
  




import { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/Axios_Instance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.clear();
      setUser(null);
    }

    setLoading(false);
  }, []);

const signup = async ({ name, email, password }) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });

    if (res.status === 200) {   // 🔹 IMPORTANT CHANGE
      toast.success("Registration successful! Please login.");
      return true;
    }

    toast.error(res.data?.message || "Signup failed");
    return false;
  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed");
    return false;
  }
};




  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.data.accessToken;

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      // FIX: Extract name from JWT claims if available
      const userData = {
        id: payload.uid,
        role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        // Try to get name from different possible claims
        name: payload.name || 
              payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
              payload["http://schemas.xmlsoap.org/ws/2008/06/identity/claims/name"] ||
              payload.username ||
              email.split('@')[0], // Fallback: use email username part
        username: payload.username || email.split('@')[0] // Fallback username
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
      setUser(userData);

      toast.success("Logged in successfully");

      if (userData.role === "Admin") navigate("/admin/dashboard");
      else navigate("/");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  // ⛔ prevent app rendering before auth hydration completes
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};