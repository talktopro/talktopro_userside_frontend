import { selectAuth } from "@/redux/slices/authSlice";
import { ROUTES } from "@/routes/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const GuestUserProtector = () => {
  const { user } = useSelector(selectAuth);

  if (user?.id) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default GuestUserProtector;
