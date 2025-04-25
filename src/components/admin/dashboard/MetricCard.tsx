import type React from "react"
import { DollarSign, Users, GraduationCap, NotebookText } from "lucide-react"

interface MetricCardProps {
   title: string
   value: string
   change: string
   icon: React.ReactNode
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
   return (
      <div className="rounded-lg p-6 not-sm:p-3 border">
         <div className="flex justify-between items-center">
            <h3 className="text-muted-foreground/80 font-medium not-sm:text-sm">{title}</h3>
            <div className="text-muted-foreground/80">{icon}</div>
         </div>
         <div className="mt-2 not-sm:mt-1">
            <p className="text-3xl not-sm:text-lg font-bold">{value}</p>
            <p className="text-sm not-sm:text-xs text-muted-foreground/80 mt-1">{change}</p>
         </div>
      </div>
   );
};

const DashboardMetrics = () => {
   return (
      <div className="max-w-screen mx-auto">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard
               title="Total Revenue"
               value="₹45,231.89"
               change="+20.1% from last month"
               icon={<DollarSign className="h-5 w-5 not-sm:w-3 not-sm:h-3" />}
            />
            <MetricCard
               title="Bookings"
               value="+2350"
               change="+180.1% from last month"
               icon={<NotebookText className="h-5 w-5 not-sm:w-3 not-sm:h-3" />}
            />
            <MetricCard
               title="Users"
               value="+12,234"
               change="+19% from last month"
               icon={<Users className="h-5 w-5 not-sm:w-3 not-sm:h-3" />}
            />
            <MetricCard
               title="Mentors"
               value="+573"
               change="+201 since last hour"
               icon={<GraduationCap className="h-5 w-5 not-sm:w-3 not-sm:h-3" />}
            />
         </div>
      </div>
   );
};

export default DashboardMetrics;