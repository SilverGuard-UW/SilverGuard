import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { useAccessibility } from "../../contexts/AccessibilityContext.tsx";

export function GetHelpPage() {
  const { t } = useAccessibility();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-5xl mb-4">{t("help.title")}</h1>
      </div>

      {/* Quick Help Options */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">{t("help.suspiciousMessage")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-gray-700">
              {t("help.suspiciousMessageDesc")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">{t("help.notSure")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-gray-700">
              {t("help.notSureDesc")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">{t("help.alreadyShared")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-gray-700">
              {t("help.alreadySharedDesc")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Resources */}
      <Card className="border-2 border-red-200">
        <CardHeader>
          <CardTitle className="text-3xl text-red-600 mb-4">{t("help.emergencyNumbers")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 bg-white rounded-lg border-2">
              <Phone className="h-10 w-10 text-red-600 flex-shrink-0 mt-2" />
              <div>
                <h4 className="text-2xl mb-3">{t("help.reportFraud")}</h4>
                <p className="text-xl text-gray-700">
                  <strong className="text-2xl">1-877-382-4357</strong>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-white rounded-lg border-2">
              <Mail className="h-10 w-10 text-red-600 flex-shrink-0 mt-2" />
              <div>
                <h4 className="text-2xl mb-3">{t("help.reportEmailScams")}</h4>
                <p className="text-xl text-gray-700">
                  <strong className="text-2xl">spam@uce.gov</strong>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-white rounded-lg border-2">
              <MessageSquare className="h-10 w-10 text-red-600 flex-shrink-0 mt-2" />
              <div>
                <h4 className="text-2xl mb-3">{t("help.reportTextScams")}</h4>
                <p className="text-xl text-gray-700">
                  {t("help.forwardTo")} <strong className="text-2xl">7726 (SPAM)</strong>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}