import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginUserAPI, resetEmailAPI, verifyOtpAPI } from "@/api/authService";
import { extractErrorMessage } from "@/utils/errorHandler";

interface AuthState {
    id: string | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    id: null,
    accessToken: null,
    loading: false,
    error: null,
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

export const loginUser = createAsyncThunk<{ id: string; accessToken: string }, { email: string; password: string }, { rejectValue: string }>(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            return await loginUserAPI(userData);
        } catch (error) {
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
            state.error = null;
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
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<{ id: string; accessToken: string }>) => {
                console.log("ppppp", action.payload);
                console.log("ppppp", action.payload);

                state.loading = false;
                state.id = action.payload.id;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "OTP verification failed";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ id: string; accessToken: string }>) => {
                state.loading = false;
                state.id = action.payload.id;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
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