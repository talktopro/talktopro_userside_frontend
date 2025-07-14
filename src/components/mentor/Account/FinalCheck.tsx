import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { MentorFormData } from '@/pages/mentor/Account';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import { CheckCircle, User, Briefcase, GraduationCap, Award } from 'lucide-react';

interface FinalCheckProps {
   form: UseFormReturn<MentorFormData>;
}

export const FinalCheck: React.FC<FinalCheckProps> = ({ form }) => {
   const formData = form.getValues();

   return (
      <div className="space-y-6">
         <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
               <div className="bg-primary/10 p-3 rounded-full">
                  <CheckCircle className="h-8 w-8 text-primary" />
               </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Review Your Information</h3>
            <p className="text-muted-foreground">Please review all the information before submitting your mentor registration</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-form-background border-form-border">
               <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                     <User className="h-5 w-5 text-primary" />
                     Personal Information
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-3">
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Full Name:</span>
                     <p className="text-foreground">{formData.personalInfo.fullName}</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Email:</span>
                     <p className="text-foreground">{formData.personalInfo.email}</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Phone:</span>
                     <p className="text-foreground">{formData.personalInfo.phoneNumber}</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Date of Birth:</span>
                     <p className="text-foreground">
                        {formData.personalInfo.dateOfBirth
                           ? format(formData.personalInfo.dateOfBirth, 'MMMM dd, yyyy')
                           : 'Not specified'
                        }
                     </p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Gender:</span>
                     <p className="text-foreground capitalize">{formData.personalInfo.gender}</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Location:</span>
                     <p className="text-foreground">{formData.personalInfo.location}</p>
                  </div>
               </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="bg-form-background border-form-border">
               <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                     <Briefcase className="h-5 w-5 text-primary" />
                     Professional Information
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-3">
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Profession:</span>
                     <p className="text-foreground">{formData.professionalInfo.profession}</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Experience:</span>
                     <p className="text-foreground">{formData.professionalInfo.yearsOfExperience} years</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">About:</span>
                     <p className="text-foreground text-sm leading-relaxed">{formData.professionalInfo.about}</p>
                  </div>
               </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-form-background border-form-border">
               <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                     <GraduationCap className="h-5 w-5 text-primary" />
                     Education
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-3">
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Highest Degree:</span>
                     <p className="text-foreground">{formData.education.highestDegree}</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Institute:</span>
                     <p className="text-foreground">{formData.education.instituteName}</p>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground">Duration:</span>
                     <p className="text-foreground">{formData.education.startYear} - {formData.education.endYear}</p>
                  </div>
               </CardContent>
            </Card>

            {/* Skills & Languages */}
            <Card className="bg-form-background border-form-border">
               <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                     <Award className="h-5 w-5 text-primary" />
                     Skills & Languages
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <span className="text-sm font-medium text-muted-foreground block mb-2">Skills:</span>
                     <div className="flex flex-wrap gap-2">
                        {formData.skillsAndTerms.skills.map((skill, index) => (
                           <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                           </Badge>
                        ))}
                     </div>
                  </div>
                  <div>
                     <span className="text-sm font-medium text-muted-foreground block mb-2">Languages:</span>
                     <div className="flex flex-wrap gap-2">
                        {formData.skillsAndTerms.languages.map((language, index) => (
                           <Badge key={index} variant="outline" className="text-xs">
                              {language}
                           </Badge>
                        ))}
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Work Experience */}
         <Card className="bg-form-background border-form-border">
            <CardHeader className="pb-4">
               <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Work Experience
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {formData.professionalInfo.workExperience.map((experience, index) => (
                     <div key={index} className="border border-border rounded-lg p-4 bg-background">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <span className="text-sm font-medium text-muted-foreground">Job Title:</span>
                              <p className="text-foreground">{experience.jobTitle}</p>
                           </div>
                           <div>
                              <span className="text-sm font-medium text-muted-foreground">Company:</span>
                              <p className="text-foreground">{experience.companyName}</p>
                           </div>
                           <div>
                              <span className="text-sm font-medium text-muted-foreground">Start Date:</span>
                              <p className="text-foreground">{experience.startDate}</p>
                           </div>
                           <div>
                              <span className="text-sm font-medium text-muted-foreground">End Date:</span>
                              <p className="text-foreground">{experience.endDate}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Terms Acceptance */}
         <Card className="bg-muted/50 border-border">
            <CardContent className="pt-6">
               <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                     <h4 className="text-sm font-medium text-foreground mb-2">Terms & Conditions</h4>
                     <div className="space-y-1 text-sm text-muted-foreground">
                        <p>✓ I have accepted the Terms and Conditions</p>
                        <p>✓ I have accepted the Privacy Policy</p>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Final Note */}
         <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-3">
               <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
               </div>
               <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Ready to Submit</h4>
                  <p className="text-sm text-muted-foreground">
                     Please review all the information above. Once you submit your registration, our team will review your profile and get back to you within 2-3 business days.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};