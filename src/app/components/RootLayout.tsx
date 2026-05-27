import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { AccessibilityProvider } from "../contexts/AccessibilityContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function AuthGuard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    const isLoginPage = location.pathname === "/";
    if (!user && !isLoginPage) {
      navigate("/", { replace: true });
    }
    if (user && isLoginPage) {
      navigate("/home", { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export function RootLayout() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <AuthGuard />
      </AccessibilityProvider>
    </AuthProvider>
  );
}
