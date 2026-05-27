import { Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { useAccessibility } from "../contexts/AccessibilityContext";
import { useAuth } from "../contexts/AuthContext";

export function AccessibilityBar() {
  const { t } = useAccessibility();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const handleLogout = async () => {
    await logout();
    // AuthGuard in RootLayout will redirect to "/" automatically
  };

  return (
    <div className="bg-blue-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-medium">{t("home.title")}</span>
        {user && !isLoginPage && (
          <span className="text-xl text-blue-200">
            Welcome, {user.displayName ?? user.email}!
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {!isLoginPage && (
          <>
            <Link to="/settings">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-blue-800 h-auto px-6 py-3 flex items-center gap-3"
              >
                <Settings className="h-7 w-7" />
                <span className="text-xl">{t("nav.settings")}</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              onClick={handleLogout}
              className="text-white hover:bg-blue-800 h-auto px-6 py-3 flex items-center gap-3"
            >
              <LogOut className="h-7 w-7" />
              <span className="text-xl">Log Out</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
