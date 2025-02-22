import { useState } from "react";
import { addMonths, addDays, isBefore, isAfter, startOfToday } from "date-fns";

const useSlotAllocation = () => {
  const today = new Date();
  const displayMonths = [0, 1, 2].map((i) => addMonths(today, i));

  const startDate = startOfToday();
  const endDate = addDays(startDate, 50);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const disableDate = (date: Date): boolean => {
    return isBefore(date, startDate) || isAfter(date, endDate);
  };

  const handleDateClick = (days: Date[] | undefined) => {
    if (days) {
      setSelectedDates(days);
    }
  };
  return { displayMonths, selectedDates, handleDateClick, disableDate, today };
};

export default useSlotAllocation;
