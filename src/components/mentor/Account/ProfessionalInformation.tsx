import React, { useState, useEffect, useRef } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { MentorFormData } from "@/pages/mentor/Account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

interface ProfessionalInformationProps {
  form: UseFormReturn<MentorFormData>;
}

export const ProfessionalInformation: React.FC<
  ProfessionalInformationProps
> = ({ form }) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = form;

  const [companySuggestions, setCompanySuggestions] = useState<{
    [key: number]: string[];
  }>({});
  const [companyInput, setCompanyInput] = useState<{ [key: number]: string }>(
    {}
  );
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const fetchCompanySuggestions = async (input: string, index: number) => {
    if (input.length < 2) return;
    try {
      const response = await axios.get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${input}`
      );
      const names = response.data.map((item: any) => item.name);
      setCompanySuggestions((prev) => ({ ...prev, [index]: names }));
    } catch (error) {
      console.error("Axios fetch error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([index, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setCompanySuggestions((prev) => ({ ...prev, [Number(index)]: [] }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "professionalInfo.workExperience",
  });

  const about = watch("professionalInfo.about");
  const aboutLength = about?.length || 0;

  const addWorkExperience = () => {
    append({
      jobTitle: "",
      companyName: "",
      startDate: new Date(),
      endDate: new Date(),
      currentlyWorking: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            {...register("professionalInfo.profession" as const)}
            placeholder="e.g., Software Engineer"
          />
          {errors.professionalInfo?.profession && (
            <p className="text-xs text-red-500">
              {errors.professionalInfo.profession.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            type="number"
            step="0.1"
            min="0"
            max="50"
            {...register("professionalInfo.experience" as const, {
              valueAsNumber: true,
            })}
            placeholder="eg: 5.5"
          />
          {errors.professionalInfo?.experience && (
            <p className="text-xs text-red-500">
              {errors.professionalInfo.experience.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="about">About Yourself</Label>
        <Textarea
          id="about"
          {...register("professionalInfo.about" as const)}
          placeholder="Tell us about your background..."
          className="min-h-24 max-h-40 resize-none"
        />
        <div className="flex justify-between items-center">
          {errors.professionalInfo?.about && (
            <p className="text-xs text-red-500">
              {errors.professionalInfo.about.message}
            </p>
          )}
          <span
            className={cn(
              "text-xs",
              aboutLength < 50 || aboutLength > 500
                ? "text-red-500"
                : "text-muted-foreground"
            )}
          >
            {aboutLength}/500 characters
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Work Experience</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addWorkExperience}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Experience
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">
                    Experience {index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      {...register(
                        `professionalInfo.workExperience.${index}.jobTitle` as const
                      )}
                      placeholder="e.g., Backend Developer"
                    />
                    {errors.professionalInfo?.workExperience?.[index]
                      ?.jobTitle && (
                      <p className="text-xs text-red-500">
                        {
                          errors.professionalInfo.workExperience[index].jobTitle
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div
                    className="space-y-2 relative"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    <Label>Company Name</Label>
                    <Input
                      value={
                        companyInput[index] ||
                        watch(
                          `professionalInfo.workExperience.${index}.companyName`
                        ) ||
                        ""
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        setCompanyInput((prev) => ({
                          ...prev,
                          [index]: value,
                        }));
                        setValue(
                          `professionalInfo.workExperience.${index}.companyName`,
                          value
                        );
                        fetchCompanySuggestions(value, index);
                      }}
                      placeholder="e.g., Microsoft"
                      autoComplete="off"
                    />
                    {errors.professionalInfo?.workExperience?.[index]
                      ?.companyName && (
                      <p className="text-xs text-red-500">
                        {
                          errors.professionalInfo.workExperience[index]
                            .companyName.message
                        }
                      </p>
                    )}
                    {companySuggestions[index]?.length > 0 && (
                      <ul className="absolute z-50 bg-white dark:bg-muted border border-border rounded-md mt-1 w-full shadow text-sm max-h-40 overflow-y-auto">
                        {companySuggestions[index].map((name, i) => (
                          <li
                            key={i}
                            className="px-3 py-2 hover:bg-muted cursor-pointer"
                            onClick={() => {
                              setValue(
                                `professionalInfo.workExperience.${index}.companyName`,
                                name
                              );
                              setCompanyInput((prev) => ({
                                ...prev,
                                [index]: name,
                              }));
                              setCompanySuggestions((prev) => ({
                                ...prev,
                                [index]: [],
                              }));
                            }}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      {...register(
                        `professionalInfo.workExperience.${index}.startDate` as const
                      )}
                    />
                    {errors.professionalInfo?.workExperience?.[index]
                      ?.startDate && (
                      <p className="text-xs text-red-500">
                        {
                          errors.professionalInfo.workExperience[index]
                            .startDate.message
                        }
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      disabled={watch(
                        `professionalInfo.workExperience.${index}.currentlyWorking`
                      )}
                      {...register(
                        `professionalInfo.workExperience.${index}.endDate` as const
                      )}
                    />
                    {errors.professionalInfo?.workExperience?.[index]
                      ?.endDate && (
                      <p className="text-xs text-red-500">
                        {
                          errors.professionalInfo.workExperience[index].endDate
                            .message
                        }
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <Checkbox
                        checked={
                          watch(
                            `professionalInfo.workExperience.${index}.currentlyWorking`
                          ) || false
                        }
                        onCheckedChange={(checked) => {
                          setValue(
                            `professionalInfo.workExperience.${index}.currentlyWorking`,
                            !!checked
                          );
                          if (checked) {
                            setValue(
                              `professionalInfo.workExperience.${index}.endDate`,
                              null
                            );
                          }
                        }}
                      />
                      <span className="text-sm">
                        I am currently working in this role
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
