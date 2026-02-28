// FIXED VERSION
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

// Track refresh state
let isRefreshing = false;
let failedQueue = [];
let isLogoutTriggered = false;

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    isLogoutTriggered = false;
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const url = originalRequest?.url || "";

    // Only attempt refresh on 401, not on login/register/refresh endpoints
    if (
      status === 401 &&
      !originalRequest._retry &&
      !url.includes("/auth/login") &&
      !url.includes("/auth/register") &&
      !url.includes("/auth/refresh")
    ) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt token refresh
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken }
        );

        const newToken = res.data?.data?.accessToken;
        const newRefreshToken = res.data?.data?.refreshToken;

        if (!newToken) throw new Error("No token in refresh response");

        // Save new tokens
        localStorage.setItem("token", newToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        // Update auth header
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Refresh failed — logout user
        if (!isLogoutTriggered) {
          isLogoutTriggered = true;
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("currentUser");

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

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;



// import axios from "axios";

// const api = axios.create({
// baseURL: import.meta.env.VITE_API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🔥 GLOBAL AUTH FAILURE HANDLER (NO TOAST ❌)
// let isLogoutTriggered = false;

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const message = error.response?.data?.message;
//     const url = error.config?.url || "";

//     // ✅ IGNORE 401 FROM PAYMENT SUCCESS PAGE FETCH
//     if (
//       status === 401 &&
//       !isLogoutTriggered &&
//       !url.includes("/order/")
//     ) {
//       isLogoutTriggered = true;

//       window.dispatchEvent(
//   new CustomEvent("show-modal", {
//     detail: {
//       title:
//         message === "User is blocked"
//           ? "Account Blocked"
//           : "Session Expired",
//       message:
//         message === "User is blocked"
//           ? "Your account has been blocked by admin."
//           : "Your session expired. Please login again.",
//       redirect: "/login",
//     },
//   })
// );

//     }
//      if (status !== 401) {
//       isLogoutTriggered = false;
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
