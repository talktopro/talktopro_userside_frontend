import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import {
  IMentorDetailsWithSlots,
  IRazorpayOptions,
  IRazorpayOrderResponse,
  IRazorpaySuccessResponse,
  IRazorpayError,
  IBookingOrderResponse,
} from "@/types/user";
import { toast } from "sonner";
import { format } from "date-fns";
import logo from "@/assets/svg/logo.svg";
import convertTo24HourFormat from "@/utils/convertTo24HourFormat";
import apiClient from "@/api/axiosInstance";
import useErrorHandler from "./useErrorHandler";

const usePayment = () => {
  const { user } = useSelector(selectAuth);
  const { handleError } = useErrorHandler();

  //! ======================================== Creates a new Razorpay instance with the provided options =========================================
  const getRazorPayInstance = (options: IRazorpayOptions) => {
    return new (
      window as Window & typeof globalThis & { Razorpay: any }
    ).Razorpay(options);
  };

  //! ========================================== Creates a Razorpay order and retrieves the booking ID ===========================================
  const getOrder = async (
    amount: number,
    mentorId: string,
    date: Date,
    slot: string
  ) => {
    try {
      const { data } = await apiClient.post<IRazorpayOrderResponse>(
        `/bookings`,
        {
          mentor_id: mentorId,
          slot: {
            date: format(date, "dd-MM-yyyy"),
            time: convertTo24HourFormat(slot),
            fee: amount,
          },
        }
      );
      return data.body;
    } catch (error) {
      handleError(error, "Payment initialization failed");
      throw error;
    }
  };

  //! ===================== Loads the Razorpay script dynamically. @returns A Promise that resolves when the script is loaded ===================
  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = import.meta.env.VITE_RAZORPAY_SCRIPT;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        toast.error("Failed to load payment gateway");
        resolve(false);
      };
      document.body.appendChild(script);

      return () => {
        // Clean up
        document.body.removeChild(script);
      };
    });
  };

  //!======================================= Creates configuration options for Razorpay payment modal =============================================
  const createRazorpayOptions = (
    amount: number,
    currency: string,
    order_id: string,
    booking_id: string,
    setShowPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ): IRazorpayOptions => {
    return {
      key: import.meta.env.VITE_RAZORPAY_KEY!,
      amount: amount * 100, // Covert amount to paise.
      currency,
      name: "Talk To Pro",
      description: "Session Booking Payment",
      order_id,
      handler: async (response: IRazorpaySuccessResponse) => {
        await handleSuccessfulPayment(
          response,
          booking_id,
          setShowPaymentSuccess
        );
      },
      prefill: {
        name: user?.uname || "Your Name",
        email: user?.email || "Your Email",
        contact: user?.phone?.toString() || "***** *****",
      },
      image: logo,
      theme: {
        color: "#ad46ff",
      },
    };
  };

  //! ============================================ Handles successful payment confirmation ==========================================================
  const handleSuccessfulPayment = async (
    successResponse: IBookingOrderResponse,
    bookingId: string,
    setShowPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const { data } = await apiClient.patch(`/bookings/${bookingId}`, {
        ...successResponse,
        success: true,
      });
      setShowPaymentSuccess(true);
    } catch (error) {
      handleError(error, "Failed to confirm payment");
      throw error;
    }
  };

  //! =============================================== Handles failed or cancelled payment ===========================================================

  const handleFailedPayment = async (reason: string, bookingId: string) => {
    try {
      const { data } = await apiClient.patch(`/bookings/${bookingId}`, {
        reason,
        success: false,
      });
    } catch (error) {
      handleError(error, "Failed to update payment status");
      throw error;
    }
  };

  //! ============================= Main function to trigger razorpay payment after click the paynow button =====================================
  const handleTriggerPayment = async (
    date: Date,
    slot: string,
    mentor: IMentorDetailsWithSlots,
    setShowPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      // Step 1: Create the booking and get booking ID (no Razorpay involved)
      const { _id: bookingId, ...bookingData } = await getOrder(
        mentor.mentorDetails.fee,
        mentor._id,
        date,
        slot
      );
    console.log(bookingData)
      if (!bookingData?.amount || !bookingData?.currency || !bookingData?.order_id || !bookingId) {
        toast.error("Failed to collect order details.");
        throw Error("Failed to collect order details.");
      }

      await handleSuccessfulPayment(bookingData, bookingId, setShowPaymentSuccess)

      setShowPaymentSuccess(true)

      // RazorePay Section
      // // Step 2: Load Razorpay script
      // await loadRazorpay();

      // // Step 3: Create razorpay config options
      // const options = createRazorpayOptions(amount, currency, order_id, _id, setShowPaymentSuccess);

      // // Step 4: Create razorpay instance
      // const razorpayInstance = getRazorPayInstance(options);

      // // Add payment failed handler
      // razorpayInstance.on('payment.failed', async (response: IRazorpayError) => {
      //    const reason = response.error.description || 'Payment failed';
      //    // razorpayInstance.close();
      //    await handleFailedPayment(reason, _id);
      // });

      // // Step 5: Open razorpay modal for complete payment
      // razorpayInstance.open();
    } catch (error) {
      handleError(error, "Failed to proceed payment");
    }
  };

  return {
    handleTriggerPayment,
  };
};

export default usePayment;
