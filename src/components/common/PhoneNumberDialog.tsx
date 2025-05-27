import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import apiClient from "@/api/axiosInstance"
import { updateUser } from "@/redux/slices/authSlice"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import useErrorHandler from "@/hooks/useErrorHandler"

const phoneSchema = z.object({
  phoneNumber: z.string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number can't exceed 10 digits" })
    .regex(/^[0-9]+$/, { message: "Only numbers are allowed" })
})

type PhoneDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PhoneDialog = ({ open, onOpenChange }: PhoneDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: ""
    }
  })

  async function onSubmit(values: z.infer<typeof phoneSchema>) {
    try {
      setIsSubmitting(true);

      const updateResponse = await apiClient.post(`/update-profile`, {
        phone: values.phoneNumber,
      });

      dispatch(updateUser({ phone: updateResponse?.data?.phone }));
      toast.success("The phone number has been updated successfully.");
      onOpenChange(false);
    } catch (error) {
      handleError(error, "Failed to update account details");
    } finally {
      setIsSubmitting(false);
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-lg border border-border px-6 py-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold m-0">Contact Information Required</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="flex items-start gap-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 text-amber-900 dark:text-amber-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
              <p className="text-sm">
                Please provide your mobile number before booking. We need this to contact you regarding your appointment.
              </p>
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000 00000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="w-1/2 border"
                >Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-1/2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneDialog;