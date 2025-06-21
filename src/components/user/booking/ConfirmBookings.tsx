import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle } from "lucide-react"
import type { IMentorDetailsWithSlots } from "@/types/user"
import { DialogClose } from "@radix-ui/react-dialog"
import { format } from "date-fns"

interface IBookingConfirmProps {
  mentor: IMentorDetailsWithSlots;
  handleConfirmBooking: () => Promise<void>;
  selectedDate: Date | undefined;
  selectedSlot: string | null;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const ConfirmBookingModal: React.FC<IBookingConfirmProps> = ({ mentor, handleConfirmBooking, selectedDate, selectedSlot, setIsDrawerOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    try {
      setConfirmLoading(true);
      await handleConfirmBooking();
      setIsDrawerOpen(false);
    } finally {
      setConfirmLoading(false);
    };
  };

  return (
    <DialogContent className="min-w-min p-0 overflow-x-hidden max-h-[80dvh] overflow-y-auto custom-scrollbar">
      <div className="px-4 py-6">

        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl text-center m-0">Confirm Your Booking</DialogTitle>
          <DialogDescription className="text-muted-foreground text-center m-0">
            Please review your session details before confirming.
          </DialogDescription>
        </DialogHeader>


        <div className="space-y-4">
          <div className="space-y-2">
            <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-500">Please confirm your booking</p>
                <p className="text-sm text-amber-700 mt-1 dark:text-amber-500">
                  Confirm your session booking. After confirming, a payment link will be sent to your WhatsApp within 1 hour. <br />
                  Please complete the payment to finalize your booking. Your session will be confirmed once the payment is completed.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium mb-2">Confirmation details</h4>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="text-muted-foreground">Mentor Name:</div>
              <div className="font-medium">{`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}</div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="text-muted-foreground">Profession:</div>
              <div className="font-medium">{mentor.mentorDetails.profession}</div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="text-muted-foreground">Session Date:</div>
              <div className="font-medium">{selectedDate && format(selectedDate, "MMM dd, yyyy")}</div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="text-muted-foreground">Session Time:</div>
              <div className="font-medium">{selectedSlot && selectedSlot}</div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="text-muted-foreground">Session Fee:</div>
              <div className="font-medium">₹{mentor.mentorDetails.fee.toFixed(2)}</div>
            </div>
          </div>

          <div className="flex justify-center w-full gap-1 sticky bottom-0 bg-background not-sm:py-4">
            <DialogClose asChild>
              <span className="w-1/2">
                <Button
                  variant="ghost"
                  className="w-full border"
                  disabled={confirmLoading}
                >
                  Cancel
                </Button>
              </span>
            </DialogClose>
            <Button
              onClick={handleConfirm}
              className="w-1/2 bg-primary hover:bg-primary/90"
              disabled={confirmLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default ConfirmBookingModal