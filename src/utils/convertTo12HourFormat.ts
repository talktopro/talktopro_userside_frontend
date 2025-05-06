import { parse, format } from 'date-fns';

function convert24To12HourRange(timeRange: string): string {
   const [startTime, endTime] = timeRange.split('-');

   const parsedStart = parse(startTime, 'HH:mm', new Date());
   const parsedEnd = parse(endTime, 'HH:mm', new Date());

   const formattedStart = format(parsedStart, 'h:mm a');
   const formattedEnd = format(parsedEnd, 'h:mm a');

   return `${formattedStart} - ${formattedEnd}`;
};

export default convert24To12HourRange;