import SidebarList from "@/components/mentor/sidebar/SidebarList";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import Sidebar_Footer from "./Footer";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent className="mt-5 custom-scrollbar">
          <SidebarList />
        </SidebarContent>
        <SidebarFooter>
          <Sidebar_Footer />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
