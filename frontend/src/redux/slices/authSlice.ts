import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { signupUserAPI, verifyOtpAPI } from "@/api/authService";
import { handleApiError } from "@/utils/errorHandler";

interface AuthState {
    userId: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userId: null,
    token: null,
    loading: false,
    error: null,
};

export const signupUser = createAsyncThunk<string, { username: string; email: string; phone: string; password: string }, { rejectValue: string }>(
    "auth/signupUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await signupUserAPI(userData);
            return response.id; // Returning userId
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

export const verifyOtp = createAsyncThunk<{ userId: string; token: string }, { userId: string; otp: string }, { rejectValue: string }>(
    "auth/verifyOtp",
    async (otpData, { rejectWithValue }) => {
        try {
            return await verifyOtpAPI(otpData);
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
);

// ✅ Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userId = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Signup Reducers
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.userId = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Signup failed";
            })

            // ✅ Verify OTP Reducers
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<{ userId: string; token: string }>) => {
                state.loading = false;
                state.userId = action.payload.userId;
                state.token = action.payload.token;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "OTP verification failed";
            });
    },
});

// ✅ Export Actions & Selectors
export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;