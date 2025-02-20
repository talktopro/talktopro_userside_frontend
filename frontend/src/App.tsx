import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./contexts/themeContext";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* Ensures scrolling to the top on route change */}
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
