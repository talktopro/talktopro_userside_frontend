import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { format } from "date-fns";
import convert24To12HourRange from "@/utils/convertTo12HourFormat";
import BookingDetails from "./BookingDetails";
import { IMentorBookingHistory } from "@/types/mentor";
import StatusBadge from "@/components/common/StatusBadge";

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
          <TableHead className="whitespace-nowrap lg:pl-10 xl:pl:10">
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
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">
        {bookingDetails.map((booking, index) => (
          <Drawer key={booking._id}>
            <DrawerTrigger asChild>
              <TableRow className="cursor-pointer">
                <TableCell className="py-3 w-24 whitespace-nowrap text-center">
                  {(currentPage - 1) * limit + index + 1}
                </TableCell>
                <TableCell className="lg:pl-10 xl:pl-10 py-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden aspect-[3.5/4]">
                      <img
                        src={`https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${booking.user.profileImg}`}
                        alt="Profile picture"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/default-profile.png";
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold whitespace-nowrap">{`${booking.user.uname}`}</p>
                      <p className="text-muted-foreground text-sm whitespace-nowrap">
                        {booking.user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 w-48 text-center whitespace-nowrap">
                  <p className="font-semibold">{convert24To12HourRange(booking.slot.time)}</p>
                  <p className="text-muted-foreground">{format(booking.slot.date, "dd-MM-yyyy")}</p>
                </TableCell>
                <TableCell className="pt-5 w-48 flex justify-center items-center whitespace-nowrap">
                  <StatusBadge status={booking.status} />
                </TableCell>
                <TableCell className="py-3 w-48 text-center whitespace-nowrap">
                  ₹{booking.slot.fee.toFixed(2)}
                </TableCell>
              </TableRow>
            </DrawerTrigger>
            <DrawerContent>
              <BookingDetails booking={booking} />
            </DrawerContent>
          </Drawer>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;
