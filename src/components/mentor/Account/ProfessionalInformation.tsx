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
import { Checkbox } from '@/components/ui/checkbox';

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
      startDate: new Date(),
      endDate: new Date(),
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

        <div className="space-y-2">
          <Label htmlFor="profession" className="text-sm font-medium text-foreground">
            Profession
          </Label>
          <Input
            id="profession"
            {...register('professionalInfo.profession')}
            placeholder="e.g., Software Engineer, Teacher, Doctor"
            className="h-11"
          />
          {errors.professionalInfo?.profession && (
            <p className="text-xs font-semibold text-red-500">{errors.professionalInfo.profession.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience" className="text-sm font-medium text-foreground">
            Years of Experience
          </Label>
          <Input
            id="yearsOfExperience"
            type="number"
            step="0.1"
            min="0"
            max="50"
            {...register('professionalInfo.experience', { valueAsNumber: true })}
            placeholder="eg: 5.5"
            className="h-11"
          />
          {errors.professionalInfo?.experience && (
            <p className="text-xs font-semibold text-red-500">{errors.professionalInfo.experience.message}</p>
          )}
        </div>
      </div>

      {/* About */}
      <div className="space-y-2">
        <Label htmlFor="about" className="text-sm font-medium text-foreground">
          About Yourself
        </Label>
        <Textarea
          id="about"
          {...register('professionalInfo.about')}
          placeholder="Tell us about your background, interests, and what makes you a great mentor..."
          className="min-h-24 text-sm shadow-none custom-scrollbar max-h-40 resize-none"
        />
        <div className="flex justify-between items-center">
          {errors.professionalInfo?.about && (
            <p className="text-xs font-semibold text-red-500">{errors.professionalInfo.about.message}</p>
          )}
          <span className={cn("text-xs",
            aboutLength < 50 ? "text-red-500" :
              aboutLength > 500 ? "text-red-500" : "text-muted-foreground"
          )}>
            {aboutLength}/500 characters
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">Work Experience </Label>
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
            <Card key={field.id} className="shadow-none">
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
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Job Title </Label>
                    <Input
                      {...register(`professionalInfo.workExperience.${index}.jobTitle`)}
                      placeholder="eg: Senior Software Engineer"
                      className="h-10"
                    />
                    {errors.professionalInfo?.workExperience?.[index]?.jobTitle && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.professionalInfo.workExperience[index]?.jobTitle?.message}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Company Name </Label>
                    <Input
                      {...register(`professionalInfo.workExperience.${index}.companyName`)}
                      placeholder="eg: Talk to Pro pvt."
                      className="h-10"
                    />
                    {errors.professionalInfo?.workExperience?.[index]?.companyName && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.professionalInfo.workExperience[index]?.companyName?.message}
                      </p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div className="space-y-2">
                    <Label htmlFor={`startDate${index}`} className="text-sm font-medium text-foreground">Start Date</Label>
                    <Input
                      type="date"
                      id={`startDate${index}`}
                      className="w-full h-11 text-sm items-center px-2"
                      {...register(`professionalInfo.workExperience.${index}.startDate`)}
                    />
                    {errors.professionalInfo?.workExperience?.[index]?.startDate && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.professionalInfo.workExperience[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  <div>

                    {/* End Date */}
                    <div className="space-y-2">
                      <Label htmlFor={`endDate${index}`} className="text-sm font-medium text-foreground">
                        End Date
                      </Label>
                      <Input
                        type="date"
                        id={`endDate${index}`}
                        disabled={watch(`professionalInfo.workExperience.${index}.currentlyWorking`)}
                        {...register(`professionalInfo.workExperience.${index}.endDate`)}
                        className="w-full h-11 text-sm items-center px-2"
                      />
                      {errors.professionalInfo?.workExperience?.[index]?.endDate && (
                        <p className="text-xs font-semibold text-red-500">
                          {errors.professionalInfo.workExperience[index]?.endDate?.message}
                        </p>
                      )}
                    </div>

                    {/* Currently Working Checkbox */}
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Checkbox
                          {...register(`professionalInfo.workExperience.${index}.currentlyWorking`)}

                        />
                        I am currently working in this role
                      </label>
                    </div>

                  </div>


                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {errors.professionalInfo?.workExperience && (
          <p className="text-xs font-semibold text-red-500">{errors.professionalInfo.workExperience.message}</p>
        )}
      </div>
    </div>
  );
};