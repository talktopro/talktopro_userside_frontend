import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MentorFormData } from "@/pages/mentor/Account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Plus, X } from "lucide-react";

interface SkillsAndLanguagesProps {
  form: UseFormReturn<MentorFormData>;
}

const defaultSkillSuggestions = [
  "Leadership",
  "Communication",
  "Project Management",
  "UI/UX Design",
  "React.js",
  "Node.js",
];

const defaultLanguageSuggestions = [
  "English",
  "Hindi",
  "Malayalam",
  "Tamil",
  "Kannada",
  "Telugu",
];

export const SkillsAndLanguages: React.FC<SkillsAndLanguagesProps> = ({
  form,
}) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = form;

  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const [filteredSkillSuggestions, setFilteredSkillSuggestions] = useState<
    string[]
  >([]);
  const [filteredLanguageSuggestions, setFilteredLanguageSuggestions] =
    useState<string[]>([]);

  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showLanguageSuggestions, setShowLanguageSuggestions] = useState(false);

  const skills = watch("languages.skills") || [];
  const languages = watch("languages.languages") || [];

  const handleAddSuggestedSkill = (suggested: string) => {
    if (!skills.includes(suggested)) {
      setValue("languages.skills", [...skills, suggested], {
        shouldValidate: true,
      });
    }
  };

  const handleAddSuggestedLanguage = (suggested: string) => {
    if (!languages.includes(suggested)) {
      setValue("languages.languages", [...languages, suggested], {
        shouldValidate: true,
      });
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setValue("languages.skills", [...skills, skillInput.trim()], {
        shouldValidate: true,
      });
      setSkillInput("");
      setShowSkillSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setValue(
      "languages.skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setValue("languages.languages", [...languages, languageInput.trim()], {
        shouldValidate: true,
      });
      setLanguageInput("");
      setShowLanguageSuggestions(false);
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setValue(
      "languages.languages",
      languages.filter((language) => language !== languageToRemove)
    );
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleLanguageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="space-y-1 relative">
        <div>
          <Label className="text-sm font-medium text-foreground">Skills</Label>
          <p className="text-sm text-muted-foreground mt-3">
            Add skills relevant to your mentoring expertise
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => {
              const value = e.target.value;
              setSkillInput(value);
              if (value.trim()) {
                const filtered = defaultSkillSuggestions.filter(
                  (skill) =>
                    skill.toLowerCase().includes(value.toLowerCase()) &&
                    !skills.includes(skill)
                );
                setFilteredSkillSuggestions(filtered);
                setShowSkillSuggestions(true);
              } else {
                setShowSkillSuggestions(false);
              }
            }}
            onKeyDown={handleSkillKeyPress}
            placeholder="eg: Leadership, Communication"
            className="h-10 flex-grow"
          />
          <Button
            type="button"
            onClick={addSkill}
            disabled={!skillInput.trim()}
            className="h-10 px-4"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showSkillSuggestions && filteredSkillSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-12 bg-white border rounded-md shadow-md mt-1 z-20 max-h-40 overflow-y-auto">
            {filteredSkillSuggestions.map((suggested, index) => (
              <div
                key={index}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                onClick={() => {
                  handleAddSuggestedSkill(suggested);
                  setSkillInput("");
                  setShowSkillSuggestions(false);
                }}
              >
                {suggested}
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-red-500 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {errors.languages?.skills && (
          <p className="text-xs font-semibold text-red-500">
            {errors.languages.skills.message}
          </p>
        )}
      </div>

      {/* Languages Section */}
      <div className="space-y-1 relative">
        <div>
          <Label className="text-sm font-medium text-foreground">
            Languages
          </Label>
          <p className="text-sm text-muted-foreground mt-3">
            Add languages you can communicate in
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            value={languageInput}
            onChange={(e) => {
              const value = e.target.value;
              setLanguageInput(value);
              if (value.trim()) {
                const filtered = defaultLanguageSuggestions.filter(
                  (lang) =>
                    lang.toLowerCase().includes(value.toLowerCase()) &&
                    !languages.includes(lang)
                );
                setFilteredLanguageSuggestions(filtered);
                setShowLanguageSuggestions(true);
              } else {
                setShowLanguageSuggestions(false);
              }
            }}
            onKeyDown={handleLanguageKeyPress}
            placeholder="eg: English, Hindi, Malayalam"
            className="h-10 flex-grow"
          />
          <Button
            type="button"
            onClick={addLanguage}
            disabled={!languageInput.trim()}
            className="h-10 px-4"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showLanguageSuggestions && filteredLanguageSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-12 bg-white border rounded-md shadow-md mt-1 z-20 max-h-40 overflow-y-auto">
            {filteredLanguageSuggestions.map((suggested, index) => (
              <div
                key={index}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                onClick={() => {
                  handleAddSuggestedLanguage(suggested);
                  setLanguageInput("");
                  setShowLanguageSuggestions(false);
                }}
              >
                {suggested}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {languages.map((language: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {language}
                <button
                  type="button"
                  onClick={() => removeLanguage(language)}
                  className="ml-1 hover:text-red-500 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {errors.languages?.languages && (
          <p className="text-xs font-semibold text-red-500">
            {errors.languages.languages.message}
          </p>
        )}
      </div>
    </div>
  );
};
