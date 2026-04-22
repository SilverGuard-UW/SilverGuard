import { Outlet } from "react-router";
import { AccessibilityProvider } from "../contexts/AccessibilityContext.tsx";

export function RootLayout() {
  return (
    <AccessibilityProvider>
      <Outlet />
    </AccessibilityProvider>
  );
}
