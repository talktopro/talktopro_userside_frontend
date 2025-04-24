import apiClient from "@/api/axiosInstance";
import { selectAuth } from "@/redux/slices/authSlice";
import { IRazorpayOptions, IRazorpayOrder, IRazorpaySuccessResponse } from "@/types/user";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import logo from "@/assets/logo.svg";
import { format } from "date-fns";
import convertTo24HourFormat from "@/utils/convertTo24HourFormat";

const usePayment = () => {
   const { user } = useSelector(selectAuth);

   const getRazorpayOrder = async (amount: number) => {
      try {
         const { data } = await apiClient.post<IRazorpayOrder>("/create-razorpay-order", { amount });
         console.log("razorpay order is", data);
         return data;
      } catch (error) {
         toast.error("Payment initialization failed")
         console.error('Failed to get razorpay order', error);
      };
   };

   const loadRazorpay = (): Promise<boolean> => {
      return new Promise((resolve) => {
         if (window.Razorpay) {
            resolve(true);
            return;
         }

         const script = document.createElement('script');
         script.src = import.meta.env.VITE_RAZORPAY_SCRIPT;
         script.async = true;
         script.onload = () => resolve(true);
         script.onerror = () => resolve(false);
         document.body.appendChild(script);
      });
   };

   const createRazorpayOptions = (amount: number, currency: string, order_id: string, mentorId: string, date: Date, slot: string) => {
      const options: IRazorpayOptions = {
         key: import.meta.env.VITE_RAZORPAY_KEY!,
         amount,
         currency,
         name: 'Talk To Pro',
         description: 'Test Payment',
         order_id,
         handler: async (response: IRazorpaySuccessResponse) => {
            await handleSuccessPayment(response, mentorId, date, slot);
         },
         prefill: {
            name: user?.uname,
            email: user?.email,
            contact: user?.phone.toString(),
         },
         image: logo,
         theme: {
            color: "#ad46ff",
         },
      };
      return options;
   };

   const handleSuccessPayment = async (successResponse: IRazorpaySuccessResponse, mentorId: string, date: Date, slot: string) => {
      const { data } = await apiClient.post(`/handle-payment-success`, {
         successResponse,
         mentorId: mentorId,
         clientId: user?.id,
         date: format(date, "dd-MM-yyyy"),
         slot: convertTo24HourFormat(slot)
      });
      console.log(data);
   };

   return {
      getRazorpayOrder,
      loadRazorpay,
      createRazorpayOptions,
   };
};

export default usePayment;
