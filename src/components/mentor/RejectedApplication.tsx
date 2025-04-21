import {
   XCircleIcon,
   ShieldCheckIcon,
   MailIcon,
   AlertTriangleIcon,
} from "lucide-react";
import AccountData from "@/components/mentor/AccountData";

interface RejectionProps {
   submissionDate: Date;
   email: string;
   applicationId: string;
   rejectionReason?: string;
}

const ApplicationRejected: React.FC<RejectionProps> = ({
   email,
   rejectionReason = "Does not meet our current professional standards",
}) => {
   return (
      <div className="min-h-screen pt-8">
         <div className="max-w-4xl mx-auto rounded-xl overflow-hidden p-6">
            <div className="text-center mb-8">
               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30">
                  <XCircleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
               </div>
               <h1 className="mt-4 text-2xl font-bold">Application Not Approved</h1>
               <p className="mt-2 opacity-70">
                  We appreciate your interest in Talk to Pro, but we can't approve your application at this time.
               </p>
            </div>

            <div className="space-y-6">
               <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex">
                     <div className="flex-shrink-0">
                        <AlertTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                     </div>
                     <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                           Application Rejected
                        </h3>
                        <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                           <p>
                              After careful review, we've determined that your application doesn't meet our current requirements.
                              {rejectionReason && (
                                 <>
                                    <br />Reason: <span className="font-medium">{rejectionReason}</span>
                                 </>
                              )}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="border-t pt-6">
                  <h2 className="text-lg font-medium">Application Details</h2>
                  <AccountData fromRegisterPage={false} fromApplicationRejectedPage={true} />
               </div>

               <div className="border-t pt-6">
                  <h2 className="text-lg font-medium">Next Steps</h2>
                  <ul className="mt-4 space-y-4">
                     <li className="flex items-start">
                        <div className="flex-shrink-0">
                           <MailIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-3">
                           <p className="text-sm">
                              <span className="font-medium">Notification:</span> A detailed rejection email has been sent to {email} with more information.
                           </p>
                        </div>
                     </li>
                     <li className="flex items-start">
                        <div className="flex-shrink-0">
                           <ShieldCheckIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-3">
                           <p className="text-sm">
                              <span className="font-medium">Reapplication:</span> You may submit a new application after addressing the issues mentioned.
                           </p>
                        </div>
                     </li>
                  </ul>
               </div>

               <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex">
                     <div className="ml-3">
                        <h3 className="text-sm font-medium">Have questions?</h3>
                        <div className="mt-2 text-sm">
                           <p>
                              If you'd like more information about this decision, please contact our support team at
                              <a
                                 href="mailto:support@talktopro.com"
                                 className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 ml-1"
                              >
                                 admin@talktopro.in
                              </a>
                              .
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ApplicationRejected;