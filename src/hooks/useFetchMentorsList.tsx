import apiClient from "@/api/axiosInstance";
import { toast } from "sonner";

interface FetchMentorsParams {
  sort?: "NewestToOldest" | "OldestToNewest";
  search?: string;
  page?: number;
  limit?: number;
  type?: "normal" | "top";
  rating?: number;
  profession?: string[];
}

const useFetchMentorsList = () => {
  const getAllMentors = async ({
    sort = "NewestToOldest",
    search = "",
    page = 1,
    limit = 10,
    type = "normal",
    rating = 0,
    profession = [],
  }: FetchMentorsParams = {}) => {
    try {
      const { data } = await apiClient.get("/mentor/mentors", {
        params: {
          sort,
          search,
          page,
          limit,
          type,
          rating,
          profession: profession.join(","),
        },
      });
      return data.data;
    } catch (error: unknown) {
      console.error("Error occurred while fetching the mentors list", error);
      toast.error("Failed to fetch mentors list.");
    }
  };

  return {
    getAllMentors,
  };
};

export default useFetchMentorsList;
