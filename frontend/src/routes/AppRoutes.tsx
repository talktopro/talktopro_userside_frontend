import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { ROUTES } from "./routes";
import HomePage from "@/pages/HomePage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Bookings from "@/pages/Bookings";
import MentorBookings from "@/pages/mentor/Bookings";
import ProfessionalDetailsPage from "@/pages/ProfessionalDetailsPage";
import AllProfessionalsPage from "@/pages/AllProfessionalsPage";
import MainLayout from "@/layouts/MainLayout";
import AccountSettings from "@/pages/AccountSettings";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import SignupOtpPage from "@/pages/SignupOtpPage";
import MentorLayout from "@/layouts/MentorLayout";
import Dashboard from "@/pages/mentor/Dashboard";
import MentorResiterPage from "@/pages/mentor/MentorRegister";
import MentorAccountDetails from "@/pages/mentor/AccountDetails";
import SlotManagement from "@/pages/mentor/SlotManagement";
import Analytics from "@/pages/mentor/Analytics";
import NotificationSettings from "@/pages/mentor/NotificationSettings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes with Navbar and footer */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route
          path={ROUTES.PROFESSIONALS.LIST}
          element={<AllProfessionalsPage />}
        />
      </Route>
      {/* Authentication Routes */}
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.SIGNUP} element={<SignupPage />} />
      <Route
        path={ROUTES.AUTH.FORGOT_PASSWORD}
        element={<ForgotPasswordPage />}
      />
      <Route
        path={ROUTES.AUTH.CHANGE_PASSWORD}
        element={<ChangePasswordPage />}
      />
      <Route path={ROUTES.AUTH.OTP_SIGNUP} element={<SignupOtpPage />} />

      {/* Professional profile area from user side */}
      <Route
        path={ROUTES.PROFESSIONALS.DETAILS()}
        element={<ProfessionalDetailsPage />}
      />
      {/* User booking table with details */}
      <Route path={ROUTES.BOOKINGS} element={<Bookings />} />
      {/* User account details page */}
      <Route path={ROUTES.ACCOUNT_SETTINGS} element={<AccountSettings />} />

      {/* All mentor routes */}
      <Route path={ROUTES.MENTOR.REGISTER} element={<MentorResiterPage />} />
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
        <Route
          path={ROUTES.MENTOR.NOTIFICATION_SETTINGS}
          element={<NotificationSettings />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
