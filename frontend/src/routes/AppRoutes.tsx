import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import { ROUTES } from "./routes"
import HomePage from "@/pages/HomePage"
import SignupPage from "@/pages/SignupPage"
import ForgotPasswordPage from "@/pages/ForgotPasswordPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            {/* Authentication Routes */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        </Routes>
    )
}

export default AppRoutes;