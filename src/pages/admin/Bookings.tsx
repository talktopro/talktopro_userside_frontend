import apiClient from "@/api/axiosInstance";
import AdminBookingTable from "@/components/admin/BookingTable";
import AdminTableHeader from "@/components/admin/TableHeading";
import SkeletonTable from "@/components/common/skeletons/Table";
import { IBooking, IQueryDetails } from "@/interfaces/admin";
import { NotebookText } from "lucide-react";
import { useEffect, useState } from "react";
// import { toast } from "sonner";

const MentorsTable = () => {
  const [bookingHistory, setBookingHistory] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryDetails, setQueryDetails] = useState<IQueryDetails>({
    page: 1,
    sort: "ascending",
    search: "",
  });

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

  const handleSortChange: (sort: "ascending" | "descending") => void = (
    sort
  ) => {
    setQueryDetails((prev) => ({ ...prev, sort }));
  };

  const handleSearch: (val: string) => void = (search) => {
    setQueryDetails((prev) => ({ ...prev, search }));
  };

  return (
    <div className="px-4 max-w-screen">
      <AdminTableHeader
        heading="Bookings"
        searchPlaceholder="Search Bookings..."
        handleSort={handleSortChange}
        handleSearch={handleSearch}
        showSelect={!isLoading && bookingHistory.length > 0}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : bookingHistory.length > 0 ? (
        <AdminBookingTable bookingsData={bookingHistory} />
      ) : (
        <div className="flex flex-col justify-center items-center h-96">
          <NotebookText strokeWidth={1} size={50} className="opacity-60" />
          <p className="opacity-60 mt-3">No Result Found!</p>
        </div>
      )}
    </div>
  );
};

export default MentorsTable;
