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
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IBooking } from "@/interfaces/user";

interface BookingsTableProps {
  bookingDetails: IBooking[];
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookingDetails }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="whitespace-nowrap w-24 text-center">
            Booking No
          </TableHead>
          <TableHead className="whitespace-nowrap flex-grow lg:pl-20 xl:pl:20">
            Mentor Name
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
          <TableHead className="whitespace-nowrap w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">
        {bookingDetails.map((booking) => (
          <React.Fragment key={booking.bookingNo}>
            <TableRow>
              <TableCell className="py-3 w-24 whitespace-nowrap text-center">
                {booking.bookingNo}
              </TableCell>
              <TableCell className="py-3 lg:pl-20 xl:pl:20 flex-grow whitespace-nowrap">
                {booking.mentorName}
              </TableCell>
              <TableCell className="py-3 w-48 text-center whitespace-nowrap">
                {booking.dateTime}
              </TableCell>
              <TableCell className="py-3 w-48 flex justify-center whitespace-nowrap">
                <Badge
                  content={booking.status}
                  background={
                    booking.status === "Time Scheduled"
                      ? "Yellow"
                      : booking.status === "Complete"
                      ? "Green"
                      : "Red"
                  }
                />
              </TableCell>
              <TableCell className="py-3 w-48 text-center whitespace-nowrap">
                {booking.amount}
              </TableCell>
              <TableCell className="py-3 w-12 whitespace-nowrap">
                <Drawer>
                  <DrawerTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="bg-transparent p-2 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white border-1 border-gray-200 text-black">
                          <p>Expand</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[90vh]">
                    <DrawerHeader>
                      <DrawerTitle className="text-center my-5">
                        Display all the booking details
                      </DrawerTitle>
                    </DrawerHeader>
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
