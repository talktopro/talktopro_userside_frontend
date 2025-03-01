import { store } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Adjust based on environment (e.g., process.env.REACT_APP_API_URL)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token from Redux
apiClient.interceptors.request.use(
  (config) => {
    // Access Redux state
    const { auth } = store.getState();
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
    } else {
      const errorMessage = (error.response?.data as { errors?: string[] })?.errors?.[0] || "An error occurred.";
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default apiClient;