export interface Post {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tag: string
}

export const posts: Post[] = [
  {
    slug: "lateralus-fibonacci",
    title: "Por qué Lateralus está construida sobre Fibonacci",
    description:
      "Un análisis del patrón silábico, los compases y la estructura áurea que Tool documentó en Lateralus.",
    date: "2026-04-25",
    readingTime: "6 min",
    tag: "Análisis",
  },
]
