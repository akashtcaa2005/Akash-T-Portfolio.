import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import PageLayout from "./components/PageLayout";

import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
import SecurityPage from "./pages/SecurityPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0b080c" }} />}>
          <Routes>
            {/* Flagship Home page with interactive 3D scene & smooth scroll */}
            <Route
              path="/"
              element={
                <MainContainer>
                  <Suspense fallback={null}>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              }
            />

            {/* Dedicated multi-page views */}
            <Route
              path="/about"
              element={
                <PageLayout>
                  <AboutPage />
                </PageLayout>
              }
            />
            <Route
              path="/projects"
              element={
                <PageLayout>
                  <ProjectsPage />
                </PageLayout>
              }
            />
            <Route
              path="/experience"
              element={
                <PageLayout>
                  <ExperiencePage />
                </PageLayout>
              }
            />
            <Route
              path="/skills"
              element={
                <PageLayout>
                  <SkillsPage />
                </PageLayout>
              }
            />
            <Route
              path="/security"
              element={
                <PageLayout>
                  <SecurityPage />
                </PageLayout>
              }
            />
            <Route
              path="/achievements"
              element={
                <PageLayout>
                  <AchievementsPage />
                </PageLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PageLayout>
                  <ContactPage />
                </PageLayout>
              }
            />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <PageLayout>
                  <NotFoundPage />
                </PageLayout>
              }
            />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </BrowserRouter>
  );
};

export default App;
