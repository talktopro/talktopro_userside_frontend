import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";
import { DrawerClose } from "./ui/drawer";

const BookingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

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

  return (
    <>
      <div className="flex justify-center py-10">
        <div>
          <div className="flex flex-wrap gap-5 justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border-1 rounded-md p-5"
            />
            <div className="grid grid-cols-2 mt-auto gap-3 h-fit max-h-[600px] overflow-y-auto border-1 rounded-md p-5">
              {generateTimeSlots().map((slot, index) => (
                <div
                  key={index}
                  className={`py-2 px-3 text-center text-xs rounded-md border cursor-pointer transition-colors
              ${
                selectedTimeSlot === slot
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "hover:border-gray-300"
              }`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-10 not-sm:hidden">
            <DrawerClose asChild>
              <Button className="w-full cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DrawerClose>

            <Button className="w-full cursor-pointer">Pay now</Button>
          </div>
        </div>
        <div className="flex gap-3 mt-10 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:pt-3 not-sm:border-t-1 not-sm:px-4 sm:hidden">
          <DrawerClose asChild>
            <Button className="w-full cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DrawerClose>

          <Button className="w-full cursor-pointer">Pay now</Button>
        </div>
      </div>
    </>
  );
};

export default BookingCalendar;
