import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  House,
  LogOut,
  NotebookText,
  Settings,
  UserRoundCog,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/routes";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const SidebarList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const isActive = (route: string) => {
    return location.pathname === route;
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SidebarGroup>
      <div className="flex items-center gap-2">
        <img src={logo} width={35} alt="TalkToPro Logo" />
        <h3 className="text-2xl font-bold flex items-center gap-1">
          Talk<span>To</span> <span className="text-purple-500">Pro</span>
        </h3>
      </div>

      <button
        className="text-xs border border-dashed py-1.5 border-primary rounded-lg mt-6 w-fit px-3 flex items-center justify-start cursor-pointer hover:bg-muted transition-colors duration-100"
        onClick={() => handleNavigation(ROUTES.HOME)}
      >
        <ChevronLeft strokeWidth={1} size={15} />
        Go back to user dashboard
      </button>

      <SidebarMenu className="mt-5">
        <SidebarMenuButton
          tooltip="Dashboard"
          className={`cursor-pointer ${isActive(ROUTES.MENTOR.DASHBOARD)
            ? "bg-primary/20 transition-colors duration-100"
            : ""
            }`}
          onClick={() => handleNavigation(ROUTES.MENTOR.DASHBOARD)}
        >
          <House strokeWidth={1.5} size={18} />
          <span>Dashboard</span>
        </SidebarMenuButton>

        <SidebarMenuButton
          tooltip="Bookings"
          className={`cursor-pointer ${isActive(ROUTES.MENTOR.BOOKINGS)
            ? "bg-primary/20 transition-colors duration-100"
            : ""
            }`}
          onClick={() => handleNavigation(ROUTES.MENTOR.BOOKINGS)}
        >
          <NotebookText strokeWidth={1.5} size={18} />
          <span>Bookings</span>
        </SidebarMenuButton>

        <SidebarMenuButton
          tooltip="Slot Management"
          className={`cursor-pointer ${isActive(ROUTES.MENTOR.SLOT_MANAGEMENT)
            ? "bg-primary/20 transition-colors duration-100"
            : ""
            }`}
          onClick={() => handleNavigation(ROUTES.MENTOR.SLOT_MANAGEMENT)}
        >
          <CalendarDays strokeWidth={1.5} size={18} />
          <span>Slot Management</span>
        </SidebarMenuButton>

        <SidebarMenuButton
          tooltip="Slot Management"
          className={`cursor-pointer ${isActive(ROUTES.MENTOR.PRICING)
            ? "bg-primary/20 transition-colors duration-100"
            : ""
            }`}
          onClick={() => handleNavigation(ROUTES.MENTOR.PRICING)}
        >
          <CircleDollarSign strokeWidth={1.5} size={18} />
          <span>Pricing</span>
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
                <SidebarMenuSubItem className="flex flex-col gap-1.5">
                  <SidebarMenuSubButton
                    className={`cursor-pointer ${isActive(ROUTES.MENTOR.ACCOUNT_SETTINGS)
                      ? "bg-primary/20 transition-colors duration-100"
                      : ""
                      }`}
                    onClick={() =>
                      handleNavigation(ROUTES.MENTOR.ACCOUNT_SETTINGS)
                    }
                  >
                    <UserRoundCog strokeWidth={1.5} size={15} />
                    <span>Account settings</span>
                  </SidebarMenuSubButton>
                  <SidebarMenuSubButton
                    className="cursor-pointer text-red-500 hover:bg-red-500/50 transition-colors duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut strokeWidth={1.5} size={15} className="text-red-500" />
                    <span>Logout</span>
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
