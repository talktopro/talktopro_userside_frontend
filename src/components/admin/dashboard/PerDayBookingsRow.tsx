import { TableCell, TableRow } from '@/components/ui/table'

const PerDayBookingsRow = () => {
   return (
      <TableRow>
         {/* Mentor Column */}
         <TableCell>
            <div className="flex items-center">
               <div className="w-auto h-10 rounded-md overflow-hidden aspect-[3.5/4]">
                  <img
                     src="https://talk-to-pro-bucket.s3.amazonaws.com/67f57fb17ce8a24dc8f04501"
                     alt="Mentor profile"
                     className="w-full h-full object-cover"
                  />
               </div>
               <div className="ml-2">
                  <p className="font-semibold text-sm">Mentor name</p>
                  <p className="text-muted-foreground text-xs">Mentor phone</p>
               </div>
            </div>
         </TableCell>

         {/* Time Column */}
         <TableCell className="text-center">
            <div className="text-xs px-2 py-1 bg-muted rounded-2xl inline-block">
               11:00 AM - 12:00 PM
            </div>
         </TableCell>

         {/* Client Column */}
         <TableCell>
            <div className="flex items-center justify-end">
               <div className="mr-2">
                  <p className="font-semibold text-right text-sm">User name</p>
                  <p className="text-muted-foreground text-right text-xs">User phone</p>
               </div>
               <div className="w-auto h-10 rounded-md overflow-hidden aspect-[3.5/4]">
                  <img
                     src="https://talk-to-pro-bucket.s3.amazonaws.com/67f57fb17ce8a24dc8f04501"
                     alt="Client profile"
                     className="w-full h-full object-cover"
                  />
               </div>
            </div>
         </TableCell>
      </TableRow>
   )
}

export default PerDayBookingsRow;
