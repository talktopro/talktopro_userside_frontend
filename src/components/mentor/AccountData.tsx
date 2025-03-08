import { Textarea } from "../ui/textarea";
import img from "../../assets/annan.jpg";
import { BadgeButton, InputBox } from "./InputBadge";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FC, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import apiClient from "@/api/axiosInstance";
import { AutocompleteInput } from "../ui/autocomplete-input";

// Sample suggestion lists (replace with your own or fetch from API)
const professionSuggestions = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Designer",
];

const skillSuggestions = [
  "JavaScript",
  "Python",
  "React",
  "SQL",
];

const languageSuggestions = [
  "Malayalam",
  "English",
  "Spanish",
  "French",
  "Japanese",
];

interface RegisterBodyProps {
  fromRegisterPage: boolean;
}

const createFormSchema = (fromRegisterPage: boolean) =>
  z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters long."),
    last_name: z.string().min(2, "Last name must be at least 2 characters long."),
    phone_number: z.string().regex(/^\d{10,15}$/, "Enter a valid phone number."),
    profession: z.string().nonempty("Profession is required."),
    about: z.string().max(500, "About section must not exceed 500 characters."),
    skills: z.string().array().min(1, "At least one skill is required."),
    languages: z.string().array().min(1, "At least one language is required."),
    termsAndConditions: fromRegisterPage
      ? z.literal(true, { errorMap: () => ({ message: "You must agree to the Terms and Conditions" }) })
      : z.boolean(),
    privacyAndPolicy: fromRegisterPage
      ? z.literal(true, { errorMap: () => ({ message: "You must agree to the Privacy Policy" }) })
      : z.boolean(),
  });

