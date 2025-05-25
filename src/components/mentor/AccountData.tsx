import { Textarea } from "../ui/textarea";
import avatar from "@/assets/avatar/user.png";
import { BadgeButton, InputBox } from "./InputBadge";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../common/Badge";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, updateUser } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import apiClient from "@/api/axiosInstance";
import {
  languageSuggestions,
  skillSuggestions,
} from "@/constants/MentorRegister";
import useImageCropper from "@/hooks/useImageCropper";
import ImageCropper from "../common/ImageCropper";
import { Camera } from "lucide-react";
import useErrorHandler from "@/hooks/useErrorHandler";

interface RegisterBodyProps {
  fromRegisterPage: boolean;
  fromApplicationRejectedPage?: boolean;
}

const createFormSchema = (fromRegisterPage: boolean) =>
  z.object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters long."),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters long."),
    phone_number: z
      .string()
      .regex(/^\d{10,15}$/, "Enter a valid phone number."),
    profileImg: z.string().min(1, "Profile image is required"),
    profession: z.string().nonempty("Profession is required."),
    about: z
      .string()
      .min(50, "About section must need minimum 50 characters.")
      .max(500, "About section must not exceed 500 characters."),
    skills: z.string().array().min(1, "At least one skill is required."),
    languages: z.string().array().min(1, "At least one language is required."),
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

