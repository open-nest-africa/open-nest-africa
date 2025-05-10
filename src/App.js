import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import TechnicalWriters from "./modules/resources/TechnicalWriters";
import Developers from "./modules/resources/Developers";
import Designers from "./modules/resources/Designers";

function App() {
  const Home = lazy(() => import("./modules/Home"));
  const Login = lazy(() => import("./modules/auth/pages/Login"));
  const Signup = lazy(() => import("./modules/auth/pages/Signup"));
  const Resources = lazy(() => import("./modules/resources/Resources"));
  const AboutUs = lazy(() => import("./modules/about-us/AboutUs"));
  const GithubAuth = lazy(() => import("./modules/auth/pages/GithubAuth"));
  const Dashboard = lazy(() => import("./modules/dashboard"));
  const MostProjects = lazy(() =>
    import("./modules/dashboard/pages/MostProjects")
  );
  const Sopohome = lazy(() => import("./modules/dashboard/pages/Sopohome"));
  const Gitlab = lazy(() => import("./modules/dashboard/pages/Gitlab"));
  const MeshAI = lazy(() => import("./modules/dashboard/pages/MeshAI"));
  const OpenAI = lazy(() => import("./modules/dashboard/pages/OpenAI"));

  // route updated
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/resources/technical-writing"
            element={<TechnicalWriters />}
          />
          <Route path="/resources/developers" element={<Developers />} />
          <Route path="/resources/designers" element={<Designers />} />
          <Route path="/auth/github" element={<GithubAuth />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route element={<Dashboard />} path="/dashboard">
            <Route index element={<MostProjects />} />
            <Route path="sopohome" element={<Sopohome />} />
            <Route path="gitlab" element={<Gitlab />} />
            <Route path="meshai" element={<MeshAI />} />
            <Route path="openai" element={<OpenAI />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
