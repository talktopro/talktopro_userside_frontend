import { store } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

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

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      // Note: Redirect must be handled in a component since navigate isn't available here
    }
    // else {
    //   const errorMessage = (error.response?.data as { errors?: string[] })?.errors?.[0] || "An error occurred.";
    //   toast.error(errorMessage);
    // }
    return Promise.reject(error);
  }
);

export default apiClient;