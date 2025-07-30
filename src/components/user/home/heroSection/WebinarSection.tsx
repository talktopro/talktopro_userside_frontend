import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

export default function HeroWebinar() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90dvh] h-full w-full flex flex-col homepage_keyFeatures_bg items-center justify-center px-6 md:px-20 py-10 gap-8">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat grayscale opacity-10 rounded-xl z-0"
        style={{
          backgroundImage: "url('/ai_humans.jpg')",
          boxShadow: 'inset 0 0 40px 20px var(--background)',
        }}
      />

      <div className="text-center max-w-3xl space-y-4 flex flex-col items-center z-10">
        <div className="homepage_keyFeatures_bg p-2 px-4 w-fit rounded-full border-x-1 border-purple-500">
          <span className="bg-gradient-to-r from-purple-700 to-purple-300 dark:from-purple-500 dark:to-purple-200 bg-clip-text text-transparent italic font-bold">
            Talk to Pro
          </span>{" "}
          presents, live webinar
        </div>

        <h3 className="pb-5 bg-gradient-to-r from-purple-700 to-purple-300 dark:from-purple-500 dark:to-purple-200 bg-clip-text text-4xl sm:text-5xl md:text-6xl font-bold leading-none text-transparent">
          Web Dev in the <br /> AI Era
        </h3>
        <p className="text-muted-foreground -mt-5">
          Join Jobin Selvanose and discover how to navigate your career as a web developer or software engineer in today's AI-powered landscape. Learn the skills that matter, avoid common pitfalls, and build a future-proof career.
        </p>
        <div className="border-x border-purple-500 flex items-center justify-center gap-3 p-1 px-4 rounded-sm">
          <span className="text-purple-500 font-bold">13 june 2025 @5:00PM</span>
          <Button onClick={() => navigate(ROUTES.WEBINAR)} className="bg-gradient-to-r from-purple-700 to-purple-400">
            Register now
          </Button>
        </div>
      </div>
    </section>
  );
};