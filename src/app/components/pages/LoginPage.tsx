import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export function LoginPage() {
  const { t } = useAccessibility();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-8 rounded-full">
              <Shield className="h-20 w-20 text-white" />
            </div>
          </div>
          <h1 className="text-6xl mb-8 text-gray-900">
            {t("home.title")}
          </h1>
        </div>

        {/* Login Form */}
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
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-3xl px-16 py-10 h-auto rounded-xl shadow-lg flex items-center justify-center gap-4"
              >
                {t("login.loginButton")}
                <ArrowRight
                  className="h-10 w-10"
                  strokeWidth={2.5}
                />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}