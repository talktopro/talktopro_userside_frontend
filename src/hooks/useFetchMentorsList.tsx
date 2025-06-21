import apiClient from "@/api/axiosInstance";
import useErrorHandler from "./useErrorHandler";

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
  const { handleError } = useErrorHandler();
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
      return {
        mentors: data.data.mentors,
        total_pages: data.data.total_pages,
      };
    } catch (error: unknown) {
      handleError(error, "Error occurred while fetching the mentors list");
    }
  };

  return {
    getAllMentors,
  };
};

export default useFetchMentorsList;
