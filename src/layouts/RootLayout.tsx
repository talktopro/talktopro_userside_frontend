import Chatbot from "@/components/ai/Chat";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
};

export default RootLayout;