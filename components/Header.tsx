"use client"

import { useEffect, useRef, useState } from "react"
import { Sigma, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "./i18n-provider"
import LanguageToggle from "./LanguageToggle"
import ShareButton from "./ShareButton"
import { useHideOnScroll } from "@/hooks/use-scroll-direction"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

const SECTION_IDS = ["fibonacci", "music", "education"]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()
  const hidden = useHideOnScroll()
  const activeSection = useActiveSection(SECTION_IDS)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const navItems = [
    { href: "#music", id: "music", label: t("nav.music") },
    { href: "#fibonacci", id: "fibonacci", label: t("nav.fibonacci") },
    { href: "#education", id: "education", label: t("nav.education") },
  ]

  // Body scroll lock + ESC handler + focus trap when menu is open
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (e.key !== "Tab" || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    // Focus first link on open
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button")
    firstLink?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [isMenuOpen])

  // Close menu on viewport resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) setIsMenuOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [isMenuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-yellow-500/20 px-4 sm:px-6 py-3 sm:py-4 shadow-2xl transition-transform duration-300",
          hidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <a href="#main" className="flex items-center space-x-2 sm:space-x-3 min-w-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-md">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <Sigma aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 w-9 h-9 sm:w-10 sm:h-10 border-2 border-yellow-500/30 rounded-full animate-ping"></div>
              <div aria-hidden="true" className="absolute inset-0 w-9 h-9 sm:w-10 sm:h-10 border border-yellow-500/20 rounded-full animate-pulse"></div>
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-bold tracking-wider text-white whitespace-nowrap">
                Tool <span className="text-yellow-500">Fibonacci</span>
              </span>
              <div className="hidden sm:block text-xs text-gray-400 font-mono">{t("header.formula")}</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
            {navItems.map(({ href, id, label }) => {
              const isActive = activeSection === id
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-md px-1",
                    isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-500",
                  )}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              )
            })}
            <LanguageToggle />
            <ShareButton />
          </nav>

          <Button
            ref={triggerRef}
            variant="ghost"
            size="icon"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden relative flex-shrink-0 text-white hover:bg-yellow-500/10"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X aria-hidden="true" className="w-6 h-6" /> : <Menu aria-hidden="true" className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile menu backdrop + panel */}
      <div
        aria-hidden={!isMenuOpen}
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm"
        />
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className={cn(
            "relative ml-auto h-full w-full max-w-xs bg-black/95 backdrop-blur-xl border-l border-yellow-500/20 shadow-2xl transition-transform duration-300 ease-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <nav aria-label="Mobile" className="flex flex-col h-full pt-20 pb-8 px-6 space-y-6">
            {navItems.map(({ href, id, label }) => {
              const isActive = activeSection === id
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-md px-2 py-1",
                    isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-500",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              )
            })}
            <div className="pt-4 mt-auto border-t border-yellow-500/20 flex items-center justify-between gap-3">
              <LanguageToggle />
              <ShareButton />
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
