import apiClient from "@/api/axiosInstance";
import AdminTableHeader from "@/components/admin/TableHeading";
import AdminUsersTable from "@/components/admin/UsersTable";
import CustomPagination from "@/components/common/CustomPagination";
import SkeletonTable from "@/components/common/skeletons/Table";
import { IQueryDetails } from "@/interfaces/admin";
import { ITableUser, IUserListResponse } from "@/interfaces/admin";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UsersTable = () => {
  const [users, setUsers] = useState<ITableUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [queryDetails, setQueryDetails] = useState<IQueryDetails>({
    page: 1,
    limit: 10,
    sort: "NewestToOldest",
    search: "",
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<IUserListResponse>(`/admin/users`, {
        params: queryDetails,
      });
      setUsers(Array.isArray(data.users) ? data.users : []);
      setTotalPage(data.totalPage);
    } catch (error) {
      console.error("Error occurred while fetching booking history!", error);
      toast.error("Failed to collect booking history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [queryDetails]);

  const handleSortChange = (sort: "NewestToOldest" | "OldestToNewest") => {
    setQueryDetails((prev) => ({ ...prev, sort }));
  };

  const handleSearch: (val: string) => void = (search) => {
    setQueryDetails((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleChangeCurrentPage = (page: number): void => {
    setQueryDetails((prev: IQueryDetails) => ({ ...prev, page: page }));
  };

  return (
    <div className="px-4 max-w-screen">
      <AdminTableHeader
        heading="Users"
        searchPlaceholder="Search Users..."
        handleSearch={handleSearch}
        handleSort={handleSortChange}
        showSelect={!isLoading && users.length > 0}
        queryDetails={queryDetails}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : users.length > 0 ? (
        <div className="min-h-96 flex flex-col justify-between items-end">
          <AdminUsersTable
            users={users}
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
          <Users strokeWidth={1} size={50} className="opacity-60" />
          <p className="opacity-60 mt-3">No Users Found!</p>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
