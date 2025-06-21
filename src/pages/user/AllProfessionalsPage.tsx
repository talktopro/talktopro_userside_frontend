import apiClient from "@/api/axiosInstance";
import SkeletonCards from "@/components/common/skeletons/Cards";
import MentorCard from "@/components/user/MentorCard";
import FilterSession from "@/components/user/FilterSession";
import MobileFilterSession from "@/components/user/MobileFilterSession";
import useFetchMentorsList from "@/hooks/useFetchMentorsList";
import { Mentor } from "@/types/user";
import { GraduationCap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import CustomPagination from "@/components/common/CustomPagination";

type FilterDataType = {
  sort: "NewestToOldest" | "OldestToNewest";
  selectedProfessions: string[];
  selectedRating: number;
};

const mentorsPerPage = 10;

const AllProfessionalsPage = () => {
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);
  const [professions, setProfessions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchDataFlag = useRef(true);
  const { getAllMentors } = useFetchMentorsList();

  const defaultFilterVal: FilterDataType = {
    sort: "NewestToOldest",
    selectedProfessions: [],
    selectedRating: 0,
  };
  const [filterData, setFilterData] = useState<FilterDataType>(defaultFilterVal);
  const [copyFilterData, setCopyFilterData] = useState<FilterDataType>(defaultFilterVal);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchProfessions = async () => {
    try {
      const { data } = await apiClient.get("/mentor/get-professions");
      setProfessions(data);
    } catch (error: unknown) {
      console.error("Error occurred while fetching the professions", error);
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
      page: currentPage,
      limit: mentorsPerPage,
    });

    setMentorsList(result?.mentors || []);
    setTotalPage(result?.total_pages || 1);
    setCopyFilterData(filterData);
  } finally {
    fetchDataFlag.current = false;
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProfessions();
  }, []);

  // useEffect(() => {
  //   setCurrentPage(1); 
  //   fetchDataFlag.current = true;
  //   fetchData();
  // }, [filterData]);

  useEffect(() => {
    fetchDataFlag.current = true;
    fetchData();
  }, [currentPage]);

  const applyFilter = () => {
    setCurrentPage(1);
    fetchDataFlag.current = true;
    fetchData();
  };

  const clearFilter = () => {
    setFilterData(defaultFilterVal);
    setCopyFilterData(defaultFilterVal);
    setCurrentPage(1);
    fetchDataFlag.current = true;
  };

  const disableClearFilter = () => {
    return (
      filterData.sort === defaultFilterVal.sort &&
      filterData.selectedRating === defaultFilterVal.selectedRating &&
      filterData.selectedProfessions.length === 0
    );
  };

  const disableApplyFilter = () => {
    return (
      filterData.sort === copyFilterData.sort &&
      filterData.selectedRating === copyFilterData.selectedRating &&
      JSON.stringify(filterData.selectedProfessions.sort()) ===
        JSON.stringify(copyFilterData.selectedProfessions.sort())
    );
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
          disableClearFilter={disableClearFilter}
          disableApplyFilter={disableApplyFilter}
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
              disableClearFilter={disableClearFilter}
              disableApplyFilter={disableApplyFilter}
            />
          </div>
          {loading ? (
            <SkeletonCards />
          ) : mentorsList.length > 0 ? (
            <>
              <div className="sm:max-h-[80dvh] sm:overflow-auto custom-scrollbar">
                <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                  {mentorsList.map((mentor) => (
                    <MentorCard key={mentor._id} mentor={mentor} />
                  ))}
                </div>
              </div>

              <CustomPagination
                totalPage={totalPage}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            </>
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