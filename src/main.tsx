import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./styles/globals.css";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    {/*
      Vercel Web Analytics. The import is "@vercel/analytics/react" — this is a
      Vite SPA, so the "/next" entry point does not apply. Mounted inside the
      router so client-side route changes are recorded as pageviews.
    */}
    <Analytics />
  </BrowserRouter>,
);
