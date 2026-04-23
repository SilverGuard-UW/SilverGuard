import { Settings } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useAccessibility } from "../contexts/AccessibilityContext";

export function AccessibilityBar() {
  const { t } = useAccessibility();

  return (
    <div className="bg-blue-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-medium">{t("home.title")}</span>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/settings">
          <Button variant="ghost" size="lg" className="text-white hover:bg-blue-800 h-auto px-6 py-3 flex items-center gap-3">
            <Settings className="h-7 w-7" />
            <span className="text-xl">{t("nav.settings")}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}