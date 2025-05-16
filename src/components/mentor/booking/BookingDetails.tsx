import { FC } from 'react'
import { DrawerHeader, DrawerTitle } from '../../ui/drawer'
import { Card, CardContent } from '../../ui/card'
import { Calendar, CalendarDays, CircleDollarSign, Clock, CreditCard, GraduationCap, Hash, Image, NotebookText } from 'lucide-react';
import { format } from 'date-fns'
import convert24To12HourRange from '@/utils/convertTo12HourFormat'
import { IMentorBookingHistory } from '@/types/mentor'
import StatusBadge from '@/components/common/StatusBadge'
import { SiGoogleclassroom } from 'react-icons/si'
import ImageViewer from '@/components/common/ImageViewer';


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
                           <StatusBadge status={booking.status} />
                        </div>
                     </div>

                     <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <CircleDollarSign className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground mb-1">Payment status</p>
                           <StatusBadge status={booking.payment_status} />
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-full">
                           <GraduationCap className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                           <p className="text-sm text-muted-foreground mb-1">Client</p>
                           <div className="flex gap-4 items-center">
                              <div className="w-auto h-15 rounded-md overflow-hidden aspect-[3.5/4] ">
                                 <img
                                    src={`https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${booking.user.profileImg}`}
                                    alt="Profile picture"
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                              <h4 className="font-semibold text-md m-0 p-0">
                                 {booking.user.uname}
                              </h4>
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

                     {booking.status !== "cancelled" && (
                        <div className="flex items-center gap-3">
                           <div className="bg-muted p-2 rounded-full">
                              <SiGoogleclassroom size={20} fill='oklch(55.8% 0.288 302.321)' />
                           </div>
                           <div>
                              <p className="text-sm text-muted-foreground">Session status</p>
                              <StatusBadge status={booking.session_status} />
                           </div>
                        </div>
                     )}
                  </div>
               </CardContent>
            </Card>

            {/* cancel booking area */}
            {booking.status === "cancelled" && booking.refund_type === "partial" && (
               <Card className="w-full rounded-none border-0 shadow-none">
                  <div className="bg-muted rounded-2xl p-4">
                     <h3 className="font-medium">Refund Information</h3>
                  </div>

                  {booking.mentor_refund_info?.transaction_id ? (
                     <CardContent className="p-0 pt-4">
                        <div className="space-y-4">
                           <div className="flex items-start gap-3">
                              <div className="bg-muted p-2 rounded-full">
                                 <Hash className="h-5 w-5 text-purple-500" />
                              </div>
                              <div>
                                 <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                                 <p className="text-sm">{booking.mentor_refund_info.transaction_id}</p>
                              </div>
                           </div>

                           <div className="flex items-start gap-3">
                              <div className="bg-muted p-2 rounded-full">
                                 <CalendarDays className="h-5 w-5 text-purple-500" />
                              </div>
                              <div>
                                 <p className="text-sm text-muted-foreground mb-1">Transaction completed at</p>
                                 <p className="text-sm">{format(new Date(booking.mentor_refund_info.date), "EEEE, MMMM do, yyyy 'at' h:mm a")}</p>
                              </div>
                           </div>

                           <div className="flex items-start gap-3">
                              <div className="bg-muted p-2 rounded-full">
                                 <Image className="h-5 w-5 text-purple-500" />
                              </div>
                              <div>
                                 <p className="text-sm text-muted-foreground mb-1">Transaction image</p>
                                 <div className="flex items-center gap-4">
                                    <div className="w-auto h-16 rounded-md overflow-hidden aspect-[3.5/4] ">
                                       <ImageViewer
                                          trigger={
                                             <img
                                                src={`https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_TRANSACTION_IMAGE_FOLDER}/${booking.mentor_refund_info.transaction_id}`}
                                                alt="Profile picture"
                                                className="w-full h-full object-cover cursor-pointer"
                                             />
                                          }
                                          folderName={import.meta.env.VITE_TRANSACTION_IMAGE_FOLDER}
                                          image={booking.mentor_refund_info.transaction_id}
                                          title='Transaction image'
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  ) : (
                     <div className='bg-muted/50 p-4 mt-4 text-sm rounded-sm'>
                        <p>Transaction verification is in process. Your compensation amount will be credited within 24 hours.<br />
                           For further assistance, please contact <span className='text-purple-500 underline cursor-pointer'>admin@talktopro.in</span>.
                           <br />Thank you for choosing Talk to Pro.
                        </p>
                     </div>
                  )}
               </Card>
            )}
         </div>
      </div>
   );
};

export default BookingDetails;