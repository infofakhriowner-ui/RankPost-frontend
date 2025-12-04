import axios from "axios";

// Create API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Example: https://api.rankpost.net/api/v1
  timeout: 90000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Correct token name from backend (FastAPI)
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If unauthorized (token expired), try refresh
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/auth/refresh`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          // Save new tokens
          localStorage.setItem("access_token", res.data.access_token);

          // Retry original request
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;

          return api(originalRequest);
        } catch (e) {
          console.log("Token refresh failed, logging out.");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
