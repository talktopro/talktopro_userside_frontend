import MentorTab from "@/components/admin/MentorTab";
import AdminTableBody from "@/components/admin/TableBody";
import AdminTableHeader from "@/components/admin/TableHeading";
import useMentorsTable from "@/hooks/admin/useMentorsTable";
import { useState } from "react";

const MentorsTable = () => {
  const { tableTitle, tableRows, requestsTableRows, RequestTableTitle } =
    useMentorsTable();
  const [activeTab, setActiveTab] = useState<"approved" | "requests">(
    "approved"
  );

  return (
    <div className="px-4 max-w-screen">
      <AdminTableHeader
        heading="Mentors"
        searchPlaceholder="Search Mentors..."
      />
      <MentorTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "approved" ? (
        <AdminTableBody
          tableRows={tableRows}
          tableTitle={tableTitle}
          showActionButton={true}
        />
      ) : (
        <AdminTableBody
          tableRows={requestsTableRows}
          tableTitle={RequestTableTitle}
        />
      )}
    </div>
  );
};

export default MentorsTable;
