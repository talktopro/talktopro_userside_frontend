import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import { ROUTES } from "./routes"

const AppRoutes = () => {
    return (
        <Routes>
            {/* authentication */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Routes>
    )
}

export default AppRoutes