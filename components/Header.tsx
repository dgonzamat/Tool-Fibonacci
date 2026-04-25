"use client"

import { useState } from "react"
import { Sigma, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "./i18n-provider"
import LanguageToggle from "./LanguageToggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()
  const navItems = [
    { href: "#music", label: t("nav.music") },
    { href: "#fibonacci", label: t("nav.fibonacci") },
    { href: "#education", label: t("nav.education") },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-yellow-500/20 px-4 sm:px-6 py-3 sm:py-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Sigma className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            {/* Recursive rings */}
            <div className="absolute inset-0 w-9 h-9 sm:w-10 sm:h-10 border-2 border-yellow-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-9 h-9 sm:w-10 sm:h-10 border border-yellow-500/20 rounded-full animate-pulse"></div>
          </div>
          <div className="min-w-0">
            <span className="text-base sm:text-xl font-bold tracking-wider text-white whitespace-nowrap">
              Tool <span className="text-yellow-500">Fibonacci</span>
            </span>
            <div className="hidden sm:block text-xs text-gray-400 font-mono">{t("header.formula")}</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative text-gray-300 hover:text-yellow-500 transition-all duration-300 group"
            >
              {label}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300"></div>
            </a>
          ))}
          <LanguageToggle />
        </nav>

        <Button
          variant="ghost"
          size="icon"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          className="md:hidden relative flex-shrink-0 text-white hover:bg-yellow-500/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="relative">{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</div>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-xl border-b border-yellow-500/20 shadow-2xl">
          <nav className="flex flex-col items-center py-8 space-y-6">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-gray-300 hover:text-yellow-500 transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <LanguageToggle />
          </nav>
        </div>
      )}
    </header>
  )
}
