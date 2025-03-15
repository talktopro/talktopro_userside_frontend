import { useCallback, useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthImageSection from "@/components/AuthImageSection";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import apiClient from "@/api/axiosInstance";
import { AxiosError } from "axios";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const countryCodes = [
    { code: "+91", country: "India" },
    // { code: "+1", country: "USA" },
    // { code: "+44", country: "UK" },
    // { code: "+81", country: "Japan" },
];

const formSchema = z
    .object({
        uname: z.string().min(4, "Username must be at least 4 characters long."),
        email: z.string().email("Please enter a valid email address."),
        countryCode: z.string().nonempty("Country code is required."),
        phone: z.string().regex(/^\d{10,15}$/, "Enter a valid phone number."),
        pwd: z.string().min(6, "Password must be at least 6 characters long."),
        confirm_pwd: z.string(),
    })
    .refine((data) => data.pwd === data.confirm_pwd, {
        message: "Passwords do not match.",
        path: ["confirm_pwd"],
    });

const SignupPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uname: "",
            email: "",
            countryCode: "+91",
            phone: "",
            pwd: "",
            confirm_pwd: "",
        },
    });

    const submitFn = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            setLoading(true);
            try {
                const { countryCode, ...payload } = values;
                const { data } = await apiClient.post("/auth", payload);

                navigate(ROUTES.AUTH.SIGNUP_OTP_VERIFY, {
                    state: { email: data.email, id: data.id },
                });
            } catch (error: unknown) {
                console.error("Authentication error:", error);
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.errors?.[0]?.message ||
                        error.response?.data?.message ||
                        "An unknown error occurred!";

                    toast.error(errorMessage);
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        },
        [navigate]
    );


    return (
        <div className="min-h-screen flex bg-blue-white">
            {/* Left Side */}
            <AuthImageSection />

            {/* Right Side */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <img src={logo} alt="Talk to Pro logo" className="size-12 mb-4" />
                    <h2 className="text-2xl font-semibold mb-6">
                        Sign up for <span className="text-primary">Talk to Pro</span>
                    </h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitFn)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="uname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter your uname" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter your email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Country Code & Phone Number */}
                            <div className="flex gap-2">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    {/* Country Code Dropdown */}
                                                    <select
                                                        className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                                                    >
                                                        {countryCodes.map(({ code }) => (
                                                            <option key={code} value={code}>{code}</option>
                                                        ))}
                                                    </select>

                                                    {/* Mobile Number Input */}
                                                    <Input type="text" className="flex-1" placeholder="Enter your phone number" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <FormField
                                control={form.control}
                                name="pwd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm_pwd"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="Confirm your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full mt-1" disabled={loading}>
                                {loading ? "Signing up..." : "Sign Up"}
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center text-sm mt-1">
                        Already have an account? <Link className="font-semibold" to={ROUTES.AUTH.LOGIN}>Login here</Link>
                    </p>
                    <div className="flex flex-col text-center items-center justify-center">
                        <div className="my-1 text-center font-medium text-sm text-foreground/50">Or</div>
                        <GoogleLoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