const RegisterBody: FC<RegisterBodyProps> = ({ fromRegisterPage, fromApplicationRejectedPage = false }) => {
  const { user } = useSelector(selectAuth);
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const id = user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();
  const {
    inputRef,
    handleImageChange,
    handleInputTrigger,
    handleClose,
    createCroppedBlobImage,
    handleSave,
    isCropperOpen,
    selectedImage,
  } = useImageCropper();

  const form = useForm<z.infer<ReturnType<typeof createFormSchema>>>({
    resolver: zodResolver(createFormSchema(fromRegisterPage)),
    defaultValues: {
      first_name: user?.mentorDetails?.first_name || "",
      last_name: user?.mentorDetails?.last_name || "",
      phone_number: user?.phone.toString(),
      profileImg: user?.profileImg || "",
      profession: user?.mentorDetails?.profession || "",
      about: user?.mentorDetails?.about || "",
      skills: user?.mentorDetails?.skills || [],
      languages: user?.mentorDetails?.languages || [],
      termsAndConditions: false,
      privacyAndPolicy: false,
    },
    criteriaMode: "all", // Add this to properly track array changes
    mode: "onChange"
  });

  useEffect(() => {
    if (user?.profileImg) {
      form.setValue("profileImg", user.profileImg, { shouldValidate: true });
    }
  }, [user?.profileImg, form]);

  const [isBadgeInputVisible, setIsBadgeInputVisible] = useState({
    forSkill: false,
    forLanguage: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShowBadgeInput = (type: "forSkill" | "forLanguage") => {
    setIsBadgeInputVisible((prev) => ({ ...prev, [type]: true }));
  };

  const handleCloseBadgeInput = () => {
    setIsBadgeInputVisible({ forSkill: false, forLanguage: false });
  };

  const handleSaveBadgeData = (
    content: string,
    field: "skills" | "languages"
  ) => {
    const formattedContent =
      field === "languages"
        ? content.charAt(0).toUpperCase() + content.slice(1).toLowerCase()
        : content;
    const currentArray = form.getValues(field);
    const updatedArray = [...currentArray, formattedContent];
    form.setValue(field, updatedArray, { shouldValidate: true, shouldDirty: true });
  };

  const handleRemoveBadge = (index: number, field: "skills" | "languages") => {
    const currentArray = form.getValues(field);
    const updatedArray = currentArray.filter((_, i) => i !== index);
    form.setValue(field, updatedArray, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (
    values: z.infer<ReturnType<typeof createFormSchema>>
  ) => {
    if (!id) {
      toast.error("You must be logged in to register as a mentor.");
      navigate(ROUTES.AUTH.LOGIN);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await apiClient.post(
        (fromRegisterPage || fromApplicationRejectedPage) ? "/mentor/signup" : "/mentor/edit-account-details",
        {
          id,
          first_name: values.first_name,
          last_name: values.last_name,
          profession: values.profession,
          about: values.about,
          skills: values.skills,
          languages: values.languages,
          phone: values.phone_number,
        }
      );

      toast.success(response.data?.message);
      handleCloseBadgeInput();
      dispatch(updateUser(response.data.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        handleError(error, error.response?.data?.errors[0]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    if (user) {
      form.reset({
        first_name: user.mentorDetails?.first_name || "",
        last_name: user.mentorDetails?.last_name || "",
        phone_number: user.phone.toString(),
        profileImg: user.profileImg || "",
        profession: user.mentorDetails?.profession || "",
        about: user.mentorDetails?.about || "",
        skills: [...(user.mentorDetails?.skills || [])],
        languages: [...(user.mentorDetails?.languages || [])],
        termsAndConditions: form.getValues("termsAndConditions"),
        privacyAndPolicy: form.getValues("privacyAndPolicy"),
      });
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.mentorDetails?.first_name || "",
        last_name: user.mentorDetails?.last_name || "",
        phone_number: user.phone.toString(),
        profileImg: user.profileImg || "",
        profession: user.mentorDetails?.profession || "",
        about: user.mentorDetails?.about || "",
        skills: user.mentorDetails?.skills || [],
        languages: user.mentorDetails?.languages || [],
        termsAndConditions: form.getValues("termsAndConditions"),
        privacyAndPolicy: form.getValues("privacyAndPolicy"),
      });
    }
  }, [user, form]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`w-full ${fromRegisterPage ? "mx-auto pt-8 px-10 not-sm:px-3" : fromApplicationRejectedPage ? "px-0" : "px-4"}`}
        >
          <div className="relative">
            <div
              className="w-full h-24 sm:h-32 rounded-lg accountDetails_bg"
              hidden={fromApplicationRejectedPage}
            />
            <div className={`${fromApplicationRejectedPage ? "mt-20" : "px-10"}`}>
              <div className="relative flex items-end not-sm:items-center not-sm:flex-col not-sm:text-center -top-12">
                <div className="w-auto h-32 rounded-md overflow-hidden aspect-[3.5/4] relative mr-4 not-sm:mr-0 bg-background">
                  <img
                    src={
                      user?.profileImg
                        ? `https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${user.profileImg}`
                        : avatar
                    }
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1">
                    <Camera
                      strokeWidth={1.5}
                      className="bg-background rounded-full p-1 w-6 h-6 cursor-pointer"
                      onClick={handleInputTrigger}
                    />
                  </div>
                </div>
                <input
                  type="file"
                  hidden
                  ref={inputRef}
                  accept=".jpg, .jpeg"
                  onChange={handleImageChange}
                />
                {form.formState.errors.profileImg && (
                  <p className="text-red-500 text-xs absolute -bottom-5 left-0">
                    {form.formState.errors.profileImg.message}
                  </p>
                )}
                <div className="not-sm:mt-4">
                  <h1 className="text-2xl font-semibold whitespace-nowrap">
                    {user?.uname}
                  </h1>
                  <div className="opacity-70">
                    <span className="text-sm break-all">{user?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className={`pt-2 pb-4 px-4 rounded-md border-1 ${!fromApplicationRejectedPage && "sm:mx-10 not-sm:mx-0"}`}>
                <h2 className="text-md font-semibold mb-2">
                  Personal Information
                </h2>
                <div className="flex flex-wrap w-full space-y-3 not-sm:space-x-3 h-full">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="sm:w-1/2 not-sm:w-full sm:pr-2">
                        <FormLabel className="text-xs ml-3">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter first name"
                            className="hover:bg-muted transition-colors duration-300 mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem className="sm:w-1/2 not-sm:w-full sm:pl-2">
                        <FormLabel className="text-xs ml-3">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter last name"
                            className="hover:bg-muted transition-colors duration-300 mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem className="sm:w-1/2 not-sm:w-full sm:pr-2">
                        <FormLabel className="text-xs ml-3">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter phone number"
                            className="hover:bg-muted transition-colors duration-300 mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem className="sm:w-1/2 not-sm:w-full sm:pl-2">
                        <FormLabel className="text-xs ml-3">
                          Profession
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter profession"
                            className="hover:bg-muted transition-colors duration-300 mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className={`pt-2 pb-4 px-4 rounded-md hover:bg-muted border-1 transition-colors duration-300 ${!fromApplicationRejectedPage && "mx-10 not-sm:mx-0"}`}>
                    <FormLabel className="text-md font-semibold mb-2">
                      About
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="p-0 max-h-40 resize-none border-none shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none custom-scrollbar"
                        placeholder="Enter about section"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex not-sm:flex-wrap w-full space-y-3 space-x-3 h-full items-stretch">
                <div className={`pt-2 pb-4 px-4 rounded-md border sm:w-1/2 not-sm:w-full h-full ${!fromApplicationRejectedPage && "ml-10 not-sm:ml-0 "}`}>
                  <h2 className="text-md font-semibold mb-2">
                    Skills & Expertise
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form
                      .watch("skills")
                      .map((skill: string, index: number) => (
                        <Badge
                          content={skill}
                          key={index}
                          showCrossIcon={true}
                          onCrossClick={() =>
                            handleRemoveBadge(index, "skills")
                          }
                        />
                      ))}
                    {isBadgeInputVisible.forSkill ? (
                      <InputBox
                        onSave={(content) =>
                          handleSaveBadgeData(content, "skills")
                        }
                        onClose={handleCloseBadgeInput}
                        suggestions={skillSuggestions}
                      />
                    ) : (
                      <BadgeButton
                        onClick={() => handleShowBadgeInput("forSkill")}
                      />
                    )}
                  </div>
                  {form.formState.errors.skills && (
                    <p className="text-[0.8rem] font-medium text-red-500 mt-2">
                      {form.formState.errors.skills.message}
                    </p>
                  )}
                </div>
                <div className={`${!fromApplicationRejectedPage && "mr-10 not-sm:mr-0"} pt-2 pb-4 px-4 rounded-md border sm:w-1/2 not-sm:w-full h-full`}>
                  <h2 className="text-md font-semibold mb-2">Languages</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form
                      .watch("languages")
                      .map((language: string, index: number) => (
                        <Badge
                          content={language}
                          key={index}
                          showCrossIcon={true}
                          onCrossClick={() =>
                            handleRemoveBadge(index, "languages")
                          }
                        />
                      ))}
                    {isBadgeInputVisible.forLanguage ? (
                      <InputBox
                        onSave={(content) =>
                          handleSaveBadgeData(content, "languages")
                        }
                        onClose={handleCloseBadgeInput}
                        suggestions={languageSuggestions}
                      />
                    ) : (
                      <BadgeButton
                        onClick={() => handleShowBadgeInput("forLanguage")}
                      />
                    )}
                  </div>
                  {form.formState.errors.languages && (
                    <p className="text-[0.8rem] font-medium text-red-500 mt-2">
                      {form.formState.errors.languages.message}
                    </p>
                  )}
                </div>
              </div>
              <div
                className="mx-10 not-sm:mx-0 pt-2 pb-4 px-4 rounded-md border-1"
                hidden={!fromRegisterPage}
              >
                <h2 className="text-md font-semibold mb-2">
                  Terms and Conditions
                </h2>
                <div className="space-y-2 mt-4">
                  <p className="text-xs opacity-70">
                    By agreeing, you acknowledge that you have read and
                    understood our terms.
                  </p>
                  <FormField
                    control={form.control}
                    name="termsAndConditions"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              form.trigger("termsAndConditions");
                            }}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium">
                          I agree to the Terms and Conditions
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="text-xs opacity-70">
                    Your data will be processed in accordance with our privacy
                    policy.
                  </p>
                  <FormField
                    control={form.control}
                    name="privacyAndPolicy"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              form.trigger("privacyAndPolicy");
                            }}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium">
                          I agree to the Privacy Policy
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* button for large screen */}
              <div className="flex justify-end gap-3 not-sm:hidden px-10">
                <Button
                  variant="outline"
                  type="button"
                  className="border-red-500 text-red-500 hover:text-red-600 min-w-28"
                  disabled={isSubmitting || !form.formState.isDirty}
                  onClick={handleDiscard}
                >
                  {fromRegisterPage
                    ? "Discard and Cancel" : "Discard"}
                </Button>
                <Button
                  type="submit"
                  className="bg-primary min-w-28"
                  disabled={isSubmitting || !form.formState.isDirty}
                >
                  {isSubmitting
                    ? fromRegisterPage
                      ? "Saving and Verifying..."
                      : fromApplicationRejectedPage
                        ? "Re-Submitting..."
                        : "Saving..."
                    : fromRegisterPage
                      ? "Save and Verify"
                      : fromApplicationRejectedPage
                        ? "Save and Re-Submit"
                        : "Save changes"}
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/* button for small screen */}
        <div className="flex gap-3 mt-10 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:py-3 not-sm:border-t-1 not-sm:px-4 sm:hidden">
          <Button
            variant="outline"
            type="button"
            className="border-red-500 text-red-500 hover:text-red-600 w-full"
            disabled={isSubmitting || !form.formState.isDirty}
            onClick={handleDiscard}
          >
            {fromRegisterPage ? "Discard and Cancel" : "Discard"}
          </Button>
          <Button
            type="submit"
            className="bg-primary w-full"
            disabled={isSubmitting || !form.formState.isDirty}
          >
            {isSubmitting
              ? fromRegisterPage
                ? "Saving and Verifying..."
                : fromApplicationRejectedPage
                  ? "Re-Submitting..."
                  : "Saving..."
              : fromRegisterPage
                ? "Save and Verify"
                : fromApplicationRejectedPage
                  ? "Save and Re-Submit"
                  : "Save changes"}
          </Button>
        </div>
      </Form>
      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          createCroppedBlobImage={createCroppedBlobImage}
          onSave={handleSave}
          onClose={handleClose}
          isOpen={isCropperOpen}
        />
      )}
    </>
  );
};

export default RegisterBody;
