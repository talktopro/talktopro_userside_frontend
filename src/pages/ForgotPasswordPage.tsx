import React from "react";
import { ArrowLeft } from "lucide-react";
import logo from "../assets/logo.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPasswordPage: React.FC = () => {
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
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>
          <Button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]">
            Verify email
          </Button>
          <a
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
