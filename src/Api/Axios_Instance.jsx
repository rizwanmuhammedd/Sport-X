



// import axios from "axios";
// import toast from "react-hot-toast";

// const api = axios.create({
//   baseURL: "https://localhost:5206/api",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🔥 GLOBAL 401 HANDLER (ONE TOAST ONLY)
// // 🔥 GLOBAL 401 HANDLER (BLOCKED + EXPIRED)
// let isSessionToastShown = false;

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const message = error.response?.data?.message;

//     if (status === 401) {
//       // Prevent duplicate toasts
//       if (!isSessionToastShown) {
//         if (message === "User is blocked") {
//           toast.error("Your account has been blocked by admin");
//         } else {
//           toast.error("Session expired. Please login again.");
//         }
//         isSessionToastShown = true;
//       }

//       // Clear auth
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Hard redirect (important to reset app state)
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 500);
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;








import axios from "axios";

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 GLOBAL AUTH FAILURE HANDLER (NO TOAST ❌)
let isLogoutTriggered = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const url = error.config?.url || "";

    // ✅ IGNORE 401 FROM PAYMENT SUCCESS PAGE FETCH
    if (
      status === 401 &&
      !isLogoutTriggered &&
      !url.includes("/order/")
    ) {
      isLogoutTriggered = true;

      window.dispatchEvent(
  new CustomEvent("show-modal", {
    detail: {
      title:
        message === "User is blocked"
          ? "Account Blocked"
          : "Session Expired",
      message:
        message === "User is blocked"
          ? "Your account has been blocked by admin."
          : "Your session expired. Please login again.",
      redirect: "/login",
    },
  })
);

    }
     if (status !== 401) {
      isLogoutTriggered = false;
    }

    return Promise.reject(error);
  }
);

export default api;
