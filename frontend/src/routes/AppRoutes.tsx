import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { ROUTES } from "./routes";
import HomePage from "@/pages/HomePage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ProfessionalDetails from "@/pages/ProfessionalProfile";
import AllMentors from "@/pages/AllMentors";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      {/* Authentication Routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      {/* Professional profile area from user side */}
      <Route path={ROUTES.MENTOR_DETAILS} element={<ProfessionalDetails />} />
      {/* all professonals listing page */}
      <Route path={ROUTES.ALL_MENTORS} element={<AllMentors />} />
    </Routes>
  );
};

export default AppRoutes;
