import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MentorFormData } from '@/pages/mentor/Account';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface EducationInformationProps {
  form: UseFormReturn<MentorFormData>;
}

export const EducationInformation: React.FC<EducationInformationProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Education Background</h3>
        <p className="text-muted-foreground">Tell us about your educational qualifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Degree */}
        <div className="space-y-2">
          <Label htmlFor="highestDegree" className="text-sm font-medium text-foreground">
            Highest Degree *
          </Label>
          <Input
            id="highestDegree"
            {...register('education.highestDegree')}
            placeholder="e.g., Bachelor's in Computer Science"
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.education?.highestDegree && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.education?.highestDegree && (
            <p className="text-sm text-form-error">{errors.education.highestDegree.message}</p>
          )}
        </div>

        {/* Institute Name */}
        <div className="space-y-2">
          <Label htmlFor="instituteName" className="text-sm font-medium text-foreground">
            Institute/University Name *
          </Label>
          <Input
            id="instituteName"
            {...register('education.instituteName')}
            placeholder="e.g., Indian Institute of Technology"
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.education?.instituteName && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.education?.instituteName && (
            <p className="text-sm text-form-error">{errors.education.instituteName.message}</p>
          )}
        </div>

        {/* Start Year */}
        <div className="space-y-2">
          <Label htmlFor="startYear" className="text-sm font-medium text-foreground">
            Start Year *
          </Label>
          <Input
            id="startYear"
            {...register('education.startYear')}
            placeholder="e.g., 2018"
            maxLength={4}
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.education?.startYear && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.education?.startYear && (
            <p className="text-sm text-form-error">{errors.education.startYear.message}</p>
          )}
        </div>

        {/* End Year */}
        <div className="space-y-2">
          <Label htmlFor="endYear" className="text-sm font-medium text-foreground">
            End Year *
          </Label>
          <Input
            id="endYear"
            {...register('education.endYear')}
            placeholder="e.g., 2022"
            maxLength={4}
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.education?.endYear && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.education?.endYear && (
            <p className="text-sm text-form-error">{errors.education.endYear.message}</p>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 mt-8">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full mt-1">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Education Information</h4>
            <p className="text-sm text-muted-foreground">
              Please provide information about your highest educational qualification. This helps us understand your academic background and expertise level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};