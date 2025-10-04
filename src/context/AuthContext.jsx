


import { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // Save updated user to localStorage and update users array
  const saveUser = (updatedUser) => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === updatedUser.email);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
    setUser(updatedUser);
  };

  const signup = async ({ name, email, password }) => {
    try {
      const response = await api.get(`/users?email=${email}`)
      if (response.data.length > 0) {
        toast.error("Email id Already Exists")
      } else {
        const newuser = { name, email, password }
        const userData = { ...newuser, role: "user", status: "active", isAuthenticated: true, cart: [], wishlist: [], shippingAddress: [], orders: [] }

        const Postresponse = await api.post('/users', userData)
        console.log(Postresponse)

        localStorage.setItem("currentUser", JSON.stringify(Postresponse.data));
        setUser(Postresponse.data);
        toast.success("Signup SuccessFull")
        navigate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }





  const login = async (email, password) => {
  try {
    const response = await api.get(`/users?email=${email}&&password=${password}`)

    if (response.data.length === 0) {
      toast.error("The UserName or Password doesn't Match")
      return
    }

    const userData = response.data[0];

    // Check legacy isAuthenticated field first 
    if (userData.isAuthenticated === false) {
      toast.error("You Have Been Blocked By Admin")
      return
    }

    // For ALL users (including admin), check if they are specifically blocked
    if (userData.status === 'blocked') {
      toast.error("Your account has been blocked. Please contact support for assistance.")
      return
    }

    // FIXED: Store complete user data in localStorage for BOTH users and admins
    localStorage.setItem("currentUser", JSON.stringify(userData))
    localStorage.setItem("role", userData.role)
    setUser(userData)

    // Navigate based on role
    if (userData.role === "user") {
      navigate("/")
    } else {
      navigate("/admin/dashboard")
    }
    
    toast.success("Logined Successfully")

  } catch (e) {
    console.log(e)
    toast.error("Login failed. Please try again.")
  }
}

 
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // Add order to current user
  const addOrder = (order) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      orders: [...(user.orders || []), order],
    };
    saveUser(updatedUser);
  };

  // Update user info (for Profile edit)
  const updateUser = (updatedFields) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };
    saveUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, addOrder, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};