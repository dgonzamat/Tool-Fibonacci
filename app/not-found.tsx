"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Sigma } from "lucide-react"
import { useTranslation } from "@/components/i18n-provider"

export default function NotFound() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="bg-gray-900/50 border-yellow-500/20 max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Sigma aria-hidden="true" className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <h1 className="text-6xl font-light mb-4 text-yellow-500">{t("notfound.code")}</h1>
          <h2 className="text-2xl font-light mb-4 text-white">{t("notfound.title")}</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">{t("notfound.description")}</p>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                <Home aria-hidden="true" className="w-4 h-4 mr-2" />
                {t("notfound.home")}
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4 mr-2" />
              {t("notfound.back")}
            </Button>
          </div>

          {pathname && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-500 break-all">
                <code className="text-yellow-500/70">{pathname}</code>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
