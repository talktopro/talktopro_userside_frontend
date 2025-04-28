import { SidebarTrigger } from "../../ui/sidebar";
import { LogOut, Moon, Sun } from "lucide-react";
import Notification from "../../common/Notification";
import useTheme from "@/hooks/useTheme";
import CustomTooltip from "@/components/common/CustomTooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { INotification } from "@/interfaces/admin";
import apiClient from "@/api/axiosInstance";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { adminLogout } from "@/redux/slices/adminSlice";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AdminHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchNotification = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<INotification[]>(`url`);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error occurred while fetching Notifications!", error);
      toast.error("Failed to collect Notifications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate(ROUTES.ADMIN.LOGIN);
  };

  return (
    <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="px-4 flex items-center gap-1">
        <Notification loading={isLoading} notifications={notifications} />
        <CustomTooltip
          trigger={
            <div onClick={toggleTheme}>
              {theme === "light" ? (
                <Sun strokeWidth={1.5} size={18} />
              ) : (
                <Moon strokeWidth={1.5} size={18} />
              )}
            </div>
          }
          content="Theme"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-7 h-7 ml-1 cursor-pointer">
              <AvatarImage src={logo} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-40 rounded-lg mr-4"
            side="bottom"
          >

            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-2 p-2" onSelect={(e) => e.preventDefault()}>
                  <div
                    className="flex items-center transition duration-300 cursor-pointer hover:bg-muted text-red-500"
                  >
                    <LogOut strokeWidth={1.5} size={18} className="text-red-500" />
                    <span className="ml-2">Logout</span>
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="w-sm p-6">
                <DialogHeader>
                  <DialogTitle className="text-center mb-2">
                    Confirm Logout
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    You will be logged out of your account. Are you sure you want to continue?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-1">
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      className="w-1/2 text-white bg-red-600 hover:bg-red-700"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className="w-1/2 border"
                    variant="ghost"
                    onClick={handleLogout}
                  >
                    Yes, Logout
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
