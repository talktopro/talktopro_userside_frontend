import { FC } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format, isAfter, isToday, setHours, setMinutes } from "date-fns";
import TimeSlots from "./TimeSlot";
import useSlotAllocation from "@/hooks/useSlotAllocation";
import { SlotAllocationCalendarProps } from "@/types/mentor";

const SlotAllocationCalendar: FC<SlotAllocationCalendarProps> = ({ allocatedSlots, setAllocatedSlots }) => {

  const { displayMonths, availableDates, addNewTimeSlotToState, handleDeleteSlot, deleteFrontendTimeSlot } = useSlotAllocation();

  const togglePopover = (isOpen: boolean) => {
    if (isOpen) {
      document.documentElement.classList.add('popover-open');
    }
  };

  function shouldDisableToday() {
    const now = new Date();
    const lastSlotStartTime = setHours(setMinutes(new Date(), 0), 21); // 9:00 PM

    return isAfter(now, lastSlotStartTime);
  }

  return (
    <div className="flex not-sm:justify-center sm:justify-center gap-5 flex-wrap not-sm:border-1 rounded-md pt-2 pb-4">
      {displayMonths.map((month, index) => (
        <div key={index} className="w-80 flex justify-center">
          <Calendar
            fromMonth={month}
            toMonth={month}
            components={{
              Head: () => (
                <thead>
                  <tr className="grid grid-cols-7">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <th
                          key={day}
                          scope="col"
                          className="mx-1 font-medium text-center text-xs cursor-default"
                        >
                          {day}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
              ),
              Day: (props) => {
                const date = props.date;
                const dateStr: string = format(date, "dd-MM-yyyy");
                const isDisabled = !availableDates()[dateStr] || (isToday(date) && shouldDisableToday());
                const isSelected = allocatedSlots[dateStr];
                const isOutsideDay = date.getMonth() !== month.getMonth();

                const hasBookedSlots = allocatedSlots[dateStr]
                  ? Object.values(allocatedSlots[dateStr]).some(status => typeof status === "object" && status.isBooked === "booked")
                  : false;

                if (isOutsideDay) {
                  return (
                    <div className="h-8 w-8 p-0 font-normal rounded-sm mx-1 text-muted-foreground opacity-50 hover:bg-transparent hover:text-muted-foreground cursor-not-allowed flex justify-center items-center">
                      {date.getDate()}
                    </div>
                  );
                }

                return (
                  <div className="relative">
                    <div className="absolute -top-1 -right-0 w-3 h-3 rounded-full bg-teal-500 border-3 border-background" hidden={!hasBookedSlots || isDisabled} />
                    <Popover
                      onOpenChange={(isOpen) => togglePopover(isOpen)}
                    >
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "h-8 w-8 p-0 font-normal rounded-sm mx-1 cursor-pointer",
                            "hover:bg-accent hover:text-accent-foreground",
                            "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2",
                            isSelected && !isDisabled &&
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            isDisabled &&
                            "text-muted-foreground opacity-50 hover:bg-transparent hover:text-muted-foreground cursor-not-allowed"
                          )}
                          disabled={isDisabled}
                        >
                          {date.getDate()}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit">
                        <TimeSlots
                          title={date}
                          allocatedSlots={allocatedSlots}
                          setAllocatedSlots={setAllocatedSlots}
                          addNewTimeSlotToState={addNewTimeSlotToState}
                          handleDeleteSlot={handleDeleteSlot}
                          deleteFrontendTimeSlot={deleteFrontendTimeSlot}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SlotAllocationCalendar;