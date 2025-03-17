import { IMentor } from "@/interfaces/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CustomTooltip from "../common/CustomTooltip";
import { AlignJustify } from "lucide-react";
import { FC } from "react";

interface IApprovedMentorTableProps {
  mentors: IMentor[];
}

const ApprovedMentorTable: FC<IApprovedMentorTableProps> = ({ mentors }) => {
  const actionDropDownItems: string[] = [
    "Draft Mail",
    "Show Ananlytics",
    "View Slots",
    "Block",
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="whitespace-nowrap w-24 text-center" />
          <TableHead className="whitespace-nowrap flex-grow lg:pl-20 xl:pl:20" />
          <TableHead className="whitespace-nowrap w-48 text-center">
            Phone
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Create-At
          </TableHead>
          <TableHead className="whitespace-nowrap w-24 text-center">
            Status
          </TableHead>
          <TableHead className="whitespace-nowrap w-12" />
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">
        {mentors.map((mentor: IMentor, index: number) => (
          <TableRow key={index}>
            <TableCell className="py-3 w-24 whitespace-nowrap text-center">
              {mentor.SL}
            </TableCell>
            <TableCell className="py-3 lg:pl-10 xl:pl:10 flex-grow min-w-sm whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-auto h-12 rounded-md overflow-hidden">
                  <img
                    src={mentor.profileImage}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{mentor.name}</p>
                  <p className="opacity-70">{mentor.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-3 w-48 text-center whitespace-nowrap">
              {mentor.phoneNumber}
            </TableCell>
            <TableCell className="py-3 w-48 text-center whitespace-nowrap">
              {mentor.createdAt}
            </TableCell>
            <TableCell className="py-3 w-48 flex justify-center pt-5 whitespace-nowrap">
              <Badge
                content={mentor.status}
                background={mentor.status === "Active" ? "Green" : "Red"}
              />
            </TableCell>
            <TableCell className="py-3 w-fit text-end whitespace-nowrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <CustomTooltip
                      content="Action"
                      trigger={<AlignJustify className="h-4 w-4 opacity-70" />}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit" align="end">
                  {actionDropDownItems?.map((item) => {
                    return (
                      <DropdownMenuItem className="cursor-pointer">
                        {item === "Block" ? (
                          mentor.status === "Active" ? (
                            <p className="text-red-500">Block</p>
                          ) : (
                            "Un-Block"
                          )
                        ) : (
                          item
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApprovedMentorTable;
