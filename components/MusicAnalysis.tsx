"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Music, TrendingUp, Clock, BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toolSongs, localizeMoments } from "@/lib/songs"
import { useTranslation } from "./i18n-provider"
import { interpolate } from "@/lib/i18n"
import AudioPlayer from "./AudioPlayer"
import ErrorBoundary from "./ErrorBoundary"

const MusicAnalysis: React.FC = () => {
  const { t, lang } = useTranslation()
  const [selectedSong, setSelectedSong] = useState(toolSongs[0])
  const localizedPoints = useMemo(
    () => localizeMoments(selectedSong.fibonacciMoments, lang),
    [selectedSong, lang],
  )

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div>
      {/* Lista de canciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
        {toolSongs.map((song) => (
          <Card
            key={song.id}
            role="button"
            tabIndex={0}
            aria-pressed={selectedSong.id === song.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedSong.id === song.id
                ? "bg-purple-900/30 border-purple-500/50 ring-2 ring-purple-500/30"
                : "bg-gray-900/30 border-gray-700/50 hover:bg-gray-800/50"
            }`}
            onClick={() => setSelectedSong(song)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setSelectedSong(song)
              }
            }}
          >
            <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-white">{song.title}</CardTitle>
              <p className="text-xs sm:text-sm text-gray-400">
                {song.album} • {song.year}
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center text-xs sm:text-sm text-gray-300">
                  <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                  {formatTime(song.duration)}
                </div>
                <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 text-xs">
                  {song.complexity}/10
                </Badge>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">{song.description[lang]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Análisis detallado de la canción seleccionada */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Reproductor - Usar key para forzar re-render */}
        <div key={selectedSong.id} className="min-w-0">
          <ErrorBoundary
            fallback={
              <Card className="bg-gray-900/50 border-red-500/30">
                <CardContent className="p-6 text-center space-y-3">
                  <h3 className="text-lg font-semibold text-white">{t("player.error.title")}</h3>
                  <p className="text-sm text-gray-400">{t("player.error.body")}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedSong.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <ExternalLink aria-hidden="true" className="w-4 h-4" />
                    {t("player.error.action")}
                  </a>
                </CardContent>
              </Card>
            }
          >
            <AudioPlayer
              songId={selectedSong.id}
              songTitle={selectedSong.title}
              youtubeId={selectedSong.youtubeId}
              fibonacciPoints={localizedPoints}
              duration={selectedSong.duration}
            />
          </ErrorBoundary>
        </div>

        {/* Información y patrones */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                <TrendingUp aria-hidden="true" className="w-5 h-5 mr-2 text-purple-400 flex-shrink-0" />
                <span>{t("music.patterns.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <ul className="space-y-3">
                {selectedSong.patterns[lang].map((pattern, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{pattern}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                <Music aria-hidden="true" className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" />
                <span>{t("music.analysis.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-300">{selectedSong.complexity}</div>
                  <div className="text-xs text-gray-400">{t("music.complexity")}</div>
                </div>
                <div className="text-center p-3 bg-green-900/20 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-300">{selectedSong.fibonacciMoments.length}</div>
                  <div className="text-xs text-gray-400">{t("music.points")}</div>
                </div>
              </div>
              <p className="text-sm text-gray-300">{selectedSong.description[lang]}</p>
            </CardContent>
          </Card>

          {selectedSong.references.length > 0 && (
            <Card className="bg-gray-900/50 border-yellow-500/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                  <BookOpen aria-hidden="true" className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0" />
                  <span>{t("music.references.title")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ul className="space-y-2">
                  {selectedSong.references.map((ref) => (
                    <li key={ref.url}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={interpolate(t("music.external.aria"), { title: ref.title })}
                        className="inline-flex items-start gap-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
                      >
                        <ExternalLink
                          aria-hidden="true"
                          className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500 group-hover:text-yellow-400 transition-colors"
                        />
                        <span className="underline-offset-4 group-hover:underline">{ref.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default MusicAnalysis
