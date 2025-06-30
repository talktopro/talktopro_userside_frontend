import { useCallback, useState } from "react";
import logo from "@/assets/svg/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthImageSection from "@/components/user/AuthImageSection";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import apiClient from "@/api/axiosInstance";
import { AxiosError } from "axios";
import GoogleLoginButton from "@/components/user/GoogleLoginButton";

const formSchema = z
  .object({
    uname: z.string().min(4, "Username must be at least 4 characters long."),
    email: z.string().email("Please enter a valid email address."),
    countryCode: z.string().nonempty("Country code is required."),
    phone: z.string().regex(/^\+?[0-9\s\-().]{6,20}$/, "Enter a valid phone number."),
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
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.errors[0]);
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
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                      />
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
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
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
                          {/* Mobile Number Input */}
                          <Input
                            type="text"
                            className="flex-1"
                            placeholder="Enter your phone number"
                            {...field}
                          />
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
                      <PasswordInput
                        placeholder="Enter your password"
                        {...field}
                      />
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
                      <PasswordInput
                        placeholder="Confirm your password"
                        {...field}
                      />
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
            Already have an account?{" "}
            <Link
              className="font-semibold hover:underline"
              to={ROUTES.AUTH.LOGIN}
            >
              Login
            </Link>{" "}
            here
          </p>
          <p className="mt-1 mb-2 text-center font-medium text-sm text-foreground/50">
            or
          </p>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
