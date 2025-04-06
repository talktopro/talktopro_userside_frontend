import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../common/Badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import CustomTooltip from "../common/CustomTooltip";
import { ChevronDown } from "lucide-react";
import { FC } from "react";
import { IBooking } from "@/interfaces/admin";

interface IAdminBookinHistoryProps {
  bookingsData: IBooking[];
}

const AdminBookingTable: FC<IAdminBookinHistoryProps> = ({ bookingsData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="whitespace-nowrap w-24 text-center">
            Booking No
          </TableHead>
          <TableHead className="whitespace-nowrap flex-grow lg:pl-20 xl:pl-20">
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
          <TableHead className="whitespace-nowrap w-12" />
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">
        {bookingsData.map((booking: IBooking, index: number) => (
          <TableRow key={index}>
            <TableCell className="py-3 w-24 whitespace-nowrap text-center">
              {booking.bookingNo}
            </TableCell>
            <TableCell className="py-3 lg:pl-20 xl:pl-20 flex-grow whitespace-nowrap">
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
                  <CustomTooltip
                    trigger={<ChevronDown className="h-4 w-4" />}
                    content="Expand"
                  />
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
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminBookingTable;
