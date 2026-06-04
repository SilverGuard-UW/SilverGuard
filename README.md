# SilverGuard

## Overview
SilverGuard is an interactive phishing awareness tool designed to help older adults recognize and respond to online scams. The application provides realistic email and SMS phishing scenarios, guided learning, and immediate feedback to help users build confidence in identifying potential threats.

This project was developed as part of the University of Washington Information School Capstone program and is now available as an open-source project for future contributors.

---

## Features

- Interactive phishing email and SMS simulations
- Guided learning experience with realistic scam examples
- Immediate feedback and explanations
- Senior-friendly design with accessibility considerations
- Educational dashboard for tracking learning progress

---

## Current Status

### Completed
Interactive phishing simulator
Email and SMS phishing scenarios
Feedback and explanation system
Accessible user interface for older adults

### Future Opportunities
Real-time phishing detection
Additional scam types (phone calls, social media scams, AI-generated scams)
Personalized learning recommendations
Expanded accessibility features
Mobile optimization

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/SilverGuard.git
cd SilverGuard
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure Firebase:

This project uses Firebase for authentication and data storage. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com), then create a `.env` file in the project root with your Firebase config values:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:

```bash
pnpm dev
```

The app will be available on a testing server at `http://localhost:5173/SilverGuard/`.

### Building for Production

```bash
pnpm build
```

### Deploying to GitHub Pages

```bash
pnpm deploy
```

---

## Project Structure

```
SilverGuard/
├── public/
│   └── img/                          # Static images used in scam scenarios
├── src/
│   ├── main.tsx                      # Application entry point
│   ├── app/
│   │   ├── App.tsx                   # Root React component
│   │   ├── routes.tsx                # React Router route definitions
│   │   ├── components/
│   │   │   ├── AccessibilityBar.tsx  # Floating accessibility controls
│   │   │   ├── Layout.tsx            # Shared page layout wrapper
│   │   │   ├── Navigation.tsx        # Top navigation bar
│   │   │   ├── RootLayout.tsx        # Root layout with context providers
│   │   │   ├── figma/                # Utility components from Figma Make
│   │   │   ├── pages/                # Page-level route components
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── Dashboard.tsx           # User progress and stats
│   │   │   │   ├── EducationPage.tsx       # Lesson library
│   │   │   │   ├── LessonPage.tsx          # Individual lesson view
│   │   │   │   ├── PracticeIntro.tsx       # Simulator entry point
│   │   │   │   ├── PracticeInstructions.tsx
│   │   │   │   ├── PhishingSimulator.tsx   # Interactive phishing quiz
│   │   │   │   ├── AccessibilitySettings.tsx
│   │   │   │   └── GetHelpPage.tsx
│   │   │   └── ui/                 # shadcn/ui component library
│   │   └── contexts/
│   │       └── AccessibilityContext.tsx    # Global accessibility state
│   └── styles/                     # Global CSS and theme files
├── index.html
├── vite.config.ts                  # Vite build config (base: /SilverGuard/)
├── package.json
└── postcss.config.mjs
```

### Key Technologies

| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| shadcn/ui (Radix UI) | Accessible component primitives |
| Material UI | Additional icon library |
| React Router v7 | Client-side routing |
| Firebase | Authentication and data persistence |

---

## Contributing

Future contributors are encouraged to:

- Add new phishing and scam scenarios
- Improve accessibility and usability
- Conduct additional user testing
- Implement real-time phishing detection
- Expand educational content

Please create a new branch for major changes and submit a pull request with a clear description of updates.

---

## Resources

### Final Product
https://silverguard-2be13.web.app

### Presentation Deck
https://canva.link/64jwg0mzj99axs8

---

## Team
- William Yuen  
- Daniel Hays  
- Jennifer Gomez  
- Diana Vergara  
- Michael Cinnamon

---

## Contact

For questions about the project or future Capstone continuation efforts:

Name: Jennifer Gomez

Email: jengomezwa@gmail.com

---

## Acknowledgments

Developed by G10-The Phishermen Capstone Team at the University of Washington Information School.

Special thanks to all usability testing participants and stakeholders who provided feedback throughout the project.
