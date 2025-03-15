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
          setError(error.response?.data?.errors[0]);
          toast.error(error.response?.data?.errors[0]);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-10 py-10">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-72 w-full bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          {data.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">No mentors available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AllProfessionalsPage;
