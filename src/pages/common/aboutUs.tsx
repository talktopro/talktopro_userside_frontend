import React from 'react';
import successTeam from "@/assets/backgrounds/successTeam.png"
import { CircleDollarSign, Clock, LayoutPanelTop, ShieldCheck } from 'lucide-react';
import TeamSection from '@/components/common/TeamSection';

const AboutUs: React.FC = () => {
   return (
      <div className="min-h-screen pt-12 md:pt-15 px-4 sm:px-6 lg:px-8">
         <div className="mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16">
               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">About TalkToPro</h1>
               <div className="w-20 sm:w-24 h-1 bg-purple-600 mx-auto mb-6 sm:mb-8"></div>
               <p className="text-muted-foreground max-w-3xl mx-auto">
                  TalkToPro is a revolutionary platform connecting students and career aspirants with verified professionals across various fields for 1-on-1 mentorship sessions. We bridge the gap between academic knowledge and real-world career insights.
               </p>
            </div>

            {/* Main Content with Image */}
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-12 md:mb-16">
               <div className="lg:w-1/2">
                  <img
                     src={successTeam}
                     alt="Mentorship session"
                     className="rounded-lg shadow-lg object-cover w-full h-auto"
                  />
               </div>
               <div className="lg:w-1/2 my-auto">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Our Mission</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                     We're addressing the critical gap in career guidance that leads to unemployment and mismatched careers. Many graduates in India, especially Kerala, face confusion about their future due to lack of real-world insights about their chosen fields.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground">
                     TalkToPro connects them with experienced professionals who can provide genuine, practical advice about career paths, job markets, and industry expectations - helping them make informed decisions about their future.
                  </p>
               </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="lg:max-w-6xl mx-auto">
               <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">Why TalkToPro Works</h2>
                  <div className="w-20 sm:w-24 h-1 bg-purple-600 mx-auto"></div>
               </div>

               <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Verified Professionals */}
                  <div className="flex items-start">
                     <div className="bg-muted p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <ShieldCheck className='w-5 h-5 text-purple-600' />
                     </div>
                     <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Verified Professionals</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                           Every mentor undergoes manual verification by our team to ensure authenticity and quality of guidance.
                        </p>
                     </div>
                  </div>

                  {/* Diverse Fields */}
                  <div className="flex items-start">
                     <div className="bg-muted p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <LayoutPanelTop className='w-5 h-5 text-purple-600' />
                     </div>
                     <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Diverse Fields</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                           From Engineering and Medicine to Arts and Civil Services - find mentors across all career paths.
                        </p>
                     </div>
                  </div>

                  {/* Flexible Scheduling */}
                  <div className="flex items-start">
                     <div className="bg-muted p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <Clock className='w-5 h-5 text-purple-600' />
                     </div>
                     <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Flexible Scheduling</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                           Mentors set their own availability, making it convenient for both parties to connect at suitable times.
                        </p>
                     </div>
                  </div>

                  {/* Secure Payments */}
                  <div className="flex items-start">
                     <div className="bg-muted p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                        <CircleDollarSign className='w-5 h-5 text-purple-600' />
                     </div>
                     <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Secure Payments</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                           Our integrated payment system ensures safe transactions for both mentors and mentees.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Problem Statement Section */}
            <div className="mt-12 sm:mt-16 md:mt-20 bg-muted rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">
               <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">The Problem We're Solving</h2>
               <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                     In India, particularly Kerala, we're witnessing a growing trend of educated unemployment where degree holders end up in jobs unrelated to their studies or remain unemployed. This stems from:
                  </p>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                     <li>Lack of real-world career insights during education</li>
                     <li>Over-reliance on social media perceptions about careers</li>
                     <li>Misleading promises from educational institutions</li>
                     <li>No access to genuine professionals for guidance</li>
                     <li>Pressure to follow trending courses without proper understanding</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                     TalkToPro provides the missing link - direct access to professionals who can share authentic experiences and practical advice about their fields.
                  </p>
               </div>
            </div>
         </div>
         <TeamSection />
      </div>
   );
};

export default AboutUs;