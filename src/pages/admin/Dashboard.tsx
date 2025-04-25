import AnalaticsGraph from "@/components/admin/dashboard/AnalaticsGraph";
import DateScroller from "@/components/admin/dashboard/DateScroller";
import DashboardMetrics from "@/components/admin/dashboard/MetricCard";
import PerDayBookings from "@/components/admin/dashboard/PerDayBookings";
import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isPerDayBookingsLoading, setIsPerDayBookingsLoading] = useState(true)

  // const fetchPerDayBooking = async () => {
  //   const response = await apiClient.get(`/admin/perday-bookings`, { params: { date: selectedDate } });
  // };

  useEffect(() => {
    setIsPerDayBookingsLoading(true)
  }, [selectedDate])

  return (
    <div className="px-4 max-w-screen space-y-3">
      <h2 className="text-2xl pb-7 not-sm:text-lg font-bold mb-1">Dashboard</h2>

      <DashboardMetrics />
      <div className="flex flex-row not-sm:flex-col gap-3 w-full mt-10">
        <div className="flex flex-col overflow-x-hidden max-w-xl">
          <DateScroller
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <PerDayBookings
            isPerDayBookingsLoading={isPerDayBookingsLoading}
          />
        </div>
        <AnalaticsGraph />
      </div>
    </div>
  );
};

export default AdminDashboard;
