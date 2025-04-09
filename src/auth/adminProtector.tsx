import { RootState } from "@/redux/store";
import { ROUTES } from "@/routes/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRouteProtector = () => {
  const isAdmin = useSelector((state: RootState) => state.admin.isAdmin);

  if (!isAdmin) {
    return <Navigate to={ROUTES.ADMIN.LOGIN} replace />;
  }

  return <Outlet />;
};

export default AdminRouteProtector;
