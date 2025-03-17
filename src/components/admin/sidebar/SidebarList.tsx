import { GraduationCap, House, NotebookText, Users } from "lucide-react";
import logo from "@/assets/logo.svg";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { JSX } from "react";

interface ISideBarList {
  tooltip: string;
  onclick: () => void;
  icon: JSX.Element;
  label: string;
}

const SidebarList = () => {
  const navigate = useNavigate();
  const sideBarItems: ISideBarList[] = [
    {
      tooltip: "Dashboard",
      label: "Dashboard",
      icon: <House strokeWidth={1.5} size={18} />,
      onclick: () => navigate(ROUTES.ADMIN.DASHBOARD),
    },
    {
      tooltip: "Mentors",
      label: "Mentors",
      icon: <GraduationCap strokeWidth={1.5} size={18} />,
      onclick: () => navigate(ROUTES.ADMIN.MENTORS),
    },
    {
      tooltip: "Users",
      label: "Users",
      icon: <Users strokeWidth={1.5} size={18} />,
      onclick: () => navigate(ROUTES.ADMIN.USERS),
    },
    {
      tooltip: "Bookings",
      label: "Bookings",
      icon: <NotebookText strokeWidth={1.5} size={18} />,
      onclick: () => navigate(ROUTES.ADMIN.BOOKINGS),
    },
  ];
  return (
    <SidebarGroup>
      <div className="flex items-center gap-2">
        <img src={logo} width={35} />
        <h3 className="text-2xl font-bold flex items-center gap-1">
          Talk<span>To</span> <span className="text-purple-500">Pro</span>
        </h3>
      </div>

      <SidebarMenu className="mt-10">
        {sideBarItems.map((item) => {
          return (
            <SidebarMenuButton
              tooltip={item.tooltip}
              className="cursor-pointer"
              onClick={item.onclick}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarList;
