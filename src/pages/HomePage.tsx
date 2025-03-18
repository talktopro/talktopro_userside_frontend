import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";

import MentorCard from "@/components/MentorCard";
import Banner from "@/components/Banner";
import apiClient from "@/api/axiosInstance";
import { ROUTES } from "@/routes/routes";
import { Mentor } from "./user/AllProfessionalsPage";
import Skeleton from "react-loading-skeleton";

const HomePage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/mentor/mentors");
      setMentors(response.data?.data || []);
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.errors?.[0] ||
          "Something went wrong. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-8">
      <Banner
        bg="firstframe.svg"
        image="Clip path group.png"
        title="Unlock Your Skills, Earn with Every Booking! 🚀"
        description="Turn Your Talent into Income—Join as a Professional Today!"
        buttonText="Get Started Now →"
      />

      <MentorSection mentors={mentors} loading={loading} error={error} />

      <Banner
        bg="secondBannerBg.svg"
        image="secondimg.svg"
        title="Free Seminar for Aspiring Software Developers"
        subtitle="Learn from John Doe, Former Microsoft Engineer."
        description="Date: 29th June 2024 | Time: 4:00 PM - 6:00 PM (IST)"
        buttonText="Click here for more Info"
      />
      <MentorSection mentors={mentors} loading={loading} error={error} />
    </div>
  );
};

export default HomePage;

const MentorSection = ({
  mentors,
  loading,
  error,
}: {
  mentors: Mentor[];
  loading: boolean;
  error: string | null;
}) => {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-semibold">Top Mentors for You</span>
        <Link
          to={ROUTES.PROFESSIONALS.LIST}
          className="flex items-center cursor-pointer"
        >
          See all
          <ChevronRight className="w-6 h-6 transition-opacity duration-200" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height={200} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : mentors.length === 0 ? (
        <p className="text-center text-gray-500">No mentors available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </section>
  );
};
