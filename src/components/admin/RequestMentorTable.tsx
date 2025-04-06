import { IMentor } from "@/interfaces/admin";
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
import { Button } from "../ui/button";

interface IRequestMentorTableProps {
  mentors: IMentor[];
}

const RequestMentorTable: FC<IRequestMentorTableProps> = ({ mentors }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b">
          <TableHead className="whitespace-nowrap w-24 text-center" />
          <TableHead className="whitespace-nowrap flex-grow lg:pl-20 xl:pl:20" />
          <TableHead className="whitespace-nowrap w-48 text-center">
            Status
          </TableHead>
          <TableHead className="whitespace-nowrap w-48 text-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y-0">
        {mentors.map((mentor: IMentor, index: number) => (
          <TableRow key={index}>
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
                              src={mentor.profileImage}
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
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestMentorTable;
