import apiClient from "@/api/axiosInstance";
import MentorCard from "@/components/MentorCard";
// import useApi from "@/hooks/useApi";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Mentor {
  _id: string
  uname: string
  email: string
  phone: number
  isMentor: boolean
  mentor_application_status: string
  __v: number
  refreshToken: string
  mentorDetails: MentorDetails
}

export interface MentorDetails {
  first_name: string
  last_name: string
  profession: string
  about: string
  skills: string[]
  languages: string[]
  _id: string
}


const AllProfessionalsPage = () => {

  const [data, setData] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const response = await apiClient.get("/mentor/mentors");
        console.log(response.data.data);
        setData(response.data?.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.errors[0])
          toast.error(error.response?.data?.errors[0]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading mentors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 px-10 py-20">
      {data.map((mentor) => (
        <MentorCard key={mentor._id} mentor={mentor} />
      ))}
    </div>

  );
};

export default AllProfessionalsPage;
