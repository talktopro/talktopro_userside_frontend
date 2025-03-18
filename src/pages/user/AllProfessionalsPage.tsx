import apiClient from "@/api/axiosInstance";
import SkeletonCards from "@/components/common/skeletons/Cards";
import MentorCard from "@/components/MentorCard";
import FilterSession from "@/components/user/FilterSession";
import MobileFilterSession from "@/components/user/MobileFilterSession";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Mentor {
  _id: string;
  uname: string;
  email: string;
  phone: number;
  isMentor: boolean;
  mentor_application_status: string;
  __v: number;
  refreshToken: string;
  mentorDetails: MentorDetails;
}

export interface MentorDetails {
  first_name: string;
  last_name: string;
  profession: string;
  about: string;
  skills: string[];
  languages: string[];
  _id: string;
}

const AllProfessionalsPage = () => {
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get("/mentor/mentors");
        setMentorsList(data?.data);
      } catch (error: unknown) {
        console.error("Error occure while fetching the mentors list", error);
        toast.error("Failed to collect the mentors list.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-0 sm:p-10 p-4 h-[85vh] sm:overflow-y-auto overflow-x-hidden sm:custom-scrollbar">
      <div className="flex gap-5 h-full">
        <FilterSession />
        <div className="flex flex-col flex-1">
          <div className="flex justify-end md:hidden">
            <MobileFilterSession />
          </div>
          <div className="flex-1 flex justify-center">
            {loading ? (
              <SkeletonCards />
            ) : mentorsList.length > 0 ? (
              <div className="flex flex-wrap not-sm:justify-center sm:justify-start gap-3">
                {mentorsList.map((mentor) => (
                  <MentorCard key={mentor._id} mentor={mentor} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full">
                <GraduationCap
                  strokeWidth={1}
                  size={50}
                  className="opacity-60"
                />
                <p className="opacity-60 mt-3">No mentor details found!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProfessionalsPage;
