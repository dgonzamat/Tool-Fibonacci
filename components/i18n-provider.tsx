"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { dictionaries, type DictKey, type Lang } from "@/lib/i18n"

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: DictKey) => string
}

const I18nContext = createContext<I18nCtx | null>(null)

const STORAGE_KEY = "tool-fibonacci-lang"

function detectLang(): Lang {
  if (typeof window === "undefined") return "es"
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
  if (stored === "es" || stored === "en") return stored
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("en")) {
    return "en"
  }
  return "es"
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es")

  useEffect(() => {
    setLangState(detectLang())
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l)
    }
  }

  const t = (k: DictKey) => dictionaries[lang][k]

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider")
  return ctx
}
