import React, { useEffect, useState } from "react";
import BookingsTable from "@/components/common/Table";
import BookingsHeader from "@/components/common/Header";
import SkeletonTable from "@/components/common/skeletons/Table";
import { NotebookText } from "lucide-react";
// import { toast } from "sonner";
import apiClient from "@/api/axiosInstance";
import { IBooking, IBookingQueryDetails } from "@/interfaces/user";

const Bookings: React.FC = () => {
  const [bookingHistory, setBookingHistory] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryDetails, setQueryDetails] = useState<IBookingQueryDetails>({
    page: 1,
    sort: "ascending",
  });

  const handleSortChange: (sort: "ascending" | "descending") => void = (
    sort
  ) => {
    setQueryDetails((prev) => ({ ...prev, sort }));
  };

  const fetchBookingHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<IBooking[]>(`url`, {
        params: queryDetails,
      });
      setBookingHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error occurred while fetching booking history!", error);
      // toast.error("Failed to collect booking history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingHistory();
  }, [queryDetails]);

  return (
    <>
      <div className="pt-8 sm:px-12 not-sm:px-4">
        <BookingsHeader
          showSelect={!isLoading && bookingHistory.length > 0}
          onSortChange={handleSortChange}
        />
        {isLoading ? (
          <SkeletonTable />
        ) : bookingHistory.length > 0 ? (
          <BookingsTable bookingDetails={bookingHistory} />
        ) : (
          <div className="flex flex-col justify-center items-center h-96">
            <NotebookText strokeWidth={1} size={50} className="opacity-60" />
            <p className="opacity-60 mt-3">No Result Found!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Bookings;
