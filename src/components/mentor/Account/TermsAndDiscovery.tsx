import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MentorFormData } from "@/pages/mentor/Account";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface TermsAndDiscoveryProps {
  form: UseFormReturn<MentorFormData>;
}

export const TermsAndDiscovery: React.FC<TermsAndDiscoveryProps> = ({
  form,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  const [openModal, setOpenModal] = useState<"terms" | "privacy" | null>(null);

  const foundUs = watch("termsAndDiscovery.foundUs");

  return (
    <div className="space-y-6 pt-6 border-border">
      <h2 className="text-xl font-semibold text-foreground">
        Terms and Conditions
      </h2>

      {/* Terms & Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="termsAndConditions"
            checked={watch("termsAndDiscovery.termsAndConditions")}
            onCheckedChange={(checked) =>
              setValue(
                "termsAndDiscovery.termsAndConditions",
                checked as boolean
              )
            }
            className={
              errors.termsAndDiscovery?.termsAndConditions
                ? "border-red-500 mt-1"
                : "mt-1"
            }
          />

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Label
                htmlFor="termsAndConditions"
                className="text-sm font-medium"
              >
                I accept the Terms and Conditions *
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              By checking this, you agree to our{" "}
              <button
                type="button"
                onClick={() => setOpenModal("terms")}
                className="text-primary hover:underline underline-offset-2"
              >
                Terms of Service
              </button>{" "}
              and understand your responsibilities as a mentor on our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="privacyPolicy"
            checked={watch("termsAndDiscovery.privacyPolicy")}
            onCheckedChange={(checked) =>
              setValue("termsAndDiscovery.privacyPolicy", checked as boolean)
            }
            className={
              errors.termsAndDiscovery?.privacyPolicy
                ? "border-red-500 mt-1"
                : "mt-1"
            }
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Label htmlFor="privacyPolicy" className="text-sm font-medium">
                I accept the Privacy Policy *
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              By checking this, you acknowledge that you have read and agree to
              our{" "}
              <button
                type="button"
                onClick={() => setOpenModal("privacy")}
                className="text-primary hover:underline underline-offset-2"
              >
                Privacy Policy
              </button>{" "}
              regarding how we collect, use, and protect your personal
              information.
            </p>
          </div>
        </div>
        {errors.termsAndDiscovery?.privacyPolicy && (
          <p className="text-sm text-red-500 ml-6">
            {errors.termsAndDiscovery.privacyPolicy.message}
          </p>
        )}
      </div>

      <h2 className="text-xl font-semibold text-foreground pt-6 border-t border-border">
        Discovery
      </h2>

      {/* Where did you find us */}
      <div className="space-y-1">
        <Label htmlFor="foundUs">Where did you find us?</Label>
        <div className="space-y-1 mt-4">
          <Select
            onValueChange={(value) =>
              setValue("termsAndDiscovery.foundUs", value, {
                shouldValidate: true,
              })
            }
            defaultValue={foundUs}
          >
            <SelectTrigger
              id="foundUs"
              className={`w-80 ${
                errors.termsAndDiscovery?.foundUs ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="x">X (formerly Twitter)</SelectItem>
              <SelectItem value="friend">Referral from a friend</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {errors.termsAndDiscovery?.foundUs && (
            <p className="text-sm text-red-500">
              {errors.termsAndDiscovery.foundUs.message}
            </p>
          )}
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {openModal === "terms" ? "Terms of Service" : "Privacy Policy"}
              </h2>
              <button
                onClick={() => setOpenModal(null)}
                className="text-gray-500 hover:text-black text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="text-sm text-gray-700 space-y-4">
              {openModal === "terms" ? (
                <>
                  <p>Effective Date: July 1, 2025</p>
                  <p>
                    These Terms of Service ("Terms") govern your use of our
                    platform as a mentor...
                    {/* Add your full terms here or load from a constants file */}
                  </p>
                </>
              ) : (
                <>
                  <p>Effective Date: July 1, 2025</p>
                  <p>
                    Our Privacy Policy explains how we collect, use, and protect
                    your personal data...
                    {/* Add your full policy here or load from a constants file */}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
