import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { Button } from "../ui/button.tsx";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useAccessibility } from "../../contexts/AccessibilityContext.tsx";
import { useEffect } from "react";

const exampleData = [
  { month: "Jan", scams: 150 },
  { month: "Feb", scams: 180 },
  { month: "Mar", scams: 220 },
  { month: "Apr", scams: 190 },
  { month: "May", scams: 240 },
  { month: "Jun", scams: 280 },
];

const successRateData = [
  { year: "2020", rate: 45 },
  { year: "2021", rate: 52 },
  { year: "2022", rate: 61 },
  { year: "2023", rate: 68 },
  { year: "2024", rate: 74 },
  { year: "2025", rate: 81 },
];

const lessonOrder = [
  "what-are-phishing-scams",
  "avoiding-phishing-scams",
  "email-phishing",
  "phone-scams",
  "social-media-scams",
  "reporting-scams",
];

export function LessonPage() {
  const { lessonId } = useParams();
  const { t, language } = useAccessibility();

  // Scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  // Mark lesson as completed when viewed
  useEffect(() => {
    if (lessonId) {
      const completedLessons = JSON.parse(localStorage.getItem('silverguard-lessons-completed') || '[]');
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('silverguard-lessons-completed', JSON.stringify(completedLessons));
      }
    }
  }, [lessonId]);

  const currentIndex = lessonOrder.indexOf(lessonId as string);
  const nextLessonId = currentIndex >= 0 && currentIndex < lessonOrder.length - 1
    ? lessonOrder[currentIndex + 1]
    : null;

  const lessonContent: Record<string, any> = {
    "what-are-phishing-scams": {
      title: t("lessonContent.whatAreScams.title"),
      sections: [
        {
          heading: t("lessonContent.whatAreScams.section1.heading"),
          content: t("lessonContent.whatAreScams.section1.content"),
        },
        {
          heading: t("lessonContent.whatAreScams.section2.heading"),
          content: t("lessonContent.whatAreScams.section2.content"),
        },
        {
          heading: t("lessonContent.whatAreScams.section3.heading"),
          content: t("lessonContent.whatAreScams.section3.content"),
        },
      ],
      keyPoints: [
        t("lessonContent.whatAreScams.keyPoint1"),
        t("lessonContent.whatAreScams.keyPoint2"),
        t("lessonContent.whatAreScams.keyPoint3"),
      ],
      charts: true,
    },
    "avoiding-phishing-scams": {
      title: t("lessonContent.avoidingScams.title"),
      sections: [
        {
          heading: t("lessonContent.avoidingScams.section1.heading"),
          content: t("lessonContent.avoidingScams.section1.content"),
        },
        {
          heading: t("lessonContent.avoidingScams.section2.heading"),
          content: t("lessonContent.avoidingScams.section2.content"),
        },
        {
          heading: t("lessonContent.avoidingScams.section3.heading"),
          content: t("lessonContent.avoidingScams.section3.content"),
        },
      ],
      keyPoints: [
        t("lessonContent.avoidingScams.keyPoint1"),
        t("lessonContent.avoidingScams.keyPoint2"),
        t("lessonContent.avoidingScams.keyPoint3"),
      ],
      charts: true,
    },
    "email-phishing": {
      title: t("lessonContent.emailPhishing.title"),
      sections: [
        {
          heading: t("lessonContent.emailPhishing.section1.heading"),
          content: t("lessonContent.emailPhishing.section1.content"),
        },
        {
          heading: t("lessonContent.emailPhishing.section2.heading"),
          content: t("lessonContent.emailPhishing.section2.content"),
        },
        {
          heading: t("lessonContent.emailPhishing.section3.heading"),
          content: t("lessonContent.emailPhishing.section3.content"),
        },
      ],
      keyPoints: [
        t("lessonContent.emailPhishing.keyPoint1"),
        t("lessonContent.emailPhishing.keyPoint2"),
        t("lessonContent.emailPhishing.keyPoint3"),
      ],
      charts: false,
    },
  };

  const lesson = lessonContent[lessonId as string];

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/education">
          <Button variant="ghost" className="mb-6 text-2xl px-6 py-6 h-auto">
            <ArrowLeft className="h-7 w-7 mr-3" />
            {t("lessonPage.back")}
          </Button>
        </Link>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-4xl mb-4">
              {t("lessonPage.notFound")}
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              {language === "spanish" 
                ? "Esta lección aún no ha sido creada. ¡Vuelve pronto!" 
                : "This lesson has not been created yet. Check back soon!"}
            </p>
            <Link to="/education">
              <Button className="text-xl px-8 py-6 h-auto">{t("lessonPage.backToLessons")}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/education">
          <Button variant="ghost" className="mb-6 text-2xl px-6 py-6 h-auto">
            <ArrowLeft className="h-7 w-7 mr-3" />
            {t("lessonPage.back")}
          </Button>
        </Link>
        <h1 className="text-5xl mb-6">{lesson.title}</h1>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 mb-12">
        {lesson.sections.map((section: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-3xl mb-4">{section.heading}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl leading-relaxed text-gray-700">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      {lesson.charts && (
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("lessonContent.charts.scamsIncreasing")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={exampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" style={{ fontSize: '18px' }} />
                  <YAxis style={{ fontSize: '18px' }} />
                  <Tooltip contentStyle={{ fontSize: '20px' }} />
                  <Bar dataKey="scams" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("lessonContent.charts.peopleGettingSmarter")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={successRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" style={{ fontSize: '18px' }} />
                  <YAxis style={{ fontSize: '18px' }} />
                  <Tooltip contentStyle={{ fontSize: '20px' }} />
                  <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Key Points */}
      <Card className="bg-blue-50 border-blue-200 mb-8">
        <CardHeader>
          <CardTitle className="text-3xl text-center">{t("lessonPage.keyPoints")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {lesson.keyPoints.map((point: string, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl">
                  {index + 1}
                </div>
                <p className="text-2xl leading-relaxed pt-2">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completion Card */}
      <Card className="bg-green-50 border-green-200 border-4">
        <CardContent className="pt-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-green-600 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-white" strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-3xl mb-2">{t("lessonPage.complete")}</h3>
              <p className="text-2xl text-gray-600">{t("lessonPage.greatJob")}</p>
            </div>
          </div>
          <div className="space-y-6">
            {nextLessonId ? (
              <>
                <Link to={`/education/${nextLessonId}`}>
                  <Button
                    size="lg"
                    className="w-full text-3xl h-auto py-10 rounded-2xl shadow-2xl bg-blue-600 hover:bg-blue-700 text-white border-4 border-blue-800 transform transition-transform hover:scale-105"
                  >
                    <span className="mr-4">▶</span>
                    {t("lessonPage.nextLesson")}
                    <ArrowRight className="h-9 w-9 ml-4" strokeWidth={3} />
                  </Button>
                </Link>
                <div className="py-4 text-center">
                  <p className="text-2xl text-gray-600">{t("lessonPage.orYouCan")}</p>
                </div>
              </>
            ) : null}
            <Link to="/simulator">
              <Button
                size="lg"
                className="w-full text-3xl h-auto py-10 rounded-2xl shadow-2xl bg-orange-600 hover:bg-orange-700 text-white border-4 border-orange-800 transform transition-transform hover:scale-105"
              >
                <span className="mr-4">✓</span>
                {t("lessonPage.testYourself")}
              </Button>
            </Link>
            <div className="py-6"></div>
            <Link to="/education">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-2xl h-auto py-6 rounded-xl border-2 border-gray-400 hover:bg-gray-100"
              >
                <ArrowLeft className="h-7 w-7 mr-3" />
                {t("lessonPage.backToLessons")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}