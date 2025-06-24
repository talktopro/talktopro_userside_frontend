import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { IBookingHistory } from "@/types/user";
import { format } from "date-fns";
import convert24To12HourRange from "@/utils/convertTo12HourFormat";

interface IBookingCancellationProps {
  booking: IBookingHistory;
  handleCancelBooking: (bookingId: string, reason: string) => Promise<boolean>;
}

const cancellationReasons = [
  "I no longer need the session",
  "I found another mentor",
  "My schedule changed",
  "Other",
];

const dialogTitles = [
  "Reason for Cancellation",
  "Confirm Your Cancellation",
  "Cancellation Successful",
];

const dialogDescriptions = [
  "Please select a reason for cancelling your booking.",
  "Please review your cancellation details before confirming.",
  "Your booking has been successfully cancelled.",
];

const BookingCancellation: React.FC<IBookingCancellationProps> = ({
  booking,
  handleCancelBooking,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [cancellationLoading, setCancellationLoading] =
    useState<boolean>(false);
  const [isLateCancel, setIsLateCancel] = useState<boolean>(false);
  const [cancelAvailable, setCancelAvailable] = useState<boolean>(
    isCancelAvailable(booking.slot.date, booking.slot.time)
  );
  const [customReasonError, setCustomReasonError] = useState<string | null>(
    null
  );

  function getSessionDateTime(date: string, timeSlot: string) {
    const sessionDate = new Date(date);
    const [startTime] = timeSlot.split("-");
    const [hours, minutes] = startTime.split(":").map(Number);
    sessionDate.setHours(hours, minutes, 0, 0);
    return sessionDate;
  }

  function isCancelAvailable(date: string, timeSlot: string) {
    const now = new Date();
    const sessionDate = getSessionDateTime(date, timeSlot);
    return now < sessionDate;
  }

  function isLateCancellation(date: string, timeSlot: string) {
    const now = new Date();
    const sessionDate = getSessionDateTime(date, timeSlot);
    const diffInHours =
      (sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 3;
  }

  const checkLateCancellation = useCallback(() => {
    return isLateCancellation(booking.slot.date, booking.slot.time);
  }, [booking.slot.date, booking.slot.time]);

  useEffect(() => {
    if (!isOpen) return;
    setIsLateCancel(checkLateCancellation()); //! Initial check

    const intervalId = setInterval(() => {
      const nowAvailable = isCancelAvailable(
        booking.slot.date,
        booking.slot.time
      );
      setCancelAvailable(nowAvailable);

      if (!nowAvailable) {
        //! Close dialog if cancellation is no longer available
        setIsOpen(false);
      }

      setIsLateCancel(checkLateCancellation());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [isOpen, checkLateCancellation]);

  const handleCancelClick = () => {
    setIsOpen(true);
    setStep(1);
    setSelectedReason("");
    setCustomReason("");
  };

  const handleConfirm = async () => {
    try {
      setCancellationLoading(true);
      const response = await handleCancelBooking(
        booking._id,
        selectedReason === "Other" ? customReason : selectedReason
      );
      if (response === true) {
        setStep(3);
      }
    } finally {
      setCancellationLoading(false);
    }
  };

  return (
    <div>
      {(booking.status === "success" || booking.status === "initiated") &&
        booking.session_status === "pending" &&
        (booking.payment_status === "success" ||
          booking.payment_status === "pending") &&
        cancelAvailable && (
          <>
            <p className="my-1 text-sm">Do you wanna cancel this booking?</p>
            <Button
              className="m-0 w-1/2 not-sm:w-full bg-red-500 hover:bg-red-600"
              onClick={handleCancelClick}
            >
              Cancel Booking
            </Button>
          </>
        )}

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <div className="px-4 py-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl text-center m-0">
                {dialogTitles[step - 1]}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-center m-0">
                {dialogDescriptions[step - 1]}
              </DialogDescription>
            </DialogHeader>

            {/* progressbar */}
            <div className="flex justify-center gap-2 mb-10">
              {[1, 2, 3].map((bar) => (
                <div
                  className={`w-15 h-1 rounded-xl ${
                    step >= bar ? "bg-primary" : "bg-muted"
                  }`}
                  key={bar}
                />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <RadioGroup
                  value={selectedReason}
                  onValueChange={setSelectedReason}
                  className="flex flex-col gap-1.5"
                >
                  {cancellationReasons.map((reason) => (
                    <div
                      key={reason}
                      className={`flex items-center pl-3 rounded-md border transition-all ${
                        selectedReason === reason
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <RadioGroupItem value={reason} id={reason} />
                      <Label
                        htmlFor={reason}
                        className="flex-1 p-3 cursor-pointer"
                      >
                        {reason}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {selectedReason === "Other" && (
                  <div className="mt-4 space-y-3">
                    <Label
                      htmlFor="customReason"
                      className="text-sm font-medium pl-2"
                    >
                      Please specify your reason
                    </Label>
                    <Textarea
                      id="customReason"
                      value={customReason}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCustomReason(value);

                        if (value.trim().length < 10) {
                          setCustomReasonError(
                            "Please enter at least 10 characters."
                          );
                        } else if (value.trim().length > 200) {
                          setCustomReasonError(
                            "Maximum 200 characters allowed."
                          );
                        } else {
                          setCustomReasonError(null);
                        }
                      }}
                      placeholder="Enter your reason for cancellation..."
                      className="resize-none h-[100px] overflow-y-scroll custom-scrollbar mt-2"
                    />
                    {customReasonError && (
                      <p className="text-xs text-red-500 pl-2">
                        {customReasonError}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex justify-center w-full gap-1">
                  <Button
                    variant="ghost"
                    className="w-1/3 border"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setStep((prev: number) => prev + 1)}
                    className="w-1/3"
                    disabled={
                      !selectedReason ||
                      (selectedReason === "Other" && !customReason.trim())
                    }
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-500">
                        Please confirm your cancellation
                      </p>
                      <p className="text-sm text-amber-700 mt-1 dark:text-amber-500">
                        Your amount will be refunded within 24 hours after
                        cancellation.
                      </p>
                    </div>
                  </div>

                  {isLateCancel && (
                    <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800 dark:text-red-500">
                          Late Cancellation Notice
                        </p>
                        <p className="text-sm text-red-700 mt-1 dark:text-red-500">
                          You're cancelling within 3 hours of your session time.
                          A 10% cancellation fee will be deducted from your
                          refund as compensation for the mentor.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-medium mb-2">
                    Cancellation details
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-muted-foreground">Reason:</div>
                    <div className="font-medium">
                      {selectedReason === "Other"
                        ? customReason
                        : selectedReason}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-muted-foreground">Booking ID:</div>
                    <div className="font-medium font-mono">{booking._id}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-muted-foreground">Session date:</div>
                    <div className="font-medium">
                      {format(booking.slot.date, "dd-MM-yyyy")}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-muted-foreground">Session time:</div>
                    <div className="font-medium">
                      {convert24To12HourRange(booking.slot.time)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center w-full gap-1">
                  <Button
                    variant="ghost"
                    onClick={() => setStep((prev: number) => prev - 1)}
                    className="w-1/3 border"
                    disabled={cancellationLoading}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    className="w-1/3 bg-red-500 hover:bg-red-600"
                    disabled={cancellationLoading}
                  >
                    Yes, Confirm
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Booking Cancelled Successfully
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    {isLateCancel
                      ? "Your booking has been cancelled. A 10% cancellation fee has been deducted from your refund, which will be processed within 24 hours."
                      : "Your booking has been cancelled and your amount refund will be processed within 24 hours."}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm">
                    If you face any issues with your refund or have any
                    questions, our support team{" "}
                    <span className="hover:underline text-purple-500 cursor-pointer">
                      admin@talktopro.in
                    </span>{" "}
                    will be happy to assist you.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="border w-1/3"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingCancellation;
