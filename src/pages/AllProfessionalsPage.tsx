import apiClient from "@/api/axiosInstance";
import MentorCard from "@/components/MentorCard";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Mentor {
  _id: string;
  uname: string;
  email: string;
  phone: number;
  isMentor: boolean;
  mentor_application_status: string;
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
  const [data, setData] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/mentor/mentors");
        setData(response.data?.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.errors[0] || "Something went wrong. Please try again.";
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-5 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10">
      {loading ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-72 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      ) : data.length > 0 ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
            {data.map((mentor) => (
              <MentorCard key={mentor._id} mentor={mentor} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-64 text-center">
          <p className="text-gray-500 text-lg">No mentors available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AllProfessionalsPage;
