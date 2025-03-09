import MentorCard from "@/components/MentorCard";
import Banner from "@/components/Banner";
import { ROUTES } from "@/routes/routes";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const dummyMentor = {
  _id: "67bd68abe8a276928c8e102a",
  uname: "abcde",
  email: "abcde@gmail.com",
  phone: 1231231231,
  isMentor: true,
  mentor_application_status: "Accepted",
  __v: 0,
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmQ2OGFiZThhMjc2OTI4YzhlMTAyYSIsImlhdCI6MTc0MDUwNzYzNCwiZXhwIjoxNzQwOTM5NjM0fQ.n602GNEprukQ2iEOb_B8FqIrhD5b1IeKibnFA9sK0Uo",
  mentorDetails: {
    first_name: "ashin",
    last_name: "j",
    profession: "pani",
    about: "lklkklkl",
    skills: ["java"],
    languages: ["english"],
    _id: "67bd6bfa701c9938b3211f20",
  },
};

const MentorSection = () => (
  <section className="flex justify-center items-center">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {[...Array(4)].map((_, index) => (
          <MentorCard key={index} mentor={dummyMentor} />
        ))}
      </div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col py-10">
      <div className="sm:px-8 not-sm:px-4 mb-15">
        <Banner
          bg="firstframe.svg"
          image="Clip path group.png"
          title="Unlock Your Potential with Expert Mentorship!"
          description="Connect with professionals to receive tailored guidance for your growth."
          buttonText="Get Started"
        />
        <div className="flex justify-between items-center group mb-5">
          <span className="text-lg font-semibold">Top Mentors for You</span>
          <Link
            to={ROUTES.PROFESSIONALS.LIST}
            className="flex items-center cursor-pointer"
          >
            See all
            <ChevronRight className="w-6 h-6 transition-opacity duration-200" />
          </Link>
        </div>

        <MentorSection />
        <Banner
          bg="secondBannerBg.svg"
          image="secondimg.svg"
          title="Free Seminar for Aspiring Software Developers"
          subtitle="Learn from John Doe, Former Microsoft Engineer."
          description="Date: 29th June 2024 | Time: 4:00 PM - 6:00 PM (IST)"
          buttonText="Click here for more Info"
        />

        <div className="flex justify-between items-center group mb-5">
          <span className="text-lg font-semibold">Top Mentors for You</span>
          <Link
            to={ROUTES.PROFESSIONALS.LIST}
            className="flex items-center cursor-pointer"
          >
            See all
            <ChevronRight className="w-6 h-6 transition-opacity duration-200" />
          </Link>
        </div>

        <MentorSection />
      </div>
    </div>
  );
};

export default HomePage;
