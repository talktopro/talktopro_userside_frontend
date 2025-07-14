import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MentorFormData } from '@/pages/mentor/Account';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PersonalInformationProps {
  form: UseFormReturn<MentorFormData>;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const dateOfBirth = watch('personalInfo.dateOfBirth');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Personal Information</h3>
        <p className="text-muted-foreground">Tell us about yourself to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name *
          </Label>
          <Input
            id="fullName"
            {...register('personalInfo.fullName')}
            placeholder="Enter your full name"
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.personalInfo?.fullName && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.personalInfo?.fullName && (
            <p className="text-sm text-form-error">{errors.personalInfo.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            {...register('personalInfo.email')}
            placeholder="your.email@example.com"
            readOnly
            className="h-11 bg-muted border-form-border cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground">Email cannot be changed</p>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
            Phone Number *
          </Label>
          <Input
            id="phoneNumber"
            {...register('personalInfo.phoneNumber')}
            placeholder="+91 9876543210"
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.personalInfo?.phoneNumber && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.personalInfo?.phoneNumber && (
            <p className="text-sm text-form-error">{errors.personalInfo.phoneNumber.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
            Date of Birth *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-11 justify-start text-left font-normal bg-form-background border-form-border hover:bg-form-background",
                  !dateOfBirth && "text-muted-foreground",
                  errors.personalInfo?.dateOfBirth && "border-form-error"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateOfBirth ? format(dateOfBirth, 'PPP') : 'Select your date of birth'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateOfBirth}
                onSelect={(date) => setValue('personalInfo.dateOfBirth', date ?? new Date())}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {errors.personalInfo?.dateOfBirth && (
            <p className="text-sm text-form-error">{errors.personalInfo.dateOfBirth.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Gender *</Label>
          <RadioGroup
            value={watch('personalInfo.gender')}
            onValueChange={(value) => setValue('personalInfo.gender', value as 'male' | 'female')}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="text-sm font-normal cursor-pointer">
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="text-sm font-normal cursor-pointer">
                Female
              </Label>
            </div>
          </RadioGroup>
          {errors.personalInfo?.gender && (
            <p className="text-sm text-form-error">{errors.personalInfo.gender.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            Location *
          </Label>
          <Input
            id="location"
            {...register('personalInfo.location')}
            placeholder="City, State"
            className={cn(
              "h-11 bg-form-background border-form-border focus:border-form-focus focus:ring-form-focus",
              errors.personalInfo?.location && "border-form-error focus:border-form-error focus:ring-form-error"
            )}
          />
          {errors.personalInfo?.location && (
            <p className="text-sm text-form-error">{errors.personalInfo.location.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};