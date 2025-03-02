import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { ProfessionalData } from "@/interfaces/user";
import sampleProfessionalImage from "../assets/sampleProfessionalImage.jpg";
import Footer from "@/components/Footer";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BookingCalendar from "@/components/BookingCalendar";
import Navbar from "@/components/Navbar";
import { FC, JSX } from "react";

const ProfessionalDetailsPage = () => {
  const professionalData: ProfessionalData = {
    name: "Vishwas",
    department: "Senior Software Developer",
    rating: 3.8,
    Specializations: [
      "Career Guidance",
      "Python Programming",
      "Web Development",
    ],
    about: `With over 8 years of experience as a software developer, Viswas has worked with top tech companies, solving complex challenges and building scalable web solutions. He specializes in Python, JavaScript, and cloud technologies, making him the perfect mentor for aspiring developers and professionals looking to advance their careers.`,
    Languages: ["Malayalam", "English"],
    Skills: [
      "Full-Stack Development",
      "Python Programming",
      "Cloud Technologies",
      "Career Mentorship",
    ],
  };

  interface ITriggerSlots {
    trigger: JSX.Element;
  }
  const TriggerSlots: FC<ITriggerSlots> = ({ trigger }) => {
    return (
      <Drawer>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent>
          <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
            <DrawerHeader>
              <DrawerTitle className="text-center mt-5">
                Select Date and Time
              </DrawerTitle>
              <DrawerDescription className="text-center">
                Choose your appointment date and time from the calendar.
              </DrawerDescription>
              <div className="flex justify-center items-center gap-2">
                <div className="w-3 h-3 bg-white border border-gray-300 rounded" />
                <span className="text-sm">Available</span>
                <div className="w-3 h-3 bg-purple-50 border border-purple-500 rounded ml-3" />
                <span className="text-sm">Selected</span>
                <div className="w-3 h-3 bg-gray-400 border border-gray-700 rounded ml-3" />
                <span className="text-sm">Not Available</span>
              </div>
              <BookingCalendar />
            </DrawerHeader>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-18">
        <div className="mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div>
              {/* <div
                className={`p-10 flex flex-wrap gap-10 ${
                  theme === "light"
                    ? "bg-gradient-to-r from-[#FFF9F9] to-[#F9F5FF]"    //! I just commented this code because when i change the theme gradient is not updating quickly
                    : "bg-gradient-to-r from-[#171718] to-[#111013]"
                }`}
              > */}
              <div className="sm:p-10 not-sm:p-4 flex flex-wrap gap-10 border-b">
                <div className="md:w-1/4 md:h-auto w-full flex justify-center">
                  <img
                    src={sampleProfessionalImage}
                    alt="Mentor profile"
                    className="h-full w-full md:w-auto object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {professionalData.name}
                      </h1>
                      <p className="opacity-70">
                        {professionalData.department}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center">
                    <span className="text-xl font-semibold">
                      {professionalData.rating}
                    </span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm opacity-70 ml-2">5k Reviews</span>
                  </div>
                  <div className="mt-5">
                    <h2 className="text-lg font-semibold">Specializations</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {professionalData.Specializations.map(
                        (content: string, key: number) => (
                          <Badge content={content} key={key} />
                        )
                      )}
                    </div>
                  </div>
                  <div className="not-sm:hidden">
                    <TriggerSlots
                      trigger={
                        <div className="mt-6 flex flex-wrap gap-3 ">
                          <Button className="cursor-pointer">
                            Book a Session
                          </Button>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="sm:hidden">
                <TriggerSlots
                  trigger={
                    <div className="flex flex-wrap gap-3 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:pt-3 not-sm:border-t-1 not-sm:px-4">
                      <Button className="cursor-pointer w-full">
                        Book a Session
                      </Button>
                    </div>
                  }
                />
              </div>
              <div className="pt-10 sm:px-10 not-sm:px-4 lg:w-3/4 md:w-3/4 w-full ml-auto lg:px-15 md:px-15">
                <h2 className="text-lg font-semibold">
                  About {professionalData.name}
                </h2>
                <p className="mt-2 opacity-70">{professionalData.about}</p>

                <hr className="border-t my-5" />

                <h2 className="text-lg font-semibold">Languages</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {professionalData.Languages.map(
                    (content: string, key: number) => (
                      <Badge content={content} key={key} />
                    )
                  )}
                </div>

                <hr className="border-t my-5" />

                <h2 className="text-lg font-semibold">Skills & Expertise</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {professionalData.Skills.map(
                    (content: string, key: number) => (
                      <Badge content={content} key={key} />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfessionalDetailsPage;
