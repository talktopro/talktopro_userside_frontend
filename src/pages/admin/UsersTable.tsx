import AdminTableBody from "@/components/admin/TableBody";
import AdminTableHeader from "@/components/admin/TableHeading";
import useUsersTable from "@/hooks/admin/useUsersTable";

const UsersTable = () => {
  const { tableTitle, tableRows } = useUsersTable();

  return (
    <div className="px-4 max-w-screen">
      <AdminTableHeader heading="Users" searchPlaceholder="Search Users..." />
      <AdminTableBody
        tableRows={tableRows}
        tableTitle={tableTitle}
        showActionButton={true}
      />
    </div>
  );
};

export default UsersTable;
