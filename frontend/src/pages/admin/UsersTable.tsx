import AdminTableBody from "@/components/admin/TableBody";
import AdminTableHeader from "@/components/admin/TableHeading";
import Footer from "@/components/Footer";
import useUsersTable from "@/hooks/admin/useUsersTable";

const UsersTable = () => {
  const { tableTitle, tableRows } = useUsersTable();

  return (
    <>
      <div className="pt-10 sm:px-12 not-sm:px-4">
        <AdminTableHeader heading="Users" searchPlaceholder="Search Users..." />
        <AdminTableBody
          tableRows={tableRows}
          tableTitle={tableTitle}
          showActionButton={true}
        />
      </div>
      <Footer />
    </>
  );
};

export default UsersTable;
