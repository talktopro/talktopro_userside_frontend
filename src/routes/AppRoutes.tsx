import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import LoginPage from "../pages/user/LoginPage";
import HomePage from "@/pages/user/HomePage";
import SignupPage from "@/pages/user/SignupPage";
import ForgotPasswordPage from "@/pages/user/ForgotPasswordPage";
import Bookings from "@/pages/user/Bookings";
import ProfessionalDetailsPage from "@/pages/user/ProfessionalDetailsPage";
import AllProfessionalsPage from "@/pages/user/AllProfessionalsPage";
import MainLayout from "@/layouts/MainLayout";
import AccountSettings from "@/pages/user/AccountSettings";
import ChangePasswordPage from "@/pages/user/ChangePasswordPage";
import SignupOtpPage from "@/pages/user/SignupOtpPage";
import AboutUs from "@/pages/common/aboutUs";
import Webinars from "@/pages/user/Webinars";

// Loading page
import AppLoader from "@/components/common/loading/AppLoader";

// Mentor pages
const MentorLayout = lazy(() => import("@/layouts/MentorLayout"));
const MentorBookings = lazy(() => import("@/pages/mentor/Bookings"));
const Dashboard = lazy(() => import("@/pages/mentor/Dashboard"));
const MentorResiterPage = lazy(() => import("@/pages/mentor/MentorRegister"));
const MentorAccountDetails = lazy(() => import("@/pages/mentor/AccountDetails"));
const SlotManagement = lazy(() => import("@/pages/mentor/SlotManagement"));
const Pricing = lazy(() => import("@/pages/mentor/Pricing"));

// Protectors
import MentorRouteProtector from "@/auth/mentorProtector";
import UserRouteProtector from "@/auth/userProtector";
import GuestUserProtector from "@/auth/guestUserProtector";
import MentorRegisterProtector from "@/auth/mentorRegisterProtector";
import NotFoundPage from "@/pages/common/404";
import ContactUs from "@/pages/common/ContactUs";
import TermsAndConditions from "@/pages/common/Terms&Condition";
import PrivacyAndPolicy from "@/pages/common/Privacy&Policy";
import RefundTerms from "@/pages/common/RefundTerms";
import PricingTerms from "@/pages/common/PricingTerms";

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
        <Route path={ROUTES.WEBINAR} element={<Webinars />} />
        <Route path={ROUTES.ABOUT} element={<AboutUs />} />
        <Route path={ROUTES.CONTACT_US} element={<ContactUs from="user" />} />
        <Route path={ROUTES.TERMS_AND_CONDITION} element={<TermsAndConditions />} />
        <Route path={ROUTES.PRIVACY_AND_POLICY} element={<PrivacyAndPolicy />} />
        <Route path={ROUTES.REFUND_POLICY} element={<RefundTerms />} />
        <Route path={ROUTES.PRICING_POLICY} element={<PricingTerms />} />
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
        <Route
          element={
            <Suspense fallback={<AppLoader />}>
              <MentorLayout />
            </Suspense>
          }
        >
          <Route
            path={ROUTES.MENTOR.DASHBOARD}
            element={
              <Suspense fallback={<AppLoader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.BOOKINGS}
            element={
              <Suspense fallback={<AppLoader />}>
                <MentorBookings />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.SLOT_MANAGEMENT}
            element={
              <Suspense fallback={<AppLoader />}>
                <SlotManagement />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.PRICING}
            element={
              <Suspense fallback={<AppLoader />}>
                <Pricing />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.ACCOUNT_SETTINGS}
            element={
              <Suspense fallback={<AppLoader />}>
                <MentorAccountDetails />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.ABOUT}
            element={
              <Suspense fallback={<AppLoader />}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.CONTACT_US}
            element={
              <Suspense fallback={<AppLoader />}>
                <ContactUs from="mentor" />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.TERMS_AND_CONDITION}
            element={
              <Suspense fallback={<AppLoader />}>
                <TermsAndConditions />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.PRIVACY_AND_POLICY}
            element={
              <Suspense fallback={<AppLoader />}>
                <PrivacyAndPolicy />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.REFUND_POLICY}
            element={
              <Suspense fallback={<AppLoader />}>
                <RefundTerms />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MENTOR.PRICING_POLICY}
            element={
              <Suspense fallback={<AppLoader />}>
                <PricingTerms />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
