import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-18">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
