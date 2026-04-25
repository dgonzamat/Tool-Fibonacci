export interface FibonacciMoment {
  time: number
  description: string
  significance: string
}

export interface Song {
  id: string
  title: string
  album: string
  year: number
  duration: number
  description: string
  complexity: number
  youtubeId: string
  fibonacciMoments: FibonacciMoment[]
  patterns: string[]
}

export const toolSongs: Song[] = [
  {
    id: "lateralus",
    title: "Lateralus",
    album: "Lateralus",
    year: 2001,
    duration: 573,
    youtubeId: "Y7JG63IuaWs",
    description:
      "Una obra maestra que utiliza la secuencia de Fibonacci en su estructura lírica y rítmica, creando una experiencia musical matemáticamente perfecta.",
    complexity: 9.8,
    fibonacciMoments: [
      {
        time: 97,
        description: "Inicio del patrón Fibonacci en la lírica",
        significance: "Las sílabas siguen la secuencia: 1, 1, 2, 3, 5, 8...",
      },
      {
        time: 233,
        description: "Cambio de tiempo siguiendo proporción áurea",
        significance: "El ritmo cambia en el punto áureo de la canción",
      },
      {
        time: 354,
        description: "Clímax matemático",
        significance: "Convergencia de todos los patrones Fibonacci",
      },
      {
        time: 462,
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
    duration: 547,
    youtubeId: "80RtBeB61LE",
    description:
      "Una exploración de las divisiones y reunificaciones, con patrones matemáticos que reflejan la naturaleza fractal de las relaciones humanas.",
    complexity: 8.7,
    fibonacciMoments: [
      {
        time: 89,
        description: "Primera división rítmica",
        significance: "El compás se divide siguiendo proporciones Fibonacci",
      },
      {
        time: 178,
        description: "Punto de tensión máxima",
        significance: "Ubicado en el 32.5% de la canción (proporción áurea)",
      },
      {
        time: 337,
        description: "Reunificación armónica",
        significance: "Los elementos se recombinan en patrones Fibonacci",
      },
      {
        time: 445,
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
    duration: 366,
    youtubeId: "GIuZUCpm9hc",
    description:
      "Una canción sobre evolución y transformación, con 46 cromosomas + 2 representando el siguiente paso evolutivo, estructurada con patrones matemáticos.",
    complexity: 8.2,
    fibonacciMoments: [
      {
        time: 58,
        description: "Introducción del patrón principal",
        significance: "Establecimiento del ritmo base en Fibonacci",
      },
      {
        time: 144,
        description: "Primera transformación",
        significance: "Cambio estructural en el punto áureo",
      },
      {
        time: 226,
        description: "Clímax evolutivo",
        significance: "Momento de máxima intensidad matemática",
      },
      {
        time: 318,
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

export const generateFibonacciSequence = (n: number): number[] => {
  const sequence: number[] = [0, 1]
  if (n <= 1) return sequence.slice(0, n + 1)
  for (let i = 2; i <= n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2])
  }
  return sequence
}

export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
