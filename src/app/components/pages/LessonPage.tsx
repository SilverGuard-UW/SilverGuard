import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const lessonImages: Record<string, { src: string; portrait: boolean }> = {
  "email-phishing": { src: `${import.meta.env.BASE_URL}img/emailScam.PNG`, portrait: false },
  "phone-scams":    { src: `${import.meta.env.BASE_URL}img/phoneScam.PNG`,  portrait: true  },
  "social-media-scams": { src: `${import.meta.env.BASE_URL}img/socialScam.PNG`, portrait: true },
};

const lessonOrder = [
  "what-are-phishing-scams",
  "avoiding-phishing-scams",
  "email-phishing",
  "phone-scams",
  "social-media-scams",
];

export function LessonPage() {
  const { lessonId } = useParams();
  const { t, language } = useAccessibility();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  // Mark lesson as completed in Firestore
  useEffect(() => {
    if (lessonId && user) {
      const userDoc = doc(db, "users", user.uid);
      setDoc(
        userDoc,
        { completedLessons: arrayUnion(lessonId) },
        { merge: true }
      ).catch(console.error);
    }
  }, [lessonId, user]);

  const currentIndex = lessonOrder.indexOf(lessonId as string);
  const nextLessonId =
    currentIndex >= 0 && currentIndex < lessonOrder.length - 1
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
          list: [
            t("lessonContent.avoidingScams.section2.item1"),
            t("lessonContent.avoidingScams.section2.item2"),
            t("lessonContent.avoidingScams.section2.item3"),
            t("lessonContent.avoidingScams.section2.item4"),
            t("lessonContent.avoidingScams.section2.item5"),
          ],
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
    },
    "email-phishing": {
      title: t("lessonContent.emailPhishing.title"),
      imagePlaceholder: true,
      sections: [
        {
          heading: t("lessonContent.emailPhishing.section1.heading"),
          content: t("lessonContent.emailPhishing.section1.content"),
        },
        {
          heading: t("lessonContent.emailPhishing.section2.heading"),
          list: [
            t("lessonContent.emailPhishing.section2.item1"),
            t("lessonContent.emailPhishing.section2.item2"),
            t("lessonContent.emailPhishing.section2.item3"),
            t("lessonContent.emailPhishing.section2.item4"),
          ],
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
    },
    "phone-scams": {
      title: t("lessonContent.phoneScams.title"),
      imagePlaceholder: true,
      sections: [
        {
          heading: t("lessonContent.phoneScams.section1.heading"),
          content: t("lessonContent.phoneScams.section1.content"),
        },
        {
          heading: t("lessonContent.phoneScams.section2.heading"),
          list: [
            t("lessonContent.phoneScams.section2.item1"),
            t("lessonContent.phoneScams.section2.item2"),
            t("lessonContent.phoneScams.section2.item3"),
            t("lessonContent.phoneScams.section2.item4"),
          ],
        },
        {
          heading: t("lessonContent.phoneScams.section3.heading"),
          content: t("lessonContent.phoneScams.section3.content"),
        },
      ],
      keyPoints: [
        t("lessonContent.phoneScams.keyPoint1"),
        t("lessonContent.phoneScams.keyPoint2"),
        t("lessonContent.phoneScams.keyPoint3"),
      ],
    },
    "social-media-scams": {
      title: t("lessonContent.socialMediaScams.title"),
      imagePlaceholder: true,
      sections: [
        {
          heading: t("lessonContent.socialMediaScams.section1.heading"),
          content: t("lessonContent.socialMediaScams.section1.content"),
        },
        {
          heading: t("lessonContent.socialMediaScams.section2.heading"),
          list: [
            t("lessonContent.socialMediaScams.section2.item1"),
            t("lessonContent.socialMediaScams.section2.item2"),
            t("lessonContent.socialMediaScams.section2.item3"),
          ],
        },
        {
          heading: t("lessonContent.socialMediaScams.section3.heading"),
          content: t("lessonContent.socialMediaScams.section3.content"),
        },
      ],
      keyPoints: [
        t("lessonContent.socialMediaScams.keyPoint1"),
        t("lessonContent.socialMediaScams.keyPoint2"),
        t("lessonContent.socialMediaScams.keyPoint3"),
      ],
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
            <h2 className="text-4xl mb-4">{t("lessonPage.notFound")}</h2>
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
      <div className="mb-8">
        <Link to="/education">
          <Button variant="ghost" className="mb-6 text-2xl px-6 py-6 h-auto">
            <ArrowLeft className="h-7 w-7 mr-3" />
            {t("lessonPage.back")}
          </Button>
        </Link>
        <h1 className="text-5xl mb-6">{lesson.title}</h1>
      </div>

      <div className="space-y-8 mb-12">
        {lesson.sections.map((section: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-3xl mb-4">{section.heading}</CardTitle>
            </CardHeader>
            <CardContent>
              {section.list ? (
                <ul className="space-y-3">
                  {section.list.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-2xl leading-tight mt-0.5">•</span>
                      <span className="text-2xl leading-relaxed text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-2xl leading-relaxed text-gray-700">{section.content}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {lesson.imagePlaceholder && lessonImages[lessonId as string] && (
        <div className="mb-12">
          <Card className="border-4 border-red-400 bg-red-50 mb-4">
            <CardContent className="py-5 px-6 flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-2xl font-bold text-red-700 mb-1">{t("lessonPage.scamExampleLabel")}</p>
                <p className="text-xl text-red-800">{t("lessonPage.scamExampleWarning")}</p>
              </div>
            </CardContent>
          </Card>
          <div className={lessonImages[lessonId as string].portrait ? "flex justify-center" : ""}>
            <img
              src={lessonImages[lessonId as string].src}
              alt={t("lessonPage.scamExampleLabel")}
              className={`rounded-xl border-2 border-gray-300 shadow-md ${
                lessonImages[lessonId as string].portrait
                  ? "max-h-[560px] w-auto"
                  : "w-full"
              }`}
            />
          </div>
        </div>
      )}

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
                  <Button size="lg" className="w-full text-3xl h-auto py-10 rounded-2xl shadow-2xl bg-blue-600 hover:bg-blue-700 text-white border-4 border-blue-800 transform transition-transform hover:scale-105">
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
              <Button size="lg" className="w-full text-3xl h-auto py-10 rounded-2xl shadow-2xl bg-orange-600 hover:bg-orange-700 text-white border-4 border-orange-800 transform transition-transform hover:scale-105">
                <span className="mr-4">✓</span>
                {t("lessonPage.testYourself")}
              </Button>
            </Link>
            <div className="py-6"></div>
            <Link to="/education">
              <Button variant="outline" size="lg" className="w-full text-2xl h-auto py-6 rounded-xl border-2 border-gray-400 hover:bg-gray-100">
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
