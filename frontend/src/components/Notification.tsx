import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";

interface Notification {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    message: "Your booking has been confirmed.",
    date: "2023-10-15",
    isRead: false,
  },
  {
    id: 2,
    message: "Your payment was successful.",
    date: "2023-10-14",
    isRead: true,
  },
  {
    id: 3,
    message: "New service available in your area.",
    date: "2023-10-13",
    isRead: false,
  },
  {
    id: 4,
    message: "Your account password has been updated.",
    date: "2023-10-12",
    isRead: true,
  },
  {
    id: 5,
    message: "You have a new message from Support.",
    date: "2023-10-11",
    isRead: false,
  },
  {
    id: 6,
    message: "Your subscription is about to expire.",
    date: "2023-10-10",
    isRead: false,
  },
  {
    id: 7,
    message: "A new review has been posted for your service.",
    date: "2023-10-09",
    isRead: true,
  },
  {
    id: 8,
    message: "Your profile has been updated successfully.",
    date: "2023-10-08",
    isRead: false,
  },
  {
    id: 9,
    message: "You have earned a new badge!",
    date: "2023-10-07",
    isRead: true,
  },
  {
    id: 10,
    message: "A new feature is now available.",
    date: "2023-10-06",
    isRead: false,
  },
];

const Notification = () => {
  const [isNotificationLoading, setIsNotificationLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNotificationLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-transparent px-2 py-1 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer">
                  <Bell strokeWidth={1.5} width={18} />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white border-1 border-gray-200 text-black">
                <p>Notification</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-1 w-100 not-sm:w-80 mr-10">
          <div className="grid gap-4">
            <div className="space-y-2 max-h-96 overflow-auto scrollbar-none">
              {isNotificationLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="px-4 py-2 rounded-sm">
                      <Skeleton className="h-10 w-full mb-2 bg-muted" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-1/4 bg-muted" />
                        <Skeleton className="h-3 w-1/4 bg-muted" />
                      </div>
                    </div>
                  ))
                : notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-2 rounded-sm hover:bg-muted/10 cursor-pointer ${
                        notification.isRead ? "bg-muted/30" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm font-medium">
                        {notification.message}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          {notification.date}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.isRead ? "Read" : "Unread"}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default Notification;
