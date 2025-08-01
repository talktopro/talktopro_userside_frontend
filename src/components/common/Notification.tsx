import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, BellOff } from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import { Skeleton } from "../ui/skeleton";
import { FC } from "react";
import { INotification as userNotification } from "@/interfaces/user";
import { INotification as mentorNotification } from "@/interfaces/mentor";
import CustomTooltip from "./CustomTooltip";
import { format } from "date-fns";
import { Button } from "../ui/button";

type INotificationType = userNotification | mentorNotification;

interface INotificationProps {
  notifications: INotificationType[];
  loading: boolean;
  role: "user" | "mentor";
  deleteAllNotification: () => Promise<void>;
  isDeleteAllLoading: boolean;
  readAllNotification: () => Promise<void>;
  isReadAllNotification: boolean;
  handleNotificationClick: (id: string) => Promise<void>;
};

const Notification: FC<INotificationProps> = ({
  notifications,
  loading,
  role,
  deleteAllNotification,
  isDeleteAllLoading,
  isReadAllNotification,
  readAllNotification,
  handleNotificationClick,
}) => {
  const unReadNotificationCount = notifications.filter(n =>
    role === 'user'
      ? (n as userNotification).isRead.user_is_read === false
      : (n as mentorNotification).isRead.mentor_is_read === false
  ).length;

  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <CustomTooltip
              content="Notification"
              trigger={
                <div className="relative">
                  <Bell strokeWidth={1.5} width={18} height={18} />
                  {unReadNotificationCount > 0 && (
                    <span
                      className={`absolute -top-2 ${unReadNotificationCount > 9 ? "left-1.5" : "left-2"} h-4 w-auto flex items-center justify-center px-1.5 text-xs text-white bg-purple-500 rounded-full text-center`}
                    >
                      {unReadNotificationCount > 9 ? `9+` : unReadNotificationCount}
                    </span>
                  )}
                </div>
              }
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-1 w-100 not-sm:w-80 sm:mr-10 not-sm:mr-4">
          <div className="grid gap-4">
            <div className="space-y-2">
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
                <>
                  <div className="max-h-80 overflow-auto custom-scrollbar">
                    {notifications.map((notification, index) => {
                      const isRead = role === 'user'
                        ? (notification as userNotification).isRead.user_is_read
                        : (notification as mentorNotification).isRead.mentor_is_read;

                      return (
                        <div
                          key={notification._id}
                          className={`px-4 py-2 ${index !== 0 && "mt-0.5"} rounded-sm hover:bg-muted/10 cursor-pointer transition-colors duration-200 ${isRead ? "bg-muted/30" : "bg-muted"}`}
                          onClick={() => handleNotificationClick(notification._id)}
                        >
                          <p className="text-xs font-medium">
                            {notification.messages}
                          </p>
                          <div className="flex justify-end items-center">
                            <p className="text-xs text-muted-foreground">
                              {format(notification.createdAt, "dd-MM-yyyy, h:mm a")}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="sticky bottom-0 bg-background pt-1 border-t flex justify-between">
                    <Button
                      variant="ghost"
                      className="w-1/2"
                      disabled={isReadAllNotification}
                      onClick={readAllNotification}
                    >
                      {isReadAllNotification ? "Marking all as read..." : "Mark all as read"}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-1/2 text-red-500 hover:text-red-600"
                      disabled={isDeleteAllLoading}
                      onClick={deleteAllNotification}
                    >
                      {isDeleteAllLoading ? "Deleting..." : "Delete all"}
                    </Button>
                  </div>
                </>
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
