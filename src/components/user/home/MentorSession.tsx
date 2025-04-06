import MentorCard from "@/components/MentorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/routes/routes";
import { Mentor } from "@/types/user";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const MentorSection = ({
  mentors,
  loading,
}: {
  mentors: Mentor[];
  loading: boolean;
}) => {
  return (
    <section className="flex flex-col py-15 px-4 sm:px-8">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl lg:text-3xl not-sm:text-xl font-bold">
          Top <span className="text-purple-500">Mentors</span> for You
        </h1>
        <Link to={ROUTES.PROFESSIONALS.LIST}>
          <button className="px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors">
            More
            <span className="hover:bg-purple-500 text-purple-500 hover:text-white rounded-full p-1 transition-colors">
              <ArrowRight size={16} />
            </span>
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px]" />
          ))}
        </div>
      ) : mentors.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-72">
          <GraduationCap strokeWidth={1} size={50} className="opacity-60" />
          <p className="opacity-60 mt-3">No mentor details found!</p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
          {mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MentorSection;
