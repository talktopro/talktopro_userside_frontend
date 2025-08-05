import WebinarCard from "@/components/user/WebinarCard";
import { ConductedWeb,  UpcomingWeb } from "@/types/user";

const dummyWebinars:ConductedWeb[] = [
  {
    id: "1",
    name: "Building Scalable React Applications with Modern Architecture",
    guestName: "Suhail",
    guestRole: "MEAN Stack Developer",
    date: "2024-01-15",
    duration: "90 minutes",
    posterUrl: "/placeholder.svg?height=300&width=500",
    description: "Learn how to build scalable React applications using modern architecture patterns, state management solutions, and performance optimization techniques.",
    attendancePercentage: 87,
    totalRegistrations: 1250,
    actualAttendees: 1088,
    rating: 4.8,
    totalRatings: 342,
    status: "Completed" as const,
    keyTakeaways: [
      "Component composition patterns for better reusability",
      "State management with Zustand and React Query",
      "Performance optimization with React.memo and useMemo",
      "Micro-frontend architecture implementation",
    ],
    recordingViews: 2847,
    time: "3:00",
    amount: 400,
  },
  {
    id: "2",
    name: "AI-Powered Development: Integrating Machine Learning into Web Apps",
    guestName:"Jasir K",
    guestRole: 'Software Developer',
    date: "2024-01-22",
    duration: "120 minutes",
    posterUrl: "/placeholder.svg?height=300&width=500",
    description:
      "Discover how to integrate AI and machine learning capabilities into your web applications using modern frameworks and APIs.",
    attendancePercentage: 92,
    totalRegistrations: 980,
    actualAttendees: 901,
    rating: 4.9,
    totalRatings: 287,
    status: "Completed" as const,
    keyTakeaways: [
      "TensorFlow.js integration patterns",
      "OpenAI API implementation strategies",
      "Real-time ML model deployment",
      "Privacy-first AI development practices",
    ],
    recordingViews: 3521,
    time: "4:00",
    amount: 500,
  },
];

const upcomingWebinars:UpcomingWeb[] = [
  {
    id: "upcoming-1",
    name: "Next.js 15: What's New and How to Migrate",
    guestName:"Suhail",
    guestRole:"MEAN Stack Developer",
    date: "2024-02-15",
    duration: "75 minutes",
    posterUrl: "/placeholder.svg?height=300&width=500",
    description:
      "Explore the latest features in Next.js 15 and learn step-by-step migration strategies for your existing applications.",
    totalRegistrations: 450,
    status: "Upcoming" as const,
    slots: 30,
    // totalSlots: 500,
    amount:400,
    time:"3:00",
  },
  {
    id: "upcoming-2",
    name: "Mastering TypeScript: Advanced Patterns and Best Practices",
    guestName:"Jasir K",
    guestRole: 'Software Developer',
    date: "2024-02-22",
    duration: "100 minutes",
    posterUrl: "/placeholder.svg?height=300&width=500",
    description:
      "Deep dive into advanced TypeScript patterns, utility types, and best practices for large-scale applications.",
    totalRegistrations: 320,
    status: "Upcoming" as const,
    slots: 85,
    // totalSlots: 400,
    time:"5:00",
    amount:500
  },
];

export default function Webinars() {
  return (
    <section className="w-screen">
      <div className="pt-10 sm:px-8 px-8 not-sm:px-4 mx-auto">
        <div className="container mx-auto px-4">
          {/* Upcoming Webinars Section */}
          <div className="mb-12 ">
            <div className="text-left mb-6">
              <h1 className="text-2xl font-bold">Upcoming Webinars</h1>
              <p className="text-muted-foreground">
                Register now for our upcoming sessions
              </p>
            </div>

            <div className="grid gap-x-3 gap-y-3  grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {upcomingWebinars.map((webinar, index) => (
                <WebinarCard key={`${webinar.id}-${index}`} webinar={webinar} />
              ))}
            </div>
          </div>

          {/* Conducted Webinars Section */}
          {dummyWebinars.length > 1 && (
            <div>
              <div className="text-left mb-6">
                <h1 className="text-2xl font-bold">Conducted Webinars</h1>
                <p className="text-muted-foreground">
                  Explore our past webinars and their impact
                </p>
              </div>

              <div className="grid gap-x-3 gap-y-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {dummyWebinars.map((webinar) => (
                  <WebinarCard key={webinar.id} webinar={webinar} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
