import useSlotAllocation from "@/hooks/useSlotAllocation";
import { Calendar } from "../ui/calendar";

const SlotAllocationCalendar = () => {
  const { displayMonths, selectedDates, handleDateClick, disableDate, today } =
    useSlotAllocation();

  return (
    <div className="flex not-sm:justify-center sm:justify-evenly flex-wrap border-1 rounded-md pt-2 pb-4">
      {displayMonths.map((month, index) => (
        <div key={index} className="w-80 flex justify-center">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={handleDateClick}
            month={month}
            fromMonth={month}
            toMonth={month}
            showOutsideDays={true}
            fixedWeeks={true}
            ISOWeek={false}
            disabled={disableDate}
            defaultMonth={today}
          />
        </div>
      ))}
    </div>
  );
};

export default SlotAllocationCalendar;
