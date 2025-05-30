import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import InitialLoadingWrapper from "./components/common/loading/LoadingWrapper.tsx";
import { SocketProvider } from "./contexts/socket.tsx";

createRoot(document.getElementById("root")!).render(
   <InitialLoadingWrapper>
      <SocketProvider>
         <App />
      </SocketProvider>
   </InitialLoadingWrapper>
);