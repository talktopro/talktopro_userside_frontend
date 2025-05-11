import React, { useEffect } from "react";
import BookingsTable from "@/components/user/booking/BookingsTable";
import BookingsHeader from "@/components/common/BookingTableHeader";
import SkeletonTable from "@/components/common/skeletons/Table";
import { NotebookText } from "lucide-react";
import CustomPagination from "@/components/common/CustomPagination";
import useBookings from "@/hooks/useBookings";

const Bookings: React.FC = () => {

  const {
    bookingHistory,
    isLoading,
    totalPage,
    queryDetails,
    handleCancellationComplete,
    handleSortChange,
    handleChangeCurrentPage,
    fetchBookingHistory,
  } = useBookings({ from: "user" });

  useEffect(() => {
    fetchBookingHistory();
  }, [queryDetails]);


  return (
    <div className="pt-8 sm:px-12 not-sm:px-4">
      <BookingsHeader
        showSelect={!isLoading && bookingHistory.length > 0}
        onSortChange={handleSortChange}
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
            handleCancellationComplete={handleCancellationComplete}
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
