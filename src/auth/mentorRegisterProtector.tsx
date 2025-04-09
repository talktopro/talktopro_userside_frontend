import { selectAuth } from "@/redux/slices/authSlice";
import { ROUTES } from "@/routes/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MentorRegisterProtector = () => {
  const { user } = useSelector(selectAuth);

  if (!user?.id) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (user.isMentor) {
    return <Navigate to={ROUTES.MENTOR.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default MentorRegisterProtector;
