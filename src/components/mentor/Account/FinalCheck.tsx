import type React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { MentorFormData } from "@/pages/mentor/Account"
import { Badge } from "@/components/ui/Badge"
import { format } from "date-fns"
import { Mail, MapPin, Phone, Calendar, UserRound, Briefcase, CheckCircle } from "lucide-react"
import type { User } from "@/types/user"

interface FinalCheckProps {
   form: UseFormReturn<MentorFormData>
   user: User
}

export const FinalCheck: React.FC<FinalCheckProps> = ({ form, user }) => {
   const formData = form.getValues();
   const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

   return (
      <div>
         <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3">

               <div className="mb-8">
                  <div className="w-auto h-32 rounded-md overflow-hidden aspect-[3.5/4] relative mr-4 not-sm:mr-0 bg-background border">
                     <img
                        src={`https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${user.profileImg}`}
                        alt="Profile picture"
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <h1 className="text-xl font-semibold">{formData.personalInfo.fullName}</h1>
                  <p className="text-muted-foreground">{formData.professionalInfo.profession}</p>
               </div>

               <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                     <Mail className="w-4 h-4" />
                     <span className="text-sm">{formData.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                     <MapPin className="w-4 h-4" />
                     <span className="text-sm">{formData.personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                     <Phone className="w-4 h-4" />
                     <span className="text-sm">{formData.personalInfo.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                     <Calendar className="w-4 h-4" />
                     <span className="text-sm">
                        {formData.personalInfo.dateOfBirth
                           ? format(formData.personalInfo.dateOfBirth, "MMM dd, yyyy")
                           : "Not specified"}
                     </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                     <Briefcase className="w-4 h-4" />
                     <span className="text-sm">{formData.professionalInfo.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                     <UserRound className="w-4 h-4" />
                     <span className="text-sm capitalize">{formData.personalInfo.gender}</span>
                  </div>
               </div>

               {/* Skills Section */}
               <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                     {formData.skillsAndTerms.skills.map((skill, index) => (
                        <Badge key={index} className="bg-muted text-xs text-accent-foreground">
                           {skill}
                        </Badge>
                     ))}
                  </div>
               </div>

               {/* Languages Section */}
               <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-1">
                     {formData.skillsAndTerms.languages.map((language, index) => (
                        <Badge key={index} variant="outline" className="bg-muted text-xs">
                           {language}
                        </Badge>
                     ))}
                  </div>
               </div>
            </div>

            <div className="lg:w-2/3 pl-0 sm:pl-2">
               <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
                  <p className="text-muted-foreground">{formData.professionalInfo.about}</p>
               </section>

               {/* Work Experience */}
               <section className="mb-6">
                  <h2 className="text-lg font-semibold mb-1">Work Experience</h2>
                  <div className="space-y-1">
                     {formData.professionalInfo.workExperience.map((experience, index) => (
                        <div key={index} className="border-l-2 relative rounded-xl bg-muted/50 p-2 px-4">

                           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                              <h3 className="font-semibold">{experience.jobTitle}</h3>
                           </div>

                           <div className="flex flex-col lg:flex-row lg:justify-between text-sm text-muted-foreground">
                              <span>{experience.companyName}</span>
                              <div className="flex items-center gap-2 mt-1 lg:mt-0">
                                 <Calendar className="w-4 h-4" />
                                 <span>
                                    {/* {experience.startDate.toString()} - {experience.endDate.toString()} */}
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Education */}
               <section className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Education</h2>
                  <div className="border-l-2 relative rounded-xl bg-muted/50 p-2 px-4">
                     <h3 className="font-semibold">{formData.education.highestDegree}</h3>
                     <div className="flex flex-col lg:flex-row lg:justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                           <Briefcase className="w-4 h-4" />
                           <span>{formData.education.instituteName}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 lg:mt-0">
                           <Calendar className="w-4 h-4" />
                           <span>
                              {formData.education.startYear} - {formData.education.endYear}
                           </span>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Terms & Conditions */}
               <section className="mb-8">
                  <div className="bg-muted/50 rounded-lg p-4">
                     <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                           <CheckCircle className="w-4 h-4 text-green-600" />
                           <span>Terms and Conditions accepted</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <CheckCircle className="w-4 h-4 text-green-600" />
                           <span>Privacy Policy accepted</span>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </div>
      </div>
   )
}
