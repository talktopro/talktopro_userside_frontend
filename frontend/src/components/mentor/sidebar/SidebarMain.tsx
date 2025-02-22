import SidebarList from "@/components/mentor/sidebar/SidebarList";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import Sidebar_Footer from "./Footer";
import { SidebarFooterMentorDetails } from "@/interfaces/mentor";

const mentorDetails: SidebarFooterMentorDetails = {
  name: "Ronaldo",
  email: "suuuuiiiii@gmail.com",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent className="mt-5 custom-scrollbar">
          <SidebarList />
        </SidebarContent>
        <SidebarFooter>
          <Sidebar_Footer mentor={mentorDetails} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
