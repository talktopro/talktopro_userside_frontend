import type React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { MentorFormData } from "@/pages/mentor/Account";
import { format } from "date-fns";
import {
  Mail,
  MapPin,
  Phone,
  Calendar,
  UserRound,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import type { User } from "@/types/user";
import { Badge } from "@/components/ui/Badge";

interface FinalCheckProps {
  form: UseFormReturn<MentorFormData>;
  user: User;
}

export const FinalCheck: React.FC<FinalCheckProps> = ({ form, user }) => {
  const formData = form.getValues();
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  console.log("🔍 Submitted Form Data:", JSON.stringify(formData, null, 2));
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Image and Basic Info */}
          <div className="text-center lg:text-left">
            <div className="w-32 h-32 mx-auto lg:mx-0 rounded-lg overflow-hidden bg-background border mb-4">
              <img
                src={`https://${bucketName}.s3.amazonaws.com/${
                  import.meta.env.VITE_PROFILE_IMAGE_FOLDER
                }/${user.profileImg}`}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {formData.personalInfo.fullName}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {formData.professionalInfo.profession}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Contact Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {formData.personalInfo.email}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {formData.personalInfo.location}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {formData.personalInfo.phoneNumber}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {formData.personalInfo.dateOfBirth
                    ? format(formData.personalInfo.dateOfBirth, "MMM dd, yyyy")
                    : "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {formData.professionalInfo.experience} years experience
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <UserRound className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground capitalize">
                  {formData.personalInfo.gender}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.languages.skills?.length > 0 ? (
                formData.languages.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills added.
                </p>
              )}
            </div>
          </div>

          {/* Languages Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.languages.languages?.length > 0 ? (
                formData.languages.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {language}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No languages specified.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Professional Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Professional Summary */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Professional Summary
            </h2>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-foreground leading-relaxed">
                {formData.professionalInfo.about}
              </p>
            </div>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Work Experience
            </h2>
            <div className="space-y-4">
              {formData.professionalInfo.workExperience.map(
                (experience, index) => (
                  <div
                    key={index}
                    className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {experience.jobTitle}
                      </h3>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1 sm:mb-0">
                        <Briefcase className="w-4 h-4" />
                        <span>{experience.companyName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {experience.startDate
                            ? `${format(
                                new Date(experience.startDate),
                                "MMM yyyy"
                              )} - ${
                                experience.currentlyWorking
                                  ? "Present"
                                  : experience.endDate
                                  ? format(
                                      new Date(experience.endDate),
                                      "MMM yyyy"
                                    )
                                  : "End date not specified"
                              }`
                            : "Duration not specified"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Education
            </h2>
            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {formData.education.highestDegree}
              </h3>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-1 sm:mb-0">
                  <Briefcase className="w-4 h-4" />
                  <span>{formData.education.instituteName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formData.education.startYear} -{" "}
                    {formData.education.endYear}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Agreements
            </h2>
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-foreground">
                    Terms and Conditions accepted
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-foreground">
                    Privacy Policy accepted
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
