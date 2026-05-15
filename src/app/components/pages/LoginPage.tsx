import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAccessibility } from "../../contexts/AccessibilityContext";

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function LoginPage() {
  const { t, reloadForUser } = useAccessibility();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError(t("login.error.emptyUsername"));
      return;
    }
    if (!password) {
      setError(t("login.error.emptyPassword"));
      return;
    }
    if (password.length < 6) {
      setError(t("login.error.shortPassword"));
      return;
    }

    setIsLoading(true);
    try {
      const hashed = await hashPassword(password);
      const users: Record<string, { password: string }> = JSON.parse(
        localStorage.getItem("silverguard-users") || "{}"
      );

      if (users[username.trim()]) {
        if (users[username.trim()].password !== hashed) {
          setError(t("login.error.wrongPassword"));
          setIsLoading(false);
          return;
        }
      } else {
        users[username.trim()] = { password: hashed };
        localStorage.setItem("silverguard-users", JSON.stringify(users));
      }

      sessionStorage.setItem("silverguard-logged-in", "true");
      sessionStorage.setItem("silverguard-current-user", username.trim());
      reloadForUser();
      navigate("/home");
    } catch {
      setError(t("login.error.generic"));
    } finally {
      setIsLoading(false);
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
          <h1 className="text-6xl mb-8 text-gray-900">{t("home.title")}</h1>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl text-center">
              {t("login.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="username" className="text-3xl">
                  {t("login.username")}
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-2xl h-auto py-6 px-6 rounded-xl border-2"
                  placeholder={t("login.usernamePlaceholder")}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-3xl">
                  {t("login.password")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-2xl h-auto py-6 px-6 rounded-xl border-2"
                  placeholder={t("login.passwordPlaceholder")}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl px-6 py-4">
                  <p className="text-2xl text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full text-3xl px-16 py-10 h-auto rounded-xl shadow-lg flex items-center justify-center gap-4"
              >
                {isLoading ? t("login.signingIn") : t("login.loginButton")}
                {!isLoading && <ArrowRight className="h-10 w-10" strokeWidth={2.5} />}
              </Button>
            </form>

            <p className="text-xl text-gray-500 text-center mt-8">
              {t("login.hint")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
