import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { toast } from "sonner"
import useErrorHandler from "@/hooks/useErrorHandler"
import guestApi from "@/api/guestApi"

const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
})

const ContactUsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { handleError } = useErrorHandler()

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  })

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      setIsSubmitting(true);
      await guestApi.post('/get-in-touch', values);
      toast.success("Your message has been sent successfully!");
      form.reset();
    } catch (error) {
      handleError(error, "Failed to send message");
    } finally {
      setIsSubmitting(false);
    };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-left not-sm:text-center">Contact us</h1>
          <p className="text-muted-foreground text-sm text-balance text-left not-sm:text-center">
            Feel free to connect with us. We're always open to discussing your concerns,
            suggestions, and ready to resolve any issues. Let's work together towards success.
          </p>
        </div>

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none min-h-20 max-h-40 custom-scrollbar"
                    placeholder="Enter your suggestions, concerns, or issues"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactUsForm;