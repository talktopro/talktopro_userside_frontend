// import AnalyticsGraph from "@/components/mentor/dashboard/AnalyticsGraph";
// import YoutubePart from "@/components/mentor/dashboard/YoutubePart";
import { selectAuth } from "@/redux/slices/authSlice";
import getGreeting from "@/utils/getGreeting";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector(selectAuth);
  if (!user) {
    return null;
  };

  return (
    <div className="p-4 space-y-3">
      <div>
        <h2 className="text-2xl not-sm:text-lg font-bold">
          Hello {user.uname},
        </h2>
        <p className="text-xl not-sm:text-sm pb-10">{getGreeting()} -</p>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm h-auto min-h-96 lg:flex-row flex-col text-center">
        Dashboard details are currently unavailable in the beta version.
      </div>
    </div>
  );
};

export default Dashboard;
