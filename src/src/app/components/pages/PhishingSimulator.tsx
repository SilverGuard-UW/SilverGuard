import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { AlertTriangle, CheckCircle, XCircle, Mail, MessageSquare, Phone, Smartphone } from "lucide-react";
import { Progress } from "../ui/progress";
import { Volume2 } from "lucide-react";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export function PhishingSimulator() {
  const { t, language } = useAccessibility();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState<number | null>(null);
  const [showConfidenceScreen, setShowConfidenceScreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scenarios = [
    {
      id: 1,
      type: "email",
      title: language === "spanish" ? "Alerta de Seguridad Bancaria" : "Bank Security Alert",
      from: "security@paypa1-alerts.com",
      subject: language === "spanish" ? "URGENTE: ¡Verifique su cuenta ahora!" : "URGENT: Verify your account now!",
      message: language === "spanish" 
        ? "Estimado Cliente,\n\nDetectamos actividad sospechosa en su cuenta. Haga clic aquí inmediatamente para verificar su identidad o su cuenta será suspendida en 24 horas.\n\nHaga clic en este enlace ahora: http://paypal-verify-account.xyz/login\n\nGracias,\nEquipo de Seguridad de PayPal"
        : "Dear Customer,\n\nWe detected suspicious activity on your account. Click here immediately to verify your identity or your account will be suspended within 24 hours.\n\nClick this link now: http://paypal-verify-account.xyz/login\n\nThank you,\nPayPal Security Team",
      isScam: true,
      explanation: language === "spanish"
        ? "¡Esto es una ESTAFA! El correo electrónico usa '1' en lugar de 'l', crea urgencia falsa, tiene un enlace sospechoso y usa un saludo genérico."
        : "This is a SCAM! The email address uses '1' instead of 'l', creates false urgency, has a suspicious link, and uses a generic greeting.",
    },
    {
      id: 2,
      type: "sms",
      title: language === "spanish" ? "Entrega de Paquete" : "Package Delivery",
      from: "+1 (555) 0123",
      subject: language === "spanish" ? "Entrega de paquete" : "Package delivery",
      message: language === "spanish"
        ? "USPS: Su paquete está esperando. Intentamos entregar. Haga clic para reprogramar: bit.ly/pkg-3x9f2\n\nConfirme su dirección y pague $2.99 tarifa de reentrega."
        : "USPS: Your package is waiting. We attempted delivery. Click to reschedule: bit.ly/pkg-3x9f2\n\nConfirm your address and pay $2.99 redelivery fee.",
      isScam: true,
      explanation: language === "spanish"
        ? "¡Esto es una ESTAFA! USPS no envía mensajes de texto con enlaces acortados ni pide tarifas de entrega de esta manera. Siempre use el seguimiento oficial en su sitio web."
        : "This is a SCAM! USPS doesn't send texts with shortened links or ask for delivery fees this way. Always use official tracking on their website.",
    },
    {
      id: 3,
      type: "email",
      title: language === "spanish" ? "Estado de Cuenta Mensual" : "Monthly Statement",
      from: "statements@chase.com",
      subject: language === "spanish" ? "Su estado de cuenta de febrero 2026 está listo" : "Your February 2026 statement is ready",
      message: language === "spanish"
        ? "Hola John Smith,\n\nSu estado de cuenta de tarjeta de crédito Chase para febrero 2026 ya está disponible. Inicie sesión en su cuenta en chase.com para ver su estado de cuenta.\n\nSi tiene preguntas, llámenos al 1-800-935-9935.\n\nGracias,\nServicio al Cliente de Chase"
        : "Hello John Smith,\n\nYour Chase credit card statement for February 2026 is now available. Sign in to your account at chase.com to view your statement.\n\nIf you have questions, call us at 1-800-935-9935.\n\nThank you,\nChase Customer Service",
      isScam: false,
      explanation: language === "spanish"
        ? "¡Esto es SEGURO! Dominio de correo legítimo, saludo personalizado, sin enlaces directos de inicio de sesión, proporciona número de teléfono oficial y sin urgencia o amenazas."
        : "This is SAFE! Legitimate email domain, personalized greeting, no direct login links, provides official phone number, and no urgency or threats.",
    },
    {
      id: 4,
      type: "phone",
      title: language === "spanish" ? "Llamada del IRS sobre Impuestos" : "IRS Tax Call",
      from: language === "spanish" ? "Llamada Desconocida" : "Unknown Caller",
      subject: language === "spanish" ? "Llamada Telefónica" : "Phone Call",
      message: language === "spanish"
        ? "Este es el IRS llamando sobre una investigación fiscal seria. Hay una orden de arresto contra usted debido a impuestos no pagados. Debe llamarnos inmediatamente al 1-888-555-SCAM o se enviarán oficiales a su dirección. ¡Esta es su última advertencia!"
        : "This is the IRS calling about a serious tax investigation. There is a warrant out for your arrest due to unpaid taxes. You must call us back immediately at 1-888-555-SCAM or officers will be dispatched to your address. This is your final warning!",
      isScam: true,
      explanation: language === "spanish"
        ? "¡Esto es una ESTAFA! El IRS nunca llama sobre arrestos u órdenes. Crean miedo y urgencia. El IRS real siempre lo contacta por correo primero."
        : "This is a SCAM! The IRS never calls about arrests or warrants. They create fear and urgency. Real IRS always contacts you by mail first.",
    },
    {
      id: 5,
      type: "email",
      title: language === "spanish" ? "¡Ganaste un Premio!" : "You Won a Prize!",
      from: "winner@prizes-dept.net",
      subject: language === "spanish" ? "¡Felicidades! ¡Has ganado $5,000!" : "Congratulations! You've won $5,000!",
      message: language === "spanish"
        ? "¡¡¡FELICIDADES!!!\n\n¡Has sido seleccionado al azar para recibir $5,000! Para reclamar tu premio, haz clic aquí e ingresa los detalles de tu cuenta bancaria.\n\n¡Esta oferta expira en 48 horas!\n\nReclama ahora: http://claim-prize-now.biz/winner"
        : "CONGRATULATIONS!!!\n\nYou have been randomly selected to receive $5,000! To claim your prize, click here and enter your bank account details.\n\nThis offer expires in 48 hours!\n\nClaim now: http://claim-prize-now.biz/winner",
      isScam: true,
      explanation: language === "spanish"
        ? "¡Esto es una ESTAFA! No participaste en un concurso, solicita detalles bancarios, tiene un dominio sospechoso, crea urgencia y es demasiado bueno para ser verdad."
        : "This is a SCAM! You didn't enter a contest, it requests bank details, has a suspicious domain, creates urgency, and it's too good to be true.",
    },
  ];

  const scenario = scenarios[currentScenario];
  const progress = ((currentScenario + 1) / scenarios.length) * 100;

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === scenario.isScam) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowConfidenceScreen(true);
    }
  };

  const handleConfidenceSubmit = () => {
    if (confidenceRating !== null) {
      // Save confidence rating to localStorage
      const confidenceHistory = JSON.parse(localStorage.getItem('silverguard-confidence') || '[]');
      confidenceHistory.push({
        rating: confidenceRating,
        score: score,
        totalQuestions: scenarios.length,
        date: new Date().toISOString(),
      });
      localStorage.setItem('silverguard-confidence', JSON.stringify(confidenceHistory));
      
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setCompleted(false);
    setConfidenceRating(null);
    setShowConfidenceScreen(false);
  };

  const getIcon = () => {
    switch (scenario.type) {
      case "email":
        return <Mail className="h-12 w-12 text-blue-600" />;
      case "sms":
        return <MessageSquare className="h-12 w-12 text-green-600" />;
      case "phone":
        return <Phone className="h-12 w-12 text-purple-600" />;
      default:
        return <Smartphone className="h-12 w-12 text-gray-600" />;
    }
  };

  if (completed) {
    const percentage = (score / scenarios.length) * 100;
    const passed = percentage >= 60;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className={`${passed ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
          <CardHeader>
            <div className="flex items-center gap-6 mb-6">
              {passed ? (
                <CheckCircle className="h-20 w-20 text-green-600" />
              ) : (
                <AlertTriangle className="h-20 w-20 text-yellow-600" />
              )}
              <div>
                <CardTitle className="text-5xl">
                  {passed ? t("simulator.great") : t("simulator.goodTry")}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="text-6xl mb-4">
                {score} / {scenarios.length}
              </div>
              <Progress value={percentage} className="h-6" />
            </div>

            <div className="space-y-6 mb-8">
              {passed ? (
                <>
                  <p className="text-2xl leading-relaxed">
                    {t("simulator.excellentSpotting")}
                  </p>
                  <div className="bg-white p-6 rounded-lg border border-green-200">
                    <h4 className="text-2xl mb-4">{t("simulator.remember")}</h4>
                    <ul className="space-y-4 text-xl">
                      <li>• {t("simulator.verifySenders")}</li>
                      <li>• {t("simulator.watchUrgent")}</li>
                      <li>• {t("simulator.neverShare")}</li>
                      <li>• {t("simulator.callDirect")}</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-2xl leading-relaxed">
                    {t("simulator.keepLearning")}
                  </p>
                  <div className="bg-white p-6 rounded-lg border border-yellow-200">
                    <h4 className="text-2xl mb-4">{t("simulator.tips")}</h4>
                    <ul className="space-y-4 text-xl">
                      <li>• {t("simulator.readCarefully")}</li>
                      <li>• {t("simulator.checkEmails")}</li>
                      <li>• {t("simulator.lookSpelling")}</li>
                      <li>• {t("simulator.questionUrgent")}</li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-6">
              <Button size="lg" onClick={handleRestart} className="w-full text-3xl h-auto py-10 rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700 text-white border-4 border-blue-800">
                {t("simulator.retakeQuiz")}
              </Button>
              <Button size="lg" onClick={() => window.location.href = "/education"} className="w-full text-3xl h-auto py-10 rounded-xl shadow-lg bg-green-600 hover:bg-green-700 text-white border-4 border-green-800">
                {t("simulator.keepLearning")}
              </Button>
              <Button size="lg" onClick={() => window.location.href = "/dashboard"} className="w-full text-3xl h-auto py-10 rounded-xl shadow-lg bg-purple-600 hover:bg-purple-700 text-white border-4 border-purple-800">
                {t("simulator.trackProgress")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show confidence rating screen after quiz
  if (showConfidenceScreen) {
    const confidenceLevels = [
      { value: 1, label: t("simulator.notConfident"), emoji: "😰", color: "bg-red-50 border-red-300 hover:bg-red-100" },
      { value: 2, label: t("simulator.somewhatConfident"), emoji: "😟", color: "bg-orange-50 border-orange-300 hover:bg-orange-100" },
      { value: 3, label: t("simulator.confident"), emoji: "😊", color: "bg-yellow-50 border-yellow-300 hover:bg-yellow-100" },
      { value: 4, label: t("simulator.veryConfident"), emoji: "😄", color: "bg-green-50 border-green-300 hover:bg-green-100" },
      { value: 5, label: t("simulator.expertConfident"), emoji: "🏆", color: "bg-blue-50 border-blue-300 hover:bg-blue-100" },
    ];

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-5xl text-center mb-4">{t("simulator.confidenceTitle")}</CardTitle>
            <p className="text-2xl text-center text-gray-700">{t("simulator.confidenceSubtitle")}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-8">
              {confidenceLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setConfidenceRating(level.value)}
                  className={`w-full p-8 rounded-xl border-4 transition-all ${level.color} ${
                    confidenceRating === level.value
                      ? "ring-4 ring-blue-400 scale-105"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">{level.emoji}</div>
                    <div className="flex-1 text-left">
                      <div className="text-3xl font-semibold">{level.label}</div>
                    </div>
                    {confidenceRating === level.value && (
                      <CheckCircle className="h-12 w-12 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <Button
              size="lg"
              onClick={handleConfidenceSubmit}
              disabled={confidenceRating === null}
              className="w-full text-3xl h-auto py-10 rounded-xl shadow-lg"
            >
              {t("simulator.submitConfidence")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render iMessage-style UI for SMS
  const renderSMS = () => (
    <div className="max-w-sm mx-auto">
      {/* iPhone Frame */}
      <div className="bg-black rounded-[3.5rem] p-3 shadow-2xl">
        <div className="bg-white rounded-[3rem] overflow-hidden">
          {/* Status Bar */}
          <div className="bg-gray-50 px-6 pt-3 pb-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="flex gap-[1px]">
                  <div className="w-[3px] h-2 bg-black rounded-sm"></div>
                  <div className="w-[3px] h-2.5 bg-black rounded-sm"></div>
                  <div className="w-[3px] h-3 bg-black rounded-sm"></div>
                  <div className="w-[3px] h-3.5 bg-black rounded-sm"></div>
                </div>
                <span className="ml-1 text-xs">4G</span>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium">
                2:26 PM
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs">32%</span>
                <div className="w-5 h-2.5 border border-black rounded-sm flex items-center px-[1px]">
                  <div className="w-1/3 h-full bg-black rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* iMessage Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="text-blue-500 text-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <button className="text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <div className="text-center mt-2">
              <div className={`text-xs ${showFeedback && scenario.isScam ? 'bg-red-100 border-2 border-red-500 rounded px-2 py-1 inline-block' : 'text-gray-500'}`}>
                {scenario.from.includes('@') ? scenario.from.substring(0, 8) + '****' + scenario.from.substring(scenario.from.indexOf('@')) : scenario.from}
                {showFeedback && scenario.isScam && (
                  <span className="block text-red-700 font-bold mt-1">⚠️ {language === "spanish" ? "Número Desconocido" : "Unknown Number"}</span>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="bg-white px-4 py-6 min-h-[500px]">
            <div className="space-y-3">
              {/* Timestamp */}
              <div className="text-center text-xs text-gray-500 mb-4">
                <div>iMessage</div>
                <div>Yesterday morning 9:18</div>
              </div>

              {/* Message bubbles */}
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className={`bg-gray-200 rounded-[18px] rounded-tl-sm px-4 py-3 ${showFeedback && scenario.isScam ? 'ring-4 ring-red-400' : ''}`}>
                    <p className="text-[15px] leading-[1.4]">
                      {scenario.message.split('\n').map((line, index) => {
                        // Highlight suspicious elements
                        const isSuspiciousUrl = line.includes('bit.ly') || line.includes('http');
                        const hasMoney = line.includes('$') || line.includes('fee');
                        
                        return (
                          <span key={index}>
                            {showFeedback && scenario.isScam ? (
                              <>
                                {isSuspiciousUrl && (
                                  <span className="bg-red-200 border-2 border-red-600 rounded px-1 font-bold">
                                    {line}
                                  </span>
                                )}
                                {hasMoney && !isSuspiciousUrl && (
                                  <span className="bg-yellow-200 border-2 border-yellow-600 rounded px-1 font-bold">
                                    {line}
                                  </span>
                                )}
                                {!isSuspiciousUrl && !hasMoney && line}
                              </>
                            ) : (
                              line
                            )}
                            {index < scenario.message.split('\n').length - 1 && <br />}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                  {showFeedback && scenario.isScam && (
                    <div className="mt-2 space-y-1">
                      <div className="bg-red-100 border-l-4 border-red-600 px-2 py-1 text-xs">
                        <span className="font-bold text-red-800">⚠️ {language === "spanish" ? "Enlaces Acortados" : "Shortened Links"}</span>
                      </div>
                      <div className="bg-yellow-100 border-l-4 border-yellow-600 px-2 py-1 text-xs">
                        <span className="font-bold text-yellow-800">💰 {language === "spanish" ? "Solicita Dinero" : "Asks for Money"}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* iMessage Input */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="bg-white rounded-full px-4 py-2 border border-gray-300 flex items-center">
              <span className="text-gray-400 text-sm">iMessage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Gmail-style UI for Email
  const renderEmail = () => {
    const senderName = scenario.from.split('@')[0].split('.').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    const senderInitial = senderName.charAt(0).toUpperCase();
    
    return (
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Gmail Top Toolbar */}
        <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center gap-2">
          <button className="p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-700 rounded">
            {t("simulator.deleteForever")}
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-700 rounded">
            {t("simulator.notSpam")}
          </button>
          <button className="p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z"/>
            </svg>
          </button>
          <button className="p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button className="p-2 rounded-full ml-auto">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>

        {/* Email Subject */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl text-gray-900">{scenario.subject}</h1>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{t("simulator.spam")}</span>
            <button className="ml-auto">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </button>
            <button>
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Email Header */}
        <div className="px-6 py-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
              {senderInitial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-sm text-gray-900">
                    {senderName} <span className={`text-gray-600 ${showFeedback ? (scenario.isScam ? 'bg-red-100 border-2 border-red-500 rounded px-1' : 'bg-green-100 border-2 border-green-500 rounded px-1') : ''}`}>&lt;{scenario.from}&gt;</span>
                    {showFeedback && scenario.isScam && (
                      <span className="block text-red-700 font-bold text-xs mt-1">⚠️ {language === "spanish" ? "Dominio Sospechoso!" : "Suspicious Domain!"}</span>
                    )}
                    {showFeedback && !scenario.isScam && (
                      <span className="block text-green-700 font-bold text-xs mt-1">✓ {language === "spanish" ? "Dominio Legítimo" : "Legitimate Domain"}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-gray-600">{t("simulator.toMe")}</span>
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span>Mon, Feb 2, 7:45 AM</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-full">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Spam Warning */}
        <div className="mx-6 mb-4 bg-yellow-50 border border-yellow-200 rounded px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-medium">{t("simulator.whySpam")}</span> {t("simulator.spamReason")}
              </p>
              <button className="mt-2 px-3 py-1 border border-gray-300 rounded text-sm bg-white">
                {t("simulator.reportNotSpam")}
              </button>
            </div>
            <button className="p-1">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Email Body */}
        <div className="px-6 pb-6">
          <div className="text-sm text-gray-900">
            
            <div className="whitespace-pre-wrap text-base leading-relaxed">
              {scenario.message.split('\n').map((line, index) => {
                // Highlight different elements
                const hasUrgency = line.toLowerCase().includes('urgent') || line.toLowerCase().includes('immediately') || line.toLowerCase().includes('suspended') || line.toLowerCase().includes('urgente') || line.toLowerCase().includes('inmediatamente') || line.toLowerCase().includes('suspendida');
                const hasSuspiciousLink = line.includes('http://') && (line.includes('.xyz') || line.includes('.biz') || line.includes('verify'));
                const hasOfficialNumber = line.includes('1-800') && !scenario.isScam;
                const hasOfficialDomain = line.includes('chase.com') && !scenario.isScam;
                const hasBankDetails = line.toLowerCase().includes('bank account') || line.toLowerCase().includes('cuenta bancaria');
                
                return (
                  <p key={index} className="mb-1">
                    {showFeedback ? (
                      <>
                        {hasUrgency && scenario.isScam && (
                          <span className="bg-yellow-200 border-2 border-yellow-600 rounded px-1 font-bold">
                            {line}
                          </span>
                        )}
                        {hasSuspiciousLink && (
                          <span className="bg-red-200 border-2 border-red-600 rounded px-1 font-bold">
                            {line}
                          </span>
                        )}
                        {hasOfficialNumber && (
                          <span className="bg-green-200 border-2 border-green-600 rounded px-1 font-bold">
                            {line}
                          </span>
                        )}
                        {hasOfficialDomain && (
                          <span className="bg-green-200 border-2 border-green-600 rounded px-1 font-bold">
                            {line}
                          </span>
                        )}
                        {hasBankDetails && (
                          <span className="bg-red-200 border-2 border-red-600 rounded px-1 font-bold">
                            {line}
                          </span>
                        )}
                        {!hasUrgency && !hasSuspiciousLink && !hasOfficialNumber && !hasOfficialDomain && !hasBankDetails && line}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                );
              })}
            </div>
            
            {/* Warning indicators */}
            {showFeedback && (
              <div className="mt-4 space-y-2">
                {scenario.isScam ? (
                  <>
                    {scenario.message.toLowerCase().includes('urgent') && (
                      <div className="bg-yellow-100 border-l-4 border-yellow-600 px-3 py-2 text-sm">
                        <span className="font-bold text-yellow-800">⚠️ {language === "spanish" ? "Lenguaje Urgente" : "Urgent Language"}</span>
                      </div>
                    )}
                    {scenario.message.includes('http://') && (
                      <div className="bg-red-100 border-l-4 border-red-600 px-3 py-2 text-sm">
                        <span className="font-bold text-red-800">🔗 {language === "spanish" ? "Enlace Sospechoso" : "Suspicious Link"}</span>
                      </div>
                    )}
                    {scenario.message.toLowerCase().includes('bank account') && (
                      <div className="bg-red-100 border-l-4 border-red-600 px-3 py-2 text-sm">
                        <span className="font-bold text-red-800">💳 {language === "spanish" ? "Solicita Info Bancaria" : "Asks for Bank Info"}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="bg-green-100 border-l-4 border-green-600 px-3 py-2 text-sm">
                      <span className="font-bold text-green-800">✓ {language === "spanish" ? "Sin Enlaces Directos" : "No Direct Links"}</span>
                    </div>
                    <div className="bg-green-100 border-l-4 border-green-600 px-3 py-2 text-sm">
                      <span className="font-bold text-green-800">📞 {language === "spanish" ? "Número Oficial Proporcionado" : "Official Number Provided"}</span>
                    </div>
                    <div className="bg-green-100 border-l-4 border-green-600 px-3 py-2 text-sm">
                      <span className="font-bold text-green-800">👤 {language === "spanish" ? "Personalizado" : "Personalized"}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reply Buttons */}
        <div className="px-6 pb-6 flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
            </svg>
            {t("simulator.reply")}
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
            </svg>
            {t("simulator.forward")}
          </button>
          <button className="p-2 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  // Render Phone Call UI
  const renderPhone = () => (
    <div className="max-w-md mx-auto">
      {/* iPhone-style Call Screen */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] px-8 py-12 text-white">
        <div className="text-center mb-12">
          <div className="text-xl mb-2 text-gray-300">Voicemail</div>
          <div className="text-3xl mb-8">{scenario.from}</div>
          
          <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-8 flex items-center justify-center">
            <Phone className="h-16 w-16" />
          </div>
        </div>

        <div className="bg-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Volume2 className="h-6 w-6" />
            </div>
            <div className="flex-1 text-xl">Voicemail Message</div>
          </div>
          <div className="text-lg leading-relaxed text-gray-200 whitespace-pre-wrap">
            {scenario.message}
          </div>
        </div>

        <div className="text-center text-lg text-gray-300">
          Just now
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl">{t("simulator.practiceQuiz")}</h1>
          <div className="text-right">
            <div className="text-3xl text-gray-700">{t("simulator.score")}: {score}/{scenarios.length}</div>
            <div className="text-xl text-gray-500">
              {t("simulator.question")} {currentScenario + 1} {t("simulator.of")} {scenarios.length}
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-5" />
      </div>

      {/* Realistic Message Display */}
      <div className="mb-10">
        {scenario.type === "sms" && renderSMS()}
        {scenario.type === "email" && renderEmail()}
        {scenario.type === "phone" && renderPhone()}
      </div>

      {/* Question and Answer Section */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-8">
            <div className="text-center mb-8">
              <h3 className="text-4xl mb-4">{t("simulator.isThisScam")}</h3>
              <p className="text-2xl text-gray-600 mb-8">
                {t("simulator.thinkWarning")}
              </p>
            </div>

            {!showFeedback ? (
              <div className="grid md:grid-cols-2 gap-8">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleAnswer(false)}
                  className="text-3xl h-auto py-10 border-4 border-green-600 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 rounded-xl shadow-md"
                >
                  <CheckCircle className="h-12 w-12 mr-4" />
                  {t("simulator.safe")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleAnswer(true)}
                  className="text-3xl h-auto py-10 border-4 border-red-600 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 rounded-xl shadow-md"
                >
                  <XCircle className="h-12 w-12 mr-4" />
                  {t("simulator.scam")}
                </Button>
              </div>
            ) : (
              <div>
                <Card className={`${
                  selectedAnswer === scenario.isScam
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}>
                  <CardContent className="pt-8">
                    <div className="flex items-center gap-6 mb-6">
                      {selectedAnswer === scenario.isScam ? (
                        <>
                          <CheckCircle className="h-16 w-16 text-green-600" />
                          <div>
                            <h3 className="text-4xl mb-2">{t("simulator.correct")}</h3>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-16 w-16 text-red-600" />
                          <div>
                            <h3 className="text-4xl mb-2">{t("simulator.notQuite")}</h3>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="bg-white p-6 rounded-lg mb-8">
                      <p className="text-2xl leading-relaxed">{scenario.explanation}</p>
                    </div>
                    <Button size="lg" onClick={handleNext} className="w-full text-3xl h-auto py-8 rounded-xl">
                      {currentScenario < scenarios.length - 1 ? t("simulator.next") : t("simulator.seeResults")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}