import { Routes, Route, useParams } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { AboutPage } from "./pages/AboutPage";
import { CareersPage } from "./pages/CareersPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

/** Reads the dynamic :slug param and hands it to BlogPostPage as a prop. */
function BlogPostRoute() {
  const { slug } = useParams<{ slug: string }>();
  return <BlogPostPage slug={slug ?? ""} />;
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/software-ai"
          element={<ServicePage slug="software-ai" />}
        />
        <Route
          path="/marketing"
          element={<ServicePage slug="marketing" />}
        />
        <Route
          path="/hr-solutions"
          element={<ServicePage slug="hr-solutions" />}
        />
        <Route
          path="/customer-success"
          element={<ServicePage slug="customer-success" />}
        />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/blog/:slug"
          element={<BlogPostRoute />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default App;
