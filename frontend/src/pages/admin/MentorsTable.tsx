import AdminTableBody from "@/components/admin/TableBody";
import AdminTableHeader from "@/components/admin/TableHeading";
import Footer from "@/components/Footer";
import useMentorsTable from "@/hooks/admin/useMentorsTable";

const MentorsTable = () => {
  const { tableTitle, tableRows } = useMentorsTable();

  return (
    <>
      <div className="pt-10 sm:px-12 not-sm:px-4">
        <AdminTableHeader
          heading="Mentors"
          searchPlaceholder="Search Mentors..."
        />
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

export default MentorsTable;
