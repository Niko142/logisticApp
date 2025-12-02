import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App";
import { CustomToaster } from "./components/ui/Toast";

import "@styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <CustomToaster />
  </StrictMode>
);
