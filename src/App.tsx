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
import InitialLoadingWrapper from "./components/common/loading/LoadingWrapper";

//sample.
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={clientId}>
          <ThemeProvider>
            <InitialLoadingWrapper>
              <SocketProvider>
                <BrowserRouter>
                  <Toaster />
                  <ScrollToTop />{" "}
                  {/* Ensures scrolling to the top on route change */}
                  <AppRoutes />
                </BrowserRouter>
              </SocketProvider>
            </InitialLoadingWrapper>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
