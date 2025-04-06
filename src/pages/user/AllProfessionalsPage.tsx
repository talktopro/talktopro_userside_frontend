import apiClient from "@/api/axiosInstance";
import SkeletonCards from "@/components/common/skeletons/Cards";
import MentorCard from "@/components/MentorCard";
import FilterSession from "@/components/user/FilterSession";
import MobileFilterSession from "@/components/user/MobileFilterSession";
import useFetchMentorsList from "@/hooks/useFetchMentorsList";
import { Mentor } from "@/types/user";
import { GraduationCap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FilterDataType = {
  sort: "NewestToOldest" | "OldestToNewest";
  selectedProfessions: string[];
  selectedRating: number;
};

const AllProfessionalsPage = () => {
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);
  const [professions, setprofessions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchDataFlag = useRef(true);
  const { getAllMentors } = useFetchMentorsList();

  const [filterData, setFilterData] = useState<FilterDataType>({
    sort: "NewestToOldest",
    selectedProfessions: [],
    selectedRating: 0,
  });

  const fetchProfessions = async () => {
    try {
      const { data } = await apiClient.get("/mentor/get-professions");
      setprofessions(data);
    } catch (error: unknown) {
      console.error("Error occurred while fetching the mentors list", error);
    }
  };

  const fetchData = async () => {
    if (!fetchDataFlag.current) return;

    try {
      setLoading(true);
      const result = await getAllMentors({
        sort: filterData.sort,
        profession: filterData.selectedProfessions,
        rating: filterData.selectedRating,
      });
      setMentorsList(result || []);
    } finally {
      fetchDataFlag.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessions();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filterData]);

  const applyFilter = () => {
    fetchDataFlag.current = true;
    fetchData();
  };

  const clearFilter = () => {
    setFilterData({
      selectedProfessions: [],
      selectedRating: 0,
      sort: "NewestToOldest",
    });
    fetchDataFlag.current = true;
  };

  return (
    <div className="pb-0 sm:p-10 p-4 md:min-h-[85vh] sm:overflow-y-auto overflow-x-hidden sm:custom-scrollbar">
      <div className="flex gap-5 h-full">
        <FilterSession
          applyFilter={applyFilter}
          clearFilter={clearFilter}
          filterData={filterData}
          setFilterData={setFilterData}
          professions={professions}
        />
        <div className="flex flex-col flex-1">
          <div className="flex justify-end md:hidden mb-4">
            <MobileFilterSession
              applyFilter={applyFilter}
              clearFilter={clearFilter}
              filterData={filterData}
              setFilterData={setFilterData}
              professions={professions}
              fetchDataFlag={fetchDataFlag}
            />
          </div>
          {loading ? (
            <SkeletonCards />
          ) : mentorsList.length > 0 ? (
            <div className="max-h-[80dvh] overflow-auto custom-scrollbar">
              <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {mentorsList.map((mentor) => (
                  <MentorCard key={mentor._id} mentor={mentor} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-96">
              <GraduationCap strokeWidth={1} size={50} className="opacity-60" />
              <p className="opacity-60 mt-3">No mentors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProfessionalsPage;
