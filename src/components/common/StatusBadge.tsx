import { FC } from "react"

type StatusType =
   |"initiated"
   | "pending"
   | "payment_pending"
   | "success"
   | "failed"
   | "refund_pending"
   | "cancelled"
   | "refund_success"
   | "incomplete"
   | "complete";

interface StatusBadgeProps {
   status: StatusType;
   className?: string;
};

const StatusBadge: FC<StatusBadgeProps> = ({ status, className = "" }) => {
   // Color configurations for light and dark modes.....
   const statusConfig = {
      initiated: {
         light: "bg-amber-50 text-amber-800 border-amber-200",
         dark: "dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700",
         label: "Pending"
      },
      pending: {
         light: "bg-amber-50 text-amber-800 border-amber-200",
         dark: "dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700",
         label: "Pending"
      },
      payment_pending: {
         light: "bg-amber-50 text-amber-800 border-amber-200",
         dark: "dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700",
         label: "Pending"
      },
      success: {
         light: "bg-emerald-50 text-emerald-800 border-emerald-200",
         dark: "dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700",
         label: "Success"
      },
      refund_success: {
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
         light: "bg-yellow-50 text-yellow-800 border-yellow-200",
         dark: "dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-700",
         label: "Incomplete"
      },
      // Fallback for unknown statuses
      unknown: {
         light: "bg-gray-50 text-gray-800 border-gray-200",
         dark: "dark:bg-gray-900/30 dark:text-gray-200 dark:border-gray-700",
         label: "Unknown"
      }
   };

   // Safely get the status config or fallback to unknown
   const currentStatus = statusConfig[status] || statusConfig.unknown;

   return (
      <span
         className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${currentStatus.light} ${currentStatus.dark} transition-colors ${className}`}>
         {currentStatus.label}
      </span>
   );
};

export default StatusBadge;