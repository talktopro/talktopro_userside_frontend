import { addMonths, addDays, startOfToday, format } from "date-fns";
import { useState } from "react";

const useSlotAllocation = () => {
  const today = new Date();
  const displayMonths = [0, 1, 2].map((i) => addMonths(today, i));

  const startDate = startOfToday();
  const endDate = addDays(startDate, 50);

  const availableDates = (() => {
    const result: Record<string, boolean> = {};
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const dateStr = format(currentDate, "yyyy-MM-dd");
      result[dateStr] = currentDate >= startDate && currentDate <= endDate;
      currentDate = addDays(currentDate, 1);
    }
    return result;
  })();

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

  const [selectedDateAndTime, setSelectedDateAndTime] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const updateTimeSlots = (date: Date, time: string) => {
    const updateDate = format(date, "yyyy-MM-dd");

    setSelectedDateAndTime((prev) => {
      const newState = { ...prev };

      if (newState[updateDate]) {
        if (newState[updateDate][time]) {
          delete newState[updateDate][time];

          if (Object.keys(newState[updateDate]).length === 0) {
            delete newState[updateDate];
          }
        } else {
          newState[updateDate][time] = true;
        }
      } else {
        newState[updateDate] = { [time]: true };
      }

      console.log("new state: ", newState);
      return newState;
    });
  };

  return {
    displayMonths,
    availableDates,
    generateTimeSlots,
    selectedDateAndTime,
    updateTimeSlots,
  };
};

export default useSlotAllocation;
