import WebinarCard from "@/components/user/WebinarCard"

const dummyWebinars = [
  {
    id: "1",
    title: "Building Scalable React Applications with Modern Architecture",
    presenter: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Senior Frontend Architect",
    },
    date: "2024-01-15",
    duration: "90 minutes",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Learn how to build scalable React applications using modern architecture patterns, state management solutions, and performance optimization techniques.",
    attendancePercentage: 87,
    totalRegistrations: 1250,
    actualAttendees: 1088,
    rating: 4.8,
    totalRatings: 342,
    status: "completed" as const,
    keyTakeaways: [
      "Component composition patterns for better reusability",
      "State management with Zustand and React Query",
      "Performance optimization with React.memo and useMemo",
      "Micro-frontend architecture implementation",
    ],
    recordingViews: 2847,
  },
  {
    id: "2",
    title: "AI-Powered Development: Integrating Machine Learning into Web Apps",
    presenter: {
      name: "Dr. Michael Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "AI Research Lead",
    },
    date: "2024-01-22",
    duration: "120 minutes",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Discover how to integrate AI and machine learning capabilities into your web applications using modern frameworks and APIs.",
    attendancePercentage: 92,
    totalRegistrations: 980,
    actualAttendees: 901,
    rating: 4.9,
    totalRatings: 287,
    status: "completed" as const,
    keyTakeaways: [
      "TensorFlow.js integration patterns",
      "OpenAI API implementation strategies",
      "Real-time ML model deployment",
      "Privacy-first AI development practices",
    ],
    recordingViews: 3521,
  },
]

const upcomingWebinars = [
  {
    id: "upcoming-1",
    title: "Next.js 15: What's New and How to Migrate",
    presenter: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Full Stack Developer",
    },
    date: "2024-02-15",
    duration: "75 minutes",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Explore the latest features in Next.js 15 and learn step-by-step migration strategies for your existing applications.",
    totalRegistrations: 450,
    status: "upcoming" as const,
    availableSlots: 30,
    totalSlots: 500,
  },
  {
    id: "upcoming-2",
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    presenter: {
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "TypeScript Expert",
    },
    date: "2024-02-22",
    duration: "100 minutes",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "Deep dive into advanced TypeScript patterns, utility types, and best practices for large-scale applications.",
    totalRegistrations: 320,
    status: "upcoming" as const,
    availableSlots: 85,
    totalSlots: 400,
  },
]

export default function Webinars() {
  return (
    <section className="w-screen">
      <div className="pt-10 sm:px-8 px-8 not-sm:px-4 mx-auto">
        <div className="container mx-auto px-4">

          {/* Upcoming Webinars Section */}
          <div className="mb-12">
            <div className="text-left mb-6">
              <h1 className="text-2xl font-bold">Upcoming Webinars</h1>
              <p className="text-muted-foreground">Register now for our upcoming sessions</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {upcomingWebinars.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          </div>

          {/* Conducted Webinars Section */}
          <div>
            <div className="text-left mb-6">
              <h1 className="text-2xl font-bold">Conducted Webinars</h1>
              <p className="text-muted-foreground">Explore our past webinars and their impact</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {dummyWebinars.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};