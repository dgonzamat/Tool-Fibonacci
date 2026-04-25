"use client"

import { useTranslation } from "./i18n-provider"
import { cn } from "@/lib/utils"

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t("lang.toggle.aria")}
      className={cn(
        "inline-flex items-center rounded-full border border-yellow-500/30 bg-black/40 p-0.5 text-xs font-mono",
        className,
      )}
    >
      <button
        type="button"
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
        className={cn(
          "px-2 py-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
          lang === "es" ? "bg-yellow-500 text-black" : "text-gray-300 hover:text-yellow-400",
        )}
      >
        ES
      </button>
      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={cn(
          "px-2 py-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
          lang === "en" ? "bg-yellow-500 text-black" : "text-gray-300 hover:text-yellow-400",
        )}
      >
        EN
      </button>
    </div>
  )
}
