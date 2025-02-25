import React from "react";
import Footer from "@/components/Footer";
import AdminTableHeader from "@/components/admin/TableHeading";
import AdminBookingsTable from "@/components/admin/BookingTable";

interface Booking {
  bookingNo: number;
  mentorName: string;
  dateTime: string;
  status: "Time Scheduled" | "Complete" | "Cancelled";
  amount: string;
}

const AdminBookings: React.FC = () => {
  const bookingsData: Booking[] = [
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

  return (
    <>
      <div className="pt-10 sm:px-12 not-sm:px-4">
        <AdminTableHeader
          heading="Bookings"
          searchPlaceholder="Search Bookings..."
        />
        <AdminBookingsTable bookingDetails={bookingsData} />
      </div>
      <Footer />
    </>
  );
};

export default AdminBookings;
