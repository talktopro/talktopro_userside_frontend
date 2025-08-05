import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ConductedWeb, UpcomingWeb } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface RegiProps {
  webinar: UpcomingWeb | ConductedWeb;
}

interface Inputs {
  name: "name" | "email" | "mobile";
  label: string;
  type: string;
  placeholder: string;
}

const inputs: Inputs[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    name: "mobile",
    label: "Mobile",
    type: "text",
    placeholder: "Enter your mobile number",
  },
];

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),

  mobile: z
    .string()
    .nonempty({ message: "Mobile number is required" })
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Enter a valid mobile number",
    }),
});

const WebinarRegistration = ({ webinar }: RegiProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
    },
  });

  const submit = (values: z.infer<typeof formSchema>) => {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
    console.log(form.getValues());
    form.reset();
  };
  return (
    <DialogContent className="sm:max-w-[425px] rounded-lg border border-border px-5 py-10">
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-xl font-bold leading-tight text-center">
          {webinar.name}
        </DialogTitle>

        <p className="text-sm text-muted-foreground text-center">
          " Conducting by {webinar.guestName} on{" "}
          {format(webinar.date, "dd-MM-yyyy")} at {webinar.time}PM. "
        </p>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-1">
          {inputs.map((input, i) => (
            <FormField
              key={i}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {input.label === "Mobile"
                      ? `${input.label + " (WhatsApp)"}`
                      : input.label}{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={input.type}
                      placeholder={input.placeholder}
                      className="mt-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-center items-center gap-1 pt-6">
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="flex-1 w-1/2 bg-transparent"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" className="flex-1 w-1/2">
              Register ( ₹{webinar.amount}.00 )
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default WebinarRegistration;
