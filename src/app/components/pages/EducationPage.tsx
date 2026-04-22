import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button.tsx";
import { useAccessibility } from "../../contexts/AccessibilityContext.tsx";
import { useState, useEffect } from "react";

export function EducationPage() {
  const { t } = useAccessibility();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Load completed lessons from localStorage
    const completed = JSON.parse(localStorage.getItem('silverguard-lessons-completed') || '[]');
    setCompletedLessons(completed);
  }, []);
  
  const lessons = [
    {
      id: "what-are-phishing-scams",
      title: t("lesson.whatAreScams"),
      description: t("lesson.whatAreScamsDesc"),
      duration: "10 " + t("lesson.duration"),
      completed: completedLessons.includes("what-are-phishing-scams"),
    },
    {
      id: "avoiding-phishing-scams",
      title: t("lesson.avoidingScams"),
      description: t("lesson.avoidingScamsDesc"),
      duration: "12 " + t("lesson.duration"),
      completed: completedLessons.includes("avoiding-phishing-scams"),
    },
    {
      id: "email-phishing",
      title: t("lesson.emailScams"),
      description: t("lesson.emailScamsDesc"),
      duration: "15 " + t("lesson.duration"),
      completed: completedLessons.includes("email-phishing"),
    },
    {
      id: "phone-scams",
      title: t("lesson.phoneScams"),
      description: t("lesson.phoneScamsDesc"),
      duration: "10 " + t("lesson.duration"),
      completed: false,
    },
    {
      id: "social-media-scams",
      title: t("lesson.socialMedia"),
      description: t("lesson.socialMediaDesc"),
      duration: "12 " + t("lesson.duration"),
      completed: false,
    },
    {
      id: "reporting-scams",
      title: t("lesson.reportingScams"),
      description: t("lesson.reportingScamsDesc"),
      duration: "8 " + t("lesson.duration"),
      completed: false,
    },
  ];
  
  const completedCount = lessons.filter(l => l.completed).length;
  const progressPercent = (completedCount / lessons.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-5xl mb-4">{t("education.title")}</h1>
      </div>

      {/* Introduction */}
      <Card className="mb-12 bg-gradient-to-r from-blue-100 to-blue-50 border-4 border-blue-300">
        <CardContent className="pt-10 pb-10 text-center">
          <p className="text-4xl mb-8 text-gray-900">{t("education.introduction")}</p>
          <Link to="/education/what-are-phishing-scams">
            <Button
              size="lg"
              className="text-3xl px-20 py-12 h-auto rounded-xl shadow-xl bg-blue-600 hover:bg-blue-700 text-white border-4 border-blue-800"
            >
              {t("education.startHere")}
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Lessons Section */}
      <div className="mb-8">
        <h2 className="text-4xl">{t("education.lessonsTitle")}</h2>
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/education/${lesson.id}`}
            className="block"
          >
            <Card className={`h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${
              lesson.completed
                ? 'border-4 border-green-600 bg-green-50'
                : 'border-2 border-gray-200'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <BookOpen className="h-12 w-12 text-blue-600" />
                  </div>
                  {lesson.completed && (
                    <div className="bg-green-600 p-3 rounded-full">
                      <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl mb-3">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 text-xl leading-relaxed">{lesson.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-500">{lesson.duration}</span>
                  {lesson.completed && (
                    <span className="text-xl bg-green-600 text-white px-4 py-2 rounded-lg">
                      ✓ {t("lesson.done")}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="mt-12 bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-3xl mb-6">{t("education.safetyTips")}</CardTitle>

          {/* Golden Rule Banner */}
          <div className="bg-yellow-400 border-4 border-yellow-600 rounded-xl p-6">
            <p className="text-2xl text-gray-900 text-center leading-relaxed">
              <strong className="text-3xl">{t("education.goldenRule")}</strong><br />
              {t("education.goldenRuleText")}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Suspicious Email */}
            <div className="bg-white p-6 rounded-xl border-2 border-red-200 text-center">
              <div className="bg-red-100 p-4 rounded-lg inline-block mb-4">
                <span className="text-5xl">📧</span>
              </div>
              <h3 className="text-2xl mb-2">{t("education.suspiciousEmail")}</h3>
              <p className="text-xl">{t("tips.email.short")}</p>
            </div>

            {/* Suspicious Text Message */}
            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 text-center">
              <div className="bg-orange-100 p-4 rounded-lg inline-block mb-4">
                <span className="text-5xl">💬</span>
              </div>
              <h3 className="text-2xl mb-2">{t("education.suspiciousText")}</h3>
              <p className="text-xl">{t("tips.text.short")}</p>
            </div>

            {/* Suspicious Phone Call */}
            <div className="bg-white p-6 rounded-xl border-2 border-purple-200 text-center">
              <div className="bg-purple-100 p-4 rounded-lg inline-block mb-4">
                <span className="text-5xl">📞</span>
              </div>
              <h3 className="text-2xl mb-2">{t("education.suspiciousCall")}</h3>
              <p className="text-xl">{t("tips.call.short")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}