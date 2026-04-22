import { Home, LayoutDashboard, BookOpen, Shield, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAccessibility } from "../contexts/AccessibilityContext.tsx";

export function Navigation() {
  const location = useLocation();
  const { t } = useAccessibility();

  const navItems = [
    { path: "/", icon: Home, label: t("nav.home") },
    { path: "/education", icon: BookOpen, label: t("nav.learn") },
    { path: "/simulator", icon: Shield, label: t("nav.practice") },
    { path: "/dashboard", icon: LayoutDashboard, label: t("nav.progress") },
    { path: "/help", icon: HelpCircle, label: t("nav.help") },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-2 px-8 py-5 border-b-4 transition-colors min-w-[120px] ${
                  isActive
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-8 w-8" />
                <span className="text-xl">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}