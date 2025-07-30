import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Users, Star, TrendingUp } from "lucide-react"

interface WebinarData {
  id: string
  title: string
  presenter: {
    name: string
    avatar: string
    title: string
  }
  date: string
  duration: string
  image: string
  description: string
  attendancePercentage?: number
  totalRegistrations: number
  actualAttendees?: number
  rating?: number
  totalRatings?: number
  status: "completed" | "live" | "upcoming"
  keyTakeaways?: string[]
  recordingViews?: number
  availableSlots?: number
  totalSlots?: number
}

export default function WebinarCard({ webinar }: { webinar: WebinarData }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="w-full h-full max-w-sm overflow-hidden shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={webinar.presenter.avatar || "/placeholder.svg"} alt={webinar.presenter.name} />
              <AvatarFallback>
                {webinar.presenter.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 whitespace-nowrap">{webinar.presenter.name}</h3>
              <p className="text-sm text-gray-600 whitespace-nowrap">{webinar.presenter.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {webinar.status === "upcoming" && (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Register
              </Button>
            )}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent">
                  View More
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                {/* Popover content remains the same but only shows for completed webinars */}
                {webinar.status === "completed" ? (
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-3">Webinar Details</h4>
                    {/* Rest of the existing popover content */}
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{webinar.attendancePercentage}%</div>
                        <div className="text-xs text-gray-600">Attendance Rate</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{webinar.actualAttendees}</div>
                        <div className="text-xs text-gray-600">Attendees</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl font-bold text-yellow-600">{webinar.rating}</span>
                        </div>
                        <div className="text-xs text-gray-600">{webinar.totalRatings} ratings</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{webinar.recordingViews}</div>
                        <div className="text-xs text-gray-600">Recording Views</div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Key Takeaways */}
                    <div className="mb-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Key Takeaways
                      </h5>
                      <ul className="space-y-1">
                        {webinar.keyTakeaways?.map((takeaway, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-3">Webinar Information</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium mb-2">About this webinar</h5>
                        <p className="text-sm text-gray-600">{webinar.description}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Registration Details</h5>
                        <p className="text-sm text-gray-600">
                          {webinar.availableSlots} slots available out of {webinar.totalSlots}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{webinar.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">{webinar.description}</p>

          {/* Meta info */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="h-4 w-4" />
              {formatDate(webinar.date)}
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="h-4 w-4" />
              {webinar.duration}
            </div>
            {webinar.status === "upcoming" ? (
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Users className="h-4 w-4" />
                {webinar.availableSlots} slots left
              </div>
            ) : (
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Users className="h-4 w-4" />
                {webinar.actualAttendees} attended
              </div>
            )}
          </div>
        </div>

        {/* Webinar Image */}
        <div className="rounded-lg overflow-hidden border">
          <img src={webinar.image || "/placeholder.svg"} alt={webinar.title} className="w-full h-64 object-cover" />
        </div>
      </CardContent>
    </Card>
  )
}