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
import { IBookingHistory } from "@/types/user";
import { format } from "date-fns";
import convert24To12HourRange from "@/utils/convertTo12HourFormat";
import BookingDetails from "./BookingDetails";
import useBookings from "@/hooks/useBookings";
import StatusBadge from "@/components/common/StatusBadge";

interface BookingsTableProps {
  bookingDetails: IBookingHistory[];
  currentPage: number;
  limit: number;
  handleCancellationComplete: () => void
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookingDetails, currentPage, limit, handleCancellationComplete }) => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const { openBookingDetailsId, setOpenBookingDetailsId } = useBookings({ from: "user" });

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="whitespace-nowrap w-24 text-center">
            Booking No
          </TableHead>
          <TableHead className="whitespace-nowrap flex-grow lg:pl-10 xl:pl:10">
            Mentor
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Date & Time
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Booking Status
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookingDetails.map((booking, index) => (
          <Drawer
            key={booking._id}
            open={openBookingDetailsId === booking._id}
            onOpenChange={(open) => {
              if (open) {
                setOpenBookingDetailsId(booking._id);
              } else {
                setOpenBookingDetailsId(null);
              }
            }}
          >
            <DrawerTrigger asChild>
              <TableRow className="cursor-pointer">
                <TableCell className="w-24 text-center py-4">
                  {(currentPage - 1) * limit + index + 1}
                </TableCell>
                <TableCell className="lg:pl-10 xl:pl-10 py-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden aspect-[3.5/4]">
                      <img
                        src={`https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${booking.mentor.profileImg}`}
                        alt="Profile picture"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/default-profile.png";
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold whitespace-nowrap">{`${booking.mentor.first_name} ${booking.mentor.last_name}`}</p>
                      <p className="text-muted-foreground text-sm whitespace-nowrap">
                        {booking.mentor.profession}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-48 text-center py-4">
                  <p className="font-semibold whitespace-nowrap">
                    {convert24To12HourRange(booking.slot.time)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {format(new Date(booking.slot.date), "dd-MM-yyyy")}
                  </p>
                </TableCell>
                <TableCell className="w-48 text-center py-4">
                  <div className="flex justify-center">
                    <StatusBadge status={booking.status} />
                  </div>
                </TableCell>
                <TableCell className="w-48 text-center py-4">
                  ₹{booking.slot.fee.toFixed(2)}
                </TableCell>
              </TableRow>
            </DrawerTrigger>
            <DrawerContent>
              <BookingDetails
                booking={booking}
                handleCancellationComplete={handleCancellationComplete}
              />
            </DrawerContent>
          </Drawer>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingsTable;
