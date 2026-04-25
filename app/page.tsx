"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FibonacciVisualizer from "@/components/FibonacciVisualizer"
import MusicAnalysis from "@/components/MusicAnalysis"
import EducationalSection from "@/components/EducationalSection"
import { useTranslation } from "@/components/i18n-provider"

export default function ToolFibonacciApp() {
  const [loaded, setLoaded] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main id="main" className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="container py-12 sm:py-16 md:py-24 mx-auto">
          <div
            className={cn(
              "max-w-4xl mx-auto text-center transition-opacity duration-1000",
              loaded ? "opacity-100" : "opacity-0",
            )}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-wider">
              TOOL <span className="text-yellow-500">×</span> FIBONACCI
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
          </div>
        </section>

        {/* Fibonacci Visualizer Section */}
        <section id="fibonacci" className="container mx-auto py-10 sm:py-16 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-center mb-3 sm:mb-4 tracking-wider">
              {t("sections.fibonacci.title")}
            </h2>
            <p className="text-base sm:text-xl text-gray-400 text-center mb-8 sm:mb-12 px-2">
              {t("sections.fibonacci.subtitle")}
            </p>
            <FibonacciVisualizer />
          </div>
        </section>

        {/* Music Analysis Section */}
        <section id="music" className="container mx-auto py-10 sm:py-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-center mb-3 sm:mb-4 tracking-wider">
              {t("sections.music.title")}
            </h2>
            <p className="text-base sm:text-xl text-gray-400 text-center mb-8 sm:mb-12 px-2">
              {t("sections.music.subtitle")}
            </p>
            <MusicAnalysis />
          </div>
        </section>

        {/* Educational Section */}
        <section id="education" className="container mx-auto py-10 sm:py-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-center mb-3 sm:mb-4 tracking-wider">
              {t("sections.education.title")}
            </h2>
            <p className="text-base sm:text-xl text-gray-400 text-center mb-8 sm:mb-12 px-2">
              {t("sections.education.subtitle")}
            </p>
            <EducationalSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
