// src/api/axios.js
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "https://sport-x-backend-3.onrender.com", // 👈 use your Render URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

