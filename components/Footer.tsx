"use client"

import { Sigma, Github, Twitter, Youtube, Mail, Heart } from "lucide-react"
import { useTranslation } from "./i18n-provider"

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="w-full py-10 sm:py-16 mt-12 sm:mt-20 border-t border-gray-700 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sigma className="w-6 h-6 text-black" />
                </div>
                {/* Recursive pattern */}
                <div className="absolute -inset-2 border border-yellow-500/20 rounded-full"></div>
                <div className="absolute -inset-4 border border-yellow-500/10 rounded-full"></div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-white">
                  Tool <span className="text-yellow-500">Fibonacci</span>
                </span>
                <div className="text-xs text-gray-400 font-mono">φ = (1 + √5)/2</div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">{t("footer.tagline")}</p>

            <div className="flex items-center space-x-4 text-gray-400">
              {[Github, Twitter, Youtube, Mail].map((Icon, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <Icon className="w-5 h-5 hover:text-yellow-500 transition-colors" />
                  <div className="absolute inset-0 w-5 h-5 border border-yellow-500/0 group-hover:border-yellow-500/30 rounded transition-all"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 relative">
              {t("footer.nav")}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#music", label: t("footer.link.music") },
                { href: "#fibonacci", label: t("footer.link.fibonacci") },
                { href: "#education", label: t("footer.link.education") },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-yellow-500 transition-colors text-sm relative group"
                  >
                    <span className="relative z-10">{label}</span>
                    <div className="absolute -left-2 top-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-yellow-500 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 relative">
              {t("footer.resources")}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {["Sitio Oficial de Tool", "Fundación Fibonacci", "Archivos de Teoría Musical"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm relative group">
                    <span className="relative z-10">{item}</span>
                    <div className="absolute -left-2 top-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-yellow-500 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400 text-center md:text-left">
          <p>{t("footer.copyright")}</p>
          <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
            <span>{t("footer.created")}</span>
            <Heart aria-hidden="true" className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span>{t("footer.created.suffix")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
