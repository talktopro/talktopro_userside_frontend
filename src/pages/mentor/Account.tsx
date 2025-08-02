import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { MentorAccountProgressBar } from "@/components/mentor/Account/ProgressBar";
import { PersonalInformation } from "@/components/mentor/Account/PersonalInformation";
import { ProfessionalInformation } from "@/components/mentor/Account/ProfessionalInformation";
import { EducationInformation } from "@/components/mentor/Account/EducationInformation";
import { SkillsAndLanguages } from "@/components/mentor/Account/SkillsAndLanguages";
import { FinalCheck } from "@/components/mentor/Account/FinalCheck";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { TermsAndDiscovery } from "@/components/mentor/Account/TermsAndDiscovery";

const mentorFormSchema = z.object({
  personalInfo: z.object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().trim().email({ message: "Please enter a valid email." }),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^[+]?\d{6,20}$/, { message: "Enter a valid phone number." }),
    dateOfBirth: z
      .string()
      .refine(
        (val) => {
          const parsed = new Date(val);
          return !isNaN(parsed.getTime());
        },
        {
          message: "Please enter a valid date.",
        }
      )
      .transform((val) => new Date(val))
      .refine((date) => date <= new Date(), {
        message: "Date of birth cannot be in the future.",
      }),
    gender: z.enum(["male", "female"], {
      required_error: "Please select your gender.",
    }),
    location: z
      .string()
      .trim()
      .min(2, { message: "Location must be at least 2 characters." }),
  }),

  professionalInfo: z.object({
    profession: z
      .string()
      .trim()
      .nonempty({ message: "Profession is required." }),
    about: z
      .string()
      .trim()
      .min(50, {
        message: "About section must be at least 50 characters.",
      })
      .max(500, {
        message: "About section cannot exceed 500 characters.",
      }),
    experience: z
      .number({
        invalid_type_error: "Experience must be a number.",
      })
      .min(3, { message: "Minimum experience should be 3 years." })
      .max(50, { message: "Experience cannot exceed 50 years." })
      .refine(
        (val) => {
          const decimal = val.toString().split(".")[1];
          return !decimal || decimal.length <= 1;
        },
        {
          message: "Experience can have at most one digit after the decimal.",
        }
      ),
    workExperience: z
      .array(
        z
          .object({
            jobTitle: z.string().min(2, {
              message: "Job title must be at least 2 characters.",
            }),
            companyName: z.string().min(2, {
              message: "Company name must be at least 2 characters.",
            }),
            startDate: z
              .string()
              .refine((val) => !isNaN(new Date(val).getTime()), {
                message: "Please enter a valid start date.",
              })
              .transform((val) => new Date(val)),
            endDate: z
              .union([
                z
                  .string()
                  .refine((val) => !isNaN(new Date(val).getTime()), {
                    message: "Please enter a valid end date.",
                  })
                  .transform((val) => new Date(val)),
                z.literal("Present"),
                z.null(),
                z.undefined(),
              ])
              .optional(),
            currentlyWorking: z.boolean().optional(),
          })
          .refine(
            (data) => {
              if (data.currentlyWorking) return true;
              if (!data.endDate || data.endDate === "Present") return true;

              const end = new Date(data.endDate as Date);
              const start = new Date(data.startDate);

              return end > start;
            },
            {
              message: "End date must be after the start date.",
              path: ["endDate"],
            }
          )
      )
      .min(1, { message: "Please add at least one work experience." }),
  }),

  education: z
    .object({
      highestDegree: z
        .string()
        .min(2, { message: "Please enter your highest degree." }),
      instituteName: z
        .string()
        .min(2, { message: "Please enter the institute name." }),
      startYear: z.string().regex(/^\d{4}$/, {
        message: "Start year must be a 4-digit number.",
      }),
      endYear: z.string().regex(/^\d{4}$/, {
        message: "End year must be a 4-digit number.",
      }),
    })
    .refine((data) => parseInt(data.endYear) >= parseInt(data.startYear), {
      path: ["endYear"],
      message: "End year cannot be earlier than start year.",
    }),

  languages: z.object({
    skills: z
      .array(z.string())
      .min(1, { message: "Please add at least one skill." }),
    languages: z
      .array(z.string())
      .min(1, { message: "Please select at least one language." }),
  }),
  termsAndDiscovery: z.object({
    termsAndConditions: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
    privacyPolicy: z.boolean().refine((val) => val === true, {
      message: "You must accept the privacy policy.",
    }),
    foundUs: z.string().min(2, { message: "Please select how you found us." }),
  }),
});

export type MentorFormData = z.infer<typeof mentorFormSchema>;

const STEP_LABELS = [
  "Personal Information",
  "Professional Information",
  "Education",
  "Skills & Languages",
  "Terms & Discovery",
  "Review & Submit",
];

export const MentorAccount: React.FC = () => {
  const { user } = useSelector(selectAuth);

  const [uploadedImage, setUploadedImage] = useState<string | null>(
    (user && user.profileImg) || null
  );
  const [imageError, setImageError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(2);

  const form = useForm<MentorFormData>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      personalInfo: {
        fullName: user?.uname,
        email: user?.email,
        phoneNumber: user?.phone.toString(),
        dateOfBirth: undefined,
        gender: undefined,
        location: user?.mentorDetails?.location || "",
      },
      professionalInfo: {
        profession: user?.mentorDetails?.profession || "",
        about: user?.mentorDetails?.about || "",
        experience: user?.mentorDetails?.experience || undefined,
        workExperience: [
          {
            jobTitle: "",
            companyName: "",
            startDate: undefined,
            endDate: undefined,
            currentlyWorking: false,
          },
        ],
      },
      education: {
        highestDegree: "",
        instituteName: "",
        startYear: "",
        endYear: "",
      },
      languages: {
        skills: user?.mentorDetails?.skills || [],
        languages: user?.mentorDetails?.languages || [],
      },
      termsAndDiscovery: {
        termsAndConditions: false,
        privacyPolicy: false,
        foundUs: "",
      },
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  if (!user) return null;
  const { trigger, getValues } = form;

  const validateCurrentStep = async (): Promise<boolean> => {
    const stepFields: Record<number, (keyof MentorFormData)[]> = {
      1: ["personalInfo"],
      2: ["professionalInfo"],
      3: ["education"],
      4: ["languages"],
      5: ["termsAndDiscovery"],
    };

    return await trigger(stepFields[currentStep] || []);
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (currentStep === 1 && !uploadedImage) {
      setImageError("Please upload your profile image.");
    }

    if (isValid && currentStep < STEP_LABELS.length) {
      setImageError(null);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const formData = getValues();
      console.log("Form submitted:", formData);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformation
            form={form}
            user={user}
            imageError={imageError}
            setImageError={setImageError}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        );
      case 2:
        return <ProfessionalInformation form={form} />;
      case 3:
        return <EducationInformation form={form} />;
      case 4:
        return <SkillsAndLanguages form={form} />;
      case 5:
        return <TermsAndDiscovery form={form} />;
      case 6:
        return <FinalCheck form={form} user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <MentorAccountProgressBar
          currentStep={currentStep}
          totalSteps={STEP_LABELS.length}
          stepLabels={STEP_LABELS}
        />

        <Card className="border-none shadow-none">
          <CardContent className="p-4">
            {renderCurrentStep()}

            <div className="w-full mx-auto border-t mt-10 pt-8">
              <div className="flex justify-end w-full items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  hidden={currentStep === 1}
                  className="flex items-center gap-2 border min-w-28"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                {currentStep < STEP_LABELS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-primary min-w-28"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-8"
                  >
                    Submit Registration
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
