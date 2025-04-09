import { ChevronsUpDown, LogOut, Undo2 } from "lucide-react";
import avatar from "@/assets/avatar/user.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "@/redux/slices/authSlice";

const Sidebar_Footer: React.FC = () => {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none "
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                <img
                  src={
                    user?.profileImg
                      ? `https://${bucketName}.s3.amazonaws.com/${user.profileImg}`
                      : avatar
                  }
                  alt="Profile picture"
                  className="w-full h-full object-cover cursor-pointer rounded-lg"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.uname}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuItem className="gap-2 p-2">
              <div
                className="flex items-center transition duration-300 cursor-pointer hover:bg-muted"
                onClick={() => navigate(ROUTES.HOME)}
              >
                <Undo2 strokeWidth={1.5} size={18} />
                <span className="ml-2">Back to Home</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2">
              <div
                className="flex items-center transition duration-300 cursor-pointer hover:bg-muted text-red-500"
                onClick={handleLogout}
              >
                <LogOut strokeWidth={1.5} size={18} className="text-red-500" />
                <span className="ml-2">Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default Sidebar_Footer;