const RegisterBody: FC<RegisterBodyProps> = ({ fromRegisterPage = true }) => {
  const { id } = useSelector(selectAuth)
  const navigate = useNavigate();
  const form = useForm<z.infer<ReturnType<typeof createFormSchema>>>({
    resolver: zodResolver(createFormSchema(fromRegisterPage)),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      profession: "",
      about: "",
      skills: [],
      languages: [],
      termsAndConditions: false,
      privacyAndPolicy: false,
    },
  });

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

  const handleSaveBadgeData = (content: string, field: "skills" | "languages") => {
    const formattedContent = field === "languages" 
      ? content.charAt(0).toUpperCase() + content.slice(1).toLowerCase() 
      : content;
    const currentArray = form.getValues(field);
    const updatedArray = [...currentArray, formattedContent];
    form.setValue(field, updatedArray, { shouldValidate: true });
    handleCloseBadgeInput();
  };

  const handleRemoveBadge = (index: number, field: "skills" | "languages") => {
    const currentArray = form.getValues(field);
    const updatedArray = currentArray.filter((_, i) => i !== index);
    form.setValue(field, updatedArray, { shouldValidate: true });
  };

  const onSubmit = async (values: z.infer<ReturnType<typeof createFormSchema>>) => {
    if (!id) {
      toast.error("You must be logged in to register as a mentor.");
      navigate(ROUTES.AUTH.LOGIN);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await apiClient.post("/mentor/signup", {
        id,
        first_name: values.first_name,
        last_name: values.last_name,
        profession: values.profession,
        about: values.about,
        skills: values.skills,
        languages: values.languages,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Backend response:", response.data);
      toast.success(response.data?.message);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.errors[0]);

        toast.error(error.response?.data?.errors[0]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // const { formState: { isValid } } = form;

  return (
    <div className={`w-full ${fromRegisterPage ? "mx-auto pt-25 px-10 not-sm:px-3" : ""}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative">
            <div className="w-full h-32 bg-muted rounded-lg" />
            <div className="px-10">
              <div className="relative flex items-end not-sm:items-center not-sm:flex-col not-sm:text-center -top-12">
                <div className="w-28 h-32 rounded-md overflow-hidden mr-4 not-sm:mr-0">
                  <img src={img} alt="Profile picture" className="w-full h-full object-cover" />
                </div>
                <div className="not-sm:mt-4">
                  <h1 className="text-2xl font-semibold whitespace-nowrap">Cristiano Ronaldo</h1>
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-start not-sm:justify-center items-center opacity-70 gap-1.5">
                      {/* <Mail className="w-4 h-4" /> */}
                      {/* <span className="text-sm">{form.watch("email") || "Not provided"}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="sm:mx-10 not-sm:mx-0 pt-2 pb-4 px-4 rounded-md border-1">
                <h2 className="text-md font-semibold mb-2">Personal Information</h2>
                <div className="flex flex-wrap w-full space-y-3 not-sm:space-x-3 h-full">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="sm:w-1/2 not-sm:w-full sm:pr-2">
                        <FormLabel className="text-xs ml-3">First Name</FormLabel>
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
                        <FormLabel className="text-xs ml-3">Last Name</FormLabel>
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
                        <FormLabel className="text-xs ml-3">Phone Number</FormLabel>
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
                        <FormLabel className="text-xs ml-3">Profession</FormLabel>
                        <FormControl>
                          <AutocompleteInput
                            type="text"
                            placeholder="Enter profession"
                            className="hover:bg-muted transition-colors duration-300 mt-1"
                            suggestions={professionSuggestions}
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
                  <FormItem className="mx-10 not-sm:mx-0 pt-2 pb-4 px-4 rounded-md hover:bg-muted border-1 transition-colors duration-300">
                    <FormLabel className="text-md font-semibold mb-2">About</FormLabel>
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
                <div className="ml-10 not-sm:ml-0 pt-2 pb-4 px-4 rounded-md border sm:w-1/2 not-sm:w-full h-full">
                  <h2 className="text-md font-semibold mb-2">Skills & Expertise</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.watch("skills").map((skill: string, index: number) => (
                      <Badge
                        content={skill}
                        key={index}
                        showCrossIcon={true}
                        onCrossClick={() => handleRemoveBadge(index, "skills")}
                      />
                    ))}
                    {isBadgeInputVisible.forSkill ? (
                      <InputBox
                        onSave={(content) => handleSaveBadgeData(content, "skills")}
                        onClose={handleCloseBadgeInput}
                        suggestions={skillSuggestions}
                      />
                    ) : (
                      <BadgeButton onClick={() => handleShowBadgeInput("forSkill")} />
                    )}
                  </div>
                  {form.formState.errors.skills && (
                    <p className="text-red-500 text-sm mt-2">{form.formState.errors.skills.message}</p>
                  )}
                </div>
                <div className="mr-10 not-sm:mr-0 pt-2 pb-4 px-4 rounded-md border sm:w-1/2 not-sm:w-full h-full">
                  <h2 className="text-md font-semibold mb-2">Languages</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.watch("languages").map((language: string, index: number) => (
                      <Badge
                        content={language}
                        key={index}
                        showCrossIcon={true}
                        onCrossClick={() => handleRemoveBadge(index, "languages")}
                      />
                    ))}
                    {isBadgeInputVisible.forLanguage ? (
                      <InputBox
                        onSave={(content) => handleSaveBadgeData(content, "languages")}
                        onClose={handleCloseBadgeInput}
                        suggestions={languageSuggestions}
                      />
                    ) : (
                      <BadgeButton onClick={() => handleShowBadgeInput("forLanguage")} />
                    )}
                  </div>
                  {form.formState.errors.languages && (
                    <p className="text-red-500 text-sm mt-2">{form.formState.errors.languages.message}</p>
                  )}
                </div>
              </div>

              <div className="mx-10 not-sm:mx-0 pt-2 pb-4 px-4 rounded-md border-1" hidden={!fromRegisterPage}>
                <h2 className="text-md font-semibold mb-2">Terms and Conditions</h2>
                <div className="space-y-2 mt-4">
                  <p className="text-xs opacity-70">
                    By agreeing, you acknowledge that you have read and understood our terms.
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
                    Your data will be processed in accordance with our privacy policy.
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

              <div className="flex justify-end gap-2 sm:px-10 not-sm:justify-center">
                <Button
                  variant="outline"
                  type="button"
                  className="border-red-500 text-red-500 hover:text-red-600"
                  disabled={isSubmitting}
                >
                  {fromRegisterPage ? "Discard and Cancel" : "Discard"}
                </Button>
                <Button
                  type="submit"
                  className="bg-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? fromRegisterPage
                      ? "Saving and Verifying..."
                      : "Saving..."
                    : fromRegisterPage
                      ? "Save and Verify"
                      : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterBody;