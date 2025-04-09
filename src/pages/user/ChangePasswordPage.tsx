import React from "react";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.svg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChangePasswordPage: React.FC = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-[#7C3AED] flex items-center justify-center">
            <img src={logo} alt="Talk to Pro logo" className="size-8" />
          </div>

          <h1 className="text-2xl font-semibold">Change Password</h1>
          <p className="text-sm text-gray-500">
            Enter a new password below to reset your account security.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="new-password"
              placeholder="New Password"
              type="password"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              id="confirm-password"
              placeholder="Confirm Password"
              type="password"
              required
            />
          </div>

          <Button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]">
            Change Password
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

export default ChangePasswordPage;
