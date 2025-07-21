import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MentorFormData } from '@/pages/mentor/Account';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Camera, ImageUp } from 'lucide-react';
import useImageCropper from '@/hooks/useImageCropper';
import { User } from '@/types/user';
import ImageCropper from '@/components/common/ImageCropper';

interface PersonalInformationProps {
  form: UseFormReturn<MentorFormData>;
  user: User
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({ form, user }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const { inputRef, handleImageChange, handleInputTrigger, selectedImage, createCroppedBlobImage, handleClose, handleSave, isCropperOpen } = useImageCropper();
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-col">
        <div className="w-auto h-32 rounded-md overflow-hidden aspect-[3.5/4] relative mr-4 not-sm:mr-0 bg-background border">
          {user.profileImg ? (
            <img
              src={`https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${user.profileImg}`}
              alt="Profile picture"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-muted-foreground cursor-pointer" >
              <ImageUp strokeWidth={1.5} height={18} />
              <span className="text-xs text-center mt-2">Click to<br /> Upload<br />Profile image</span>
            </div>
          )}
          {user.profileImg && (
            <div className="absolute bottom-1 right-1">
              <Camera
                strokeWidth={1.5}
                className="bg-background rounded-full p-1 w-6 h-6 cursor-pointer border"
                onClick={handleInputTrigger}
              />
            </div>
          )}
        </div>

        <input
          type="file"
          hidden
          ref={inputRef}
          accept=".jpg, .jpeg"
          onChange={handleImageChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <Input
            id="fullName"
            {...register('personalInfo.fullName')}
            placeholder="Enter your full name"
            className="h-11"
          />
          {errors.personalInfo?.fullName && (<p className="text-xs font-semibold text-red-500">{errors.personalInfo.fullName.message}</p>)}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-1">
            Email Address <p className="text-xs font-semibold text-muted-foreground">(cannot be changed)</p>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('personalInfo.email')}
            placeholder="your.email@example.com"
            readOnly
            className="h-11 bg-muted cursor-not-allowed"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            {...register('personalInfo.phoneNumber')}
            placeholder="00000 00000"
            className="h-11"
          />
          {errors.personalInfo?.phoneNumber && (
            <p className="text-xs font-semibold text-red-500">{errors.personalInfo.phoneNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
            Date of Birth
          </Label>
          <Input
            type='date'
            id="dateOfBirth"
            {...register('personalInfo.dateOfBirth')}
            placeholder="Enter your DOB"
            className="w-full h-11 border rounded-md flex justify-between text-sm items-center px-2 cursor-pointer"
          />
          {errors.personalInfo?.dateOfBirth && (
            <p className="text-xs font-semibold text-red-500">{errors.personalInfo.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Gender</Label>
          <RadioGroup
            value={watch('personalInfo.gender')}
            onValueChange={(value) => setValue('personalInfo.gender', value as 'male' | 'female', { shouldValidate: true })}
            className="flex flex-col mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" className='cursor-pointer' />
              <Label htmlFor="male" className="text-sm font-normal cursor-pointer">
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" className='cursor-pointer' />
              <Label htmlFor="female" className="text-sm font-normal cursor-pointer">
                Female
              </Label>
            </div>
          </RadioGroup>
          {errors.personalInfo?.gender && (
            <p className="text-xs font-semibold text-red-500">{errors.personalInfo.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            Location
          </Label>
          <Input
            id="location"
            {...register('personalInfo.location')}
            placeholder="City, State"
            className="h-11"
          />
          {errors.personalInfo?.location && (
            <p className="text-xs font-semibold text-red-500">{errors.personalInfo.location.message}</p>
          )}
        </div>
      </div>
      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          createCroppedBlobImage={createCroppedBlobImage}
          onSave={handleSave}
          onClose={handleClose}
          isOpen={isCropperOpen}
        />
      )}
    </div>
  );
};