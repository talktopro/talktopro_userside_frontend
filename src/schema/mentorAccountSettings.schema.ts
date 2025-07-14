import { z } from "zod";

export const createMentorAccountFormSchema = (fromRegisterPage: boolean) =>
  z.object({
    // Personal Information
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    phone: z
      .string()
      .regex(/^\+?[0-9\s\-().]{6,20}$/, "Enter a valid phone number."),
    dateOfBirth: z.string().min(4, "Date of Birth is required."),
    gender: z.enum(["Male", "Female"], {
      errorMap: () => ({ message: "Gender must be selected." }),
    }),
    location: z
      .string()
      .max(100, "Location must not exceed 100 characters."),

    // Professional Information
    profession: z.string().nonempty("Profession is required."),
    about: z
      .string()
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
        z.object({
          jobTitle: z.string().min(2, "Job title is required."),
          companyName: z.string().min(2, "Company name is required."),
          startDate: z
            .string()
            .regex(
              /^(0[1-9]|1[0-2])\/\d{4}$/,
              "Start date must be in MM/YYYY format."
            ),
          endDate: z
            .string()
            .regex(
              /^(0[1-9]|1[0-2])\/\d{4}$/,
              "End date must be in MM/YYYY format."
            ),
        })
      )
      .min(1, "At least one work experience entry is required."),

    // Education
    highestDegree: z.string().min(2, "Highest degree is required."),
    instituteName: z.string().min(2, "Institute name is required."),
    startYear: z.string().regex(/^\d{4}$/, "Start year must be 4 digits."),
    endYear: z.string().regex(/^\d{4}$/, "End year must be 4 digits."),

    // Skills and Language Terms and Policies
    skills: z.array(z.string()).min(1, "At least one skill is required."),
    languages: z.array(z.string()).min(1, "At least one language is required."),
    termsAndConditions: fromRegisterPage
      ? z.literal(true, {
        errorMap: () => ({
          message: "You must agree to the Terms and Conditions",
        }),
      })
      : z.boolean(),
    privacyAndPolicy: fromRegisterPage
      ? z.literal(true, {
        errorMap: () => ({ message: "You must agree to the Privacy Policy" }),
      })
      : z.boolean(),
  });

export type IMentorAccountFormType = z.infer<
  ReturnType<typeof createMentorAccountFormSchema>
>;
