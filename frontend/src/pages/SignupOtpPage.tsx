import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { toast } from "@/hooks/use-toast";
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

const FormSchema = z.object({
    pin: z.string().min(4, {
        message: "Your one-time password must be 4 digits.",
    }),
});

const SignupOtpPage = () => {
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

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-full rounded-md bg-background text-foreground p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    function handleResend() {
        setTimer(120);
        setIsResendDisabled(true);
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-card text-card-foreground">
                <h2 className="text-xl font-semibold text-primary text-center mb-4">
                    Enter OTP
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                    Please enter the 6-digit code sent to your email.
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
                                            maxLength={4}
                                            {...field}
                                            className="justify-center"
                                        >
                                            <InputOTPGroup>
                                                {[...Array(4)].map((_, index) => (
                                                    <InputOTPSlot key={index} index={index} className="border-border text-foreground" />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Verify OTP
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Didn’t receive the code? {" "}
                            <button
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
}

export default SignupOtpPage;