import React, { useEffect } from "react";
import SkeletonTable from "@/components/common/skeletons/Table";
import { NotebookText } from "lucide-react";
import BookingsHeader from "@/components/common/BookingTableHeader";
import BookingsTable from "@/components/mentor/booking/BookingsTable";
import CustomPagination from "@/components/common/CustomPagination";
import useBookings from "@/hooks/useBookings";
import { useSocket } from "@/contexts/socket";

const Bookings: React.FC = () => {

  const io = useSocket();
  const {
    bookingHistory,
    isLoading,
    totalPage,
    queryDetails,
    handleSortChange,
    handleChangeCurrentPage,
    fetchBookingHistory,
  } = useBookings({ from: "mentor" });


  useEffect(() => {
    if (io) {
      io.on("newBooking", () => {
        fetchBookingHistory();
      });
    };

    return () => {
      if (io) {
        io.off("newBooking");
      }
    };
  }, [io]);

  useEffect(() => {
    fetchBookingHistory();
  }, [queryDetails]);

  return (
    <div className="p-4 max-w-screen">
      <BookingsHeader
        onSortChange={handleSortChange}
        showSelect={!isLoading && bookingHistory.length > 0}
        sort={queryDetails.sort}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : bookingHistory.length > 0 ? (
        <div className="min-h-96 flex flex-col justify-between items-end">
          <BookingsTable
            bookingDetails={bookingHistory}
            currentPage={queryDetails.page}
            limit={queryDetails.limit}
          />
          {totalPage > 1 && (
            <CustomPagination
              currentPage={queryDetails.page}
              onChange={handleChangeCurrentPage}
              totalPage={totalPage}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-96">
          <NotebookText strokeWidth={1} size={50} className="text-muted-foreground" />
          <p className="text-muted-foreground mt-3">No Result Found!</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
