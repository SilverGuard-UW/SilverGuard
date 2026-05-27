import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { BookOpen, Trophy, TrendingUp, Target, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import { useAuth } from "../../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export function Dashboard() {
  const { t, language } = useAccessibility();
  const { user } = useAuth();
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [completedLessonsList, setCompletedLessonsList] = useState<string[]>([]);
  const [confidenceHistory, setConfidenceHistory] = useState<any[]>([]);
  const [averageConfidence, setAverageConfidence] = useState(0);
  const [expandedCard, setExpandedCard] = useState<"lessons" | "confidence" | null>(null);

  const totalLessons = 5;

  const allLessons = [
    { id: "what-are-phishing-scams", title: t("lesson.whatAreScams") },
    { id: "avoiding-phishing-scams", title: t("lesson.avoidingScams") },
    { id: "email-phishing", title: t("lesson.emailScams") },
    { id: "phone-scams", title: t("lesson.phoneScams") },
    { id: "social-media-scams", title: t("lesson.socialMedia") },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Subscribe to real-time Firestore data
  useEffect(() => {
    if (!user) return;
    const userDoc = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userDoc, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const completed: string[] = data.completedLessons ?? [];
        const history: any[] = data.quizHistory ?? [];

        setCompletedLessonsList(completed);
        setLessonsCompleted(completed.length);
        setConfidenceHistory(history);

        if (history.length > 0) {
          const avg = history.reduce((sum: number, e: any) => sum + e.rating, 0) / history.length;
          setAverageConfidence(avg);
        } else {
          setAverageConfidence(0);
        }
      }
    });
    return unsubscribe;
  }, [user]);

  const lessonsRemaining = totalLessons - lessonsCompleted;
  const lessonsProgress = (lessonsCompleted / totalLessons) * 100;

  const allConfidenceData = confidenceHistory.map((entry: any, index: number) => ({
    name: `${t("dashboard.quiz")} ${index + 1}`,
    rating: entry.rating,
    score: Math.round((entry.score / entry.totalQuestions) * 100),
    date: new Date(entry.date).toLocaleDateString(language === "spanish" ? "es-ES" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  const trendSlice = confidenceHistory.slice(-5);
  const confidenceTrend = trendSlice.map((entry: any, index: number) => {
    const quizNumber = confidenceHistory.length - trendSlice.length + index + 1;
    return { name: `${t("dashboard.quiz")} ${quizNumber}`, rating: entry.rating };
  });

  const quizScores = confidenceHistory.map((entry: any, index: number) => ({
    name: `${t("dashboard.quiz")} ${index + 1}`,
    score: Math.round((entry.score / entry.totalQuestions) * 100),
    percentage: Math.round((entry.score / entry.totalQuestions) * 100),
  }));

  const hasCompletedQuizzes = confidenceHistory.length > 0;
  const latestQuizScore = hasCompletedQuizzes
    ? Math.round((confidenceHistory[confidenceHistory.length - 1].score / confidenceHistory[confidenceHistory.length - 1].totalQuestions) * 100)
    : 0;

  const toggleCard = (card: "lessons" | "confidence") => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-5xl mb-4">{t("dashboard.title")}</h1>
        {user && (
          <p className="text-2xl text-gray-500">
            {language === "spanish" ? "Bienvenido, " : "Welcome, "}
            <span className="font-semibold text-gray-700">{user.displayName ?? user.email}</span>
          </p>
        )}
        <p className="text-2xl text-gray-600 mt-2">
          {language === "spanish"
            ? "Rastrea tu progreso de aprendizaje y crecimiento de confianza"
            : "Track your learning progress and confidence growth"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => toggleCard("lessons")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl">{t("dashboard.lessonsDone")}</CardTitle>
            <div className="flex items-center gap-2">
              <BookOpen className="h-10 w-10 text-blue-600" />
              {expandedCard === "lessons" ? <ChevronUp className="h-8 w-8 text-blue-600" /> : <ChevronDown className="h-8 w-8 text-blue-600" />}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-6xl mb-4">{lessonsCompleted}/{totalLessons}</div>
            <Progress value={lessonsProgress} className="mt-3 h-5 mb-3" />
            {lessonsRemaining > 0 ? (
              <p className="text-xl text-gray-700">{lessonsRemaining} {t("dashboard.left")}</p>
            ) : (
              <p className="text-xl text-green-700 font-semibold">
                {language === "spanish" ? "¡Todas las lecciones completadas!" : "All lessons complete!"}
              </p>
            )}
            <p className="text-lg text-blue-600 mt-4">
              {language === "spanish" ? "Haz clic para ver detalles" : "Click to view details"}
            </p>
          </CardContent>
        </Card>

        {hasCompletedQuizzes ? (
          <Card
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => toggleCard("confidence")}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl">{t("dashboard.confidenceLevel")}</CardTitle>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-10 w-10 text-green-600" />
                {expandedCard === "confidence" ? <ChevronUp className="h-8 w-8 text-green-600" /> : <ChevronDown className="h-8 w-8 text-green-600" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl mb-4">{averageConfidence.toFixed(1)}/5</div>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-4xl ${star <= Math.round(averageConfidence) ? "text-yellow-400" : "text-gray-300"}`}>⭐</span>
                ))}
              </div>
              <p className="text-xl text-gray-700">
                {language === "spanish"
                  ? `Basado en ${confidenceHistory.length} ${confidenceHistory.length === 1 ? "cuestionario" : "cuestionarios"}`
                  : `Based on ${confidenceHistory.length} ${confidenceHistory.length === 1 ? "quiz" : "quizzes"}`}
              </p>
              <p className="text-lg text-green-600 mt-4">
                {language === "spanish" ? "Haz clic para ver historial" : "Click to view history"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl">{t("dashboard.confidenceLevel")}</CardTitle>
              <TrendingUp className="h-10 w-10 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl text-gray-400 mb-4">
                {language === "spanish" ? "Sin cuestionarios aún" : "No quizzes yet"}
              </div>
              <Link to="/simulator">
                <Button size="lg" className="text-xl h-auto py-4 px-6 rounded-xl mt-2">
                  {language === "spanish" ? "Comenzar Cuestionario" : "Take a Quiz"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Expanded: Lessons detail */}
      {expandedCard === "lessons" && (
        <Card className="mb-12 border-blue-200 border-2">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-700">
              {language === "spanish" ? "Detalle de Lecciones" : "Lessons Detail"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allLessons.map((lesson) => {
                const isDone = completedLessonsList.includes(lesson.id);
                return (
                  <div key={lesson.id} className={`flex items-center gap-6 p-5 rounded-xl border-2 ${isDone ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"}`}>
                    <div className={`p-3 rounded-full ${isDone ? "bg-green-600" : "bg-gray-300"}`}>
                      <CheckCircle2 className={`h-8 w-8 ${isDone ? "text-white" : "text-gray-500"}`} />
                    </div>
                    <p className="text-2xl flex-1">{lesson.title}</p>
                    {isDone ? (
                      <span className="text-xl bg-green-600 text-white px-4 py-2 rounded-lg">
                        ✓ {language === "spanish" ? "Completado" : "Done"}
                      </span>
                    ) : (
                      <Link to={`/education/${lesson.id}`}>
                        <Button size="lg" variant="outline" className="text-xl h-auto py-3 px-6">
                          {language === "spanish" ? "Comenzar" : "Start"}
                        </Button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expanded: Quiz history */}
      {expandedCard === "confidence" && hasCompletedQuizzes && (
        <Card className="mb-12 border-green-200 border-2">
          <CardHeader>
            <CardTitle className="text-3xl text-green-700">
              {language === "spanish" ? "Historial de Cuestionarios" : "Quiz History"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allConfidenceData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-white rounded-xl border-2 border-gray-200">
                  <div>
                    <p className="text-2xl font-semibold">{entry.name}</p>
                    <p className="text-xl text-gray-500">{entry.date}</p>
                  </div>
                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-xl text-gray-600">{language === "spanish" ? "Puntaje" : "Score"}</p>
                      <p className="text-3xl font-bold text-blue-700">{entry.score}%</p>
                    </div>
                    <div>
                      <p className="text-xl text-gray-600">{language === "spanish" ? "Confianza" : "Confidence"}</p>
                      <p className="text-3xl font-bold text-green-700">{entry.rating}/5</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts — only when not expanded */}
      {hasCompletedQuizzes && !expandedCard && (
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-2">{t("dashboard.confidenceTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={confidenceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontSize: "16px" }} />
                  <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} style={{ fontSize: "16px" }} />
                  <Tooltip contentStyle={{ fontSize: "18px" }} />
                  <Line type="monotone" dataKey="rating" stroke="#10b981" strokeWidth={4} dot={{ r: 8, fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-2">{t("dashboard.quizScores")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontSize: "16px" }} />
                  <YAxis domain={[0, 100]} style={{ fontSize: "16px" }} />
                  <Tooltip
                    contentStyle={{ fontSize: "18px" }}
                    formatter={(value: number) => [`${value}%`, language === "spanish" ? "Puntaje" : "Score"]}
                  />
                  <Bar dataKey="percentage" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Latest result */}
      {hasCompletedQuizzes && !expandedCard && (
        <Card className="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-3xl">
              {language === "spanish" ? "Último Resultado del Cuestionario" : "Latest Quiz Result"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
                <div>
                  <div className="text-5xl font-bold text-purple-700">{latestQuizScore}%</div>
                  <p className="text-xl text-gray-600">{language === "spanish" ? "Puntaje" : "Score"}</p>
                </div>
              </div>
              <div className="h-16 w-px bg-gray-300"></div>
              <div className="flex items-center gap-4">
                <TrendingUp className="h-16 w-16 text-green-500" />
                <div>
                  <div className="text-5xl font-bold text-green-700">{averageConfidence.toFixed(1)}/5</div>
                  <p className="text-xl text-gray-600">{language === "spanish" ? "Confianza" : "Confidence"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {!expandedCard && (
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t("dashboard.nextSteps")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {lessonsRemaining > 0 ? (
              <div className="flex items-start gap-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 text-3xl">1</div>
                <div className="flex-1">
                  <p className="text-2xl mb-3">{t("dashboard.finishLessons")}</p>
                  <p className="text-xl text-gray-600">{lessonsRemaining} {language === "spanish" ? "lecciones restantes" : "lessons remaining"}</p>
                  <Link to="/education" className="mt-4 inline-block">
                    <Button size="lg" className="text-xl h-auto py-4 px-8 rounded-xl">
                      {language === "spanish" ? "Continuar Aprendiendo" : "Continue Learning"}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-6 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 text-3xl">✓</div>
                <div>
                  <p className="text-2xl mb-2 text-green-800">
                    {language === "spanish" ? "¡Todas las lecciones completadas!" : "All lessons completed!"}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-6 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 text-3xl">2</div>
              <div className="flex-1">
                <p className="text-2xl mb-3">{t("dashboard.takeQuiz")}</p>
                <p className="text-xl text-gray-600 mb-4">
                  {language === "spanish" ? "Prueba tu conocimiento y construye tu confianza" : "Test your knowledge and build your confidence"}
                </p>
                <Link to="/simulator">
                  <Button size="lg" className="text-2xl h-auto py-6 px-8 rounded-xl shadow-md">
                    <Target className="h-7 w-7 mr-3" />
                    {t("dashboard.startQuiz")}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
