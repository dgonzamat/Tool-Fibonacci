"use client"

import type React from "react"
import { Video, ExternalLink, Play, Pause, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface YouTubePlayerContainerProps {
  playerLoaded: boolean
  playerError: boolean
  getYouTubeFullUrl: () => string
  handleExternalLinkClick: () => void
  togglePlayPause: () => void
  isPlaying: boolean
  playerReady: boolean
  testId?: string
}

const YouTubePlayerContainer: React.FC<YouTubePlayerContainerProps> = ({
  playerLoaded,
  playerError,
  getYouTubeFullUrl,
  handleExternalLinkClick,
  togglePlayPause,
  isPlaying,
  playerReady,
  testId = "external-youtube-link",
}) => {
  return (
    <>
      <div className="flex items-center justify-between text-purple-400 mb-2">
        <div className="flex items-center">
          <Video className="w-5 h-5 mr-2" />
          <span className="font-medium">Reproductor de YouTube</span>
        </div>
        <a
          href={getYouTubeFullUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-xs text-purple-300 hover:text-purple-100 transition-colors"
          aria-label="Ver en YouTube"
          onClick={handleExternalLinkClick}
          data-testid={testId}
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          <span>Ver en YouTube</span>
        </a>
      </div>

      <div
        className="youtube-player-wrapper relative w-full bg-gray-900 rounded-lg overflow-hidden"
        style={{ minHeight: "180px" }}
      >
        {playerError ? (
          <div className="flex flex-col items-center justify-center h-40 bg-red-900/20 rounded-md p-4">
            <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-sm text-red-400 mb-3 text-center">No se pudo cargar el reproductor de YouTube</p>
            <p className="text-xs text-red-300 mb-3 text-center">
              Esto puede deberse a restricciones de embedding del video
            </p>
            <a
              href={getYouTubeFullUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm flex items-center transition-colors"
              onClick={handleExternalLinkClick}
              data-testid="external-youtube-error-link"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver en YouTube
            </a>
          </div>
        ) : (
          <>
            <div
              id="youtube-player"
              className={cn(
                "rounded-lg transition-opacity duration-300 w-full",
                playerLoaded ? "opacity-100" : "opacity-0",
              )}
            ></div>

            {playerLoaded && playerReady && (
              <div className="mt-3 flex justify-center">
                <button
                  onClick={togglePlayPause}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors shadow-lg"
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  data-testid="play-pause-button"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
            )}
          </>
        )}

        {!playerLoaded && !playerError && (
          <div className="flex flex-col justify-center items-center h-40 bg-gray-800 rounded-lg">
            <Video className="w-8 h-8 text-purple-400 animate-pulse mb-2" />
            <p className="text-sm text-purple-300">Cargando reproductor...</p>
          </div>
        )}
      </div>
    </>
  )
}

export default YouTubePlayerContainer
