import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import img from "../../assets/auth-image.png";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import guestApi from "@/api/guestApi";
import { ILoginResponse } from "@/interfaces/admin";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import axios from "axios";
import { adminLogin } from "@/redux/slices/adminSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter your valid email address.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
});

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const loginReponse: ILoginResponse = await guestApi.post(
        `/admin/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      dispatch(adminLogin());
      console.log("login response is", loginReponse);
      toast.success("Logged in successfully");
      navigate(ROUTES.ADMIN.DASHBOARD);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors?.[0]) {
          toast.error(error.response.data.errors[0]);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-semibold">Welcome</h1>
              <p className="text-balance text-sm text-muted-foreground">
                Login to Admin Dashboard
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="grid gap-3 mt-7"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src={img}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AdminLoginPage;
