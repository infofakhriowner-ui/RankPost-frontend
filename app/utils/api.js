import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   ATTACH ACCESS TOKEN
========================= */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* =========================
   REFRESH TOKEN LOGIC
========================= */
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
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        // 🔴 IMPORTANT FIX — backend expects BODY param name `refresh_token`
        const res = await axios.post(`${baseURL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token } = res.data;

        localStorage.setItem("access_token", access_token);

        api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        processQueue(null, access_token);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // 🔴 FIXED PATH (matches your app routing)
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* =========================
   API HELPERS
========================= */

export async function getIpInfo() {
  const res = await api.get("/utils/ipinfo");
  return res.data;
}

export async function autoPublish({ keyword, style, site_id, with_image }) {
  const res = await api.post("/content/auto-publish", {
    keyword,
    style,
    site_id,
    with_image,
  });
  return res.data;
}

export default api;
