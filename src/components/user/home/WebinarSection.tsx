import { ROUTES } from "@/routes/routes";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WebinarSection = () => {
  return (
    <section className="faq_bg  flex justify-center items-center py-15 pb-25 select-none">
      <div className="max-w-5xl px-8 not-sm:px-4 flex flex-col justify-center items-center ">
        <h1 className=" capitalize font-bold text-2xl lg:text-3xl not-sm:text-xl">
          join our exclusive <span className="text-purple-500">webinar</span>
        </h1>
        <p className="mt-2 text-lg not-sm:text-sm text-center mx-auto">
          Discover expert insights, practical tips, and live Q&A with industry
          professionals. Don't miss this opportunity to level up your knowledge
          and connect with peers.
        </p>
        <Link
          to={ROUTES.WEBINAR}
          className="flex justify-center items-center mt-3"
        >
          <button className="flex justify-center items-center text-white gap-2 bg-purple-500 mt-2 cursor-pointer px-6 py-3 rounded-full hover:bg-purple-600 transition-colors">
            Explore Webinar
            <span className="bg-white p-1  rounded-full">
              <ArrowRight size={16} className="text-purple-500" />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default WebinarSection;
