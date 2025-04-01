import { useState } from "react";
import useSlotAllocation from "@/hooks/useSlotAllocation";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TimeSlotsProps {
  title: Date;
  updateTimeSlots: (date: Date, time: string) => void;
  selectedDateAndTime: Record<string, Record<string, boolean>>;
  keepOpen: () => void;
}

const SlotAllocationCalendar = () => {
  const {
    displayMonths,
    availableDates,
    updateTimeSlots,
    selectedDateAndTime,
  } = useSlotAllocation();

  const [openPopover, setOpenPopover] = useState<Record<string, boolean>>({});

  const togglePopover = (dateStr: string, isOpen: boolean) => {
    setOpenPopover((prev) => ({ ...prev, [dateStr]: isOpen }));
  };

  return (
    <div className="flex not-sm:justify-center sm:justify-evenly flex-wrap border-1 rounded-md pt-2 pb-4">
      {displayMonths.map((month, index) => (
        <div key={index} className="w-80 flex justify-center">
          <Calendar
            fromMonth={month}
            toMonth={month}
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
                const date = props.date;
                const dateStr = format(date, "yyyy-MM-dd");
                const isDisabled = !availableDates[dateStr];
                const isSelected = selectedDateAndTime[dateStr];
                const isOutsideDay = date.getMonth() !== month.getMonth();

                if (isOutsideDay) {
                  return (
                    <div className="h-8 w-8 p-0 font-normal rounded-sm mx-1 text-muted-foreground opacity-50 hover:bg-transparent hover:text-muted-foreground cursor-not-allowed flex justify-center items-center">
                      {date.getDate()}
                    </div>
                  );
                }

                return (
                  <div className="relative">
                    <Popover
                      open={openPopover[dateStr] || false}
                      onOpenChange={(isOpen) => togglePopover(dateStr, isOpen)}
                    >
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "h-8 w-8 p-0 font-normal rounded-sm mx-1 cursor-pointer",
                            "hover:bg-accent hover:text-accent-foreground",
                            "focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2",
                            isSelected &&
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
                          selectedDateAndTime={selectedDateAndTime}
                          updateTimeSlots={updateTimeSlots}
                          keepOpen={() => togglePopover(dateStr, true)}
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

const TimeSlots: React.FC<TimeSlotsProps> = ({
  title,
  selectedDateAndTime,
  updateTimeSlots,
  keepOpen,
}) => {
  const { generateTimeSlots } = useSlotAllocation();

  const dateStr = format(title, "yyyy-MM-dd");
  const selectedTimes = selectedDateAndTime[dateStr] || {};

  return (
    <>
      <div className="flex justify-center">
        <span>{title.toDateString()}</span>
      </div>
      <hr className="mb-3" />
      <div className="grid grid-cols-2 mt-auto gap-3 h-fit">
        {generateTimeSlots().map((slot, index) => (
          <div
            key={index}
            className={`py-2 px-3 text-center text-xs rounded-md border cursor-pointer transition-colors
              ${
                selectedTimes[slot]
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "hover:border-gray-300"
              }`}
            onClick={() => {
              updateTimeSlots(title, slot);
              keepOpen();
            }}
          >
            {slot}
          </div>
        ))}
      </div>
    </>
  );
};
