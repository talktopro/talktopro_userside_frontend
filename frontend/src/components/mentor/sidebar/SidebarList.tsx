import {
  CalendarDays,
  ChartGantt,
  ChevronRight,
  House,
  NotebookText,
  Settings,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

const SidebarList = () => {
  const navigate = useNavigate();
  return (
    <SidebarGroup>
      <div className="flex items-center gap-2">
        <img src={logo} width={35} />
        <h3 className="text-2xl font-bold flex items-center gap-1">
          Talk<span>To</span> <span className="text-purple-500">Pro</span>
        </h3>
      </div>

      <SidebarMenu className="mt-5">
        <SidebarMenuButton
          tooltip="Dashboard"
          className="cursor-pointer"
          onClick={() => navigate(ROUTES.MENTOR.DASHBOARD)}
        >
          <House strokeWidth={1.5} size={18} />
          <span>Dashboard</span>
        </SidebarMenuButton>

        <SidebarMenuButton
          tooltip="Bookings"
          className="cursor-pointer"
          onClick={() => navigate(ROUTES.MENTOR.BOOKINGS)}
        >
          <NotebookText strokeWidth={1.5} size={18} />
          <span>Bookings</span>
        </SidebarMenuButton>

        <SidebarMenuButton
          tooltip="Slot Management"
          className="cursor-pointer"
          onClick={() => navigate(ROUTES.MENTOR.SLOT_MANAGEMENT)}
        >
          <CalendarDays strokeWidth={1.5} size={18} />
          <span>Slot Management</span>
        </SidebarMenuButton>

        <SidebarMenuButton
          tooltip="Analytics"
          className="cursor-pointer"
          onClick={() => navigate(ROUTES.MENTOR.ANALYTICS)}
        >
          <ChartGantt strokeWidth={1.5} size={18} />
          <span>Analytics</span>
        </SidebarMenuButton>

        <Collapsible>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Settings" className="group">
                <Settings strokeWidth={1.5} size={18} />
                <span>Settings</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    onClick={() => navigate(ROUTES.MENTOR.ACCOUNT_SETTINGS)}
                  >
                    <span className="cursor-pointer">Account settings</span>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubButton
                    onClick={() =>
                      navigate(ROUTES.MENTOR.NOTIFICATION_SETTINGS)
                    }
                  >
                    <span className="cursor-pointer">
                      Notification settings
                    </span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarList;
