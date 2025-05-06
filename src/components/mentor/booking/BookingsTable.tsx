import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import convert24To12HourRange from "@/utils/convertTo12HourFormat";
import CustomTooltip from "@/components/common/CustomTooltip";
import BookingDetails from "./BookingDetails";
import { IMentorBookingHistory } from "@/types/mentor";

interface BookingsTableProps {
  bookingDetails: IMentorBookingHistory[];
  currentPage: number;
  limit: number;
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookingDetails, currentPage, limit }) => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="whitespace-nowrap w-24 text-center">
            Booking No
          </TableHead>
          <TableHead className="whitespace-nowrap flex-grow lg:pl-10 xl:pl:10">
            Client
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Date & Time
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Session status
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Amount
          </TableHead>
          <TableHead className="whitespace-nowrap w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">
        {bookingDetails.map((booking, index) => (
          <React.Fragment key={booking._id}>
            <TableRow>
              <TableCell className="py-3 w-24 whitespace-nowrap text-center">
                {(currentPage - 1) * limit + index + 1}
              </TableCell>
              <TableCell className="py-3 lg:pl-10 xl:pl:10 flex-grow whitespace-nowrap min-w-sm ">
                <div className="flex items-center">
                  <div className="w-auto h-12 rounded-md overflow-hidden aspect-[3.5/4]">
                    <img
                      src={`https://${bucketName}.s3.amazonaws.com/${booking.user.profileImg}`}
                      alt="Profile picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{booking.user.uname}</p>
                    <p className="text-muted-foreground">{booking.user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-3 w-48 text-center whitespace-nowrap">
                <p className="font-semibold">{convert24To12HourRange(booking.slot.time)}</p>
                <p className="text-muted-foreground">{format(booking.slot.date, "dd-MM-yyyy")}</p>
              </TableCell>
              <TableCell className="pt-5 w-48 flex justify-center items-center whitespace-nowrap">
                <Badge
                  content={booking.status}
                  background={
                    booking.status === "pending"
                      ? "Yellow"
                      : booking.status === "success"
                        ? "Green"
                        : "Red"
                  }
                />
              </TableCell>
              <TableCell className="py-3 w-48 text-center whitespace-nowrap">
                {booking.slot.fee}
              </TableCell>
              <TableCell className="py-3 w-12 whitespace-nowrap">
                <Drawer>
                  <DrawerTrigger>
                    <TooltipProvider>
                      <CustomTooltip
                        content="Expand"
                        trigger={<ChevronDown className="h-4 w-4" />}
                      />
                    </TooltipProvider>
                  </DrawerTrigger>
                  <DrawerContent>
                    <BookingDetails booking={booking} />
                  </DrawerContent>
                </Drawer>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;
