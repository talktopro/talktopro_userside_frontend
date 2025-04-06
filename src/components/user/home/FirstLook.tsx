import browserLight from "@/assets/backgrounds/websiteLight.png";
import { CareerBoostGraph } from "./CareerBoostGraph";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

const FirstLook = () => {
  return (
    <div className="h-[90dvh] w-screen overflow-hidden relative homepage_firstlook_bg">
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 py-20 relative">
          <div className="text-sm opacity-65 mb-2">
            Connecting Dreams to Reality
          </div>
          <h1 className="text-4xl lg:text-5xl not-sm:text-3xl font-bold mb-6">
            Find Your Perfect{" "}
            <span className="text-purple-500">Professional Guide</span>
          </h1>
          <p className=" opacity-65 mb-8">
            Talk to Pro bridges the gap between students and industry
            professionals. Whether you're fresh out of college or at a career
            crossroads, connect directly with verified mentors from IT,
            Medicine, Engineering, and more. Get personalized guidance to
            navigate your career path with confidence, avoiding the common
            pitfalls of post-graduation confusion.
          </p>
          <Link to={ROUTES.PROFESSIONALS.LIST}>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-purple-600 transition-colors">
              Explore Mentors
              <span className="bg-white rounded-full p-1">
                <ArrowRight size={16} className="text-purple-500" />
              </span>
            </button>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 h-full relative not-lg:hidden">
          <div className="absolute flex flex-col gap-2 top-40 -left-10 items-end ">
            <div className="bg-background absolute -top-2 -right-1 rounded-md py-3 w-1/2 in-dark:border">
              <p className="text-sm m-0 text-center cursor-pointer text-purple-500 font-semibold">
                #talktopro
              </p>
            </div>
            <div className="flex gap-2 items-end">
              <CareerBoostGraph />
              <div className="rounded-sm shadow-md w-80 h-fit overflow-hidden">
                <div className="bg-background px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-muted rounded-md px-3 py-1.5 text-xs border flex items-center">
                    <div className="flex-shrink-0 mr-1.5">
                      <Lock size={12} strokeWidth={1.5} />
                    </div>
                    https://www.talktopro.in
                  </div>
                </div>
                {/* Browser Content */}
                <img
                  src={browserLight}
                  alt="Website Screenshot"
                  width={304}
                  height={144}
                  className="w-fit h-fit"
                />
              </div>
            </div>

            {/* quotes session */}
            <div className="bg-background rounded-sm shadow-lg py-3 px-6 in-dark:border">
              <div>
                <p className="text-sm italic m-0">
                  'A single conversation with the right mentor can be more
                  valuable than a year of research.'
                </p>
                <span className=" text-xs text-purple-500 mt-1 flex justify-end">
                  - Talk to Pro Mentorship Philosophy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstLook;
