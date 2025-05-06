import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import LoginPage from "../pages/user/LoginPage";
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
import AboutUs from "@/pages/common/aboutUs";

//! Mentor pages
import Dashboard from "@/pages/mentor/Dashboard";
import MentorResiterPage from "@/pages/mentor/MentorRegister";
import MentorAccountDetails from "@/pages/mentor/AccountDetails";
import SlotManagement from "@/pages/mentor/SlotManagement";
import Pricing from "@/pages/mentor/Pricing";

//! Protectors
import MentorRouteProtector from "@/auth/mentorProtector";
import UserRouteProtector from "@/auth/userProtector";
import GuestUserProtector from "@/auth/guestUserProtector";
import MentorRegisterProtector from "@/auth/mentorRegisterProtector";
import NotFoundPage from "@/pages/common/404";

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
        <Route path={ROUTES.ABOUT} element={<AboutUs />} />
        <Route path="*" element={<NotFoundPage />} />
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
          <Route path={ROUTES.MENTOR.PRICING} element={<Pricing />} />
          <Route
            path={ROUTES.MENTOR.ACCOUNT_SETTINGS}
            element={<MentorAccountDetails />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
