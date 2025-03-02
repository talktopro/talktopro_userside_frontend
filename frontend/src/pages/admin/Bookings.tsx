import AdminTableBody from "@/components/admin/TableBody";
import AdminTableHeader from "@/components/admin/TableHeading";
import useBookingsTable from "@/hooks/admin/useBookingsTable";

const MentorsTable = () => {
  const { tableTitle, tableRows } = useBookingsTable();

  return (
    <div className="px-4">
      <AdminTableHeader
        heading="Bookings"
        searchPlaceholder="Search Bookings..."
      />
      <AdminTableBody
        tableRows={tableRows}
        tableTitle={tableTitle}
        showActionButton={true}
      />
    </div>
  );
};

export default MentorsTable;
