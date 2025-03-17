import Navbar from "@/components/user/Navbar";
import Footer from "@/components/common/Footer";
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
