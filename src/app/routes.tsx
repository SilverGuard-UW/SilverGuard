import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout.tsx";
import { Layout } from "./components/Layout.tsx";
import { HomePage } from "./components/pages/HomePage.tsx";
import { Dashboard } from "./components/pages/Dashboard.tsx";
import { EducationPage } from "./components/pages/EducationPage.tsx";
import { LessonPage } from "./components/pages/LessonPage.tsx";
import { PracticeIntro } from "./components/pages/PracticeIntro.tsx";
import { PracticeInstructions } from "./components/pages/PracticeInstructions.tsx";
import { PhishingSimulator } from "./components/pages/PhishingSimulator.tsx";
import { AccessibilitySettings } from "./components/pages/AccessibilitySettings.tsx";
import { GetHelpPage } from "./components/pages/GetHelpPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { index: true, Component: HomePage },
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