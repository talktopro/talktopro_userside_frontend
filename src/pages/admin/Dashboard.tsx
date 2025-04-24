import Dashboard from "@/components/admin/Dashboard";
import DateScroller from "@/components/admin/dashboard/DateScroller";
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
      <h2 className="text-2xl pb-7 not-sm:text-lg font-bold mb-3">Dashboard</h2>
      <DateScroller
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <PerDayBookings
        isPerDayBookingsLoading={isPerDayBookingsLoading}
      />
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
