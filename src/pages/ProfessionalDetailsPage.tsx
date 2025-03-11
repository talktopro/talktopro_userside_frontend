import { Mentor } from "./AllProfessionalsPage";
import sampleProfessionalImage from "../assets/sampleProfessionalImage.jpg";
import { Badge } from "@/components/ui/Badge";
import { FC, JSX } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import BookingCalendar from "@/components/BookingCalendar";
import { Button } from "@/components/ui/button";

const mentorData: Mentor = {
  _id: "mentor123",
  uname: "johndoe",
  email: "john.doe@example.com",
  phone: 1234567890,
  isMentor: true,
  mentor_application_status: "approved",
  __v: 0,
  refreshToken: "dummyRefreshToken123",
  mentorDetails: {
    first_name: "John",
    last_name: "Doe",
    profession: "Senior Software Engineer",
    about:
      "John is a seasoned software engineer with over 10 years of experience, specializing in building scalable web applications and mentoring aspiring developers.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
    languages: ["English", "Spanish"],
    _id: "details123",
  },
};
const ProfessionalDetailsPage = () => {

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
      <div className="w-full min-h-screen p-5">
        <div className="w-full block sm:flex">
          <div className="sm:w-[20%] p-5">
            <img
              src={sampleProfessionalImage}
              alt="Mentor profile"
              className="h-full w-full sm:w-auto object-cover rounded-lg"
            />
          </div>
          <div className="w-full sm:w-[80%] p-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {`${mentorData.mentorDetails.first_name} ${mentorData.mentorDetails.last_name}`}
                </h1>
                <p className="opacity-70">
                  {mentorData.mentorDetails.profession}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <span className="text-xl font-semibold">
                {/* {professionalData.rating} */}4.5
              </span>
              <span className="text-yellow-400">★</span>
              <span className="text-sm opacity-70 ml-2">5k Reviews</span>
            </div>
            <div className="mt-5">
              <h2 className="text-lg font-semibold">Specializations</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {mentorData.mentorDetails.skills.map(
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
        <hr className="h-2 px-5" />
        <div className="w-full block sm:flex flex-row-reverse">
          <div className="w-full sm:w-[80%] p-5">
            <h2 className="text-lg font-semibold">
              About {`${mentorData.mentorDetails.first_name} ${mentorData.mentorDetails.last_name}`}
            </h2>
            {/* <p className="mt-2 opacity-70">{professionalData.about}</p> */}
            <p className="mt-2 opacity-70">{mentorData.mentorDetails.about}</p>

            <hr className="border-t my-5" />

            <h2 className="text-lg font-semibold">Languages</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {mentorData.mentorDetails.languages.map(
                (content: string, key: number) => (
                  <Badge content={content} key={key} />
                )
              )}
            </div>

            <hr className="border-t my-5" />

            <h2 className="text-lg font-semibold">Skills & Expertise</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {mentorData.mentorDetails.skills.map(
                (content: string, key: number) => (
                  <Badge content={content} key={key} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <TriggerSlots
          trigger={
            <div className="flex py-3 w-full flex-wrap gap-3 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:pt-3 not-sm:border-t-1 not-sm:px-4">
              <Button className="cursor-pointer w-full">
                Book a Session
              </Button>
            </div>
          }
        />
      </div>
    </>
  )
}

export default ProfessionalDetailsPage;