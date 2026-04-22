import { Link } from "react-router";
import { Shield, BookOpen } from "lucide-react";
import { Button } from "../ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { useAccessibility } from "../../contexts/AccessibilityContext.tsx";
import { useEffect } from "react";

export function HomePage() {
  const { t } = useAccessibility();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-8 rounded-full">
              <Shield className="h-20 w-20 text-white" />
            </div>
          </div>
          <h1 className="text-6xl mb-8 text-gray-900">
            {t("home.title")}
          </h1>
          <p className="text-4xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("home.subtitle")}
          </p>
          <Link to="/education">
            <Button size="lg" className="text-3xl px-16 py-10 h-auto rounded-xl shadow-lg">
              <BookOpen className="h-10 w-10 mr-4" />
              {t("home.startLearning")}
            </Button>
          </Link>
        </div>

        {/* Quick Start Guide */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-4">
              {t("home.howItWorks")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl">
                  1
                </div>
                <p className="text-2xl leading-relaxed">
                  {t("home.step1")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl">
                  2
                </div>
                <p className="text-2xl leading-relaxed">
                  {t("home.step2")}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl">
                  3
                </div>
                <p className="text-2xl leading-relaxed">
                  {t("home.step3")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}