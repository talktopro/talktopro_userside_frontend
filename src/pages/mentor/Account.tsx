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
import { SkillsAndLanguageTerms } from "@/components/mentor/Account/SkillsLang";
import { FinalCheck } from "@/components/mentor/Account/FinalCheck";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";

const mentorFormSchema = z.object({
  personalInfo: z.object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters"),
    email: z.string().trim().readonly(),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s\-().]{6,20}$/, "Enter a valid phone number."),
    dateOfBirth: z
      .string()
      .transform((val) => new Date(val))
      .pipe(
        z
          .date()
          .max(new Date(), "Date of birth cannot be in the future")
          .min(
            new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
            "This date is not acceptable."
          )
      ),
    gender: z.enum(["male", "female"], {
      required_error: "Please select your gender",
    }),
    location: z
      .string()
      .trim()
      .min(2, "Location must be at least 2 characters"),
  }),
  professionalInfo: z.object({
    profession: z.string().trim().nonempty("Profession is required."),
    about: z
      .string()
      .trim()
      .min(50, "About section must need minimum 50 characters.")
      .max(500, "About section must not exceed 500 characters."),
    experience: z
      .number()
      .min(3, "Experience must be at least 3 years.")
      .max(50, "Experience must not exceed 50 years.")
      .refine(
        (val) => {
          const decimalPart = val.toString().split(".")[1];
          return !decimalPart || decimalPart.length <= 1;
        },
        {
          message: "Experience can have at most one digit after the decimal.",
        }
      ),
    workExperience: z
      .array(
        z
          .object({
            jobTitle: z.string().trim().min(2, "Job title is required"),
            companyName: z.string().trim().min(2, "Company name is required"),
            startDate: z
              .string()
              .transform((val) => new Date(val))
              .pipe(
                z
                  .date()
                  .min(
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 100)
                    ),
                    "This date is not acceptable."
                  )
              ),
            endDate: z
              .union([
                z
                  .string()
                  .transform((val) => new Date(val))
                  .pipe(
                    z
                      .date()
                      .min(
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() - 100)
                        ),
                        "This date is not acceptable."
                      )
                  ),
                z.literal("Present"),
              ])
              .optional(),
            currentlyWorking: z.boolean().optional(),
          })
          .refine(
            (data) => {
              if (data.currentlyWorking) return true;
              if (
                !data.startDate ||
                !data.endDate ||
                data.endDate === "Present"
              )
                return false;
              return new Date(data.endDate) > new Date(data.startDate);
            },
            {
              message: "End date must be after start date.",
              path: ["endDate"],
            }
          )
      )
      .min(1, "At least one work experience is required"),
  }),
  education: z
    .object({
      highestDegree: z.string().trim().min(2, "Highest degree is required"),
      instituteName: z.string().trim().min(2, "Institute name is required"),
      startYear: z
        .string()
        .trim()
        .regex(/^\d{4}$/, "Please enter a valid year (YYYY)"),
      endYear: z
        .string()
        .trim()
        .regex(/^\d{4}$/, "Please enter a valid year (YYYY)"),
    })
    .refine(
      (data) => {
        const start = parseInt(data.startYear);
        const end = parseInt(data.endYear);
        return !isNaN(start) && !isNaN(end) && end >= start;
      },
      {
        path: ["endYear"],
        message: "End year cannot be earlier than start year",
      }
    ),
  skillsAndTerms: z.object({
    skills: z.array(z.string().trim()).min(1, "At least one skill is required"),
    languages: z
      .array(z.string().trim())
      .min(1, "At least one language is required"),
    termsAndConditions: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
    privacyPolicy: z
      .boolean()
      .refine((val) => val === true, "You must accept the privacy policy"),
  }),
});

export type MentorFormData = z.infer<typeof mentorFormSchema>;

const STEP_LABELS = [
  "Personal Information",
  "Professional Information",
  "Education",
  "Skills, Language & Terms",
  "Review & Submit",
];

export const MentorAccount: React.FC = () => {
  const { user } = useSelector(selectAuth);
  if (!user) return;

  const [currentStep, setCurrentStep] = useState(4);

  const form = useForm<MentorFormData>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      personalInfo: {
        fullName: user.uname,
        email: user.email,
        phoneNumber: user.phone.toString() || undefined,
        dateOfBirth: undefined,
        gender: undefined,
        location: user.mentorDetails?.location || "",
      },
      professionalInfo: {
        profession: user.mentorDetails?.profession || "",
        about: user.mentorDetails?.about || "",
        experience: user.mentorDetails?.experience || undefined,
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
      skillsAndTerms: {
        skills: user.mentorDetails?.skills || [],
        languages: user.mentorDetails?.languages || [],
        termsAndConditions: false,
        privacyPolicy: false,
      },
    },
    mode: "onChange",
    criteriaMode: "all",
  });

  const { trigger, getValues } = form;

  const validateCurrentStep = async (): Promise<boolean> => {
    let fieldsToValidate: (keyof MentorFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["personalInfo"];
        break;
      case 2:
        fieldsToValidate = ["professionalInfo"];
        break;
      case 3:
        fieldsToValidate = ["education"];
        break;
      case 4:
        fieldsToValidate = ["skillsAndTerms"];
        break;
      case 5:
        fieldsToValidate = ["skillsAndTerms"];
        break;
      default:
        return true;
    }

    return await trigger(fieldsToValidate);
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
        return <PersonalInformation form={form} user={user} />;
      case 2:
        return <ProfessionalInformation form={form} />;
      case 3:
        return <EducationInformation form={form} />;
      case 4:
        return <SkillsAndLanguageTerms form={form} />;
      case 5:
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
