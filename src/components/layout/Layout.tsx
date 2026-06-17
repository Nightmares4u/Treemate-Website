import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "../ui/ScrollProgress";
import { ScrollToTop } from "../ui/ScrollToTop";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
