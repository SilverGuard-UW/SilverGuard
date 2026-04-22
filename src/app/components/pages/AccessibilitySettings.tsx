import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { Button } from "../ui/button.tsx";
import { Switch } from "../ui/switch.tsx";
import { Label } from "../ui/label.tsx";
import { Slider } from "../ui/slider.tsx";
import { useState, useEffect } from "react";
import { Type, Eye, Palette, Globe, CheckCircle } from "lucide-react";
import { useAccessibility } from "../../contexts/AccessibilityContext.tsx";

export function AccessibilitySettings() {
  const { language, setLanguage, textSize, setTextSize, t } = useAccessibility();
  const [localTextSize, setLocalTextSize] = useState([textSize]);
  const [highContrast, setHighContrast] = useState(false);
  const [largeButtons, setLargeButtons] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSaveSettings = () => {
    setTextSize(localTextSize[0]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-5xl mb-4">{t("settings.title")}</h1>
      </div>

      <div className="space-y-8">
        {/* Language Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-lg">
                <Globe className="h-10 w-10 text-orange-600" />
              </div>
              <CardTitle className="text-3xl">{t("settings.language")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-6">
                <Button
                  size="lg"
                  variant={language === "english" ? "default" : "outline"}
                  onClick={() => setLanguage("english")}
                  className={`w-full text-3xl h-auto py-8 rounded-xl justify-start ${
                    language === "english"
                      ? "bg-blue-600 text-white border-4 border-blue-700 shadow-lg"
                      : "bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Globe className="h-10 w-10 mr-4" />
                  <span className="flex-1 text-left">{t("settings.english")}</span>
                  {language === "english" && (
                    <CheckCircle className="h-10 w-10 ml-4" />
                  )}
                </Button>

                <Button
                  size="lg"
                  variant={language === "spanish" ? "default" : "outline"}
                  onClick={() => setLanguage("spanish")}
                  className={`w-full text-3xl h-auto py-8 rounded-xl justify-start ${
                    language === "spanish"
                      ? "bg-blue-600 text-white border-4 border-blue-700 shadow-lg"
                      : "bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Globe className="h-10 w-10 mr-4" />
                  <span className="flex-1 text-left">{t("settings.spanish")}</span>
                  {language === "spanish" && (
                    <CheckCircle className="h-10 w-10 ml-4" />
                  )}
                </Button>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <p className="text-2xl text-gray-800 leading-relaxed">
                  {t("settings.languageNote")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Size */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <Type className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-3xl">{t("settings.textSize")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="text-2xl mb-6 block">
                  {t("settings.size")}: {localTextSize[0]}%
                </Label>
                <Slider
                  value={localTextSize}
                  onValueChange={setLocalTextSize}
                  min={80}
                  max={150}
                  step={10}
                  className="w-full"
                />
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p style={{ fontSize: `${(localTextSize[0] / 100) * 1.25}rem` }}>
                  {t("settings.sampleText")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <Eye className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-3xl">{t("settings.visual")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label htmlFor="contrast" className="text-2xl">
                  {t("settings.highContrast")}
                </Label>
              </div>
              <Switch
                id="contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
                className="data-[state=checked]:bg-green-600 scale-150"
              />
            </div>
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="space-y-2">
                <Label htmlFor="buttons" className="text-2xl">
                  {t("settings.largeButtons")}
                </Label>
              </div>
              <Switch
                id="buttons"
                checked={largeButtons}
                onCheckedChange={setLargeButtons}
                className="data-[state=checked]:bg-green-600 scale-150"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-4 rounded-lg">
                <Palette className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl">{t("settings.preview")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`bg-white p-8 rounded-lg ${highContrast ? "border-4 border-black" : ""}`}>
              <h3 style={{ fontSize: `${localTextSize[0]}%` }} className="text-2xl mb-6">
                {t("settings.sampleLesson")}
              </h3>
              <p style={{ fontSize: `${localTextSize[0]}%` }} className={`mb-6 text-xl ${highContrast ? "text-black" : "text-gray-700"}`}>
                {t("settings.contentPreview")}
              </p>
              <Button 
                size={largeButtons ? "lg" : "default"}
                className={largeButtons ? "text-2xl px-10 py-8 h-auto rounded-xl" : "text-xl"}
              >
                {t("settings.sampleButton")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-6">
          <Button size="lg" className="flex-1 text-2xl h-auto py-8 rounded-xl" onClick={handleSaveSettings}>
            {t("settings.saveSettings")}
          </Button>
          <Button size="lg" variant="outline" className="flex-1 text-2xl h-auto py-8 rounded-xl">
            {t("settings.reset")}
          </Button>
        </div>
      </div>
    </div>
  );
}