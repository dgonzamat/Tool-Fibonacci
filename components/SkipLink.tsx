"use client"

import { useTranslation } from "./i18n-provider"

export default function SkipLink() {
  const { t } = useTranslation()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-yellow-500 focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
    >
      {t("skip.link")}
    </a>
  )
}
