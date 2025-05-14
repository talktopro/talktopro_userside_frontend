import apiClient from "@/api/axiosInstance";
import { IBookingQueryDetails } from "@/interfaces/user";
import { IMentorBookingHistory, IMentorBookingHistoryApiResponse } from "@/types/mentor";
import { IBookingHistory, IBookingHistoryApiResponse } from "@/types/user";
import { useState } from "react";
import { toast } from "sonner";

type BookingType = 'user' | 'mentor';

type BookingApiResponse<T extends BookingType> = T extends "user"
   ? IBookingHistoryApiResponse
   : IMentorBookingHistoryApiResponse;

type BookingData<T extends BookingType> = T extends "user"
   ? IBookingHistory[]
   : IMentorBookingHistory[];

const useBookings = <T extends BookingType>({ from }: { from: T }) => {
   const [bookingHistory, setBookingHistory] = useState<BookingData<T>>([] as BookingData<T>);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [totalPage, setTotalPage] = useState<number>(1);
   const [queryDetails, setQueryDetails] = useState<IBookingQueryDetails>({
      page: 1,
      sort: "NewestToOldest",
      limit: 10,
   });

   const fetchBookingHistory = async () => {
      try {
         setIsLoading(true);
         const apiUrl = from === "user" ? `/bookings` : `/mentor/bookings`;

         const { data } = await apiClient.get<BookingApiResponse<T>>(apiUrl, {
            params: queryDetails
         });

         setBookingHistory(data.body.bookings as BookingData<T>);
         setTotalPage(data.body.total_pages || 1);
      } catch (error) {
         console.error("Error occurred while fetching booking history!", error);
         toast.error("Failed to collect booking history. Please try again later.");
      } finally {
         setIsLoading(false);
      }
   };

   const handleSortChange = (sort: "NewestToOldest" | "OldestToNewest") => {
      setQueryDetails((prev) => ({ ...prev, sort }));
   };

   const handleChangeCurrentPage = (page: number) => {
      setQueryDetails((prev) => ({ ...prev, page }));
   };

   const handleCancelBooking = async (bookingId: string, reason: string): Promise<boolean> => {
      try {
         await apiClient.patch(`/bookings/${bookingId}/cancel`,
            { reason: reason },
            { params: { booking_id: bookingId } });

         setBookingHistory((prev) => (
            prev.map((booking) => (
               (booking as IBookingHistory)._id === bookingId
                  ? { ...booking, payment_status: "refund_pending", status: "cancelled" }
                  : booking
            )) as BookingData<T>
         ));
         return true;
      } catch (error) {
         toast.error("Failed to cancel booking");
         console.log("Failed to cancel booking", error);
         return false;
      };
   };

   return {
      bookingHistory,
      isLoading,
      totalPage,
      queryDetails,
      handleSortChange,
      handleChangeCurrentPage,
      fetchBookingHistory,
      handleCancelBooking,
   };
};

export default useBookings;