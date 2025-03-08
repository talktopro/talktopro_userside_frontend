import AdminHeader from "@/components/admin/sidebar/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/admin/sidebar/SidebarMain";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <Outlet /> {/* This is where the child routes will render */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
