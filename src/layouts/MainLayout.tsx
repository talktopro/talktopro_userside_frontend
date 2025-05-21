import { Outlet } from "react-router-dom";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/common/Footer";
import ExpiryDialog from "@/components/common/ExpiryDialog";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-18">
        <ExpiryDialog />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
