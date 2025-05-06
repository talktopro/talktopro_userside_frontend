import {
   Table,
   TableBody,
   TableCell,
   TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const PerDayBookingsSkeleton = () => {
   const skeletonRows = Array(10).fill(null);

   return (
      <Table>
         <TableBody>
            {skeletonRows.map((_, index) => (
               <TableRow key={index}>
                  {/* Mentor Column Skeleton */}
                  <TableCell>
                     <div className="flex items-center">
                        <Skeleton className="w-10 h-10 rounded-md aspect-[3.5/4] bg-muted pulse" />
                        <div className="ml-2">
                           <Skeleton className="w-20 h-4 mb-1 bg-muted pulse" />
                           <Skeleton className="w-24 h-3 bg-muted pulse" />
                        </div>
                     </div>
                  </TableCell>

                  {/* Time Column Skeleton */}
                  <TableCell className="text-center">
                     <Skeleton className="w-32 h-6 mx-auto rounded-2xl bg-muted pulse" />
                  </TableCell>

                  {/* Client Column Skeleton */}
                  <TableCell>
                     <div className="flex items-center justify-end">
                        <div className="mr-2">
                           <Skeleton className="w-20 h-4 mb-1 ml-auto bg-muted pulse" />
                           <Skeleton className="w-24 h-3 ml-auto bg-muted pulse" />
                        </div>
                        <Skeleton className="w-10 h-10 rounded-md aspect-[3.5/4] bg-muted pulse" />
                     </div>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};

export default PerDayBookingsSkeleton;