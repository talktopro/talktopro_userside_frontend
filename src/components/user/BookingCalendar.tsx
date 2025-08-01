import { FC, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { DrawerClose } from "../ui/drawer";
import { cn } from "@/lib/utils";
import { addDays, addMinutes, format, isAfter, isToday, parse, startOfToday } from "date-fns";
import generateTimeSlots from "@/utils/generateTimeSlots";
import { IMentorDetailsWithSlots } from "@/types/user";
import usePayment from "@/hooks/usePayment";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ConfirmBookingModal from "./booking/ConfirmBookings";

interface IBookingCalendarProps {
  mentor: IMentorDetailsWithSlots;
  setShowPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setContactDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchMentor: () => Promise<void>;
}

const BookingCalendar: FC<IBookingCalendarProps> = ({
  mentor,
  setShowPaymentSuccess,
  setContactDialogOpen,
  setIsDrawerOpen,
  refetchMentor,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const today = startOfToday();
  const predefinedTimeSlots: string[] = useMemo(generateTimeSlots, []);
  const [isRazorpayOrderLoading, setIsRazorpayOrderLoading] = useState(false);
  const { handleTriggerPayment } = usePayment();
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();

  const isDateAvailable = (date: Date) => { // individual
    if (!mentor.slots) return false;
    const dateKey = format(date, "dd-MM-yyyy");
    const slotsForDate = mentor.slots[dateKey];
    if (!slotsForDate) return false;

    if (isAfter(date, today)) {
      return Object.values(slotsForDate).some((slot) => {
        return (
          typeof slot === "object" &&
          "isBooked" in slot &&
          slot.isBooked === "free"
        );
      });
    }

    if (isToday(date)) {
      const now = new Date();
      const bufferTime = addMinutes(now, 60);

      return Object.entries(slotsForDate).some(([timeSlot, slot]) => {
        if (
          typeof slot !== "object" ||
          !("isBooked" in slot) ||
          slot.isBooked !== "free"
        ) {
          return false;
        }

        const startTimeStr = timeSlot.split(" - ")[0];
        const slotStartTime = parse(startTimeStr, "h:mm a", date);
        return isAfter(slotStartTime, bufferTime);
      });
    }

    return false;
  };

  const isTimeSlotAvailable = (timeSlot: string) => { // individual
    if (!date || !mentor.slots) return false;

    if (isAfter(date, today)) {
      //* Check if date is in the future
      const dateKey = format(date, "dd-MM-yyyy");
      const slotStatus = mentor.slots[dateKey]?.[timeSlot] as
        | { isBooked: "booked" | "free" | "on_hold" }
        | undefined;
      return slotStatus && slotStatus.isBooked === "free";
    }

    if (isToday(date)) {
      //* For today's date, check if time slot is in the future
      const now = new Date();
      const startTimeStr = timeSlot.split(" - ")[0];
      const slotStartTime = parse(startTimeStr, "h:mm a", date);
      const bufferTime = addMinutes(now, 60);
      const isSlotInFuture = isAfter(slotStartTime, bufferTime);
      if (!isSlotInFuture) return false;

      const dateKey = format(date, "dd-MM-yyyy");
      const slotStatus = mentor.slots[dateKey]?.[timeSlot] as
        | { isBooked: "booked" | "free" | "on_hold" }
        | undefined;
      return slotStatus && slotStatus.isBooked === "free";
    }

    return false;
  };

  const isAnySlotAvailable = useMemo(() => { // overall calculation
    if (!mentor.slots) return false;

    const dates = Object.entries(mentor.slots);
    const now = new Date();
    const bufferTime = addMinutes(now, 60);

    return dates.some(([dateStr, slots]) => {
      return Object.entries(slots).some(([time, slot]) => {
        if (
          typeof slot !== "object" ||
          !("isBooked" in slot) ||
          slot.isBooked !== "free"
        )
          return false;

        const [day, month, year] = dateStr.split("-").map(Number);
        const dateObj = new Date(year, month - 1, day);
        const startTimeStr = time.split(" - ")[0];
        const slotStartTime = parse(startTimeStr, "h:mm a", dateObj);

        if (isToday(dateObj)) {
          return isAfter(slotStartTime, bufferTime);
        }

        return isAfter(dateObj, startOfToday());
      });
    });
  }, [mentor.slots]);


  const handlePaymentButtonClick = async () => {
    try {
      if (!user?.id) {
        navigate(ROUTES.AUTH.LOGIN);
        return;
      }

      if (!user?.phone || user?.phone === 0) {
        setContactDialogOpen(true);
        return;
      }

      setIsRazorpayOrderLoading(true);

      if (!date || !selectedTimeSlot) {
        toast.error("Choose your appoinment date and slot");
        return;
      }
      await handleTriggerPayment(
        date,
        selectedTimeSlot,
        mentor,
        setShowPaymentSuccess
      );
    } finally {
      setIsRazorpayOrderLoading(false);
      await refetchMentor();
    }
  };

  return (
    <>
      <div className="flex justify-center py-10">
        <div>
          <div className="flex flex-wrap gap-5 justify-center">
            <Calendar
              mode="single"
              className="border-1 rounded-md p-5 not-sm:w-full"
              fromMonth={today}
              toMonth={addDays(today, 31)}
              components={{
                Head: () => (
                  <div className="grid grid-cols-7">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="mx-1 text-center text-xs cursor-default"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>
                ),
                Day: (props) => {
                  const currentDate = props.date;
                  const currentMonth = props.displayMonth;
                  const isOutsideDay =
                    currentDate.getMonth() !== currentMonth?.getMonth();
                  const isDisabled = !isDateAvailable(currentDate);
                  const isSelected =
                    date &&
                    format(date, "yyyy-MM-dd") ===
                    format(currentDate, "yyyy-MM-dd");

                  if (isOutsideDay) {
                    return (
                      <div className="h-8 w-8 p-0 font-normal rounded-sm mx-1 text-muted-foreground opacity-50 hover:bg-transparent hover:text-muted-foreground cursor-not-allowed flex justify-center items-center">
                        {currentDate.getDate()}
                      </div>
                    );
                  }

                  return (
                    <div className="relative not-sm:grid not-sm:grid-cols-7">
                      <button
                        className={cn(
                          "h-8 w-8 p-0 font-normal rounded-sm mx-1",
                          !isDisabled &&
                          "cursor-pointer font-semibold hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2",
                          isSelected &&
                          !isDisabled &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                          isDisabled &&
                          "text-muted-foreground opacity-50 hover:bg-transparent hover:text-muted-foreground cursor-not-allowed"
                        )}
                        disabled={isDisabled}
                        onClick={() => {
                          setDate(currentDate);
                          setSelectedTimeSlot(null);
                        }}
                      >
                        {currentDate.getDate()}
                      </button>
                    </div>
                  );
                },
              }}
            />

            <div className="border-1 rounded-md p-5 not-sm:mb-5 not-sm:w-full">
              <div className="grid grid-cols-2 gap-3">
                {predefinedTimeSlots.map((slot, index) => {
                  const isAvailable = date ? isTimeSlotAvailable(slot) : false;
                  return (
                    <div
                      key={index}
                      className={`py-2 px-3 text-center text-xs rounded-md border transition-colors
                      ${selectedTimeSlot === slot
                          ? "border-purple-500 bg-purple-500/10 text-purple-700 font-semibold"
                          : isAvailable
                            ? "hover:border-gray-300 font-semibold cursor-pointer"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      onClick={() => isAvailable && setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-10 not-sm:hidden">

            {!isAnySlotAvailable ? (
              <div className="w-full border border-red-500 text-red-500 bg-red-500/5 p-4 rounded-md text-sm text-center mb-4">
                This mentor has no available slots for booking. Please request a new slot or consider choosing another mentor.
              </div>
            ) : (
              <>
                <Button
                  className="w-full cursor-pointer"
                  variant="outline"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full cursor-pointer"
                      disabled={
                        !date || !selectedTimeSlot || isRazorpayOrderLoading
                      }
                    >
                      Book Session
                    </Button>
                  </DialogTrigger>
                  <ConfirmBookingModal
                    handleConfirmBooking={handlePaymentButtonClick}
                    mentor={mentor}
                    selectedDate={date}
                    selectedSlot={selectedTimeSlot}
                    setIsDrawerOpen={setIsDrawerOpen}
                  />
                </Dialog>
              </>
            )}

          </div>
        </div>
        <div className="flex gap-3 mt-10 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:py-3 not-sm:border-t-1 not-sm:px-4 sm:hidden">

          {!isAnySlotAvailable ? (
            <div className="w-full border border-red-500 text-red-500 bg-red-500/5 p-4 rounded-md text-sm text-center">
              This mentor has no available slots for booking. Please request a new slot or consider choosing another mentor.
            </div>
          ) : (
            <>
              <Button
                className="w-full cursor-pointer"
                variant="outline"
                onClick={() => setIsDrawerOpen(false)}
              >
                Cancel
              </Button>

              <DrawerClose asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full cursor-pointer"
                      disabled={
                        !date || !selectedTimeSlot || isRazorpayOrderLoading
                      }
                    >
                      Book Session
                    </Button>
                  </DialogTrigger>
                  <ConfirmBookingModal
                    handleConfirmBooking={handlePaymentButtonClick}
                    mentor={mentor}
                    selectedDate={date}
                    selectedSlot={selectedTimeSlot}
                    setIsDrawerOpen={setIsDrawerOpen}
                  />
                </Dialog>
              </DrawerClose>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingCalendar;
