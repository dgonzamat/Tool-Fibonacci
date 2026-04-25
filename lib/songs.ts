import type { Lang } from "./i18n"

export interface Localized {
  es: string
  en: string
}

export interface LocalizedFibonacciMoment {
  time: number
  description: Localized
  significance: Localized
}

export interface FibonacciMoment {
  time: number
  description: string
  significance: string
}

export interface Reference {
  title: string
  url: string
}

export interface Song {
  id: string
  title: string
  album: string
  year: number
  duration: number
  complexity: number
  youtubeId: string
  description: Localized
  patterns: { es: string[]; en: string[] }
  fibonacciMoments: LocalizedFibonacciMoment[]
  references: Reference[]
}

export const toolSongs: Song[] = [
  {
    id: "lateralus",
    title: "Lateralus",
    album: "Lateralus",
    year: 2001,
    duration: 573,
    complexity: 9.8,
    youtubeId: "Y7JG63IuaWs",
    description: {
      es: "Una obra maestra que utiliza la secuencia de Fibonacci en su estructura lírica y rítmica, creando una experiencia musical matemáticamente perfecta.",
      en: "A masterpiece that uses the Fibonacci sequence in its lyrical and rhythmic structure, creating a mathematically perfect musical experience.",
    },
    patterns: {
      es: [
        "Estructura lírica basada en secuencia de Fibonacci",
        "Cambios de tiempo en proporciones áureas",
        "87 compases divididos según números de Fibonacci",
        "Patrones rítmicos que siguen la espiral dorada",
      ],
      en: [
        "Lyric structure based on the Fibonacci sequence",
        "Time-signature changes following golden-ratio proportions",
        "87 bars divided according to Fibonacci numbers",
        "Rhythmic patterns that trace the golden spiral",
      ],
    },
    fibonacciMoments: [
      {
        time: 97,
        description: {
          es: "Inicio del patrón Fibonacci en la lírica",
          en: "Start of the Fibonacci pattern in the lyrics",
        },
        significance: {
          es: "Las sílabas siguen la secuencia: 1, 1, 2, 3, 5, 8...",
          en: "Syllables follow the sequence: 1, 1, 2, 3, 5, 8...",
        },
      },
      {
        time: 233,
        description: {
          es: "Marca temporal en F(13) = 233 s",
          en: "Time mark at F(13) = 233 s",
        },
        significance: {
          es: "Coincide con un número de Fibonacci a 0.41 del recorrido",
          en: "Lands on a Fibonacci number at 0.41 of the runtime",
        },
      },
      {
        time: 354,
        description: {
          es: "Punto áureo (0.618 × duración)",
          en: "Golden-ratio point (0.618 × duration)",
        },
        significance: {
          es: "Clímax matemático en 354 s ≈ 573 × 1/φ",
          en: "Mathematical climax at 354 s ≈ 573 × 1/φ",
        },
      },
      {
        time: 462,
        description: {
          es: "Resolución en espiral",
          en: "Spiral resolution",
        },
        significance: {
          es: "La música se desenrolla hacia el cierre",
          en: "The music unwinds towards the closing section",
        },
      },
    ],
    references: [
      {
        title: "Lateralus (song) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lateralus_(song)",
      },
      {
        title: "Fibonacci sequence — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Fibonacci_sequence",
      },
    ],
  },
  {
    id: "schism",
    title: "Schism",
    album: "Lateralus",
    year: 2001,
    duration: 547,
    complexity: 8.7,
    youtubeId: "80RtBeB61LE",
    description: {
      es: "Una exploración de las divisiones y reunificaciones, con patrones matemáticos que reflejan la naturaleza fractal de las relaciones humanas.",
      en: "An exploration of division and reunification, with mathematical patterns that mirror the fractal nature of human relationships.",
    },
    patterns: {
      es: [
        "Compases irregulares basados en números de Fibonacci",
        "Divisiones rítmicas que siguen la proporción áurea",
        "Estructura armónica en espiral",
        "Patrones de repetición matemáticamente precisos",
      ],
      en: [
        "Irregular bars based on Fibonacci numbers",
        "Rhythmic divisions following the golden ratio",
        "Spiral harmonic structure",
        "Repetition patterns with mathematical precision",
      ],
    },
    fibonacciMoments: [
      {
        time: 89,
        description: { es: "Primera división rítmica", en: "First rhythmic division" },
        significance: {
          es: "El compás se divide siguiendo proporciones Fibonacci",
          en: "The meter splits along Fibonacci proportions",
        },
      },
      {
        time: 178,
        description: { es: "Punto de división menor", en: "Minor partition point" },
        significance: {
          es: "Aprox. 1/φ² ≈ 38.2 % desde el final del tema",
          en: "About 1/φ² ≈ 38.2% measured from the end of the track",
        },
      },
      {
        time: 337,
        description: { es: "Reunificación armónica", en: "Harmonic reunification" },
        significance: {
          es: "Los elementos se recombinan en patrones Fibonacci",
          en: "Elements recombine in Fibonacci patterns",
        },
      },
      {
        time: 445,
        description: { es: "Resolución final", en: "Final resolution" },
        significance: {
          es: "Cierre que completa la secuencia matemática",
          en: "Closure that completes the mathematical sequence",
        },
      },
    ],
    references: [
      {
        title: "Schism (song) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Schism_(song)",
      },
      {
        title: "Golden ratio — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Golden_ratio",
      },
    ],
  },
  {
    id: "fibonacci",
    title: "Forty Six & 2",
    album: "Ænima",
    year: 1996,
    duration: 366,
    complexity: 8.2,
    youtubeId: "GIuZUCpm9hc",
    description: {
      es: "Una canción sobre evolución y transformación, con 46 cromosomas + 2 representando el siguiente paso evolutivo, estructurada con patrones matemáticos.",
      en: "A song about evolution and transformation, with 46 chromosomes + 2 representing the next evolutionary step, built around mathematical patterns.",
    },
    patterns: {
      es: [
        "46 + 2 cromosomas como base conceptual",
        "Progresiones armónicas en secuencia Fibonacci",
        "Estructura temporal basada en proporción áurea",
        "Patrones rítmicos que evocan evolución",
      ],
      en: [
        "46 + 2 chromosomes as the conceptual core",
        "Harmonic progressions in Fibonacci sequence",
        "Time structure built on the golden ratio",
        "Rhythmic patterns evoking evolution",
      ],
    },
    fibonacciMoments: [
      {
        time: 58,
        description: { es: "Introducción del patrón principal", en: "Introduction of the main pattern" },
        significance: {
          es: "Establecimiento del ritmo base en Fibonacci",
          en: "Establishment of the Fibonacci-based base rhythm",
        },
      },
      {
        time: 144,
        description: { es: "Primera transformación", en: "First transformation" },
        significance: {
          es: "Cambio estructural en el punto áureo",
          en: "Structural change at the golden-ratio point",
        },
      },
      {
        time: 226,
        description: { es: "Clímax evolutivo", en: "Evolutionary climax" },
        significance: {
          es: "Momento de máxima intensidad matemática",
          en: "Moment of peak mathematical intensity",
        },
      },
      {
        time: 318,
        description: { es: "Resolución y transcendencia", en: "Resolution and transcendence" },
        significance: {
          es: "Culminación del proceso de transformación",
          en: "Culmination of the transformation process",
        },
      },
    ],
    references: [
      {
        title: "Forty Six & 2 — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Forty_Six_%26_2",
      },
      {
        title: "Ænima (album) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/%C3%86nima",
      },
    ],
  },
]

export function localizeMoments(
  moments: LocalizedFibonacciMoment[],
  lang: Lang,
): FibonacciMoment[] {
  return moments.map((m) => ({
    time: m.time,
    description: m.description[lang],
    significance: m.significance[lang],
  }))
}

export const generateFibonacciSequence = (n: number): number[] => {
  const sequence: number[] = [0, 1]
  if (n <= 1) return sequence.slice(0, n + 1)
  for (let i = 2; i <= n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2])
  }
  return sequence
}

export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
