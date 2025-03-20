import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, BellOff } from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import { Skeleton } from "../ui/skeleton";
import { FC } from "react";
import { INotification } from "@/interfaces/user";
import CustomTooltip from "./CustomTooltip";

interface INotificationProps {
  notifications: INotification[];
  loading: boolean;
}

const Notification: FC<INotificationProps> = ({ notifications, loading }) => {
  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <CustomTooltip
              content="Notification"
              trigger={<Bell strokeWidth={1.5} width={18} height={18} />}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-1 w-100 not-sm:w-80 sm:mr-10 not-sm:mr-4">
          <div className="grid gap-4">
            <div className="space-y-2 max-h-96 overflow-auto custom-scrollbar">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="px-4 py-2 rounded-sm">
                    <Skeleton className="h-10 w-full mb-2 bg-muted" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-3 w-1/4 bg-muted" />
                      <Skeleton className="h-3 w-1/4 bg-muted" />
                    </div>
                  </div>
                ))
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
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
                ))
              ) : (
                <div className="flex flex-col justify-center items-center h-96">
                  <BellOff strokeWidth={1} size={30} className="opacity-60" />
                  <p className="opacity-60 mt-3 text-sm">
                    Notification are not Found!
                  </p>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default Notification;
