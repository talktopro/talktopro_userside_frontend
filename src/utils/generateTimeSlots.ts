import { addHours, format } from "date-fns";

//! Creating predefined timeslots to display inside popover
function generateTimeSlots(): string[] {
   return Array.from({ length: 12 }, (_, i) => {
      const startTime = addHours(new Date(2000, 0, 1, 10), i);
      const endTime = addHours(startTime, 1);
      return `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;
   });
};

export default generateTimeSlots;