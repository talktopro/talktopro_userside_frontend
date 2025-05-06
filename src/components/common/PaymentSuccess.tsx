import { Button } from "@/components/ui/button";
import SuccessPaymentLottie from "../Animation/SuccessPayment";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[85dvh]">
      <div className="max-w-md w-full text-center px-4">
        <SuccessPaymentLottie />

        <h1 className="text-3xl not-sm:text-xl font-bold text-teal-500 mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8  not-sm:text-sm">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>

        <div className="flex gap-1 justify-center">
          <Button
            variant="ghost"
            className="w-1/2 border"
            onClick={() => navigate(ROUTES.HOME)}
          >
            Go to Home Page
          </Button>

          <Button
            className="w-1/2"
            onClick={() => navigate(ROUTES.BOOKINGS)}
          >
            View Booking Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;