import SidebarList from "@/components/admin/sidebar/SidebarList";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="mt-5 custom-scrollbar">
        <SidebarList />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
