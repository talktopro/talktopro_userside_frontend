import apiClient from "@/api/axiosInstance";
import ApprovedMentorTable from "@/components/admin/ApprovedMentorTable";
import MentorTab from "@/components/admin/MentorTab";
import RequestMentorTable from "@/components/admin/RequestMentorTable";
import AdminTableHeader from "@/components/admin/TableHeading";
import SkeletonTable from "@/components/common/skeletons/Table";
import { IMentor, IMentorQueryDetails } from "@/interfaces/admin";
import { CircleAlert, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
// import { toast } from "sonner";

const MentorsTable = () => {
  const [activeTab, setActiveTab] = useState<"approved" | "requests">(
    "approved"
  );
  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryDetails, setQueryDetails] = useState<IMentorQueryDetails>({
    page: 1,
    sort: "ascending",
    search: "",
    tab: activeTab,
  });

  const fetchMentors = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<IMentor[]>(`url`, {
        params: queryDetails,
      });
      setMentors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error occurred while fetching Mentors details!", error);
      // toast.error("Failed to collect Mentors list. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [queryDetails]);

  const handleSortChange = (sort: "ascending" | "descending") => {
    setQueryDetails((prev) => ({ ...prev, sort }));
  };

  const handleSearch = (search: string) => {
    setQueryDetails((prev) => ({ ...prev, search }));
  };

  const handleChangeMentorTab = (value: "approved" | "requests") => {
    setActiveTab(value);
    setQueryDetails((prev) => ({ ...prev, tab: value }));
  };

  return (
    <div className="px-4 max-w-screen">
      <AdminTableHeader
        heading="Mentors"
        searchPlaceholder="Search Mentors..."
        handleSearch={handleSearch}
        handleSort={handleSortChange}
        showSelect={!isLoading && mentors.length > 0}
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
          <ApprovedMentorTable mentors={mentors} />
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
