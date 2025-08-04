import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Users, Star, TrendingUp ,IndianRupee } from "lucide-react";
import { WebinarData } from "@/interfaces/user";
import { format } from "date-fns";

export default function WebinarCard({ webinar }: { webinar: WebinarData }) {

  return (
    <Card className="w-full  max-w-sm overflow-hidden shadow-none">
      <CardContent className="p-4 ">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold  whitespace-nowrap">
              {webinar.presenter.name}
            </h3>
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {webinar.presenter.title}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            {webinar.status === "upcoming" && (
              <Button size="sm" className="ml-1">
                Register
              </Button>
            )}
            <Popover >
              <PopoverTrigger asChild>
                {webinar.status === "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    View More
                  </Button>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 mt-3 sm:mt-0" align="end">
                {webinar.status === "completed" && (
                  <div className="p-4 ">
                    <h4 className="font-semibold text-lg mb-3">
                      Webinar Details
                    </h4>
                    {/* Rest of the existing popover content */}
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {webinar.attendancePercentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Attendance Rate
                        </div>
                      </div>
                      <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl font-bold text-yellow-600">
                            {webinar.rating}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {webinar.totalRatings} ratings
                        </div>
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
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{webinar.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            {webinar.description}
          </p>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="h-4 w-4" />
              {format(webinar.date,'dd-MM-yyyy')}
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="h-4 w-4" />
              {webinar.duration}
            </div>
            {webinar.status === "upcoming" ? (
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Users className="h-4 w-4" />
                {webinar.totalSlots} slots ({webinar.availableSlots} slots left)
              </div>
            ) : (
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Users className="h-4 w-4" />
                {webinar.actualAttendees} attended
              </div>
            )}
              <div className="flex items-center gap-1 whitespace-nowrap">
              <IndianRupee  className="h-4 w-4" />
               Free
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border ">
          <img
            src={webinar.image || "/placeholder.svg"}
            alt={webinar.title}
            className="w-full  object-cover h-64"
          />
        </div>
      </CardContent>
    </Card>
  );
}
