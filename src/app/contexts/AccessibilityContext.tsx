import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  language: string;
  setLanguage: (lang: string) => void;
  textSize: number;
  setTextSize: (size: number) => void;
  t: (key: string) => string;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Translation dictionaries - MUST be defined before the component
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.learn": "Learn",
    "nav.practice": "Practice",
    "nav.progress": "Progress",
    "nav.help": "Help",
    "nav.settings": "Settings",
    "nav.voice": "Voice",

    // Login Page
    "login.title": "Login",
    "login.username": "Username",
    "login.usernamePlaceholder": "Enter your username",
    "login.password": "Password",
    "login.passwordPlaceholder": "Enter your password",
    "login.loginButton": "Log In",
    
    // Home Page
    "home.title": "SilverGuard",
    "home.subtitle": "Stay safe from online scams",
    "home.startLearning": "Start Learning",
    "home.learn": "Learn",
    "home.learnDesc": "Easy lessons about scams",
    "home.practice": "Practice",
    "home.practiceDesc": "Test your scam knowledge",
    "home.trackProgress": "Track Progress",
    "home.trackProgressDesc": "See your scores",
    "home.getHelp": "Get Help",
    "home.getHelpDesc": "Contact family",
    "home.howItWorks": "How It Works",
    "home.step1": "Complete lessons",
    "home.step2": "Practice with quizzes",
    "home.step3": "Track your progress",
    
    // Education Page
    "education.title": "Learn",
    "education.introduction": "Your first step is to start learning!",
    "education.startHere": "Start Here",
    "education.lessonsTitle": "Lessons",
    "education.progress": "Your Progress",
    "education.lessonsDone": "lessons done",
    "education.safetyTips": "Safety Tips",
    "education.goldenRule": "Golden Rule:",
    "education.goldenRuleText": "If someone asks for money, passwords, or urgent action — pause and verify.",
    "education.suspiciousEmail": "Email",
    "education.suspiciousText": "Text",
    "education.suspiciousCall": "Phone",
    "education.alreadyClicked": "If You Already Clicked Something",
    
    // Email Tips
    "tips.email.1": "Do not click links inside the email",
    "tips.email.2": "Check the full sender email address carefully",
    "tips.email.3": "Type the company website yourself instead of clicking",
    "tips.email.4": "Call the phone number on your bank card, not the one in the email",
    "tips.email.short": "Don't click links. Check sender carefully.",

    // Text Tips
    "tips.text.1": "Do not reply",
    "tips.text.2": "Do not click shortened links",
    "tips.text.3": "Verify deliveries directly through official websites",
    "tips.text.4": "Block the number after confirming it is fake",
    "tips.text.short": "Don't reply. Don't click links.",

    // Call Tips
    "tips.call.1": "Hang up immediately",
    "tips.call.2": "Do not press any numbers they ask you to press",
    "tips.call.3": "Government agencies will not demand payment by phone",
    "tips.call.4": "Never send gift cards or wire transfers",
    "tips.call.short": "Hang up. Never give money over phone.",
    
    // Already Clicked Tips
    "tips.clicked.1": "Do not panic",
    "tips.clicked.1b": " — you can take action now",
    "tips.clicked.2": "Stop entering information immediately",
    "tips.clicked.3": "Call your bank immediately if financial details were shared",
    "tips.clicked.4": "Change your password using the official website",
    "tips.clicked.5": "Contact a trusted family member",
    
    // Lessons
    "lesson.whatAreScams": "What Are Scams?",
    "lesson.whatAreScamsDesc": "Learn the basics of phishing",
    "lesson.avoidingScams": "Avoiding Scams",
    "lesson.avoidingScamsDesc": "Tips to protect yourself",
    "lesson.emailScams": "Email Scams",
    "lesson.emailScamsDesc": "Spot fake emails",
    "lesson.phoneScams": "Phone Scams",
    "lesson.phoneScamsDesc": "Avoid phone tricks",
    "lesson.socialMedia": "Social Media",
    "lesson.socialMediaDesc": "Stay safe online",
    "lesson.reportingScams": "Report Scams",
    "lesson.reportingScamsDesc": "What to do if scammed",
    "lesson.duration": "min",
    "lesson.done": "Done",
    "lesson.locked": "Locked",
    
    // Dashboard
    "dashboard.title": "Your Progress",
    "dashboard.quizScore": "Quiz Score",
    "dashboard.lessonsDone": "Lessons Done",
    "dashboard.improvement": "Improvement",
    "dashboard.threatsFound": "Threats Found",
    "dashboard.quizScores": "Quiz Scores",
    "dashboard.scamTypes": "Scam Types",
    "dashboard.recentThreats": "Recent Threats",
    "dashboard.nextSteps": "Next Steps",
    "dashboard.finishLessons": "Finish lessons",
    "dashboard.left": "left",
    "dashboard.takeQuiz": "Take a quiz",
    "dashboard.startQuiz": "Start Quiz",
    "dashboard.quiz": "Quiz",
    "dashboard.emailPhishing": "Email Phishing",
    "dashboard.smsScams": "SMS Scams",
    "dashboard.phoneCalls": "Phone Calls",
    "dashboard.socialMedia": "Social Media",
    "dashboard.date1": "Feb 24",
    "dashboard.date2": "Feb 25",
    "dashboard.date3": "Feb 26",
    "dashboard.confidenceLevel": "Confidence Rating",
    "dashboard.confidenceTrend": "Confidence Trend",
    
    // Practice Intro
    "practice.title": "Done Learning?",
    "practice.subtitle": "Try a practice quiz",
    "practice.description": "Test your scam detection skills with real-world examples",
    "practice.getStarted": "Get Started",
    "practice.beginQuiz": "Begin Practice Quiz",
    "practice.whatToExpect": "What to Expect",
    "practice.step1": "Review realistic scam examples",
    "practice.step2": "Decide if each message is safe or a scam",
    "practice.step3": "Get instant feedback and learn from mistakes",
    "practice.reminder": "Remember",
    "practice.reminderText": "Review the potential scams, then click either \"Safe\" or \"Scam\" at the bottom of the page.",

    // Simulator
    "simulator.title": "Phishing Simulator",
    "simulator.progress": "Progress",
    "simulator.safe": "This is SAFE",
    "simulator.scam": "This is a SCAM",
    "simulator.correct": "Correct!",
    "simulator.notQuite": "Not Quite",
    "simulator.next": "Next",
    "simulator.seeResults": "See Results",
    "simulator.completed": "Test Complete!",
    "simulator.yourScore": "Your Score",
    "simulator.great": "Great!",
    "simulator.goodTry": "Good Try!",
    "simulator.excellentSpotting": "Excellent! You're spotting scams well.",
    "simulator.keepLearning": "Keep learning! Review the lessons again.",
    "simulator.remember": "Remember:",
    "simulator.verifySenders": "Verify senders first",
    "simulator.watchUrgent": "Watch for urgent messages",
    "simulator.neverShare": "Never share passwords",
    "simulator.callDirect": "Call companies directly",
    "simulator.tips": "Tips:",
    "simulator.readCarefully": "Read carefully",
    "simulator.checkEmails": "Check email addresses",
    "simulator.lookSpelling": "Look for spelling errors",
    "simulator.questionUrgent": "Question urgent messages",
    "simulator.good": "Good work!",
    "simulator.needsPractice": "Keep practicing!",
    "simulator.tryAgain": "Try Again",
    "simulator.retakeQuiz": "Retake Quiz",
    "simulator.keepLearning": "Keep Learning",
    "simulator.trackProgress": "Track Progress",
    "simulator.back": "Back",
    "simulator.backToLessons": "Back to Lessons",
    "simulator.practiceQuiz": "Practice Quiz",
    "simulator.score": "Score",
    "simulator.question": "Question",
    "simulator.of": "of",
    "simulator.isThisScam": "Is this a scam?",
    "simulator.thinkWarning": "Think about the warning signs",
    "simulator.deleteForever": "Delete forever",
    "simulator.notSpam": "Not spam",
    "simulator.oneAttachment": "One attachment",
    "simulator.scannedBy": "Scanned by Gmail",
    "simulator.reply": "Reply",
    "simulator.forward": "Forward",
    "simulator.whySpam": "Why is this message in spam?",
    "simulator.spamReason": "This message is similar to messages that were identified as spam in the past.",
    "simulator.reportNotSpam": "Report not spam",
    "simulator.toMe": "to me",
    "simulator.voicemail": "Voicemail",
    "simulator.voicemailMessage": "Voicemail Message",
    "simulator.justNow": "Just now",
    "simulator.spam": "Spam",
    "simulator.imessage": "iMessage",
    "simulator.yesterday": "Yesterday morning 9:18",
    "simulator.confidenceTitle": "How confident do you feel?",
    "simulator.confidenceSubtitle": "Rate your confidence in identifying these phishing scams",
    "simulator.notConfident": "Not Confident",
    "simulator.somewhatConfident": "Somewhat Confident",
    "simulator.confident": "Confident",
    "simulator.veryConfident": "Very Confident",
    "simulator.expertConfident": "Expert Level",
    "simulator.submitConfidence": "Submit & Finish",
    "simulator.confidenceRating": "Confidence Rating",
    
    // Settings
    "settings.title": "Settings",
    "settings.language": "Choose Your Language",
    "settings.english": "English",
    "settings.spanish": "Español (Spanish)",
    "settings.otherLanguages": "Other Languages",
    "settings.languageNote": "Changing the language will update all pages and lessons.",
    "settings.textSize": "Text Size",
    "settings.size": "Size",
    "settings.sampleText": "Sample text at this size",
    "settings.voice": "Voice",
    "settings.readAloud": "Read Text Aloud",
    "settings.visual": "Visual",
    "settings.highContrast": "High Contrast",
    "settings.largeButtons": "Large Buttons",
    "settings.preview": "Preview",
    "settings.sampleLesson": "Sample Lesson",
    "settings.sampleContent": "This is how content will look with your settings.",
    "settings.contentPreview": "This is how content will look with your settings.",
    "settings.sampleButton": "Sample Button",
    "settings.save": "Save Settings",
    "settings.saveSettings": "Save Settings",
    "settings.reset": "Reset",
    
    // Get Help
    "help.title": "Get Help",
    "help.suspiciousMessage": "Suspicious Message?",
    "help.suspiciousMessageDesc": "Don't click anything! Get help now.",
    "help.askForHelp": "Ask for Help",
    "help.notSure": "Not Sure?",
    "help.notSureDesc": "Always better to ask first.",
    "help.contactSupport": "Contact Support",
    "help.alreadyShared": "Already Shared Info?",
    "help.alreadySharedDesc": "Act quickly! Call your bank.",
    "help.emergency": "Emergency",
    "help.contactFamily": "Contact Family",
    "help.contact": "Contact",
    "help.back": "Back",
    "help.howDoYouWantHelp": "How do you want help?",
    "help.call": "Call",
    "help.talkToThem": "Talk to them",
    "help.screenshot": "Screenshot",
    "help.shareMessage": "Share message",
    "help.text": "Text",
    "help.sendMessage": "Send message",
    "help.startCall": "Start Call",
    "help.cancel": "Cancel",
    "help.endCall": "End Call",
    "help.connecting": "Connecting...",
    "help.sendTo": "Send to",
    "help.screenshotSent": "Screenshot Sent!",
    "help.willHelpSoon": "will help you soon",
    "help.takeScreenshot": "Take a screenshot",
    "help.capture": "Capture",
    "help.addMessage": "Add a message:",
    "help.whatWorried": "What are you worried about?",
    "help.send": "Send",
    "help.emergencyNumbers": "Emergency Numbers",
    "help.reportFraud": "Report Fraud",
    "help.reportEmailScams": "Report Email Scams",
    "help.reportTextScams": "Report Text Scams",
    "help.forwardTo": "Forward to",
    "help.son": "Son",
    "help.daughter": "Daughter",
    "help.nephew": "Nephew",
    
    // Lesson Page
    "lessonPage.back": "Back",
    "lessonPage.complete": "Lesson Complete!",
    "lessonPage.greatJob": "Great job learning",
    "lessonPage.backToLessons": "Back to Lessons",
    "lessonPage.testYourself": "Practice Now",
    "lessonPage.nextLesson": "Continue to Next Lesson",
    "lessonPage.orYouCan": "Or you can:",
    "lessonPage.keyPoints": "Remember These Key Points",
    "lessonPage.notFound": "Lesson not found",
    
    // Lesson Content - What Are Scams
    "lessonContent.whatAreScams.title": "What Are Scams?",
    "lessonContent.whatAreScams.section1.heading": "Understanding Phishing",
    "lessonContent.whatAreScams.section1.content": "Phishing scams trick you into sharing passwords, credit card numbers, or bank details. Scammers pretend to be someone you trust.",
    "lessonContent.whatAreScams.section2.heading": "Why Scammers Target You",
    "lessonContent.whatAreScams.section2.content": "They target seniors because you may have savings and be more trusting. Knowing their tricks helps you stay safe.",
    "lessonContent.whatAreScams.section3.heading": "Warning Signs",
    "lessonContent.whatAreScams.section3.content": "Look for urgent language, requests for personal information, suspicious email addresses, and offers that seem too good to be true.",
    "lessonContent.whatAreScams.keyPoint1": "Scammers pretend to be people you trust",
    "lessonContent.whatAreScams.keyPoint2": "Watch for urgent requests and too-good offers",
    "lessonContent.whatAreScams.keyPoint3": "Never share passwords or bank details",
    
    // Lesson Content - Avoiding Scams
    "lessonContent.avoidingScams.title": "Avoiding Scams",
    "lessonContent.avoidingScams.section1.heading": "Spot the Red Flags",
    "lessonContent.avoidingScams.section1.content": "Urgent requests, threats of account closure, requests for passwords, unexpected prizes, or unknown senders asking for money.",
    "lessonContent.avoidingScams.section2.heading": "Stay Safe",
    "lessonContent.avoidingScams.section2.content": "Never click suspicious links. Verify who's contacting you. Keep software updated. Use strong passwords. Turn on two-factor authentication.",
    "lessonContent.avoidingScams.section3.heading": "If You're Contacted",
    "lessonContent.avoidingScams.section3.content": "Don't respond. Don't click links. Report the message. Contact your bank if you shared financial info. Tell family or friends.",
    "lessonContent.avoidingScams.keyPoint1": "Never click suspicious links",
    "lessonContent.avoidingScams.keyPoint2": "Always verify who's contacting you",
    "lessonContent.avoidingScams.keyPoint3": "Use strong passwords and two-factor authentication",
    
    // Lesson Content - Email Phishing
    "lessonContent.emailPhishing.title": "Email Scams",
    "lessonContent.emailPhishing.section1.heading": "Fake Email Signs",
    "lessonContent.emailPhishing.section1.content": "Suspicious sender addresses, generic greetings, urgent subject lines, links to fake websites, and requests for personal information.",
    "lessonContent.emailPhishing.section2.heading": "Real vs. Fake",
    "lessonContent.emailPhishing.section2.content": "Real companies use professional email addresses, personalized greetings with your name, and don't threaten account closure or ask for passwords.",
    "lessonContent.emailPhishing.section3.heading": "How to Protect Yourself",
    "lessonContent.emailPhishing.section3.content": "Turn on spam filters. Never reply to suspicious emails. Contact companies directly. Report phishing. Delete suspicious emails.",
    "lessonContent.emailPhishing.keyPoint1": "Check sender address carefully",
    "lessonContent.emailPhishing.keyPoint2": "Real companies won't ask for passwords",
    "lessonContent.emailPhishing.keyPoint3": "When in doubt, contact company directly",
    
    // Lesson Content - Charts
    "lessonContent.charts.scamsIncreasing": "Scams Increasing",
    "lessonContent.charts.peopleGettingSmarter": "People Getting Smarter",
    
    // Common
    "common.son": "Son",
    "common.daughter": "Daughter",
    "common.nephew": "Nephew",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.learn": "Aprender",
    "nav.practice": "Practicar",
    "nav.progress": "Progreso",
    "nav.help": "Ayuda",
    "nav.settings": "Configuración",
    "nav.voice": "Voz",
    
    // Home Page
    "home.title": "SilverGuard",
    "home.subtitle": "Manténgase seguro de las estafas en línea",
    "home.startLearning": "Comenzar a Aprender",
    "home.learn": "Aprender",
    "home.learnDesc": "Lecciones fáciles sobre estafas",
    "home.practice": "Practicar",
    "home.practiceDesc": "Pruebe su conocimiento de estafas",
    "home.trackProgress": "Seguir Progreso",
    "home.trackProgressDesc": "Ver sus puntajes",
    "home.getHelp": "Obtener Ayuda",
    "home.getHelpDesc": "Contactar familia",
    "home.howItWorks": "Cómo Funciona",
    "home.step1": "Completar lecciones",
    "home.step2": "Practicar con cuestionarios",
    "home.step3": "Seguir su progreso",
    
    // Education Page
    "education.title": "Aprender",
    "education.introduction": "¡Tu primer paso es comenzar a aprender!",
    "education.startHere": "Comenzar Aquí",
    "education.lessonsTitle": "Lecciones",
    "education.progress": "Su Progreso",
    "education.lessonsDone": "lecciones completadas",
    "education.safetyTips": "Consejos de Seguridad",
    "education.goldenRule": "Regla de Oro:",
    "education.goldenRuleText": "Si alguien pide dinero, contraseñas o acción urgente — pause y verifique.",
    "education.suspiciousEmail": "Correo",
    "education.suspiciousText": "Texto",
    "education.suspiciousCall": "Teléfono",
    "education.alreadyClicked": "Si Ya Hizo Clic en Algo",
    
    // Email Tips
    "tips.email.1": "No haga clic en enlaces dentro del correo",
    "tips.email.2": "Revise cuidadosamente la dirección completa del remitente",
    "tips.email.3": "Escriba el sitio web de la compañía usted mismo en lugar de hacer clic",
    "tips.email.4": "Llame al número de teléfono en su tarjeta bancaria, no el del correo",
    "tips.email.short": "No haga clic. Revise remitente.",

    // Text Tips
    "tips.text.1": "No responda",
    "tips.text.2": "No haga clic en enlaces acortados",
    "tips.text.3": "Verifique entregas directamente a través de sitios web oficiales",
    "tips.text.4": "Bloquee el número después de confirmar que es falso",
    "tips.text.short": "No responda. No haga clic.",

    // Call Tips
    "tips.call.1": "Cuelgue inmediatamente",
    "tips.call.2": "No presione ningún número que le pidan presionar",
    "tips.call.3": "Las agencias gubernamentales no exigirán pago por teléfono",
    "tips.call.4": "Nunca envíe tarjetas de regalo o transferencias bancarias",
    "tips.call.short": "Cuelgue. Nunca dé dinero por teléfono.",
    
    // Already Clicked Tips
    "tips.clicked.1": "No entre en pánico",
    "tips.clicked.1b": " — puede tomar acción ahora",
    "tips.clicked.2": "Deje de ingresar información inmediatamente",
    "tips.clicked.3": "Llame a su banco inmediatamente si compartió detalles financieros",
    "tips.clicked.4": "Cambie su contraseña usando el sitio web oficial",
    "tips.clicked.5": "Contacte a un familiar de confianza",
    
    // Lessons
    "lesson.whatAreScams": "¿Qué Son las Estafas?",
    "lesson.whatAreScamsDesc": "Aprenda lo básico del phishing",
    "lesson.avoidingScams": "Evitar Estafas",
    "lesson.avoidingScamsDesc": "Consejos para protegerse",
    "lesson.emailScams": "Estafas por Correo",
    "lesson.emailScamsDesc": "Identifique correos falsos",
    "lesson.phoneScams": "Estafas Telefónicas",
    "lesson.phoneScamsDesc": "Evite trucos telefónicos",
    "lesson.socialMedia": "Redes Sociales",
    "lesson.socialMediaDesc": "Manténgase seguro en línea",
    "lesson.reportingScams": "Reportar Estafas",
    "lesson.reportingScamsDesc": "Qué hacer si fue estafado",
    "lesson.duration": "min",
    "lesson.done": "Hecho",
    "lesson.locked": "Bloqueado",
    
    // Dashboard
    "dashboard.title": "Su Progreso",
    "dashboard.quizScore": "Puntaje de Cuestionario",
    "dashboard.lessonsDone": "Lecciones Completadas",
    "dashboard.improvement": "Mejora",
    "dashboard.threatsFound": "Amenazas Encontradas",
    "dashboard.quizScores": "Puntajes de Cuestionarios",
    "dashboard.scamTypes": "Tipos de Estafas",
    "dashboard.recentThreats": "Amenazas Recientes",
    "dashboard.nextSteps": "Próximos Pasos",
    "dashboard.finishLessons": "Terminar lecciones",
    "dashboard.left": "restantes",
    "dashboard.takeQuiz": "Tomar un cuestionario",
    "dashboard.startQuiz": "Comenzar Cuestionario",
    "dashboard.quiz": "Cuestionario",
    "dashboard.emailPhishing": "Phishing por Correo",
    "dashboard.smsScams": "Estafas por SMS",
    "dashboard.phoneCalls": "Llamadas Telefónicas",
    "dashboard.socialMedia": "Redes Sociales",
    "dashboard.date1": "Feb 24",
    "dashboard.date2": "Feb 25",
    "dashboard.date3": "Feb 26",
    "dashboard.confidenceLevel": "Calificación de Confianza",
    "dashboard.confidenceTrend": "Tendencia de Confianza",
    
    // Practice Intro
    "practice.title": "¿Terminaste de Aprender?",
    "practice.subtitle": "Prueba un cuestionario de práctica",
    "practice.description": "Pon a prueba tus habilidades de detección de estafas con ejemplos del mundo real",
    "practice.getStarted": "Comenzar",
    "practice.beginQuiz": "Comenzar Cuestionario de Práctica",
    "practice.whatToExpect": "Qué Esperar",
    "practice.step1": "Revisar ejemplos realistas de estafas",
    "practice.step2": "Decidir si cada mensaje es seguro o una estafa",
    "practice.step3": "Obtener comentarios instantáneos y aprender de los errores",
    "practice.reminder": "Recuerda",
    "practice.reminderText": "Revisa las posibles estafas, luego haz clic en \"Seguro\" o \"Estafa\" en la parte inferior de la página.",

    // Simulator
    "simulator.title": "Simulador de Phishing",
    "simulator.progress": "Progreso",
    "simulator.safe": "Esto es SEGURO",
    "simulator.scam": "Esto es una ESTAFA",
    "simulator.correct": "¡Correcto!",
    "simulator.notQuite": "No Exactamente",
    "simulator.next": "Siguiente",
    "simulator.seeResults": "Ver Resultados",
    "simulator.completed": "¡Prueba Completa!",
    "simulator.yourScore": "Su Puntaje",
    "simulator.great": "¡Excelente trabajo!",
    "simulator.goodTry": "¡Buen intento!",
    "simulator.excellentSpotting": "¡Excelente! Estás identificando estafas bien.",
    "simulator.keepLearning": "¡Sigue aprendiendo! Revisa las lecciones nuevamente.",
    "simulator.remember": "Recuerda:",
    "simulator.verifySenders": "Verifica a los remitentes primero",
    "simulator.watchUrgent": "Observa mensajes urgentes",
    "simulator.neverShare": "Nunca comparte contraseñas",
    "simulator.callDirect": "Llama a las empresas directamente",
    "simulator.tips": "Consejos:",
    "simulator.readCarefully": "Lee cuidadosamente",
    "simulator.checkEmails": "Verifica las direcciones de correo",
    "simulator.lookSpelling": "Busca errores de ortografía",
    "simulator.questionUrgent": "Pregunta sobre mensajes urgentes",
    "simulator.good": "¡Buen trabajo!",
    "simulator.needsPractice": "¡Sigue practicando!",
    "simulator.tryAgain": "Intentar de Nuevo",
    "simulator.retakeQuiz": "Repetir Cuestionario",
    "simulator.keepLearning": "Seguir Aprendiendo",
    "simulator.trackProgress": "Ver Progreso",
    "simulator.back": "Atrás",
    "simulator.backToLessons": "Volver a Lecciones",
    "simulator.practiceQuiz": "Practicar Cuestionario",
    "simulator.score": "Puntaje",
    "simulator.question": "Pregunta",
    "simulator.of": "de",
    "simulator.isThisScam": "¿Es esto una estafa?",
    "simulator.thinkWarning": "Piensa en los signos de advertencia",
    "simulator.deleteForever": "Eliminar para siempre",
    "simulator.notSpam": "No es spam",
    "simulator.oneAttachment": "Un archivo adjunto",
    "simulator.scannedBy": "Escaneado por Gmail",
    "simulator.reply": "Responder",
    "simulator.forward": "Reenviar",
    "simulator.whySpam": "¿Por qué este mensaje está en spam?",
    "simulator.spamReason": "Este mensaje es similar a mensajes que se identificaron como spam en el pasado.",
    "simulator.reportNotSpam": "Reportar no spam",
    "simulator.toMe": "a mí",
    "simulator.voicemail": "Mensaje de voz",
    "simulator.voicemailMessage": "Mensaje de voz",
    "simulator.justNow": "Justo ahora",
    "simulator.spam": "Spam",
    "simulator.imessage": "iMessage",
    "simulator.yesterday": "Mañana por la mañana 9:18",
    "simulator.confidenceTitle": "¿Cuánta confianza tienes?",
    "simulator.confidenceSubtitle": "Califica tu confianza en identificar estas estafas de phishing",
    "simulator.notConfident": "No Confiable",
    "simulator.somewhatConfident": "Algo Confiable",
    "simulator.confident": "Confiable",
    "simulator.veryConfident": "Muy Confiable",
    "simulator.expertConfident": "Nivel Experto",
    "simulator.submitConfidence": "Enviar y Finalizar",
    "simulator.confidenceRating": "Calificación de Confianza",
    
    // Settings
    "settings.title": "Configuración",
    "settings.language": "Elija Su Idioma",
    "settings.english": "English (Inglés)",
    "settings.spanish": "Español",
    "settings.otherLanguages": "Otros Idiomas",
    "settings.languageNote": "Cambiar el idioma actualizará todas las páginas y lecciones.",
    "settings.textSize": "Tamaño de Texto",
    "settings.size": "Tamaño",
    "settings.sampleText": "Texto de muestra a este tamaño",
    "settings.voice": "Voz",
    "settings.readAloud": "Leer Texto en Voz Alta",
    "settings.visual": "Visual",
    "settings.highContrast": "Alto Contraste",
    "settings.largeButtons": "Botones Grandes",
    "settings.preview": "Vista Previa",
    "settings.sampleLesson": "Lección de Muestra",
    "settings.sampleContent": "Así es como se verá el contenido con su configuración.",
    "settings.contentPreview": "Así es como se verá el contenido con su configuración.",
    "settings.sampleButton": "Botón de Muestra",
    "settings.save": "Guardar Configuración",
    "settings.saveSettings": "Guardar Configuración",
    "settings.reset": "Restablecer",
    
    // Get Help
    "help.title": "Obtener Ayuda",
    "help.suspiciousMessage": "¿Mensaje Sospechoso?",
    "help.suspiciousMessageDesc": "¡No haga clic en nada! Obtenga ayuda ahora.",
    "help.askForHelp": "Pedir Ayuda",
    "help.notSure": "¿No Está Seguro?",
    "help.notSureDesc": "Siempre es mejor preguntar primero.",
    "help.contactSupport": "Contactar Soporte",
    "help.alreadyShared": "¿Ya Compartió Información?",
    "help.alreadySharedDesc": "¡Actúe rápidamente! Llame a su banco.",
    "help.emergency": "Emergencia",
    "help.contactFamily": "Contactar Familia",
    "help.contact": "Contactar",
    "help.back": "Atrás",
    "help.howDoYouWantHelp": "¿Cómo quiere ayuda?",
    "help.call": "Llamar",
    "help.talkToThem": "Hablar con ellos",
    "help.screenshot": "Captura de Pantalla",
    "help.shareMessage": "Compartir mensaje",
    "help.text": "Texto",
    "help.sendMessage": "Enviar mensaje",
    "help.startCall": "Iniciar Llamada",
    "help.cancel": "Cancelar",
    "help.endCall": "Terminar Llamada",
    "help.connecting": "Conectando...",
    "help.sendTo": "Enviar a",
    "help.screenshotSent": "¡Captura Enviada!",
    "help.willHelpSoon": "le ayudará pronto",
    "help.takeScreenshot": "Tomar una captura de pantalla",
    "help.capture": "Capturar",
    "help.addMessage": "Agregar un mensaje:",
    "help.whatWorried": "¿Qué le preocupa?",
    "help.send": "Enviar",
    "help.emergencyNumbers": "Números de Emergencia",
    "help.reportFraud": "Reportar Fraude",
    "help.reportEmailScams": "Reportar Estafas por Correo",
    "help.reportTextScams": "Reportar Estafas por Texto",
    "help.forwardTo": "Reenviar a",
    "help.son": "Hijo",
    "help.daughter": "Hija",
    "help.nephew": "Sobrino",
    
    // Lesson Page
    "lessonPage.back": "Atrás",
    "lessonPage.complete": "¡Lección Completa!",
    "lessonPage.greatJob": "Excelente trabajo aprendiendo",
    "lessonPage.backToLessons": "Volver a Lecciones",
    "lessonPage.testYourself": "Practicar Ahora",
    "lessonPage.nextLesson": "Continuar a la Siguiente Lección",
    "lessonPage.orYouCan": "O puedes:",
    "lessonPage.keyPoints": "Recuerde Estos Puntos Clave",
    "lessonPage.notFound": "Lección no encontrada",
    
    // Lesson Content - What Are Scams
    "lessonContent.whatAreScams.title": "¿Qué Son las Estafas?",
    "lessonContent.whatAreScams.section1.heading": "Entendiendo el Phishing",
    "lessonContent.whatAreScams.section1.content": "Las estafas de phishing te engañan para que compartas contraseñas, números de tarjetas de crédito o detalles bancarios. Los estafadores se hacen pasar por alguien que confías.",
    "lessonContent.whatAreScams.section2.heading": "¿Por Qué los Estafadores Te Dirigen",
    "lessonContent.whatAreScams.section2.content": "Te dirigen a los mayores porque podrías tener ahorros y ser más confiable. Conocer sus trucos te ayuda a mantenerte seguro.",
    "lessonContent.whatAreScams.section3.heading": "Signos de Advertencia",
    "lessonContent.whatAreScams.section3.content": "Busca lenguaje urgente, solicitudes de información personal, direcciones de correo electrónico sospechosas y ofertas que parecen demasiado buenas para ser ciertas.",
    "lessonContent.whatAreScams.keyPoint1": "Los estafadores se hacen pasar por personas que confías",
    "lessonContent.whatAreScams.keyPoint2": "Cuidado con solicitudes urgentes y ofertas muy buenas",
    "lessonContent.whatAreScams.keyPoint3": "Nunca comparta contraseñas o detalles bancarios",
    
    // Lesson Content - Avoiding Scams
    "lessonContent.avoidingScams.title": "Evitar Estafas",
    "lessonContent.avoidingScams.section1.heading": "Detectar las Alertas",
    "lessonContent.avoidingScams.section1.content": "Solicitudes urgentes, amenazas de cierre de cuenta, solicitudes de contraseñas, premios inesperados o remitentes desconocidos que piden dinero.",
    "lessonContent.avoidingScams.section2.heading": "Mantente Seguro",
    "lessonContent.avoidingScams.section2.content": "Nunca hagas clic en enlaces sospechosos. Verifica quién te está contactando. Mantén actualizado el software. Usa contraseñas fuertes. Activa la autenticación de dos factores.",
    "lessonContent.avoidingScams.section3.heading": "Si Te Contactan",
    "lessonContent.avoidingScams.section3.content": "No responda. No hagas clic en enlaces. Reporta el mensaje. Contacta a tu banco si compartiste información financiera. Dile a familiares o amigos.",
    "lessonContent.avoidingScams.keyPoint1": "Nunca hagas clic en enlaces sospechosos",
    "lessonContent.avoidingScams.keyPoint2": "Siempre verifica quién te contacta",
    "lessonContent.avoidingScams.keyPoint3": "Usa contraseñas fuertes y autenticación de dos factores",

    // Lesson Content - Email Phishing
    "lessonContent.emailPhishing.title": "Estafas por Correo",
    "lessonContent.emailPhishing.section1.heading": "Signos de Correo Falso",
    "lessonContent.emailPhishing.section1.content": "Direcciones de remitente sospechosas, saludos genéricos, líneas de asunto urgentes, enlaces a sitios web falsos y solicitudes de información personal.",
    "lessonContent.emailPhishing.section2.heading": "Real vs. Falso",
    "lessonContent.emailPhishing.section2.content": "Las empresas reales usan direcciones de correo electrónico profesionales, saludos personalizados con tu nombre y no amenazan el cierre de la cuenta o piden contraseñas.",
    "lessonContent.emailPhishing.section3.heading": "Cómo Protegerte",
    "lessonContent.emailPhishing.section3.content": "Activa los filtros de spam. Nunca responda a correos sospechosos. Contacta a las empresas directamente. Reporta phishing. Elimina correos sospechosos.",
    "lessonContent.emailPhishing.keyPoint1": "Revise la dirección del remitente cuidadosamente",
    "lessonContent.emailPhishing.keyPoint2": "Empresas reales no pedirán contraseñas",
    "lessonContent.emailPhishing.keyPoint3": "En caso de duda, contacte a la empresa directamente",
    
    // Lesson Content - Charts
    "lessonContent.charts.scamsIncreasing": "Estafas Aumentando",
    "lessonContent.charts.peopleGettingSmarter": "Personas Se Hacen Más Inteligentes",
    
    // Common
    "common.son": "Hijo",
    "common.daughter": "Hija",
    "common.nephew": "Sobrino",
  },
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("silverguard-language") || "english";
  });
  
  const [textSize, setTextSizeState] = useState(() => {
    const saved = localStorage.getItem("silverguard-textsize");
    return saved ? parseInt(saved) : 100;
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("silverguard-language", lang);
  };

  const setTextSize = (size: number) => {
    setTextSizeState(size);
    localStorage.setItem("silverguard-textsize", size.toString());
  };

  // Translation function
  const t = (key: string): string => {
    if (language === "spanish") {
      return translations.es[key] || translations.en[key] || key;
    }
    return translations.en[key] || key;
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${textSize}%`;
  }, [textSize]);

  return (
    <AccessibilityContext.Provider value={{ language, setLanguage, textSize, setTextSize, t }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    // During HMR, provide a temporary fallback to prevent crashes
    if (import.meta.hot) {
      // Silent fallback during HMR - this is expected behavior
      return {
        language: 'english',
        setLanguage: () => {},
        textSize: 100,
        setTextSize: () => {},
        t: (key: string) => key,
      };
    }
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}