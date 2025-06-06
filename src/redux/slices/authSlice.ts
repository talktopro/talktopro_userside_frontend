import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { changePasswordAPI, forgotPasswordAPI } from "@/api/authService";
import { extractErrorMessage } from "@/utils/errorHandler";
import guestApi from "@/api/guestApi";
import { User } from "@/types/user";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    isTokenExpired: boolean;
}

export interface AuthResponse {
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
    error: null,
    isTokenExpired: false,
};

export const verifyOtp = createAsyncThunk<AuthResponse, { id: string; otp: string }, { rejectValue: string }>(
    "auth/verifyOtp",
    async (otpData, { rejectWithValue }) => {
        try {
            const response = await guestApi.post("/auth/verify-otp", otpData);
            return response.data;
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
            return response.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
)

export const forgotPassword = createAsyncThunk<{ message: string }, { email: string }, { rejectValue: string }>(
    "auth/forgotPassword",
    async ({ email }, { rejectWithValue }) => {
        try {
            return await forgotPasswordAPI(email);
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error));
        }
    }
);

export const changePassword = createAsyncThunk<{ message: string }, { password: string; token: string }, { rejectValue: string }>(
    "auth/changePassword",
    async ({ password, token }, { rejectWithValue }) => {
        try {
            return await changePasswordAPI(password, token);
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
            state.user = null;
            state.refreshToken = null;
            state.accessToken = null;
            state.loading = false;
            state.isTokenExpired = false;
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
        changeTokenExpiry: (state: AuthState, action: PayloadAction<boolean>) => {
            state.isTokenExpired = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Verify OTP Reducers
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.isTokenExpired = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Reset email failed";
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Reset email failed";
            })

    },
});

// ✅ Export Actions & Selectors
export const { logout, setUser, updateUser, setTokens, changeTokenExpiry } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;