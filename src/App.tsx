import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./contexts/themeContext";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-loading-skeleton/dist/skeleton.css";
import { SocketProvider } from "./contexts/socket";

//sample.....
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!clientId) {
  console.error(
    "Google Client ID is not defined. Please set VITE_GOOGLE_CLIENT_ID in your environment variables."
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={clientId}>
          <ThemeProvider>
            <SocketProvider>
              <BrowserRouter>
                <Toaster />
                <ScrollToTop />{" "}
                {/* Ensures scrolling to the top on route change */}
                <AppRoutes />
              </BrowserRouter>
            </SocketProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
