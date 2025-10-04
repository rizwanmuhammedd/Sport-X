// src/api/axios.js
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:3000", // 👈 json-server running port
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
