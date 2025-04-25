import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import PerDayBookingsRow from "./PerDayBookingsRow";
import { FC } from "react";
import PerDayBookingsSkeleton from "@/components/common/skeletons/PerBookings";

interface IPerDayBookingsProps {
   isPerDayBookingsLoading: boolean;
};

const PerDayBookings: FC<IPerDayBookingsProps> = ({ isPerDayBookingsLoading }) => {
   return (
      <div className="rounded-lg border">
         <Table>
            <TableHeader className="sticky top-0 hover:bg-transparent rounded-3xl">
               <TableRow>
                  <TableHead className="text-left">Mentor</TableHead>
                  <TableHead className="text-center">Time</TableHead>
                  <TableHead className="text-right">Client</TableHead>
               </TableRow>
            </TableHeader>
         </Table>
         <div className="h-80 overflow-auto custom-scrollbar">
            {isPerDayBookingsLoading ? (
               <PerDayBookingsSkeleton />
            ) : (
               <Table>
                  <TableBody>
                     {Array(10).fill(null).map((_, i) => (
                        <PerDayBookingsRow key={i} />
                     ))}
                  </TableBody>
               </Table>
            )}
         </div>
      </div>
   );
};

export default PerDayBookings;