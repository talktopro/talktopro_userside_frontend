import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { MentorFormData } from '@/pages/mentor/Account';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ProfessionalInformationProps {
  form: UseFormReturn<MentorFormData>;
}

export const ProfessionalInformation: React.FC<ProfessionalInformationProps> = ({ form }) => {
  const { register, formState: { errors }, control, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'professionalInfo.workExperience',
  });

  const about = watch('professionalInfo.about');
  const aboutLength = about?.length || 0;

  const addWorkExperience = () => {
    append({
      jobTitle: '',
      companyName: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Professional Information</h3>
        <p className="text-muted-foreground">Share your professional background and experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profession */}
        <div className="space-y-2">
          <Label htmlFor="profession" className="text-sm font-medium text-foreground">
            Profession *
          </Label>
          <Input
            id="profession"
            {...register('professionalInfo.profession')}
            placeholder="e.g., Software Engineer, Teacher, Doctor"
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.professionalInfo?.profession && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.professionalInfo?.profession && (
            <p className="text-sm text-form-error">{errors.professionalInfo.profession.message}</p>
          )}
        </div>

        {/* Years of Experience */}
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience" className="text-sm font-medium text-foreground">
            Years of Experience *
          </Label>
          <Input
            id="yearsOfExperience"
            type="number"
            step="0.1"
            min="0"
            max="50"
            {...register('professionalInfo.yearsOfExperience', { valueAsNumber: true })}
            placeholder="e.g., 5.5"
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.professionalInfo?.yearsOfExperience && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.professionalInfo?.yearsOfExperience && (
            <p className="text-sm text-form-error">{errors.professionalInfo.yearsOfExperience.message}</p>
          )}
        </div>
      </div>

      {/* About */}
      <div className="space-y-2">
        <Label htmlFor="about" className="text-sm font-medium text-foreground">
          About Yourself *
        </Label>
        <Textarea
          id="about"
          {...register('professionalInfo.about')}
          placeholder="Tell us about your background, interests, and what makes you a great mentor..."
          className={cn(
            "min-h-24 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus resize-none",
            errors.professionalInfo?.about && "border-form-error focus:border-form-error focus:ring-form-error"
          )}
          rows={4}
        />
        <div className="flex justify-between items-center">
          {errors.professionalInfo?.about ? (
            <p className="text-sm text-form-error">{errors.professionalInfo.about.message}</p>
          ) : (
            <div />
          )}
          <span className={cn(
            "text-xs",
            aboutLength < 50 ? "text-form-error" :
              aboutLength > 500 ? "text-form-error" : "text-muted-foreground"
          )}>
            {aboutLength}/500 characters
          </span>
        </div>
      </div>

      {/* Work Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium text-foreground">Work Experience *</Label>
            <p className="text-sm text-muted-foreground">Add your professional work experience</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addWorkExperience}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id} className="bg-form-background border-form-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-foreground">
                    Experience {index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-form-error hover:text-form-error hover:bg-form-error/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Job Title *</Label>
                    <Input
                      {...register(`professionalInfo.workExperience.${index}.jobTitle`)}
                      placeholder="e.g., Senior Software Engineer"
                      className={cn(
                        "h-10 bg-background border-form-border focus:border-form-focus focus:ring-form-focus",
                        errors.professionalInfo?.workExperience?.[index]?.jobTitle && "border-form-error"
                      )}
                    />
                    {errors.professionalInfo?.workExperience?.[index]?.jobTitle && (
                      <p className="text-sm text-form-error">
                        {errors.professionalInfo.workExperience[index]?.jobTitle?.message}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Company Name *</Label>
                    <Input
                      {...register(`professionalInfo.workExperience.${index}.companyName`)}
                      placeholder="e.g., Tech Solutions Inc."
                      className={cn(
                        "h-10 bg-background border-form-border focus:border-form-focus focus:ring-form-focus",
                        errors.professionalInfo?.workExperience?.[index]?.companyName && "border-form-error"
                      )}
                    />
                    {errors.professionalInfo?.workExperience?.[index]?.companyName && (
                      <p className="text-sm text-form-error">
                        {errors.professionalInfo.workExperience[index]?.companyName?.message}
                      </p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Start Date *</Label>
                    <Input
                      {...register(`professionalInfo.workExperience.${index}.startDate`)}
                      placeholder="MM/YYYY"
                      className={cn(
                        "h-10 bg-background border-form-border focus:border-form-focus focus:ring-form-focus",
                        errors.professionalInfo?.workExperience?.[index]?.startDate && "border-form-error"
                      )}
                    />
                    {errors.professionalInfo?.workExperience?.[index]?.startDate && (
                      <p className="text-sm text-form-error">
                        {errors.professionalInfo.workExperience[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">End Date *</Label>
                    <Input
                      {...register(`professionalInfo.workExperience.${index}.endDate`)}
                      placeholder="MM/YYYY"
                      className={cn(
                        "h-10 bg-background border-form-border focus:border-form-focus focus:ring-form-focus",
                        errors.professionalInfo?.workExperience?.[index]?.endDate && "border-form-error"
                      )}
                    />
                    {errors.professionalInfo?.workExperience?.[index]?.endDate && (
                      <p className="text-sm text-form-error">
                        {errors.professionalInfo.workExperience[index]?.endDate?.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {errors.professionalInfo?.workExperience && (
          <p className="text-sm text-form-error">{errors.professionalInfo.workExperience.message}</p>
        )}
      </div>
    </div>
  );
};