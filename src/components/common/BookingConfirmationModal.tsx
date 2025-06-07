import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const BookingConfirmationModal = () => {
  const phoneNumber = "9567790123";

const handleCopy = () => {
  navigator.clipboard.writeText(phoneNumber);
  toast.success("Phone number copied!");
};


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 text-center">
        <h1 className="text-xl font-semibold text-purple-600 mb-2">
          Booking Confirmed!
        </h1>

        <p className="text-muted-foreground text-sm mb-4">
          A payment link will be sent to your <strong>WhatsApp</strong> within 1 hour. <br />
          Please complete the payment to confirm your session.
        </p>

        <p className="text-sm mb-6">
          For help, contact:{" "}
          <span className="inline-flex items-center gap-1 font-medium">
            {phoneNumber}
            <button onClick={handleCopy}>
              <Copy size={14} className="text-muted-foreground hover:text-primary" />
            </button>
          </span>
        </p>

        <div className="flex justify-center">
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
