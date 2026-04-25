"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateFibonacciSequence, GOLDEN_RATIO } from "@/lib/songs"
import { useTranslation } from "./i18n-provider"
import { interpolate } from "@/lib/i18n"

export default function FibonacciVisualizer() {
  const { t } = useTranslation()
  const [sequence] = useState(() => generateFibonacciSequence(15))
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(1000)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sequence.length)
    }, speed)
    return () => clearInterval(interval)
  }, [sequence.length, isPlaying, speed])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const reset = () => {
    setActiveIndex(0)
    setIsPlaying(true)
  }

  const goldenRatio = GOLDEN_RATIO

  // Generate spiral path for SVG
  const generateSpiralPath = () => {
    const centerX = 200
    const centerY = 200
    const scale = 3
    let path = `M ${centerX} ${centerY}`

    for (let i = 0; i <= activeIndex && i < 10; i++) {
      const angle = i * 0.5
      const radius = sequence[i + 1] * scale
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      if (i === 0) {
        path += ` L ${x} ${y}`
      } else {
        path += ` Q ${centerX + (radius * 0.7) * Math.cos(angle - 0.25)} ${centerY + (radius * 0.7) * Math.sin(angle - 0.25)} ${x} ${y}`
      }
    }

    return path
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden border border-yellow-500/20 shadow-2xl">
      {/* Recursive Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, yellow 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, yellow 1px, transparent 1px)`,
            backgroundSize: "50px 50px, 30px 30px",
          }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 p-4 sm:p-6 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-900/20 to-transparent">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg">
              <span className="text-black font-bold text-lg sm:text-xl">φ</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-xl font-bold text-white truncate">{t("viz.title")}</h3>
              <p className="text-xs sm:text-sm text-yellow-300 font-mono">{t("header.formula")}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="sm"
              aria-label={isPlaying ? t("controls.pause") : t("controls.play")}
              className="bg-yellow-600 hover:bg-yellow-700 border-yellow-500 text-black"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              size="sm"
              aria-label={t("controls.reset")}
              className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="relative p-4 sm:p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Spiral Visualization */}
          <div className="relative">
            <div className="aspect-square bg-gray-800/30 rounded-xl border border-yellow-500/20 overflow-hidden">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Background Grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(75 85 99)" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />

                {/* Fibonacci Rectangles */}
                {sequence.slice(0, Math.min(activeIndex + 1, 8)).map((num, i) => {
                  const size = Math.min(num * 4, 80)
                  const x = 200 + (i % 2 === 0 ? -size / 2 : size / 2) + i * 10
                  const y = 200 + (i % 2 === 0 ? size / 2 : -size / 2) + i * 5

                  return (
                    <g key={i}>
                      <rect
                        x={x - size / 2}
                        y={y - size / 2}
                        width={size}
                        height={size}
                        fill={`hsl(${45 + i * 15}, 70%, ${60 + i * 3}%)`}
                        stroke="rgb(234 179 8)"
                        strokeWidth="2"
                        opacity={i === activeIndex ? 1 : 0.6}
                        className="transition-all duration-500"
                        style={{
                          filter: i === activeIndex ? "drop-shadow(0 0 10px rgb(234 179 8))" : "none",
                        }}
                      />
                      <text x={x} y={y + 5} textAnchor="middle" className="fill-black font-bold text-sm">
                        {num}
                      </text>
                    </g>
                  )
                })}

                {/* Spiral Path */}
                <path
                  d={generateSpiralPath()}
                  stroke="rgb(234 179 8)"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.8"
                  className="transition-all duration-500"
                  style={{
                    filter: "drop-shadow(0 0 5px rgb(234 179 8))",
                  }}
                />
              </svg>
            </div>

            <div className="mt-4 text-center">
              <Badge variant="outline" className="text-yellow-400 border-yellow-500/50 bg-yellow-900/20">
                {t("viz.spiral.label")}: φ ≈ {goldenRatio.toFixed(6)}
              </Badge>
            </div>
          </div>

          {/* Sequence Display */}
          <div className="space-y-6">
            {/* Current Number Highlight */}
            <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 rounded-xl p-4 sm:p-6 border border-yellow-500/30">
              <div className="text-center">
                <div className="text-xs sm:text-sm text-yellow-300 mb-2">{t("viz.current")}</div>
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2 break-all">{sequence[activeIndex]}</div>
                <div className="text-xs sm:text-sm text-gray-300">
                  F({activeIndex}) ={" "}
                  {activeIndex > 1 ? `F(${activeIndex - 1}) + F(${activeIndex - 2})` : activeIndex === 1 ? "1" : "0"}
                </div>
                {activeIndex > 1 && (
                  <div className="text-xs text-yellow-200 mt-2">
                    {sequence[activeIndex - 1]} + {sequence[activeIndex - 2]} = {sequence[activeIndex]}
                  </div>
                )}
              </div>
            </div>

            {/* Sequence Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3" role="list">
              {sequence.slice(0, 12).map((num, i) => (
                <button
                  key={i}
                  type="button"
                  role="listitem"
                  aria-label={interpolate(
                    i === activeIndex ? t("viz.cell.label.current") : t("viz.cell.label"),
                    { i, n: num },
                  )}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className={cn(
                    "relative flex items-center justify-center rounded-lg transition-all duration-500 border font-mono text-xs sm:text-sm",
                    "h-12 sm:h-14 w-full group overflow-hidden",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
                    i === activeIndex
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-yellow-400 scale-105 shadow-lg shadow-yellow-500/50"
                      : i < activeIndex
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white border-green-500"
                        : "bg-gray-800/80 text-yellow-500 border-yellow-500/30 hover:border-yellow-500/50 hover:bg-gray-700/80",
                  )}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Recursive Connection Lines */}
                  {i > 1 && i <= activeIndex && (
                    <>
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400/50 rounded-tl-lg"></div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-yellow-400/50 rounded-tr-lg"></div>
                    </>
                  )}

                  <span className="relative z-10 font-bold">{num}</span>

                  {/* Pulse effect for active */}
                  {i === activeIndex && (
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-lg animate-pulse"></div>
                  )}

                  {/* Hover tooltip */}
                  <span aria-hidden="true" className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    F({i}) = {num}
                  </span>
                </button>
              ))}
            </div>

            {/* Speed Control */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">{t("viz.speed.label")}</span>
                <Zap aria-hidden="true" className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="flex space-x-2">
                {[
                  { label: t("viz.speed.slow"), value: 1500 },
                  { label: t("viz.speed.normal"), value: 1000 },
                  { label: t("viz.speed.fast"), value: 500 },
                ].map(({ label, value }) => (
                  <Button
                    key={value}
                    onClick={() => setSpeed(value)}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1 text-xs",
                      speed === value
                        ? "bg-yellow-600 border-yellow-500 text-black"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600",
                    )}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Mathematical Properties */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-4 border border-purple-500/20">
              <h4 className="text-sm font-semibold text-purple-300 mb-3">{t("viz.props.title")}</h4>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>{t("viz.props.phi")}</span>
                  <span className="text-yellow-300 font-mono">{goldenRatio.toFixed(8)}</span>
                </div>
                {activeIndex > 0 && (
                  <div className="flex justify-between">
                    <span>
                      F({activeIndex})/F({activeIndex - 1}):
                    </span>
                    <span className="text-yellow-300 font-mono">
                      {(sequence[activeIndex] / sequence[activeIndex - 1]).toFixed(6)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t("viz.props.progress")}</span>
                  <span className="text-green-300">
                    {activeIndex + 1}/{sequence.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
