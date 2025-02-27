import axios, { AxiosResponse } from "axios";

// API Base URL from Environment Variables
const API_BASE_URL = "http://localhost:3000/api/auth";

interface SignupResponse {
    id: string; // User ID returned after signup
}

// interface VerifyOtpResponse {
//     id: string;
//     accessToken: string;
// }

interface LoginResponse {
    message: string;
    data: {
        id: string;
        accessToken: string;
    };
}

// ✅ Signup API
export const signupUserAPI = async (userData: { username: string; email: string; phone: string; password: string }): Promise<SignupResponse> => {
    const response: AxiosResponse<SignupResponse> = await axios.post(`${API_BASE_URL}/`, {
        uname: userData.username,
        email: userData.email,
        phone: userData.phone,
        pwd: userData.password,
        confirm_pwd: userData.password,
    });
    return response.data;
};

// ✅ Verify OTP API
export const verifyOtpAPI = async (otpData: { id: string; otp: string }): Promise<LoginResponse["data"]> => {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}/verify-otp`, otpData);
    return response.data.data;
};

export const loginUserAPI = async (userData: { email: string; password: string }): Promise<LoginResponse["data"]> => {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data.data;
}