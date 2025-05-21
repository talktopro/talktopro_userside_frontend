import ExpiryDialog from "@/components/common/ExpiryDialog";
import Footer from "@/components/common/Footer";
import MentorHeader from "@/components/mentor/Header";
import { AppSidebar } from "@/components/mentor/sidebar/SidebarMain";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const MentorLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MentorHeader />
        <ExpiryDialog />
        <Outlet /> {/* This is where the child routes will render */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MentorLayout;
