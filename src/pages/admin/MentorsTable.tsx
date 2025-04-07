import apiClient from "@/api/axiosInstance";
import ApprovedMentorTable from "@/components/admin/ApprovedMentorTable";
import MentorTab from "@/components/admin/MentorTab";
import RequestMentorTable from "@/components/admin/RequestMentorTable";
import AdminTableHeader from "@/components/admin/TableHeading";
import CustomPagination from "@/components/common/CustomPagination";
import SkeletonTable from "@/components/common/skeletons/Table";
import {
  IMentorQueryDetails,
  IMentorsListResponse,
  ITableListMentor,
} from "@/interfaces/admin";
import { CircleAlert, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MentorsTable = () => {
  const [activeTab, setActiveTab] = useState<"approved" | "requests">(
    "approved"
  );
  const [mentors, setMentors] = useState<ITableListMentor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [queryDetails, setQueryDetails] = useState<IMentorQueryDetails>({
    page: 1,
    sort: "NewestToOldest",
    search: "",
    type: activeTab,
    limit: 10,
  });

  const fetchMentors = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<IMentorsListResponse>(
        `/admin/mentors`,
        {
          params: queryDetails,
        }
      );
      setMentors(Array.isArray(data.mentors) ? data.mentors : []);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.error("Error occurred while fetching Mentors details!", error);
      toast.error("Failed to collect Mentors list. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [queryDetails]);

  const handleSortChange = (sort: "NewestToOldest" | "OldestToNewest") => {
    setQueryDetails((prev) => ({ ...prev, sort }));
  };

  const handleSearch = (search: string) => {
    setQueryDetails((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleChangeMentorTab = (value: "approved" | "requests") => {
    setActiveTab(value);
    setQueryDetails((prev) => ({ ...prev, tab: value }));
  };

  const handleChangeCurrentPage = (page: number): void => {
    setQueryDetails((prev: IMentorQueryDetails) => ({ ...prev, page: page }));
  };

  return (
    <div className="px-4 max-w-screen">
      <AdminTableHeader
        heading="Mentors"
        searchPlaceholder="Search Mentors..."
        handleSearch={handleSearch}
        handleSort={handleSortChange}
        showSelect={!isLoading && mentors.length > 0}
        queryDetails={queryDetails}
      />
      <MentorTab
        activeTab={activeTab}
        changeTab={handleChangeMentorTab}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="mt-5">
          <SkeletonTable />
        </div>
      ) : activeTab === "approved" ? (
        mentors.length > 0 ? (
          <div className="min-h-96 flex flex-col justify-between items-end">
            <ApprovedMentorTable
              mentors={mentors}
              currentPage={queryDetails.page}
              limit={queryDetails.limit}
            />
            {totalPage > 1 && (
              <CustomPagination
                currentPage={queryDetails.page}
                onChange={handleChangeCurrentPage}
                totalPage={totalPage}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-96">
            <GraduationCap strokeWidth={1} size={50} className="opacity-60" />
            <p className="opacity-60 mt-3">No Mentors Found!</p>
          </div>
        )
      ) : mentors.length > 0 ? (
        <RequestMentorTable mentors={mentors} />
      ) : (
        <div className="flex flex-col justify-center items-center h-96">
          <CircleAlert strokeWidth={1} size={50} className="opacity-60" />
          <p className="opacity-60 mt-3">No More Requests Found!</p>
        </div>
      )}
    </div>
  );
};

export default MentorsTable;
