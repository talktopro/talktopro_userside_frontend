import { addMonths, addDays, startOfToday, format } from "date-fns";
import { useState } from "react";

const useSlotAllocation = () => {
  const today = new Date();
  const displayMonths = [0, 1].map((i) => addMonths(today, i));

  const startDate = startOfToday();
  const endDate = addDays(startDate, 30);

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
    Record<string, Record<string, "available" | "booked">>
  >({
    "2025-04-16": {
      "6:00 PM - 7:00 PM": "booked",
      "9:00 PM - 10:00 PM": "available",
    },
    "2025-04-17": {
      "10:00 AM - 11:00 AM": "available",
      "1:00 PM - 2:00 PM": "booked",
    },
    "2025-04-18": {
      "11:00 AM - 12:00 PM": "available",
      "2:00 PM - 3:00 PM": "booked",
    },
    "2025-04-19": {
      "3:00 PM - 4:00 PM": "available",
    },
    "2025-04-20": {
      "5:00 PM - 6:00 PM": "booked",
      "7:00 PM - 8:00 PM": "available",
    },
    "2025-04-21": {
      "6:00 PM - 7:00 PM": "available",
    },
    "2025-04-22": {
      "8:00 PM - 9:00 PM": "booked",
    },
    "2025-04-24": {
      "1:00 PM - 2:00 PM": "booked",
    },
    "2025-04-25": {
      "4:00 PM - 5:00 PM": "available",
    },
  });


  const updateTimeSlots = (date: Date, time: string) => {
    const updateDate = format(date, "yyyy-MM-dd");

    setSelectedDateAndTime((prev) => {
      const newState = { ...prev };

      if (newState[updateDate]) {
        if (newState[updateDate][time]) {

          //! only delete that field if the time is available not booked
          if (newState[updateDate][time] === "available") {
            delete newState[updateDate][time];

            if (Object.keys(newState[updateDate]).length === 0) {
              delete newState[updateDate];
            }
          }
        } else {
          newState[updateDate][time] = "available";
        }
      } else {
        newState[updateDate] = { [time]: "available" };
      }
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
