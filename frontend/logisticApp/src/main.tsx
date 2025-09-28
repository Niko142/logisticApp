import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App";
import { ToasterProvider } from "./shared/toast";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToasterProvider />
  </StrictMode>
);
