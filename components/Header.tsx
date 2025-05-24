"use client"

import { useState } from "react"
import { Sigma, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-yellow-500/20 px-6 py-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Sigma className="w-6 h-6 text-black" />
            </div>
            {/* Recursive rings */}
            <div className="absolute inset-0 w-10 h-10 border-2 border-yellow-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-10 h-10 border border-yellow-500/20 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-wider text-white">
              Tool <span className="text-yellow-500">Fibonacci</span>
            </span>
            <div className="text-xs text-gray-400 font-mono">F(n) = F(n-1) + F(n-2)</div>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          {[
            { href: "#music", label: "Análisis Musical" },
            { href: "#fibonacci", label: "Fibonacci" },
            { href: "#education", label: "Educación" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="relative text-gray-300 hover:text-yellow-500 transition-all duration-300 group"
            >
              {label}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300"></div>
            </a>
          ))}
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="relative">{isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</div>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-xl border-b border-yellow-500/20 shadow-2xl">
          <nav className="flex flex-col items-center py-8 space-y-6">
            {[
              { href: "#music", label: "Análisis Musical" },
              { href: "#fibonacci", label: "Fibonacci" },
              { href: "#education", label: "Educación" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-gray-300 hover:text-yellow-500 transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
