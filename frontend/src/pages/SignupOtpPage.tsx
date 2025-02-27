import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, verifyOtp } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { ROUTES } from "@/routes/routes";
import { toast } from "sonner";

const FormSchema = z.object({
    pin: z
        .string()
        .length(6, "Your one-time password must be 6 digits.")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

const SignupOtpPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, id } = useSelector(selectAuth);
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email") || "";

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });

    const [timer, setTimer] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendDisabled(false);
        }
    }, [timer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (!id) {
            toast.error("User ID is missing. Please try signing up again.");
            return;
        }

        try {
            const result = await dispatch(verifyOtp({ id, otp: data.pin })).unwrap();
            console.log(result);
            navigate(ROUTES.HOME);
            // if (result.accessToken) {
            // }
        } catch (err: unknown) {
            toast.error(err as string);
        }
    };

    const handleResend = async () => {
        // TODO: Add API call to resend OTP here
        toast.info("A new OTP has been sent to your email.");

        setTimer(120);
        setIsResendDisabled(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-card text-card-foreground">
                <h2 className="text-xl font-semibold text-primary text-center mb-4">
                    Enter OTP
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                    Please enter the 6-digit code sent to your email <span className="font-medium">{email}</span>.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="text-primary-foreground">
                                        One-Time Password
                                    </FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            value={field.value}
                                            onChange={(value) => field.onChange(value)}
                                            className="justify-center"
                                        >
                                            <InputOTPGroup>
                                                {[...Array(6)].map((_, index) => (
                                                    <InputOTPSlot key={index} index={index} className="border-border text-foreground" />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            {loading ? "Verifying..." : "Verify OTP"}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Didn’t receive the code?{" "}
                            <button
                                type="button"
                                className="text-primary hover:underline"
                                onClick={handleResend}
                                disabled={isResendDisabled}
                            >
                                {isResendDisabled ? `Resend OTP in ${formatTime(timer)}` : "Resend OTP"}
                            </button>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignupOtpPage;
