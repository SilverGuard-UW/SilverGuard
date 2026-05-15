import { Outlet, useLocation, useNavigate } from "react-router";
import { Navigation } from "./Navigation";
import { AccessibilityBar } from "./AccessibilityBar";
import { useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const showNav = location.pathname !== "/" && location.pathname !== "/home";

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("silverguard-logged-in");
    if (!isLoggedIn && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

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