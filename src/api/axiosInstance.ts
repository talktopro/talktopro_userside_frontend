import { store } from "@/redux/store";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token from Redux
apiClient.interceptors.request.use(
  (config) => {
    // Access Redux state
    const state = store.getState() as { auth: { accessToken: string } };
    const { auth } = state;
    const token = auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;