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
import { Eye, EyeOff } from "lucide-react";
import AuthImageSection from "@/components/user/AuthImageSection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import GoogleLoginButton from "@/components/user/GoogleLoginButton";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitFn = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        // toast.success(result.message || "Logged in successfully");
        navigate(ROUTES.HOME);
      } catch (error: unknown) {
        toast.error(error as string);
        // toast.error("Invalid email or password. Please try again.");
      }
    },
    [dispatch]
  );

  return (
    <div className="min-h-screen flex bg-blue-white">
      {/* Left side */}
      <AuthImageSection />

      {/* Right side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <img src={logo} alt="Talk to pro logo" className="size-12 mb-4" />
          <h2 className="text-2xl font-semibold mb-6">
            Log in to <span className="text-primary">Talk to pro</span>
          </h2>

          <div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submitFn)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="mt-2"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="mt-2 pr-8"
                              placeholder="Enter your password"
                              {...field}
                            />
                            <button
                              onClick={() => setShowPassword((prev) => !prev)}
                              type="button"
                              className="absolute right-1 top-1/2 transform -translate-1/2"
                            >
                              {!showPassword ? (
                                <Eye className="size-5 text-foreground/50" />
                              ) : (
                                <EyeOff className="size-5 text-foreground/50" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        <div className="mt-2 text-right">
                          <Link
                            to={ROUTES.AUTH.FORGOT_PASSWORD}
                            className="text-sm hover:underline"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full hover:cursor-pointer">
                    Log in
                  </Button>
                </form>
              </Form>
            </div>
            <p className="w-full text-center text-sm mt-1">
              Don&apos;t have an account?{" "}
              <Link
                className="font-semibold hover:underline"
                to={ROUTES.AUTH.SIGNUP}
              >
                Signup
              </Link>{" "}
              now
            </p>
            <p className="mb-3 mt-1 text-center font-medium text-sm text-foreground/50">
              or
            </p>
            <GoogleLoginButton />
            {/* <div className="flex flex-col items-center justify-center text-center">
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
