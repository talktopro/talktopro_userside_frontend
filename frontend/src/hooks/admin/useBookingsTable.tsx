import CustomTooltip from "@/components/common/CustomTooltip";
import { Badge } from "@/components/ui/Badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TableCell, TableRow } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IBooking } from "@/interfaces/admin";
import { ChevronDown } from "lucide-react";
import React, { JSX } from "react";

const useMentorsTable = () => {
  const bookingsData: IBooking[] = [
    {
      bookingNo: 1,
      mentorName: "Cristiano Ronaldo",
      dateTime: "2023-10-15 10:00 AM",
      status: "Time Scheduled",
      amount: "₹8,000",
    },
    {
      bookingNo: 2,
      mentorName: "Luka Modric",
      dateTime: "2023-10-16 02:00 PM",
      status: "Complete",
      amount: "₹7,500",
    },
    {
      bookingNo: 3,
      mentorName: "Sergio Ramos",
      dateTime: "2023-10-17 11:30 AM",
      status: "Cancelled",
      amount: "₹9,000",
    },
    {
      bookingNo: 4,
      mentorName: "Karim Benzema",
      dateTime: "2023-10-18 04:00 PM",
      status: "Time Scheduled",
      amount: "₹6,500",
    },
    {
      bookingNo: 5,
      mentorName: "Toni Kroos",
      dateTime: "2023-10-19 09:30 AM",
      status: "Complete",
      amount: "₹7,800",
    },
    {
      bookingNo: 6,
      mentorName: "Marcelo",
      dateTime: "2023-10-20 01:00 PM",
      status: "Cancelled",
      amount: "₹6,200",
    },
    {
      bookingNo: 7,
      mentorName: "Casemiro",
      dateTime: "2023-10-21 10:45 AM",
      status: "Time Scheduled",
      amount: "₹7,200",
    },
    {
      bookingNo: 8,
      mentorName: "Isco",
      dateTime: "2023-10-22 03:30 PM",
      status: "Complete",
      amount: "₹5,900",
    },
    {
      bookingNo: 9,
      mentorName: "Keylor Navas",
      dateTime: "2023-10-23 02:15 PM",
      status: "Cancelled",
      amount: "₹6,800",
    },
    {
      bookingNo: 10,
      mentorName: "Dani Carvajal",
      dateTime: "2023-10-24 12:00 PM",
      status: "Time Scheduled",
      amount: "₹6,000",
    },
  ];

  const tableTitle: { label: string | null; className: string }[] = [
    { label: "Booking No", className: "whitespace-nowrap w-24 text-center" },
    {
      label: "Mentor Name",
      className: "whitespace-nowrap flex-grow lg:pl-20 xl:pl:20",
    },
    { label: "Date & Time", className: "whitespace-nowrap w-48 text-center" },
    {
      label: "Booking Status",
      className: "whitespace-nowrap w-48 text-center",
    },
    { label: "Amount", className: "whitespace-nowrap w-48 text-center" },
  ];

  const tableRows: JSX.Element[] = bookingsData.map((booking, index) => {
    return (
      <React.Fragment key={index}>
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
                  <CustomTooltip
                    trigger={<ChevronDown className="h-4 w-4" />}
                    content="Expand"
                  />
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
    );
  });

  return {
    bookingsData,
    tableTitle,
    tableRows,
  };
};

export default useMentorsTable;
