import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface BookingConfirmationModalProps {
  setShowPaymentSuccess: (show: boolean) => void;
}

const BookingConfirmationModal = ({
  setShowPaymentSuccess,
}: BookingConfirmationModalProps) => {
  const phoneNumber = "9567790123";
  const [copying, setCopying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopying(true);
    toast.success("Phone number copied!");

    setTimeout(() => {
      setCopying(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-center 
            border border-gray-200 dark:border-zinc-800 overflow-hidden relative"
      >
        {/* Success icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-purple-600 opacity-5">
          <PartyPopper size={160} />
        </div>

        <div className="relative">
          {/* Success animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={32} className="text-purple-600" />
          </motion.div>

          <h1 className="text-2xl font-bold text-purple-600 mb-4">
            Booking Confirmed!
          </h1>

          <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-4 mb-6">
            <p className="text-muted-foreground text-sm font-bold">
              A payment link will be sent to your{" "}
              <span className="font-bold text-purple-600">WhatsApp</span> within
              1 hour.
            </p>
            <p className="text-sm font-bold mt-2">
              Please complete the payment to confirm your session.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="text-sm text-muted-foreground font-bold">
              For help, contact:
            </div>
            <div
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-zinc-800 
            rounded-full border border-gray-200 dark:border-zinc-700 
            hover:border-purple-600 dark:hover:border-purple-600 
            cursor-pointer transition-all duration-200 group"
            >
              <span className="font-mono font-bold text-purple-600">
                {phoneNumber}
              </span>
              <div className="w-5 h-5 flex items-center justify-center">
                {copying ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy
                    size={14}
                    className="text-muted-foreground group-hover:text-purple-600 transition-colors"
                  />
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowPaymentSuccess(false)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 rounded-xl 
            transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingConfirmationModal;
