import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { verifyOtpAPI } from "@/api/authService";
import { extractErrorMessage } from "@/utils/errorHandler";
import guestApi from "@/api/guestApi";
import { MentorDetails } from "@/types/user";

interface User {
    id: string;
    uname: string;
    email: string;
    phone: number;
    isMentor: boolean;
    profileImg: string | null;
    mentor_application_status?: string;
    mentorDetails?: MentorDetails
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
}

interface AuthResponse {
    user: User;
    accessToken: string | null;
    refreshToken: string | null;
    message: string;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
};

export const verifyOtp = createAsyncThunk<{ id: string; accessToken: string }, { id: string; otp: string }, { rejectValue: string }>(
    "auth/verifyOtp",
    async (otpData, { rejectWithValue }) => {
        try {
            const response = await verifyOtpAPI(otpData);
            return response;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);

export const loginUser = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: string }>(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await guestApi.post("/auth/login", userData);
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(extractErrorMessage(error));
        }
    }
)


// ✅ Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.refreshToken = null;
            state.accessToken = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setTokens: (
            state,
            action: PayloadAction<{ accessToken: string; refreshToken: string }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Verify OTP Reducers
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<{ id: string; accessToken: string }>) => {
                state.loading = false;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
    },
});

// ✅ Export Actions & Selectors
export const { logout, setUser, updateUser, setTokens } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;