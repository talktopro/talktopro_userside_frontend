import { Skeleton } from "@/components/ui/skeleton";

const MentorProfileSkeleton = () => {
   return (
      <div className="w-full min-h-screen p-5">
         <div className="w-full block sm:flex">
            {/* Profile Image Skeleton */}
            <div className="sm:min-w-[22%] max-w-[21rem] p-5 aspect-[3.5/4]">
               <Skeleton className="h-full w-full rounded-lg bg-muted animate-pulse" />
            </div>

            {/* Main Content Skeleton */}
            <div className="w-full sm:w-[80%] sm:p-5 not-sm:py-5 space-y-5">
               {/* Name and Profession */}
               <div className="space-y-2">
                  <Skeleton className="h-8 w-3/4 bg-muted animate-pulse" />
                  <Skeleton className="h-4 w-1/2 bg-muted animate-pulse" />
               </div>

               {/* Rating */}
               <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                     {[...Array(5)].map((_, i) => (
                        <Skeleton
                           key={i}
                           className="h-5 w-5 rounded-full bg-muted animate-pulse"
                        />
                     ))}
                  </div>
                  <Skeleton className="h-4 w-20 bg-muted animate-pulse" />
               </div>

               {/* Specializations */}
               <div className="space-y-2">
                  <Skeleton className="h-6 w-1/3 bg-muted animate-pulse" />
                  <div className="flex flex-wrap gap-2">
                     {[...Array(4)].map((_, i) => (
                        <Skeleton
                           key={i}
                           className="h-6 w-20 rounded-full bg-muted animate-pulse"
                        />
                     ))}
                  </div>
               </div>

               {/* Mobile Book Button */}
               <div className="not-sm:hidden">
                  <Skeleton className="h-10 w-full rounded-md bg-muted animate-pulse" />
               </div>
            </div>
         </div>

         <hr className="h-2 px-5 border-muted/20" />

         <div className="w-full block sm:flex flex-row-reverse">
            <div className="w-full sm:w-[80%] sm:p-5 sm:px-15 not-sm:pt-4 space-y-5">
               {/* About Section */}
               <div className="space-y-2">
                  <Skeleton className="h-6 w-1/4 bg-muted animate-pulse" />
                  <Skeleton className="h-4 w-full bg-muted animate-pulse" />
                  <Skeleton className="h-4 w-4/5 bg-muted animate-pulse" />
                  <Skeleton className="h-4 w-3/4 bg-muted animate-pulse" />
               </div>

               <Skeleton className="h-[1px] w-full bg-muted" />

               {/* Languages */}
               <div className="space-y-2">
                  <Skeleton className="h-6 w-1/4 bg-muted animate-pulse" />
                  <div className="flex flex-wrap gap-2">
                     {[...Array(3)].map((_, i) => (
                        <Skeleton
                           key={i}
                           className="h-6 w-16 rounded-full bg-muted animate-pulse"
                        />
                     ))}
                  </div>
               </div>

               <Skeleton className="h-[1px] w-full bg-muted" />

               {/* Skills & Expertise */}
               <div className="space-y-2">
                  <Skeleton className="h-6 w-1/3 bg-muted animate-pulse" />
                  <div className="flex flex-wrap gap-2">
                     {[...Array(6)].map((_, i) => (
                        <Skeleton
                           key={i}
                           className="h-6 w-24 rounded-full bg-muted animate-pulse"
                        />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MentorProfileSkeleton;