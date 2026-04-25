"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, ExternalLink, Clock, Zap, Target, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { FibonacciMoment } from "@/lib/songs"

interface AudioPlayerProps {
  songId: string
  songTitle: string
  youtubeId: string
  fibonacciPoints: FibonacciMoment[]
  duration: number
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ songId, songTitle, youtubeId, fibonacciPoints, duration }) => {
  const [isClient, setIsClient] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [playerReady, setPlayerReady] = useState(false)
  const [apiLoaded, setApiLoaded] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const facadeRef = useRef<HTMLDivElement>(null)
  const pendingSeekRef = useRef<number | null>(null)
  const shouldAutoplayRef = useRef<boolean>(false)

  const videoId = youtubeId
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

  const getPointIcon = (index: number) => {
    const icons = [Sparkles, Zap, Target, TrendingUp]
    return icons[index % icons.length]
  }

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Lazy-load: only flag for loading when player area enters viewport
  useEffect(() => {
    if (!isClient || shouldLoad) return
    const el = facadeRef.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isClient, shouldLoad])

  // Initialize YouTube API and create player only after shouldLoad becomes true
  useEffect(() => {
    if (!isClient || !shouldLoad) return

    const cleanup = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (error) {
          console.error("Error destroying player:", error)
        }
        playerRef.current = null
      }
      setPlayerReady(false)
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const onPlayerReady = () => {
      setPlayerReady(true)

      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
          try {
            const time = playerRef.current.getCurrentTime()
            if (!isNaN(time)) setCurrentTime(time)
          } catch (error) {
            console.error("Error getting current time:", error)
          }
        }
      }, 1000)

      if (pendingSeekRef.current !== null && playerRef.current) {
        try {
          playerRef.current.seekTo(pendingSeekRef.current, true)
        } catch (error) {
          console.error("Error applying pending seek:", error)
        }
        pendingSeekRef.current = null
      }
      if (shouldAutoplayRef.current && playerRef.current) {
        try {
          playerRef.current.playVideo()
        } catch (error) {
          console.error("Error autoplaying:", error)
        }
        shouldAutoplayRef.current = false
      }
    }

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
      if (window.YT) {
        setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
      }
    }

    const onPlayerError = (event: YT.OnErrorEvent) => {
      console.error("YouTube player error:", event.data)
    }

    const createPlayer = () => {
      const YT = window.YT
      if (!YT || !YT.Player) return
      cleanup()
      try {
        const playerElement = document.getElementById(`youtube-player-${songId}`)
        if (!playerElement) return

        playerRef.current = new YT.Player(`youtube-player-${songId}`, {
          height: "200",
          width: "100%",
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
          },
        })
      } catch (error) {
        console.error("Error creating YouTube player:", error)
      }
    }

    if (window.YT && window.YT.Player) {
      setApiLoaded(true)
      createPlayer()
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        tag.async = true
        const firstScriptTag = document.getElementsByTagName("script")[0]
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
      }
      window.onYouTubeIframeAPIReady = () => {
        setApiLoaded(true)
        createPlayer()
      }
    }

    return cleanup
  }, [songId, videoId, isClient, shouldLoad])

  const togglePlayPause = () => {
    if (!shouldLoad) {
      shouldAutoplayRef.current = true
      setShouldLoad(true)
      return
    }
    if (!playerRef.current || !playerReady) return
    try {
      if (isPlaying) playerRef.current.pauseVideo()
      else playerRef.current.playVideo()
    } catch (error) {
      console.error("Error toggling play/pause:", error)
    }
  }

  const seekToTime = (seconds: number) => {
    if (!shouldLoad) {
      pendingSeekRef.current = seconds
      shouldAutoplayRef.current = true
      setShouldLoad(true)
      return
    }
    if (!playerRef.current || !playerReady) {
      pendingSeekRef.current = seconds
      shouldAutoplayRef.current = true
      return
    }
    try {
      playerRef.current.seekTo(seconds, true)
      setTimeout(() => {
        playerRef.current?.playVideo()
      }, 300)
    } catch (error) {
      console.error("Error seeking to time:", error)
      const url = `https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(seconds)}s`
      window.open(url, "_blank")
    }
  }

  const getYouTubeUrl = () => `https://www.youtube.com/watch?v=${videoId}`

  if (!isClient) {
    return (
      <Card className="w-full bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-48 text-gray-400">
            <div className="animate-pulse">Cargando reproductor...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 shadow-2xl">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">{songTitle}</h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>Duración: {formatTime(duration)}</span>
              </div>
            </div>
            <a
              href={getYouTubeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${songTitle} en YouTube`}
              className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm rounded-lg transition-colors flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4 mr-1.5 sm:mr-2" />
              YouTube
            </a>
          </div>

          {/* YouTube Player / Facade */}
          <div className="relative">
            <div
              ref={facadeRef}
              className="relative w-full rounded-xl overflow-hidden bg-gray-800 shadow-lg"
              style={{ aspectRatio: "16/9", minHeight: "200px" }}
            >
              {!shouldLoad ? (
                <button
                  type="button"
                  onClick={() => {
                    shouldAutoplayRef.current = true
                    setShouldLoad(true)
                  }}
                  aria-label={`Cargar reproductor de ${songTitle}`}
                  className="group absolute inset-0 w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 group-hover:bg-red-600 transition-all shadow-2xl group-hover:scale-110">
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-xs sm:text-sm text-white/90 font-medium drop-shadow">Tocar para cargar</span>
                  </div>
                </button>
              ) : (
                <div
                  id={`youtube-player-${songId}`}
                  key={`player-${songId}-${videoId}`}
                  className="w-full h-full"
                >
                  {!apiLoaded && (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-[3px] border-gray-600 border-t-yellow-500 rounded-full mx-auto mb-3"></div>
                        <div className="text-base sm:text-lg">Cargando reproductor de YouTube…</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 py-3 sm:py-4 px-3 bg-gray-800/50 rounded-xl flex-wrap">
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="lg"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-purple-500 text-white shadow-lg"
              disabled={shouldLoad && !playerReady}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <div className="text-center">
              <div className="text-base sm:text-lg font-mono text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              {shouldLoad && !playerReady && <div className="text-xs text-yellow-400 mt-1">Preparando reproductor...</div>}
            </div>
          </div>

          {/* Fibonacci Points Timeline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
                <span className="text-black font-bold text-lg">φ</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-white">Puntos Fibonacci</h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  {fibonacciPoints.length} momentos matemáticamente significativos
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600"></div>

              <div className="space-y-4">
                {fibonacciPoints.map((point, index) => {
                  const isNearPoint = Math.abs(currentTime - point.time) < 10
                  const isPastPoint = currentTime > point.time
                  const IconComponent = getPointIcon(index)
                  const fibNumber = fibSequence[index] || fibSequence[fibSequence.length - 1]

                  return (
                    <div
                      key={index}
                      className="relative flex items-start gap-3 sm:gap-4"
                    >
                      <div
                        aria-hidden="true"
                        className={`relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-[3px] transition-all duration-300 ${
                          isNearPoint
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-300 shadow-lg shadow-yellow-500/50 scale-110"
                            : isPastPoint
                              ? "bg-gradient-to-r from-green-500 to-green-600 border-green-400"
                              : "bg-gradient-to-r from-gray-600 to-gray-700 border-gray-500"
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            isNearPoint ? "text-black" : isPastPoint ? "text-white" : "text-gray-300"
                          }`}
                        />
                      </div>

                      <button
                        type="button"
                        aria-label={`Saltar a ${formatTime(point.time)}: ${point.description}`}
                        onMouseEnter={() => setHoveredPoint(index)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        onFocus={() => setHoveredPoint(index)}
                        onBlur={() => setHoveredPoint(null)}
                        className={`flex-1 min-w-0 text-left transition-all duration-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
                          hoveredPoint === index ? "sm:transform sm:scale-105" : ""
                        }`}
                        onClick={() => seekToTime(point.time)}
                      >
                        <Card
                          className={`transition-all duration-300 ${
                            isNearPoint
                              ? "bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border-yellow-500/50 shadow-lg shadow-yellow-500/20"
                              : isPastPoint
                                ? "bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30"
                                : "bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-gray-600/50 hover:border-yellow-500/30 hover:bg-gray-700/60"
                          }`}
                        >
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3 flex-wrap">
                              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <Badge
                                  variant="secondary"
                                  className={`text-xs sm:text-sm font-bold ${
                                    isNearPoint
                                      ? "bg-yellow-600 text-black"
                                      : isPastPoint
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-600 text-white"
                                  }`}
                                >
                                  F{fibNumber}
                                </Badge>
                                <span
                                  className={`font-mono text-base sm:text-lg font-bold ${
                                    isNearPoint ? "text-yellow-300" : isPastPoint ? "text-green-300" : "text-gray-300"
                                  }`}
                                >
                                  {formatTime(point.time)}
                                </span>
                              </div>
                              <Play
                                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                                  hoveredPoint === index
                                    ? "text-yellow-400 scale-110"
                                    : isNearPoint
                                      ? "text-yellow-300"
                                      : "text-gray-400"
                                }`}
                              />
                            </div>

                            <div className="space-y-1.5 sm:space-y-2">
                              <h5
                                className={`text-sm sm:text-base font-semibold ${
                                  isNearPoint ? "text-yellow-100" : isPastPoint ? "text-green-100" : "text-white"
                                }`}
                              >
                                {point.description}
                              </h5>
                              <p
                                className={`text-xs sm:text-sm leading-relaxed ${
                                  isNearPoint ? "text-yellow-200" : isPastPoint ? "text-green-200" : "text-gray-300"
                                }`}
                              >
                                {point.significance}
                              </p>
                            </div>

                            {isNearPoint && (
                              <div className="mt-3 flex items-center space-x-2 text-yellow-300">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                <span className="text-xs font-medium">¡Momento Fibonacci activo!</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm flex-wrap">
              <div className="flex items-center gap-x-3 gap-y-1.5 flex-wrap">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Completados: {fibonacciPoints.filter((p) => currentTime > p.time).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Activos: {fibonacciPoints.filter((p) => Math.abs(currentTime - p.time) < 10).length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Pendientes: {fibonacciPoints.filter((p) => currentTime < p.time).length}
                  </span>
                </div>
              </div>
              <div className="text-purple-300 font-medium">
                {Math.round(
                  (fibonacciPoints.filter((p) => currentTime > p.time).length / fibonacciPoints.length) * 100,
                )}
                % explorado
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AudioPlayer
