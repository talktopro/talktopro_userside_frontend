import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { UseFormReturn } from "react-hook-form";
import { MentorFormData } from "@/pages/mentor/Account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EducationInformationProps {
  form: UseFormReturn<MentorFormData>;
}

export const EducationInformation: React.FC<EducationInformationProps> = ({
  form,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const [instituteInput, setInstituteInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (instituteInput.length >= 2) {
        fetchUniversitySuggestions(instituteInput);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [instituteInput]);

  const fetchUniversitySuggestions = async (input: string) => {
    try {
      const res = await axios.get<{ name: string }[]>(
        "http://universities.hipolabs.com/search",
        {
          params: {
            name: input,
            country: "India",
          },
        }
      );

      const names: string[] = [
        ...new Set(res.data.map((uni) => uni.name)),
      ].sort();
      setSuggestions(names);
    } catch (error) {
      console.error("Failed to fetch universities", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Highest Degree */}
        <div className="space-y-2">
          <Label
            htmlFor="highestDegree"
            className="text-sm font-medium text-foreground"
          >
            Highest Degree
          </Label>
          <Input
            id="highestDegree"
            {...register("education.highestDegree")}
            placeholder="eg: Bachelor's in Computer Science"
            className="h-11"
          />
          {errors.education?.highestDegree && (
            <p className="text-xs font-semibold text-red-500">
              {errors.education.highestDegree.message}
            </p>
          )}
        </div>

        <div className="space-y-2 relative" ref={dropdownRef}>
          <Label
            htmlFor="instituteName"
            className="text-sm font-medium text-foreground"
          >
            Institute/University Name
          </Label>
          <Input
            id="instituteName"
            value={instituteInput || watch("education.instituteName") || ""}
            onChange={(e) => {
              const value = e.target.value;
              setInstituteInput(value);
              setValue("education.instituteName", value, {
                shouldValidate: true,
              });
            }}
            placeholder="eg: Indian Institute of Technology"
            className="h-11"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white dark:bg-muted border border-border rounded-md mt-1 w-full shadow text-sm max-h-40 overflow-y-auto">
              {suggestions.map((name, i) => (
                <li
                  key={i}
                  className="px-3 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => {
                    setValue("education.instituteName", name, {
                      shouldValidate: true,
                    });
                    setInstituteInput(name);
                    setSuggestions([]);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
          {errors.education?.instituteName && (
            <p className="text-xs font-semibold text-red-500">
              {errors.education.instituteName.message}
            </p>
          )}
        </div>

        {/* Start Year */}
        <div className="space-y-2">
          <Label
            htmlFor="startYear"
            className="text-sm font-medium text-foreground"
          >
            Start Year
          </Label>
          <Input
            id="startYear"
            {...register("education.startYear")}
            placeholder="eg: 2018"
            className="h-11"
          />
          {errors.education?.startYear && (
            <p className="text-xs font-semibold text-red-500">
              {errors.education.startYear.message}
            </p>
          )}
        </div>

        {/* End Year */}
        <div className="space-y-2">
          <Label
            htmlFor="endYear"
            className="text-sm font-medium text-foreground"
          >
            End Year
          </Label>
          <Input
            id="endYear"
            {...register("education.endYear")}
            placeholder="eg: 2022"
            className="h-11"
          />
          {errors.education?.endYear && (
            <p className="text-xs font-semibold text-red-500">
              {errors.education.endYear.message}
            </p>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 mt-8">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full mt-1">
            <svg
              className="w-4 h-4 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Education Information
            </h4>
            <p className="text-sm text-muted-foreground">
              Please provide information about your highest educational
              qualification. This helps us understand your academic background
              and expertise level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
