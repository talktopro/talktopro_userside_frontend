import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/user/LoginPage";
import { ROUTES } from "./routes";
import HomePage from "@/pages/user/HomePage";
import SignupPage from "@/pages/user/SignupPage";
import ForgotPasswordPage from "@/pages/user/ForgotPasswordPage";
import Bookings from "@/pages/user/Bookings";
import MentorBookings from "@/pages/mentor/Bookings";
import ProfessionalDetailsPage from "@/pages/user/ProfessionalDetailsPage";
import AllProfessionalsPage from "@/pages/user/AllProfessionalsPage";
import MainLayout from "@/layouts/MainLayout";
import AccountSettings from "@/pages/user/AccountSettings";
import ChangePasswordPage from "@/pages/user/ChangePasswordPage";
import SignupOtpPage from "@/pages/user/SignupOtpPage";
import MentorLayout from "@/layouts/MentorLayout";

//! Mentor pages
import Dashboard from "@/pages/mentor/Dashboard";
import MentorResiterPage from "@/pages/mentor/MentorRegister";
import MentorAccountDetails from "@/pages/mentor/AccountDetails";
import SlotManagement from "@/pages/mentor/SlotManagement";
import Analytics from "@/pages/mentor/Analytics";

//! Admin pages
import AdminLoginPage from "@/pages/admin/Login";
import AdminBookings from "@/pages/admin/Bookings";
import MentorsTable from "@/pages/admin/MentorsTable";
import UsersTable from "@/pages/admin/UsersTable";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";

//! Protectors
import AdminRouteProtector from "@/auth/adminProtector";
import GuestAdminProtector from "@/auth/guestAdmin";
import MentorRouteProtector from "@/auth/mentorProtector";
import UserRouteProtector from "@/auth/userProtector";
import GuestUserProtector from "@/auth/guestUserProtector";
import MentorRegisterProtector from "@/auth/mentorRegisterProtector";

const AppRoutes = () => {
  return (
    <Routes>
      {/* guest users routes */}

      <Route element={<GuestUserProtector />}>
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.AUTH.SIGNUP} element={<SignupPage />} />
        <Route
          path={ROUTES.AUTH.SIGNUP_OTP_VERIFY}
          element={<SignupOtpPage />}
        />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={ROUTES.AUTH.CHANGE_PASSWORD}
          element={<ChangePasswordPage />}
        />
      </Route>
      <Route element={<MainLayout />}>
        {/* common routes */}

        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route
          path={ROUTES.PROFESSIONALS.LIST}
          element={<AllProfessionalsPage />}
        />
        <Route
          path={ROUTES.PROFESSIONALS.DETAILS()}
          element={<ProfessionalDetailsPage />}
        />

        {/* all user protected routes */}

        <Route element={<UserRouteProtector />}>
          <Route element={<MentorRegisterProtector />}>
            <Route
              path={ROUTES.MENTOR.REGISTER}
              element={<MentorResiterPage />}
            />
          </Route>
          <Route path={ROUTES.BOOKINGS} element={<Bookings />} />
          <Route path={ROUTES.ACCOUNT_SETTINGS} element={<AccountSettings />} />
        </Route>
      </Route>

      {/* All mentor routes */}
      <Route element={<MentorRouteProtector />}>
        <Route element={<MentorLayout />}>
          <Route path={ROUTES.MENTOR.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.MENTOR.BOOKINGS} element={<MentorBookings />} />
          <Route
            path={ROUTES.MENTOR.SLOT_MANAGEMENT}
            element={<SlotManagement />}
          />
          <Route path={ROUTES.MENTOR.ANALYTICS} element={<Analytics />} />
          <Route
            path={ROUTES.MENTOR.ACCOUNT_SETTINGS}
            element={<MentorAccountDetails />}
          />
        </Route>
      </Route>

      {/* All admin routes */}

      <Route element={<GuestAdminProtector />}>
        <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLoginPage />} />
      </Route>
      <Route element={<AdminRouteProtector />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN.BOOKINGS} element={<AdminBookings />} />
          <Route path={ROUTES.ADMIN.USERS} element={<UsersTable />} />
          <Route path={ROUTES.ADMIN.MENTORS} element={<MentorsTable />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
