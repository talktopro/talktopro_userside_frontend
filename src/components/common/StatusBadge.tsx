import { FC } from "react"

type StatusType =
   | "pending"
   | "success"
   | "failed"
   | "refund_pending"
   | "cancelled"
   | "refund_complete"
   | "incomplete"
   | "complete";

interface StatusBadgeProps {
   status: StatusType;
   className?: string;
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, className = "" }) => {
   // Color configurations for light and dark modes
   const statusConfig = {
      pending: {
         light: "bg-amber-50 text-amber-800 border-amber-200",
         dark: "dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700",
         label: "Pending"
      },
      success: {
         light: "bg-emerald-50 text-emerald-800 border-emerald-200",
         dark: "dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700",
         label: "Success"
      },
      refund_complete: {
         light: "bg-emerald-50 text-emerald-800 border-emerald-200",
         dark: "dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700",
         label: "Refund Complete"
      },
      complete: {
         light: "bg-emerald-50 text-emerald-800 border-emerald-200",
         dark: "dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700",
         label: "Completed"
      },
      failed: {
         light: "bg-red-50 text-red-800 border-red-200",
         dark: "dark:bg-red-900/30 dark:text-red-200 dark:border-red-700",
         label: "Failed"
      },
      cancelled: {
         light: "bg-red-50 text-red-800 border-red-200",
         dark: "dark:bg-red-900/30 dark:text-red-200 dark:border-red-700",
         label: "Cancelled"
      },
      refund_pending: {
         light: "bg-amber-50 text-amber-800 border-amber-200",
         dark: "dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700",
         label: "Refund Pending"
      },
      incomplete: {
         light: "bg-amber-50 text-amber-800 border-amber-200",
         dark: "dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700",
         label: "Incomplete"
      }
   };

   const currentStatus = statusConfig[status];

   return (
      <span
         className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${currentStatus.light} ${currentStatus.dark} transition-colors ${className}`}>
         {currentStatus.label}
      </span>
   );
};

export default StatusBadge;