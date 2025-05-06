//! convert time range (02:00 PM - 03:00 PM (12hr base) to 14:00-15:00 (24hr base));

import { format, parse } from "date-fns";

function convertTo24HourFormat(timeRange: string): string {
   const [start, end] = timeRange.split(' - ');
   const startDate: Date = parse(start, 'h:mm a', new Date());
   const endDate: Date = parse(end, 'h:mm a', new Date());
   return `${format(startDate, 'HH:mm')}-${format(endDate, 'HH:mm')}`;
}

export default convertTo24HourFormat;