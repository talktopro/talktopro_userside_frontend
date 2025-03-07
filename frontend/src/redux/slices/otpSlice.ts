import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { resendOtpAPI } from "@/api/authService";
import { handleApiError } from "@/utils/errorHandler";
import { toast } from "sonner";

interface OtpState {
    timer: number;
    isDisabled: boolean;
}

const initialState: OtpState = {
    timer: 120,
    isDisabled: false,
};

export const resendOtpUser = createAsyncThunk<void, { id: string; email: string }, { rejectValue: string }>(
    "otp/resendOtp",
    async (otpData, { rejectWithValue, dispatch }) => {
        try {
            await resendOtpAPI(otpData);
            dispatch(restartTimer(120));
            toast.success("OTP Resent Successfully");
        } catch (error) {
            toast.error("Failed to Resend OTP");
            return rejectWithValue(handleApiError(error));
        }
    }
);

const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {
        restartTimer: (state, action: PayloadAction<number>) => {
            state.timer = action.payload;
            state.isDisabled = true;
        },
        decrementTimer: (state) => {
            if (state.timer > 0) {
                state.timer--;
            } else {
                state.isDisabled = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resendOtpUser.pending, () => {
        });
    },
});

export const { restartTimer, decrementTimer } = otpSlice.actions;
export const selectOtp = (state: RootState) => state.otp;
export default otpSlice.reducer;
