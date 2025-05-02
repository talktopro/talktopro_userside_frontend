import React, { useEffect, useState } from "react";
import { IBookingQueryDetails } from "@/interfaces/mentor";
import apiClient from "@/api/axiosInstance";
import { toast } from "sonner";
import SkeletonTable from "@/components/common/skeletons/Table";
import { NotebookText } from "lucide-react";
import BookingsHeader from "@/components/common/BookingTableHeader";
import BookingsTable from "@/components/mentor/booking/BookingsTable";
import CustomPagination from "@/components/common/CustomPagination";
import { IMentorBookingHistory, IMentorBookingHistoryApiResponse } from "@/types/mentor";

const Bookings: React.FC = () => {
  const [bookingHistory, setBookingHistory] = useState<IMentorBookingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [queryDetails, setQueryDetails] = useState<IBookingQueryDetails>({
    page: 1,
    sort: "NewestToOldest",
    limit: 10,
  });

  const handleSortChange: (sort: "NewestToOldest" | "OldestToNewest") => void = (
    sort
  ) => {
    setQueryDetails((prev) => ({ ...prev, sort }));
  };

  const fetchBookingHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<IMentorBookingHistoryApiResponse>(`/mentor/bookings`, {
        params: queryDetails,
      });
      setBookingHistory(Array.isArray(data.body.bookings) ? data.body.bookings : []);
      setTotalPage(data.body.total_pages || 0);
    } catch (error) {
      console.error("Error occurred while fetching booking history!", error);
      toast.error("Failed to collect booking history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingHistory();
  }, [queryDetails]);

  const handleChangeCurrentPage = (page: number): void => {
    setQueryDetails((prev: IBookingQueryDetails) => ({ ...prev, page: page }));
  };

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
          <NotebookText strokeWidth={1} size={50} className="opacity-60" />
          <p className="opacity-60 mt-3">No Result Found!</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
