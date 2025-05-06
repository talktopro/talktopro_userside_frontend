import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import successTeam from "@/assets/backgrounds/successTeam.png"
import { ROUTES } from '@/routes/routes';

const NotFoundPage: React.FC = () => {
   const navigate = useNavigate();

   return (
      <div className="min-h-[80dvh] flex items-center justify-center px-4 pt-10 sm:px-6 lg:px-8">
         <div className="flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-6xl">
            <div className="lg:w-1/2 my-auto max-w-md mx-auto lg:mx-0">
               <h1 className="text-6xl sm:text-9xl text-center lg:text-left font-bold mb-2">404</h1>
               <h2 className="text-2xl sm:text-3xl text-center lg:text-left font-bold mb-3">Page Not Found</h2>
               <p className="text-sm sm:text-base text-center lg:text-left text-muted-foreground mb-8">
                  Oops! The page you're looking for doesn't exist or has been moved.
                  Maybe you can find what you need from our homepage.
               </p>
               <div className="flex justify-center lg:justify-start gap-4">
                  <Button
                     variant="ghost"
                     onClick={() => navigate(-1)}
                     className="px-6 w-1/2 text-sm sm:text-base font-medium text-purple-700 border rounded-lg hover:text-purple-500"
                  >
                     Go Back
                  </Button>
                  <Button
                     onClick={() => navigate(ROUTES.HOME)}
                     className="px-6 w-1/2 text-sm sm:text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-700"
                  >
                     Return Home
                  </Button>
               </div>
            </div>
            <div className="lg:w-1/2 flex items-center not-sm:hidden">
               <img
                  src={successTeam}
                  alt="Mentorship session"
                  className="rounded-lg shadow-lg object-cover w-full h-auto max-h-[500px]"
               />
            </div>
         </div>
      </div>
   );
};

export default NotFoundPage;