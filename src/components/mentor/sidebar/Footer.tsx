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
import { SidebarFooterMentorDetails } from "@/interfaces/mentor";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

interface SidebarFooterProps {
  mentor: SidebarFooterMentorDetails;
}

const Sidebar_Footer: React.FC<SidebarFooterProps> = ({ mentor }) => {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none "
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground p-1.5">
                <img
                  src={avatar}
                  alt="Profile picture"
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{mentor.name}</span>
                <span className="truncate text-xs">{mentor.email}</span>
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
                onClick={() => navigate(ROUTES.AUTH.LOGIN)}
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
