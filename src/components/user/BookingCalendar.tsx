import { FC, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { DrawerClose } from "../ui/drawer";
import { cn } from "@/lib/utils";
import { addDays, format, startOfToday } from "date-fns";
import generateTimeSlots from "@/utils/generateTimeSlots";
import { IMentorDetailsWithSlots } from "@/types/user";
import usePayment from "@/hooks/usePayment";
import { toast } from "sonner";

interface IBookingCalendarProps {
  mentor: IMentorDetailsWithSlots
};

const BookingCalendar: FC<IBookingCalendarProps> = ({ mentor }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const today = startOfToday();
  const predefinedTimeSlots: string[] = useMemo(generateTimeSlots, []);
  const { getRazorpayOrder, loadRazorpay, createRazorpayOptions } = usePayment();
  const [isRazorpayOrderLoading, setIsRazorpayOrderLoading] = useState(false);

  const isDateAvailable = (date: Date) => {
    if (!mentor.slots) return;
    const dateKey = format(date, "dd-MM-yyyy");
    return mentor.slots[dateKey];
  };

  const isTimeSlotAvailable = (timeSlot: string) => {
    if (!date || !mentor.slots) return false;
    const dateKey = format(date, "dd-MM-yyyy");
    return mentor.slots[dateKey]?.[timeSlot] || false;
  };

  const handlePaymentButtonClick = async () => {
    try {
      setIsRazorpayOrderLoading(true);
      const orderDetails = await getRazorpayOrder(mentor.mentorDetails.price);

      // Step 2: Load Razorpay script
      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        toast.error('Failed to load Razorpay');
        return;
      };

      if (!orderDetails?.amount || !orderDetails?.currency || !orderDetails?.id) {
        toast.error("Failed to collect order details.");
        return;
      };

      if (!date || !selectedTimeSlot) {
        toast.error("Choose your appoinment date and slot");
        return;
      }

      const options = createRazorpayOptions(orderDetails?.amount, orderDetails?.currency, orderDetails?.id, mentor._id, date, selectedTimeSlot)

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment initialization failed');
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
              toMonth={addDays(today, 30)}
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
                {selectedTimeSlot ? `Pay now ${mentor.mentorDetails.price}₹/-` : "Pay now"}
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
              {selectedTimeSlot ? `Pay now ${mentor.mentorDetails.price}₹/-` : "Pay now"}
            </Button>
          </DrawerClose>
        </div>
      </div>
    </>
  );
};

export default BookingCalendar;