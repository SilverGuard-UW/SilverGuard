import { Link } from "react-router";
import { Card, CardContent } from "../ui/card.tsx";
import { Button } from "../ui/button.tsx";
import { ArrowRight } from "lucide-react";
import { useAccessibility } from "../../contexts/AccessibilityContext.tsx";
import { useEffect } from "react";

export function PracticeInstructions() {
  const { t } = useAccessibility();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl mb-8 text-gray-900">
            {t("practice.whatToExpect")}
          </h1>
        </div>

        <Card className="bg-blue-50 border-blue-200 border-4 mb-12">
          <CardContent className="pt-10 pb-10">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-3xl">
                  1
                </div>
                <p className="text-3xl leading-relaxed pt-3">{t("practice.step1")}</p>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-3xl">
                  2
                </div>
                <p className="text-3xl leading-relaxed pt-3">{t("practice.step2")}</p>
              </div>
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-3xl">
                  3
                </div>
                <p className="text-3xl leading-relaxed pt-3">{t("practice.step3")}</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t-2 border-blue-300">
              <div className="bg-yellow-50 border-4 border-yellow-400 rounded-xl p-6">
                <p className="text-2xl text-center leading-relaxed">
                  <strong className="text-3xl">💡 {t("practice.reminder")}</strong><br />
                  {t("practice.reminderText")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Link to="/simulator/quiz">
          <Button
            size="lg"
            className="w-full text-3xl px-20 py-12 h-auto rounded-2xl shadow-2xl bg-orange-600 hover:bg-orange-700 text-white border-4 border-orange-800 transform transition-transform hover:scale-105"
          >
            <span className="mr-4">▶</span>
            {t("practice.beginQuiz")}
            <ArrowRight className="h-9 w-9 ml-4" strokeWidth={3} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
