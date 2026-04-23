import { Outlet } from "react-router";
import { AccessibilityProvider } from "../contexts/AccessibilityContext";

export function RootLayout() {
  return (
    <AccessibilityProvider>
      <Outlet />
    </AccessibilityProvider>
  );
}
