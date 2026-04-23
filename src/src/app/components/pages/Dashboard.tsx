import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { BookOpen, Trophy, TrendingUp, Target, ChevronDown, ChevronUp, CheckCircle2, Clock, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export function Dashboard() {
  const { t, language } = useAccessibility();
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [completedLessonsList, setCompletedLessonsList] = useState<string[]>([]);
  const [confidenceHistory, setConfidenceHistory] = useState<any[]>([]);
  const [averageConfidence, setAverageConfidence] = useState(0);
  const [expandedCard, setExpandedCard] = useState<'lessons' | 'confidence' | null>(null);

  const totalLessons = 6; // Total number of lessons available

  // List of all lessons
  const allLessons = [
    { id: "what-are-phishing-scams", title: t("lesson.whatAreScams"), hasContent: true },
    { id: "avoiding-phishing-scams", title: t("lesson.avoidingScams"), hasContent: true },
    { id: "email-phishing", title: t("lesson.emailScams"), hasContent: true },
    { id: "phone-scams", title: t("lesson.phoneScams"), hasContent: false },
    { id: "social-media-scams", title: t("lesson.socialMedia"), hasContent: false },
    { id: "reporting-scams", title: t("lesson.reportingScams"), hasContent: false },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Load completed lessons from localStorage
    const completed = JSON.parse(localStorage.getItem('silverguard-lessons-completed') || '[]');
    setLessonsCompleted(completed.length);
    setCompletedLessonsList(completed);

    // Load confidence/quiz history from localStorage
    const history = JSON.parse(localStorage.getItem('silverguard-confidence') || '[]');
    setConfidenceHistory(history);

    // Calculate average confidence
    if (history.length > 0) {
      const avgConf = history.reduce((sum: number, entry: any) => sum + entry.rating, 0) / history.length;
      setAverageConfidence(avgConf);
    }
  }, []);

  const lessonsRemaining = totalLessons - lessonsCompleted;
  const lessonsProgress = (lessonsCompleted / totalLessons) * 100;

  // Get confidence ratings for all quizzes (for expanded view)
  const allConfidenceData = confidenceHistory.map((entry: any, index: number) => {
    return {
      name: `${t("dashboard.quiz")} ${index + 1}`,
      rating: entry.rating,
      score: Math.round((entry.score / entry.totalQuestions) * 100),
      date: new Date(entry.date).toLocaleDateString(language === "spanish" ? "es-ES" : "en-US", { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
    };
  });

  // Get last 5 confidence ratings for trend
  const confidenceTrend = confidenceHistory.slice(-5).map((entry: any, index: number) => {
    const absoluteIndex = confidenceHistory.length - 5 + index;
    const quizNumber = absoluteIndex >= 0 ? absoluteIndex + 1 : index + 1;
    return {
      name: `${t("dashboard.quiz")} ${quizNumber}`,
      rating: entry.rating,
    };
  });

  // Quiz scores - only show if quizzes have been completed
  const quizScores = confidenceHistory.map((entry: any, index: number) => ({
    name: `${t("dashboard.quiz")} ${index + 1}`,
    score: Math.round((entry.score / entry.totalQuestions) * 100),
    percentage: Math.round((entry.score / entry.totalQuestions) * 100),
  }));

  const hasCompletedQuizzes = confidenceHistory.length > 0;
  const latestQuizScore = hasCompletedQuizzes 
    ? Math.round((confidenceHistory[confidenceHistory.length - 1].score / confidenceHistory[confidenceHistory.length - 1].totalQuestions) * 100)
    : 0;

  const toggleCard = (card: 'lessons' | 'confidence') => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-5xl mb-4">{t("dashboard.title")}</h1>
        <p className="text-2xl text-gray-600">
          {language === "spanish" 
            ? "Rastrea tu progreso de aprendizaje y crecimiento de confianza" 
            : "Track your learning progress and confidence growth"}
        </p>
      </div>

      {/* Stats Grid - Now Clickable */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card 
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => toggleCard('lessons')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl">{t("dashboard.lessonsDone")}</CardTitle>
            <div className="flex items-center gap-2">
              <BookOpen className="h-10 w-10 text-blue-600" />
              {expandedCard === 'lessons' ? (
                <ChevronUp className="h-8 w-8 text-blue-600" />
              ) : (
                <ChevronDown className="h-8 w-8 text-blue-600" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-6xl mb-4">{lessonsCompleted}/{totalLessons}</div>
            <Progress value={lessonsProgress} className="mt-3 h-5 mb-3" />
            {lessonsRemaining > 0 && (
              <p className="text-xl text-gray-700">
                {lessonsRemaining} {t("dashboard.left")}
              </p>
            )}
            {lessonsRemaining === 0 && (
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
            onClick={() => toggleCard('confidence')}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl">{t("dashboard.confidenceLevel")}</CardTitle>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-10 w-10 text-green-600" />
                {expandedCard === 'confidence' ? (
                  <ChevronUp className="h-8 w-8 text-green-600" />
                ) : (
                  <ChevronDown className="h-8 w-8 text-green-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl mb-4">{averageConfidence.toFixed(1)}/5</div>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`text-4xl ${star <= Math.round(averageConfidence) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-xl text-gray-700">
                {language === "spanish" 
                  ? `Basado en ${confidenceHistory.length} ${confidenceHistory.length === 1 ? 'cuestionario' : 'cuestionarios'}` 
                  : `Based on ${confidenceHistory.length} ${confidenceHistory.length === 1 ? 'quiz' : 'quizzes'}`}
              </p>
              <p className="text-lg text-green-600 mt-4">
                {language === "spanish" ? "Haz clic para ver detalles" : "Click to view details"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-2xl">{t("dashboard.confidenceLevel")}</CardTitle>
              <Target className="h-10 w-10 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-6xl mb-4">—</div>
              <p className="text-xl text-gray-700">
                {language === "spanish" 
                  ? "Completa un cuestionario para medir tu confianza" 
                  : "Complete a quiz to measure your confidence"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Expanded Lessons Detail */}
      {expandedCard === 'lessons' && (
        <Card className="mb-12 border-blue-300 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl">
                {language === "spanish" ? "Detalles de Lecciones" : "Lesson Details"}
              </CardTitle>
              <button onClick={() => setExpandedCard(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-8 w-8 text-gray-600" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">
                {language === "spanish" ? "Lecciones Completadas" : "Completed Lessons"}
              </h3>
              {allLessons.map((lesson) => {
                const isCompleted = completedLessonsList.includes(lesson.id);
                return (
                  <div 
                    key={lesson.id} 
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                      isCompleted 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                    ) : (
                      <Clock className="h-8 w-8 text-gray-400 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-2xl">
                        {lesson.title}
                      </p>
                      {!lesson.hasContent && (
                        <p className="text-lg text-gray-500 italic mt-1">
                          {language === "spanish" ? "Lección no creada aún" : "Lesson not created yet"}
                        </p>
                      )}
                    </div>
                    <span className={`text-xl font-semibold ${
                      isCompleted ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {isCompleted 
                        ? (language === "spanish" ? "Completada" : "Completed")
                        : (language === "spanish" ? "No completada" : "Not completed")
                      }
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expanded Confidence Detail */}
      {expandedCard === 'confidence' && hasCompletedQuizzes && (
        <Card className="mb-12 border-green-300 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl">
                {language === "spanish" ? "Historia de Confianza" : "Confidence History"}
              </CardTitle>
              <button onClick={() => setExpandedCard(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-8 w-8 text-gray-600" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Graph */}
            <div className="mb-8">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={allConfidenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontSize: '16px' }} />
                  <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} style={{ fontSize: '16px' }} />
                  <Tooltip 
                    contentStyle={{ fontSize: '18px' }}
                    formatter={(value: number, name: string) => {
                      if (name === 'rating') {
                        return [value, language === "spanish" ? "Confianza" : "Confidence"];
                      }
                      return [value, name];
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    dot={{ r: 8, fill: "#10b981", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">
                {language === "spanish" ? "Calificaciones de Confianza" : "Confidence Ratings"}
              </h3>
              {allConfidenceData.map((entry, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border-2 bg-gradient-to-r from-green-50 to-blue-50 border-green-300"
                >
                  <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-2xl font-semibold">{entry.name}</p>
                      <p className="text-lg text-gray-600">{entry.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xl text-gray-600">
                        {language === "spanish" ? "Puntaje" : "Score"}
                      </p>
                      <p className="text-3xl font-bold text-blue-700">{entry.score}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl text-gray-600">
                        {language === "spanish" ? "Confianza" : "Confidence"}
                      </p>
                      <p className="text-3xl font-bold text-green-700">{entry.rating}/5</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Section - Only show if user has completed quizzes and not expanded */}
      {hasCompletedQuizzes && !expandedCard && (
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Confidence Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-2">{t("dashboard.confidenceTrend")}</CardTitle>
              <p className="text-xl text-gray-600">
                {language === "spanish" 
                  ? "Tu confianza está creciendo con cada cuestionario" 
                  : "Your confidence is growing with each quiz"}
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={confidenceTrend} key={`confidence-chart-${confidenceTrend.length}`}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontSize: '16px' }} />
                  <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} style={{ fontSize: '16px' }} />
                  <Tooltip contentStyle={{ fontSize: '18px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    dot={{ r: 8, fill: "#10b981", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quiz Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-2">{t("dashboard.quizScores")}</CardTitle>
              <p className="text-xl text-gray-600">
                {language === "spanish" 
                  ? "Tu habilidad para identificar estafas está mejorando" 
                  : "Your ability to identify scams is improving"}
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontSize: '16px' }} />
                  <YAxis domain={[0, 100]} style={{ fontSize: '16px' }} />
                  <Tooltip 
                    contentStyle={{ fontSize: '18px' }}
                    formatter={(value: number) => [`${value}%`, language === "spanish" ? "Puntaje" : "Score"]}
                  />
                  <Bar dataKey="percentage" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Latest Results - Only show if quizzes completed and not expanded */}
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

      {/* Next Steps - Only show when not expanded */}
      {!expandedCard && (
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t("dashboard.nextSteps")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {lessonsRemaining > 0 ? (
              <div className="flex items-start gap-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 text-3xl">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-2xl mb-3">{t("dashboard.finishLessons")}</p>
                  <p className="text-xl text-gray-600">
                    {lessonsRemaining} {language === "spanish" ? "lecciones restantes" : "lessons remaining"}
                  </p>
                  <Link to="/education" className="mt-4 inline-block">
                    <Button size="lg" className="text-xl h-auto py-4 px-8 rounded-xl">
                      {language === "spanish" ? "Continuar Aprendiendo" : "Continue Learning"}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-6 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 text-3xl">
                  ✓
                </div>
                <div>
                  <p className="text-2xl mb-2 text-green-800">
                    {language === "spanish" ? "¡Todas las lecciones completadas!" : "All lessons completed!"}
                  </p>
                  <p className="text-xl text-gray-600">
                    {language === "spanish" 
                      ? "¡Excelente trabajo! Has completado todas las lecciones." 
                      : "Great job! You've completed all the lessons."}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-6 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="bg-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 text-3xl">
                2
              </div>
              <div className="flex-1">
                <p className="text-2xl mb-3">{t("dashboard.takeQuiz")}</p>
                <p className="text-xl text-gray-600 mb-4">
                  {language === "spanish" 
                    ? "Prueba tu conocimiento y construye tu confianza" 
                    : "Test your knowledge and build your confidence"}
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
