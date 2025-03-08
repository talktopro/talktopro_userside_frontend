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
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import sample from "@/assets/sampleProfessionalImage.jpg";

const useMentorsTable = () => {
  const mentorsData: IUser[] = [
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

  const RequestTableTitle: { label: string | null; className: string }[] = [
    { label: null, className: "whitespace-nowrap w-24 text-center" },
    { label: null, className: "whitespace-nowrap flex-grow lg:pl-20 xl:pl:20" },
    { label: "Status", className: "whitespace-nowrap w-24 text-center" },
    { label: "Action", className: "whitespace-nowrap w-24 text-center" },
  ];

  const actionDropDownItems: string[] = [
    "Draft Mail",
    "Show Ananlytics",
    "View Slots",
    "Block",
  ];

  const tableRows: JSX.Element[] = mentorsData.map((mentor, index) => {
    return (
      <React.Fragment key={index}>
        <TableRow>
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
      </React.Fragment>
    );
  });

  const requestsTableRows: JSX.Element[] = mentorsData
    .slice(0, 4)
    .map((mentor, index) => {
      return (
        <React.Fragment key={index}>
          <TableRow>
            <TableCell className="py-3 w-24 whitespace-nowrap text-center">
              {mentor.SL}
            </TableCell>
            <TableCell className="py-3 lg:pl-10 xl:pl:10 flex-grow whitespace-nowrap min-w-sm ">
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
            <TableCell className="py-3 w-30 flex justify-center pt-5 whitespace-nowrap">
              <Badge
                content={mentor.status === "Active" ? "Pending" : "Reject"}
                background={mentor.status === "Active" ? "Yellow" : "Red"}
              />
            </TableCell>
            <TableCell className="py-3 w-48 text-center whitespace-nowrap">
              <Drawer>
                <DrawerTrigger>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="max-h-[80vh] overflow-auto custom-scrollbar sm:pb-10 not-sm:pb-20">
                    <div className="flex flex-col md:flex-row">
                      <div>
                        <div className="p-4 flex flex-wrap gap-10 border-b">
                          <div className="md:w-1/4 md:h-auto w-full flex justify-center">
                            <img
                              src={sample}
                              alt="Mentor profile"
                              className="h-full w-full md:w-auto object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="flex items-start justify-between">
                              <div>
                                <h1 className="text-2xl font-bold">
                                  {mentor.name}
                                </h1>
                                <p className="opacity-70">
                                  Senior Software Developer
                                </p>
                              </div>
                            </div>
                            <div className="mt-5">
                              <h2 className="text-lg font-semibold">
                                Specializations
                              </h2>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <Badge content="Python Programming" />
                              </div>
                            </div>
                            <div className="mt-10 flex justify-center gap-2 not-sm:hidden">
                              {mentor.status === "Active" ? (
                                <>
                                  <Button
                                    variant="ghost"
                                    className="text-red-500 bg-red-50 hover:text-red-600 w-full"
                                  >
                                    Reject application
                                  </Button>
                                  <Button className="w-full">
                                    Verify application
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="ghost"
                                  className="text-red-500 bg-red-50 hover:text-red-600 w-full cursor-not-allowed"
                                >
                                  Application Rejected
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-2 not-sm:fixed not-sm:bg-background not-sm:py-3 not-sm:px-4 not-sm:bottom-0 not-sm:z-10 w-full not-sm:border-t-1 sm:hidden">
                          {mentor.status === "Active" ? (
                            <>
                              <Button
                                variant="ghost"
                                className="text-red-500 bg-red-50 hover:text-red-600 w-full"
                              >
                                Reject application
                              </Button>
                              <Button className="w-full">
                                Verify application
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              className="text-red-500 bg-red-50 hover:text-red-600 w-full cursor-not-allowed"
                            >
                              Application Rejected
                            </Button>
                          )}
                        </div>
                        <div className="pt-10 px-4 lg:w-3/4 md:w-3/4 w-full ml-auto lg:px-10 md:px-10">
                          <h2 className="text-lg font-semibold">About</h2>
                          <p className="mt-2 opacity-70">
                            With over 8 years of experience as a software
                            developer, Viswas has worked with top tech
                            companies, solving complex challenges and building
                            scalable web solutions. He specializes in Python,
                            JavaScript, and cloud technologies, making him the
                            perfect mentor for aspiring developers and
                            professionals looking to advance their careers.
                          </p>

                          <hr className="border-t my-5" />

                          <h2 className="text-lg font-semibold">Languages</h2>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge content="malayalam" />
                          </div>

                          <hr className="border-t my-5" />

                          <h2 className="text-lg font-semibold">
                            Skills & Expertise
                          </h2>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge content="aa" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    });

  return {
    mentorsData,
    actionDropDownItems,
    tableTitle,
    tableRows,
    requestsTableRows,
    RequestTableTitle,
  };
};

export default useMentorsTable;
