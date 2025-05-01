import { FC } from 'react'
import { DrawerHeader, DrawerTitle } from '../../ui/drawer'
import { Card, CardContent } from '../../ui/card'
import { Calendar, CircleDollarSign, Clock, CreditCard, GraduationCap, Hash, NotebookText } from 'lucide-react'
import { Badge } from '../../common/Badge'
import { format } from 'date-fns'
import convert24To12HourRange from '@/utils/convertTo12HourFormat'
import { IMentorBookingHistory } from '@/types/mentor'


interface IBookingDetailsDrawerProps {
   booking: IMentorBookingHistory;
};

const BookingDetails: FC<IBookingDetailsDrawerProps> = ({ booking }) => {
   const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

   return (
      <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
         <DrawerHeader className="pb-0">
            <DrawerTitle className="text-center text-2xl not-sm:text-xl m-0 font-bold">
               Booking Details
            </DrawerTitle>
            <p className="text-center text-muted-foreground mb-10">
               All the information about the booking details is listed here.
            </p>
         </DrawerHeader>

         <div className="px-6 max-w-6xl mx-auto mt-5 pb-6 space-y-6 flex not-sm:flex-col gap-2 w-full">

            {/* Booking Information Card */}
            <Card className="w-full rounded-none border-0 shadow-none">
               <div className="bg-muted rounded-2xl p-4">
                  <h3 className="font-medium">Booking Information</h3>
               </div>
               <CardContent className="p-0 pt-4">
                  <div className="space-y-4">

                     <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <Hash className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                           <p className="font-sm">{booking._id}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <NotebookText className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground mb-1">Booking status</p>
                           <Badge
                              content={booking.status}
                              background={
                                 booking.status === "pending"
                                    ? "Yellow"
                                    : booking.status === "success"
                                       ? "Green"
                                       : "Red"
                              }
                           />
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <CircleDollarSign className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground mb-1">Payment status</p>
                           <Badge
                              content={booking.payment_status}
                              background={
                                 booking.status === "pending"
                                    ? "Yellow"
                                    : booking.status === "success"
                                       ? "Green"
                                       : "Red"
                              }
                           />
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <GraduationCap className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground mb-1">Mentor</p>
                           <div className="flex items-start gap-4">
                              <div className="w-auto h-20 rounded-md overflow-hidden aspect-[3.5/4] ">
                                 <img
                                    src={`https://${bucketName}.s3.amazonaws.com/${booking.user.profileImg}`}
                                    alt="Profile picture"
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                              <div className="flex flex-col justify-between flex-1">
                                 <div>
                                    <h4 className="font-semibold text-md m-0 p-0">
                                       {booking.user.uname}
                                    </h4>
                                    <p className="text-muted-foreground text-xs m-0">
                                       {booking.user.email}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>


            {/* Session Details Card */}
            <Card className="w-full rounded-none not-sm:mt-10 border-0 shadow-none">
               <div className="bg-muted rounded-2xl p-4">
                  <h3 className="font-medium">Session Details</h3>
               </div>
               <CardContent className="p-0 pt-4">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <Calendar className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground">Date</p>
                           <p className="text-sm">{format(new Date(booking.slot.date), "EEEE, MMMM do, yyyy")}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <Clock className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground">Time</p>
                           <p className="text-sm">{convert24To12HourRange(booking.slot.time)}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <CreditCard className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground">Session Fee</p>
                           <p className="text-sm">₹{booking.slot.fee.toFixed(2)}</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

         </div>
      </div>
   );
};

export default BookingDetails;