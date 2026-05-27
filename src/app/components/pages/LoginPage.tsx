import { useEffect } from "react";
import { Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";
import { useState } from "react";

export function LoginPage() {
  const { t } = useAccessibility();
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoogleSignIn = async () => {
    setError("");
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // RootLayout's AuthGuard will redirect to /home once user is set
    } catch (err: any) {
      setError("Sign-in failed. Please try again.");
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-8 rounded-full">
              <Shield className="h-20 w-20 text-white" />
            </div>
          </div>
          <h1 className="text-6xl mb-4 text-gray-900">{t("home.title")}</h1>
          <p className="text-2xl text-gray-600 leading-relaxed">{t("home.subtitle")}</p>
        </div>

        {/* Sign In Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl text-center">{t("login.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pb-10">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                <p className="text-xl text-red-700">{error}</p>
              </div>
            )}

            <Button
              size="lg"
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full text-2xl px-8 py-8 h-auto rounded-xl shadow-lg bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 flex items-center justify-center gap-4"
            >
              {/* Google "G" logo */}
              <svg className="h-10 w-10" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {signingIn ? "Signing in..." : "Sign in with Google"}
            </Button>

            <p className="text-center text-xl text-gray-500 leading-relaxed">
              Your progress will be saved automatically across all your devices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
