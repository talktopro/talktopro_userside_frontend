import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MentorAccountProgressBar } from '@/components/mentor/Account/ProgressBar';
import { PersonalInformation } from '@/components/mentor/Account/PersonalInformation';
import { ProfessionalInformation } from '@/components/mentor/Account/ProfessionalInformation';
import { EducationInformation } from '@/components/mentor/Account/EducationInformation';
import { SkillsAndLanguageTerms } from '@/components/mentor/Account/SkillsLang';
import { FinalCheck } from '@/components/mentor/Account/FinalCheck';

const mentorFormSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phoneNumber: z.string().regex(/^\+91\s\d{10}$/, 'Please enter a valid Indian phone number (+91 XXXXXXXXXX)'),
    dateOfBirth: z.date({
      required_error: 'Date of birth is required',
    }),
    gender: z.enum(['male', 'female'], {
      required_error: 'Please select your gender',
    }),
    location: z.string().min(2, 'Location must be at least 2 characters'),
  }),
  professionalInfo: z.object({
    profession: z.string().min(2, 'Profession must be at least 2 characters'),
    about: z.string().min(50, 'About section must be at least 50 characters').max(500, 'About section must not exceed 500 characters'),
    yearsOfExperience: z.number().min(0, 'Experience cannot be negative').max(50, 'Experience cannot exceed 50 years'),
    workExperience: z.array(z.object({
      jobTitle: z.string().min(2, 'Job title is required'),
      companyName: z.string().min(2, 'Company name is required'),
      startDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Please use MM/YYYY format'),
      endDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Please use MM/YYYY format'),
    })).min(1, 'At least one work experience is required'),
  }),
  education: z.object({
    highestDegree: z.string().min(2, 'Highest degree is required'),
    instituteName: z.string().min(2, 'Institute name is required'),
    startYear: z.string().regex(/^\d{4}$/, 'Please enter a valid year (YYYY)'),
    endYear: z.string().regex(/^\d{4}$/, 'Please enter a valid year (YYYY)'),
  }),
  skillsAndTerms: z.object({
    skills: z.array(z.string()).min(1, 'At least one skill is required'),
    languages: z.array(z.string()).min(1, 'At least one language is required'),
    termsAndConditions: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
    privacyPolicy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
  }),
});

export type MentorFormData = z.infer<typeof mentorFormSchema>;

const STEP_LABELS = [
  'Personal Information',
  'Profile image',
  'Professional Information',
  'Education',
  'Skills & Language',
  'Terms & Condition',
  'Review & Submit'
];

export const MentorAccount: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<MentorFormData>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      personalInfo: {
        email: 'mentor@example.com',
        fullName: '',
        phoneNumber: '',
        dateOfBirth: undefined,
        gender: undefined,
        location: '',
      },
      professionalInfo: {
        profession: '',
        about: '',
        yearsOfExperience: 0,
        workExperience: [{
          jobTitle: '',
          companyName: '',
          startDate: '',
          endDate: '',
        }],
      },
      education: {
        highestDegree: '',
        instituteName: '',
        startYear: '',
        endYear: '',
      },
      skillsAndTerms: {
        skills: [],
        languages: [],
        termsAndConditions: false,
        privacyPolicy: false,
      },
    },
  });

  const { trigger, getValues } = form;

  // Validate current step before proceeding
  const validateCurrentStep = async (): Promise<boolean> => {
    let fieldsToValidate: (keyof MentorFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['personalInfo'];
        break;
      case 2:
        fieldsToValidate = ['professionalInfo'];
        break;
      case 3:
        fieldsToValidate = ['education'];
        break;
      case 4:
        fieldsToValidate = ['skillsAndTerms'];
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
      console.log('Form submitted:', formData);

      // Here you would typically send the data to your backend
      // await submitMentorRegistration(formData);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformation form={form} />;
      case 2:
        return <ProfessionalInformation form={form} />;
      case 3:
        return <EducationInformation form={form} />;
      case 4:
        return <SkillsAndLanguageTerms form={form} />;
      case 5:
        return <FinalCheck form={form} />;
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

        <Card className="bg-card border-border shadow-lg">
          <CardContent className="p-8 md:p-12">
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 h-11 px-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 h-11 px-6 bg-primary hover:bg-primary/90"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 h-11 px-8 bg-primary hover:bg-primary/90"
                >
                  Submit Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};