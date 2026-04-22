import { Link } from "react-router";
import { Card, CardContent } from "../ui/card.tsx";
import { Button } from "../ui/button.tsx";
import { Shield } from "lucide-react";
import { useAccessibility } from "../../contexts/AccessibilityContext.tsx";
import { useEffect } from "react";

export function PracticeIntro() {
  const { t } = useAccessibility();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-10 rounded-full shadow-2xl">
              <Shield className="h-24 w-24 text-white" />
            </div>
          </div>
          <h1 className="text-6xl mb-8 text-gray-900">
            {t("practice.title")}
          </h1>
          <p className="text-4xl text-gray-700 mb-16 max-w-2xl mx-auto leading-relaxed">
            {t("practice.subtitle")}
          </p>
        </div>

        <Card className="bg-gradient-to-r from-orange-100 to-orange-50 border-4 border-orange-300">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-8">
              <Shield className="h-20 w-20 text-orange-600" />
            </div>
            <p className="text-3xl mb-12 text-gray-900 leading-relaxed">
              {t("practice.description")}
            </p>
            <Link to="/simulator/instructions">
              <Button
                size="lg"
                className="text-3xl px-20 py-12 h-auto rounded-2xl shadow-2xl bg-orange-600 hover:bg-orange-700 text-white border-4 border-orange-800 transform transition-transform hover:scale-105"
              >
                {t("practice.getStarted")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
