"use client"

import type React from "react"
import { useState } from "react"
import { Music, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AudioPlayer from "./AudioPlayer"

// Datos de las canciones de Tool con análisis Fibonacci
const toolSongs = [
  {
    id: "lateralus",
    title: "Lateralus",
    album: "Lateralus",
    year: 2001,
    duration: 573, // 9:33
    description:
      "Una obra maestra que utiliza la secuencia de Fibonacci en su estructura lírica y rítmica, creando una experiencia musical matemáticamente perfecta.",
    complexity: 9.8,
    fibonacciMoments: [
      {
        time: 97, // 1:37
        description: "Inicio del patrón Fibonacci en la lírica",
        significance: "Las sílabas siguen la secuencia: 1, 1, 2, 3, 5, 8...",
      },
      {
        time: 233, // 3:53
        description: "Cambio de tiempo siguiendo proporción áurea",
        significance: "El ritmo cambia en el punto áureo de la canción",
      },
      {
        time: 354, // 5:54
        description: "Clímax matemático",
        significance: "Convergencia de todos los patrones Fibonacci",
      },
      {
        time: 462, // 7:42
        description: "Resolución en espiral",
        significance: "La música se desenrolla siguiendo la espiral de Fibonacci",
      },
    ],
    patterns: [
      "Estructura lírica basada en secuencia de Fibonacci",
      "Cambios de tiempo en proporciones áureas",
      "87 compases divididos según números de Fibonacci",
      "Patrones rítmicos que siguen la espiral dorada",
    ],
  },
  {
    id: "schism",
    title: "Schism",
    album: "Lateralus",
    year: 2001,
    duration: 547, // 9:07
    description:
      "Una exploración de las divisiones y reunificaciones, con patrones matemáticos que reflejan la naturaleza fractal de las relaciones humanas.",
    complexity: 8.7,
    fibonacciMoments: [
      {
        time: 89, // 1:29
        description: "Primera división rítmica",
        significance: "El compás se divide siguiendo proporciones Fibonacci",
      },
      {
        time: 178, // 2:58
        description: "Punto de tensión máxima",
        significance: "Ubicado en el 32.5% de la canción (proporción áurea)",
      },
      {
        time: 337, // 5:37
        description: "Reunificación armónica",
        significance: "Los elementos se recombinan en patrones Fibonacci",
      },
      {
        time: 445, // 7:25
        description: "Resolución final",
        significance: "Cierre que completa la secuencia matemática",
      },
    ],
    patterns: [
      "Compases irregulares basados en números de Fibonacci",
      "Divisiones rítmicas que siguen la proporción áurea",
      "Estructura armónica en espiral",
      "Patrones de repetición matemáticamente precisos",
    ],
  },
  {
    id: "fibonacci",
    title: "Forty Six & 2",
    album: "Ænima",
    year: 1996,
    description:
      "Una canción sobre evolución y transformación, con 46 cromosomas + 2 representando el siguiente paso evolutivo, estructurada con patrones matemáticos.",
    duration: 366, // 6:06
    complexity: 8.2,
    fibonacciMoments: [
      {
        time: 58, // 0:58
        description: "Introducción del patrón principal",
        significance: "Establecimiento del ritmo base en Fibonacci",
      },
      {
        time: 144, // 2:24
        description: "Primera transformación",
        significance: "Cambio estructural en el punto áureo",
      },
      {
        time: 226, // 3:46
        description: "Clímax evolutivo",
        significance: "Momento de máxima intensidad matemática",
      },
      {
        time: 318, // 5:18
        description: "Resolución y transcendencia",
        significance: "Culminación del proceso de transformación",
      },
    ],
    patterns: [
      "46 + 2 cromosomas como base conceptual",
      "Progresiones armónicas en secuencia Fibonacci",
      "Estructura temporal basada en proporción áurea",
      "Patrones rítmicos que evocan evolución",
    ],
  },
]

const MusicAnalysis: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState(toolSongs[0])

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
              <p className="text-xs text-gray-400 line-clamp-2">{song.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Análisis detallado de la canción seleccionada */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Reproductor - Usar key para forzar re-render */}
        <div key={selectedSong.id} className="min-w-0">
          <AudioPlayer
            songId={selectedSong.id}
            songTitle={selectedSong.title}
            fibonacciPoints={selectedSong.fibonacciMoments}
            duration={selectedSong.duration}
          />
        </div>

        {/* Información y patrones */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          <Card className="bg-gray-900/50 border-purple-500/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-400 flex-shrink-0" />
                <span>Patrones Fibonacci Detectados</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <ul className="space-y-3">
                {selectedSong.patterns.map((pattern, index) => (
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
                <Music className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0" />
                <span>Análisis Matemático</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-300">{selectedSong.complexity}</div>
                  <div className="text-xs text-gray-400">Complejidad</div>
                </div>
                <div className="text-center p-3 bg-green-900/20 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-300">{selectedSong.fibonacciMoments.length}</div>
                  <div className="text-xs text-gray-400">Puntos Fibonacci</div>
                </div>
              </div>
              <p className="text-sm text-gray-300">{selectedSong.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MusicAnalysis
