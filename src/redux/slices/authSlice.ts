import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginUserAPI, resetEmailAPI, verifyOtpAPI } from "@/api/authService";
import { extractErrorMessage } from "@/utils/errorHandler";
import guestApi from "@/api/guestApi";

interface User {
    id: string;
    uname: string;
    email: string;
    phone: number;
    isMentor: boolean;
    profileImg: string | null;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    id: string | null;
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
    id: null,
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

export const resetEmail = createAsyncThunk<{ message: string }, { email: string }, { rejectValue: string }>(
    "auth/resetEmail",
    async ({ email }, { rejectWithValue }) => {
        try {
            console.log("first", email)
            return await resetEmailAPI(email);
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);



// ✅ Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.id = null;
            state.accessToken = null;
        },
        setUser: (state, action) => {
            state.accessToken = action.payload;
            state.id = action.payload;
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
                state.id = action.payload.id;
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
                state.id = action.payload.user.id;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(resetEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetEmail.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Reset email failed";
            })
            
    },
});

// ✅ Export Actions & Selectors
export const { logout, setUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;