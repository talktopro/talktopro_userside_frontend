import { SidebarTrigger } from "../../ui/sidebar";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import Notification from "../../Notification";
import useTheme from "@/hooks/useTheme";
import CustomTooltip from "@/components/common/CustomTooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import img from "@/assets/annan.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="px-4 flex items-center gap-1">
        <Notification />
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
              <AvatarImage src={img} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40 rounded-lg" side="bottom">
            <DropdownMenuItem className="gap-2 p-2">
              <div
                className="flex items-center transition duration-300 cursor-pointer hover:bg-muted"
                onClick={() => navigate(ROUTES.ADMIN.SETTINGS)}
              >
                <Settings strokeWidth={1.5} size={18} />
                <span className="ml-2">Settings</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2">
              <div
                className="flex items-center transition duration-300 cursor-pointer hover:bg-muted text-red-500"
                onClick={() => navigate(ROUTES.ADMIN.LOGIN)}
              >
                <LogOut strokeWidth={1.5} size={18} className="text-red-500" />
                <span className="ml-2">Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
