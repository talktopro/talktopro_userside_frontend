import { ApiReponseAllocatedSlotsSchema, IBookingSchedule } from "@/types/mentor";
import { format, parse } from "date-fns";

//! Convert API response result according to frontend schema
function SlotResponseConverter(apiResponse: ApiReponseAllocatedSlotsSchema[]): IBookingSchedule {
   const result: IBookingSchedule = {};

   for (const slotGroup of apiResponse) {
      if (!slotGroup.slots || slotGroup.slots.length === 0) continue;

      const dateKey = format(new Date(slotGroup.date), 'dd-MM-yyyy');
      result[dateKey] = {};

      for (const slot of slotGroup.slots) {
         const [startTime24, endTime24] = slot.time.split('-').map(t => t.trim());
         const startTime = parse(startTime24, 'HH:mm', new Date());
         const endTime = parse(endTime24, 'HH:mm', new Date());
         const timeSlotKey = `${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;

         result[dateKey][timeSlotKey] = {
            isBooked: slot.booked
         };
      }
   }

   return result;
};

export default SlotResponseConverter;