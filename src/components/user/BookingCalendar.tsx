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

interface IBookingCalendarProps {
  mentor: IMentorDetailsWithSlots
  setShowPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>
  setContactDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const BookingCalendar: FC<IBookingCalendarProps> = ({ mentor, setShowPaymentSuccess, setContactDialogOpen }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const today = startOfToday();
  const predefinedTimeSlots: string[] = useMemo(generateTimeSlots, []);
  const [isRazorpayOrderLoading, setIsRazorpayOrderLoading] = useState(false);
  const { handleTriggerPayment } = usePayment();
  const { user } = useSelector(selectAuth);
  const navigate = useNavigate();

  const isDateAvailable = (date: Date) => {
    if (!mentor.slots) return false;
    const dateKey = format(date, "dd-MM-yyyy");
    const slotsForDate = mentor.slots[dateKey];
    if (!slotsForDate) return false;

    if (isAfter(date, today)) {
      return Object.values(slotsForDate).some((slot) => {
        return typeof slot === 'object' && 'isBooked' in slot && slot.isBooked === "free";
      });
    }

    if (isToday(date)) {
      const now = new Date();
      const bufferTime = addMinutes(now, 60);

      return Object.entries(slotsForDate).some(([timeSlot, slot]) => {
        if (typeof slot !== 'object' || !('isBooked' in slot) || slot.isBooked !== "free") {
          return false;
        }

        const startTimeStr = timeSlot.split(' - ')[0];
        const slotStartTime = parse(startTimeStr, 'h:mm a', date);
        return isAfter(slotStartTime, bufferTime);
      });
    }

    return false;
  };

  const isTimeSlotAvailable = (timeSlot: string) => {
    if (!date || !mentor.slots) return false;

    if (isAfter(date, today)) { //* Check if date is in the future
      const dateKey = format(date, "dd-MM-yyyy");
      const slotStatus = mentor.slots[dateKey]?.[timeSlot] as { isBooked: "booked" | "free" | "on_hold" } | undefined;
      return slotStatus && slotStatus.isBooked === "free";
    };

    if (isToday(date)) { //* For today's date, check if time slot is in the future
      const now = new Date();
      const startTimeStr = timeSlot.split(' - ')[0];
      const slotStartTime = parse(startTimeStr, 'h:mm a', date);
      const bufferTime = addMinutes(now, 60);
      const isSlotInFuture = isAfter(slotStartTime, bufferTime);
      if (!isSlotInFuture) return false;

      const dateKey = format(date, "dd-MM-yyyy");
      const slotStatus = mentor.slots[dateKey]?.[timeSlot] as { isBooked: "booked" | "free" | "on_hold" } | undefined;
      return slotStatus && slotStatus.isBooked === "free";
    }

    return false;
  };

  const handlePaymentButtonClick = async () => {
    try {
      if (!user?.id) {
        navigate(ROUTES.AUTH.LOGIN);
        return;
      }

      if (!user?.phone || user?.phone === 0) {
        setContactDialogOpen(true);
        return;
      };

      setIsRazorpayOrderLoading(true);

      if (!date || !selectedTimeSlot) {
        toast.error("Choose your appoinment date and slot");
        return;
      }

      const result = await handleTriggerPayment(date, selectedTimeSlot, mentor, setShowPaymentSuccess)
      console.log(result)
    } finally {
      setIsRazorpayOrderLoading(false);
    };
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
                  const isDisabled = !isDateAvailable(currentDate)
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
                          !isDisabled && "cursor-pointer font-semibold hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2",
                          isSelected && !isDisabled &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                          isDisabled &&
                          "text-muted-foreground opacity-50 hover:bg-transparent hover:text-muted-foreground cursor-not-allowed"
                        )}
                        disabled={isDisabled}
                        onClick={() => {
                          setDate(currentDate);
                          setSelectedTimeSlot(null)
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
            <DrawerClose asChild>
              <Button className="w-full cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button
                className="w-full cursor-pointer"
                disabled={!date || !selectedTimeSlot || isRazorpayOrderLoading}
                onClick={handlePaymentButtonClick}
              >
                {selectedTimeSlot ? `Pay now ${mentor.mentorDetails.fee}₹/-` : "Pay now"}
              </Button>
            </DrawerClose>
          </div>
        </div>
        <div className="flex gap-3 mt-10 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:py-3 not-sm:border-t-1 not-sm:px-4 sm:hidden">
          <DrawerClose asChild>
            <Button className="w-full cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DrawerClose>

          <DrawerClose asChild>
            <Button
              className="w-full cursor-pointer"
              disabled={!date || !selectedTimeSlot || isRazorpayOrderLoading}
              onClick={handlePaymentButtonClick}
            >
              {selectedTimeSlot ? `Pay now ${mentor.mentorDetails.fee}₹/-` : "Pay now"}
            </Button>
          </DrawerClose>
        </div>
      </div>
    </>
  );
};

export default BookingCalendar;