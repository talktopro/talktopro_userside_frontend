import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import { ROUTES } from "./routes"
import HomePage from "@/pages/HomePage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            {/* authentication */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Routes>
    )
}

export default AppRoutes