import React, { JSX } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface AdminTableBodyProps {
  tableTitle: { label: string | null; className: string }[];
  tableRows: JSX.Element[];
  showActionButton?: boolean;
}

const AdminTableBody: React.FC<AdminTableBodyProps> = ({
  tableTitle,
  tableRows,
  showActionButton = false,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b">
          {tableTitle.map((row, index) => {
            return (
              <TableHead key={index} className={row.className}>
                {row.label && row.label}
              </TableHead>
            );
          })}
          <TableHead
            className="whitespace-nowrap w-12"
            hidden={!showActionButton}
          ></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">{tableRows}</TableBody>
    </Table>
  );
};

export default AdminTableBody;
