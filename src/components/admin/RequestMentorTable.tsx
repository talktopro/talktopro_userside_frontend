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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

interface IRequestMentorTableProps {
  mentors: ITableListMentor[];
  isChangeStatusLoading: boolean;
  handleAcceptReject: (
    id: string,
    status: "accept" | "reject",
    reason?: string
  ) => void;
}

const rejectFormSchema = z.object({
  rejectionReason: z.string().min(10, {
    message: "Please provide a detailed reason\n(at least 10 characters)",
  }),
});

const RequestMentorTable: FC<IRequestMentorTableProps> = ({
  mentors,
  isChangeStatusLoading,
  handleAcceptReject,
}) => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const actionDropDownItems: string[] = [
    "View Profile",
    "Approve application",
    "Reject application",
  ];

  const rejectForm = useForm<z.infer<typeof rejectFormSchema>>({
    resolver: zodResolver(rejectFormSchema),
    defaultValues: {
      rejectionReason: "",
    },
  });

  const handleRejectSubmit = (
    mentorId: string,
    values: z.infer<typeof rejectFormSchema>
  ) => {
    handleAcceptReject(mentorId, "reject", values.rejectionReason);
    rejectForm.reset();
  };

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
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                            <span
                              className={
                                item === "Reject application"
                                  ? "text-red-500"
                                  : ""
                              }
                            >
                              {item}
                            </span>
                          </DialogTrigger>
                          <DialogContent className="w-fit p-6">
                            <DialogHeader>
                              <DialogTitle className="text-center mb-2">
                                Confirm Action
                              </DialogTitle>
                              <DialogDescription className="text-center">
                                Are you sure you want to {item.toLowerCase()}{" "}
                                for <br />
                                {mentor.mentorDetails.first_name}{" "}
                                {mentor.mentorDetails.last_name}?
                              </DialogDescription>
                            </DialogHeader>
                            {item === "Reject application" ? (
                              <Form {...rejectForm}>
                                <form
                                  onSubmit={rejectForm.handleSubmit((values) =>
                                    handleRejectSubmit(mentor.id, values)
                                  )}
                                  className="space-y-4"
                                >
                                  <FormField
                                    control={rejectForm.control}
                                    name="rejectionReason"
                                    render={({ field }) => (
                                      <FormItem>
                                        <label
                                          htmlFor="rejectionReason"
                                          className="block text-sm mb-1 text-muted-foreground"
                                        ></label>
                                        <FormControl>
                                          <textarea
                                            placeholder="*Please specify the reason for rejection"
                                            id="rejectionReason"
                                            className="w-full placeholder:text-sm text-sm px-3 py-2 border rounded-md min-h-20 max-h-32 focus:outline-none overflow-y-auto custom-scrollbar"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage className="whitespace-pre-wrap text-xs text-center" />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="flex justify-center gap-1">
                                    <DialogClose asChild>
                                      <Button
                                        variant="ghost"
                                        className="w-1/2 border"
                                        disabled={isChangeStatusLoading}
                                        type="button"
                                      >
                                        Cancel
                                      </Button>
                                    </DialogClose>
                                    <Button
                                      className="w-1/2 text-white bg-red-600 hover:bg-red-700"
                                      disabled={isChangeStatusLoading}
                                      type="submit"
                                    >
                                      Yes, Reject
                                    </Button>
                                  </div>
                                </form>
                              </Form>
                            ) : (
                              <div className="flex justify-center gap-1">
                                <DialogClose asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-1/2 border"
                                    disabled={isChangeStatusLoading}
                                  >
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button
                                  className="w-1/2"
                                  disabled={isChangeStatusLoading}
                                  onClick={() =>
                                    handleAcceptReject(mentor.id, "accept")
                                  }
                                >
                                  Yes, Approve
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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
