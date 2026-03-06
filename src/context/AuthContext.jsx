// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../Api/Axios_Instance";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const isAdmin = user?.role === "Admin";

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
//       const res = await api.post("/auth/register", { name, email, password });

//       if (res.status === 200) {
//         toast.success("Registration successful! Please login.");
//         return true;
//       }

//       toast.error(res.data?.message || "Signup failed");
//       return false;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Signup failed");
//       return false;
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       const accessToken = res.data.data.accessToken;
//       const refreshToken = res.data.data.refreshToken;

//       // Save both tokens
//       localStorage.setItem("token", accessToken);
//       if (refreshToken) {
//         localStorage.setItem("refreshToken", refreshToken);
//       }

//       const payload = JSON.parse(atob(accessToken.split(".")[1]));

//       const userData = {
//         id: payload.uid,
//         role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
//         email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
//         name:
//           payload.name ||
//           payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
//           payload["http://schemas.xmlsoap.org/ws/2008/06/identity/claims/name"] ||
//           payload.username ||
//           email.split("@")[0],
//         username: payload.username || email.split("@")[0],
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
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("currentUser");
//     setUser(null);
//     navigate("/login");
//   };

//   if (loading) return null;

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
  



import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
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
  const refreshTimerRef = useRef(null);

  // ── Silent refresh helper ──────────────────────────────────────────────
  const silentRefresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        { refreshToken }
      );

      const newToken = res.data?.data?.accessToken;
      const newRefreshToken = res.data?.data?.refreshToken;

      if (!newToken) return false;

      localStorage.setItem("token", newToken);
      if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      // Schedule next refresh (every 10 minutes)
      scheduleRefresh();
      return true;
    } catch {
      return false;
    }
  };

  // ── Schedule proactive token refresh every 10 min ─────────────────────
  const scheduleRefresh = () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(() => {
      silentRefresh();
    }, 10 * 60 * 1000); // 10 minutes
  };

  // ── On app load: restore session ──────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const storedUser = localStorage.getItem("currentUser");
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedUser && storedToken) {
        // Check if access token is still valid (not expired)
        try {
          const payload = JSON.parse(atob(storedToken.split(".")[1]));
          const expiry = payload.exp * 1000; // convert to ms
          const now = Date.now();
          const timeLeft = expiry - now;

          if (timeLeft > 30000) {
            // Token still valid (more than 30s left) — use it
            setUser(JSON.parse(storedUser));
            api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
            scheduleRefresh();
          } else if (storedRefreshToken) {
            // Token expired or about to expire — refresh silently
            const refreshed = await silentRefresh();
            if (refreshed) {
              setUser(JSON.parse(storedUser));
            } else {
              // Refresh failed — clear everything
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("currentUser");
              setUser(null);
            }
          } else {
            // No refresh token — clear
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            setUser(null);
          }
        } catch {
          // Token parse failed — clear
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("currentUser");
          setUser(null);
        }
      } else {
        // No stored session — guest user, that's fine
        setUser(null);
      }

      setLoading(false);
    };

    init();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;

      localStorage.setItem("token", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      const payload = JSON.parse(atob(accessToken.split(".")[1]));

      const userData = {
        id: payload.uid,
        role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        name:
          payload.name ||
          payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
          payload["http://schemas.xmlsoap.org/ws/2008/06/identity/claims/name"] ||
          payload.username ||
          email.split("@")[0],
        username: payload.username || email.split("@")[0],
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
      setUser(userData);

      // Start proactive refresh schedule
      scheduleRefresh();

      toast.success("Logged in successfully");

      if (userData.role === "Admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // ── Signup ─────────────────────────────────────────────────────────────
  const signup = async ({ name, email, password }) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.status === 200) {
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

  // ── Logout ─────────────────────────────────────────────────────────────
  const logout = () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};