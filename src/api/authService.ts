import axios, { AxiosResponse } from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    console.error(
        "No VITE_BACKEND_URL provided. For development, please set VITE_BACKEND_URL in your .env file. Example:\nVITE_BACKEND_URL=http://localhost:3000/api"
    );
    throw new Error("VITE_BACKEND_URL environment variable is not provided.");
}

interface ResendOtpResponse {
    id: string;
}

interface ResetEmailResponse {
    message: string;
}

// ✅ Verify OTP API
export const verifyOtpAPI = async (otpData: { id: string; otp: string }): Promise<Response["data"]> => {
    const response: AxiosResponse<Response> = await axios.post(`${backendUrl}/auth/verify-otp`, otpData);
    return response.data.data;
};

export const loginUserAPI = async (userData: { email: string; password: string }): Promise<Response["data"]> => {
    const response: AxiosResponse<Response> = await axios.post(`${backendUrl}/auth/login`, userData);
    return response.data.data;
}

export const resendOtpAPI = async (userData: { id: string; email: string }): Promise<ResendOtpResponse> => {
    const response: AxiosResponse<ResendOtpResponse> = await axios.post(`${backendUrl}/auth/resend-otp`, userData);
    return response.data;

}

export const resetEmailAPI = async (email: string): Promise<ResetEmailResponse> => {
    const response: AxiosResponse<ResetEmailResponse> = await axios.post(`${backendUrl}/auth/reset-email`, { email });
    return response.data;
};
