import { Outlet } from "react-router-dom";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/common/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-18">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
