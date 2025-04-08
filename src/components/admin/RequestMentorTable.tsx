import { ITableListMentor } from "@/interfaces/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../common/Badge";
import { FC } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import CustomTooltip from "../common/CustomTooltip";
import { AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import MentorProfileDrawer from "./MentorProfileDrawer";

interface IRequestMentorTableProps {
  mentors: ITableListMentor[];
}

const RequestMentorTable: FC<IRequestMentorTableProps> = ({ mentors }) => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const actionDropDownItems: string[] = ["View Profile"];

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
            Profession
          </TableHead>
          <TableHead className="whitespace-nowrap w-24 text-center">
            Status
          </TableHead>
          <TableHead className="whitespace-nowrap w-12" />
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">
        {mentors.map((mentor: ITableListMentor, index: number) => (
          <TableRow key={index}>
            <TableCell className="py-3 w-24 whitespace-nowrap text-center">
              {index + 1}
            </TableCell>
            <TableCell className="py-3 lg:pl-10 xl:pl:10 flex-grow whitespace-nowrap min-w-sm ">
              <div className="flex items-center">
                <div className="w-auto h-12 rounded-md overflow-hidden aspect-[3.5/4]">
                  <img
                    src={`https://${bucketName}.s3.amazonaws.com/${mentor.profileImg}`}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}</p>
                  <p className="opacity-70">{mentor.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-3 w-48 text-center whitespace-nowrap">
              {mentor.phone}
            </TableCell>
            <TableCell className="py-3 w-48 text-center whitespace-nowrap">
              {mentor.mentorDetails.profession}
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
                  {actionDropDownItems?.map((item, itemIndex) => (
                    <DropdownMenuItem
                      key={itemIndex}
                      className="cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                    >
                      {item === "View Profile" ? (
                        <Drawer>
                          <DrawerTrigger asChild>
                            <span>{item}</span>
                          </DrawerTrigger>
                          <DrawerContent>
                            <MentorProfileDrawer mentor={mentor} />
                          </DrawerContent>
                        </Drawer>
                      ) : item === "Block" ? (
                        mentor.status === "Active" ? (
                          <p className="text-red-500">Block</p>
                        ) : (
                          "Un-Block"
                        )
                      ) : (
                        item
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestMentorTable;
