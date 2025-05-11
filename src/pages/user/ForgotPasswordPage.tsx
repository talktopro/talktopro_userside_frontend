import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import logo from "@/assets/svg/logo.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { toast } from "sonner";
import { forgotPassword } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [emailSent, setEmailSent] = useState(false);

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

  const onSubmit = useCallback(
    async (values: z.infer<typeof forgotPasswordSchema>) => {
      try {
        const result = await dispatch(forgotPassword(values)).unwrap();
        if (result) {
          setEmailSent(true);
          toast.success("Reset email sent successfully");
        }
      } catch (error: unknown) {
        toast.error(error as string);
      }
    },
    [dispatch]
  );

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center">
            <img src={logo} alt="Talk to Pro logo" className="size-12" />
          </div>
          <h1 className="text-2xl font-semibold">
            {emailSent ? "Check your email" : "Forgot password?"}
          </h1>
          <p className="text-sm text-gray-500">
            {emailSent
              ? "We’ve sent you an email with a link to reset your password. Please check your inbox and follow the instructions."
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>

        {emailSent ? (
          <div className="bg-muted/50 rounded-lg p-4">
          <MailCheck strokeWidth={1.5} className="text-purple-500 mx-auto mb-3" />
          <p className="text-sm">
            Didn’t receive the email? Check your spam or{" "}
            <span
              onClick={() => setEmailSent(false)}
              className="text-purple-500 hover:underline cursor-pointer hover:text-purple-600 font-semibold"
            >
              try again
            </span>
            .
          </p>
        </div>
        ) : (
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
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </Button>

            <Link
              to={ROUTES.AUTH.LOGIN}
              className="flex items-center cursor-pointer gap-2 text-sm hover:text-gray-800 transition absolute top-10 left-10 border rounded-xl px-3 py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
