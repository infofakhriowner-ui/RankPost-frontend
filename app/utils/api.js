import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// ---------------- Attach Token ----------------
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

// ---------------- Refresh Token Logic ----------------
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        const resp = await axios.post(`${baseURL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        const { access_token, refresh_token } = resp.data;

        localStorage.setItem("access_token", access_token);
        if (refresh_token) localStorage.setItem("refresh_token", refresh_token);

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        processQueue(null, access_token);

        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/auth/login"; // redirect to login page
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

// ---------------- API Functions ----------------

// Get IP Info
export async function getIpInfo() {
  try {
    const res = await api.get("/utils/ipinfo");
    return res.data;
  } catch (err) {
    console.error("Failed to get IP info:", err);
    return null;
  }
}

// Auto Publish
export async function autoPublish({ keyword, style, site_id, with_image }) {
  try {
    const res = await api.post("/content/auto-publish", {
      keyword,
      style,
      site_id,
      with_image,
    });
    return res.data;
  } catch (err) {
    console.error("Auto publish failed:", err.response?.data || err.message);
    throw err;
  }
}

export default api;
