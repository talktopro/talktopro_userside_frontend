import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "@/redux/slices/authSlice"; // adjust path if needed

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    throw new Error("VITE_BACKEND_URL environment variable is not provided.");
}

interface ResendOtpResponse {
    id: string;
}

interface ResetEmailResponse {
    message: string;
}

// ✅ Verify OTP API
export const verifyOtpAPI = async (otpData: { id: string; otp: string }): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await axios.post(`${backendUrl}/auth/verify-otp`, otpData);
    return response.data;
};

export const loginUserAPI = async (userData: { email: string; password: string }): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await axios.post(`${backendUrl}/auth/login`, userData);
    return response.data;
};

export const resendOtpAPI = async (userData: { id: string; email: string }): Promise<ResendOtpResponse> => {
    const response: AxiosResponse<ResendOtpResponse> = await axios.post(`${backendUrl}/auth/resend-otp`, userData);
    return response.data;
};

export const forgotPasswordAPI = async (email: string): Promise<ResetEmailResponse> => {
    const response: AxiosResponse<ResetEmailResponse> = await axios.post(`${backendUrl}/auth/forgot-password`, { email });
    return response.data;
};

export const changePasswordAPI = async (password: string, token: string): Promise<ResetEmailResponse> => {
    const response: AxiosResponse<ResetEmailResponse> = await axios.patch(`${backendUrl}/auth/change-password/${token}`, { password });
    return response.data;
};
