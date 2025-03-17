import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/Badge";
import CustomTooltip from "../common/CustomTooltip";
import { AlignJustify } from "lucide-react";
import { FC } from "react";
import { IUser } from "@/interfaces/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface IAdminUsersProps {
  users: IUser[];
}

const AdminUsersTable: FC<IAdminUsersProps> = ({ users }) => {
  const actionDropDownItems: string[] = ["Draft Mail", "Block"];

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
        {users.map((user: IUser, index: number) => (
          <TableRow key={index}>
            <TableCell className="py-3 w-24 whitespace-nowrap text-center">
              {user.SL}
            </TableCell>
            <TableCell className="py-3 lg:pl-10 xl:pl:10 flex-grow min-w-sm whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-auto h-12 rounded-md overflow-hidden">
                  <img
                    src={user.profileImage}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{user.name}</p>
                  <p className="opacity-70">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-3 w-48 text-center whitespace-nowrap">
              {user.phoneNumber}
            </TableCell>
            <TableCell className="py-3 w-48 text-center whitespace-nowrap">
              {user.createdAt}
            </TableCell>
            <TableCell className="py-3 w-48 flex justify-center pt-5 whitespace-nowrap">
              <Badge
                content={user.status}
                background={user.status === "Active" ? "Green" : "Red"}
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
                          user.status === "Active" ? (
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

export default AdminUsersTable;
