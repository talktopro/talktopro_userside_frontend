import ContactUsForm from "@/components/common/ContactUsForm";
import background from "@/assets/backgrounds/contact_us.webp"

const ContactUs = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 -mb-10">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ContactUsForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={background}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default ContactUs;