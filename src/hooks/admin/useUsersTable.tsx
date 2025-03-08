import CustomTooltip from "@/components/common/CustomTooltip";
import { Badge } from "@/components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { IUser } from "@/interfaces/admin";
import { AlignJustify } from "lucide-react";
import React, { JSX } from "react";
import img from "@/assets/sampleProfessionalImage.jpg";

const useUsersTable = () => {
  const usersData: IUser[] = [
    {
      SL: 1,
      name: "Cristiano Ronaldo",
      profileImage: img,
      email: "cristiano.ronaldo@example.com",
      phoneNumber: "+91 98765 43210",
      createdAt: "2023-10-10",
      status: "Active",
    },
    {
      SL: 2,
      name: "Luka Modric",
      profileImage: img,
      email: "luka.modric@example.com",
      phoneNumber: "+91 87654 32109",
      createdAt: "2023-09-25",
      status: "Blocked",
    },
    {
      SL: 3,
      name: "Sergio Ramos",
      profileImage: img,
      email: "sergio.ramos@example.com",
      phoneNumber: "+91 76543 21098",
      createdAt: "2023-08-15",
      status: "Active",
    },
    {
      SL: 4,
      name: "Karim Benzema",
      profileImage: img,
      email: "karim.benzema@example.com",
      phoneNumber: "+91 65432 10987",
      createdAt: "2023-07-20",
      status: "Blocked",
    },
    {
      SL: 5,
      name: "Toni Kroos",
      profileImage: img,
      email: "toni.kroos@example.com",
      phoneNumber: "+91 54321 09876",
      createdAt: "2023-06-30",
      status: "Active",
    },
    {
      SL: 6,
      name: "Marcelo",
      profileImage: img,
      email: "marcelo@example.com",
      phoneNumber: "+91 43210 98765",
      createdAt: "2023-06-10",
      status: "Blocked",
    },
    {
      SL: 7,
      name: "Casemiro",
      profileImage: img,
      email: "casemiro@example.com",
      phoneNumber: "+91 32109 87654",
      createdAt: "2023-05-25",
      status: "Active",
    },
    {
      SL: 8,
      name: "Isco",
      profileImage: img,
      email: "isco@example.com",
      phoneNumber: "+91 21098 76543",
      createdAt: "2023-04-18",
      status: "Blocked",
    },
    {
      SL: 9,
      name: "Keylor Navas",
      profileImage: img,
      email: "keylor.navas@example.com",
      phoneNumber: "+91 10987 65432",
      createdAt: "2023-03-12",
      status: "Active",
    },
    {
      SL: 10,
      name: "Dani Carvajal",
      profileImage: img,
      email: "dani.carvajal@example.com",
      phoneNumber: "+91 09876 54321",
      createdAt: "2023-02-05",
      status: "Blocked",
    },
  ];

  const tableTitle: { label: string | null; className: string }[] = [
    { label: null, className: "whitespace-nowrap w-24 text-center" },
    { label: null, className: "whitespace-nowrap flex-grow lg:pl-20 xl:pl:20" },
    { label: "Phone", className: "whitespace-nowrap w-48 text-center" },
    { label: "Create-At", className: "whitespace-nowrap w-48 text-center" },
    { label: "Status", className: "whitespace-nowrap w-24 text-center" },
  ];

  const actionDropDownItems: string[] = ["Draft Mail", "Block"];

  const tableRows: JSX.Element[] = usersData.map((user, index) => {
    return (
      <React.Fragment key={index}>
        <TableRow>
          <TableCell className="py-3 w-24 whitespace-nowrap text-center">
            {user.SL}
          </TableCell>
          <TableCell className="py-3 lg:pl-10 xl:pl:10 flex-grow whitespace-nowrap">
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
      </React.Fragment>
    );
  });

  return {
    usersData,
    actionDropDownItems,
    tableTitle,
    tableRows,
  };
};

export default useUsersTable;
