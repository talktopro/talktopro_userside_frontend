import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MentorFormData } from '@/pages/mentor/Account';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/Badge';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillsAndLanguageTermsProps {
  form: UseFormReturn<MentorFormData>;
}

export const SkillsAndLanguageTerms: React.FC<SkillsAndLanguageTermsProps> = ({ form }) => {
  const { formState: { errors }, watch, setValue } = form;
  const [skillInput, setSkillInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');

  const skills = watch('skillsAndTerms.skills') || [];
  const languages = watch('skillsAndTerms.languages') || [];
  const termsAndConditions = watch('skillsAndTerms.termsAndConditions');
  const privacyPolicy = watch('skillsAndTerms.privacyPolicy');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setValue('skillsAndTerms.skills', [...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setValue('skillsAndTerms.skills', skills.filter(skill => skill !== skillToRemove));
  };

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setValue('skillsAndTerms.languages', [...languages, languageInput.trim()]);
      setLanguageInput('');
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setValue('skillsAndTerms.languages', languages.filter(language => language !== languageToRemove));
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleLanguageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-foreground">Skills</Label>
          <p className="text-sm text-muted-foreground">Add skills relevant to your mentoring expertise</p>
        </div>

        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyPress}
            placeholder="eg: Leadership, Communication"
            className="h-10"
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

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
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

        {errors.skillsAndTerms?.skills && (
          <p className="text-xs font-semibold text-red-500">{errors.skillsAndTerms.skills.message}</p>
        )}
      </div>

      {/* Languages Section */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-foreground">Languages</Label>
          <p className="text-sm text-muted-foreground">Add languages you can communicate in</p>
        </div>

        <div className="flex gap-2">
          <Input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyDown={handleLanguageKeyPress}
            placeholder="eg: English, Hindi, Malayalam"
            className="h-10"
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

        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {languages.map((language: string, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {language}
                <button
                  type="button"
                  onClick={() => removeLanguage(language)}
                  className="ml-1 hover:text-form-error"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {errors.skillsAndTerms?.languages && (
          <p className="text-sm text-form-error">{errors.skillsAndTerms.languages.message}</p>
        )}
      </div>

      {/* Terms and Conditions */}
      {/* <div className="space-y-6 pt-6 border-t border-border">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="termsAndConditions"
              checked={termsAndConditions}
              onCheckedChange={(checked) => setValue('skillsAndTerms.termsAndConditions', checked as boolean)}
              className={cn(
                "mt-1",
                errors.skillsAndTerms?.termsAndConditions && "border-form-error"
              )}
            />
            <div className="space-y-1">
              <Label
                htmlFor="termsAndConditions"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                I accept the Terms and Conditions *
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a> and
                understand your responsibilities as a mentor on our platform.
              </p>
            </div>
          </div>
          {errors.skillsAndTerms?.termsAndConditions && (
            <p className="text-sm text-form-error ml-6">{errors.skillsAndTerms.termsAndConditions.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacyPolicy"
              checked={privacyPolicy}
              onCheckedChange={(checked) => setValue('skillsAndTerms.privacyPolicy', checked as boolean)}
              className={cn(
                "mt-1",
                errors.skillsAndTerms?.privacyPolicy && "border-form-error"
              )}
            />
            <div className="space-y-1">
              <Label
                htmlFor="privacyPolicy"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                I accept the Privacy Policy *
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this, you acknowledge that you have read and agree to our{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a> regarding
                how we collect, use, and protect your personal information.
              </p>
            </div>
          </div>
          {errors.skillsAndTerms?.privacyPolicy && (
            <p className="text-sm text-form-error ml-6">{errors.skillsAndTerms.privacyPolicy.message}</p>
          )}
        </div>
      </div> */}

      {/* Info Box */}
      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full mt-1">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Skills & Languages</h4>
            <p className="text-sm text-muted-foreground">
              Add relevant skills and languages to help students find the right mentor. Be specific about technical skills, soft skills, and languages you're comfortable mentoring in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};