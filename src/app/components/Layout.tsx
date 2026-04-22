import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation.tsx";
import { AccessibilityBar } from "./AccessibilityBar.tsx";

export function Layout() {
  const location = useLocation();
  const showNav = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-gray-50">
      <AccessibilityBar />
      {showNav && <Navigation />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}