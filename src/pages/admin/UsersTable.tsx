import apiClient from "@/api/axiosInstance";
import AdminTableHeader from "@/components/admin/TableHeading";
import AdminUsersTable from "@/components/admin/UsersTable";
import SkeletonTable from "@/components/common/skeletons/Table";
import { IQueryDetails, IUser } from "@/interfaces/admin";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UsersTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryDetails, setQueryDetails] = useState<IQueryDetails>({
    page: 1,
    sort: "ascending",
    search: "",
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<IUser[]>(`url`, {
        params: queryDetails,
      });
      setUsers(Array.isArray(data) ? data : []);
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

  const handleSortChange: (sort: "ascending" | "descending") => void = (
    sort
  ) => {
    setQueryDetails((prev) => ({ ...prev, sort }));
  };

  const handleSearch: (val: string) => void = (search) => {
    setQueryDetails((prev) => ({ ...prev, search }));
  };

  return (
    <div className="px-4 max-w-screen">
      <AdminTableHeader
        heading="Users"
        searchPlaceholder="Search Users..."
        handleSearch={handleSearch}
        handleSort={handleSortChange}
        showSelect={!isLoading && users.length > 0}
      />
      {isLoading ? (
        <SkeletonTable />
      ) : users.length > 0 ? (
        <AdminUsersTable users={users} />
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
