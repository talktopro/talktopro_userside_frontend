import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changePassword } from "@/redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/svg/logo.svg";

const changePasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long"),
});

const ChangePasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  useEffect(() => {
    const tokenFromUrl = location.pathname.split("/")[2];
    setToken(tokenFromUrl);
  }, [location.pathname]);

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    if (!token) {
      toast.error("Invalid reset token.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const result = await dispatch(
        changePassword({ password: values.password, token })
      ).unwrap();
      if (result) {
        toast.success("Password changed successfully.");
        navigate("/login");
      }
    } catch (error: unknown) {
      toast.error(error as string);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center">
            <img src={logo} alt="Talk to Pro logo" className="size-12" />
          </div>

          <h1 className="text-2xl font-semibold">Change Password</h1>
          <p className="text-sm text-gray-500">
            Enter a new password below to reset your account security.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="New Password"
              type="password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="confirm-password"
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !password || !confirmPassword}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
