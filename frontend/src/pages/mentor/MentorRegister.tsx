import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountData from "@/components/mentor/AccountData";

const MentorResiterPage = () => {
  return (
    <>
      <Navbar />
      <AccountData fromRegisterPage={true} />
      <Footer />
    </>
  );
};

export default MentorResiterPage;
