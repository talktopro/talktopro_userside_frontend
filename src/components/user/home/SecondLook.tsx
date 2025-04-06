import { ArrowRight, Calendar, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import startSvg from "@/assets/svg/start.svg";
import newImage from "@/assets/backgrounds/manager-secretary-discussing-working-thumb-up-white-background.png";

const MentorPromotion = () => {
  return (
    <div className="h-[90dvh] w-screen overflow-hidden relative homepage_secondlook_bg">
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full flex justify-center items-center lg:w-1/2 h-full not-lg:hidden">
          <img
            src={startSvg}
            alt="Banner image"
            className="w-full absolute h-full object-cover in-dark:opacity-40"
          />
          <img
            src={newImage}
            alt="Centered content"
            className="absolute z-10 h-full -left-30 not-md:-left-50 bottom-0"
          />
        </div>

        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 py-20 relative">
          <div className="text-sm not-sm:text-xs opacity-65 mb-2">
            Share Knowledge • Earn Income • Build Legacy
          </div>
          <h1 className="text-3xl xl:text-5xl font-bold mb-6">
            Become a <span className="text-purple-500">Mentor</span> and <br />
            Empower the Next Generation
          </h1>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-2 rounded-full mt-1">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Flexible Scheduling</h3>
                <p className="text-sm opacity-70">
                  Set your own availability and control when you mentor.
                  Allocate slots that fit your busy schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full mt-1">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Earn Income</h3>
                <p className="text-sm opacity-70">
                  Get paid for sharing your expertise. Competitive rates and
                  secure payments directly to your account.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full mt-1">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Build Your Legacy</h3>
                <p className="text-sm opacity-70">
                  Make a lasting impact by guiding aspiring professionals. Shape
                  the future of your industry.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to={ROUTES.MENTOR.REGISTER}>
              <button className="bg-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-purple-600 transition-colors">
                Register as Mentor
                <span className="bg-white rounded-full p-1">
                  <ArrowRight size={16} className="text-purple-500" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPromotion;
