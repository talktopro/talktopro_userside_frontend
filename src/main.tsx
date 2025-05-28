import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import InitialLoadingWrapper from "./components/common/loading/LoadingWrapper.tsx";

createRoot(document.getElementById("root")!).render(
   <InitialLoadingWrapper>
      <App />
   </InitialLoadingWrapper>
);