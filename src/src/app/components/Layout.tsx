import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";
import { AccessibilityBar } from "./AccessibilityBar";

export function Layout() {
  const location = useLocation();
  const showNav = location.pathname !== "/" && location.pathname !== "/home";

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