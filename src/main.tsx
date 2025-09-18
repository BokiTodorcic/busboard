import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const api_key: string | undefined = import.meta.env.VITE_API_KEY;

if (typeof api_key === "undefined") {
  throw new Error("Cannot accept API key of type 'undefined'");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
