import axios, { AxiosResponse } from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
    console.error(
        "No VITE_BACKEND_URL provided. For development, please set VITE_BACKEND_URL in your .env file. Example:\nVITE_BACKEND_URL=http://localhost:3000/api"
    );
    throw new Error("VITE_BACKEND_URL environment variable is not provided.");
}



interface Response {
    message: string;
    data: {
        id: string;
        accessToken: string;
    };
}
interface ResendOtpResponse {
    id: string;
}

// ✅ Verify OTP API
export const verifyOtpAPI = async (otpData: { id: string; otp: string }): Promise<Response["data"]> => {
    const response: AxiosResponse<Response> = await axios.post(`${backendUrl}/auth/verify-otp`, otpData);
    return response.data.data;
};

export const resendOtpAPI = async (userData: { id: string; email: string }): Promise<ResendOtpResponse> => {
    const response: AxiosResponse<ResendOtpResponse> = await axios.post(`${backendUrl}/auth/resend-otp`, userData);
    return response.data;

}