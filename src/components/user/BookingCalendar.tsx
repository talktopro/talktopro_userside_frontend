import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { DrawerClose } from "../ui/drawer";
import { cn } from "@/lib/utils";
import { addDays, format, isAfter, isBefore, startOfToday } from "date-fns";

const BookingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const today = startOfToday();
  const maxDate = addDays(today, 50);

  const dummyAllocatedDateTime: any = {
    "21/04/2025": {
      "11:00 AM - 12:00 PM": true,
      "2:00 PM - 3:00 PM": true,
      "3:00 PM - 4:00 PM": true,
    },
    "22/04/2025": {
      "10:00 AM - 11:00 AM": true,
      "2:00 PM - 3:00 PM": true,
      "3:00 PM - 4:00 PM": true,
    },
    "23/04/2025": {
      "11:00 AM - 12:00 PM": true,
      "2:00 PM - 3:00 PM": true,
      "5:00 PM - 6:00 PM": true,
      "6:00 PM - 7:00 PM": true,
    },
    "25/04/2025": {
      "10:00 AM - 11:00 AM": true,
      "11:00 AM - 12:00 PM": true,
      "1:00 PM - 2:00 PM": true,
    },
    "26/04/2025": {
      "2:00 PM - 3:00 PM": true,
    },
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 21; hour++) {
      const startHour = hour;
      const endHour = hour + 1;
      const startPeriod = startHour >= 12 ? "PM" : "AM";
      const endPeriod = endHour >= 12 ? "PM" : "AM";
      const formattedStartHour = startHour > 12 ? startHour - 12 : startHour;
      const formattedEndHour = endHour > 12 ? endHour - 12 : endHour;
      slots.push(
        `${formattedStartHour}:00 ${startPeriod} - ${formattedEndHour}:00 ${endPeriod}`
      );
    }
    return slots;
  };

  const isDateAvailable = (date: Date) => {
    const dateKey = format(date, "dd/MM/yyyy");
    return dummyAllocatedDateTime.hasOwnProperty(dateKey);
  };

  const isTimeSlotAvailable = (timeSlot: string) => {
    if (!date) return false;
    const dateKey = format(date, "dd/MM/yyyy");
    return dummyAllocatedDateTime[dateKey]?.[timeSlot] || false;
  };

  return (
    <>
      <div className="flex justify-center py-10">
        <div>
          <div className="flex flex-wrap gap-5 justify-center">
            <Calendar
              mode="single"
              className="border-1 rounded-md p-5 not-sm:w-full"
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
                  const isDisabled =
                    !isDateAvailable(currentDate) ||
                    isBefore(currentDate, today) ||
                    isAfter(currentDate, maxDate);
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
                          !isDisabled && "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2",
                          isSelected &&
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
                {generateTimeSlots().map((slot, index) => {
                  const isAvailable = date ? isTimeSlotAvailable(slot) : false;
                  return (
                    <div
                      key={index}
                      className={`py-2 px-3 text-center text-xs rounded-md border transition-colors
                      ${selectedTimeSlot === slot
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : isAvailable
                            ? "hover:border-gray-300 cursor-pointer"
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

            <Button
              className="w-full cursor-pointer"
              disabled={!date || !selectedTimeSlot}
            >
              Pay now
            </Button>
          </div>
        </div>
        <div className="flex gap-3 mt-10 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:py-3 not-sm:border-t-1 not-sm:px-4 sm:hidden">
          <DrawerClose asChild>
            <Button className="w-full cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DrawerClose>

          <Button
            className="w-full cursor-pointer"
            disabled={!date || !selectedTimeSlot}
          >
            Pay now
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingCalendar;