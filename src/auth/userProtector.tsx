import { selectAuth } from "@/redux/slices/authSlice";
import { ROUTES } from "@/routes/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserRouteProtector = () => {
  const { user } = useSelector(selectAuth);

  if (!user?.id) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
};

export default UserRouteProtector;
