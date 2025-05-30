import { SidebarTrigger } from "../ui/sidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Moon, Sun } from "lucide-react";
import Notification from "../common/Notification";
import useTheme from "@/hooks/useTheme";
import { useEffect } from "react";
import useNotification from "@/hooks/useNotification";

const MentorHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    notifications,
    isLoading,
    fetchNotification,
    deleteAllNotification,
    isDeleteAllLoading,
    isReadAllNotification,
    readAllNotification,
    handleNotificationClick
  } = useNotification("mentor");

  useEffect(() => {
    fetchNotification();
  }, []);

  return (
    <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="px-4 flex gap-1">
        <Notification
          loading={isLoading}
          notifications={notifications}
          deleteAllNotification={deleteAllNotification}
          isDeleteAllLoading={isDeleteAllLoading}
          role="mentor"
          isReadAllNotification={isReadAllNotification}
          readAllNotification={readAllNotification}
          handleNotificationClick={handleNotificationClick}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="bg-transparent p-2 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Sun strokeWidth={1.5} size={18} />
                ) : (
                  <Moon strokeWidth={1.5} size={18} />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white border-1 border-gray-200 text-black">
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default MentorHeader;
