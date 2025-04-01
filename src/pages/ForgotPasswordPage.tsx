import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import logo from "../assets/logo.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { toast } from "sonner";
import { resetEmail } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailValue = watch("email", "");

  const onSubmit = useCallback(async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const result = await dispatch(resetEmail(values)).unwrap();
      if (result) {
        console.log(result);
        toast.success("Reset email sent successfully");
      }
    } catch (error: unknown) {
      toast.error(error as string);
    }
  }, [dispatch]);
  
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-[#7C3AED] flex items-center justify-center">
            <img src={logo} alt="Talk to Pro logo" className="size-8" />
          </div>

          <h1 className="text-2xl font-semibold">Forgot password?</h1>
          <p className="text-sm text-gray-500">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!emailValue || isSubmitting}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
          </Button>

          <Link
            to={ROUTES.AUTH.LOGIN}
            className="flex items-center cursor-pointer gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
