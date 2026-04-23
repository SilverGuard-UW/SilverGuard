import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Layout } from "./components/Layout";
import { LoginPage } from "./components/pages/LoginPage";
import { HomePage } from "./components/pages/HomePage";
import { Dashboard } from "./components/pages/Dashboard";
import { EducationPage } from "./components/pages/EducationPage";
import { LessonPage } from "./components/pages/LessonPage";
import { PracticeIntro } from "./components/pages/PracticeIntro";
import { PracticeInstructions } from "./components/pages/PracticeInstructions";
import { PhishingSimulator } from "./components/pages/PhishingSimulator";
import { AccessibilitySettings } from "./components/pages/AccessibilitySettings";
import { GetHelpPage } from "./components/pages/GetHelpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: LoginPage },
          { path: "home", Component: HomePage },
          { path: "dashboard", Component: Dashboard },
          { path: "education", Component: EducationPage },
          { path: "education/:lessonId", Component: LessonPage },
          { path: "simulator", Component: PracticeIntro },
          { path: "simulator/instructions", Component: PracticeInstructions },
          { path: "simulator/quiz", Component: PhishingSimulator },
          { path: "settings", Component: AccessibilitySettings },
          { path: "help", Component: GetHelpPage },
        ],
      },
    ],
  },
]);